import styled from 'styled-components'

import { Carousel } from '@/components/Carousel/Carousel'
import { ProductSection } from './components/ProductSection'
import { LearnSection } from './components/LearnSection'
import { UseSection } from './components/UseSection'
import { ExploreSection } from './components/ExploreSection'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

const { Heading } = Typography
const { Heading6 } = Heading

export interface CarouseData {
  key: string
  title: string
  description: string
  url: string
}

const carouselData: CarouseData[] = [
  {
    key: 'distributed-storage',
    title: '高性能跨云分布式存储',
    description:
      'DatenLord旨在通过软硬件深度融合，建立一个统一的存储访问层，为跨云的应用提供高性能和高安全性的存储支持，从而打破跨云之间的隔阂。',
    url: '',
  },
  {
    key: 'data-access',
    title: '统一的高性能跨云数据访问',
    description:
      '在高性能缓存和有效网络技术的协助下，提供跨云的统一数据访问服务。',
    url: '',
  },
  {
    key: 'metadata-management',
    title: '跨云分布式元数据管理',
    description:
      '第一个产业界跨云分布式元数据保证了广域网场景下的高速和强一致性。',
    url: '',
  },
  {
    key: 'hardware-acceleration',
    title: '储存网络的硬件加速',
    description: '采用RDMA和DPDK来构建高性能网络。',
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

const LinkSection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <Content>
          通过软硬件深度融合的方式，满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。
        </Content>
        <Button style={{ color: '#fff', height: '0.52rem' }}>联系我们</Button>
      </SectionContainer>
    </SectionWrapper>
  )
}

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Carousel items={carouselData} />
      <ProductSection />
      <LearnSection />
      <UseSection />
      <ExploreSection />
      <LinkSection />
    </PageContainer>
  )
}

export default Home
