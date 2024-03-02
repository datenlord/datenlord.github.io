import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import type { CarouseData } from './Home'

import distributedStorageBgUrl from '@/assets/carousel/distributed-storage-bg.png'
import dataAccessBgUrl from '@/assets/carousel/data-access-bg.png'
import metadataManagementBgUrl from '@/assets/carousel/metadata-management-bg.png'
import hardwareAccelerationBgUrl from '@/assets/carousel/hardware-acceleration-bg.png'
import openSourceBgUrl from '@/assets/carousel/open-source-bg.png'
import foxIconUrl from '@/assets/carousel/fox-icon.svg'
import rightArrowUrl from '@/assets/carousel/right-arrow.svg'
// import decorationUrl from '@/assets/carousel/decoration.svg'

const cardData = [
  {
    key: 'new-honors',
    label: '新闻/荣誉',
    url: '/news-honor-dynamic',
    content: {
      type: 'text',
      content: '达坦科技所获荣誉及相关新闻',
      // type: 'ul',
      // children: [
      //   {
      //     key: 'open-source',
      //     label: '开源之夏',
      //     url: '',
      //   },
      //   {
      //     key: 'system-competition',
      //     label: 'OS系统大赛',
      //     url: '',
      //   },
      // ],
    },
  },
  {
    key: 'event-preview',
    label: '活动预告',
    url: '/events',
    content: {
      type: 'text',
      content: 'Virtual Meetings & Meetups 线上会议及分享的预告',
    },
  },
  {
    key: 'highlight-review',
    label: '精彩回顾',
    url: '/highlights',
    content: {
      type: 'text',
      content: '直播分享或Meetups精彩回顾',
    },
  },
]

const { Heading, Paragraph } = Typography
const { CNHead1 } = Heading
const { CNBodyLarge } = Paragraph

const getBackgroundImage = (bg: string) => {
  switch (bg) {
    case 'distributed-storage':
      return distributedStorageBgUrl
    case 'data-access':
      return dataAccessBgUrl
    case 'metadata-management':
      return metadataManagementBgUrl
    case 'hardware-acceleration':
      return hardwareAccelerationBgUrl
    case 'open-source':
      return openSourceBgUrl
    default:
      return distributedStorageBgUrl
  }
}

const Wrapper = styled.div<{ bg: string }>`
  color: #fff;
  background-size: cover;
  padding-top: 0.72rem;
  background-image: url(${({ bg }) => getBackgroundImage(bg)});
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-top: calc(2.7rem - 0.72rem);
  padding-inline: 2.15rem;
`
const SCard = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.95rem;
  background: rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(8.5px);
  border: 0.01rem solid transparent;
  border-image: linear-gradient(180deg, #ffffff, #ffffff40) 1;
  clip-path: inset(0 round 0.14rem);
  :last-child div {
    border: none;
  }

  /* border: 0.01rem solid #fff; */
  /* border-radius: 0.12rem; */
`
const SectionWrapper = styled.div`
  width: 33.33%;
  padding-block: 0.32rem;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-inline: 0.52rem;
  border-right: 1px solid #d9dbef;
`
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.22rem;
`
const Title = styled.div`
  margin-right: 0.15rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  letter-spacing: -2%;
`
const FoxIcon = styled.img`
  height: 0.3rem;
  margin-right: 0.27rem;
`
const More = styled.p`
  margin-right: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.26rem;
  color: ${props => props.theme.secondary08};
  cursor: pointer;
`
const ArrowIcon = styled.img`
  width: 0.14rem;
  cursor: pointer;
`
// const List = styled.ul`
//   padding-left: 0.2rem;
//   font-size: 0.16rem;
//   line-height: 0.3rem;
// `
// const ListItem = styled.li``
const Text = styled.p`
  font-size: 0.16rem;
  line-height: 0.3rem;
`
// const Decoration = styled.img``
// const DecorationLeft = styled(Decoration)``
// const DecorationRight = styled(Decoration)``

const routerMap = new Map([
  ['distributed-storage', '/solutions/ai'],
  ['data-access', '/solutions/storage'],
  ['hardware-acceleration', '/solutions/networks'],
  ['open-source', '/community'],
])

const Card: React.FC = () => {
  const navigate = useNavigate()
  return (
    <SCard>
      {cardData.map(({ key, label, content, url }) => (
        <SectionWrapper key={key}>
          <Section>
            <TopContainer>
              <Title>{label}</Title>
              <FoxIcon src={foxIconUrl} />
              <More
                onClick={() => {
                  navigate(url)
                }}
              >
                更多
              </More>
              <ArrowIcon src={rightArrowUrl} />
            </TopContainer>
            {content.type === 'ul' ? null : (
              // <List>
              //   {content.children?.map(({ key, label }) => (
              //     <ListItem key={key}>{label}</ListItem>
              //   ))}
              // </List>
              <Text>{content.content}</Text>
            )}
          </Section>
        </SectionWrapper>
      ))}
    </SCard>
  )
}

export const CarouselView: React.FC<{ items: CarouseData }> = ({ items }) => {
  const navigate = useNavigate()
  const { key, title, description } = items
  return (
    <Wrapper bg={key}>
      <Container>
        <CNHead1 style={{ marginBottom: '0.32rem' }}>{title}</CNHead1>
        <CNBodyLarge
          style={{
            maxWidth: '6.12rem',
            textAlign: 'center',
            marginBottom: '0.7rem',
          }}
        >
          {description}
        </CNBodyLarge>
        <Button
          style={{ marginBottom: '1.49rem' }}
          onClick={() => {
            // @ts-ignore
            navigate(routerMap.get(key))
          }}
        >
          了解更多
        </Button>
        <Card />
      </Container>
    </Wrapper>
  )
}
