import Handlebars from 'handlebars'
import moment from 'moment'

export function registerHelpers(): void {
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
    }
    return iconMap[text.trim().toLowerCase()]
  })

  Handlebars.registerHelper('join', (arr) => {
    return arr.join(', ')
  })

  Handlebars.registerHelper('domClasses', function (this: { printHidden?: boolean }) {
    return this.printHidden ? 'print-hide-project' : ''
  })

  Handlebars.registerHelper('breaklines', (text) => {
    text = Handlebars.Utils.escapeExpression(text)
    text = text.replace(/(\r\n|\n|\r)/g, '<br>')
    return new Handlebars.SafeString(text)
  })

  Handlebars.registerHelper('getBuildDate', () => {
    return moment().format('YYYY-MM-DD hh:mm')
  })
}
