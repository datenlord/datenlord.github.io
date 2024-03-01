import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import githubIconUrl from '@/assets/github-icon.svg'
import discordIconUrl from '@/assets/resources/discord-icon.svg'
import illustrationUrl from '@/assets/resources/illustration.png'

const { Heading, Paragraph } = Typography
const { Heading3, CNHead5S } = Heading
const { CNBodyLarge, CNBodySmall } = Paragraph

const data1 = [
  {
    key: 1,
    title: '社区—贡献意味着思考和学习',
    text: '开源不仅仅是在Github上贡献代码。在DatenLord，我们相信：贡献代码（给予）同样是一个思考和学习的过程。在不断收到开源社区反馈的过程中，我们能够构建彼此的信任与合作。我们也想借助于开源的社区平台吸引更多优秀的开发者参与到项目中来。',
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
    text: '王恒宇是一名主修计算机科学的研究生。基于在软硬件融合方面的学术兴趣，他加入了async-rdma项目。在社区导师的指导下，他也随着项目的发展而逐步成长，并被邀请在一些实践研讨会上分享他使用Rust开发RDMA的实践经验。',
    quote:
      '“我在Async-rdma项目中收获了一段难忘的经历。DatenLord社区氛围很友好，我的导师是一位经验丰富的工程师，他鼓励我在验证我对项目的想法和假设的同时也要关注工程规范。这让我的视角从一个只关注实现产品原型的学生转变为一个同时也关注产品的可维护性和稳定性的专业工程师。”',
    link_text: 'GitHub ID: GTwhy',
    url: 'https://github.com/GTwhy',
  },
  {
    key: 2,
    text: '李弘宇热衷于参与开源社区和Rust相关项目，所以参加了DatenLord的特别项目，想为Rust并入Linux内核添砖加瓦。在社区导师的指导下，他在贡献代码、编写文档和回复上游意见的过程中磨练了自己的Rust技能。',
    quote:
      '“在DatenLord中参与Rust for Linux项目的工作很有意义。这是一个友好互助的社区。即使在修改一个很小的bug时，我的导师也鼓励我认真权衡不同的选择。教导我不仅仅是要能够写出代码，更重要的是写出优雅的代码。我在社区中收获到的不仅是理论上的，更是极具实操价值的。”',
    link_text: 'GitHub ID: Richardhongyu',
    url: 'https://github.com/Richardhongyu',
  },
]

const Section = styled.section`
  padding-bottom: 1.29rem;
`
const TitleEN = styled.div`
  color: ${props => props.theme.secondary02};
  font-weight: 400;
  font-family: Bodoni Bd BT serif;
  font-size: 0.67rem;
  line-height: 0.804rem;
  text-transform: capitalize;
`
const TitleZH = styled(Heading3)`
  margin-top: -0.22rem;
  padding-left: 0.16rem;
  padding-bottom: 0.71rem;
  font-family: Avenir Next sans-serif;
`
// - - -
const Content = styled.div`
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
const Text = styled(CNBodyLarge)``
const Illustration = styled.img`
  float: right;
  margin-left: 0.33rem;
  margin-right: -0.33rem;
  margin-bottom: 0.33rem;
  width: 4.93rem;
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
  color: ${props => props.theme.gray03};
  border-left: 0.02rem solid;
  border-image: linear-gradient(to right, #767ee5, #9966cc) 1;
`
const CardLink = styled.div`
  display: flex;
`
const CardLinkText = styled(CNBodyLarge)`
  padding-right: 0.2rem;
  color: ${props => props.theme.secondary01};
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
      <TitleZH>开源社区</TitleZH>
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
              <Text>{text}</Text>
            </ContentItem>
          )
        })}
      </Content>
      <Card>
        <CardTitle style={{ paddingBottom: '0.39rem' }}>社区高光时刻</CardTitle>
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
