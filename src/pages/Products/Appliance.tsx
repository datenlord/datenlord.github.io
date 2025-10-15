import styled from 'styled-components'
import { Header } from '@/components/Header1'

import bgUrl from '@/assets/RDMA-NIC/bg.png'
import coverUrl from '@/assets/RDMA-NIC/cover.png'
import image1Url from '@/assets/RDMA-NIC/image1.png'
import image2Url from '@/assets/RDMA-NIC/image2.png'
import image3Url from '@/assets/RDMA-NIC/image3.png'
import image4Url from '@/assets/RDMA-NIC/image4.png'

const SectWrap = styled.div`
  background: #fff;
`

const Sect1Box = styled.div`
  position: relative;
  width: 100%;
  background: #000;
`

const SectPinkBg = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  angle: 0 deg;
  opacity: 1;
  background: #F529B5D6;
  filter: blur(100px);
`

const SectPinkBlue = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  angle: 0 deg;
  opacity: 1;
  background: #0356CA;
  filter: blur(100px);
`

const SectCtn = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`

const Sect1Header = styled.div`
  text-align: center;
  color: #D9DBEF;
  font-size: 0.26rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const SectMain = styled.div`
  display: flex;
  gap: 0.56rem;
`

const SectMain2 = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.2rem;
`

const SectCtnCard = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5) ;
  background-color: #0000004D;
  padding: 0.32rem;
`

const SectCtnCardHeader = styled.div`
  color: #A5BDFF;
  font-weight: 600;
  font-size: 0.2rem;
`

const SectCtnCardTittle = styled.div`
  margin-top: 0.26rem;
  color: #D9DBEF;
  font-weight: 600;
  font-size: 0.14rem;
`

const SectCtnCardText = styled.div`
  color: #D9DBEFCC;
  font-size: 0.12rem;
`

const Sect2Box = styled.div`
  width: 100%;
  background: #fff;
`

const Sect2Header = styled.div`
  text-align: center;
  color: #282828;
  font-size: 0.26rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const SectTex = styled.div`
  text-align: center;
  margin-bottom: 0.8rem;
`

const Sect2TexTittle = styled.div`
  color: #4F4F4F;
  font-size: 0.26rem;
  font-weight: 600;
`

const Sect2TexMain = styled.div`
  color: #000000A6;
  font-size: 0.18rem;
`

const SectImg = styled.img`
	width: 100%;
`

const Sect3Box = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #000000 0%, #1B1C2A 100%);
`

const Sect3TexTittle = styled.div`
  color: #fff;
  font-size: 0.26rem;
  font-weight: 600;
`

const Sect3TexMain = styled.div`
  color: #FFFFFFA6;
  font-size: 0.18rem;
`

const Sect3Card = styled.div<{
  bgColor?: string
}>`
  color: #fff;
  width: 100%;
  font-size: 0.18rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 12px;
  padding-block: 0.36rem;
  padding-inline: 0.12rem;
  background: ${({ bgColor }) => bgColor || 'none'};
`

const Sect4Card = styled.div<{
  bgColor?: string;
  color?: string;
}>`
  color: ${({ color }) => color || '#fff'};
  width: 100%;
  font-size: 0.18rem;
  min-height: 1.8rem;
  border-radius: 12px;
  border: 1px solid #181926;
  padding: 0.36rem;
  background: ${({ bgColor }) => bgColor || 'none'};
`

const Sect4CardTittle = styled.div`
  font-weight: 500;
  font-size: 0.32rem;
  margin-bottom: 0.16rem;
`

const Sect4CardText = styled.div`
  font-size: 0.16rem;
`

const Sect4Box = styled.div`
  position: relative;
  height: 4.2rem;
  overflow: hidden;
`

const SectBgImg = styled.img`
  z-index: 0;
	width: 100%;
  position: absolute;
  left: 0;
  bottom: -1.2rem;
`

const Sect4Cnt = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  z-index: 1;
	width: 100%;
  margin-inline: auto;
  padding-block: 0.6rem;
  padding-inline: 1.77rem;
`

const Sect4CntLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const SectIconImg1 = styled.img`
	width: 2rem;
`

const SectIconImg2 = styled.img`
  width: 1.8rem;
  margin-bottom: 0.4rem;
  margin-inline: 0.1rem;
`

const SectIconImg3 = styled.img`
  width: 1.4rem;
  margin-bottom: -0.4rem;
