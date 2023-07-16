import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import blogTestImageUrl from '@/assets/resources/blog-test-image.png'

const { Heading, Paragraph } = Typography
const { CNHead4, TitleLarge } = Heading
const { CNBodySmall, CNBodyMedium } = Paragraph

const SectionWrapper = styled.section`
  background: #f7f7f9;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 0.32rem;
  padding-inline: 1.22rem;
`
const Title = styled(CNHead4)`
  padding-bottom: 1.22rem;
  color: ${props => props.theme.themeDark02};
  text-align: center;
`
const MainContainer = styled.div`
  padding-block: 0.59rem;
  padding-inline: 0.3rem;
`
const ContentContainer = styled.div`
  padding-bottom: 0.59rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.36rem;
  padding-inline: 0.29rem;
  height: min-content;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  grid-area: 1 / 1 / 3 / 2;
  border-top-left-radius: 0.12rem;
  border-top-right-radius: 0.12rem;
`
const BlogItem = styled.div`
  padding-bottom: 0.22rem;
  border-bottom: 0.01rem solid #a4a4a4;
`
const BlogTitle = styled(TitleLarge)`
  padding-bottom: 0.15rem;
  color: ${props => props.theme.gray007};
`
const BlogDescription = styled(CNBodyMedium)`
  padding-bottom: 0.07rem;
  color: #383838;
`
const BlogText = styled(CNBodySmall)`
  color: #a4a4a4;
`
const Button = styled(CNBodyMedium)`
  color: #fff;
  margin-inline: auto;
  padding-block: 0.12rem;
  padding-inline: 0.34rem;
  width: min-content;
  white-space: nowrap;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  border-radius: 0.5rem;
  border: none;
`

const items = [
  {
    key: 1,
    title: '标题标题标题',
    description:
      '描述文字描述文字描述文字描述文字描述文描述文字描述文字描述文字......',
    text: '文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...',
  },
  {
    key: 2,
    title: '标题标题标题',
    description:
      '描述文字描述文字描述文字描述文字描述文描述文字描述文字描述文字......',
    text: '文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...',
  },
  {
    key: 3,
    title: '标题标题标题',
    description:
      '描述文字描述文字描述文字描述文字描述文描述文字描述文字描述文字......',
    text: '文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...',
  },
  {
    key: 4,
    title: '标题标题标题',
    description:
      '描述文字描述文字描述文字描述文字描述文描述文字描述文字描述文字......',
    text: '文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...文章关键词关键词...',
  },
]

export const BlogSection: React.FC = () => {
  return (
    <SectionWrapper id='blog'>
      <SectionContainer>
        <Title>技术博客</Title>
        <MainContainer>
          <ContentContainer>
            <Image src={blogTestImageUrl} />
            {items.map(({ key, title, description, text }) => (
              <BlogItem key={key}>
                <BlogTitle>{title}</BlogTitle>
                <BlogDescription>{description}</BlogDescription>
                <BlogText>{text}</BlogText>
              </BlogItem>
            ))}
          </ContentContainer>
          <Button>了解更多</Button>
        </MainContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}
