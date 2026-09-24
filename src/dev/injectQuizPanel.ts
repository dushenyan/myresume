/**
 * dev 预览专用：把押题面板（数据 JSON + 样式 + 脚本）注入到 HTML 的 </body> 前
 *
 * 只在 serve.ts 的响应阶段拼接，不写盘、不进构建管线，
 * 因此 dist/index.html 与 PDF 天然不含任何面板痕迹。
 */
import type { QuizBank } from '../core/quiz'

/** 面板样式：抽屉 + 触发按钮（无遮罩，打开时页面内容让位左移）；@media print 兜底隐藏 */
const PANEL_CSS = `
.quiz-trigger { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; padding: 1px 8px; font-size: 11px; line-height: 1.6; color: #428bca; background: rgba(66, 139, 202, 0.08); border: 1px solid rgba(66, 139, 202, 0.35); border-radius: 10px; cursor: pointer; vertical-align: middle; }
.quiz-trigger:hover { background: rgba(66, 139, 202, 0.16); }
/* 无遮罩方案：抽屉打开时 .container 整体左移让位（JS 实测写入 --quiz-shift / 宽度，
   视口不够时压缩内容宽度，保证正文右缘与抽屉之间始终留有间距） */
.container { transition: transform 0.25s ease, width 0.25s ease, margin-left 0.25s ease; }
body.quiz-open .container { transform: translateX(var(--quiz-shift, -420px)); }
.quiz-drawer { position: fixed; top: 0; right: 0; height: 100%; width: min(420px, 92vw); background: #fff; box-shadow: -8px 0 32px rgba(15, 23, 42, 0.18); transform: translateX(100%); transition: transform 0.25s ease; z-index: 1001; display: flex; flex-direction: column; overflow: hidden; font-size: 13px; color: #333; }
.quiz-drawer.quiz-show { transform: none; }
.quiz-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 16px 18px 10px; border-bottom: 1px solid #eef0f3; }
.quiz-head h3 { margin: 0 0 2px; font-size: 15px; }
.quiz-stack { margin: 0; color: #888; font-size: 11px; }
.quiz-close { border: 0; background: none; font-size: 20px; line-height: 1; cursor: pointer; color: #999; padding: 2px 6px; }
.quiz-close:hover { color: #333; }
.quiz-progress { display: flex; align-items: center; gap: 10px; padding: 10px 18px 0; }
.quiz-progress-track { flex: 1; height: 4px; background: #e9ecef; border-radius: 2px; overflow: hidden; }
.quiz-progress-bar { height: 100%; width: 0; background: #428bca; border-radius: 2px; transition: width 0.2s ease; }
.quiz-progress span { color: #888; font-size: 11px; white-space: nowrap; }
/* min-height: 0 是 flex 子项滚动的前提：默认 min-height:auto 会被内容撑开，overflow-y 永不触发 */
.quiz-body { overflow-y: auto; min-height: 0; overscroll-behavior: contain; padding: 12px 18px 24px; flex: 1; }
.quiz-body h4 { font-size: 13px; margin: 10px 0 6px; }
.quiz-list { margin: 0; padding: 0; list-style: none; }
.quiz-list li { padding: 8px 10px; border: 1px solid #eef0f3; border-radius: 8px; margin-bottom: 6px; transition: background 0.15s ease; }
.quiz-list li:hover { background: #f8f9fb; }
.quiz-list .q-row { display: flex; gap: 8px; align-items: flex-start; }
.quiz-list input[type=checkbox] { margin-top: 3px; accent-color: #428bca; }
.q-text { flex: 1; text-align: left; border: 0; background: none; padding: 0; font: inherit; color: #333; cursor: pointer; }
.q-text:hover { color: #428bca; }
.quiz-list li.done .q-text { color: #a8adb5; text-decoration: line-through; }
.q-caret { font-style: normal; color: #b5bac2; margin-left: 6px; font-size: 11px; display: inline-block; transition: transform 0.15s ease; }
.quiz-list li.open .q-caret { transform: rotate(180deg); }
.quiz-answer { display: none; margin: 8px 0 0 22px; padding: 8px 12px; background: #f6f8fb; border-left: 3px solid #428bca; border-radius: 0 6px 6px 0; color: #555; line-height: 1.7; }
.quiz-list li.open .quiz-answer { display: block; }
.quiz-hl { margin-top: 14px; border-top: 1px dashed #e5e7eb; padding-top: 10px; }
.quiz-hl summary { cursor: pointer; font-weight: 600; font-size: 13px; }
.quiz-hl .hl-item { margin-top: 8px; }
.quiz-hl .hl-item p { margin: 2px 0 0; color: #666; }
@media print {
  .quiz-trigger, .quiz-drawer { display: none !important; }
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

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var drawer = document.createElement('aside');
  drawer.className = 'quiz-drawer';
  document.body.appendChild(drawer);

  var currentBank = null;
  var baseGeom = null; // 未开抽屉时的容器基准几何（left/width）

  function show() {
    // 让位策略：先左移（不超出屏幕左缘）；若正文右缘仍会与抽屉重叠（含 GAP 间距），
    // 则改为「固定左缘 + 压缩宽度」——不能只缩宽度，否则 bootstrap 的 margin:auto
    // 会重新居中，平移量失效
    var container = document.querySelector('.container');
    var GAP = 24;
    if (container) {
      if (!document.body.classList.contains('quiz-open') || !baseGeom) {
        var r = container.getBoundingClientRect();
        baseGeom = { left: r.left, width: r.width };
      }
      var w = drawer.getBoundingClientRect().width;
      var shift = Math.max(0, Math.min(w, baseGeom.left - 8));
      var newLeft = baseGeom.left - shift;
      var maxRight = window.innerWidth - w - GAP;
      if (newLeft + baseGeom.width > maxRight) {
        container.style.setProperty('--quiz-shift', '0px');
        container.style.maxWidth = 'none';
        container.style.marginLeft = newLeft + 'px';
        container.style.width = Math.max(320, maxRight - newLeft) + 'px';
      } else {
        container.style.setProperty('--quiz-shift', '-' + shift + 'px');
        container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = '';
      }
    }
    document.body.classList.add('quiz-open'); drawer.classList.add('quiz-show');
  }
  function close() {
    document.body.classList.remove('quiz-open'); drawer.classList.remove('quiz-show');
    var container = document.querySelector('.container');
    if (container) { container.style.width = ''; container.style.maxWidth = ''; container.style.marginLeft = ''; }
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

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

  function headHtml(bank) {
    return '<header class="quiz-head"><div><h3>' + esc(bank.title) + '</h3>'
      + (bank.stack ? '<p class="quiz-stack">' + esc(bank.stack) + '</p>' : '')
      + '</div><button type="button" class="quiz-close" aria-label="关闭">×</button></header>';
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

  function renderBank(bank) {
    currentBank = bank;
    var done = loadProgress(bank);
    var html = headHtml(bank)
      + '<div class="quiz-progress"><div class="quiz-progress-track"><div class="quiz-progress-bar"></div></div><span></span></div>'
      + '<div class="quiz-body"><h4>预测押题</h4><ol class="quiz-list">';
    bank.questions.forEach(function (item, i) {
      var hasAns = !!(item.a);
      html += '<li' + (done[i] ? ' class="done"' : '') + '>'
        + '<div class="q-row"><input type="checkbox" data-i="' + i + '" aria-label="标记已掌握"' + (done[i] ? ' checked' : '') + '>'
        + '<button type="button" class="q-text"' + (hasAns ? ' title="展开/收起参考解答"' : ' disabled title="暂无参考解答" style="cursor:default"') + '>' + esc(item.q) + (hasAns ? '<i class="q-caret">▼</i>' : '') + '</button></div>'
        + (hasAns ? '<div class="quiz-answer">' + esc(item.a) + '</div>' : '')
        + '</li>';
    });
    html += '</ol>';
    if (bank.highlights.length) {
      html += '<details class="quiz-hl" open><summary>项目亮点挖掘</summary>';
      bank.highlights.forEach(function (h) {
        html += '<div class="hl-item"><strong>' + esc(h.title) + '</strong><p>' + esc(h.detail) + '</p></div>';
      });
      html += '</details>';
    }
    html += '</div>';
    drawer.innerHTML = html;
    drawer.querySelector('.quiz-close').addEventListener('click', close);
    updateProgressUi();
    show();
  }

  // 点击题目展开/收起解答：事件委托，只绑定一次
  drawer.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.q-text') : null;
    if (!btn || btn.disabled) return;
    var li = btn.closest('li');
    if (li) li.classList.toggle('open');
  });

  // 勾选进度：事件委托挂在 drawer 上，只绑定一次
  drawer.addEventListener('change', function (e) {
    var t = e.target;
    if (!t.matches || !t.matches('input[type=checkbox]') || !currentBank) return;
    var done = loadProgress(currentBank);
    done[Number(t.getAttribute('data-i'))] = t.checked;
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

/** 在 </body> 前注入押题面板；无数据时原样返回 */
export function injectQuizPanel(html: string, banks: QuizBank[]): string {
  if (!banks.length)
    return html

  // \u003c 转义防止 JSON 内容里出现 </script> 提前闭合
  const data = JSON.stringify(banks).replace(/</g, '\\u003c')
  const snippet = [
    `<script type="application/json" id="quiz-data">${data}</script>`,
    `<style>${PANEL_CSS}</style>`,
    `<script>${PANEL_JS}</script>`,
  ].join('\n')

  return html.includes('</body>')
    ? html.replace('</body>', `${snippet}\n</body>`)
    : `${html}\n${snippet}`
}
