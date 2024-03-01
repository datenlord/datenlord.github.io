import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import { OpenSourceCommunity } from './OpenSourceCommunitySection'
import { LearnCommunitySection } from './LearnCommunitySection'
import { ProductSection } from '../Home/ProductSection'

import coverUrl from '@/assets/resources/cover.png'
import cloudUrl from '@/assets/resources/cloud.png'

const { Heading } = Typography
const { CNHead4 } = Heading

const PageWrapper = styled.div`
  z-index: 1;
  position: relative;
  background: #ededf6;
  overflow: hidden;
`
const PageContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.4rem;
  padding-inline: 2.04rem;
`
const PageTitle = styled(CNHead4)`
  padding-bottom: 0.98rem;
  text-align: center;
`
const CloudBg = styled.img`
  z-index: -1;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 20.14rem;
  height: 5.42rem;
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
      <Cover cover={coverUrl}>资源</Cover>
      <PageWrapper>
        <PageContainer id="community">
          <PageTitle>社区</PageTitle>
          <OpenSourceCommunity />
          <div style={{ marginInline: '-2.04rem' }}>
            <ProductSection />
          </div>
          <LearnCommunitySection />
        </PageContainer>
        <CloudBg src={cloudUrl} />
      </PageWrapper>
    </React.Fragment>
  )
}
