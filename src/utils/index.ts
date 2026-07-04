import type { Education, ResumeBasics } from '../types'
import moment from 'moment'
import _ from 'underscore'

const githubRepoCache: Record<string, { stargazers_count: number | string }> = {}

export function getNetwork(profiles: Array<{ network: string, username: string, url?: string }> | undefined, network_name: string) {
  return _.find(profiles || [], (profile) => {
    return profile.network.toLowerCase() === network_name
  })
}

export function humanizeDuration(moment_obj: moment.Duration, did_leave_company: boolean): string {
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

export function getUrlFromUsername(site: string, username: string) {
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

export async function getRepoStars(url: string) {
  if (githubRepoCache[url])
    return githubRepoCache[url].stargazers_count
}

export function formatDate(dateStr: string | undefined, format: string = 'YYYY.MM'): string | undefined {
  if (!dateStr)
    return undefined
  return moment(new Date(dateStr)).format(format)
}

export function formatEducationDates(education_info: Education): void {
  const date_fields: Array<keyof Education> = ['startDate', 'endDate']
  _.each(date_fields, (date_field) => {
    const education_date = education_info[date_field]

    if (education_date && typeof education_date === 'string') {
      const date_obj = new Date(education_date)
      const formatted_date = moment(date_obj).format('YYYY.MM')
      ; (education_info as Record<string, any>)[date_field] = formatted_date
    }
  })
}

export function formatWorkDates(work_info: { startDate?: string, endDate?: string, duration?: string }): void {
  const date_format = 'YYYY.MM'
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
}

export function formatSkillLevel(skill_info: { level?: string, skill_class?: string, display_progress_bar?: boolean }): void {
  if (!skill_info.level)
    return

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master']
  skill_info.skill_class = skill_info.level.toLowerCase()
  const trimmed = skill_info.level.trim()
  skill_info.level = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  skill_info.display_progress_bar = _.contains(levels, skill_info.level)
}

export function normalizeLanguages(languages: ResumeBasics['languages']): string {
  if (typeof languages === 'string')
    return languages
  if (Array.isArray(languages))
    return _.pluck(languages, 'language').join(', ')
  return ''
}
