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

  // 根据 printHidden 字段输出对应 class，控制打印时是否显示该项目
  Handlebars.registerHelper('domClasses', function (this: { printHidden?: boolean }) {
    return this.printHidden ? 'print-hide-project' : ''
  })

  // 将文本中的换行符转换为 <br>
  Handlebars.registerHelper('breaklines', (text: string) => {
    let escaped = Handlebars.Utils.escapeExpression(text)
    escaped = escaped.replace(/(\r\n|\n|\r)/g, '<br>')
    return new Handlebars.SafeString(escaped)
  })

  Handlebars.registerHelper('getBuildDate', () => {
    return moment().format('YYYY-MM-DD HH:mm')
  })
}
