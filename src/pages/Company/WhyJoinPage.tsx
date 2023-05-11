import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header'
import icon1Url from '@/assets/Company/WhyJoin/icon1.svg'
import icon2Url from '@/assets/Company/WhyJoin/icon2.svg'
import icon3Url from '@/assets/Company/WhyJoin/icon3.svg'
import icon4Url from '@/assets/Company/WhyJoin/icon4.svg'
import icon5Url from '@/assets/Company/WhyJoin/icon5.svg'
import icon6Url from '@/assets/Company/WhyJoin/icon6.svg'
import icon7Url from '@/assets/Company/WhyJoin/icon7.png'
import icon8Url from '@/assets/Company/WhyJoin/icon8.svg'
import icon9Url from '@/assets/Company/WhyJoin/icon9.svg'
import bg1Url from '@/assets/Company/WhyJoin/bg1.png'
import bg2Url from '@/assets/Company/WhyJoin/bg2.png'
import bg3Url from '@/assets/Company/WhyJoin/bg3.png'

interface TagProps {
  type: string
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
const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
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
  /* overflow: hidden; */
`
const Title = styled.div`
  margin-bottom: 0.48rem;
  font-weight: 700;
  font-size: 0.3rem;
  line-height: 1.3;
`
const StyledTitle = styled(Title)`
  width: 100%;
  padding-left: 0.36rem;
  border-left: 0.24rem solid #7680dd;
  text-align: left;
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
  font-size: 0.15rem;
  line-height: 1.48;
  font-weight: 400;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
`
const Card1 = styled(Card)`
  background-image: url(${bg1Url});
`
const Card2 = styled(Card)`
  background-image: url(${bg2Url});
`
const Card3 = styled(Card)`
  background-image: url(${bg3Url});
`
const ContentContainer = styled.div``
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.20rem;
`
const Icon = styled.img`
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.32rem;
`
const _Icon = styled.img`
  width: 0.48rem;
  height: 0.48rem;
`
const Paragraph = styled.div`
  font-size: 0.24rem;
  line-height: 0.6rem;
`
const _CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`
const _Card = styled.div`
  width: 49%;
  min-height: 100px;
  margin-bottom: 0.32rem;
  padding-block: 0.22rem;
  padding-inline: 0.3375rem;
  background: #fff;
  border-radius: 0.14rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.13);
`
const SubTitle = styled.div`
  margin-bottom: 0.2rem;
  font-size: 0.2rem;
  line-height: 1.48;
  font-weight: 600;
`
const TagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 0.1rem;
`
const Tag = styled.div<TagProps>`
  margin-right: 0.2rem;
  padding-block: 0.02rem;
  padding-inline: 0.25rem;
  color: ${({ type }) => {
    switch (type) {
      case 'full-time':
        return '#9254de'
      case 'internship':
        return '#597ef7'
      default:
        return '#434343'
    }
  }};
  font-size: 0.16rem;
  line-height: 1.5;
  font-weight: 400;
  text-transform: capitalize;
  background: ${({ type }) => {
    switch (type) {
      case 'full-time':
        return '#f9f0ff'
      case 'internship':
        return '#f0f5ff'
      default:
        return '#fafafa'
    }
  }};
  border: 0.01rem solid
    ${({ type }) => {
      switch (type) {
        case 'full-time':
          return '#9254de'
        case 'internship':
          return '#597ef7'
        default:
          return '#434343'
      }
    }};
  border-radius: 0.08rem;
`
const Button = styled.button`
  margin-top: 0.24rem;
  padding: 0.16rem 0.64rem;
  color: #fff;
  font-size: 0.32rem;
  font-weight: 600;
  line-height: 1;
  background: #7680dd;
  border: none;
  border-radius: 0.12rem;
  box-shadow: 3px 3px 10px hsla(0, 0%, 0%, 0.5);
`

const jobDescription = [
  {
    name: 'Distributed storage software development senior engineer',
    type: ['full-time', 'urgent recruitment'],
  },
  {
    name: 'Rust distributed storage development',
    type: ['internship', 'soon to be filled'],
  },
  {
    name: 'FPGA development',
    type: ['internship'],
  },
  {
    name: 'The joint hardware and software research and development internship',
    type: ['internship'],
  },
]

const WhyJoinPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <ScrollContainer>
      <Header theme="dark" bg="transparent" activeId="company" />
      <ViewWrapperOdd>
        <ViewContainer>
          <Title>Why Join DatenLord?</Title>
          <CardContainer>
            <Card1>
              <_Icon src={icon7Url} />
              <SubTitle>Creative Working</SubTitle>
              At DatenLord, you find yourself working with talented and
              motivated people in highly creative and productive ways.
            </Card1>
            <Card2>
              <_Icon src={icon8Url} />
              <SubTitle>Sense of Belonging</SubTitle>
              DatenLord values COMMUNITY, which is not confined in referring
              open source community. We want our employees to have a sense of
              inclusion and belonging in our company.
            </Card2>
            <Card3>
              <_Icon src={icon9Url} />
              <SubTitle>Remote Working</SubTitle>
              DatenLord is focused on researching and developing geo-distributed
              storage system by a distributed team with most members working
              remotely.
            </Card3>
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
      <ViewWrapperOdd>
        <ViewContainer>
          <StyledTitle>Open Position</StyledTitle>
          <_CardContainer>
            {jobDescription.map(({ name, type }) => (
              <_Card key={name}>
                <SubTitle>{name}</SubTitle>
                <TagContainer>
                  {type.map(tag => (
                    <Tag type={tag} key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </TagContainer>
              </_Card>
            ))}
          </_CardContainer>
          <Button onClick={() => navigate('/company/join-us')}>Learn more</Button>
        </ViewContainer>
      </ViewWrapperOdd>
    </ScrollContainer>
  )
}

export default WhyJoinPage
