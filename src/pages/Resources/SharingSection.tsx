import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import techTalkCover from '@/assets/resources/tech-talk-cover.png'
import OSSShowcaseCover from '@/assets/resources/oss-showcase-cover.png'
import rustShowcaseCover from '@/assets/resources/rust-showcase-cover.png'
import HardwareAccelerationCover from '@/assets/resources/hardware-acceleration-cover.png'

const items = [
  {
    key: 1,
    cover: techTalkCover,
    title: '前沿科技分享',
    text: '探索前沿技术，拥抱创新与改变',
    url: '/tech-talk',
  },
  {
    key: 2,
    cover: OSSShowcaseCover,
    title: '开源产品分享',
    text: '软硬件融合创新实践的观察与输出',
    url: '/oss-showcase',
  },
  {
    key: 3,
    cover: rustShowcaseCover,
    title: 'Rust语言应用及案例分享',
    text: 'Rust编程语言的应用、实践与探索',
    url: '/rust-showcase',
  },
  {
    key: 4,
    cover: HardwareAccelerationCover,
    title: '硬件加速',
    text: '硬件加速领域的实践、经验与挑战',
    url: '/hardware-acceleration',
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
  justify-content: space-between;
`
const CardWrapper = styled.div`
  display: flex;
  width: 24%;
  padding: 0.01rem;
  background: linear-gradient(45deg, #ffffff90, #ffffff00 60%);
  border-radius: 0.12rem;
  overflow: hidden;
  cursor: pointer;
`
const Card = styled.div`
  width: 100%;
  background: #070708;
  border-radius: 0.12rem;
`
const CardCover = styled.img`
  display: block;
  width: 100%;
  border-radius: 0.12rem;
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
          {items.map(({ key, cover, title, text, url }) => (
            <CardWrapper key={key}>
              <Card
                onClick={() => {
                  navigate(url)
                }}
              >
                <CardCover src={cover} />
                <CardContent>
                  <CardTitle>{title}</CardTitle>
                  <CardText>{text}</CardText>
                </CardContent>
              </Card>
            </CardWrapper>
          ))}
        </Container>
      </SectionContainer>
    </SectionWrapper>
  )
}
