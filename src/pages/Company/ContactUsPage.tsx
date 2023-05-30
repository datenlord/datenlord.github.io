import styled from 'styled-components'
import { Header } from '@/components/Header1'
import weChatQRUrl from '@/assets/Company/ContactUs/wechat-QR.svg'
import icon1Url from '@/assets/Company/ContactUs/icon1.svg'

const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
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
  justify-content: space-around;
  width: 100%;
  padding-inline: 0.64rem;
  font-weight: 400;
  font-size: 0.2rem;
  line-height: 1.2;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
const Card = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-inline: 0.28rem;
  padding-block: 0.85rem;
  padding-inline: 0.35rem;
  border-radius: 0.2rem;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-bottom: 0.64rem;
  }
`
const Icon = styled.img`
  width: 1.24rem;
  height: 1.24rem;
  margin-right: 0.32rem;
`
const Paragraph = styled.div`
  font-weight: 500;
  font-size: 0.24rem;
  line-height: 0.35rem;
`

const ContactUsPage: React.FC = () => {
  return (
    <ViewWrapper>
      <Header theme="dark" activeId="company" />
      <ViewContainer>
        <Title>Contact Us</Title>
        <CardContainer>
          <Card>
            <Icon src={weChatQRUrl} />
            <Paragraph>
              Please follow our WeChat official account for more information
            </Paragraph>
          </Card>
          <Card>
            <Icon src={icon1Url} />
            <Paragraph>
              Please contact us through our email: info@datenlord.com
            </Paragraph>
          </Card>
        </CardContainer>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default ContactUsPage
