import styled from 'styled-components'
import React, { useState } from 'react'
import { Carousel } from '@/components/Carousel'
import { Header } from '@/components/Header1'
import img6Url from '@/assets/Home/image6.png'
import img7Url from '@/assets/Home/image7.png'
import img8Url from '@/assets/Home/image8.png'
import img9Url from '@/assets/Home/image9.png'
import xlineUrl from '@/assets/Home/xline.png'

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

const HomePage: React.FC = () => {
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('light')

  return (
    <React.Fragment>
      {/* <Header activeId="" theme={headerTheme} bg="transparent" /> */}
      <Carousel setHeaderTheme={setHeaderTheme} />
      <div style={{ color: '#42424A', padding: '1rem 1.48rem' }}>
        <div style={{ marginBottom: '1.28rem' }}>
          <Title
            style={{
              borderBottom: '0.01rem solid #D9DBEF',
              paddingBottom: '0.24rem',
              marginBottom: '0.2rem',
            }}
          >
            DatenLord Integrates Storage and Network Solutions to Address the AI
            Computational Resource Challenges
          </Title>
          <Desc style={{ marginInline: '0.96rem' }}>
            The Development of AI Lead to a Tight, Dispersed, and Expensive
            Situation Regarding Computational Resources.
          </Desc>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.84rem',
              marginTop: '0.96rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.48rem',
              }}
            >
              <LiTxt>
                The surge in demand for high-performance GPU computational
                resources, driven by AI large models, has resulted in a severe
                imbalance between supply and demand. This has further elevated
                the already high prices of GPU computational power, attributed
                to factors such as design and manufacturing costs and market
                monopolies.
              </LiTxt>
              <LiTxt>
                GPU computational resources are primarily allocated to satisfy
                the demands of AI training scenarios, leading to a dispersed or
                fragmented nature of GPU computational resources for AI
                inference scenarios.
              </LiTxt>
            </div>
            <img style={{ width: '6.52rem' }} src={img6Url} />
          </div>
        </div>
        <div style={{ position: 'relative', marginBottom: '1.28rem' }}>
          <Title style={{ marginBottom: '1rem' }}>
            The Dispersion and High Cost of AI Computational Resources Pose New
            Challenges for Cloud Computing
          </Title>
          <img style={{ width: '100%' }} src={img7Url} />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '2rem',
              height: '0.64rem',
              background: '#ffffff',
            }}
          ></div>
        </div>
        <div style={{ marginBottom: '1.28rem' }}>
          <Title>
            DatenLord Integrates Storage and Network Solutions to Address the AI
            Computational Resource Challenges
          </Title>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.84rem',
              marginTop: '0.96rem',
            }}
          >
            <img style={{ width: '4.46rem' }} src={img8Url} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.48rem',
              }}
            >
              <LiTxt>
                By optimizing caching technology, it achieves data preloading
                and asynchronous persistence, thereby enhancing data access
                performance.
              </LiTxt>
              <LiTxt>
                The high-performance RDMA (Remote Direct Memory Access)
                facilitates multi-node memory sharing, accelerating the
                distribution of large models.
              </LiTxt>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#F8FAFF', padding: '1rem 1.48rem' }}>
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
            <Button style={{ marginLeft: '0.36rem' }}>Learn more</Button>
          </div>
          <img style={{ height: '0.9rem' }} src={img9Url} />
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
            <Button>Learn more</Button>
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
              <Button style={{ marginLeft: '0.36rem' }}>Learn more</Button>
            </div>
            <img style={{ height: '0.9rem' }} src={img9Url} />
          </div>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default HomePage
