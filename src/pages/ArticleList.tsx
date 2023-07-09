import styled from 'styled-components'

import { Cover } from '@/components/Cover'

import articleDemoCoverUrl from '@/assets/article-demo-cover.png'
import articleDemoImageUrl from '@/assets/article-demo-image.png'

const item = {
  illustration: articleDemoImageUrl,
  title:
    '博客标题博客标题博客标题博客标题博客标题博客标题博客标题博客标题博客标题',
  description:
    '描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容',
  date: '2023.5.25',
  metaData: {
    author: 'xxxx',
    readTime: '7分钟',
  },
}

const items = Array(5)
  .fill(item)
  .map(() => ({ ...item }))

const MainWrapper = styled.main`
  background: #fff;
`
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding: 0.96rem 1.65rem 1.56rem;
`
const Card = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: .27rem;
  padding-bottom: 0.27rem;
  padding-inline: calc(1.79rem - 1.65rem);
  border-bottom: 0.01rem solid #9a9a9a;
  &:last-child {
    margin-bottom: 0;
  }
`
const Illustration = styled.img`
  width: 40%;
  border-radius: 0.08rem;
`
const Content = styled.div`
  width: 56%;
  padding-top: calc(1.22rem - 0.96rem);
  padding-bottom: calc(0.53rem - 0.27rem);
`
const Date = styled.div`
  padding-bottom: 0.05rem;
  font-size: 0.15rem;
  line-height: 0.3rem;
  font-weight: 500;
  color: #1c5cff;
`
const Title = styled.div`
  padding-bottom: 0.26rem;
  font-size: 0.27rem;
  line-height: 0.33rem;
  font-weight: 600;
  color: #1e1e1e;
`
const Description = styled.div`
  padding-bottom: 0.13rem;
  font-size: 0.135rem;
  line-height: 0.24rem;
  font-weight: 400;
  color: #7d7d7d;
`
const MetaData = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.12rem;
  line-height: 0.18rem;
  font-weight: 500;
  font-weight: 500;
`
const Author = styled.div`
  color: #797979;
`
const ReadTime = styled.div`
  color: #1c5cff;
`
const Separator = styled.div`
  margin-inline: 0.12rem;
  width: 0.08rem;
  height: 0.08rem;
  background: #797979;
  border-radius: 50%;
`

export default () => {
  return (
    <>
      <Cover cover={articleDemoCoverUrl}>活动预告</Cover>
      <MainWrapper>
        <MainContainer>
          {items.map(
            ({ illustration, date, title, description, metaData }, index) => {
              const { author, readTime } = metaData
              return (
                <Card key={index}>
                  <Illustration src={illustration} />
                  <Content>
                    <Date>{date}</Date>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                    <MetaData>
                      <Author>作者：{author}</Author>
                      <Separator />
                      <ReadTime>{readTime}</ReadTime>
                    </MetaData>
                  </Content>
                </Card>
              )
            },
          )}
        </MainContainer>
      </MainWrapper>
    </>
  )
}
