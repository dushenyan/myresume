/**
 * dev 预览专用：「诊断报告」入口按钮 + 右侧抽屉
 *
 * 与 injectQuizPanel 同一注入机制：只在 serve.ts 的响应阶段拼接，
 * 不写盘、不进构建管线，dist/HTML/PDF 天然不含报告按钮痕迹。
 * 入口不悬浮：本脚本在押题脚本之后执行（serve.ts 链式注入顺序保证），
 * 给每个押题按钮右侧补一枚同规格的「诊断报告」胶囊按钮（琥珀色区分），
 * 同一标题行只挂一枚，点击打开共享抽屉；押题按钮不存在时只在控制台告警。
 * 抽屉与押题抽屉同宽同位对齐显示（top/right/bottom 32px、宽 420px），
 * 并通过押题面板暴露的 window.__quizLayout 复用同一套内容让位逻辑；
 * 打开报告抽屉时强制收起押题抽屉，避免两个面板叠在一起。
 *
 * md 内容由 /api/doc 在服务端经 mdRenderer 渲染为 HTML 片段，
 * 浏览器只负责 fetch 展示；首次打开拉取后缓存，改过报告刷新页面即重读。
 */

/** 入口按钮配色覆盖（基础胶囊样式复用 .quiz-trigger）+ 抽屉样式；移动端全屏上滑，@media print 兜底隐藏 */
const VIEWER_CSS = `
.dv-inline { color: #8a6d3b; background: rgba(138, 109, 59, 0.08); border-color: rgba(138, 109, 59, 0.35); }
.dv-inline:hover { background: rgba(138, 109, 59, 0.16); }
/* 抽屉几何与 .quiz-drawer 完全对齐（同宽同位），保证两个面板切换时视觉一致 */
.dv-drawer { position: fixed; top: 32px; right: 32px; bottom: 32px; width: min(420px, 92vw); background: #fff; border: 1px solid rgba(15, 23, 42, 0.06); border-radius: 16px; box-shadow: 0 12px 40px rgba(15, 23, 42, 0.16); transform: translateX(calc(100% + 32px)); transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1); z-index: 1001; display: flex; flex-direction: column; overflow: hidden; font-size: 13px; color: #333; }
.dv-drawer.dv-show { transform: none; }
.dv-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px 16px 10px; border-bottom: 1px solid #eef0f3; }
.dv-head h3 { margin: 0; font-size: 14px; }
.dv-sub { margin: 2px 0 0; color: #9aa0a8; font-size: 11px; }
.dv-close { width: 26px; height: 26px; flex: none; border-radius: 50%; border: 0; background: rgba(15, 23, 42, 0.04); font-size: 17px; line-height: 1; cursor: pointer; color: #999; display: inline-flex; align-items: center; justify-content: center; }
.dv-close:hover { background: rgba(15, 23, 42, 0.08); color: #333; }
/* min-height: 0 是 flex 子项滚动的前提（同 quiz-body 的坑）；行高/边距收紧到与押题解答同一密度 */
.dv-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 8px 14px 20px; line-height: 1.6; color: #4b5563; }
.dv-body > :first-child { margin-top: 0; }
/* mdRenderer 的标题映射：## → h5.q-h、### → h6.q-h */
.dv-body h5.q-h { font-size: 13.5px; margin: 12px 0 5px; padding-bottom: 3px; border-bottom: 1px solid #eef0f3; color: #1f2937; }
.dv-body h6.q-h { font-size: 12.5px; margin: 9px 0 3px; color: #1f2937; }
.dv-body .q-p { margin: 3px 0; }
.dv-body .q-ul { list-style: none; margin: 3px 0; padding: 0; }
.dv-body .q-ul > li { position: relative; margin: 2px 0; padding-left: 14px; }
.dv-body .q-ul > li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #428bca; }
.dv-body .q-ol { margin: 3px 0; padding-left: 18px; }
.dv-body .q-ol > li { margin: 2px 0; }
.dv-body code { background: rgba(66, 139, 202, 0.1); color: #2c6cab; padding: 0.5px 5px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11.5px; }
.dv-body .q-quote { margin: 3px 0; padding: 1px 0 1px 9px; border-left: 2px solid #cbd5e1; font-style: normal; font-size: 12px; line-height: 1.55; color: #6b7280; }
.dv-body .q-quote > .q-p { margin: 2px 0; }
.dv-body .q-hr { border: 0; border-top: 1px dashed #d1d5db; margin: 7px 0; }
@media (max-width: 768px) {
  .dv-drawer { top: 0; right: 0; bottom: 0; left: 0; width: 100%; max-width: 100%; border: 0; border-radius: 0; box-shadow: none; transform: translateY(100%); font-size: 14px; }
}
@media print {
  .dv-inline, .dv-drawer { display: none !important; }
}
`

