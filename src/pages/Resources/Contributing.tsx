import styled from 'styled-components'
import { Header } from '@/components/Header1'
import imageUrl from '@/assets/Home/cover5.svg'
import gitterUrl from '@/assets/gitter.svg'
import githubUrl from '@/assets/github.svg'
import React, { useState } from 'react'
import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import { OpenSourceCommunity } from './sections/OpenSourceCommunitySection'
import img6Url from '@/assets/Home/image6.png'
import img7Url from '@/assets/Home/image7.png'
import img8Url from '@/assets/Home/image8.png'
import xlineUrl from '@/assets/Home/xline.png'
import { useNavigate } from 'react-router-dom'

const TabData = [
  {
    id: 'WangHengyu',
    label: 'Hengyu Wang',
  },
  {
    id: 'LiHongyu',
    label: 'Hongyu Li',
  },
]

interface TabItemProps {
  isActive: boolean
}

const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`
const ViewContainer = styled.div`
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-inline: 64px;
  }
`
const FirstSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 96px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
  }
`
const SecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 96px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
  }
`
const ThirdSection = styled.div``
const FirstSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    align-items: center;
  }
`
const Image = styled.img`
  margin-right: 64px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    margin-bottom: 48px;
    margin-right: 0;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 32px;
    margin-right: 0;
  }
`
const Heading1 = styled.div`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 15px;
  }
`
const StyleHeading1 = styled(Heading1)`
  padding-left: 24px;
  border-left: 24px solid #7680dd;
  margin-bottom: 48px;
  @media screen and (max-width: 1024px) {
    padding-left: 18px;
    border-width: 18px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 12px;
    border-width: 12px;
    margin-bottom: 24px;
  }
`
const Paragraph1 = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`
const Paragraph2 = styled.div`
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.65;
  margin-bottom: 27px;
  @media screen and (max-width: 1024px) {
    font-size: 12;
    margin-bottom: 20.25px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
  }
`
// const Card = styled.div`
//   padding: 28px;
//   width: 48%;
//   border-radius: 12px;
//   box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.15);
//   @media screen and (max-width: 1024px) {
//     width: 100%;
//     margin-bottom: 32px;
//     padding: 21px;
//     border-radius: 9px;
//   }
//   @media screen and (max-width: 768px) {
//     padding: 14px;
//     border-radius: 6px;
//   }
// `
const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 27px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20.25px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
  }
`
const CardTitle = styled.div`
  height: 100%;
  margin-right: 16px;
  padding-right: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 0.9;
  border-right: 2px solid #000;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
    padding-right: 12px;
    font-size: 13.5px;
    border-width: 1.5px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
    padding-right: 8px;
    font-size: 12px;
    border-width: 1px;
  }
`
const CardIcon = styled.img`
  width: 14px;
  @media screen and (max-width: 1024px) {
    width: 10.5px;
  }
  @media screen and (max-width: 768px) {
    width: 7px;
  }
`
// const Button = styled.div`
//   width: fit-content;
//   margin-inline: auto 16px;
//   padding: 4px 32px;
//   background: linear-gradient(90deg, #767ee5, #9966cc);
//   color: white;
//   font-weight: 400;
//   font-size: 13.5px;
//   line-height: 1.66;
//   border-radius: 46.5px;
//   cursor: pointer;
//   @media screen and (max-width: 1024px) {
//     margin-right: 12px;
//     padding: 3px 24px;
//     border-radius: 34.9px;
//   }
//   @media screen and (max-width: 768px) {
//     margin-right: 8px;
//     padding: 2px 16px;
//     font-size: 12px;
//     border-radius: 23.25px;
//   }
// `
const TabContainer = styled.div`
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  overflow: hidden;
`
const Tab = styled.div`
  display: flex;
  /* height: 100%; */
  width: 100%;
  height: 80px;
  @media screen and (max-width: 1024px) {
    height: 60px;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
  }
`
const TabItem = styled.div<TabItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};
  font-weight: 600;
  font-size: 22.5px;
  line-height: 1.48;
  background: ${({ isActive }) => (isActive ? '#7680DD' : 'white')};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 16.875px;
    border-top-left-radius: 10.5;
    border-top-right-radius: 10.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11.25px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
`
const TabPanel = styled.div`
  padding: 64px;
  background: #d9dbef;
  @media screen and (max-width: 1024px) {
    padding: 48px;
  }
  @media screen and (max-width: 768px) {
    padding: 32px;
  }
