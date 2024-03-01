import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/solutions/cover.png'
import imageUrl from '@/assets/solutions/image.png'
import image1Url from '@/assets/solutions/image1.png'

interface CardData {
  key: string
  title: string
  section1: string
  section2: string
}

const { Heading, Paragraph } = Typography
const { CNHead4, Heading2 } = Heading

const MainWrapper = styled.main`
  background: #EDEDF6;
`
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.57rem;
  padding-inline: 1.22rem;
`
const Title = styled(CNHead4)`
  text-align: center;
  padding-bottom: 0.58rem;
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
const Image = styled.img`
  display: block;
  width: 5.36rem;
  margin-inline: auto;
  margin-bottom: 0.58rem;
`
const CardWrap = styled.div`
  background: #fff;
  border-radius: 0.24rem;
  min-height: 400px;
  overflow: hidden;
  box-shadow: 0.1rem 0.1rem 1rem 0.06rem rgba(0, 0, 0, 0.08);
  margin-bottom: 0.72rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.secondary01};
  min-height: 50px;
  width: 100%;
  padding: 0.24rem 0.48rem;
`
const TitleTxt = styled(CNHead4)`
  color: ${props => props.theme.white00};
  padding-inline: 0.96rem;
`
const Line = styled.div`
  flex: 1;
  height: 0.02rem;
`
const TitleLeftLine = styled(Line)`
  background: linear-gradient(270deg, #fff, #7B7CE340);
`
const TitleRightLine = styled(Line)`
  background: linear-gradient(90deg, #fff, #7B7CE340);
`
const Cont = styled.div`
  padding: 0.24rem 0.64rem;
  padding-bottom: 0.84rem;
`
const Desc = styled.div`
  font-size: 0.16rem;
  padding: 0.12rem 0.36rem;
  background: #D9DBEF;
  text-align: center;
  border-radius: 0.04rem;
  margin-inline: -0.36rem;
  margin-bottom: 0.36rem;
`
const SectCtn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.52rem;
`
const Sect = styled.div`
  
`
const SectTitle = styled.div`
  font-size: 0.24rem;
  font-weight: 600;
  padding-bottom: 0.36rem;
`
const SectDesc = styled.div`
  font-size: 0.2rem;
  font-weight: 600;
  padding-bottom: 0.2rem;
`
const ColorSectDesc = styled(SectDesc)`
  color: #8475DC;
`
const SectTxt = styled.div`
  font-size: 0.14rem;
  color: #42424A;
  line-height: 0.26rem;
  padding-bottom: 0.04rem;
`
const QuoteSectTxt = styled(SectTxt)`
  border-left: 0.08rem solid #767EE5;
  padding-left: 0.16rem;
`
const ListSectTxt = styled(SectTxt)`
  
`
const SectImg = styled.img`
  display: block;
  width: 70%;
  margin-inline: auto;
  margin-top: 0.36rem;
