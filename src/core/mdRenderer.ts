/**
 * dev 面板专用的轻量 Markdown 渲染器（非通用实现，不参与 HTML/PDF 构建）：
 * 支持围栏代码块、行内代码、粗体/斜体、链接、图片、1-4 级标题、
 * 有序/无序列表、引用、分隔线；段内单换行按 <br/> 处理，
 * 以适配中文技术问答里「一行一条要点」的书写习惯。
 *
 * 消费方有两处：injectQuizPanel（题包内嵌解答预渲染）、
 * serve.ts 的 /api/quiz/answer 接口（外置解答 md 文件按需读取渲染）。
 */

const BLOCK_START_RE = /^(?:#{1,4}\s|>|\s*[-*]\s+|\s*\d+\.\s+)/
const HR_RE = /^\s*(?:-{3,}|\*{3,})\s*$/

/** HTML 转义：markdown 渲染前先脱敏，避免原始文本注入标签 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isFence(l: string): boolean {
  return l.startsWith('```')
}

function isBlockStart(l: string): boolean {
  return BLOCK_START_RE.test(l) || HR_RE.test(l) || isFence(l)
}

function inlineMd(t: string): string {
  let s = escapeHtml(t)
  s = s.replace(/`([^`]+)`/g, (_m, c: string) => `<code>${c}</code>`)
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  // 图片要先于链接处理（两者语法前缀相同）
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt: string, url: string) => {
    const safe = /^(?:https?:\/\/|\/)/.test(url) ? url : ''
    return safe ? `<img src="${safe}" alt="${alt}" loading="lazy">` : ''
  })
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, txt: string, url: string) => {
    const safe = /^(?:https?:\/\/|mailto:|#|\/)/i.test(url) ? url : '#'
    return `<a href="${safe}" target="_blank" rel="noopener">${txt}</a>`
  })
  return s
}

/**
 * 把一段 markdown 文本渲染为 HTML 片段。
 * 外置解答文件会先剥掉 front-matter 与 `# ` 顶级标题（详情视图已有题目标题区），
 * 避免与宿主面板的标题层级打架。
 */
export function renderMarkdown(src: string, opts: { stripFrontMatter?: boolean } = {}): string {
  let body = src || ''
  if (opts.stripFrontMatter) {
    const fm = body.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
    if (fm)
      body = body.slice(fm[0].length)
    body = body.split(/\r?\n/).filter(l => !/^#\s+/.test(l)).join('\n')
  }

  const lines = body.split(/\r?\n/)
  const out: string[] = []
  let i = 0

  // 从当前位置收集连续满足 test 的行（并去标），同时推进游标 i
  const takeWhile = (test: (l: string) => boolean, strip: (l: string) => string): string[] => {
    const acc: string[] = []
    while (i < lines.length && test(lines[i])) {
      acc.push(strip(lines[i]))
      i++
    }
    return acc
  }

  while (i < lines.length) {
    const line = lines[i]
    if (isFence(line)) {
      i++
      const buf = takeWhile(l => !isFence(l), l => l)
      i++
      out.push(`<pre class="q-code"><code>${escapeHtml(buf.join('\n'))}</code></pre>`)
      continue
    }
    const h = line.match(/^(#{1,4})\s+(.*)/)
    if (h) {
      const lvl = Math.min(h[1].length + 3, 6)
      out.push(`<h${lvl} class="q-h">${inlineMd(h[2])}</h${lvl}>`)
      i++
      continue
    }
    if (HR_RE.test(line)) {
      out.push('<hr class="q-hr"/>')
      i++
      continue
    }
    if (/^>\s?/.test(line)) {
      const bq = takeWhile(l => /^>\s?/.test(l), l => l.replace(/^>\s?/, ''))
      out.push(`<blockquote class="q-quote">${bq.map(inlineMd).join('<br/>')}</blockquote>`)
      continue
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = takeWhile(l => /^\s*[-*]\s+/.test(l), l => l.replace(/^\s*[-*]\s+/, ''))
      out.push(`<ul class="q-ul">${items.map(it => `<li>${inlineMd(it)}</li>`).join('')}</ul>`)
      continue
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = takeWhile(l => /^\s*\d+\.\s+/.test(l), l => l.replace(/^\s*\d+\.\s+/, ''))
      out.push(`<ol class="q-ol">${items.map(it => `<li>${inlineMd(it)}</li>`).join('')}</ol>`)
      continue
    }
    if (!line.trim()) {
      i++
      continue
    }
    const para = takeWhile(l => Boolean(l.trim()) && !isBlockStart(l), l => l)
    out.push(`<p class="q-p">${para.map(inlineMd).join('<br/>')}</p>`)
  }
  return out.join('')
}
