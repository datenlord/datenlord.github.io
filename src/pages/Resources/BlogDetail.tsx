import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '@/components/Header'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

interface SideBarItemProps {
  level: number
  isActive: boolean
}

const ViewWrapper = styled.div`
  padding-top: 128px;
  color: #42424a;
  background: #f5f5f5;
`
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-top: 32px;
  padding-inline: 128px;
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  padding-inline: 64px;
  background: #fff;
  border-radius: 12px;
`
const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
`
const Sidebar = styled.div`
  position: sticky;
  top: 128px;
  left: 0;
  padding: 32px;
  background: #ffffff;
  border-radius: 12px;
`
const SidebarItem = styled.div<SideBarItemProps>`
  display: block;
  margin-block: 16px;
  padding-left: ${({ level }) => (level === 2 ? '48px' : '16px')};
  color: ${({ isActive }) => (isActive ? '#722ed1' : 'inherit')};
  border-left: ${({ isActive }) =>
    isActive ? '8px solid #722ed1' : '8px solid transparent'};
  font-weight: 700;
  font-size: 0.28rem;
  line-height: 1.5;
  /* border-radius: 50%; */
`

const blogs = import.meta.glob('@/blogs/*/index.md')
console.log(blogs)

const BlogDetailPage: React.FC = () => {
  const { params } = useParams()
  const [data, setData] = useState<typeof import('*.md')>()
  const [activeId, setActiveId] = useState<string>('')
  useIntersectionObserver(setActiveId, data)

  useEffect(() => {
    console.log(params)
    blogs[`/src/blogs/${params}/index.md`]()
      .then(res => {
        // @ts-ignore
        setData(res)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleClick = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  console.log(data?.metadata.cover)

  return (
    <ViewWrapper>
      <Header theme="dark" />
      <ViewContainer>
        <Content
          className="content"
          dangerouslySetInnerHTML={{ __html: data?.default || '' }}
        />
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
      </ViewContainer>
    </ViewWrapper>
  )
}

export default BlogDetailPage