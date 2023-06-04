import styled from 'styled-components'
import { Header } from '@/components/Header1'
import logoUrl from '@/assets/Company/WhyBuild/logo.svg'
import icon1Url from '@/assets/Company/WhyBuild/icon1.svg'
import icon2Url from '@/assets/Company/WhyBuild/icon2.svg'
import icon3Url from '@/assets/Company/WhyBuild/icon3.svg'
import icon4Url from '@/assets/Company/WhyBuild/icon4.svg'

const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 53px;
  }
`
const ViewContainer = styled.div`
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    padding-block: 48px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 32px;
    padding-inline: 64px;
  }
  @media screen and (max-width: 425px) {
    padding-block: 16px;
    padding-inline: 32px;
  }
`
const Section = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 64px;
  @media screen and (max-width: 1024px) {
    padding-top: 48px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 32px;
  }
`
const Overview = styled(Section)`
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`
const VisionAndMission = styled(Section)`
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const Value = styled(Section)`
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const ValueContainer = styled.div``
const Content = styled.div`
  width: 100%;
`
const Logo = styled.img`
  width: 300px;
  margin: 64px;
  margin-bottom: 0;

  @media screen and (max-width: 1200px) {
    width: 80%;
    margin: 48px;
    margin-bottom: 0;
  }
  @media screen and (max-width: 768px) {
    margin: 32px;
    margin-bottom: 0;
  }
`
const Heading1 = styled.div`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 15px;
  }
`
const StyleHeading1 = styled(Heading1)`
  padding-left: 24px;
  border-left: 24px solid #7680dd;
  margin-bottom: 48px;
  @media screen and (max-width: 1024px) {
    padding-left: 18px;
    border-width: 18px;
    margin-bottom: 36px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 12px;
    border-width: 12px;
    margin-bottom: 24px;
  }
`
const Heading2 = styled.div`
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 22.5px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 18px;
    font-size: 16.875px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 12px;
    font-size: 11.25px;
  }
`
const ValueHeading2 = styled(Heading2)`
  margin-bottom: 16px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`
const StyledHeading2 = styled(Heading2)`
  padding-left: 16px;
  border-left: 20px solid #7680dd;
  @media screen and (max-width: 1024px) {
    padding-left: 12px;
    border-width: 15px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 8px;
    border-width: 10px;
  }
`
const Paragraph1 = styled.div`
  font-weight: 400;
  font-size: 19.5px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`
const Paragraph2 = styled.div`
  font-weight: 400%;
  font-size: 13.5px;
  line-height: 1.6;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`
const Card = styled.div`
  width: 48%;
  align-self: stretch;
  padding: 32px;
  background: #d9dbef;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 24px;
    border-radius: 18px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    padding-top: 16px;
  }
`
const ValueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`
const Icon = styled.img`
  margin-right: 24px;
  width: 96px;
  height: 96px;
  @media screen and (max-width: 1024px) {
    margin-right: 18px;
    width: 72px;
    height: 72px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 12px;
    width: 48px;
    height: 48px;
  }
`
const ValueContent = styled.div``

const WhyBuildPage: React.FC = () => {
  return (
    <ViewWrapper>
      <Header theme="dark" activeId="company" />
      <ViewContainer>
        <Overview>
          <Content>
            <Heading1>Why build DatenLord ?</Heading1>
            <Paragraph1>
              Datenlord started in 2021 with four seasoned infrastructure
              engineers who were not satisfied to see the way cloud computing
              and storage are isolated, and data are fragmented and cannot be
              used effectively and efficiently, and thus decided to improve the
              performance of storage devices and data transmission across clouds
              by leveraging non-blocking/asynchronous IO, asynchronized
              programming, NVMe, non-volatile memory and hardware acceleration
              in an open source way.
            </Paragraph1>
          </Content>
          <Logo src={logoUrl} />
        </Overview>
        <VisionAndMission>
          <Card>
            <StyledHeading2>Vision</StyledHeading2>
            <Paragraph1>
              Empower enterprises to read, write and retrieve data across
              multiple clouds world-wide with high performance and security.
            </Paragraph1>
          </Card>
          <Card>
            <StyledHeading2>Mission</StyledHeading2>
            <Paragraph1>
              Breaking barriers across clouds by using Datenlord Geo-distributed
              storage system.
            </Paragraph1>
          </Card>
        </VisionAndMission>
        <ValueContainer>
          <StyleHeading1>Value</StyleHeading1>
          <Value>
            <ValueItem>
              <Icon src={icon1Url} />
              <ValueContent>
                <ValueHeading2>Be Open and Transparent</ValueHeading2>
                <Paragraph2>
                  We endeavor to keep information and decision process
                  transparent, so as to create an inclusive community that every
                  member feels safe and confident to contribute different
                  opinions and diversified perspectives. We believe constructive
                  conflicts lead to reflections and improvements.
                </Paragraph2>
              </ValueContent>
            </ValueItem>
            <ValueItem>
              <Icon src={icon2Url} />
              <ValueContent>
                <ValueHeading2>Dare to be Vanguards</ValueHeading2>
                <Paragraph2>
                  We are a group of people who have growth mindset. We take no
                  shortcuts and believe slow is fast. We aim to be pioneer and
                  dare to be different and set out own pattern, thus we tolerate
                  mistakes, and are confident that we can make adjustment and
                  refinement quickly and continuously.
                </Paragraph2>
              </ValueContent>
            </ValueItem>
            <ValueItem>
              <Icon src={icon3Url} />
              <ValueContent>
                <ValueHeading2>Keep Delivering with Excellence</ValueHeading2>
                <Paragraph2>
                  We believe results are as important as process. We are goal
                  oriented, setting high bars, and working hard and smart to
                  attain them. We stive to get results by focusing on the
                  actions and changes that influence results.
                </Paragraph2>
              </ValueContent>
            </ValueItem>
            <ValueItem>
              <Icon src={icon4Url} />
              <ValueContent>
                <ValueHeading2>
                  Concentrate on Small and Manageable Steps
                </ValueHeading2>
                <Paragraph2>
                  A big milestone worth celebrating, while small steps matter as
                  well. We believe small steps taken in the right direction can
                  cross unimaginable distances. It is to our own detriment that
                  we underestimate the might of daily minor progress.
                </Paragraph2>
              </ValueContent>
            </ValueItem>
          </Value>
        </ValueContainer>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default WhyBuildPage
