import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import coverUrl from '@/assets/solutions/cover.png'
import imageUrl from '@/assets/solutions/image.png'
import image1Url from '@/assets/solutions/image1.svg'
import image2Url from '@/assets/solutions/image2.svg'
import image3Url from '@/assets/solutions/image3.svg'
import image4Url from '@/assets/solutions/image4.svg'
import image5Url from '@/assets/solutions/image5.svg'
import image6Url from '@/assets/solutions/image6.svg'
import image7Url from '@/assets/solutions/image7.svg'

const CNHead4 = styled.p`
  margin-block: 0;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 0.64rem;
  line-height: 0.72rem;
  font-size: 0.28rem;
  line-height: 0.56rem;
`

const SCover = styled.section<{ cover: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -0.72rem;
  padding-top: 0.72rem;
  height: 8rem;
  background-color: #000;
  background-image: url(${props => props.cover});
  background-size: cover;
  color: #fff;
`

const Button = styled.button`
  padding-block: 0.12rem;
  padding-inline: 0.34rem;
  color: inherit;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  border-radius: 0.5rem;
  border: none;
  font-size: 0.18rem;
  line-height: 0.32rem;
  cursor: pointer;
`

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
  color: #fff;
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
  background: #7680dd;
  min-height: 50px;
  width: 100%;
  padding: 0.24rem 0.48rem;
`
const TitleTxt = styled(CNHead4)`
  color: #fff;
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
  font-size: 0.18rem;
  padding: 0.14rem 0.36rem;
  background: #9caae9;
  text-align: center;
  border-radius: 0.04rem;
  margin-inline: -0.36rem;
  margin-top: 0.36rem;
  color: #fff;
`
const SectCtn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const SectTitle = styled.div`
  font-size: 0.36rem;
  font-weight: 600;
  padding-top: 0.52rem;
  padding-bottom: 0.12rem;
`
const SectDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 0.06rem;
  font-size: 0.2rem;
  font-weight: 600;
  padding-block: 0.2rem;
`
const ColorSectDesc = styled(SectDesc)`
  color: #7680DD;
`
const SectTxt = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.16rem;
  color: #42424A99;
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
  display: flex;
  align-items: center;
  gap: 0.06rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: #42424A;
`
const SectUl = styled.ul`
  margin-top: 0.16rem;
  margin-left: 0.2rem;
  li {
    font-size: 0.14rem;
    color: #797979;
  }
`
const Span = styled.span`
  margin-top: 0.04rem;
  font-weight: 500;
  color: #42424A;
`
const Icon = styled.img`
  display: block;
  width: 0.28rem;
`

const Card1: React.FC = () => {
  return (
    <CardWrap style={{ background: '#EDEDF6' }} id="ai">
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>High-Performance AI Inference Platform</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <SectCtn>
          <div style={{ width: '100%' }}>
            <SectTitle>Key Features</SectTitle>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image1Url} />High Performance / Deep Optimization for AI Scenarios</SectDesc>
            <SectTxt>
              <Span>Hardware-Software Integrated Inference Engine Optimization</Span>
              Tailored optimizations for various GPU models, heterogeneous accelerator cards, and other hardware
            </SectTxt>
            <SectTxt>
              <Span>Computational Graph Operator-Level Parallel Optimization</Span>
              Custom parallel strategies for each model to achieve computation-communication overlap
            </SectTxt>
            <SectTxt>
              <Span>Integration with Proprietary Communication Framework</Span>
              Synergistic collaboration with communication framework to maximize network bandwidth utilization
            </SectTxt>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image2Url} />Open Source & Open Access</SectDesc>
            <SectTxt>
              <Span>Integration with upstream open-source ecosystem</Span>
              Seamless connectivity with open-source deep learning model libraries and inference engines
            </SectTxt>
            <SectTxt>
              <Span>Ease of secondary development</Span>
              Fully open framework for effortless integration and customization
            </SectTxt>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image3Url} />Usability</SectDesc>
            <SectTxt>
              <Span>Simplified inference workflow</Span>
              Scripting tools automate model conversion, optimization, and deployment
            </SectTxt>
            <SectTxt>
              <Span>Visual management</Span>
              Graphical interface displays inference task performance and resource utilization for rapid parameter tuning
            </SectTxt>
            <SectTxt>
              <Span>Scalability</Span>
              Horizontally scaled nodes in the cloud or on-premises, dynamically adding/removing inference instances to meet evolving business demands
            </SectTxt>
            <SectTxt>
              <Span>Open Scheduling Interface</Span>
              Users can define scheduling policies based on business needs, flexibly managing parallel operations across multiple instances
            </SectTxt>
            <SectTxt>
              <Span>One-Click Multi-Model Deployment</Span>
              Supports diverse inference scenarios
            </SectTxt>
            <Desc>Cross-Platform Adaptation and Performance Optimization for Al Inference Engines.</Desc>
          </div>
          <div style={{ width: '100%' }}>
            <SectTitle>Core Challenges</SectTitle>
            <ColorSectDesc><Icon src={image4Url} />Adaptation Requirements for Diverse GPU Platforms</ColorSectDesc>
            <SectTxt>Significant differences in GPU architectures across manufacturers, coupled with varying operator implementations, increase the complexity of model migration and deployment.</SectTxt>
          </div>
          <div style={{ width: '100%' }}>
            <SectTitle>Solution: Automated Operator Adaptation and Optimization</SectTitle>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>Portable Operator Design<Icon src={image5Url} /></SectSpan>
              <SectUl>
                <li>Achieve cross-platform compatibility through advanced AI compiler technology</li>
                <li>Emulate proprietary instructions with generic commands on GPUs lacking specific instruction sets to ensure functional consistency</li>
                <li>Introduce parameter-adjustable operator templates that automatically optimize performance by adapting parameters to target GPU characteristics</li>
              </SectUl>
            </QuoteSectTxt>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>Model Partitioning and Parallelization Strategies for Resource-Constrained Environments<Icon src={image6Url} /></SectSpan>
              <SectUl>
                <li>Divide large models into submodules executed in parallel across multiple GPUs to enhance overall inference efficiency</li>
                <li>Employ strategies like pipeline parallelism and tensor parallelism to maximize utilization of limited computational resources</li>
                <li>Achieve overlapping computation and communication, dynamically adjust scheduling policies to boost system throughput</li>
              </SectUl>
            </QuoteSectTxt>
            <QuoteSectTxt style={{ marginBottom: '0.36rem' }}>
              <SectSpan>PD Separation and AF Separation for Heterogeneous Computing<Icon src={image7Url} /></SectSpan>
              <SectUl>
                <li>Supports mixed deployment of computing chips from different brands. Combines PD separation and AF separation to deploy tasks with distinct computational characteristics at finer granularity, assigning different computational tasks to corresponding machines based on heterogeneous computing properties.</li>
                <li>PD separation boosts computational utilization by 3.2 to 4.48 times, effectively alleviating queue blocking during the Decode phase.</li>
                <li>Decoupled scheduling reduces response times (enhancing Prefill throughput) and increases SLO fulfillment rates by up to 10 times.</li>
              </SectUl>
            </QuoteSectTxt>
          </div>
        </SectCtn>
      </Cont>
    </CardWrap>
  )
}

export default () => {
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
      <SCover cover={coverUrl}>
        <CoverTittle>
          <CoverSpan>High-Performance</CoverSpan>
          <span>AI Inference Platform</span>
        </CoverTittle>
      </SCover>
      <MainWrapper>
        <MainContainer>
          <Image src={imageUrl} />
          <Card1></Card1>
        </MainContainer>
        <RelatedResources id="related-resource">
          <RelatedResourcesTitleZH>Related Resources</RelatedResourcesTitleZH>
          <Button
            style={{ background: '#FDCB6E', color: '#fff' }}
            onClick={() => window.location.href = 'https://medium.com/@datenlord'}
          >
            View Resource Collection
          </Button>
        </RelatedResources>
      </MainWrapper>
    </>
  )
}