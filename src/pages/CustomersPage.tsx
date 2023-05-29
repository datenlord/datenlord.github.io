import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Header } from '@/components/Header1'
import image1Url from '@/assets/Customers/image1.svg'
import image2Url from '@/assets/Customers/image2.svg'
import image3Url from '@/assets/Customers/image3.svg'
import image4Url from '@/assets/Customers/image4.png'
import bg1Url from '@/assets/Customers/bg1.png'

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
const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  scroll-snap-align: center;
`
const ViewWrapperOdd = styled(ViewWrapper)`
  background: #d9dbef;
`
const ViewWrapperEven = styled(ViewWrapper)`
  background: #ffffff;
`
const ViewWrapperFirst = styled(ViewWrapper)`
  background-image: url(${bg1Url});
  background-size: cover;
`
const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const ViewContainerFirst = styled(ViewContainer)`
  flex-direction: column;
  text-align: center;
`
const Text = styled.div`
  font-weight: 500;
  font-size: 0.28rem;
  line-height: 1.5;
`
const FrontPageText = styled(Text)`
  padding-inline: 1.48rem;
`
const Image = styled.img`
  width: 5.5rem;
  /* height: 5.5rem; */

`
const ImageRight = styled(Image)`
  margin-left: 0.96rem;
  margin-top: 0.64rem;
`
const ImageLeft = styled(Image)`
  margin-right: 0.96rem;
  margin-bottom: 0.64rem;
`

const CustomersPage: React.FC = () => {
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
    // const viewIdArr = (viewId || '').split('-')
    // const _headerTheme = viewIdArr[viewIdArr.length - 1]
    switch (viewId) {
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
      <Header theme={headerTheme} bg="transparent" activeId="customers" />
      <ViewWrapperFirst>
        <ViewContainerFirst id="dark" className="view">
          <Image src={image4Url} />
          <Text style={{ color: '#D9DBEF' }}>
            By achieving high-speed access to data across clouds and data
            centers, DatenLord will greatly enhance the scalability of storage
            systems, simplify enterprise level IT business systems in terms of
            achieving high availability and dual-active complexity. With
            multi-clouds and multi-data centers becoming the main
            infrastructure, geo-distributed storage will be widely used in
            diversified industries, such as the Internet, finance,
            telecommunications, and energy.
          </Text>
        </ViewContainerFirst>
      </ViewWrapperFirst>
      <ViewWrapperEven>
        <ViewContainer className="view">
          <ImageLeft src={image1Url} />
          <Text>
            Cross-cloud data backup in real time, especially for key business
            applications, e.g.databases.
          </Text>
        </ViewContainer>
      </ViewWrapperEven>
      <ViewWrapperOdd>
        <ViewContainer className="view">
          <Text>
            Cross-cloud data loading, tailored for artificial intelligence, and
            big data training scenarios.
          </Text>
          <ImageRight src={image2Url} />
        </ViewContainer>
      </ViewWrapperOdd>
      <ViewWrapperEven>
        <ViewContainer className="view">
          <ImageLeft src={image3Url} />
          <Text>
            Cross-cloud application migration, especially for scenarios with
            high concurrency and business elasticity requirements, such as
            Double Eleven promotions in China.
          </Text>
        </ViewContainer>
      </ViewWrapperEven>
    </ScrollContainer>
  )
}

export default CustomersPage
