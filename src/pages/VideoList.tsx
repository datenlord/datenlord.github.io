import React, {useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import videoDemoCoverUrl from '@/assets/video/video-demo-cover.png'
import arrowUpRightUrl from '@/assets/video/arrow-up-right.svg'

import { techTalkItems } from './TechShare/TechTalk'
import { OSSShowcaseItems } from './TechShare/OSSShowcase'
import { rustShowcaseItems } from './TechShare/RustShowcase'
import { spinalHDLItems } from './TechShare/SpinalHDL'

const { Heading, Paragraph } = Typography
const { CNHead4, CNTitleLarge } = Heading
const { CNMarkSmall, CNBodySmall } = Paragraph

interface Data {
  key: number
  image: string
  title: string
  text: string
  date: string
  url: string
}

const data = new Map<
  string,
  { label: string; description: string; list: Data[] }
>([
  [
    'tech-talk',
    {
      label: '前沿科技分享',
      description: '探索前沿技术，拥抱创新与改变',
      list: techTalkItems,
    },
  ],
  [
    'oss-showcase',
    {
      label: '开源产品分享',
      description: '软硬件融合创新实践的观察与输出',
      list: OSSShowcaseItems,
    },
  ],
  [
    'rust-showcase',
    {
      label: 'Rust语言应用及案例分享',
      description: 'Rust编程语言的应用、实践与探索',
      list: rustShowcaseItems,
    },
  ],
  [
    'spinal-hdl',
    {
      label: 'SpinalHDL',
      description: 'SpinalHDL的实践、挑战与应用前景',
      list: spinalHDLItems,
    },
  ],
])

const MainWrapper = styled.main``
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding: 1rem 1.76rem 1.68rem;
`
const Section = styled.section`
  padding-bottom: 0.84rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 0.48rem;
  text-align: center;
`
const NewVideoContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.29rem;
`
const AllVideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.43rem 0.29rem;
`
const VideoVertical = styled.div`
  display: flex;
  flex-direction: column;
`
const NewVideoVertical = styled(VideoVertical)`
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1 / 3 / 2;
`
const VideoHorizon = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const VideoMix = styled.div``
const VideoImageVertical = styled.img`
  display: block;
  width: 100%;
  border-radius: 0.06rem;
`
const VideoImageHorizon = styled.img`
  display: block;
  width: 50%;
  height: min-content;
  border-radius: 0.06rem;
`
const VideoImageMix = styled.img`
  float: left;
  width: 50%;
  padding-right: 0.21rem;
  padding-bottom: 0.21rem;
  border-radius: 0.06rem;
`
const VideoContentVertical = styled.div`
  padding-top: 0.29rem;
`
const VideoContentHorizon = styled.div`
  width: 47%;
`
const VideoDate = styled(CNMarkSmall)`
  padding-bottom: 0.11rem;
  color: ${props => props.theme.secondary01};
`
const VideoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.11rem;
`
const VideoTitle = styled(CNTitleLarge)`
  color: #1a1a1a;
`
const ArrowUpRight = styled.img`
  width: 0.215rem;
  height: 0.215rem;
`
const VideoDescription = styled(CNBodySmall)`
  color: #667085;
`

export default () => {
  const location = useLocation()
  const name = location.pathname.split('/').join('')
  const title = data.get(name)?.label
  const description = data.get(name)?.description
  const items = data.get(name)?.list.reverse()
  // console.log(typeof title.get(name))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <Cover cover={videoDemoCoverUrl} subTitle={description}>
        {title}
      </Cover>
      <MainWrapper>
        <MainContainer>
          <Section>
            <SectionTitle>最新视频</SectionTitle>
            <NewVideoContainer>
              {items &&
                items.map(({ key, image, date, title, text, url }, index) => {
                  if (index === 0) {
                    return (
                      <NewVideoVertical key={key} as={Link} to={url}>
                        <VideoImageVertical src={image} />
                        <VideoContentVertical>
                          <VideoDate>{date}</VideoDate>
                          <VideoTitleContainer>
                            <VideoTitle>{title}</VideoTitle>
                            <ArrowUpRight src={arrowUpRightUrl} />
                          </VideoTitleContainer>
                          <VideoDescription>{text}</VideoDescription>
                        </VideoContentVertical>
                      </NewVideoVertical>
                    )
                  } else if (index < 3) {
                    return (
                      <VideoMix key={index} as={Link} to={url}>
                        <VideoImageMix src={image} />
                        <VideoDate>{date}</VideoDate>
                        <VideoTitleContainer>
                          <VideoTitle>{title}</VideoTitle>
                          <ArrowUpRight src={arrowUpRightUrl} />
                        </VideoTitleContainer>
                        <VideoDescription>{text}</VideoDescription>
                      </VideoMix>
                    )
                  } else {
                    return null
                  }
                })}
            </NewVideoContainer>
          </Section>
          <Section>
            <SectionTitle>推荐视频</SectionTitle>
            {items &&
              items.map(({ key, image, date, title, text, url }, index) => {
                if (index === 0) {
                  return (
                    <VideoHorizon key={key} as={Link} to={url}>
                      <VideoImageHorizon src={image} />
                      <VideoContentHorizon>
                        <VideoDate>{date}</VideoDate>
                        <VideoTitleContainer>
                          <VideoTitle>{title}</VideoTitle>
                          <ArrowUpRight src={arrowUpRightUrl} />
                        </VideoTitleContainer>
                        <VideoDescription>{text}</VideoDescription>
                      </VideoContentHorizon>
                    </VideoHorizon>
                  )
                }
              })}
          </Section>
          <Section>
            <SectionTitle>全部视频</SectionTitle>
            <AllVideoContainer>
              {items &&
                items.map(({ key, image, date, title, text, url }) => (
                  <VideoVertical key={key} as={Link} to={url}>
                    <VideoImageVertical src={image} />
                    <VideoContentVertical>
                      <VideoDate>{date}</VideoDate>
                      <VideoTitleContainer>
                        <VideoTitle>{title}</VideoTitle>
                        <ArrowUpRight src={arrowUpRightUrl} />
                      </VideoTitleContainer>
                      <VideoDescription>{text}</VideoDescription>
                    </VideoContentVertical>
                  </VideoVertical>
                ))}
            </AllVideoContainer>
          </Section>
        </MainContainer>
      </MainWrapper>
    </React.Fragment>
  )
}
