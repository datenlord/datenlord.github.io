import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Carousel } from '@/components/Carousel/Carousel'
import { DetailSection } from './DetailSection'
import { ProductSection } from './ProductSection'
import { LearnSection } from './LearnSection'
import { UseSection } from './UseSection'
import { ExploreSection } from './ExploreSection'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { useEffect } from 'react'

const { Heading, Paragraph } = Typography
const { Heading6 } = Heading
const { CNBodyMedium } = Paragraph

export interface CarouseData {
  key: string
  title: string
  description: string
  url: string
}

const carouselData: CarouseData[] = [
  {
    key: 'distributed-storage',
    title: '高性能 AI+Cloud 基础设施提供商',
    description:
      '通过软硬件深度融合的方式，提供高性能存储和高性能网络，为 AI+Cloud 应用提供弹性、便利、经济的基础设施服务',
    url: '',
  },
  {
    key: 'reasoning-engine',
    title: 'AI 推理引擎',
    description: '一站式 AI 推理平台，整合模型与算力，助力高效智能化应用',
    url: '',
  },
  {
    key: 'hardware-acceleration',
    title: 'RDMA 高性能网络',
    description: '采用软硬件深度融合的方式，实现高性能RDMA网络',
    url: '',
  },
  {
    key: 'open-source',
    title: '相信开源的力量',
    description:
      '吸引分布式系统、Linux内核、开源硬件等相关的，来自开源社区的全球人才。 ',
    url: '',
  },
]

const PageContainer = styled.div`
  margin-top: -72px;
`
const SectionWrapper = styled.section`
  background: ${props => props.theme.secondary02};
`
const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 0.64rem;
  padding-bottom: 0.56rem;
  padding-inline: 1.4rem;
`
const Content = styled(Heading6)`
  width: 50%;
`
const OutlineButtonWrapper = styled.div`
  margin-right: 0.18rem;
  padding: 0.01rem;
  border-radius: 50vh;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  cursor: pointer;
`
const OutlineButton = styled(CNBodyMedium)`
  padding: 0.12rem 0.34rem;
  border-radius: 50vh;
  background: ${props => props.theme.secondary02};
  color: ${props => props.theme.themeDark};
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const LinkSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <SectionWrapper>
      <SectionContainer>
        <Content>
          通过软硬件深度融合的方式，提供高性能存储和高性能网络，满足不同行业客户对高性能 AI+Cloud 的需求。
        </Content>
        <ButtonContainer>
          <OutlineButtonWrapper>
            <OutlineButton onClick={() => window.location.href = 'https://github.com/datenlord'}>立即体验</OutlineButton>
          </OutlineButtonWrapper>
          <Button
            style={{ color: '#fff', height: '0.52rem' }}
            onClick={() => navigate('company2/contact-us')}
          >
            联系我们
          </Button>
        </ButtonContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <PageContainer>
      <Carousel items={carouselData} />
      <DetailSection />
      <ProductSection />
      <LearnSection />
      {/* <UseSection /> */}
      <ExploreSection />
      <LinkSection />
    </PageContainer>
  )
}

export default Home
