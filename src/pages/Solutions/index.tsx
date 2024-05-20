import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import React from 'react'
import styled from 'styled-components'
import img1Url from '@/assets/solutions/image1.png'
import img2Url from '@/assets/solutions/image2.png'
import img3Url from '@/assets/solutions/image3.png'
import img4Url from '@/assets/solutions/image4.png'

const Wrapper = styled.div`
  background: #ffffff4f;
  border-radius: 0.42rem;
  overflow: hidden;
  margin-bottom: 0.7rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Title = styled.div`
  padding: 0.4rem 0.8rem;
  background: #0a061f;
  color: #ffffff;
  font-size: 0.48rem;
  line-height: 0.74rem;
  font-weight: 600;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff4f;
  padding: 0.42rem 0.32rem;
`
const Desc = styled.div`
  width: 100%;
  color: #050214;
  font-size: 0.3rem;
  line-height: 0.42rem;
  font-weight: 500;
  padding: 0.37rem 0.34rem;
  background: #d9dbef;
  border-radius: 0.12rem;
  position: relative;
  overflow: hidden;
`
const Main = styled.div`
  padding: 0.28rem 0.32rem;
`
const SubTitle = styled.div`
  font-size: 0.38rem;
  line-height: 0.56rem;
  font-weight: 600;
  color: #000000;
`
const SubDesc = styled.div`
  font-weight: 600;
  font-size: 0.32rem;
  line-height: 0.42rem;
  color: #7767a0;
`
const SubTxt = styled.div`
  color: #42424a;
  font-weight: 400;
  font-size: 0.24rem;
  line-height: 0.42rem;
`
const Txt = styled.div`
  font-size: 0.24rem;
  line-height: 0.42rem;
  font-weight: 400;
  color: #42424a;
  display: flex;
  align-items: flex-start;
  ::before {
    content: '•';
    padding-inline: 0.08rem;
  }
`
const OptionsContainer = styled.div`
  margin-bottom: 0.42rem;
  &:last-child {
    margin-bottom: 0;
  }
