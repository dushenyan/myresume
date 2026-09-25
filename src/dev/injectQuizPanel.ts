/**
 * 把押题面板（数据 JSON + 样式 + 脚本）注入到 HTML 的 </body> 前
 *
 * 两个调用方：serve.ts（dev 预览，外置解答走 /api/quiz/answer 按需读）与
 * build/html.ts（生产构建，靠 inlineAnswers 把解答内联、靠 frameOrigin 把演示页
 * 指向上游站）。PDF 走未注入的纯净 HTML，浏览器打印则由 @media print 隐藏。
 */
import type { QuizBank } from '../core/quiz'
import { renderMarkdown } from '../core/mdRenderer'
import { readQuizAnswerHtml } from '../core/quiz'

/** 面板样式：抽屉 + 触发按钮（无遮罩，打开时页面内容让位左移）；@media print 兜底隐藏 */
const PANEL_CSS = `
.quiz-trigger { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; padding: 1px 8px; font-size: 11px; line-height: 1.6; color: #428bca; background: rgba(66, 139, 202, 0.08); border: 1px solid rgba(66, 139, 202, 0.35); border-radius: 10px; cursor: pointer; vertical-align: middle; }
.quiz-trigger:hover { background: rgba(66, 139, 202, 0.16); }
/* 无遮罩方案：抽屉打开时 .container 整体左移让位（JS 实测写入 --quiz-shift / 宽度，
   视口不够时压缩内容宽度，保证正文右缘与抽屉之间始终留有间距） */
.container { transition: transform 0.25s ease, width 0.25s ease, margin-left 0.25s ease; }
body.quiz-open .container { transform: translateX(var(--quiz-shift, -420px)); }
/* 外边距 32px 与中心内容区（body padding 2rem）对齐，悬浮圆角面板 */
.quiz-drawer { position: fixed; top: 32px; right: 32px; bottom: 32px; height: auto; width: min(420px, 92vw); background: #fff; border: 1px solid rgba(15, 23, 42, 0.06); border-radius: 16px; box-shadow: 0 12px 40px rgba(15, 23, 42, 0.16); transform: translateX(calc(100% + 32px)); transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1); z-index: 1001; display: flex; flex-direction: column; overflow: hidden; font-size: 12px; color: #333; }
.quiz-drawer.quiz-show { transform: none; }
.quiz-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 10px 12px 8px; border-bottom: 1px solid #eef0f3; }
/* 标题区可收缩，长题目才能单行省略 */
.quiz-head > div { flex: 1; min-width: 0; }
.quiz-head h3 { margin: 0; font-size: 13px; }
.quiz-stack { margin: 1px 0 0; color: #9aa0a8; font-size: 10.5px; }
/* 单行截断工具类（仅用于确实需要省略的场合；详情标题区不用，避免长题目被截断） */
.quiz-single-line { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.quiz-close { width: 24px; height: 24px; flex: none; border-radius: 50%; border: 0; background: rgba(15, 23, 42, 0.04); font-size: 16px; line-height: 1; cursor: pointer; color: #999; display: inline-flex; align-items: center; justify-content: center; transition: background 0.15s ease, color 0.15s ease; }
.quiz-close:hover { background: rgba(15, 23, 42, 0.08); color: #333; }
.quiz-progress { display: flex; align-items: center; gap: 8px; padding: 8px 12px 0; }
.quiz-progress-track { flex: 1; height: 4px; background: #e9ecef; border-radius: 2px; overflow: hidden; }
.quiz-progress-bar { height: 100%; width: 0; background: #428bca; border-radius: 2px; transition: width 0.2s ease; }
.quiz-progress span { color: #888; font-size: 11px; white-space: nowrap; }
/* min-height: 0 是 flex 子项滚动的前提：默认 min-height:auto 会被内容撑开，overflow-y 永不触发 */
.quiz-body { overflow-y: auto; min-height: 0; overscroll-behavior: contain; padding: 6px 10px 12px; flex: 1; }
.quiz-body h4 { font-size: 11px; margin: 4px 2px 5px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.04em; }
.quiz-list { margin: 0; padding: 0; list-style: none; }
.quiz-list li { padding: 5px 8px; border: 1px solid transparent; border-radius: 8px; background: #f5f6f8; margin-bottom: 4px; transition: background 0.15s ease, border-color 0.15s ease; }
.quiz-list li:hover { background: #eef1f6; border-color: rgba(66, 139, 202, 0.18); }
.quiz-list .q-row { display: flex; gap: 5px; align-items: flex-start; }
.quiz-list input[type=checkbox] { margin-top: 2px; accent-color: #428bca; }
.q-text { flex: 1; text-align: left; border: 0; background: none; padding: 0; font: inherit; color: #333; cursor: pointer; }
.q-text:hover { color: #428bca; }
.quiz-list li.done .q-text { color: #a8adb5; text-decoration: line-through; }
.q-caret { font-style: normal; color: #b5bac2; margin-left: 5px; font-size: 10px; display: inline-block; transition: transform 0.15s ease; }
.quiz-list li.open .q-caret { transform: rotate(180deg); }
.quiz-answer { display: none; margin: 6px 0 0 18px; padding: 8px 11px; background: #f7f9fc; border-left: 3px solid #428bca; border-radius: 0 8px 8px 0; color: #4b5563; font-size: 12px; line-height: 1.65; }
.quiz-answer > :first-child { margin-top: 0; }
.quiz-answer > :last-child { margin-bottom: 0; }
.quiz-answer .q-p { margin: 4px 0; }
.quiz-answer .q-ul { list-style: none; margin: 5px 0; padding: 0; }
.quiz-answer .q-ul > li { position: relative; margin: 3px 0; padding-left: 14px; }
.quiz-answer .q-ul > li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #428bca; }
.quiz-answer .q-ol { margin: 5px 0; padding-left: 18px; }
.quiz-answer .q-ol > li { margin: 3px 0; }
.quiz-answer code { background: rgba(66, 139, 202, 0.1); color: #2c6cab; padding: 0.5px 5px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; }
.quiz-answer .q-code { background: #0f172a; color: #e2e8f0; padding: 8px 10px; border-radius: 8px; overflow-x: auto; margin: 6px 0; line-height: 1.5; }
.quiz-answer .q-code code { background: none; color: inherit; padding: 0; font-size: 11px; }
.quiz-answer .q-h { font-size: 12.5px; margin: 7px 0 3px; color: #1f2937; font-weight: 700; }
.quiz-answer .q-quote { margin: 5px 0; padding: 2px 0 2px 9px; border-left: 2px solid #cbd5e1; border-right: 0; border-top: 0; border-bottom: 0; font-style: normal; color: #6b7280; }
.quiz-answer .q-hr { border: 0; border-top: 1px dashed #d1d5db; margin: 7px 0; }
.quiz-answer a { color: #428bca; text-decoration: underline; }
.quiz-answer img, .quiz-detail-answer img { max-width: 100%; border-radius: 8px; margin: 6px 0; display: block; }
/* 题目关联的在线演示：详情态下有演示页时，iframe 铺满整个主体区（不再叠答案文本） */
.quiz-frame { flex: 1; min-height: 180px; width: 100%; margin: 6px 0 0; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff; }
/* 工具条：返回题目 / 在新标签打开 / 切回文字答案 */
.quiz-frame-bar { display: flex; align-items: center; gap: 8px; flex: none; margin: 8px 0 2px; }
.quiz-frame-bar button { font: inherit; font-size: 12px; padding: 4px 10px; border-radius: 8px; border: 1px solid #dbe1ea; background: #fff; color: #374151; cursor: pointer; }
.quiz-frame-bar button:hover { border-color: #428bca; color: #428bca; }
/* 答案态的「查看内嵌演示」用主按钮样式；iframe 态不渲染该按钮（靠 .quiz-frame-mode 归属控制） */
.quiz-frame-bar .quiz-frame-back { border-color: #428bca; background: #428bca; color: #fff; }
.quiz-frame-bar .quiz-frame-back:hover { background: #2c6cab; color: #fff; }
.quiz-drawer.quiz-frame-mode .quiz-frame-back { display: none; }
/* frame 模式：内嵌页占满整个抽屉，不额外占位置（抽屉自身已是圆角 + overflow:hidden） */
.quiz-drawer.quiz-frame-mode .quiz-frame { margin: 0; border: 0; border-radius: 0; }
/* 全区域详情视图：头部换成题目名称、× 换为返回箭头；主体紧凑无边框 */
.quiz-drawer.quiz-detail .quiz-close { display: none; }
/* 详情态下关闭按钮位改为返回箭头（复用圆形按钮尺寸，内容换成 ←） */
.quiz-back { display: none; width: 24px; height: 24px; border: 0; border-radius: 50%; background: #f3f4f6; color: #6b7280; font-size: 15px; line-height: 1; cursor: pointer; }
.quiz-back:hover { background: #e5e7eb; color: #374151; }
.quiz-drawer.quiz-detail .quiz-back { display: inline-flex; align-items: center; justify-content: center; }
/* 详情态题目名称放标题位：字号同 h3，最多两行完整显示（超出才省略） */
.quiz-drawer.quiz-detail .quiz-stack { display: -webkit-box; -webkit-box-orient: vertical; margin: 0; color: #1f2937; font-size: 13px; line-height: 1.45; font-weight: 600; }
.quiz-detail-answer { flex: 1; min-height: 0; overflow-y: auto; margin: 2px 16px 14px; padding: 0; background: none; border-left: 0; border-radius: 0; color: #4b5563; font-size: 13px; line-height: 1.6; }
.quiz-detail-answer > :first-child { margin-top: 0; }
.quiz-detail-answer > :last-child { margin-bottom: 0; }
.quiz-detail-answer .q-p { margin: 3px 0; }
.quiz-detail-answer .q-ul { list-style: none; margin: 3px 0; padding: 0; }
.quiz-detail-answer .q-ul > li { position: relative; margin: 2px 0; padding-left: 14px; }
.quiz-detail-answer .q-ul > li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #428bca; }
.quiz-detail-answer .q-ol { margin: 3px 0; padding-left: 20px; }
.quiz-detail-answer .q-ol > li { margin: 2px 0; }
.quiz-detail-answer code { background: rgba(66, 139, 202, 0.1); color: #2c6cab; padding: 0.5px 5px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; }
.quiz-detail-answer .q-code { background: #0f172a; color: #e2e8f0; padding: 8px 10px; border-radius: 8px; overflow-x: auto; margin: 5px 0; line-height: 1.5; }
.quiz-detail-answer .q-code code { background: none; color: inherit; padding: 0; font-size: 12px; }
.quiz-detail-answer .q-h { font-size: 13px; margin: 7px 0 3px; color: #1f2937; font-weight: 700; }
.quiz-detail-answer .q-quote { margin: 3px 0; padding: 1px 0 1px 9px; border-left: 2px solid #cbd5e1; border-right: 0; border-top: 0; border-bottom: 0; font-style: normal; font-size: 12px; color: #6b7280; }
.quiz-detail-answer .q-hr { border: 0; border-top: 1px dashed #d1d5db; margin: 7px 0; }
.quiz-detail-answer a { color: #428bca; text-decoration: underline; }
.q-ext { font-style: normal; color: #b5bac2; margin-left: 5px; font-size: 11px; }
.quiz-list li.open .quiz-answer { display: block; }
.quiz-hl { margin-top: 8px; border-top: 1px dashed #e5e7eb; padding-top: 6px; }
.quiz-hl summary { cursor: pointer; font-weight: 600; font-size: 12px; }
.quiz-hl .hl-item { margin-top: 5px; }
.quiz-hl .hl-item .q-p { margin: 2px 0 0; color: #666; font-size: 12px; }
.quiz-hl .hl-item .q-ul, .quiz-hl .hl-item .q-ol { margin: 3px 0; }
.quiz-hl .hl-item .q-ul { list-style: none; padding: 0; }
.quiz-hl .hl-item .q-ul > li { position: relative; padding-left: 14px; margin: 2px 0; }
.quiz-hl .hl-item .q-ul > li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #428bca; }
/* 移动端：抽屉改为全屏覆盖式上滑面板（不做容器让位），重设间距与可点区域，避免样式错乱 */
@media (max-width: 768px) {
  .quiz-drawer { top: 0; right: 0; bottom: 0; left: 0; width: 100%; max-width: 100%; height: 100%; border: 0; border-radius: 0; box-shadow: none; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); font-size: 14px; }
  .quiz-drawer.quiz-show { transform: none; }
  body.quiz-open { overflow: hidden; }
  body.quiz-open .container { transform: none !important; }
  .quiz-head { padding: 14px 16px 10px; }
  .quiz-head h3 { font-size: 16px; }
  .quiz-drawer.quiz-detail .quiz-stack { font-size: 15px; }
  .quiz-stack { font-size: 12px; }
  .quiz-close { width: 34px; height: 34px; font-size: 22px; }
  .quiz-progress { padding: 12px 16px 0; }
  .quiz-body { padding: 10px 16px 28px; }
  .quiz-body h4 { font-size: 12px; margin: 6px 2px 8px; }
  .quiz-list li { padding: 11px 12px; border-radius: 10px; margin-bottom: 8px; }
  .quiz-list .q-row { gap: 9px; }
  .quiz-list input[type=checkbox] { width: 17px; height: 17px; margin-top: 4px; }
  .quiz-answer { margin: 8px 0 0 26px; padding: 10px 12px; line-height: 1.7; }
  .quiz-hl { margin-top: 14px; padding-top: 10px; }
  .quiz-hl summary { font-size: 14px; }
  .quiz-detail-answer { margin: 4px 16px 20px; font-size: 14px; line-height: 1.7; }
  .quiz-frame-bar { margin: 10px 0 4px; }
  .quiz-frame-bar button { padding: 7px 12px; font-size: 13px; }
  .quiz-frame { min-height: 220px; }
  .quiz-detail-answer .q-quote { font-size: 13px; }
  .quiz-back { width: 34px; height: 34px; font-size: 19px; }
}
@media print {
  .quiz-trigger, .quiz-drawer, .dv-drawer { display: none !important; }
  body.quiz-open .container { transform: none !important; }
}
`

