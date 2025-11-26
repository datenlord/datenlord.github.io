import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import techTalkCover from '@/assets/resources/tech-talk-bg.png'
import OSSShowcaseCover from '@/assets/resources/oss-showcase-bg.png'
import rustShowcaseCover from '@/assets/resources/rust-showcase-bg.png'
import HardwareAccelerationCover from '@/assets/resources/hardware-acceleration-bg.png'
import AIInfraMeetingCover from '@/assets/resources/ai-infra-meeting-bg.png'

const items = [
  {
    key: 1,
    cover: techTalkCover,
    title: '前沿科技分享',
    title_en: 'Frontier Technology Sharing',
    text: '探索前沿技术，拥抱创新与改变',
    url: '/tech-talk',
  },
  {
    key: 2,
    cover: OSSShowcaseCover,
    title: '开源产品分享',
    title_en: 'Open Source Product Sharing',
    text: '软硬件融合创新实践的观察与输出',
    url: '/oss-showcase',
  },
  {
    key: 3,
    cover: rustShowcaseCover,
    title: 'Rust语言应用及案例分享',
    title_en: 'Rust language applications and case studies',
    text: 'Rust编程语言的应用、实践与探索',
    url: '/rust-showcase',
  },
  {
    key: 4,
    cover: HardwareAccelerationCover,
    title: '硬件加速',
    title_en: 'Hardware Acceleration',
    text: '硬件加速领域的实践、经验与挑战',
    url: '/hardware-acceleration',
  },
  {
    key: 5,
    cover: AIInfraMeetingCover,
    title: 'AI Infra 开源组会',
    title_en: 'AI Infra Open Source Meeting',
    text: 'AI Infra 领域的前沿实践经验和实用技巧',
    url: '/ai-infra-meeting',
  },
]

const { Heading } = Typography
const { CNHead4 } = Heading

const SectionWrapper = styled.section`
  background: ${props => props.theme.themeDark};
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.8rem;
  padding-inline: 1.22rem;
`
const Title = styled(CNHead4)`
  padding-bottom: 1.35rem;
  color: ${props => props.theme.secondary02};
  text-align: center;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Card = styled.div`
  background: #070708;
  border-radius: 0.12rem;
  border: 1px solid #FFFFFF4D;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 0.2rem;
`
const CardTop = styled.div<{ bg: string }>`
  height: 200px;
  background-image: url(${props => props.bg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CardTopTitle = styled.div`
  font-size: 0.3rem;
  font-weight: 600;
  color: #fff;
  font-family: YouSheBiaoTiHei;
  font-style: Regular;
`
const CardTopTitleEn = styled.div`
  font-family: Arial;
  font-size: 0.125rem;
  font-family: Arial;
  font-style: Italic;
  color: #fff;
  padding: 4px 12px;
  border: 0.31px solid #FFFFFF4D;
  border-radius: 0.08rem;
  backdrop-filter: blur(8.21676254272461px);
`
const CardContent = styled.div`
  padding-block: 0.26rem;
  padding-inline: 0.2rem;
`
const CardTitle = styled.div`
  padding-bottom: 0.08rem;
  font-size: 0.226rem;
  font-weight: 600;
  color: #fff;
`
const CardText = styled.div`
  font-size: 0.145rem;
  line-height: 0.258rem;
  color: ${props => props.theme.secondary02};
`

export default () => {
  const navigate = useNavigate()
  return (
    <SectionWrapper id='tech-share'>
      <SectionContainer>
        <Title>技术分享</Title>
        <Container>
          {items.map(({ key, cover, title, title_en, text, url }, index) => (
            <Card
              key={key}
              style={{
                width: index < 3 ? '32%' : '49%',
              }}
              onClick={() => {
                navigate(url)
              }}
            >
              <CardTop bg={cover}>
                <CardTopTitle>{title}</CardTopTitle>
                <CardTopTitleEn>{title_en}</CardTopTitleEn>
              </CardTop>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
              </CardContent>
            </Card>
          ))}
        </Container>
      </SectionContainer>
    </SectionWrapper>
  )
}
