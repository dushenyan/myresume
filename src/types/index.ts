export interface ResumeBasics {
  name: string
  label?: string
  picture?: string
  email?: string
  phone?: string
  wechat?: string
  website?: string
  headline?: string
  summary?: string
  address?: string
  projects_url?: string
  image_avatar?: string
  username?: string
  html_title?: string
  languages?: Array<{ language: string, fluency?: string }> | string
  printHideAvatar?: boolean
  profiles?: Array<{
    network: string
    username: string
    url?: string
  }>
}

export interface Skill {
  category: string
  level?: string
  keywords?: string[]
  skill_class?: string
  display_progress_bar?: boolean
}

export interface Project {
  name: string
  displayName?: string
  summary?: string
  primaryLanguage?: string[]
  description?: string
  responsibilities?: string[]
  githubUrl?: string
  stars?: number | string
  achievements?: string[]
  printHidden?: boolean
}

export interface Work {
  company?: string
  companyInfo?: string
  position?: string
  website?: string
  startDate?: string
  endDate?: string
  summary?: string
  description?: string
  highlights?: string[]
  duration?: string
  location?: string
  isCurrentRole?: boolean
  start: {
    year?: number
    month?: number
    day?: number
  }
  end: {
    year?: number
    month?: number
    day?: number
  }
}

export interface Education {
  institution?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  gpa?: string
  courses?: string[]
  start: {
    year?: number
    month?: number
    day?: number
  }
  end: {
    year?: number
    month?: number
    day?: number
  }
  department?: string
  activities?: string
  description?: string
}

export interface Certifications {
  name?: string
  issuer?: string
  date?: string
  url?: string
  number?: string
  type?: string
  fullDate?: {
    year?: number
    month?: number
    day?: number
  }
}

export interface Awards {
  title?: string
  awarder?: string
  date?: string
  summary?: string
  fullDate?: {
    year?: number
    month?: number
    day?: number
  }
}

export interface Publications {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

export interface References {
  name: string
  position?: string
  reference?: string
}

export interface Resume {
  basics: ResumeBasics
  work?: Work[]
  education?: Education[]
  skills?: Skill[]
  projects?: Project[]
  certifications?: Certifications[]
  publications?: Publications[]
  awards?: Awards[]
  interests?: string[]
  references?: References[]
  selfEvaluate?: string[]
  personalProjects?: Project[]
}

export interface TemplateConfig {
  name: string
  displayName: string
  templatePath: string
  dataSource: string
  cssPath?: string
}

export interface BuildOptions {
  template?: string
  dataSource?: string
  outputDir?: string
  format?: 'html' | 'pdf' | 'all'
  watch?: boolean
  port?: number
}
