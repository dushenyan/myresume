export interface ResumeBasics {
  languages: string
  name: string
  label?: string
  picture?: string
  email?: string
  phone?: string
  website?: string
  summary?: string
  location?: {
    address?: string
    postalCode?: string
    city?: string
    countryCode?: string
    region?: string
  }
  profiles?: Array<{
    network: string
    username: string
    url?: string
  }>
}

export interface Skill {
  name: string
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
  githubUrl?: string
  stars?: number | string
}

export interface Work {
  company?: string
  position?: string
  website?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  duration?: string
}

export interface Education {
  institution?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  gpa?: string
  courses?: string[]
}

export interface Resume {
  basics: ResumeBasics
  work?: Work[]
  education?: Education[]
  skills?: Skill[]
  projects?: Project[]
  languages?: Array<{ language: string, fluency?: string }>
  interests?: any[]
  references?: any[]
  selfEvaluate?: string[]
}