`

const SCover = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.72rem;
  height: 6.6rem;
  background: linear-gradient(121.54deg, #FFFFFF 18.78%, #A9ADBB 80.74%);
`

const Img = styled.img`
  width: 9rem;
`

const Span = styled.span`
  font-size: 0.3rem;
  font-weight: 600;
  padding: 3px 20px;
  border: 2px solid #000;
  border-radius: 28px;
`

const OrangeSpan = styled.span`
  color: #F2994A;
  font-size: 0.14rem;
`

export default () => {
  return (
    <>
      <Header theme='dark' bg="transparent" activeId="customers" />
      <SCover>
        <Img src={bgUrl} />
        <Span>RDMA NIC</Span>
      </SCover>
      <SectWrap>
        <Sect1Box>
          <SectPinkBg></SectPinkBg>
          <SectPinkBlue></SectPinkBlue>
          <SectCtn>
            <Sect1Header>Highlights of High-Performance RDMA NIC</Sect1Header>
            <SectMain>
              <SectCtnCard>
                <SectCtnCardHeader>Deep Optimization for High-Performance / AI Scenarios</SectCtnCardHeader>
                <SectCtnCardTittle>High Bandwidth & Low Latency</SectCtnCardTittle>
                <SectCtnCardText>Supports 100Gbps / 200Gbps / 400Gbps configurations to meet massive data transfer demands of large-scale model applications</SectCtnCardText>
                <SectCtnCardTittle>Resilient in Harsh Network Environments</SectCtnCardTittle>
                <SectCtnCardText>Proprietary communication protocol ensures stable, efficient transmission even under high packet loss and significant network jitter</SectCtnCardText>
                <SectCtnCardTittle>Transparent Failover</SectCtnCardTittle>
                <SectCtnCardText>Seamless integration with upper-layer open-source communication stacks enables automatic switching during link or node failures, guaranteeing uninterrupted service</SectCtnCardText>
              </SectCtnCard>
              <SectCtnCard>
                <SectCtnCardHeader>Open-Source and Open-Architecture</SectCtnCardHeader>
                <SectCtnCardTittle>100Gbps NIC hardware design is open-sourced</SectCtnCardTittle>
                <SectCtnCardText>Full 100Gbps NIC hardware design is available for secondary customization and development</SectCtnCardText>
                <SectCtnCardTittle>All drivers are open-sourced</SectCtnCardTittle>
                <SectCtnCardText>RDMA NICs adopt a heavy-user-mode driver design approach, primarily developed in advanced Rust. This facilitates maintenance, debugging, and enables seamless secondary development and feature expansion</SectCtnCardText>
                <SectCtnCardTittle>Compatible with Multiple Operating Systems and Platforms</SectCtnCardTittle>
                <SectCtnCardText>Supports domestic operating systems and mainstream Linux distributions, enabling flexible deployment in heterogeneous environments</SectCtnCardText>
              </SectCtnCard>
              <SectCtnCard>
                <SectCtnCardHeader>Ease of Use</SectCtnCardHeader>
                <SectCtnCardTittle>Zero Configuration <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>The NIC automatically detects cluster environments and optimizes critical parameters, eliminating cumbersome manual configuration</SectCtnCardText>
                <SectCtnCardTittle>Visualized Drivers and Management Tools <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>Provides open-source drivers and monitoring interfaces for streamlined cluster operations and ecosystem expansion</SectCtnCardText>
                <SectCtnCardTittle>Automated Operations <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>Comprehensive monitoring, alerting, and logging capabilities for efficient troubleshooting</SectCtnCardText>
                <SectCtnCardTittle><OrangeSpan>* Coming soon</OrangeSpan></SectCtnCardTittle>
              </SectCtnCard>
            </SectMain>
          </SectCtn>
        </Sect1Box>
        <Sect2Box>
          <SectCtn>
            <Sect2Header>Key Products: In-house developed high-performance RDMA NIC</Sect2Header>
            <SectTex>
              <Sect2TexTittle>High-Performance RDMA NIC</Sect2TexTittle>
              <Sect2TexMain>High-performance networking, bus, and storage interfaces to meet massive data transmission and storage demands</Sect2TexMain>
              <Sect2TexMain>Specifically engineered for large AI model scenarios, delivering the high-performance requirements of AI large models</Sect2TexMain>
            </SectTex>
            <SectImg src={image1Url} />
          </SectCtn>
        </Sect2Box>
        <Sect3Box>
          <SectCtn>
            <SectTex>
              <Sect3TexTittle>Powerful Performance</Sect3TexTittle>
              <Sect3TexMain>Network card design prioritizes throughput, limiting connections to no more than 1024</Sect3TexMain>
              <Sect3TexMain>Significantly simplifies large-scale networking complexity, supporting clusters of thousands or tens of thousands of NICs</Sect3TexMain>
            </SectTex>
            <SectMain2>
              <Sect3Card bgColor="linear-gradient(134.21deg, #01ECFB 1.34%, #8310F5 99.49%)">Supports lossy Ethernet allowing for packet loss in the network</Sect3Card>
              <Sect3Card bgColor="linear-gradient(135deg, #D81AF6 0%, #0094FF 100%)">Tolerates out-of-order packet arrival</Sect3Card>
              <Sect3Card bgColor="linear-gradient(135deg, #01FB83 0%, #F110F5 99.48%)">Supports 400G wire-speed packet reception to guarantee network throughput</Sect3Card>
              <Sect3Card bgColor="linear-gradient(135deg, #FBE201 0%, #F110F5 100%)">Deeply optimized congestion control tailored for AI large-model tasks, eliminating PFC mechanisms to simplify network management and maintenance complexity</Sect3Card>
            </SectMain2>
          </SectCtn>
        </Sect3Box>
        <Sect2Box>
          <SectCtn>
            <Sect2Header>Core Software Features</Sect2Header>
            <div style={{display: 'flex', flexDirection: 'column', gap: '.26rem'}}>
              <Sect4Card bgColor="#fff" color="#181926">
                <Sect4CardTittle>Compatible with RDMA standard interfaces</Sect4CardTittle>
                <Sect4CardText>Compatible with existing software tools in the RDMA ecosystem</Sect4CardText>
                <Sect4CardText>Users do not need to modify upper-layer application software code</Sect4CardText>
              </Sect4Card>
              <Sect4Card bgColor="#181926">
                <Sect4CardTittle>Compatible with NVIDIA's NVIDIA Compute Library (NCCL)</Sect4CardTittle>
                <Sect4CardText>Compatible with CUDA ecosystem software tools</Sect4CardText>
                <Sect4CardText>Mainstream AI large model tools require no modification</Sect4CardText>
              </Sect4Card>
              <Sect4Card bgColor="#fff" color="#181926">
                <Sect4CardTittle>Developing NIC drivers using the Rust programming language</Sect4CardTittle>
                <Sect4CardText>Reduces bugs and significantly lowers maintenance costs for NIC driver software</Sect4CardText>
                <Sect4CardText>Facilitates integration with the C/C++ software ecosystem</Sect4CardText>
              </Sect4Card>
              <Sect4Card bgColor="#181926">
                <Sect4CardTittle>Supports developing upper-layer RDMA applications in Rust, simplifying development complexity</Sect4CardTittle>
                <Sect4CardText>Employs Rust to encapsulate the RDMA interface library libverbs</Sect4CardText>
                <Sect4CardText>Reduces complexity in RDMA application development and enhances development efficiency</Sect4CardText>
              </Sect4Card>
            </div>
          </SectCtn>
        </Sect2Box>
        <Sect4Box>
          <SectBgImg src={coverUrl} />
          <Sect4Cnt>
            <Sect4CntLeft>
              <div>
                <Sect3TexTittle>Excellent Compatibility</Sect3TexTittle>
                <Sect3TexMain>Specifically optimized for SONiC white-box switches</Sect3TexMain>
                <Sect3TexMain>100% compatible with NVIDIA GPUs</Sect3TexMain>
                <Sect3TexMain>100% compatible with AMD GPUs</Sect3TexMain>
              </div>
              <div>
                <Sect3TexTittle>Strong Adaptability</Sect3TexTittle>
                <Sect3TexMain>Adapted for Zhongke Haiguang's domestic GPUs</Sect3TexMain>
                <Sect3TexMain>Currently adapting to other domestic AI hardware</Sect3TexMain>
                <Sect3TexMain>Dedicated to solving networking challenges for building large-scale clusters with domestic GPUs</Sect3TexMain>
              </div>
            </Sect4CntLeft>
            <div>
              <SectIconImg1 src={image2Url} />
              <SectIconImg2 src={image3Url} />
              <SectIconImg3 src={image4Url} />
            </div>
          </Sect4Cnt>
        </Sect4Box>
      </SectWrap>
    </>
  )
}