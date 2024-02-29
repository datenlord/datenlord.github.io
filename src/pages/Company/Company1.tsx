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
        subTitle="通过实现跨云、跨数据中心的数据高速访问，DatenLord将大大提升存储系统的可扩展性，同时大大降低企业级IT业务系统在实现高可用性、多活方面的复杂性。随着多云、多数据中心成为企业级IT的主流架构，跨云分布式存储将在互联网、金融、电信、能源等不同行业得到广泛应用。"
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
