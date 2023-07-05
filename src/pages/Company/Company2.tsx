import React from 'react'
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
  return (
    <React.Fragment>
      <Cover
        cover={CoverUrl}
        subTitle="通过实现跨云、跨数据中心的数据高速访问，DatenLord将大大提升存储系统的可扩展性，同时大大降低企业级IT业务系统在实现高可用性、多活方面的复杂性。随着多云、多数据中心成为企业级IT的主流架构，跨云分布式存储将在互联网、金融、电信、能源等不同行业得到广泛应用。"
      >
        公司
      </Cover>
      <SectionWrapper>
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
