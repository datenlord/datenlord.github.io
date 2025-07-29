import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/solutions/cover.png'
import imageUrl from '@/assets/solutions/image.png'

const { Heading } = Typography
const { CNHead4 } = Heading

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
const RelatedResources = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 0.48rem;
  color: ${props => props.theme.secondary02};
  background: linear-gradient(90deg, #767ee5, #9966cc);
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
  margin-block: 0.36rem;
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
  padding-block: 0.2rem;
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
const CoverTittle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CoverSpan = styled.span`
  font-size: 0.4rem;
`
const SectSpan = styled.span`
  font-size: 0.18rem;
  font-weight: 500;
  color: #42424A;
`
const SectUl = styled.ul`
  margin-top: 0.16rem;
  margin-left: 0.2rem;
`

const Card1: React.FC = () => {
  return (
    <CardWrap style={{ background: '#EDEDF6' }} id="ai">
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>高性能AI推理框架</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <SectCtn>
          <Sect style={{ width: '100%' }}>
            <SectTitle>亮点</SectTitle>
            <SectDesc style={{ color: '#7680DD' }}>高性能 / AI 场景深度优化</SectDesc>
            <SectTxt><b>软硬融合的推理引擎优化</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;针对不同型号GPU、异构加速卡等硬件进行针对性优化</SectTxt>
            <SectTxt><b>计算图算子级别并行优化</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对每个模型都量身打造对应的并行策略，实现计算与通信的重叠</SectTxt>
            <SectTxt><b>与自研通信框架的融合</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;与通信框架协同配合，最大限度利用网络带宽</SectTxt>
            <SectDesc style={{ color: '#7680DD' }}>开源开放</SectDesc>
            <SectTxt><b>融合上游开源生态</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;与开源深度学习模型库、推理引擎无缝衔接</SectTxt>
            <SectTxt><b>便于二次开发</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完全开放的框架，便于集成和二次开发</SectTxt>
            <SectDesc style={{ color: '#7680DD' }}>易用性</SectDesc>
            <SectTxt><b>简化推理流程</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供脚本化工具，自动完成模型转换、优化与部署</SectTxt>
            <SectTxt><b>可视化管理</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图形化界面查看推理任务性能、资源使用情况，快速调整参数</SectTxt>
            <SectTxt><b>弹性扩展</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可在云端或本地横向扩展节点，动态增加/移除推理实例，满足多变业务需求</SectTxt>
            <SectTxt><b>开放调度接口</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户可根据业务需要编写调度策略，灵活管理多实例并行运行</SectTxt>
            <SectTxt><b>多模型一键部署</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支持多种推理场景</SectTxt>
            <Desc>AI推理引擎的跨平台适配与性能优化</Desc>
          </Sect>
          <Sect style={{ width: '42%' }}>
            <SectTitle>核心挑战</SectTitle>
            <ColorSectDesc>多样化GPU平台的适配需求</ColorSectDesc>
            <SectTxt>不同厂商的GPU架构差异显著，算子实现方式各异，导致模型迁移与部署复杂度增加。</SectTxt>
          </Sect>
          <Sect style={{ width: '52%' }}>
            <SectTitle>解决方案：自动化算子适配与优化</SectTitle>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>可移植的算子设计</SectSpan>
              <SectUl>
                <li>通过先进的 AI 编译器技术实现算子的跨平台兼容</li>
                <li>在不支持特定指令集的 GPU 上，使用通用指令模拟专有指令，确保功能一致性</li>
                <li>引入参数可调的算子模板，根据目标GPU的特性自动调整参数，优化性能。</li>
              </SectUl>
            </QuoteSectTxt>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>算力受限场景下的模型切分与并行策略</SectSpan>
              <SectUl>
                <li>将大模型划分为多个子模块，分别在不同的GPU上并行执行，提升整体推理效率</li>
                <li>采用流水线并行、张量并行等策略，充分利用有限的计算资源</li>
                <li>实现计算与通信的重叠执行，动态调整调度策略，提升系统吞吐量。</li>
              </SectUl>
            </QuoteSectTxt>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>异构算力的PD分离</SectSpan>
              <SectUl>
                <li>支持不同品牌算力芯片混合部署。Prefill 调度至强算力 GPU；Decode 落在内存带宽高但算力弱的 GPU 上，实现算力与任务类型匹配</li>
                <li>PD 分离提升计算利用率 3.2~4.48 倍，有效缓解 Decode 阶段造成的队列阻塞</li>
                <li>通过解耦调度，缩短响应时间（Prefill 吞吐提升），SLO 满足率提升可达 10 倍</li>
              </SectUl>
            </QuoteSectTxt>
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
      <Cover cover={coverUrl}>
        <CoverTittle>
          <CoverSpan>解决方案</CoverSpan>
          <span>高性能AI推理框架</span>
        </CoverTittle>
      </Cover>
      <MainWrapper>
        <MainContainer>
          <Image src={imageUrl} />
          <Card1></Card1>
        </MainContainer>
        <RelatedResources id="related-resource">
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
