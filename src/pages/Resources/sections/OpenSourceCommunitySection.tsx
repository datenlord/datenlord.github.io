import styled from 'styled-components'

import githubIconUrl from '@/assets/github.svg'
import illustrationUrl from '@/assets/community/illustration.png'

const Text = styled.p`
  margin-block: 0;
  font-family: PingFang SC;
`
const Heading = styled(Text)`
  font-weight: 600;
  font-size: 0.64rem;
  line-height: 0.72rem;
`
const Heading3 = styled(Heading)`
  font-size: 0.3rem;
  line-height: 0.444rem;
`
const CNHead5 = styled(Heading)`
  font-size: 0.32rem;
  line-height: 0.32rem;
`
const Paragraph = styled(Text)`
  font-weight: 400;
  font-size: 0.16rem;
  line-height: 0.28rem;
`
const CNBodyLarge = styled(Paragraph)`
  font-size: 0.24rem;
  line-height: 0.32rem;
`
const CNBodySmall = styled(Paragraph)`
  font-size: 0.14rem;
  line-height: 0.2rem;
`
const TitleWrapper = styled.div`
  margin-left: -0.31rem;
  display: flex;
`
const _CNHead5 = styled(CNHead5)`
  padding-left: 0.15rem;
`
const Decoration = styled.div`
  width: 0.166rem;
  background: linear-gradient(90deg, #767ee5, #9966cc);
`

const CNHead5S: React.FC<{
  children: React.ReactNode
  extra?: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, extra, style }) => {
  return (
    <TitleWrapper style={style}>
      <Decoration />
      <_CNHead5>{children}</_CNHead5>
      {extra}
    </TitleWrapper>
  )
}

const data1 = [
  {
    key: 1,
    title: 'Contributing is Thinking and Learning',
    text: 'Open source is not merely about contributing code in Github. In DatenLord, we believe that giving is thinking and learning, and together with the received feedback from the virtual community are capable of framing trust and collaboration.',
  },
  // {
  //   key: 2,
  //   title: '在Discord上与我们对话',
  //   text: '加入我们的开发者社区，构建下一代云原生、跨云的存储系统。',
  //   link: {
  //     icon: discordIconUrl,
  //     text: 'Discord',
  //     url: 'https://discord.gg/Et7eSBgZ',
  //   },
  // },
  // {
  //   key: 3,
  //   title: '在Github中成为贡献者',
  //   text: '你在寻找源代码吗，或有一个精彩的想法想要贡献？加入我们在GitHub上的开源项目。',
  //   link: {
  //     icon: githubIconUrl,
  //     text: 'GitHub',
  //     url: 'https://github.com/datenlord',
  //   },
  // },
]

const cardData = [
  {
    key: 1,
    text: 'Hengyu Wang is a graduate student majoring in computer science. He joined the async-rdma project because it happens to fit in his academic interest on integrating software and hardware. Guided by his community mentor, he grows with the development of the project and is invited to share his practical experience on using Rust to package RDMA on several hands-on workshops.。在社区导师的指导下，他也随着项目的发展而逐步成长，并被邀请在一些实践研讨会上分享他使用Rust开发RDMA的实践经验。',
    quote:
      '“I am having unforgettable experience with the async-rdma project. The DatenLord community is friendly and my mentor is a seasoned engineer who encourages me to verify my ideas and assumptions about the project while pay attention to the engineering discipline, which shift my perspective from a student who merely focuses on running a program to a professional engineer who cares about its maintainability and stability as well. ”',
    link_text: 'GitHub ID: GTwhy',
    url: 'https://github.com/GTwhy',
  },
  {
    key: 2,
    text: 'Hongyu Li is passionate about open source community and Rust, and thus joined this particular project of DatenLord to add support for Rust to be merged in the Linux kernel. With the guidance of his community mentor, he honed his skills in Rust in the process of contributing code, writing document and replying revisions to the upstream.',
    quote:
      '“Working with the Rust for Linux project in DatenLord is rewarding. The community is friendly and interactive. I was encouraged by my mentor to seriously weigh different options to revise even a small bug and go beyond just write code, but lines of ELEGANT codes. What I acquire in the community is not only conceptual, but practical.”',
    link_text: 'GitHub ID: Richardhongyu',
    url: 'https://github.com/Richardhongyu',
  },
]