/** 报告正文来源：docs/ 根下的这份 md（dev 走 /api/doc，生产构建内联） */
export const DOC_VIEWER_FILE = '项目面试诊断.md'

/** 面板行为脚本（浏览器端 ES5 风格原生 JS，字符串注入所以不走 TS 编译） */
const VIEWER_JS = `
(function () {
  var FILE = '${DOC_VIEWER_FILE}';
  // 生产构建会把报告 HTML 直接填进这个占位，避开不存在的 /api/doc
  var cache = __DOC_INLINE__;

  var drawer = document.createElement('aside');
  drawer.className = 'dv-drawer';
  drawer.innerHTML = '<header class="dv-head"><div><h3>项目面试诊断报告</h3><p class="dv-sub">projects.ts · 面试追问与包装清单</p></div>'
    + '<button type="button" class="dv-close" aria-label="关闭">×</button></header>'
    + '<div class="dv-body" id="dv-body"></div>';
  document.body.appendChild(drawer);

  function setBody(html) {
    var el = document.getElementById('dv-body');
    if (el) el.innerHTML = html;
  }

  // 互斥：收起押题抽屉并清除其让位状态；让位逻辑复用押题面板暴露的钩子，
  // 保证两个抽屉打开时正文位置完全一致
  function closeQuizDrawer() {
    var quizDrawer = document.querySelector('.quiz-drawer.quiz-show');
    if (quizDrawer) quizDrawer.classList.remove('quiz-show');
    if (window.__quizLayout) window.__quizLayout.clear();
  }

  function open() {
    closeQuizDrawer();
    drawer.classList.add('dv-show');
    if (window.__quizLayout) window.__quizLayout.apply(drawer.getBoundingClientRect().width);
    if (cache) { setBody(cache); return; }
    setBody('<p class="q-p">加载中…</p>');
    fetch('/api/doc?file=' + encodeURIComponent(FILE))
      .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (html) { cache = html; setBody(html); })
      .catch(function () { setBody('<p class="q-p">⚠️ 报告读取失败：确认 docs/' + FILE + ' 存在（修改报告后刷新页面可重读）</p>'); });
  }

  function close() {
    drawer.classList.remove('dv-show');
    if (window.__quizLayout) window.__quizLayout.clear();
  }

  // 给每个押题按钮右侧补一枚「诊断报告」入口（同一父容器只挂一枚），共享一个抽屉
  var seenHeads = [];
  var triggers = document.querySelectorAll('.quiz-trigger');
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    if (seenHeads.indexOf(trigger.parentNode) !== -1) continue;
    seenHeads.push(trigger.parentNode);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-trigger dv-inline';
    btn.title = '读取 docs/' + FILE;
    btn.innerHTML = '<span>📋 诊断报告</span>';
    btn.addEventListener('click', open);
    trigger.insertAdjacentElement('afterend', btn);
  }
  if (!triggers.length) {
    console.warn('[doc-viewer] 页面上没有押题按钮，诊断报告入口未挂载');
  }

  drawer.querySelector('.dv-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
`

/** 在 </body> 前注入诊断报告按钮与抽屉；传 inlineDocHtml 则内联报告正文（静态页用） */
export function injectDocViewer(html: string, inlineDocHtml?: string | null): string {
  // JSON.stringify 产出合法 JS 字面量，再把 < 转义防止内容里出现 </script> 提前闭合
  const inline = inlineDocHtml ? JSON.stringify(inlineDocHtml).replace(/</g, '\\u003c') : 'null'
  const snippet = [
    `<style>${VIEWER_CSS}</style>`,
    `<script>${VIEWER_JS.replace('__DOC_INLINE__', inline)}</script>`,
  ].join('\n')

  return html.includes('</body>')
    ? html.replace('</body>', `${snippet}\n</body>`)
    : `${html}\n${snippet}`
}
