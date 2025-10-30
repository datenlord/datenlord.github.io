import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/RDMA/cover.png'
import imageUrl from '@/assets/solutions/image.png'
import image1Url from '@/assets/RDMA/image1.svg'
import image2Url from '@/assets/RDMA/image2.svg'
import image3Url from '@/assets/RDMA/image3.svg'
import image4Url from '@/assets/RDMA/image4.png'
import image5Url from '@/assets/RDMA/image5.png'
import image6Url from '@/assets/RDMA/image6.png'
import image7Url from '@/assets/RDMA/image7.png'
import image8Url from '@/assets/RDMA/image8.png'
import image9Url from '@/assets/RDMA/image9.png'

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
  display: flex;
  align-items: center;
  gap: 0.08rem;
  font-size: 0.2rem;
  font-weight: 600;
  padding-block: 0.2rem;
`
const SectTxt = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  color: #42424A;
  line-height: 0.26rem;
  padding-bottom: 0.04rem;
`
const QuoteSectTxt = styled(SectTxt)`
  border-left: 0.08rem solid #767EE5;
  padding-left: 0.16rem;
`
const CoverTitle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SectSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 0.12rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: #42424A;
`
const Icon = styled.img`
  width: 0.28rem;
`
const SectTxtTitle = styled.b`
  display: inline-block;
  width: 1.8rem;
`
const ApplicationCases = styled.section`
  color: ${props => props.theme.secondary02};
  background: #0A061F;
`
const SectTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`
const TitleLeftLine2 = styled(Line)`
  background: linear-gradient(89.99deg, rgba(123, 124, 227, 0.25) 13.161%, #926CD3 61.87%);
`
const TitleRightLine2 = styled(Line)`
  background: linear-gradient(89.99deg, #926CD3 38.13%, rgba(123, 124, 227, 0.25) 86.39%);
`
const SectTitle2 = styled.div`
  color: #7680DD;
  font-size: 0.4rem;
`
const ApplicationCasesMain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  margin: 0 auto;
  padding: 1rem 0.1rem 0;
`
const SectCard = styled.div`
  display: flex;
  align-items: start;
  gap: 0.28rem;
  padding: 0.28rem;
  padding-bottom: 0.56rem;
  background: #FFFFFF1A;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.1rem;
`
const SectCardRight = styled.div`
  display: flex;
  flex-direction: column;
`
const SectCardTitle = styled.div`
  font-size: 0.18rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
`
const SectCardText = styled.div`
  color: #FFFFFF99;
  font-size: 0.14rem;
  font-weight: 600;
`
const SectCardTextB = styled.b`
  color: #D9DBEF;
`
const Image2 = styled.img`
  width: 0.6rem;
`
const SectHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  padding-block: 0.5rem;
  overflow: hidden;
`
const PersonImage = styled.img`
  position: absolute;
  left: 0.1rem;
  top: 0;
  width: 1.3rem;
`
const SectHeaderText = styled.div`
  font-size: 0.24rem;
  font-weight: 600;
  color: #000000;
`
const SectHeaderCenter = styled.div`
  position: relative;
  width: 2rem;
  margin-inline: 0.2rem;
`
const ArrowImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
`
const SectHeaderBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  border-radius: 0.2rem;
  padding: 0.06rem 0.1rem ;
  font-size: 0.18rem;
  font-weight: 600;
  background: #ededf6;
`
const SectMain = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 2.4rem;
  align-items: stretch;
