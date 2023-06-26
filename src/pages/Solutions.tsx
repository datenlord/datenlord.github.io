import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/solutions/cover.png'
import decorationUrl from '@/assets/solutions/decoration.png'

interface CardData {
  key: React.Key
  title: string
  section1: string
  section2: string
  decoration: boolean
}

const cardData: CardData[] = [
  {
    key: 1,
    title: '统一的高性能跨云数据访问/解决方案',
    section1:
      '云之间的隔阂导致数据隔离和数据碎片化。数据往往被绑定在一个特定的云计算中，无法自由访问。当业务规模较小时，云之间的隔离可能不会构成问题。然而，随着业务的发展，需要经常访问全球多个云和多个数据中心，云障碍导致的数据隔离和数据碎片化成为了业务增长的障碍。',
    section2:
      '无论数据存储在哪里，DatenLord都可以通过利用存储器来缓存热数据，从而加速跨云的数据访问，并提供统一的数据管理来实现数据的自动迁移和备份。',
    decoration: false,
  },
  {
    key: 2,
    title: '跨云分布式元数据管理/解决方案',
    section1:
      '跨云分布式存储的高延迟性和不一致性：现在的分布式共识协议只限于在单个数据中心使用，跨云分布式共识协议只限于理论研究。在跨云访问数据时，访问速度和一致性将会受到影响。',
    section2:
      '第一个产业界的基于共识协议的跨云分布式元数据管理。DatenLord利用异步编程架构，绕过了Linux内核，完全实现了独立内核、自动调度和存储IO的管理。该协议确保了跨数据节点的数据一致性。低延迟的跨云分布式共识协议保证了广域网场景下的高速和强一致性，同时保证系统中没有单点瓶颈。',
    decoration: true,
  },
  {
    key: 3,
    title: '存储网络的硬件加速/解决方案',
    section1:
      '基于软件的解决方案的性能瓶颈。跨云通信需要可靠的高速网络和快速的缓存机制。目前在大量的数据已经散布在不同的云供应商和跨云分布的数据中心的情况下，基于软件的的解决方案已经到达性能瓶颈，并且不能再满足该需求。',
    section2:
      '硬件加速器。采用硬件敏捷的开发方法来打造定制的硬件；采用RDMA和DPDK建立高性能网络；硬件实现RDMA协议、加密、压缩和编码以及超快速存储证明。',
    decoration: false,
  },
]

const { Heading, Paragraph } = Typography
const { CNHead4, Heading2 } = Heading
const { CNBodyLarge } = Paragraph

const MainWrapper = styled.main`
  background: ${props => props.theme.secondary02};
`
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.57rem;
  padding-inline: 2.12rem;
`
const Title = styled(CNHead4)`
  text-align: center;
  padding-bottom: 0.94rem;
`
const CardWrapper = styled.div`
  position: relative;
  background: #ffffffa3;
  border-radius: 0.32rem;
  margin-bottom: 0.34rem;
  padding-block: 0.48rem;
  padding-inline: 0.64rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Decoration1 = styled.img`
  position: absolute;
  top: -0.32rem;
  right: -0.32rem;
  width: 1.56rem;
  height: 1.56rem;
`
const CardTitle = styled(CNHead4)`
  padding-bottom: 0.39rem;
`
const Section = styled.div`
  border-radius: 0.08rem;
  padding: 0.12rem;
`
const Section1 = styled(Section)`
  position: relative;
  max-width: 7.22rem;
  margin-bottom: 0.17rem;
  background: #9797971a;
  border-bottom-left-radius: 0;
`
const Decoration = styled.div`
  position: absolute;
  left: 0;
  bottom: -0.08rem;
  width: 0;
  height: 0;
  border-top: 0.08rem solid #9797971a;
  border-right: 0.08rem solid transparent;
`
const Section2 = styled(Section)`
  max-width: 6rem;
  margin-left: auto;
  background: #d9dbef;
  border-bottom-right-radius: 0;
`
const CardText = styled(CNBodyLarge)`
  color: ${props => props.theme.themeDark};
`
const RelatedResources = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 0.48rem;
  color: ${props => props.theme.secondary02};
  background: linear-gradient(90deg, #767ee5, #9966cc);
`
const RelatedResourcesTitleEN = styled(Heading2)`
  padding-bottom: 0.06rem;
`
const RelatedResourcesTitleZH = styled(CNHead4)`
  padding-bottom: 0.4rem;
`

const Card: React.FC<{ items: CardData }> = ({ items }) => {
  const { title, section1, section2, decoration } = items
  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <Section1>
        <CardText>{section1}</CardText>
        <Decoration />
      </Section1>
      <Section2>
        <CardText>{section2}</CardText>
      </Section2>
      {decoration ? <Decoration1 src={decorationUrl} /> : null}
    </CardWrapper>
  )
}

export default () => {
  return (
    <>
      <Cover cover={coverUrl}>解决方案</Cover>
      <MainWrapper>
        <MainContainer>
          <Title>解决方案</Title>
          {cardData.map(items => (
            <Card key={items.key} items={items} />
          ))}
        </MainContainer>
        <RelatedResources>
          <RelatedResourcesTitleEN>
            · Related Resources ·
          </RelatedResourcesTitleEN>
          <RelatedResourcesTitleZH>相关资源</RelatedResourcesTitleZH>
          <Button style={{ background: '#FDCB6E', color: '#fff'}}>查看资源合集</Button>
        </RelatedResources>
      </MainWrapper>
    </>
  )
}
