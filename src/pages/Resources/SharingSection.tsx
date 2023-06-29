import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import sharingTextImageUrl from '@/assets/resources/sharing-text-image.png'

const items = [
  {
    key: 1,
    cover: sharingTextImageUrl,
    title: '前沿科技分享',
    text: '描述文字描述文字描述文字描述文字',
  },
  {
    key: 2,
    cover: sharingTextImageUrl,
    title: '前沿科技分享',
    text: '描述文字描述文字描述文字描述文字',
  },
  {
    key: 3,
    cover: sharingTextImageUrl,
    title: '前沿科技分享',
    text: '描述文字描述文字描述文字描述文字',
  },
]

const { Heading, Paragraph } = Typography
const { CNHead4 } = Heading
const { CNBodyLarge } = Paragraph

const SectionWrapper = styled.section`
  background: ${props => props.theme.themeDark};
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.8rem;
  padding-inline: 1.53rem;
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
  width: 31%;
  padding: 0.01rem;
  background: linear-gradient(45deg, #ffffff90, #ffffff00 60%);
  border-radius: 0.12rem;
  overflow: hidden;
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
  padding-block: 0.38rem;
  padding-inline: 0.25rem;
`
const CardTitle = styled(CNHead4)`
  color: #fff;
`
const CardText = styled(CNBodyLarge)`
  color: ${props => props.theme.secondary02};
`

export default () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <Title>技术分享</Title>
        <Container>
          {items.map(({ key, cover, title, text }) => (
            <CardWrapper key={key}>
              <Card>
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
