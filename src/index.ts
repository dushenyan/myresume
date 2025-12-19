import type { Education, Resume } from './types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import gravatar from 'gravatar'
import Handlebars from 'handlebars'
import moment from 'moment'
import _ from 'underscore'

const githubRepoCache: Record<string, { stargazers_count: number | string }> = {}

function getNetwork(profiles: Array<{ network: string, username: string, url?: string }> | undefined, network_name: string) {
  return _.find(profiles || [], (profile) => {
    return profile.network.toLowerCase() === network_name
  })
}

function humanizeDuration(moment_obj: moment.Duration, did_leave_company: boolean): string {
  let days
  const months = moment_obj.months()
  const years = moment_obj.years()
  const month_str = months > 1 ? 'months' : 'month'
  const year_str = years > 1 ? 'years' : 'year'

  if (months && years) {
    return `${years} ${year_str} ${months} ${month_str}`
  }

  if (months) {
    return `${months} ${month_str}`
  }

  if (years) {
    return `${years} ${year_str}`
  }

  if (did_leave_company) {
    days = moment_obj.days()
    return (days > 1 ? `${days} days` : `${days} day`)
  }
  else {
    return 'Recently joined'
  }
}

function getUrlFromUsername(site: string, username: string) {
  const url_map: Record<string, string> = {
    github: 'github.com',
    twitter: 'twitter.com',
    soundcloud: 'soundcloud.com',
    pinterest: 'pinterest.com',
    vimeo: 'vimeo.com',
    behance: 'behance.net',
    codepen: 'codepen.io',
    foursquare: 'foursquare.com',
    reddit: 'reddit.com',
    spotify: 'spotify.com',
    dribble: 'dribbble.com',
    dribbble: 'dribbble.com',
    facebook: 'facebook.com',
    angellist: 'angel.co',
    bitbucket: 'bitbucket.org',
  }

  site = site.toLowerCase()

  if (!username || !url_map[site]) {
    return
  }

  switch (site) {
    case 'skype':
      return `skype:${username}?call`
    case 'reddit':
    case 'spotify':
      return `//` + `open.${url_map[site]}/user/${username}`
    default:
      return `//${url_map[site]}/${username}`
  }
}

// function getGithubApi(url) {
//   return url.replace('https://github.com/', 'https://api.github.com/repos/')
// }

async function getRepoStars(url: string) {
  if (githubRepoCache[url])
    return githubRepoCache[url].stargazers_count
  // try {
  //   const api = getGithubApi(url)
  //   const { data } = await axios.get(api)
  //   githubRepoCache[url] = data
  //   return data.stargazers_count
  // }
  // catch(e){
  //   console.error(e)
  //   return 'NaN'
  // }
}

export async function render(resume: Resume) {
  const css = fs.readFileSync(path.join(process.cwd(), '/assets/css/theme.css'), 'utf-8')
  const template = fs.readFileSync(path.join(process.cwd(), '/resume/resume.hbs'), 'utf-8')
  const profiles = resume.basics.profiles
  const social_sites = ['github', 'linkedin', 'stackoverflow', 'twitter', 'soundcloud', 'pinterest', 'vimeo', 'behance', 'codepen', 'foursquare', 'reddit', 'spotify', 'dribble', 'dribbble', 'facebook', 'angellist', 'bitbucket', 'skype']
  const date_format = 'YYYY.MM'

  if (!!resume.basics && !!resume.basics.email && !resume.basics.picture) {
    resume.basics.picture = gravatar.url(resume.basics.email.replace('(at)', '@'), {
      s: '100',
      r: 'pg',
      d: 'mm',
    })
  }

  if (resume.languages) {
    resume.basics.languages = _.pluck(resume.languages, 'language').join(', ')
  }

  if (resume.work) {
    _.each(resume.work, (work_info) => {
      const start_date = work_info.startDate && new Date(work_info.startDate)
      let end_date = work_info.endDate && new Date(work_info.endDate)

      if (start_date) {
        work_info.startDate = moment(start_date).format(date_format)
      }

      if (end_date) {
        work_info.endDate = moment(end_date).format(date_format)
      }

      const did_leave_company: boolean = !!end_date

      if (start_date) {
        end_date = end_date || new Date()
        work_info.duration = humanizeDuration(
          moment.duration(end_date.getTime() - start_date.getTime()),
          did_leave_company,
        )
      }
    })
  }

  if (resume.skills) {
    _.each(resume.skills, (skill_info) => {
      const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master']

      if (skill_info.level) {
        skill_info.skill_class = skill_info.level.toLowerCase()
        const trimmed = skill_info.level.trim()
        skill_info.level = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
        skill_info.display_progress_bar = _.contains(levels, skill_info.level)
      }
    })
  }

  if (resume.education) {
    _.each(resume.education, (education_info) => {
      // 处理教育日期格式化
      const date_fields: Array<keyof Education> = ['startDate', 'endDate']
      _.each(date_fields, (date_field) => {
        const education_date = education_info[date_field]
        
        if (education_date && typeof education_date === 'string') {
          const date_obj = new Date(education_date)
          const formatted_date = moment(date_obj).format(date_format)
          ;(education_info as Record<string, any>)[date_field] = formatted_date
        }
      })
    })
  }

  _.each(social_sites, (site) => {
    const social_account = getNetwork(profiles, site)

    if (social_account) {
      (resume.basics as Record<string, any>)[`${site}_url`]
        = getUrlFromUsername(site, social_account.username) || social_account.url
    }
  })

  if (resume.projects) {
    for (const project of resume.projects) {
      if (project.githubUrl)
        project.stars = await getRepoStars(project.githubUrl)
    }
  }

  // 索引图标
  // https://icones.netlify.app/collection/ri
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
    }
    return iconMap[text.trim().toLowerCase()]
  })

  Handlebars.registerHelper('join', (arr) => {
    return arr.join(', ')
  })

  // Handlebars.registerHelper('getGithubApi', getGithubApi)

  Handlebars.registerHelper('breaklines', (text) => {
    text = Handlebars.Utils.escapeExpression(text)
    text = text.replace(/(\r\n|\n|\r)/g, '<br>')
    return new Handlebars.SafeString(text)
  })

  Handlebars.registerHelper('getBuildDate', () => {
    return moment().format('YYYY-MM-DD hh:mm')
  })

  return Handlebars.compile(template)({
    css,
    resume,
  })
}
