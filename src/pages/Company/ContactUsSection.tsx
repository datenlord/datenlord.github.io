import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import publicIconUrl from '@/assets/icons/public.svg'
import mailIconUrl from '@/assets/icons/mail.svg'
import wechatIconUrl from '@/assets/icons/wechat.svg'
import bilibiliIconUrl from '@/assets/icons/bilibili.svg'
import zhihuIconUrl from '@/assets/icons/zhihu.svg'
import weChatPublicQRcode from '@/assets/company/wechat-public-qrcode.png'
import emailQRcode from '@/assets/company/email-qrcode.png'
import weChatQRcode from '@/assets/company/wechat-qrcode.png'
import bilibiliQRcode from '@/assets/company/bilibili-qrcode.png'
import zhihuQRcode from '@/assets/company/zhihu-qrcode.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNTitleMedium } = Heading
const { CNBodySmall } = Paragraph

const SectionWrapper = styled.section`
  background: #f7f7f9;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding: 1rem 1.64rem 1.94rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 1.54rem;
  color: ${props => props.theme.themeDark02};
  text-align: center;
`
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(1, 1fr);
  justify-items: center;
`
const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const IconSection = styled.div`
  width: 100%;
  margin-bottom: 0.31rem;
  padding-top: calc(1.63rem - 1.54rem);
  padding-bottom: calc(0.4rem - 0.31rem);
  border-right: 0.01rem solid ${props => props.theme.secondary02};
  &.icon:last-of-type {
    border: none;
  }
`
const Icon = styled.img`
  display: block;
  margin-inline: auto;
  margin-bottom: 0.13rem;
  width: 0.9rem;
  height: 0.9rem;
`
const IconText = styled(CNTitleMedium)`
  text-align: center;
`
const QRCode = styled.img`
  width: 1rem;
  padding-bottom: 0.16rem;
  display: block;
`
const ContentText = styled(CNBodySmall)``

const items = [
  {
    title: '公众号',
    icon: publicIconUrl,
    qrCode: weChatPublicQRcode,
    text: '达坦科技DatenLord',
  },
  {
    title: '邮箱',
    icon: mailIconUrl,
    qrCode: emailQRcode,
    text: 'info@datenlord.com',
  },
  {
    title: '微信',
    icon: wechatIconUrl,
    qrCode: weChatQRcode,
    text: 'DatenLord小助手',
  },
  {
    title: 'B站',
    icon: bilibiliIconUrl,
    qrCode: bilibiliQRcode,
    text: '达坦科技DatenLord',
  },
  {
    title: '知乎',
    icon: zhihuIconUrl,
    qrCode: zhihuQRcode,
    text: '达坦科技DatenLord',
  },
]

export const ContactUsSection: React.FC = () => {
  return (
    <SectionWrapper id="contact-us">
      <SectionContainer>
        <SectionTitle>联系我们</SectionTitle>
        <ContentContainer>
          {items.map(({ title, icon, qrCode, text }, index) => (
            <ContentItem key={index}>
              <IconSection className="icon">
                <Icon src={icon} />
                <IconText>{title}</IconText>
              </IconSection>
              {qrCode && <QRCode src={qrCode} />}
              <ContentText>{text}</ContentText>
            </ContentItem>
          ))}
        </ContentContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}
