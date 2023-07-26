import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import moment from 'moment'

import { Cover } from '@/components/Cover'

import blogCoverUrl from '@/assets/blog-cover.png'

const titleMap = new Map([
  ['blogs', '技术博客'],
  ['events', '活动预告'],
  ['highlights', '精彩回顾'],
  ['news-honor-dynamic', '新闻 / 荣誉 / 动态'],
])

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
  align-items: center;
  margin-bottom: 0.27rem;
  padding-bottom: 0.27rem;
  padding-inline: calc(1.79rem - 1.65rem);
  border-bottom: 0.01rem solid #9a9a9a;
  &:last-child {
    margin-bottom: 0;
  }
`
const Illustration = styled.img`
  padding-left: 0.47rem;
  width: 4.35rem;
  height: min-content;
  border-radius: 0.08rem;
`
const Content = styled.div`
  width: 56%;
  flex: 1;
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
// const ReadTime = styled.div`
//   color: #1c5cff;
// `
const Separator = styled.div`
  margin-inline: 0.12rem;
  width: 0.08rem;
  height: 0.08rem;
  background: #797979;
  border-radius: 50%;
`
const Tag = styled.div`
  padding-inline: 0.08rem;
  color: #2f54eb;
  border: 0.01rem solid #2f54eb;
  background: #d6e4ff;
  border-radius: 0.04rem;
  text-transform: capitalize;
`

const blogs = import.meta.glob(`@/articles/blogs/*/index.md`)
const events = import.meta.glob(`@/articles/events/*/index.md`)
const highlights = import.meta.glob(`@/articles/highlights/*/index.md`)
const newsHonorDynamic = import.meta.glob(
  `@/articles/news-honor-dynamic/*/index.md`,
)

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { title } = useParams()
  // console.log(title)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getItems = () => {
    switch (title) {
      case 'blogs':
        return blogs
      case 'events':
        return events
      case 'highlights':
        return highlights
      case 'news-honor-dynamic':
        return newsHonorDynamic
      default:
        return events
    }
  }

  const items = getItems()

  const [data, setData] = useState<typeof import('*.md')[]>([])

  const getEvents = async () => {
    setData(
      (await Promise.all(
        Object.keys(items).map(path => items[path]()),
      )) as typeof import('*.md')[],
    )
  }

  useEffect(() => {
    getEvents()
  }, [location.pathname])

  // useEffect(() => {
  //   console.log(blogs)
  // }, [blogs])

  return (
    <>
      <Cover cover={blogCoverUrl}>{title && titleMap.get(title)}</Cover>
      <MainWrapper>
        <MainContainer>
          {data.reverse().map(({ metadata, assetURLs }) => {
            const {
              date,
              title,
              label,
              description,
              author,
              editor,
              location,
              cover,
              tags,
            } = metadata
            return (
              <Card
                key={title}
                onClick={() => {
                  navigate(`${date}-${title.split(' ').join('-')}`)
                }}
              >
                {cover && <Illustration src={cover && assetURLs[0]} />}
                <Content>
                  <Date>{moment(date).format('YYYY.M.D')}</Date>
                  <Title>{label}</Title>
                  <Description>{description}</Description>
                  <MetaData>
                    {author && (
                      <>
                        <Author>嘉宾：{author[0]}</Author>
                        <Separator />
                      </>
                    )}
                    {editor && (
                      <>
                        <Author>编辑：{editor[0]}</Author>
                        <Separator />
                      </>
                    )}
                    <Author>发表于{location}</Author>
                    {tags && (
                      <>
                        <Separator />
                        {tags.map((tag: string) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </>
                    )}
                    {/* <ReadTime>{read_time}</ReadTime> */}
                  </MetaData>
                </Content>
              </Card>
            )
          })}
        </MainContainer>
      </MainWrapper>
    </>
  )
}
