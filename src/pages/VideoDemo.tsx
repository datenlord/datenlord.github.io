import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import videoDemoCoverUrl from '@/assets/video/video-demo-cover.png'
import videoDemoImageUrl from '@/assets/video/video-demo-image.png'
import arrowUpRightUrl from '@/assets/video/arrow-up-right.svg'

const { Heading, Paragraph } = Typography
const { CNHead4, CNTitleLarge } = Heading
const { CNMarkSmall, CNBodySmall } = Paragraph

const item = {
  image: videoDemoImageUrl,
  title: '新闻标题新闻标题新闻标题',
  text: '描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述...',
  date: '2023.5',
  url: '',
}

const items = Array(6)
  .fill(item)
  .map(() => ({ ...item }))

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
  justify-items: center;
  align-items: center;
`
const AllVideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.43rem 0.29rem;
  justify-items: center;
  align-items: center;
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
`
const VideoImageVertical = styled.img`
  display: block;
  width: 100%;
  border-radius: 0.06rem;
`
const VideoImageHorizon = styled.img`
  display: block;
  width: 50%;
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
  return (
    <>
      <Cover cover={videoDemoCoverUrl}>前沿技术分享</Cover>
      <MainWrapper>
        <MainContainer>
          <Section>
            <SectionTitle>最新视频</SectionTitle>
            <NewVideoContainer>
              {items.map(({ image, date, title, text }, index) => {
                if (index === 0) {
                  return (
                    <NewVideoVertical key={index}>
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
                    <VideoHorizon key={index}>
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
            </NewVideoContainer>
          </Section>
          <Section>
            <SectionTitle>推荐视频</SectionTitle>
            {items.map(({ image, date, title, text }, index) => {
              if (index === 0) {
                return (
                  <VideoHorizon key={index}>
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
              {items.map(({ image, date, title, text }, index) => (
                <VideoVertical key={index}>
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
    </>
  )
}
