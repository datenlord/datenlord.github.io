import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface SideBarItemProps {
  level: number
  isActive: boolean
}

const ViewWrapper = styled.div``
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 0.64rem;
  padding-inline: 1.22rem;
  padding-top: 1.2rem;
`
const Content = styled.div`
  flex-grow: 1;
  padding-inline: 0.64rem;
  background: #fff;
  border-radius: 0.08rem;
`
const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
`
const Sidebar = styled.div`
  position: sticky;
  top: 1.2rem;
  left: 0;
  padding: 0.32rem;
  background: #ffffff;
  border-radius: 0.08rem;
`
const SidebarItem = styled.div<SideBarItemProps>`
  display: block;
  margin-block: 0.16rem;
  padding-left: ${({ level }) => (level === 3 ? '48px' : '16px')};
  color: ${({ isActive }) => (isActive ? '#722ed1' : 'inherit')};
  border-left: ${({ isActive }) =>
    isActive ? '8px solid #722ed1' : '8px solid transparent'};
  font-weight: 700;
  font-size: 0.18rem;
  line-height: 1.5;
  cursor: pointer;
`

const blogs = import.meta.glob('@/articles/blogs/*/index.md')
const events = import.meta.glob(`@/articles/events/*/index.md`)
const highlights = import.meta.glob(`@/articles/highlights/*/index.md`)
const newsHonorDynamic = import.meta.glob(
  `@/articles/news-honor-dynamic/*/index.md`,
)

export default () => {
  const { section, title } = useParams()
  const [data, setData] = useState<typeof import('*.md')>()
  const [activeId, setActiveId] = useState<string>('')
  useIntersectionObserver(setActiveId, data)

  const getContent = async () => {
    console.log(`/src/articles/${section}/${title}/index.md`)

    const getData = async () => {
      switch (section) {
        case 'blogs':
          return (await blogs[
            `/src/articles/${section}/${title}/index.md`
          ]()) as typeof import('*.md')
        case 'events':
          return (await events[
            `/src/articles/${section}/${title}/index.md`
          ]()) as typeof import('*.md')
        case 'highlights':
          return (await highlights[
            `/src/articles/${section}/${title}/index.md`
          ]()) as typeof import('*.md')
        case 'news-honor-dynamic':
          return (await newsHonorDynamic[
            `/src/articles/${section}/${title}/index.md`
          ]()) as typeof import('*.md')
      }
    }

    const _data = await getData()

    setData(_data)
  }

  useEffect(() => {
    console.log(data)
  }, [])

  useEffect(() => {
    getContent()
    window.scrollTo(0, 0)
  }, [])

  const handleClick = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({
      // behavior: 'smooth',
    })
  }

  return (
    <ViewWrapper>
      <ViewContainer>
        {data?.toc.length !== 0 && (
          <SidebarContainer>
            <Sidebar>
              {(data?.toc || []).map(({ label, level }) => {
                const id = label.split(' ').join('-').toLowerCase()
                return (
                  <SidebarItem
                    key={label}
                    level={level}
                    isActive={activeId === id}
                    onClick={() => handleClick(id)}
                  >
                    {label}
                  </SidebarItem>
                )
              })}
            </Sidebar>
          </SidebarContainer>
        )}
        <Content
          className="content"
          dangerouslySetInnerHTML={{ __html: data?.default || '' }}
        />
      </ViewContainer>
    </ViewWrapper>
  )
}
