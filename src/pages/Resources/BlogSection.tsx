import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'

import blogTestImageUrl from '@/assets/resources/blog-test-image.png'

const { Heading, Paragraph } = Typography
const { CNHead4, TitleLarge } = Heading
const { CNBodyMedium } = Paragraph

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
  grid-auto-flow: column;
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
  margin-bottom: 0.15rem;
  color: ${props => props.theme.gray007};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    color: #722ed1;
  }
`
const BlogDescription = styled(CNBodyMedium)`
  margin-bottom: 0.07rem;
  color: #383838;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  cursor: pointer;
`

const _blogs = import.meta.glob(`@/articles/blogs/*/index.md`)

export const BlogSection: React.FC = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<typeof import('*.md')[]>([])
  const [cover, setCover] = useState<string>('')

  const getBlogs = async () => {
    const blogs = (await Promise.all(
      Object.keys(_blogs).map(path => _blogs[path]()),
    )) as typeof import('*.md')[]
    setBlogs(blogs.reverse())
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    setCover(blogs[0]?.assetURLs[0] || blogTestImageUrl)
  }, [blogs])

  return (
    <SectionWrapper id="blog">
      <SectionContainer>
        <Title>技术博客</Title>
        <MainContainer>
          <ContentContainer>
            <Image src={cover} />
            {blogs.map(({ metadata }, index) => {
              const { title, date, label, description } = metadata
              return (
                index < 4 && (
                  <BlogItem key={title}>
                    <BlogTitle
                      onClick={() => {
                        navigate(`/blogs/${date}-${title.split(' ').join('-')}`)
                      }}
                    >
                      {label}
                    </BlogTitle>
                    <BlogDescription>{description}</BlogDescription>
                  </BlogItem>
                )
              )
            })}
          </ContentContainer>
          <Button onClick={() => navigate('/blogs')}>了解更多</Button>
        </MainContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}