`
const SectLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`
const SectLeftCard = styled.div`
  background: #FBFBFD;
  padding: 0.2rem 0.16rem;
  border-radius: 0.06rem;
`
const SectLeftCardTitle = styled.div`
  font-size: 0.16rem;
  color: #42424A;
  font-weight: 500;
`
const SectCardText2 = styled.div`
  font-size: 0.12rem;
  color: #797979;
`
const SectRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Card1: React.FC = () => {
  return (
    <CardWrap style={{ background: '#EDEDF6' }} id="ai">
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>高性能AI网络</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <SectCtn>
          <Sect style={{ width: '100%' }}>
            <SectTitle>亮点</SectTitle>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image1Url} />为AI计算场景而生</SectDesc>
            <SectTxt><SectTxtTitle>采用创新协议</SectTxtTitle><div style={{ flex: 1 }}>解决传统RDMA网络面临的拥塞、重传问题，在复杂网络条件下依然保证高吞吐。</div></SectTxt>
            <SectTxt><SectTxtTitle>深度软硬件融合</SectTxtTitle><div style={{ flex: 1 }}>系统性打通GPU算子、通信库、驱动程序、网卡硬件四大环节，提供极致网络传输效率。</div></SectTxt>
            <SectTxt><SectTxtTitle>前沿（领先）的控制算法</SectTxtTitle><div style={{ flex: 1 }}>密切追踪学术与产业界最新的拥塞控制与调度算法，通过软件和硬件的配合充分利用网络带宽。</div></SectTxt>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image2Url} />精巧灵活</SectDesc>
            <SectTxt><SectTxtTitle>精简的软硬件实现</SectTxtTitle><div style={{ flex: 1 }}>通过软硬件协同，大幅简化硬件与软件的实现复杂度，减少不必要的中间环节，提供极致精简的控制逻辑。</div></SectTxt>
            <SectTxt><SectTxtTitle>用户态驱动</SectTxtTitle><div style={{ flex: 1 }}>将网卡硬件的核心控制逻辑实现在用户态，绕开操作系统内核，轻量且易于和用户系统集成。</div></SectTxt>
            <SectTxt><SectTxtTitle>多种控制逻辑</SectTxtTitle><div style={{ flex: 1 }}>支持Receiver Driven、Selective Retransmition、MultiPath Routing等多种控制方案组合，不依赖PFC进行拥塞控制，适应不同的网络环境。</div></SectTxt>
            <SectTxt><SectTxtTitle>透明故障迁移</SectTxtTitle><div style={{ flex: 1 }}>网卡发生故障时，可无感切换至其他网卡。</div></SectTxt>
            <SectDesc style={{ color: '#7680DD' }}><Icon src={image3Url} />开源开放</SectDesc>
            <SectTxt><SectTxtTitle>硬件RTL开源</SectTxtTitle><div style={{ flex: 1 }}>使用先进的Bluespec SystemVerilog作为开发语言，代码精巧，易于定制开发和维护。</div></SectTxt>
            <SectTxt><SectTxtTitle>驱动软件开源</SectTxtTitle><div style={{ flex: 1 }}>使用先进且安全的Rust语言开发软件驱动程序，易于开发调试。</div></SectTxt>
            <SectTxt><SectTxtTitle>网络通信库开源</SectTxtTitle><div style={{ flex: 1 }}>兼容verbs API、xCCL通信库，适配主流大模型推理应用。</div></SectTxt>
          </Sect>
        </SectCtn>
      </Cont>
    </CardWrap>
  )
}