const Section = styled.section``
const TitleEN = styled.div`
  color: #d9dbef;
  font-weight: 400;
  font-family: Bodoni Bd BT serif;
  font-size: 0.67rem;
  line-height: 0.804rem;
  text-transform: capitalize;
  margin-bottom: 0.45rem;
`
const TitleZH = styled(Heading3)`
  margin-top: -0.22rem;
  padding-left: 0.16rem;
  padding-bottom: 0.71rem;
  font-family: Avenir Next sans-serif;
`
// - - -
const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 4.6rem;
  margin-bottom: 0.61rem;
`
const ContentItem = styled.div`
  padding-bottom: 0.56rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const SubTitle = styled(CNHead5S)``
const Txt = styled(CNBodyLarge)``
const Illustration = styled.img`
  float: right;
  margin-left: 1rem;
  margin-right: -0.33rem;
  margin-bottom: 0.33rem;
  width: 5rem;
`
// SubTitleExtra
const SubTitleExtraContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.64rem;
`
const SubTitleExtraIcon = styled.img`
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.14rem;
`
const SubTitleExtraText = styled.div`
  color: ${props => props.theme.themeDark};
  font-weight: 600;
  font-size: 0.255rem;
  line-height: 1;
  text-transform: capitalize;
`
// - - -
const Card = styled.div`
  padding-top: 0.38rem;
  padding-bottom: 0.46rem;
  padding-inline: 0.63rem;
  background: #ffffff78;
  border-radius: 0.18rem;
`
const CardTitle = styled(CNHead5S)``
const CardContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const CardContent = styled.div`
  width: 47%;
`
const CardText = styled(CNBodyLarge)`
  padding-bottom: 0.26rem;
`
const CardQuote = styled(CNBodySmall)`
  margin-left: -0.14rem;
  margin-bottom: 0.33rem;
  padding-inline: 0.11rem;
  border-left: 0.02rem solid;
  border-image: linear-gradient(to right, #767ee5, #9966cc) 1;
`
const CardLink = styled.div`
  display: flex;
`
const CardLinkText = styled(CNBodyLarge)`
  padding-right: 0.2rem;
  color: #7680dd;
  text-decoration-line: underline;
`
const CardLinkIcon = styled.img`
  width: 0.32rem;
  height: 0.32rem;
`

export const OpenSourceCommunity: React.FC = () => {
  return (
    <Section>
      <TitleEN>Open Source Community</TitleEN>
      {/* <TitleZH>开源社区</TitleZH> */}
      <Content>
        <Illustration src={illustrationUrl} />
        {data1.map(({ key, title, text }) => {
          return (
            <ContentItem key={key}>
              <SubTitle
                style={{ paddingBottom: '0.23rem' }}
                // extra={
                // link && (
                //   <SubTitleExtraContainer as={'a'} href={link.url}>
                //     <SubTitleExtraIcon src={link.icon} />
                //     <SubTitleExtraText>{link.text}</SubTitleExtraText>
                //   </SubTitleExtraContainer>
                // )
                // }
              >
                {title}
              </SubTitle>
              <Txt>{text}</Txt>
            </ContentItem>
          )
        })}
      </Content>
      <Card>
        <CardTitle style={{ paddingBottom: '0.39rem' }}>
          Story Spotlight
        </CardTitle>
        <CardContentContainer>
          {cardData.map(({ key, text, quote, link_text, url }) => (
            <CardContent key={key}>
              <CardText>{text}</CardText>
              <CardQuote>{quote}</CardQuote>
              <CardLink>
                <CardLinkText as={'a'} href={url}>
                  {link_text}
                </CardLinkText>
                <CardLinkIcon src={githubIconUrl} />
              </CardLink>
            </CardContent>
          ))}
        </CardContentContainer>
      </Card>
    </Section>
  )
}
