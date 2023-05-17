import styled from 'styled-components'
import moment from 'moment'
import { Header } from '@/components/Header'

import CoverUrl from '@/assets/resources/cover.png'
import Image1Url from '@/assets/resources/image1.png'
import Image2Url from '@/assets/resources/image2.png'
import DotUrl from '@/assets/resources/dot.svg'

const ViewWrapper = styled.div`
  margin-top: 84px;
  color: #42424a;
  font-family: PingFang SC;
`
// const TopSection = styled.section`
//   height: calc(492px - 84px);
//   background-image: url(${CoverUrl});
//   background-size: cover;
// `
const ViewContainer = styled.div`
  max-width: 1440px;
  min-height: calc(100vh - 84px);
  margin-inline: auto;
  padding-block: 24px;
  padding-inline: 165px;
`
const Heading = styled.h1`
  font-weight: 600px;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
  color: #42424a;
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
`
const ContentContainer = styled.div`
  flex-grow: 1;
  margin-right: 48px;
`
const Image = styled.img`
  width: 40%;
`
const Date = styled.div`
  margin-bottom: 6px;
  font-size: 15px;
  line-height: 30px;
  font-weight: 600px;
  color: #7680dd;
`
const Title = styled.div`
  margin-bottom: 27px;
  font-size: 27px;
  line-height: 33px;
  font-weight: 600;
  color: #1e1e1e;
`
const Description = styled.div`
  margin-bottom: 6px;
  font-size: 13.5px;
  line-height: 24px;
  font-weight: 400;
  color: #7d7d7d;
`
const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
`
const Dot = styled.img`
  width: 22px;
  height: 22px;
  padding-inline: 8px;
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
    author: 'By DatenLord',
    read: '19min',
    img: Image1Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-geo-distributed-metadata-management-system/',
  },
  {
    date: '2023-05-04',
    title: 'Proofing the Correctness of the CURP Consensus Protocol Using TLA+',
    description:
      'The CURP Replication Protocol (NSDI ’19) aims to eliminate the additional round trips between servers in replicated state machines. We extended CURP into a consensus protocol and used it in our open source project Xline. This webinar is about how we modeled the CURP consensus protocol in TLA+ and verified the correctness of it.',
    author: 'By DatenLord',
    read: '20min',
    img: Image2Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-proofing-the-correctness-of-the-curp-consensus-protocol-using-tla/',
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