const Card2: React.FC = () => {
  return (
    <CardWrap style={{ background: '#EDEDF6' }} id="ai">
      <TitleWrap>
        <TitleLeftLine />
        <TitleTxt>核心挑战 & 解决方案</TitleTxt>
        <TitleRightLine />
      </TitleWrap>
      <Cont>
        <SectCtn>
          <Sect style={{ width: '100%' }}>
            <SectHeader>
              <PersonImage src={image4Url} />
              <SectHeaderText>核心挑战</SectHeaderText>
              <SectHeaderCenter>
                <ArrowImg src={image9Url} />
                <SectHeaderBox>
                  解决方案
                </SectHeaderBox>
              </SectHeaderCenter>
              <SectHeaderText>达坦科技推出 Open-RDMA</SectHeaderText>
            </SectHeader>
            <SectMain>
              <SectLeft>
                <SectLeftCard>
                  <SectLeftCardTitle>软硬件协同设计的必要性</SectLeftCardTitle>
                  <SectCardText2>在大模型系统中实现超高性能，需要跨越硬件与软件层的整合优化，而非仅依赖算法改进或高端硬件升级。</SectCardText2>
                </SectLeftCard>
                <SectLeftCard>
                  <SectLeftCardTitle>成本与效率的平衡</SectLeftCardTitle>
                  <SectCardText2>在保持或提升推理效率的同时，降低系统部署与运营成本，仍是根本性挑战。</SectCardText2>
                </SectLeftCard>
                <SectLeftCard>
                  <SectLeftCardTitle>网络通信透明度不足</SectLeftCardTitle>
                  <SectCardText2>当前研究与部署实践主要依赖黑盒式商用网络接口，限制了精细化控制与优化能力。</SectCardText2>
                </SectLeftCard>
                <SectLeftCard>
                  <SectLeftCardTitle>开源网络层解决方案缺失</SectLeftCardTitle>
                  <SectCardText2>尽管推理框架与算法的开源生态蓬勃发展，但网络通信与硬件层面的开源实践仍显不足。</SectCardText2>
                </SectLeftCard>
                <SectLeftCard>
                  <SectLeftCardTitle>系统各层级优化不均衡</SectLeftCardTitle>
                  <SectCardText2>在推理算法与软件框架优化取得显著进展的同时，网络层优化的发展相对滞后，制约了系统整体性能提升。</SectCardText2>
                </SectLeftCard>
              </SectLeft>
              <SectRight>
                <QuoteSectTxt>
                  <SectSpan>开源智能网卡实现</SectSpan>
                  <SectCardText2>达坦科技发布 open-rdma——基于 FPGA 的全开源 400 Gbps 智能网卡，包含完整硬件 RTL 与驱动代码。</SectCardText2>
                </QuoteSectTxt>
                <QuoteSectTxt>
                  <SectSpan>现代开发语言架构</SectSpan>
                  <SectCardText2> 硬件 RTL 采用 Bluespec SystemVerilog 开发，驱动层使用 Rust 语言实现，确保安全性与性能。</SectCardText2>
                </QuoteSectTxt>
                <QuoteSectTxt>
                  <SectSpan>用户态驱动架构</SectSpan>
                  <SectCardText2>核心驱动逻辑运行于用户空间而非内核空间，显著简化开发流程并提升系统稳定性。</SectCardText2>
                </QuoteSectTxt>
                <QuoteSectTxt>
                  <SectSpan>便捷二次开发</SectSpan>
                  <SectCardText2>开放式设计降低硬件与软件层面的定制化调试门槛。</SectCardText2>
                </QuoteSectTxt>
                <QuoteSectTxt>
                  <SectSpan>快速系统集成</SectSpan>
                  <SectCardText2>开发者可快速将 open-rdma 端到端集成至自有业务系统。</SectCardText2>
                </QuoteSectTxt>
              </SectRight>
            </SectMain>
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
        <CoverTitle>
          <span>高性能AI网络</span>
        </CoverTitle>
      </Cover>
      <MainWrapper>
        <MainContainer>
          <Image src={imageUrl} />
          <Card1></Card1>
          <Card2></Card2>
        </MainContainer>
        <ApplicationCases>
          <MainContainer>
            <SectTitleWrap>
              <TitleLeftLine2 />
              <SectTitle2>应用案例</SectTitle2>
              <TitleRightLine2 />
            </SectTitleWrap>
            <ApplicationCasesMain>
              <SectCard>
                <Image2 src={image5Url} />
                <SectCardRight>
                  <SectCardTitle>开源网卡硬件二次开发实例</SectCardTitle>
                  <SectCardText>
                    <SectCardTextB>某研究机构需构建具备可控数据处理能力的100/400 Gbps高性能网络。</SectCardTextB>
                    基于open-rdma与Bluespec SystemVerilog，仅用数千行代码即快速实现定制化拥塞控制算法，有效规避传统Verilog的开发复杂度，显著缩短研发周期。
                  </SectCardText>
                </SectCardRight>
              </SectCard>
              <SectCard>
                <Image2 src={image6Url} />
                <SectCardRight>
                  <SectCardTitle>用户态驱动跨平台移植案例</SectCardTitle>
                  <SectCardText>
                    <SectCardTextB>某客户需在支持有限的新型CPU架构与操作系统上实现高性能网络。</SectCardTextB>
                    借助open-rdma的用户态驱动设计，将其编译为动态库直接嵌入应用层，实现在裸金属与实时系统中的无缝运行，彻底摆脱内核依赖。
                  </SectCardText>
                </SectCardRight>
              </SectCard>
              <SectCard>
                <Image2 src={image7Url} />
                <SectCardRight>
                  <SectCardTitle>定制化拥塞控制算法</SectCardTitle>
                  <SectCardText>
                    <SectCardTextB>某数据中心客户需要根据其独特网络特性调整拥塞控制策略。</SectCardTextB>
                    依托open-rdma灵活的驱动与硬件协同设计，他们直接在用户态驱动中修改算法，并在需要时通过Bluespec RTL扩展硬件逻辑。该方案支持快速迭代、便捷调试，并实现软硬件协同优化。
                  </SectCardText>
                </SectCardRight>
              </SectCard>
              <SectCard>
                <Image2 src={image8Url} />
                <SectCardRight>
                  <SectCardTitle>GPU加速场景案例</SectCardTitle>
                  <SectCardText>
                    <SectCardTextB>某团队在优化推理性能时，需要实现比GPUDirect RDMA更深入的GPU与网卡协同。</SectCardTextB>
                    通过open-rdma开放透明的硬件接口，他们实现了GPU与网卡间的直接PCIe P2P控制，达成更低延迟与更高效率。全透明设计同时显著简化了故障排查流程并加速部署进程。
                  </SectCardText>
                </SectCardRight>
              </SectCard>
            </ApplicationCasesMain>
          </MainContainer>
        </ApplicationCases>
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
