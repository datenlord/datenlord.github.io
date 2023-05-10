import styled from 'styled-components'
import { Header } from '@/components/Header'
import image1Url from '@/assets/Customers/image1.svg'
import image2Url from '@/assets/Customers/image2.svg'
import image3Url from '@/assets/Customers/image3.svg'
import image4Url from '@/assets/Customers/image4.png'

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
`
const ImageLeft = styled(Image)`
  margin-right: 0.96rem;
`

const CustomersPage: React.FC = () => {
  return (
    <ScrollContainer>
      <Header theme="dark" bg="transparent" activeId="customers" />
      <ViewWrapperOdd>
        <ViewContainer>
          <Text>
            By achieving high-speed access to data across clouds and data
            centers, DatenLord will greatly enhance the scalability of storage
            systems, simplify enterprise level IT business systems in terms of
            achieving high availability and dual-active complexity. With
            multi-clouds and multi-data centers becoming the main
            infrastructure, geo-distributed storage will be widely used in
            diversified industries, such as the Internet, finance,
            telecommunications, and energy.
          </Text>
          <ImageRight src={image4Url} />
        </ViewContainer>
      </ViewWrapperOdd>
      <ViewWrapperEven>
        <ViewContainer>
          <ImageLeft src={image1Url} />
          <Text>
            Cross-cloud data backup in real time, especially for key business
            applications, e.g.databases.
          </Text>
        </ViewContainer>
      </ViewWrapperEven>
      <ViewWrapperOdd>
        <ViewContainer>
          <Text>
            Cross-cloud data loading, tailored for artificial intelligence, and
            big data training scenarios.
          </Text>
          <ImageRight src={image2Url} />
        </ViewContainer>
      </ViewWrapperOdd>
      <ViewWrapperEven>
        <ViewContainer>
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
