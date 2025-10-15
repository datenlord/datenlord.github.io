import styled from 'styled-components'
import React, { useState } from 'react'
import { Carousel } from '@/components/Carousel'
import img8Url from '@/assets/Home/image8.png'
import img9Url from '@/assets/Home/image9.png'
import img10Url from '@/assets/Home/image10.png'
import img11Url from '@/assets/Home/image11.png'
import addUrl from '@/assets/Home/add.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.64rem;
  padding-block: 0.94rem;
`
const Title = styled.div`
  color: #7680DD;
  font-size: 0.42rem;
  line-height: 0.56rem;
  font-weight: 600;
  text-align: center;
  max-width: 72vw;
  padding-inline: 6vw;
  padding-bottom: 0.36rem;
  border-bottom: 0.01rem solid #D9DBEF;
  margin-bottom: 0.64rem;
`
const Section = styled.div`
  padding-bottom: 0.56rem;
  text-align: left;
  width: 100%;
  height: min-content;
  &:last-child {
    padding-bottom: 0;
  }
`
const SectionTitle = styled.div`
  font-size: 0.26rem;
  line-height: 0.58rem;
  font-weight: 600;
  color: #42424A;
`
const SectionTitleBold = styled.div`
  font-family: Arial;
  font-weight: 700;
  font-style: italic;
  font-size: 0.42rem;
  color: #000;
`
const SectCont = styled.div`
	display: flex;
	justify-content: space-between;
  align-items: stretch;
	gap: 0.56rem;
`
const SectCont2 = styled.div`
	display: flex;
	justify-content: space-between;
  align-items: center;
	gap: 0.56rem;
`
const SectTxtCnt = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const SectTxt = styled.div`
  flex: 1;
	font-size: 0.16rem;
	line-height: 0.28rem;
	padding-block: 0.24rem;
`
const SectImg = styled.img`
	width: 45%;
`
const SectImg2 = styled.img`
	height: 0.9rem;
