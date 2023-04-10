import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

interface SideBarItemProps {
  level: number
  isActive: boolean
}

const PageWrapper = styled.div`
  background: #f5f5f5;
`
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background: #ffffff;
`
const PageContainer = styled.main`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  margin-top: 64px;
  padding-inline: 64px;
  padding-block: 24px;
`
const Content = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  padding: 64px;
  background: #ffffff;
`
const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
`
const Placeholder = styled.div`
  height: 200px;
  margin-bottom: 24px;
  background: lightpink;
`
const Sidebar = styled.div`
  position: sticky;
  top: calc(64px + 24px);
  left: 0;
  padding: 32px;
  background: #ffffff;
`
const SidebarItem = styled.div<SideBarItemProps>`
  display: block;
  padding-left: ${({ level }) => (level === 2 ? '16px' : '0')};
  color: ${({ isActive }) => (isActive ? 'red' : 'blue')};
  line-height: 2;
`

const TOC: React.FC = () => {
  const [data, setData] = useState<typeof import('*.md')>()
  const [activeId, setActiveId] = useState<string>('')
  useIntersectionObserver(setActiveId, data)

  useEffect(() => {
    import('./test.md')
      .then(res => {
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

  return (
    <PageWrapper>
      <Header />
      <PageContainer>
        <Content
          className="content"
          dangerouslySetInnerHTML={{ __html: data?.default || '' }}
        />
        <SidebarContainer>
          <Placeholder />
          <Placeholder />
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
      </PageContainer>
    </PageWrapper>
  )
}

export default TOC
