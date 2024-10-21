import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import CoverUrl from '@/assets/company/cover.png'

import { WhyChooseSection } from './WhyChooseSection'
import { LookingForSection } from './LookingForSection'
import { ProvideWhatSection } from './ProvideWhatSection'
import { RecruitmentSection } from './RecruitmentSection'
import { ContactUsSection } from './ContactUsSection'

const { Heading } = Typography
const { CNHead4 } = Heading

const SectionWrapper = styled.section`
  background: #fff;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.69rem;
  padding-inline: 1.93rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 1.23rem;
  text-align: center;
`

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
        subTitle="达坦科技通过软硬件深度融合的方式，提供高性能存储和高性能网络，打造高性能 AI + Cloud 基础设施平台。"
      >
        公司
      </Cover>
      <SectionWrapper id='join-us'>
        <SectionContainer>
          <SectionTitle>加入我们</SectionTitle>
          <WhyChooseSection />
          <LookingForSection />
          <ProvideWhatSection />
          <RecruitmentSection />
        </SectionContainer>
      </SectionWrapper>
      <ContactUsSection />
    </React.Fragment>
  )
}
