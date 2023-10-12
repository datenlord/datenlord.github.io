import styled from 'styled-components'
import moment from 'moment'
import { Header } from '@/components/Header1'

import CoverUrl from '@/assets/resources/cover.png'
import Image1Url from '@/assets/resources/image1.png'
import Image2Url from '@/assets/resources/image2.png'
import Image3Url from '@/assets/resources/image3.png'
import DotUrl from '@/assets/resources/dot.svg'

const ViewWrapper = styled.div`
  margin-top: 84px;
  color: #42424a;
  font-family: PingFang SC;
  @media screen and (max-width: 1024px) {
    margin-top: 69px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 53px;
  }
`
const ViewContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 24px;
  padding-inline: 165px;
  @media screen and (max-width: 1024px) {
    padding-block: 18px;
    padding-inline: 123.75px;
  }
  @media screen and (max-width: 768px) {
    margin-block: 12px;
    padding-inline: 82.5px;
  }
  @media screen and (max-width: 425px) {
    margin-block: 6px;
    padding-inline: 41.25px;
  }
`
const Heading = styled.h1`
  font-weight: 600px;
  font-size: 36px;
  line-height: 1.5;
  text-align: center;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    font-size: 27px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`
const List = styled.ul``
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding-block: 24px;
  padding-inline: 12px;
  border-bottom: 0.5px solid #9a9a9a;
  cursor: pointer;
  /* :last-child {
    border-bottom: none;
  } */
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding-block: 18px;
    padding-inline: 9px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 12px;
    padding-inline: 6px;
  }
`
const ContentContainer = styled.div`
  flex-grow: 1;
  margin-right: 48px;
  @media screen and (max-width: 1024px) {
    margin-right: 0;
  }
`
const Image = styled.img`
  width: 40%;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
const Date = styled.div`
  margin-bottom: 6px;
  font-size: 15px;
  line-height: 2;
  font-weight: 600px;
  color: #7680dd;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`
const Title = styled.div`
  margin-bottom: 27px;
  font-size: 27px;
  line-height: 1.22;
  font-weight: 600;
  color: #1e1e1e;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20.25px;
    font-size: 20.25;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
    font-size: 16px;
  }
`
const Description = styled.div`
  margin-bottom: 6px;
  font-size: 13.5px;
  line-height: 1.77;
  font-weight: 400;
  color: #7d7d7d;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`
const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1%.5;
  font-weight: 600;
  @media screen and (max-width: 1024px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 6px;
  }
`
const Dot = styled.img`
  width: 22px;
  height: 22px;
  padding-inline: 8px;
  @media screen and (max-width: 1024px) {
    width: 16.5px;
    height: 16.5px;
    padding-inline: 6px;
  }
  @media screen and (max-width: 768px) {
    width: 11px;
    height: 11px;
    padding-inline: 4px;
  }
`
const Author = styled.div`
  color: #797979;
`
const ReadTime = styled.div`
  color: #7680dd;
`

const data = [
  {
    date: '2023-01-19',
    title: 'Geo-distributed Metadata Management System',
    description:
      'The webinar aims to briefly introduce DatenLord’s open source project Xline, a distributed metadata management system for multi-clusters. It reveals the motivation of Xline, the architecture of it and the important consensus protocol, CURP. The performance comparison shows the advantage of Xline over the current solution.',
    author: 'By jicheng Shi',
    read: '19min',
    img: Image1Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-geo-distributed-metadata-management-system/',
  },
  {
    date: '2023-05-04',
    title: 'Proofing the Correctness of the CURP Consensus Protocol Using TLA+',
    description:
      'The CURP Replication Protocol (NSDI ’19) aims to eliminate the additional round trips between servers in replicated state machines. We extended CURP into a consensus protocol and used it in our open source project Xline. This webinar is about how we modeled the CURP consensus protocol in TLA+ and verified the correctness of it.',
    author: 'By Ye Tian',
    read: '20min',
    img: Image2Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-proofing-the-correctness-of-the-curp-consensus-protocol-using-tla/',
  },
  {
    date: '2023-09-08',
    title: 'How to Write a Distributed Key-value store in Rust',
    description:
      'In this presentation, we will explore how to use Rust to build a distributed key-value store, taking the open-source distributed KV storage Xline as an example.',
    author: 'By Jiawei Zhao',
    read: '35min',
    img: Image3Url,
    url: 'https://community.cncf.io/events/details/cncf-cncf-online-programs-presents-cncf-on-demand-webinar-how-to-write-a-distributed-key-value-store-in-rust/',
  },
]

interface CardProps {
  data: {
    date: string
    title: string
    description: string
    author: string
    read: string
    img: string
    url: string
  }
}

const Card: React.FC<CardProps> = data => {
  const { date, title, description, author, read, img, url } = data.data
  return (
    <ListItem onClick={() => (window.location.href = `${url}`)}>
      <ContentContainer>
        <Date>{moment(date, 'YYYY-MM-DD').format('dddd MMMM D, YYYY')}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <MetaDataContainer>
          <Author>{author}</Author>
          <Dot src={DotUrl} />
          <ReadTime>{read}</ReadTime>
        </MetaDataContainer>
      </ContentContainer>
      <Image src={img} />
    </ListItem>
  )
}

const TechTalkPage: React.FC = () => {
  return (
    <ViewWrapper>
      <Header theme="dark" activeId="resources" />
      {/* <TopSection></TopSection> */}
      <Heading>Tech Talk</Heading>
      <ViewContainer>
        <List>
          {data.map(item => {
            return <Card key={item.title} data={item} />
          })}
        </List>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default TechTalkPage