/**
 * 面板行为脚本（浏览器端 ES5 风格原生 JS，字符串注入所以不走 TS 编译）：
 * 1. 按 matchName 给项目条目标题右侧挂「押题」按钮
 * 2. 抽屉无遮罩，打开时 .container 左移让位；视口不足时压缩内容宽度，保住间距
 * 3. 点击题目展开/收起参考解答；勾选「已掌握」进度存 localStorage 并回显在按钮上
 * 4. matchName 匹配不到项目条目的题库只在 devtools 控制台提示，不再展示浮标
 */
const PANEL_JS = `
(function () {
  var dataEl = document.getElementById('quiz-data');
  if (!dataEl) return;
  var banks;
  try { banks = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!banks || !banks.length) return;

  var ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';

  // 内嵌演示地址拼接：目标站 X-Frame-Options: SAMEORIGIN，直连跨域 iframe 会被浏览器拒收，
  // 所以 dev 下 iframe 指向本服务同源的真实路径（由 serve.ts 整站反代到演示站）；
  // FRAME_ORIGIN 由注入时填为上游站点地址，生产静态页没有反代可用，只能直连。
  // 必须保留真实路径（如 /resume-quiz/<uuid>），因为忆谱是 SPA 前端路由：
  // 它靠 location.pathname 解析 dataSource/questionId，靠 ?embed=1 切到“只铺详情弹框”的内嵌态。
  // frame 值可以是裸 uuid / <host>/<dataSource>/<questionId> / 完整嵌入 URL。
  var FRAME_ORIGIN = '';

  // 把 frame 引用归一为不含主机、不含前导斜杠的路径（可带 query）
  function framePath(ref) {
    var p = String(ref).replace(/^https?:\\/\\//i, '');
    var hash = p.indexOf('#');
    if (hash !== -1) p = p.slice(0, hash); // 丢弃 hash，路由用不到
    var slash = p.indexOf('/');
    if (slash === -1) return 'resume-quiz/' + p; // 裸 uuid：默认 dataSource
    var first = p.slice(0, slash);
    if (first.indexOf(':') !== -1) return p.slice(slash + 1); // 首段是 host:port，削掉
    return p; // 已是 dataSource/questionId
  }

  // 拼 iframe 地址：强制带 ?embed=1
  function frameSrc(ref) {
    var p = framePath(ref);
    var sep = p.indexOf('?') === -1 ? '?' : '&';
    var embed = /[?&]embed=/.test(p) ? '' : sep + 'embed=1';
    return FRAME_ORIGIN + '/' + p + embed;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function isMobile() { return window.matchMedia && window.matchMedia('(max-width: 768px)').matches; }

  var drawer = document.createElement('aside');
  drawer.className = 'quiz-drawer';
  document.body.appendChild(drawer);

  var currentBank = null;
  var baseGeom = null; // 未开抽屉时的容器基准几何（left/width）

  // 让位策略（抽出供诊断报告抽屉复用，挂到 window.__quizLayout）：
  // 先左移（不超出屏幕左缘）；若正文右缘仍会与面板重叠（含 GAP 间距），
  // 则改为「固定左缘 + 压缩宽度」——不能只缩宽度，否则 bootstrap 的 margin:auto
  // 会重新居中，平移量失效
  function applyShift(panelWidth) {
    var container = document.querySelector('.container');
    var GAP = 48; // 右侧总预留 = 抽屉外边距 32 + 正文与抽屉间距 16，保证与悬浮边距匹配
    if (!container) return;
    if (isMobile()) {
      // 移动端全屏覆盖面板：清除桌面让位遗留的内联样式，避免与整页布局冲突；
      // quiz-open 类仍需加上，供 body.quiz-open { overflow: hidden } 锁定背景
      container.style.setProperty('--quiz-shift', '0px');
      container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = '';
      document.body.classList.add('quiz-open');
      return;
    }
    if (!document.body.classList.contains('quiz-open') || !baseGeom) {
      // 捕获基准几何必须先终止让位过渡：容器带 width/margin-left transition，
      // 若刚执行过 clearShift（如从押题切到报告），rect 读到的是动画中间态，
      // 基准量错会让正文停在不三不四的位置。临时 transition:none + 强制重排取干净几何
      container.style.transition = 'none';
      document.body.classList.remove('quiz-open');
      container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = '';
      var r = container.getBoundingClientRect();
      baseGeom = { left: r.left, width: r.width };
      void container.offsetWidth; // 提交无动画样式，恢复后后续变更才走过渡
      container.style.transition = '';
    }
    var shift = Math.max(0, Math.min(panelWidth, baseGeom.left - 8));
    var newLeft = baseGeom.left - shift;
    var maxRight = window.innerWidth - panelWidth - GAP;
    if (newLeft + baseGeom.width > maxRight) {
      container.style.setProperty('--quiz-shift', '0px');
      container.style.maxWidth = 'none';
      container.style.marginLeft = newLeft + 'px';
      container.style.width = Math.max(320, maxRight - newLeft) + 'px';
    } else {
      container.style.setProperty('--quiz-shift', '-' + shift + 'px');
      container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = '';
    }
    document.body.classList.add('quiz-open');
  }
  function clearShift() {
    document.body.classList.remove('quiz-open');
    var container = document.querySelector('.container');
    if (container) { container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = ''; }
  }
  // 暴露给同样几何规格的 dev 抽屉（诊断报告），保证两者打开时内容让位行为一致
  window.__quizLayout = { apply: applyShift, clear: clearShift };

  function show() {
    // 互斥：同位对齐的诊断报告抽屉若开着，先收起（两者几何相同，叠放会遮住押题面板）
    var dv = document.querySelector('.dv-drawer.dv-show');
    if (dv) dv.classList.remove('dv-show');
    applyShift(drawer.getBoundingClientRect().width);
    drawer.classList.add('quiz-show');
  }
  function close() {
    // 关抽屉前记下当前列表滚动位置，下次重开同一题包时回到看过的位置
    var qb = drawer.querySelector('.quiz-body');
    if (qb && currentBank && !drawer.classList.contains('quiz-detail')) listScrolls[currentBank.file] = qb.scrollTop;
    drawer.classList.remove('quiz-show');
    clearShift();
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    // 内嵌模式下没了自己的工具条，Esc 等同于“返回上一层”（而不是直接关掉抽屉）
    if (drawer.classList.contains('quiz-frame-mode')) { renderBank(currentBank); return; }
    close();
  });

  // 忆谱内嵌页的关闭协议：用户点内嵌页自带关闭/按 Esc 时，iframe 向父窗口发 yipu:embed-close；
  // iframe 经本服务同源代理，event.origin 就是本站，故只按消息类型识别，回到题目列表
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (d && d.type === 'yipu:embed-close' && drawer.classList.contains('quiz-frame-mode')) backToList();
  });

  function progressKey(bank) { return 'quiz-progress:' + bank.file; }
  function loadProgress(bank) {
    try { return JSON.parse(localStorage.getItem(progressKey(bank))) || []; } catch (e) { return []; }
  }
  function saveProgress(bank, done) {
    try { localStorage.setItem(progressKey(bank), JSON.stringify(done)); } catch (e) {}
  }
  function doneCount(bank) {
    var done = loadProgress(bank);
    var n = 0;
    for (var i = 0; i < bank.questions.length; i++) { if (done[i]) n++; }
    return n;
  }

  function headHtml(bank, detail) {
    // 详情态：整个标题区（标题+技术栈两行）换成题目名称，× 按钮位换成 ← 返回
    var titleHtml = detail
      ? '<p class="quiz-stack" title="' + esc(detail.q) + '">Q' + (detail.i + 1) + '. ' + esc(detail.q) + '</p>'
      : '<h3>' + esc(bank.title) + '</h3>' + (bank.stack ? '<p class="quiz-stack">' + esc(bank.stack) + '</p>' : '');
    return '<header class="quiz-head"><div>' + titleHtml
      + '</div><button type="button" class="quiz-close" aria-label="关闭">×</button>'
      + '<button type="button" class="quiz-back" aria-label="返回题目列表" title="返回题目列表">←</button></header>';
  }

  function bindHead() {
    var closeBtn = drawer.querySelector('.quiz-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    var backBtn = drawer.querySelector('.quiz-back');
    if (backBtn) backBtn.addEventListener('click', backToList);
  }

  function backToList() {
    // 用 renderBank 重建列表：勾选/进度状态取最新数据，滚动位置从缓存恢复
    renderBank(currentBank);
  }

  function updateProgressUi() {
    if (!currentBank) return;
    var total = currentBank.questions.length;
    var n = doneCount(currentBank);
    var bar = drawer.querySelector('.quiz-progress-bar');
    var label = drawer.querySelector('.quiz-progress span');
    if (bar) bar.style.width = (total ? Math.round(n / total * 100) : 0) + '%';
    if (label) label.textContent = n + ' / ' + total + ' 已掌握';
    var triggers = document.querySelectorAll('.quiz-trigger[data-file="' + CSS.escape(currentBank.file) + '"]');
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].innerHTML = ICON + '<span>押题 ' + (total ? n + '/' + total : '') + '</span>';
    }
  }

  // bank.file → 列表滚动位置缓存：进详情/关抽屉前记录，返回列表时恢复到看过的位置
  var listScrolls = {};

  function renderBank(bank) {
    // 切到别的题包前，先把旧题包正在看的列表位置存进缓存
    if (currentBank && currentBank !== bank) {
      var ob = drawer.querySelector('.quiz-body');
      if (ob) listScrolls[currentBank.file] = ob.scrollTop;
    }
    currentBank = bank;
    drawer.classList.remove('quiz-detail');
    drawer.classList.remove('quiz-frame-mode');
    var done = loadProgress(bank);
    var html = headHtml(bank, null)
      + '<div class="quiz-progress"><div class="quiz-progress-track"><div class="quiz-progress-bar"></div></div><span></span></div>'
      + '<div class="quiz-body"><h4>预测押题</h4><ol class="quiz-list">';
    bank.questions.forEach(function (item, i) {
      var hasAns = !!(item.a || item.aFile);
      var canOpen = hasAns || !!item.frame;
      html += '<li' + (done[i] ? ' class="done"' : '') + '>'
        + '<div class="q-row"><input type="checkbox" data-i="' + i + '" aria-label="标记已掌握"' + (done[i] ? ' checked' : '') + '>'
        + '<button type="button" class="q-text"' + (canOpen ? (item.frame ? ' title="查看在线演示与解答"' : ' title="查看全文解答"') : ' disabled title="暂无参考解答" style="cursor:default"') + '>' + esc(item.q) + (item.aFile ? '<i class="q-ext q-ext-doc" title="本地文字解答（点击直达）">📄</i>' : '') + (item.frame ? '<i class="q-ext" title="附带在线演示">🎬</i>' : '') + (canOpen ? '<i class="q-caret">›</i>' : '') + '</button></div>'
        + '</li>';
    });
    html += '</ol>';
    if (bank.highlights.length) {
      html += '<details class="quiz-hl" open><summary>项目亮点挖掘</summary>';
      bank.highlights.forEach(function (h) {
        html += '<div class="hl-item"><strong>' + esc(h.title) + '</strong>' + (h.detail || '') + '</div>';
      });
      html += '</details>';
    }
    html += '</div>';
    drawer.innerHTML = html;
    var qb = drawer.querySelector('.quiz-body');
    if (qb) qb.scrollTop = listScrolls[bank.file] || 0; // 恢复上次看过的列表位置
    bindHead();
    updateProgressUi();
    show();
  }

  // 单题全区域详情：有 frame 时整屏只给内嵌演示页（不画抽屉头部、不画底部工具条，
  // 退出依靠内嵌页自身的关闭 → yipu:embed-close → 返回上一层，或按 Esc）；
  // 无 frame 时头部展示题目，答案文本内嵌取注入数据、外置（aFile）走 /api/quiz/answer 按需读 md 文件
  function renderDetail(i, mode) {
    var bank = currentBank;
    var item = bank.questions[i];
    // 进详情前记住列表滚动位置，返回时原位恢复
    var qb = drawer.querySelector('.quiz-body');
    if (mode !== 'answer' && qb) listScrolls[bank.file] = qb.scrollTop;
    drawer.classList.add('quiz-detail');

    if (item.frame && mode !== 'answer') {
      // 内嵌页模式：主体区只有 iframe（带 ?embed=1），不叠加任何抽屉自带 chrome
      drawer.classList.add('quiz-frame-mode');
      var frameHtml = '<iframe class="quiz-frame" src="' + esc(frameSrc(item.frame)) + '" title="在线演示" allow="fullscreen"></iframe>';
      drawer.innerHTML = frameHtml;
      updateProgressUi();
      return;
    }

    drawer.classList.remove('quiz-frame-mode');
    var html = headHtml(bank, { i: i, q: item.q })
      + '<div class="quiz-detail-answer" id="quiz-detail-answer">' + (item.a || '（暂无参考解答）') + '</div>'
      + (item.frame ? '<div class="quiz-frame-bar"><button type="button" class="quiz-frame-back" data-i="' + i + '">查看内嵌演示</button></div>' : '');
    drawer.innerHTML = html;
    bindHead();
    updateProgressUi();
    // 解答已内联（生产构建）时不再请求接口
    if (item.aFile && !item.a) {
      fetch('/api/quiz/answer?bank=' + encodeURIComponent(bank.file) + '&file=' + encodeURIComponent(item.aFile))
        .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('HTTP ' + r.status)); })
        .then(function (h) {
          var box = document.getElementById('quiz-detail-answer');
          // 用户可能已返回列表，校验节点归属再写入
          if (box) box.innerHTML = h || '<p class="q-p">（解答文件为空）</p>';
        })
        .catch(function (err) {
          console.warn('[quiz] 解答文件读取失败: ' + item.aFile, err);
          var box = document.getElementById('quiz-detail-answer');
          if (box) box.innerHTML = '<p class="q-p">⚠️ 解答文件读取失败：' + esc(item.aFile) + '</p>';
        });
    }
  }

  // 抽屉内交互：点击题目进详情 / 内嵌页工具条切换 / 勾选进度，事件委托只绑定一次
  drawer.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var t = e.target;
    if (t.closest('.quiz-back')) return;
    if (t.closest('.quiz-frame-back')) return void renderDetail(Number(t.getAttribute('data-i')));
    // frame 题默认进内嵌屏（已无底部按钮），点题目前的 📄 徒标则直达本地文字解答
    var docTag = t.closest('.q-ext-doc');
    if (docTag) {
      var docLi = t.closest('li');
      if (docLi) renderDetail(Array.prototype.indexOf.call(docLi.parentNode.children, docLi), 'answer');
      return;
    }
    var btn = t.closest('.q-text');
    if (!btn || btn.disabled || !currentBank) return;
    var li = btn.closest('li');
    if (li) renderDetail(Array.prototype.indexOf.call(li.parentNode.children, li));
  });

  drawer.addEventListener('change', function (e) {
    var t = e.target;
    if (!t.matches || !t.matches('input[type=checkbox]') || !currentBank) return;
    var idxAttr = t.getAttribute('data-i');
    if (idxAttr === null) return;
    var done = loadProgress(currentBank);
    done[Number(idxAttr)] = t.checked;
    saveProgress(currentBank, done);
    var li = t.closest('li');
    if (li) li.classList.toggle('done', t.checked);
    updateProgressUi();
  });

  // 1. 项目条目挂按钮：entry-head（项目经历）与个人项目的标题行都扫描
  var used = {};
  var heads = document.querySelectorAll('#projects .entry-head, #personal-projects .entry-head, #personal-projects .content > p:first-child');
  for (var i = 0; i < heads.length; i++) {
    var head = heads[i];
    var text = head.textContent || '';
    var matched = banks.filter(function (b) { return b.matchName && text.indexOf(b.matchName) !== -1; });
    if (!matched.length) continue;
    matched.forEach(function (b) { used[b.file] = true; });
    matched.forEach(function (b) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-trigger';
      btn.setAttribute('data-file', b.file);
      btn.title = '查看预测押题与亮点挖掘';
      btn.innerHTML = ICON + '<span>押题 ' + (b.questions.length ? doneCount(b) + '/' + b.questions.length : '') + '</span>';
      btn.addEventListener('click', function () { renderBank(b); });
      var anchor = head.querySelector('.entry-title');
      if (anchor) anchor.insertAdjacentElement('afterend', btn);
      else head.appendChild(btn);
    });
  }

  // 2. 未匹配任何项目条目的题库：仅控制台提示，不展示入口
  var rest = banks.filter(function (b) { return !used[b.file]; });
  if (rest.length) {
    console.warn('[quiz] 以下题包的 matchName 未匹配到项目条目：' + rest.map(function (b) { return b.file; }).join('、'));
  }
})();
`

