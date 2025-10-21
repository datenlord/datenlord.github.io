import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import coverUrl from '@/assets/solutions/AI-network-cover.png'
import image8Url from '@/assets/solutions/image8.svg'
import image9Url from '@/assets/solutions/image9.svg'
import image10Url from '@/assets/solutions/image10.svg'
import image11Url from '@/assets/solutions/image11.svg'
import image12Url from '@/assets/solutions/image12.svg'
import image13Url from '@/assets/solutions/image13.svg'
import image14Url from '@/assets/solutions/image14.svg'
import image15Url from '@/assets/solutions/image15.svg'
import image16Url from '@/assets/solutions/image16.svg'
import image17Url from '@/assets/solutions/image17.svg'
import image18Url from '@/assets/solutions/image18.svg'
import image19Url from '@/assets/solutions/image19.svg'
import image20Url from '@/assets/solutions/image20.png'
import image21Url from '@/assets/solutions/image21.png'

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
const CoverTittle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MainWrapper = styled.main<{ color?: string }>`
  background: ${props => props.color || '#fff'};
`
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.57rem;
  padding-inline: 1.22rem;
`
const H1 = styled.h1`
    font-family: Inter;
    font-weight: 700;
    font-size: 0.5rem;
    background: linear-gradient(170.14deg, #FBE201 0%, #F110F5 60.53%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`
const H2 = styled.h2`
    font-family: Inter;
    font-weight: 700;
    font-size: 0.36rem;
`
const Card1 = styled.div`
    width: 3.6rem;
    padding: 0.3rem;
    border-radius: 8px;
    background: #F7F7F9;
`
const Card1Tittle = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 0.18rem;
    color: #333333;
    margin-block: 0.38rem;
`
const Card1Text = styled.div`
    font-family: PingFang SC;
    font-size: 0.14rem;
    color: #999999;

`
const Icon = styled.img`
  display: block;
`
const Tittle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 0.24rem;
    color: #7680DD;
    margin-top: 0.18rem;
    margin-bottom: 0.06rem;
`
const Text = styled.div`
    font-family: PingFang SC;
    font-size: 0.16rem;
    color: #42424A;
`
const SectCtn = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
`
const SectCtnLeft = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(251, 226, 1, 0.9) 0%, rgba(241, 16, 245, 0.9) 100%);
`
const SectCtnTittle = styled.div`
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 0.26rem;
    color: #fff;
`
const SectCtnText = styled.div`
    font-family: PingFang SC;
    font-size: 0.16rem;
    color: #FFFFFF99;
`
const Img = styled.img`
  display: block;
  width: 100%;
`
const Tittle2 = styled.div`
    font-family: Inter;
    font-weight: 600;
    font-size: 0.36rem;
    color: #7680DD;
    margin-top: 0.18rem;
    margin-bottom: 0.06rem;
`
const Text2 = styled.div`
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 0.2rem;
    color: #7680DD;
    margin-bottom: 0.06rem;
`
const SectBox = styled.div`
    display: flex;
    gap: 0.6rem;
`
const Card2 = styled.div`
    width: 100%;
	padding-inline: 0.5rem;
	padding-bottom: 0.1rem;
	border-radius: 12px;
	background: linear-gradient(180deg, rgba(187, 202, 243, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%);
`
const Card2Tittle = styled.div`
    font-size: 0.2rem;
    font-weight: 500;
    padding-block: 0.24rem;
    &::before {
        content: '';
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        background: linear-gradient(90deg, #767EE5 0%, #9966CC 106.43%);
        border-radius: 50%;
        margin-left: -0.22rem;
        margin-right: 0.1rem;
    }
`
const Card2Text = styled.div`
    font-size: 0.14rem;
    color: #42424ACC;
`

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
          <span>High Performance AI Network</span>
        </CoverTittle>
      </SCover>
      <MainWrapper>
        <MainContainer>
            <H1>Highlights</H1>
            <H2>Designed for AI Computing Scenarios</H2>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBlock: '.8rem'}}>
                <Card1>
                    <Icon src={image8Url} />
                    <Card1Tittle>Innovative Protocol</Card1Tittle>
                    <Card1Text>Resolves congestion and retransmission issues common in traditional RDMA networks, ensuring high throughput even under complex network conditions.</Card1Text>
                </Card1>
                <Card1>
                    <Icon src={image9Url} />
                    <Card1Tittle>Deep Software-Hardware Integration</Card1Tittle>
                    <Card1Text>Systematically integrates GPU operators, communication libraries, drivers, and NIC hardware to deliver ultimate network transmission efficiency.</Card1Text>
                </Card1>
                <Card1>
                    <Icon src={image10Url} />
                    <Card1Tittle>Cutting-edge control algorithms</Card1Tittle>
                    <Card1Text> Closely tracks the latest academic and industrial congestion control and scheduling algorithms, maximizing network bandwidth utilization through coordinated software and hardware.</Card1Text>
                </Card1>
            </div>
            <H2>Compact and Flexible</H2>
            <div style={{marginBlock: '0.6rem'}}>
                <Tittle><Icon src={image11Url} />Streamlined Software/Hardware Implementation</Tittle>
                <Text>Significantly simplifies implementation complexity through hardware-software synergy, eliminating unnecessary intermediaries for minimal control logic.</Text>
                <Tittle><Icon src={image12Url} />User-Mode Driver</Tittle>
                <Text>Implements core NIC control logic in user mode, bypassing the OS kernel for lightweight operation and seamless integration with user systems.</Text>
                <Tittle><Icon src={image13Url} />Diverse Control Logics</Tittle>
                <Text>Supports combinations of control schemes including Receiver Driven, Selective Retransmission, and MultiPath Routing. Independent of PFC for congestion control, adapting to varied network environments.</Text>
                <Tittle><Icon src={image14Url} />Transparent Failover</Tittle>
                <Text>Seamlessly switches to alternative NICs upon failure detection.</Text>
            </div>
            <Img src={image21Url} />
        </MainContainer>
      </MainWrapper>
      <MainWrapper color='#0A061F'>
        <MainContainer>
            <H1>Core Challenges</H1>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.6rem'}}>
                <SectCtn>
                    <SectCtnLeft><Icon src={image15Url} /></SectCtnLeft>
                    <div style={{flex: 1}}>
                        <SectCtnTittle>Necessity of Hardware–Software Co-Design</SectCtnTittle>
                        <SectCtnText>Achieving ultra-high performance in large model systems requires integrated optimization across both hardware and software layers, rather than relying solely on algorithmic improvements or high-end hardware upgrades.</SectCtnText>
                    </div>
                </SectCtn>
                <SectCtn>
                    <SectCtnLeft><Icon src={image16Url} /></SectCtnLeft>
                    <div>
                        <SectCtnTittle>Balancing Cost and Efficiency</SectCtnTittle>
                        <SectCtnText>Reducing system deployment and operational costs while maintaining or improving inference efficiency remains a fundamental challenge.</SectCtnText>
                    </div>
                </SectCtn>
                <SectCtn>
                    <SectCtnLeft><Icon src={image17Url} /></SectCtnLeft>
                    <div>
                        <SectCtnTittle>Limited Transparency in Network Communication</SectCtnTittle>
                        <SectCtnText>Current research and deployment practices largely depend on black-box commercial network interfaces, restricting fine-grained control and optimization capabilities.</SectCtnText>
                    </div>
                </SectCtn>
                <SectCtn>
                    <SectCtnLeft><Icon src={image18Url} /></SectCtnLeft>
                    <div>
                        <SectCtnTittle>Lack of Open-Source Network-Level Solutions</SectCtnTittle>
                        <SectCtnText>Despite the flourishing open-source ecosystem for inference frameworks and algorithms, open-source efforts at the network communication and hardware level are still limited.</SectCtnText>
                    </div>
                </SectCtn>
                <SectCtn>
                    <SectCtnLeft><Icon src={image19Url} /></SectCtnLeft>
                    <div>
                        <SectCtnTittle>Uneven Optimization Across System Layers</SectCtnTittle>
                        <SectCtnText>While significant progress has been made in optimizing inference algorithms and software frameworks, advancements in network-layer optimization lag behind, constraining overall system performance.</SectCtnText>
                    </div>
                </SectCtn>
            </div>
        </MainContainer>
      </MainWrapper>
      <MainWrapper color='#F7F7F9'>
        <MainContainer>
            <H1>Solution-Open-RDMA by DatenLord</H1>
        </MainContainer>
        <div style={{marginTop: '-0.6rem', paddingBottom: '1rem'}}>
            <Img src={image20Url} />
        </div>
      </MainWrapper>
      <MainWrapper>
        <MainContainer>
            <H1>Case</H1>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <SectBox>
                    <div style={{flex: 1}}>
                        <Tittle2>question</Tittle2>
                        <Card2>
                            <Card2Tittle>Open-Source NIC Hardware Secondary Development Case</Card2Tittle>
                            <Card2Text>A research institution needed 100/400 Gbps high-performance networking with controllable data handling.</Card2Text>
                        </Card2>
                    </div>
                    <div style={{flex: 1}}>
                        <Tittle2>Solution</Tittle2>
                        <Card2>
                            <Card2Tittle>Using open-rdma and Bluespec SystemVerilog, they quickly implemented a custom congestion control algorithm with only a few thousand lines of code.</Card2Tittle>
                        </Card2>
                    </div>
                </SectBox>
                <Text2>This eliminated traditional Verilog complexity and significantly shortened development time.</Text2>
                <SectBox>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>User-Mode Driver Cross-Platform Porting Case</Card2Tittle>
                            <Card2Text>A customer needed high-performance networking on a new CPU architecture and OS with limited support.</Card2Text>
                        </Card2>
                    </div>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>Leveraging open-rdma’s user-space driver design, they compiled it into dynamic libraries and embedded it directly into their applications.</Card2Tittle>
                        </Card2>
                    </div>
                </SectBox>
                <Text2>This enabled seamless operation on bare-metal and real-time systems without kernel dependencies.</Text2>
                <SectBox>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>Custom Congestion Control Algorithm Case</Card2Tittle>
                            <Card2Text>A data center customer sought to tailor congestion control for unique network characteristics.</Card2Text>
                        </Card2>
                    </div>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>With open-rdma’s flexible driver and hardware co-design, they modified algorithms directly in the user-space driver, and extended hardware logic via Bluespec RTL when needed.</Card2Tittle>
                        </Card2>
                    </div>
                </SectBox>
                <Text2>This design allowed rapid iteration, easy debugging, and hardware–software co-optimization.</Text2>
                <SectBox>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>GPU Acceleration Case</Card2Tittle>
                            <Card2Text>A team optimizing inference performance needed tighter GPU–NIC integration beyond GPUDirect RDMA limits.</Card2Text>
                        </Card2>
                    </div>
                    <div style={{flex: 1}}>
                        <Card2>
                            <Card2Tittle>Using open-rdma’s open and clean hardware interface, they enabled direct GPU-to-NIC PCIe P2P control for lower latency and better efficiency.</Card2Tittle>
                        </Card2>
                    </div>
                </SectBox>
                <Text2>The fully transparent design also simplified troubleshooting and accelerated deployment.</Text2>
            </div>
        </MainContainer>
      </MainWrapper>
    </>
  )
}