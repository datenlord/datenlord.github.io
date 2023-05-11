import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Header } from '@/components/Header'
import background1Url from '@/assets/Products/background1.svg'
import icon1Url from '@/assets/Products/icon1.svg'
import icon2Url from '@/assets/Products/icon2.svg'
import icon3Url from '@/assets/Products/icon3.svg'
import icon4Url from '@/assets/Products/icon4.svg'
import cover2Url from '@/assets/Home/cover2.svg'

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
  scroll-snap-align: center;
`
const ViewWrapperFirst = styled(ViewWrapper)`
  color: white;
  background-image: url(${background1Url});
  background-size: cover;
`
const ViewWrapperSecond = styled(ViewWrapper)`
  color: black;
  background: #d9dbef;
`
const ViewWrapperThird = styled(ViewWrapper)`
  color: black;
  background: #fff;
`
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  padding-bottom: 0.64rem;
  padding-inline: 0.96rem;
  /* overflow: hidden; */
`
const Title = styled.div`
  font-weight: 700;
  font-size: 0.3rem;
  line-height: 1.5;
`
const FrontPageTitle = styled(Title)`
  margin-bottom: 0.24rem;
`
const BasicTitle = styled(Title)`
  margin-bottom: 0.24rem;
`
const Description = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 0.22rem;
  line-height: 1.3;
`
const FrontViewDescription = styled(Description)`
  margin-bottom: 0.32rem;
  padding-bottom: 0.48rem;
  border-bottom: 0.02rem solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
`
const BasicDescription = styled(Description)`
  margin-bottom: 0.32rem;
`
const Paragraph = styled.div`
  font-weight: 400px;
  font-size: 0.2rem;
  line-height: 1.5;
`
const FrontPageParagraph = styled(Paragraph)`
  margin-bottom: 0.32rem;
`
const BasicParagraph = styled(Paragraph)`
  margin-bottom: 0.24rem;
`
const CardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
`
const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 3rem;
  height: 100%;
  margin-inline: 0.32rem;
  padding: 0.32rem;
  background: #ffffff14;
  border: 0.01rem solid white;
  border-radius: 0.12rem;
`
const Icon = styled.img`
  width: 0.9rem;
  height: 0.9rem;
  margin-bottom: 0.32rem;
`
const Text = styled.div`
  font-weight: 400;
  font-size: 0.18rem;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
`
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Image = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`
const ImageRight = styled(Image)`
  margin-left: 0.64rem;
`
const ImageLeft = styled(Image)`
  margin-right: 0.64rem;
`

const ProductsPage: React.FC = () => {
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
      <Header theme={headerTheme} bg="transparent" activeId="products" />
      <ViewWrapperFirst>
        <ViewContainer id="first-page-dark" className="view">
          <FrontPageTitle>Async-RDMA</FrontPageTitle>
          <FrontViewDescription>
            Async-RDMA is a framework that provides high-level abstractions and
            Asynchronous APIs for writing Remote Direct Memory Access (RDMA)
            applications.
          </FrontViewDescription>
          <FrontPageParagraph>
            RDMA enables direct access to memory from one machine to another.
            This can boost the performance of applications that require low
            latency and high throughput. RDMA supports kernel bypass and
            zero-copy, without involving the CPU. However, writing RDMA
            applications with low-level C libraries is often difficult and
            error-prone. To make things easier, we developed Async-RDMA, which
            provides easy-to-use APIs that hide the complexity of underlying
            RDMA operations. With Async-RDMA, most RDMA operations can be
            completed with just one line of code. It provides the following main
            features:
          </FrontPageParagraph>
          <CardContainer>
            <Card>
              <Icon src={icon1Url} />
              <Text>
                Tools for establishing connections with RDMA endpoints.
              </Text>
            </Card>
            <Card>
              <Icon src={icon2Url} />
              <Text>
                High-level Asynchronous APIs for transmitting data between
                endpoints.
              </Text>
            </Card>
            <Card>
              <Icon src={icon3Url} />
              <Text>High-level APIs for managing RDMA memory regions.</Text>
            </Card>
            <Card>
              <Icon src={icon4Url} />
              <Text>
                A framework that works behind the scenes to manage memory
                regions and execute RDMA requests Asynchronously.
              </Text>
            </Card>
          </CardContainer>
        </ViewContainer>
      </ViewWrapperFirst>
      <ViewWrapperSecond>
        <ViewContainer id="second-page-light" className="view">
          <BasicTitle>RoCE-Sim</BasicTitle>
          <BasicDescription>
            RoCE-Sim is an RoCE v2 simulator, a software written in Python that
            simulates the behavior of the RoCE v2 protocol.
          </BasicDescription>
          <ContentContainer>
            <TextContainer>
              <BasicParagraph>
                RoCE v2 (RDMA over Converged Ethernet version 2) is a networking
                protocol that enables Remote Direct Memory Access (RDMA) over
                Ethernet networks. It is an improvement over the original RoCE
                standard and provides a more efficient and scalable way of
                performing RDMA over Ethernet.
              </BasicParagraph>
              <BasicParagraph>
                RoCE-Sim simulates the data processing flow of the RoCE v2
                protocol, which can be used for end-to-end verification of
                devices supporting the RoCE v2 protocol. The simulator can
                flexibly simulate various correct and incorrect RDMA request and
                response packets, and analyze the response data of the device to
                determine whether it meets the protocol requirements.
              </BasicParagraph>
              <BasicParagraph>
                The simulator integrates a test framework, and developers only
                need to write configuration files to control the simulator to
                generate, send, receive, and check packets, thereby efficiently
                completing end-to-end verification work.
              </BasicParagraph>
            </TextContainer>
            <ImageRight src={cover2Url} />
          </ContentContainer>
        </ViewContainer>
      </ViewWrapperSecond>
      <ViewWrapperThird>
        <ViewContainer id="third-page-light" className="view">
          <BasicTitle>Open-RDMA</BasicTitle>
          <BasicDescription>
            Open-RDMA is an RoCE v2 hardware implementation using Spinal HDL.
          </BasicDescription>
          <ContentContainer>
            <ImageLeft src={cover2Url} />
            <TextContainer>
              <BasicParagraph>
                RoCE v2 (RDMA over Converged Ethernet version 2) is a networking
                protocol that enables Remote Direct Memory Access (RDMA) over
                Ethernet networks. It is an improvement over the original RoCE
                standard and provides a more efficient and scalable way of
                performing RDMA over Ethernet.
              </BasicParagraph>
              <BasicParagraph>
                Open-RDMA is an open-source implementation of RoCEv2 that
                utilizes agile development and validation methods, as well as a
                hardware and software co-design approach. We use Spinal HDL and
                Bluespec SystemVerilog to implement RoCEv2, taking advantage of
                their high-level abstractions to improve development efficiency
                and reduce bug rates. We also use Cocotb (a Python verification
                framework) for efficient verification.
              </BasicParagraph>
              <BasicParagraph>
                Currently, we have implemented the basic framework of the
                protocol and plan to implement enhancements such as priority
                flow control, congestion control, and support for multicast
                traffic, making it more suitable for large-scale data center
                environments. Additionally, we are exploring the use of formal
                methods to verify our implementation.
              </BasicParagraph>
            </TextContainer>
          </ContentContainer>
        </ViewContainer>
      </ViewWrapperThird>
    </ScrollContainer>
  )
}

export default ProductsPage