/** 注入选项：缺省为 dev 形态（外置解答按需读 + 演示页同源反代） */
export interface QuizPanelOptions {
  /** 生产静态页没有 /api/quiz/answer，构建期把 `@answer: x.md` 的渲染结果一并内联 */
  inlineAnswers?: boolean
  /** 生产静态页没有反代，iframe 直连的上游站点（如 http://134.175.23.212:8581） */
  frameOrigin?: string
}

/** 在 </body> 前注入押题面板；无数据时原样返回 */
export function injectQuizPanel(html: string, banks: QuizBank[], options: QuizPanelOptions = {}): string {
  if (!banks.length)
    return html

  // 参考解答 / 亮点描述在服务端预渲染为 markdown HTML，浏览器侧直接 innerHTML 展示
  const enriched = banks.map(b => ({
    ...b,
    questions: b.questions.map((q) => {
      if (q.a)
        return { ...q, a: renderMarkdown(q.a) }
      // 只有内联模式才读盘；读不到就保留 aFile，详情视图仍按原逻辑处理
      const inlined = options.inlineAnswers && q.aFile ? readQuizAnswerHtml(q.aFile) : null
      return inlined ? { ...q, a: inlined } : q
    }),
    highlights: b.highlights.map(h => ({ ...h, detail: h.detail ? renderMarkdown(h.detail) : h.detail })),
  }))

  // 把面板脚本里的 FRAME_ORIGIN 占位常量换成实际上游源（dev 留空即同源）
  const frameOrigin = (options.frameOrigin ?? '').replace(/[^\w:/.-]/g, '').replace(/\/+$/, '')
  const panelJs = PANEL_JS.replace('var FRAME_ORIGIN = \'\';', `var FRAME_ORIGIN = '${frameOrigin}';`)

  // \u003c 转义防止 JSON 内容里出现 </script> 提前闭合
  const data = JSON.stringify(enriched).replace(/</g, '\\u003c')
  const snippet = [
    `<script type="application/json" id="quiz-data">${data}</script>`,
    `<style>${PANEL_CSS}</style>`,
    `<script>${panelJs}</script>`,
  ].join('\n')

  return html.includes('</body>')
    ? html.replace('</body>', `${snippet}\n</body>`)
    : `${html}\n${snippet}`
}