`

const Card1: React.FC = () => {
  return (
    <CardWrap style={{ background: '#EDEDF6' }} id="ai">
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>AI 推理</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <Desc>用云计算的方式整合GPU算力，解决AI算力资源昂贵和分散的问题。用存储和网络来改善用户使用的体验，实现秒级启动、恢复</Desc>
        <SectCtn>
          <Sect style={{ width: '46%' }}>
            <SectTitle>问题</SectTitle>
            <ColorSectDesc>GPU 算力供不应求，供需极度不平衡</ColorSectDesc>
            <SectTxt>AI 大模型对高性能 GPU 算力资源需求大爆发。GPU 算力供不应求，供需极度不平衡。这进一步推高了原本因设计和制造成本以及市场垄断等因素就已经高企不下的 GPU 算力价格。GPU 算力资源优先满足 AI 训练场景，这造成 AI 推断场景的 GPU 算力资源具有分散或碎片化的特点。</SectTxt>
          </Sect>
          <Sect style={{ width: '46%' }}>
            <SectTitle>解决方案</SectTitle>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>优化缓存技术，实现数据预加载、异步持久化，进而提升数据访问的性能</QuoteSectTxt>
            <QuoteSectTxt>高性能网络 RDMA 实现多节点内存共享，加速大模型的分发、加载</QuoteSectTxt>
          </Sect>
          <Sect style={{ width: '100%' }}>
            <SectTitle>案例</SectTitle>
            <SectDesc>客户的需求和问题是什么？</SectDesc>
            <ListSectTxt>· 客户是一家主营海外直播卖货的公司，运用大模型技术进行人工智能主播，实现业务的低成本横向拓展。</ListSectTxt>
            <ListSectTxt style={{ paddingBottom: '0.3rem' }}>· 该客户计划对直播场景进行大模型定制，形成自主可控的“直播场景大模型”。</ListSectTxt>
            <SectDesc>客户的需求和问题是什么？</SectDesc>
            <SectTxt style={{ color: '#7680DD' }}>DatenLord Cloud Service 通过跨云技术，帮助客户落地“大模型”业务场景</SectTxt>
            <SectTxt><b>高效的数据同步机制</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确保大模型在不同数据中心之间的实时性和一致性。</SectTxt>
            <SectTxt><b>高效的数据分发机制</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确保大模型能够及时获取和处理最新的数据，提高业务的响应速度。</SectTxt>
            <SectTxt><b>灵活的管理和调整工具</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使客户能自主控制大模型，根据业务变化灵活调整。</SectTxt>
            <SectTxt><b>高级的安全措施</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包括数据加密、身份验证等，确保大模型在跨云环境中的安全运行。</SectTxt>
            <SectImg src={image1Url} />
          </Sect>
        </SectCtn>
      </Cont>
    </CardWrap>
  )
}

const Card2: React.FC = () => {
  return (
    <CardWrap id="networks" style={{ background: '#EDEDF6' }}>
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>高性能网络</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <SectCtn>
          <Sect style={{ width: '46%' }}>
            <SectTitle>问题</SectTitle>
            <ColorSectDesc>大模型时代对高性能网络的能力诉求不断提高</ColorSectDesc>
            <SectTxt>随着大模型时代的到来，无论是模型训练环节中训练数据与 Checkpoint 的传输迁移，还是推理过程中多个模型之间的动态调度加载，都希望能够极限压榨网络以及总线上每一比特的带宽，从而换取更短的训练时间以及更小的请求响应延迟。随着训练推理集群规模的扩大以及业务复杂度的增加，网络中偶发的拥塞或故障不可避免，此外，每次网络拓扑发生变化后对网卡进行重新调参都是一项繁重的工作。能够迅速自主适应网络拓扑变化，并连续提供稳定数据传输能力的高性能网络，已然成为大模型时代必不可少的基础设施。</SectTxt>
          </Sect>
          <Sect style={{ width: '46%' }}>
            <SectTitle>解决方案</SectTitle>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>基于经过优化的 RoCE v2 协议以及硬件加速的纠错编码技术，可以在恶劣的网络环境下提供高效的数据恢复以及重传机制。</QuoteSectTxt>
            <QuoteSectTxt>通过深度的软硬件融合套件，实现全网流量的动态感知，智能决策系统可以针对各种网络环境迅速、自动地调整各节点软硬件参数，保持全网维持最佳吞吐。</QuoteSectTxt>
          </Sect>
        </SectCtn>
      </Cont>
    </CardWrap>
  )
}

const Card3: React.FC = () => {
  return (
    <CardWrap id='storage'>
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>高性能存储</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <Desc>统一的高性能跨云数据访问和跨云分布式元数据管理</Desc>
        <SectCtn>
          <Sect style={{ width: '46%' }}>
            <SectTitle>问题</SectTitle>
            <ColorSectDesc>云之间的隔阂导致数据隔离和数据碎片化，在跨云访问数据时，访问速度和一致性将会受到影响。</ColorSectDesc>
            <SectTxt>随着AI应用的快速落地，多云架构成为企业级IT的主流选择。但是，云之间的隔阂导致数据隔离和数据碎片化。由于数据往往被绑定在一个特定的云厂商/数据中心里，无法自由访问。此外，跨云数据访问具有高延迟的特性，然而现有的分布式共识协议只限于在单个数据中心使用。因此，在跨云访问数据时，访问速度和一致性将会受到影响。</SectTxt>
          </Sect>
          <Sect style={{ width: '46%' }}>
            <SectTitle>解决方案</SectTitle>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>无论数据存储在哪里，DatenLord 都可以通过缓存来加速跨云的数据访问，并提供统一的数据管理来实现数据的自动迁移和备份。</QuoteSectTxt>
            <QuoteSectTxt>DatenLord 采用内核旁路架构，实现存储 IO 自行调度管理，以提升性能。再次，低延迟的跨云分布式共识协议保证了广域网场景下的高速和强一致性，同时保证系统中没有单点瓶颈。</QuoteSectTxt>
          </Sect>
          <Sect style={{ width: '100%' }}>
            <SectTitle>案例</SectTitle>
            <SectDesc>客户的需求和问题是什么？</SectDesc>
            <ListSectTxt>· 客户是一家主要做中东、欧洲地区教育、社交和短剧的内容型娱乐公司。</ListSectTxt>
            <ListSectTxt style={{ paddingBottom: '0.3rem' }}>· 客户需要解决多国多数据中心间的数据同步、迁移、备份和自动化管理的问题。</ListSectTxt>
            <SectDesc>客户的需求和问题是什么？</SectDesc>
            <SectTxt style={{ color: '#7680DD' }}>DatenLord Cloud Service 提供一体化的解决方案，帮助客户有效管理多国多数据中心的复杂性，提高业务的可用性和稳定性</SectTxt>
            <SectTxt><b>多国多数据中心的数据实时同步</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确保大模型在不同数据中心之间的实时性和一致性。</SectTxt>
            <SectTxt><b>提供高效的数据迁移和备份工具</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确保大模型能够及时获取和处理最新的数据，提高业务的响应速度。</SectTxt>
            <SectTxt><b>提供自动化的管理工具</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使客户能自主控制大模型，根据业务变化灵活调整。</SectTxt>
            <SectTxt><b>提供高可用性和弹性伸缩的解决方案</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包括数据加密、身份验证等，确保大模型在跨云环境中的安全运行。</SectTxt>
          </Sect>
        </SectCtn>
      </Cont>
    </CardWrap>
  )
}

export default () => {
  const navigate = useNavigate()
  const { sectionId } = useParams()
  useEffect(() => {
    const sectionEl = document.querySelector(`#${sectionId}`)
    if (sectionEl) {
      sectionEl?.scrollIntoView()
      window.scrollBy(0, -32)
    } else {
      window.scrollTo(0, 0)
    }
  }, [sectionId])
  return (
    <>
      <Cover cover={coverUrl}>解决方案</Cover>
      <MainWrapper>
        <MainContainer>
          <Title>解决方案</Title>
          <Image src={imageUrl} />
          <Card1></Card1>
          <Card3></Card3>
          <Card2></Card2>
        </MainContainer>
        <RelatedResources id="related-resource">
          <RelatedResourcesTitleEN>
            · Related Resources ·
          </RelatedResourcesTitleEN>
          <RelatedResourcesTitleZH>相关资源</RelatedResourcesTitleZH>
          <Button
            style={{ background: '#FDCB6E', color: '#fff' }}
            onClick={() => navigate('/resources2')}
          >
            查看资源合集
          </Button>
        </RelatedResources>
      </MainWrapper>
    </>
  )
}
