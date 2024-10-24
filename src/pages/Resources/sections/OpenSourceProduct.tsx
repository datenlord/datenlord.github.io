import styled from 'styled-components'
import React, { useState } from 'react'
import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import xlineUrl from '@/assets/Home/xline.png'
import { useNavigate } from 'react-router-dom'



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

const Txt = styled.div`
  font-size: 0.22rem;
  line-height: 0.4rem;
  font-weight: 400;
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

export const  OpenSourceProduct : React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('WangHengyu')
  const navigate = useNavigate()

  return (
    <React.Fragment>
    <Cover>Open Source Product</Cover>
      <Section>
       
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
                onClick={() => navigate('/Project')}
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

export default  OpenSourceProduct; 
