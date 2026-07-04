import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import gravatar from 'gravatar'
import Handlebars from 'handlebars'
import _ from 'underscore'
import {
  formatEducationDates,
  formatSkillLevel,
  formatWorkDates,
  getNetwork,
  getRepoStars,
  getUrlFromUsername,
  normalizeLanguages,
} from '../utils'
import { registerHelpers } from './helpers'

const SOCIAL_SITES = [
  'github',
  'linkedin',
  'stackoverflow',
  'twitter',
  'soundcloud',
  'pinterest',
  'vimeo',
  'behance',
  'codepen',
  'foursquare',
  'reddit',
  'spotify',
  'dribble',
  'dribbble',
  'facebook',
  'angellist',
  'bitbucket',
  'skype',
]

export async function render(resume: Resume, templatePath?: string, cssPath?: string): Promise<string> {
  const resolvedTemplatePath = templatePath || path.join(process.cwd(), 'src/templates/default/resume.hbs')
  const resolvedCssPath = cssPath || path.join(process.cwd(), '/src/assets/css/theme.css')

  let css: string
  try {
    css = fs.readFileSync(resolvedCssPath, 'utf-8')
  }
  catch {
    console.log('未找到theme.css，使用theme.min.css')
    css = fs.readFileSync(resolvedCssPath.replace('.css', '.min.css'), 'utf-8')
  }

  const template = fs.readFileSync(resolvedTemplatePath, 'utf-8')

  registerHelpers()

  const profiles = resume.basics.profiles

  if (!!resume.basics && !!resume.basics.email && !resume.basics.picture) {
    resume.basics.picture = gravatar.url(resume.basics.email.replace('(at)', '@'), {
      s: '100',
      r: 'pg',
      d: 'mm',
    })
  }

  resume.basics.languages = normalizeLanguages(resume.basics.languages)

  if (resume.work) {
    _.each(resume.work, formatWorkDates)
  }

  if (resume.skills) {
    _.each(resume.skills, formatSkillLevel)
  }

  if (resume.education) {
    _.each(resume.education, formatEducationDates)
  }

  _.each(SOCIAL_SITES, (site) => {
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

  return Handlebars.compile(template)({
    css,
    resume,
  })
}
