/**
 * 「目录大纲」悬浮按钮 + 左侧滑出面板（dev 与生产 HTML 共用）
 *
 * 与 injectQuizPanel / injectDocViewer 同一注入机制：serve.ts 响应阶段拼接，
 * 生产构建（build/html.ts 的 injectResumePanels）构建期内联进 dist/HTML。
 * 与前两者的区别是零运行期依赖（不拉接口不内联数据），纯前端扫描成品 DOM，
 * 同一份注入 dev / 生产通吃；PDF 走未注入的纯净 HTML，浏览器打印由 @media print 隐藏。
 * 默认只显示左下角一枚「目录」胶囊按钮，点击才滑出面板；再点或按 Esc 收起。
 *
 * 面板放左侧而不复用右侧抽屉位：右位已被押题/诊断两个抽屉占用（top/right/bottom 32px），
 * 目录是导航而非内容面板，放左缘就不必参与三方互斥与 .container 让位逻辑。
 * 条目在前端运行时扫描 h4 .title 生成（不依赖 HBS 渲染顺序），
 * 点击平滑滚动到对应标题并高亮当前章节（scroll spy）。
 */

/** 面板样式：左下角触发按钮 + 左侧抽屉；@media print 兜底隐藏 */
const TOC_CSS = `
.toc-toggle { position: fixed; left: 20px; bottom: 24px; z-index: 1002; display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; font-size: 12px; line-height: 1.6; color: #428bca; background: rgba(255, 255, 255, 0.92); border: 1px solid rgba(66, 139, 202, 0.35); border-radius: 14px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12); cursor: pointer; }
.toc-toggle:hover { background: rgba(66, 139, 202, 0.12); }
/* 左侧滑出，宽度收窄到 240px：导航面板不抢正文视线，也无需内容让位 */
.toc-drawer { position: fixed; top: 32px; left: 32px; bottom: 32px; width: min(240px, 80vw); background: #fff; border: 1px solid rgba(15, 23, 42, 0.06); border-radius: 16px; box-shadow: 0 12px 40px rgba(15, 23, 42, 0.16); transform: translateX(calc(-100% - 32px)); transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1); z-index: 1001; display: flex; flex-direction: column; overflow: hidden; font-size: 12px; color: #333; }
.toc-drawer.toc-show { transform: none; }
.toc-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px 14px 10px; border-bottom: 1px solid #eef0f3; }
.toc-head h3 { margin: 0; font-size: 14px; }
.toc-sub { margin: 2px 0 0; color: #9aa0a8; font-size: 11px; }
.toc-close { width: 26px; height: 26px; flex: none; border-radius: 50%; border: 0; background: rgba(15, 23, 42, 0.04); font-size: 17px; line-height: 1; cursor: pointer; color: #999; display: inline-flex; align-items: center; justify-content: center; }
.toc-close:hover { background: rgba(15, 23, 42, 0.08); color: #333; }
/* min-height: 0 是 flex 子项滚动的前提（同 quiz-body/dv-body 的坑） */
.toc-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 8px 8px 14px; }
.toc-list { list-style: none; margin: 0; padding: 0; }
.toc-list li { margin: 0; }
.toc-list a { display: block; padding: 6px 10px; border-radius: 8px; color: #4b5563; text-decoration: none; line-height: 1.5; }
.toc-list a:hover { background: rgba(66, 139, 202, 0.08); color: #2c6cab; }
.toc-list a.active { background: rgba(66, 139, 202, 0.12); color: #2c6cab; font-weight: 600; }
.toc-empty { margin: 10px; color: #9aa0a8; }
@media (max-width: 768px) {
  .toc-drawer { top: 0; left: 0; bottom: 0; width: min(280px, 85vw); border: 0; border-radius: 0; box-shadow: none; transform: translateX(-100%); font-size: 14px; }
  .toc-toggle { left: 12px; bottom: 16px; }
}
@media print {
  .toc-toggle, .toc-drawer { display: none !important; }
}
`

/**
 * 面板行为脚本（浏览器端 ES5 风格原生 JS，字符串注入所以不走 TS 编译）：
 * 1. 扫描 .card h4 的章节标题生成条目，给每个标题补 id 供锚点滚动
 * 2. 左下角按钮点击开合面板；点击条目平滑滚动并标记高亮
 * 3. scroll spy 按视口上沿 1/3 处的最后一个标题更新 .active
 */
const TOC_JS = `
(function () {
  var ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'toc-toggle';
  toggle.title = '显示/隐藏目录大纲';
  toggle.innerHTML = ICON + '<span>目录</span>';
  document.body.appendChild(toggle);

  var drawer = document.createElement('aside');
  drawer.className = 'toc-drawer';
  drawer.innerHTML = '<header class="toc-head"><div><h3>目录大纲</h3><p class="toc-sub">点击跳转章节</p></div>'
    + '<button type="button" class="toc-close" aria-label="关闭">×</button></header>'
    + '<div class="toc-body"><ul class="toc-list" id="toc-list"></ul></div>';
  document.body.appendChild(drawer);

  // 章节标题扫描：模板里所有章节都是 h4 > .title，跳过隐藏于打印的辅助块
  var headings = [];
  var seen = {};
  var nodes = document.querySelectorAll('.card h4');
  for (var i = 0; i < nodes.length; i++) {
    var h = nodes[i];
    var titleEl = h.querySelector('.title');
    var text = ((titleEl || h).textContent || '').trim();
    if (!text || seen[text]) continue;
    seen[text] = true;
    if (!h.id) h.id = 'toc-sec-' + headings.length;
    headings.push({ el: h, text: text });
  }

  var list = document.getElementById('toc-list');
  if (!headings.length) {
    list.innerHTML = '<p class="toc-empty">未扫描到章节标题</p>';
    return;
  }
  var links = [];
  for (var j = 0; j < headings.length; j++) {
    (function (item, index) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + item.el.id;
      a.textContent = item.text;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        scrollTo(index);
      });
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);
    })(headings[j], j);
  }

  function setActive(index) {
    for (var k = 0; k < links.length; k++) {
      links[k].classList.toggle('active', k === index);
    }
  }

  function scrollTo(index) {
    var target = headings[index].el;
    setActive(index);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + target.id);
  }

  // scroll spy：取视口上沿 1/3 线之上的最后一个标题作为当前章节
  function spy() {
    var probe = window.innerHeight / 3;
    var current = 0;
    for (var k = 0; k < headings.length; k++) {
      if (headings[k].el.getBoundingClientRect().top <= probe) current = k;
    }
    setActive(current);
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; spy(); });
  });

  function show() { drawer.classList.add('toc-show'); spy(); }
  function hide() { drawer.classList.remove('toc-show'); }
  toggle.addEventListener('click', function () {
    if (drawer.classList.contains('toc-show')) hide();
    else show();
  });
  drawer.querySelector('.toc-close').addEventListener('click', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
})();
`

/** 在 </body> 前注入目录大纲按钮与面板（dev 预览与生产 HTML 构建共用） */
export function injectTocPanel(html: string): string {
  const snippet = [
    `<style>${TOC_CSS}</style>`,
    `<script>${TOC_JS}</script>`,
  ].join('\n')

  return html.includes('</body>')
    ? html.replace('</body>', `${snippet}\n</body>`)
    : `${html}\n${snippet}`
}
