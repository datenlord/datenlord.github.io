import styled from 'styled-components'
import { Header } from '@/components/Header'
import icon1Url from '@/assets/Company/WhyJoin/icon1.svg'
import icon2Url from '@/assets/Company/WhyJoin/icon2.svg'
import icon3Url from '@/assets/Company/WhyJoin/icon3.svg'
import icon4Url from '@/assets/Company/WhyJoin/icon4.svg'
import icon5Url from '@/assets/Company/WhyJoin/icon5.svg'
import icon6Url from '@/assets/Company/WhyJoin/icon6.svg'

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
  padding-top: 128px;
  color: #42424a;
  scroll-snap-align: center;
`
const ViewWrapperOdd = styled(ViewWrapper)`
  background: #ffffff;
`
const ViewWrapperEven = styled(ViewWrapper)`
  background: #d9dbef;
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
  overflow: hidden;
`
const Title = styled.div`
  margin-bottom: 0.84rem;
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 1.5;
`
const CardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  font-weight: 400;
  font-size: 0.2rem;
  line-height: 1.2;
`
const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 33%;
  height: 100%;
  margin-inline: 0.28rem;
  padding-block: 0.85rem;
  padding-inline: 0.35rem;
  border-radius: 0.2rem;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
`
const ContentContainer = styled.div``
const ListItem = styled.div`
  display: flex;
  margin-bottom: 0.36rem;
`
const Icon = styled.img`
  width: 0.64rem;
  height: 0.64rem;
  margin-right: 0.32rem;
`
const Paragraph = styled.div`
  font-size: 0.32rem;
  line-height: 0.6rem;
`

const WhyJoinPage: React.FC = () => {
  return (
    <ScrollContainer>
      <Header theme="dark" />
      <ViewWrapperOdd>
        <ViewContainer>
          <Title>Why Join DatenLord?</Title>
          <CardContainer>
            <Card>
              At DatenLord, you find yourself working with talented and
              motivated people in highly creative and productive ways.
            </Card>
            <Card>
              DatenLord values COMMUNITY, which is not confined in referring
              open source community. We want our employees to have a sense of
              inclusion and belonging in our company.
            </Card>
            <Card>
              DatenLord is focused on researching and developing geo-distributed
              storage system by a distributed team with most members working
              remotely.
            </Card>
          </CardContainer>
        </ViewContainer>
      </ViewWrapperOdd>
      <ViewWrapperEven>
        <ViewContainer>
          <Title>Who Are We Looking For?</Title>
          <ContentContainer>
            <ListItem>
              <Icon src={icon1Url} />
              <Paragraph>
                Keep an acumen on latest technical development in the industry
              </Paragraph>
            </ListItem>
            <ListItem>
              <Icon src={icon2Url} />
              <Paragraph>
                Passionate to do something meaningful in creative ways
              </Paragraph>
            </ListItem>
            <ListItem>
              <Icon src={icon3Url} />
              <Paragraph>
                Be curious and cultivated sound learning habits and methods
              </Paragraph>
            </ListItem>
            <ListItem>
              <Icon src={icon4Url} />
              <Paragraph>
                Love to share knowledge openly and deliberately
              </Paragraph>
            </ListItem>
            <ListItem>
              <Icon src={icon5Url} />
              <Paragraph>Communicate candidly and directly</Paragraph>
            </ListItem>
            <ListItem>
              <Icon src={icon6Url} />
              <Paragraph>Always start from the end</Paragraph>
            </ListItem>
          </ContentContainer>
        </ViewContainer>
      </ViewWrapperEven>
    </ScrollContainer>
  )
}

export default WhyJoinPage