`
const TabPanelContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    margin: 16px;
  }
`
const TabPanelText = styled(Paragraph1)`
  width: 46%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
  }
`
const HengyuWang = {
  description: [
    'Hengyu Wang is a graduate student majoring in computer science. He joined the async-rdma project because it happens to fit in his academic interest on integrating software and hardware. Guided by his community mentor, he grows with the development of the project and is invited to share his practical experience on using Rust to package RDMA on several hands-on workshops.',
    'I am having unforgettable experience with the async-rdma project. The DatenLord community is friendly and my mentor is a seasoned engineer who encourages me to verify my ideas and assumptions about the project while pay attention to the engineering discipline, which shift my perspective from a student who merely focuses on running a program to a professional engineer who cares about its maintainability and stability as well.',
  ],
  id: 'GTwhy',
  url: 'https://github.com/GTwhy',
}
const HongyuLi = {
  description: [
    'Hongyu Li is passionate about open source community and Rust, and thus joined this particular project of DatenLord to add support for Rust to be merged in the Linux kernel. With the guidance of his community mentor, he honed his skills in Rust in the process of contributing code, writing document and replying revisions to the upstream.',
    'Working with the Rust for Linux project in DatenLord is rewarding. The community is friendly and interactive. I was encouraged by my mentor to seriously weigh different options to revise even a small bug and go beyond just write code, but lines of ELEGANT codes. What I acquire in the community is not only conceptual, but practical.',
  ],
  id: 'Richard Li',
  url: 'https://github.com/Richardhongyu',
}

const PageContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.4rem;
  padding-inline: 2.04rem;
`
// const PageTitle = styled(CNHead4)`
//   padding-bottom: 0.98rem;
//   text-align: center;
// `

const Title = styled.div`
  font-size: 0.4rem;
  line-height: 0.6rem;
  font-weight: 700;
  margin-inline: 1.64rem;
  text-align: center;
`
const SubTitle = styled.div`
  font-size: 0.32rem;
  line-height: 0.38rem;
  font-weight: 600;
  color: #101828;
`
const Desc = styled.div`
  font-size: 0.26rem;
  line-height: 0.4rem;
  font-weight: 400;
`
const Txt = styled.div`
  font-size: 0.22rem;
  line-height: 0.4rem;
  font-weight: 400;
`
const LiTxt = styled(Txt)`
  &::before {
    content: '';
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    border-radius: 50%;
    background: linear-gradient(90deg, #767ee5, #9966cc);
    transform: translateX(-0.16rem);
  }
  text-indent: -0.16rem;
`
const StyleLiTxt = styled(Txt)`
  position: relative;
  padding-left: 0.36rem;
  &::before {
    content: '√';
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 0;
    width: 0.28rem;
    height: 0.28rem;
    border-radius: 50%;
    color: #fff;
    background: #7680dd;
    text-align: center;
    line-height: 0.28rem;
  }
`
const Card = styled.div`
  border: 0.02rem solid #00000014;
  background: linear-gradient(90deg, rgb(243, 245, 255), rgb(225, 223, 244));
  padding: 0.6rem 0.7rem 0.7rem;
  border-radius: 0.2rem;
`
const Button = styled.div`
  font-size: 0.16rem;
  width: min-content;
  white-space: nowrap;
  padding: 0.12rem 0.34rem;
  border-radius: 0.24rem;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  color: #ffffff;
`

const ContributingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('WangHengyu')
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Cover>Open Source Community</Cover>
      <Section backgroundColor="#EDEDF6">
        <Title style={{ marginBottom: '1.25rem' }}>Community</Title>
        <OpenSourceCommunity />
      </Section>
      <Section>
        <Title style={{ marginBottom: '1.5rem' }}>Open Source Product</Title>
        <Card
          style={{
            display: 'flex',
            gap: '0.48rem',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.32rem' }}
          >
            <SubTitle>DatenLord</SubTitle>
            <StyleLiTxt>
              DatenLord is a cross-cloud, cross-data center storage solution
              designed to facilitate efficient storage access across clouds and
              data centers for enterprises.
            </StyleLiTxt>
            <StyleLiTxt>
              This solution offers users a versatile system architecture,
              including Posix file interface, KV interface, and object storage
              interface, allowing users to choose the most suitable method based
              on their specific needs.
            </StyleLiTxt>
            <StyleLiTxt>
              DatenLord utilizes a combination of software and hardware
              integration, harnessing the full potential of both to achieve
              unparalleled data transfer and read/write performance.
            </StyleLiTxt>
            <Button
              style={{ marginLeft: '0.36rem' }}
              onClick={() =>
                (window.location.href =
                  'https://github.com/datenlord/datenlord')
              }
            >
              Learn more
            </Button>
          </div>
        </Card>
        <div
          style={{
            padding: '0.6rem 0.7rem 0.7rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.96rem',
            marginBottom: '0.5rem',
          }}
        >
          <img style={{ height: '0.66rem' }} src={xlineUrl} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.32rem',
            }}
          >
            <SubTitle>Xline Open Source Distributed KV Storage System</SubTitle>
            <Txt>
              Ensures data consistency when accessed across data centers and
              clouds, facilitating multi-site, multi-center, active-active
              deployment for business systems..
            </Txt>
            <Button
              onClick={() =>
                (window.location.href =
                  'https://datenlord.github.io/xline-home/')
              }
            >
              Learn more
            </Button>
          </div>
        </div>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.48rem',
            marginBottom: '0.5rem',
          }}
        >
          <SubTitle>RDMA</SubTitle>
          <Txt>
            In cross-cloud scenarios, network performance has a significant
            impact on data access, and DatenLord leverages high-performance RDMA
            (Remote Direct Memory Access) to reduce latency and enhance
            bandwidth. We have several related open-source projects in the RDMA
            domain:
          </Txt>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.32rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.24rem',
              }}
            >
              <StyleLiTxt>async-rdma</StyleLiTxt>
              <Txt style={{ paddingLeft: '0.36rem' }}>
                An RDMA asynchronous API library encapsulated in Rust, providing
                advanced abstractions and asynchronous API interfaces for
                developing RDMA applications.
              </Txt>
              <StyleLiTxt>open-rdma</StyleLiTxt>
              <Txt style={{ paddingLeft: '0.36rem' }}>
                An open-source hardware implementation of the RDMA protocol,
                implemented using Bluespec and SpinalHDL. Currently, it
                primarily supports the RoCEv2 protocol. Additionally, specific
                extensions have been incorporated to enhance the efficiency of
                RDMA transfers.
              </Txt>
              <Button
                style={{ marginLeft: '0.36rem' }}
                onClick={() => navigate('/community/project')}
              >
                Learn more
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </React.Fragment>
    // <ViewWrapper>
    //   <Header theme="dark" activeId="resources" />
    //   <ViewContainer>
    //     <FirstSection>
    //       <Image src={imageUrl} />
    //       <FirstSectionContent>
    //         <Heading1>Contributing is Thinking and Learning</Heading1>
    //         <Paragraph1>
    //           Open source is not merely about contributing code in Github. In
    //           Datenlord, however, we believe that giving is thinking and
    //           learning, and together with the received feedback from the virtual
    //           community are capable of framing trust and collaboration.
    //         </Paragraph1>
    //       </FirstSectionContent>
    //     </FirstSection>
    //     <SecondSection>
    //       <Card>
    //         <CardTitleContainer>
    //           <CardTitle>Join Conversation on Gitter</CardTitle>
    //           <CardIcon src={gitterUrl} />
    //         </CardTitleContainer>
    //         <Paragraph2>
    //           Join our community of experts in building the next generation of
    //           cloud-native, geo-distributed storage system
    //         </Paragraph2>
    //         <Button
    //           as="a"
    //           href="https://app.gitter.im/#/room/#datenlord_datenlord:gitter.im"
    //         >
    //           DatenLord Gitter Channel
    //         </Button>
    //       </Card>
    //       <Card>
    //         <CardTitleContainer>
    //           <CardTitle>Become A Contributor</CardTitle>
    //           <CardIcon src={githubUrl} />
    //         </CardTitleContainer>
    //         <Paragraph2>
    //           Looking for the source code, or have an idea to contribute? Join
    //           our open source community on GitHub.
    //         </Paragraph2>
    //         <Button as="a" href="https://github.com/datenlord">
    //           DatenLord on Github
    //         </Button>
    //       </Card>
    // </SecondSection>
    //   </ViewContainer>
    // </ViewWrapper>
  )
}

export default ContributingPage
