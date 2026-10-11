import Handlebars from 'handlebars'
import moment from 'moment'

/**
 * 注册模板所需的全部 Handlebars helpers
 */
export function registerTemplateHelpers(): void {
  // 根据 network 字段映射 RemixIcon 图标名
  // https://icones.netlify.app/collection/ri
  // 未命中映射时兜底为通用链接图标，避免 data-icon 为空导致图标位塌陷
  Handlebars.registerHelper('toSocialIcon', (text: string) => {
    const iconMap: Record<string, string> = {
      linkedin: 'ri:linkedin-box-fill',
      github: 'ri:github-fill',
      gitee: 'ri:git-repository-private-fill',
      instagram: 'ri:instagram-line',
      twitter: 'ri:twitter-fill',
      website: 'ri:global-line',
      link: 'ri:arrow-right-up-line',
      portfolio: 'ri:account-circle-fill',
      knowledge: 'ri:book-3-fill',
      book: 'ri:book-2-fill',
      blog: 'ri:article-fill',
      wechat: 'ri:wechat-fill',
    }
    return iconMap[text.trim().toLowerCase()] ?? 'ri:link'
  })

  // 根据 showPDF / printHidden 字段输出对应 class，控制打印时是否显示该项目。
  // 优先级：显式声明 showPDF 时以其为准（false = 隐藏）；
  // 未声明 showPDF 时回退到旧的 printHidden 语义（true = 隐藏）。
  Handlebars.registerHelper('domClasses', function (this: { printHidden?: boolean, showPDF?: boolean }) {
    const hidden = typeof this.showPDF === 'boolean' ? !this.showPDF : !!this.printHidden
    return hidden ? 'print-hide-project' : ''
  })

  // 将文本中的换行符转换为 <br>
  Handlebars.registerHelper('breaklines', (text: string) => {
    let escaped = Handlebars.Utils.escapeExpression(text)
    escaped = escaped.replace(/(\r\n|\n|\r)/g, '<br>')
    return new Handlebars.SafeString(escaped)
  })

  // 职位标题中英混排时，把拉丁词包进 .latin-no-track：打印区的宽字距（tracking）
  // 是中文印刷手法，英文跟着加会逐字母散开；先按原文分段再逐段转义，
  // 避免在 HTML 实体（如 &amp;）内部插入标签破坏转义
  Handlebars.registerHelper('trackLatin', (text: string) => {
    const parts = String(text ?? '').split(/([A-Za-z0-9][A-Za-z0-9+/.-]*)/)
    const html = parts
      .map((part, index) => (index % 2 === 1
        ? `<span class="latin-no-track">${Handlebars.Utils.escapeExpression(part)}</span>`
        : Handlebars.Utils.escapeExpression(part)))
      .join('')
    return new Handlebars.SafeString(html)
  })

  Handlebars.registerHelper('getBuildDate', () => {
    return moment().format('YYYY-MM-DD HH:mm')
  })
}
