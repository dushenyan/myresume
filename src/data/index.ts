/**
 * 共享简历数据入口
 *
 * data/ 目录将简历数据按模块拆分（basicInfo、work、projects 等），
 * 此入口只负责组装一份与 profile 无关的基础简历（assembleBaseResume），
 * 供 src/profiles/ 下的各简历配置在其上做覆盖与筛选。
 *
 * 模块拆分动机：
 * 1. 单文件膨胀至数百行，定位某个项目需大量滚动浏览
 * 2. 不同模块更新频率差异大（基本信息高频，教育低频），混在一起易误改
 * 3. 个人/公司项目、奖项等可独立维护，便于按岗位 JD 动态调整
 */
import type { Resume } from '../types'
import { awards } from './awards'
import { basicInfo } from './basics'
import { education } from './education'
import { interests } from './interests'
import { personalProjects } from './personalProjects'
import { projects } from './projects'
import { selfEvaluate } from './selfEvaluate'
import { skills } from './skills'
import { work } from './work'

/**
 * 组装与简历配置无关的基础数据
 *
 * basics 通过浅拷贝 basicInfo 生成，避免外部对 resume.basics 的修改
 * 反向污染 basicInfo 模块。属性顺序即生成 JSON 的键顺序（沿用简历
 * 标准字段顺序 basics、work、education、skills、projects），
 * 勿随意调整。
 */
export function assembleBaseResume(): Resume {
  return {
    basics: {
      ...basicInfo,
    },
    work,
    education,
    skills,
    projects,
    selfEvaluate,
    awards,
    interests,
    personalProjects,
  }
}