`
const SectBox = styled.div`
	width: 100%;
	margin-block: 0.56rem;
	padding-inline: 0.3rem;
	padding-block: 0.1rem;
	border-radius: 12px;
	background: linear-gradient(180deg, rgba(187, 202, 243, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%);
`
const SectTittle = styled.div`
	font-size: 0.2rem;
	font-weight: 500;
	padding-bottom: 0.12rem;
`
const SectTxtTittle = styled.div`
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
const SectTxtTittle2 = styled.div`
  font-size: 0.18rem;
  font-weight: 400;
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
const SectTxtMain= styled.div`
	font-size: 0.16rem;
	line-height: 0.28rem;
	color: #42424ACC;
`
const SectTxtMain2= styled.div`
	font-size: 0.12rem;
	color: #D9DBEF;
`

const HomePage: React.FC = () => {
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('light')

  return (
    <React.Fragment>
      {/* <Header activeId="" theme={headerTheme} bg="transparent" /> */}
      <Carousel setHeaderTheme={setHeaderTheme} />
      <Container>
				<Title>High-Performance AI Infrastructure for Inference Scenarios</Title>
				<Section>
          <SectionTitle>
            <SectionTitleBold>Core Characteristics</SectionTitleBold>
            of High-Performance AI Infrastructure: Deep Integration of Software and Hardware
          </SectionTitle>
					<SectCont>
						<SectImg src={addUrl} />
						<SectTxtCnt>
							<SectTxtTittle2>AI large-model inference imposes extreme demands on system performance</SectTxtTittle2>
							<SectTxtTittle2>Hardware capabilities must deeply integrate with the software stack to enhance overall efficiency</SectTxtTittle2>
						</SectTxtCnt>
					</SectCont>
					<SectBox>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>Enhanced Operator Performance and Portability</SectTxtTittle>
								<SectTxtMain>Optimizing operator fundamentals for new hardware platforms</SectTxtMain>
								<SectTxtMain>Improving operator transferability across different devices</SectTxtMain>
							</SectTxt>
							<SectTxt>
								<SectTxtTittle>System-Level Optimization of Communication Performance</SectTxtTittle>
								<SectTxtMain>Optimize network protocols and communication stacks to reduce latency and packet loss</SectTxtMain>
								<SectTxtMain>Adapt to group communication modes in AI scenarios</SectTxtMain>
							</SectTxt>
						</SectCont>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>Intelligent Scheduling and Overlapping of Computation and Communication</SectTxtTittle>
								<SectTxtMain>Dynamic Tracking of System Performance Bottlenecks</SectTxtMain>
								<SectTxtMain>Enable computing and communication to collaborate and iterate continuously, unlocking maximum throughput</SectTxtMain>
							</SectTxt>
						</SectCont>
					</SectBox>
				</Section>
      </Container>
      <div style={{backgroundColor: '#0A061F', color: '#fff'}}>
        <Container>
          <Section>
            <SectionTitle style={{color: '#D9DBEF'}}>
              <SectionTitleBold style={{color: '#D9DBEF'}}>Why</SectionTitleBold>
              build next-generation RDMA networks and deeply optimized inference frameworks?
            </SectionTitle>
            <SectCont>
              <SectBox>
                <SectImg2 src={img9Url} />
                <SectTittle>Performance Trade-offs</SectTittle>
                <SectTxtMain2>Although RDMA is currently the de facto standard for cross-node communication in AI large models, its limitations in addressing the new demands of AI large models are becoming increasingly apparent. Designed 25 years ago for HPC scenarios, the protocol is showing its age.</SectTxtMain2>
              </SectBox>
              <SectBox>
                <SectImg2 src={img10Url} />
                <SectTittle>Holistic Optimization</SectTittle>
                <SectTxtMain2>With the rapid advancement of large AI models, demands on system performance have intensified. Achieving extreme performance requires a coordinated approach to hardware and software design—not merely refining algorithms or stacking high-end hardware.</SectTxtMain2>
              </SectBox>
              <SectBox>
                <SectImg2 src={img11Url} />
                <SectTittle>Openness</SectTittle>
                <SectTxtMain2>Current commercial intelligent network cards all adopt black-box closed-source solutions, which make secondary development difficult and feature poor scalability. Moreover, it is hard for them to achieve deep integration with upper-layer communication and computing frameworks.</SectTxtMain2>
              </SectBox>
            </SectCont>
          </Section>
        </Container>
      </div>
      <Container>
				<Section>
          <SectionTitle>
            <SectionTitleBold>Highlights</SectionTitleBold>
            of DatenLord's Hardware-Software Integrated AI Infrastructure
          </SectionTitle>
					<SectCont2>
						<SectImg src={img8Url} />
						<SectTxtCnt>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>High Performance</SectTxtTittle>
								<SectTxtMain>Delivers a unified solution spanning hardware to software, breaking down barriers between different layers of AI large-model systems to maximize hardware efficiency.</SectTxtMain>
							</SectTxt>
						</SectCont>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>Open Source and Open Architecture</SectTxtTittle>
								<SectTxtMain>From hardware to software, we offer full-stack open-source solutions. For clients with strong development capabilities, we even enable secondary development and expansion of RDMA hardware logic to tailor it to their specific requirements.</SectTxtMain>
							</SectTxt>
							<SectTxt>
								<SectTxtTittle>Usability </SectTxtTittle>
								<SectTxtMain>By adopting an innovative communication protocol, it reduces network environment requirements while maintaining compatibility with standard RDMA API interfaces. This enables zero-configuration deployment with a one-click setup and seamless failover migration.</SectTxtMain>
							</SectTxt>
						</SectCont>
						</SectTxtCnt>
					</SectCont2>
				</Section>
			</Container>
    </React.Fragment>
  )
}

export default HomePage