`

type CardData = {
  title: string
  desc: string
  cover: string
  challenge: {
    desc: string
    txt: string
  }
  options?: {
    title: string
    txt: string[]
  }[]
  image?: string
}

const cardData = [
  {
    title: 'AI Inference',
    desc: ' Integrating GPU computing power in a cloud-based manner to address the challenges of expensive and dispersed AI computing resources. Leveraging storage and networking to enhance user experience, achieving sub-second startup and recovery times.',
    cover: img1Url,
    challenge: {
      desc: 'The surge in demand for high-performance GPU computing power for large AI models has led to an imbalance in supply and demand.',
      txt: 'The scarcity of GPU computing power, exacerbated by factors such as design and manufacturing costs and market monopolies, has significantly raised GPU prices. GPU computing resources prioritize AI training scenarios, resulting in the fragmented or decentralized nature of GPU computing resources for AI inference scenarios.',
    },
    options: [
      {
        title: 'Solution',
        txt: [
          'Optimize caching techniques to implement data preloading and asynchronous persistence, thereby improving data access performance.',
          'Implement high-performance RDMA networking for multi-node memory sharing, accelerating the distribution and loading of large models.',
        ],
      },
      {
        title: "Customer's needs and challenges:",
        txt: [
          'The customer is a company specializing in overseas live streaming sales, utilizing large model technology for AI presenters to achieve low-cost horizontal business expansion.',
          'The customer plans to customize large models for live streaming scenarios to establish an independent and controllable "Live Streaming Scene Large Model."',
        ],
      },
      {
        title: 'DatenLord Cloud Service can provide:',
        txt: [
          'Cross-cloud technology to facilitate the implementation of "large model" business scenarios.',
          'Efficient data synchronization mechanisms to ensure real-time and consistent large model performance across different data centers.',
          'Effective data distribution mechanisms to ensure the large model can promptly access and process the latest data, enhancing business response speed.',
          'Flexible management and adjustment tools, allowing customers to independently control and adapt large models based on changing business needs.',
          'Advanced security measures, including data encryption and identity authentication, ensuring the secure operation of large models in a cross-cloud environment.',
        ],
      },
    ],
    image: img4Url,
  },
  {
    title: 'High-Performance Storage',
    desc: 'Unified high-performance cross-cloud data access and cross-cloud distributed metadata management.',
    cover: img2Url,
    challenge: {
      desc: 'The disconnect between clouds leads to data isolation and data fragmentation, and when accessing data across clouds, access speed and consistency will suffer.',
      txt: 'With the rapid implementation of AI applications, multi-cloud architecture has become the mainstream choice for enterprise-level IT. However, the isolation between clouds leads to data segregation and fragmentation. Due to data often being bound to a specific cloud provider/data center, it cannot be freely accessed. Additionally, cross-cloud data access exhibits high-latency characteristics, and existing distributed consensus protocols are limited to use within a single data center. Therefore, when accessing data across clouds, access speed and consistency are compromised.',
    },
    options: [
      {
        title: 'Solution',
        txt: [
          'Firstly, regardless of where the data is stored, DatenLord accelerates cross-cloud data access through caching and provides unified data management for automatic data migration and backup. ',
          'Secondly, DatenLord adopts a kernel-bypass architecture, enabling storage IO self-scheduling management to enhance performance. ',
          'Thirdly, a low-latency cross-cloud distributed consensus protocol ensures high speed and strong consistency in wide-area network scenarios, while eliminating single-point bottlenecks within the system.',
        ],
      },
      {
        title: "Customer's needs and challenges:",
        txt: [
          'The customer is a content-focused entertainment company primarily operating in the education, social, and short-form content sectors in the Middle East and Europe.',
          'The customer requires a solution for data synchronization, migration, backup, and automated management across multiple countries and data centers.',
        ],
      },
      {
        title:
          'DatenLord Cloud Service offers an integrated solution to help the customer effectively manage the complexity of multiple-country, multiple-data-center operations, thereby enhancing business availability and stability.',
        txt: [
          'Real-time data synchronization across multiple countries and data centers, ensuring consistency of content globally.',
          'Efficient tools for data migration and backup, addressing the needs of business expansion and disaster recovery.',
          'Automated management tools, including automated deployment, resource allocation, and monitoring.',
          'High availability and elastic scaling solutions to address challenges posed by technical failures or peak periods.',
        ],
      },
    ],
  },
  {
    title: 'High-Performance Networking',
    desc: 'A deep integration of software and hardware',
    cover: img3Url,
    challenge: {
      desc: 'The disconnect between clouds leads to data isolation and data fragmentation, and when accessing data across clouds, access speed and consistency will suffer.',
      txt: ' With the advent of the era of large models, whether in the transfer and migration of training data and checkpoints during model training or in the dynamic scheduling and loading of multiple models during the inference process, there is a desire to maximize the bandwidth of every bit on the network and bus. This is done in exchange for shorter training times and smaller request-response latencies. As the scale of training and inference clusters grows, and business complexity increases, occasional congestion or failures in the network become inevitable. Additionally, readjusting network card parameters after each change in network topology is a cumbersome task. A high-performance network that can rapidly and autonomously adapt to changes in network topology, providing continuous and stable data transfer capabilities, has become an essential infrastructure in the era of large models.',
    },
    options: [
      {
        title: 'Solution',
        txt: [
          'Leveraging the optimized RoCE v2 protocol and hardware-accelerated error correction coding technology, efficient data recovery and retransmission mechanisms can be provided even in challenging network conditions.',
          "Through a deep integration of software and hardware, a comprehensive suite enables dynamic awareness of the entire network's traffic. An intelligent decision system can rapidly and automatically adjust software and hardware parameters for each node in various network environments, ensuring optimal throughput across the entire network.",
        ],
      },
    ],
  },
]

const Card: React.FC<{ data: CardData }> = ({ data }) => {
  const { title, desc, cover, challenge, options, image } = data
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        <Desc>
          {desc}
          <img
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              height: '1.8rem',
            }}
            src={cover}
          />
        </Desc>
        <Main>
          <SubTitle style={{ marginBottom: '0.16rem' }}>Challenge</SubTitle>
          <SubDesc style={{ marginBottom: '0.16rem' }}>
            {challenge.desc}
          </SubDesc>
          <SubTxt style={{ marginBottom: '0.42rem' }}>{challenge.txt}</SubTxt>
          {options?.map(({ title, txt }) => {
            return (
              <OptionsContainer key={title} style={{}}>
                <SubTitle style={{ marginBottom: '0.16rem' }}>{title}</SubTitle>
                {txt.map((item, index) => (
                  <Txt key={index}>{item}</Txt>
                ))}
              </OptionsContainer>
            )
          })}
        </Main>
        {image && <img src={image} style={{ width: '10rem' }} />}
      </Content>
    </Wrapper>
  )
}

const Solutions: React.FC = () => {
  return (
    <React.Fragment>
      <Cover>Solution</Cover>
      <Section backgroundColor="#EDEDF6">
        {cardData.map(card => (
          <Card key={card.title} data={card} />
        ))}
      </Section>
    </React.Fragment>
  )
}

export default Solutions
