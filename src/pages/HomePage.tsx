import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/Header'
import cover1Url from '@/assets/Home/cover1.svg'
import cover2Url from '@/assets/Home/cover2.svg'
import cover3Url from '@/assets/Home/cover3.svg'
import cover4Url from '@/assets/Home/cover4.svg'
import cover5Url from '@/assets/Home/cover5.svg'

const view: ViewProps[] = [
  {
    id: 'first-page',
    layout: 'row',
    theme: 'dark',
    cover: cover1Url,
    title: 'High Performance Geo-Distributed Storage',
    description:
      'DatenLord aims to break cloud barrier by deeply integrating hardware and software to build a unified storage-access mechanism to provide high-performance and secure storage support for applications across clouds.',
    bgcolor: 'hsl(250, 68%, 7%)',
  },
  {
    id: 'second-page',
    layout: 'col',
    theme: 'light',
    cover: cover2Url,
    title: 'Unified and High Performance Data Access Across Clouds',
    description:
      'A unified data access service across clouds assisted by high performance cache and effective network technology',
    bgcolor: 'hsl(235, 41%, 89%)',
    url: 'www.example.com',
  },
  {
    id: 'third-page',
    layout: 'row-reverse',
    theme: 'light',
    cover: cover3Url,
    title: 'Geo-Distributed Metadata Management',
    description:
      'The first industrial geo-distributed metadata management guarantees high-speed and strong consistency in WAN scenarios',
    bgcolor: 'hsl(0, 0%, 100%)',
    url: 'www.example.com',
  },
  {
    id: 'forth-page',
    layout: 'row',
    theme: 'light',
    cover: cover4Url,
    title: 'Hardware Acceleration For Storage Network',
    description: 'Adoption of RDMA and DPDK to build high performance network',
    bgcolor: 'hsl(235, 41%, 89%)',
    url: 'www.example.com',
  },
  {
    id: 'fifth-page',
    layout: 'row-reverse',
    theme: 'light',
    cover: cover5Url,
    title: 'Believe in the Power of Open Source',
    description:
      'Attract global talents from open source communities related to distributed system, Linux kernel, open source hardware and more',
    bgcolor: 'hsl(0, 0%, 100%)',
    url: 'www.example.com',
  },
]

interface ViewStyleProps {
  myTheme: string
  backgroundColor: string
}

interface ViewProps {
  id: string
  layout: 'row' | 'row-reverse' | 'col'
  theme: string
  cover: string
  title: string
  description: string
  bgcolor: string
  url?: string
}

interface LayoutProps {
  layout: 'row' | 'row-reverse' | 'col'
}

const ScrollContainer = styled.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
`
const ViewWrapper = styled.div<ViewStyleProps>`
  height: 100vh;
  padding-top: 128px;
  color: ${({ myTheme }) => (myTheme === 'dark' ? 'white' : 'black')};
  background: ${({ backgroundColor }) => backgroundColor};
  scroll-snap-align: center;
`
const ViewContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: ${({ layout }) => {
    switch (layout) {
      case 'row':
        return 'row'
      case 'row-reverse':
        return 'row-reverse'
      case 'col':
        return 'column'
      default:
        return 'row'
    }
  }};
  justify-content: ${({ layout }) =>
    layout === 'row' || layout === 'row-reverse' ? 'center' : 'start'};
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding: 0.64rem;
  padding-bottom: calc(0.64rem + 5%);
`
const Cover = styled.img<LayoutProps>`
  height: 5rem;
  width: 5rem;
  margin-left: ${({ layout }) => (layout === 'row-reverse' ? '0.64rem' : 0)};
  margin-right: ${({ layout }) => (layout === 'row' ? '0.64rem' : 0)};
  margin-bottom: ${({ layout }) => (layout === 'col' ? '0.32rem' : 0)};
`
const Content = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  text-align: ${({ layout }) => (layout === 'row' ? 'left' : 'right')};
`
const Title = styled.div<LayoutProps>`
  margin-bottom: 0.32rem;
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 1.5;
  text-align: ${({ layout }) => (layout === 'col' ? 'center' : 'inherit')};
`
const Description = styled.div<LayoutProps>`
  min-width: 7.5rem;
  margin-bottom: 0.24rem;
  font-weight: 400;
  font-size: 0.26rem;
  line-height: 1.3;
  text-align: ${({ layout }) => (layout === 'col' ? 'center' : 'inherit')};
  max-width: ${({ layout }) => (layout === 'col' ? '896px' : '100%')};
`
const Button = styled.div<LayoutProps>`
  width: fit-content;
  margin-left: ${({ layout }) => (layout === 'row-reverse' ? 'auto' : '0')};
  padding: 0.12rem 0.48rem;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  color: white;
  font-weight: 400;
  font-size: 0.26rem;
  line-height: 0.4rem;
  border-radius: 0.32rem;
  cursor: pointer;
`

const View: React.FC<ViewProps> = ({
  id,
  layout,
  theme,
  bgcolor,
  cover,
  title,
  description,
  url,
}) => {
  return (
    <ViewWrapper myTheme={theme} backgroundColor={bgcolor}>
      {layout === 'row' || layout === 'row-reverse' ? (
        <ViewContainer id={`${id}-${theme}`} className="view" layout={layout}>
          <Cover src={cover} alt="cover" layout={layout} />
          <Content layout={layout}>
            <Title layout={layout}>{title}</Title>
            <Description layout={layout}>{description}</Description>
            {url && <Button layout={layout}>Learn more {'>'}</Button>}
          </Content>
        </ViewContainer>
      ) : (
        <ViewContainer id={`${id}-${theme}`} className="view" layout={layout}>
          <Title layout={layout}>{title}</Title>
          <Description layout={layout}>{description}</Description>
          <Cover src={cover} alt="cover" layout={layout} />
          {url && <Button layout={layout}>Learn more {'>'}</Button>}
        </ViewContainer>
      )}
    </ViewWrapper>
  )
}

const HomePage: React.FC = () => {
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('dark')
  const viewElementsRef = useRef<{
    [propName: string]: IntersectionObserverEntry
  }>({})

  useEffect(() => {
    const callback = (views: IntersectionObserverEntry[]) => {
      /**
       *  使用 useRef hook 存储被观察对象
       */
      viewElementsRef.current = views.reduce((map, viewElement) => {
        map[viewElement.target.id] = viewElement
        return map
      }, viewElementsRef.current)
      /**
       *  获得所有可见标题列表
       */
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(viewElementsRef.current).forEach(key => {
        const headingElement = viewElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
        getHeaderTheme(visibleHeadings[0]?.target.id)
      })
    }
    const option = {
      rootMargin: '-40% 0px -40% 0px',
    }
    const observer = new IntersectionObserver(callback, option)
    const headingElements = Array.from(document.querySelectorAll('.view'))
    headingElements.forEach(element => observer.observe(element))
  }, [])

  const getHeaderTheme = (viewId: string) => {
    const viewIdArr = (viewId || '').split('-')
    const _headerTheme = viewIdArr[viewIdArr.length - 1]
    switch (_headerTheme) {
      case 'dark':
        setHeaderTheme('light')
        break
      case 'light':
        setHeaderTheme('dark')
        break
      default:
        setHeaderTheme('dark')
        break
    }
  }

  return (
    <ScrollContainer>
      <Header theme={headerTheme} />
      {view.map(props => (
        <View key={props.id} {...props} />
      ))}
    </ScrollContainer>
  )
}

export default HomePage
