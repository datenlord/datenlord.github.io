import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Cover } from '@/components/Cover'
import { AboutUsSection } from './AboutUsSection'
// import { QuickQA } from './QuickQ&A'
import { VisionMissionValuesSection } from './VisionMissionValues'
import { ContactUsSection } from './ContactUsSection'

import CoverUrl from '@/assets/company/cover.png'

export default () => {
  const { sectionId } = useParams()
  useEffect(() => {
    const sectionEl = document.querySelector(`#${sectionId}`)
    if (sectionEl) {
      sectionEl?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [sectionId])
  return (
    <React.Fragment>
      <Cover
        cover={CoverUrl}
        subTitle="达坦科技通过软硬件深度融合的方式，提供 AI 推理引擎和高性能网络，打造高性能 AI + Cloud 基础设施平台。"
      >
        公司
      </Cover>
      <AboutUsSection />
      {/* <QuickQA /> */}
      <VisionMissionValuesSection />
      <ContactUsSection />
    </React.Fragment>
  )
}
