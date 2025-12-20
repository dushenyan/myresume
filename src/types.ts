/**
 * 简历基础信息
 */
export interface ResumeBasics {
  /**
   * 姓名
   */
  name: string
  /**
   * 技术职称
   */
  label?: string
  /**
   * 头像
   */
  picture?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 个人网站
   */
  website?: string
  /**
   * 职业头衔
   */
  headline?: string
  /**
   * 个人简介
   */
  summary?: string
  /**
   * 地址
   */
  address?: string
  /**
   * 项目地址
   */
  projects_url?: string
  /**
   * 头像
   */
  image_avatar?: string
  /**
   * github用户名
   */
  username?: string
  /**
   * html标题以及文件标签
   */
  html_title?: string
  /**
   * 语言
   */
  languages?: Array<{ language: string, fluency?: string }> | string
  /**
   * 社交账号
   */
  profiles?: Array<{
    /**
     * 社交账号类型
     * index.ts:202 可以配置自定义图标
     */
    network: string
    /**
     * 用户名
     */
    username: string
    /**
     * 链接
     */
    url?: string
  }>
}

export interface Skill {
  /**
   * 技能名称
   */
  category: string
  /**
   * 技能等级
   */
  level?: string
  /**
   * 关键词
   */
  keywords?: string[]
  /**
   * 技能类别
   */
  skill_class?: string
  /**
   * 是否显示进度条
   */
  display_progress_bar?: boolean
}

/**
 * 项目
 */
export interface Project {
  /**
   * 项目名称
   */
  name: string
  /**
   * 全称
   */
  displayName?: string
  /**
   * 项目摘要
   */
  summary?: string
  /**
   * 基于主语言
   */
  primaryLanguage?: string[]
  /**
   * 项目描述
   */
  description?: string
  /**
   * 项目地址
   */
  githubUrl?: string
  /**
   * 星数
   */
  stars?: number | string
  /**
   * 成就
   */
  achievements?: string[]
}

/**
 * 工作经历
 */
export interface Work {
  /**
   * 公司
   */
  company?: string
  /**
   * 职位
   */
  position?: string
  /**
   * 公司官网
   */
  website?: string
  /**
   * 开始日期
   */
  startDate?: string
  /**
   * 结束日期
   */
  endDate?: string
  /**
   * 工作方向
   */
  summary?: string
  /**
   * 工作描述
   */
  description?: string
  /**
   * 详细描述
   */
  highlights?: string[]
  /**
   * 工作持续时间
   */
  duration?: string
  /**
   * 工作地点
   */
  location?: string
  /**
   * 是否是当前角色
   */
  isCurrentRole?: boolean
  /**
   * 开始日期
   */
  start: {
    year?: number
    month?: number
    day?: number
  }
  /**
   * 结束日期
   */
  end: {
    year?: number
    month?: number
    day?: number
  }
}

/**
 * 教育经历
 */
export interface Education {
  /**
   * 学校
   */
  institution?: string
  /**
   * 专业
   */
  area?: string
  /**
   * 学历
   */
  studyType?: string
  /**
   * 开始日期
   */
  startDate?: string
  /**
   * 结束日期
   */
  endDate?: string
  /**
   * 学位
   */
  gpa?: string
  /**
   * 课程
   */
  courses?: string[]
  /**
   * 开始日期
   */
  start: {
    year?: number
    month?: number
    day?: number
  }
  /**
   * 结束日期
   */
  end: {
    year?: number
    month?: number
    day?: number
  }
  /**
   * 系别
   */
  department?: string
  /**
   * 活动
   */
  activities?: string
  /**
   * 描述
   */
  description?: string
}

/**
 * 认证
 */
export interface Certifications {
  /**
   * 认证名称
   */
  name?: string
  /**
   * 颁发机构
   */
  issuer?: string
  /**
   * 颁发日期
   */
  date?: string
  /**
   * 认证链接
   */
  url?: string
  /**
   * 认证编号
   */
  number?: string
  /**
   * 认证类型
   */
  type?: string
  /**
   * 取得日期
   */
  fullDate?: {
    year?: number
    month?: number
    day?: number
  }
}
/**
 * 奖项
 */
export interface Awards {
  /**
   * 奖项名称
   */
  title?: string
  /**
   * 颁发机构
   */
  awarder?: string
  /**
   * 颁发日期
   */
  date?: string
  /**
   * 奖项摘要
   */
  summary?: string
  /**
   * 取得日期
   */
  fullDate?: {
    year?: number
    month?: number
    day?: number
  }
}
export interface Publications {
  /**
   * 名称
   */
  name?: string
  /**
   * 发布平台
   */
  publisher?: string
  /**
   * 发布日期
   */
  releaseDate?: string
  /**
   * 链接
   */
  url?: string
  /**
   * 摘要
   */
  summary?: string
}
/**
 * 推荐信
 */
export interface References {
  /**
   * 姓名
   */
  name: string
  /**
   * 职位
   */
  position?: string
  /**
   * 评价
   */
  reference?: string
}

/**
 * 简历
 */
export interface Resume {
  /**
   * 基本信息
   */
  basics: ResumeBasics
  /**
   * 工作经历
   */
  work?: Work[]
  /**
   * 教育经历
   */
  education?: Education[]
  /**
   * 技能
   */
  skills?: Skill[]
  /**
   * 项目
   */
  projects?: Project[]
  /**
   * 认证
   */
  certifications?: Certifications[]
  /**
   * 发表物
   */
  publications?: Publications[]
  /**
   * 奖项
   */
  awards?: Awards[]
  /**
   * 兴趣
   */
  interests?: string[]
  /**
   * 外人评价
   */
  references?: References[]
  /**
   * 自我评价
   */
  selfEvaluate?: string[]
}


