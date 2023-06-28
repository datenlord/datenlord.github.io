import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import IconCpuUrl from '@/assets/home/icon-cpu.svg'
import IconInboxUrl from '@/assets/home/icon-inbox.svg'
import AvatarUrl from '@/assets/resources/avatar.png'

const { Heading, Paragraph } = Typography
const { Heading3, CNHead4, CNHead5S, CNHead5 } = Heading
const { CNBodyLarge, CNMarkSmall, CNBodyMedium } = Paragraph

const cardData = [
  {
    key: 'open-source-diploma-internship',
    icon: IconCpuUrl,
    iconBg: '#FDCB6E',
    label_en: 'Open Source Diploma Internship',
    label_zh: '开源毕业设计实习',
    content: [
      {
        key: 'first',
        label:
          '体验透明开源和知识共享带来的乐趣，并在社区的反馈中获得技术成长。',
      },
      {
        key: 'second',
        label:
          '弥合学校和工业界实践的脱节和差距，系统梳理学校的知识结构，并运用到具有影响力的时间项目中。',
      },
      {
        key: 'third',
        label:
          '手把手获得行业内专家、教授、学者的点评以及前沿科研项目的合作机会。',
      },
      {
        key: 'forth',
        label:
          '在硬核的开源技术社区自我展示的机会是同学升学以及就业最佳、最强有力的背书。',
      },
    ],
  },
  {
    key: 'hardware-design-learning-community',
    icon: IconInboxUrl,
    iconBg: '#7680DD',
    label_en: 'Hardware Design Learning Community',
    label_zh: '硬件设计学习社区',
    content: [
      {
        key: 'first',
        label:
          '理解数字芯片设计的精髓，提升设计能力，是能否胜任数字芯片设计工作的关键。',
      },
      {
        key: 'second',
        label:
          '系统学习计算机体系结构相关知识，为将来走上数字芯片设计岗位打下坚实的基础。',
      },
      {
        key: 'third',
        label:
          '学习社区的课程考核以Lab实践的完成度作为标准，要求所有Lab和Project实现既定功能并通过仿真验证。',
      },
      {
        key: 'forth',
        label:
          '通过动手项目来验证学习的成果，培养出兼具理论和实操能力的数字芯片设计人才。',
      },
    ],
  },
]

const storyData = [
  {
    key: 1,
    text: '参加开源毕设项目是我人生中一段难忘的经历。在这里，我不仅提升了自己的技能，学会与团队成员协同合作，而且有机会投身于实际项目中，亲身体验如何解决实际问题，感受开源精神的力量，并且深入开源社区，与志同道合的同伴们共同探讨世界上最前沿、最具挑战性的工程问题。',
  },
  {
    key: 2,
    text: '参加开源项目的过程中，我有机会在GitHub上积累宝贵的贡献记录。每一次提交代码、每一个解决的问题都会在我的GitHub主页上清晰地呈现出来，成为我技术实力的有力证明。这不仅有助于建立我的个人品牌，还能让潜在雇主一目了然地了解我的能力和成就。',
  },
  {
    key: 3,
    text: '我还结识了我所热爱的行业的专家，拓展人脉资源，为未来的职业发展创造更多机会。我相信，在我的简历上出现丰富的开源项目经验，必将成为我未来求职过程中的一大亮点。欢迎更多的学生朋友和我一起加入开源毕设项目，让我们共同成长，开启一段精彩的技术之旅！',
  },
]

const Section = styled.section`
`
const TitleEN = styled.div`
  color: ${props => props.theme.secondary02};
  font-weight: 400;
  font-family: Bodoni Bd BT serif;
  font-size: 0.67rem;
  line-height: 0.804rem;
  text-align: right;
  text-transform: capitalize;
`
const TitleZH = styled(Heading3)`
  margin-top: -0.22rem;
  padding-left: 0.16rem;
  padding-bottom: 1.4rem;
  font-family: Avenir Next sans-serif;
  text-align: right;
`
// Card
const MainContainer = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48%;
  color: ${props => props.theme.themeDark02};
  background: #f7f7f9;
  border-radius: 0.18rem;
  padding-top: 0;
  padding-bottom: 0.75rem;
  padding-inline: 0.32rem;

  &:hover {
    background: #fff;
    border: 0.01rem solid ${props => props.theme.secondary01};
  }
`
const LabelEN = styled(CNMarkSmall)`
  color: ${props => props.theme.secondary01};
`
const LabelZH = styled(CNHead4)`
  width: 90%;
  color: #000;
  text-align: center;
  margin-bottom: 0.65rem;
  padding-bottom: 0.12rem;
  border-bottom: 0.01rem solid ${props => props.theme.secondary02};
`
const IconContainer = styled.div`
  position: relative;
  top: -0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -0.36rem;
  width: 1.56rem;
  height: 1.56rem;
`
const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const RippleItem1 = styled.div<{ bg: string }>`
  background: ${props => props.bg};
  position: absolute;
  border-radius: 50%;
  animation: opac 4s infinite;
`
const RippleItem2 = styled(RippleItem1)`
  animation-delay: 1s;
`
const RippleItem3 = styled(RippleItem1)`
  animation-delay: 2s;
`
const RippleItem4 = styled(RippleItem1)`
  animation-delay: 3s;
`
const IconWrapper = styled.div<{ bg: string }>`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.9rem;
  height: 0.9rem;
  background: ${props => props.bg};
  border-radius: 50%;
`
const Icon = styled.img`
  width: 90%;
  height: 90%;
`
const List = styled.ul`
  padding-left: 0.18rem;
`
const ListItem = styled(CNBodyLarge)``
// - - -
const SubTitle = styled(CNHead5S)``
const StoryContainer = styled.div`
  display: flex;
  align-items: center;
`
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 0.91rem;
`
const ContentContainer = styled.div``
const Avatar = styled.img`
  width: 1.8rem;
  padding-bottom: 0.22rem;
`
const Name = styled(Heading3)`
  padding-bottom: 0.06rem;
`
const School = styled(CNHead5)``
const StoryList = styled.ul`
  padding-left: 0.3rem;
`
const StoryItem = styled(CNBodyMedium)`
  padding-bottom: 0.35rem;
  &:last-child {
    padding-bottom: 0;
  }
`

export const LearnCommunitySection: React.FC = () => {
  return (
    <Section>
      <TitleEN>Learning Community</TitleEN>
      <TitleZH>学习社区</TitleZH>
      <MainContainer>
        {cardData.map(({ key, icon, iconBg, label_en, label_zh, content }) => (
          <Card key={key}>
            <IconContainer>
              <IconWrapper bg={iconBg}>
                <Icon src={icon} />
              </IconWrapper>
              <RippleContainer>
                <RippleItem1 bg={iconBg} />
                <RippleItem2 bg={iconBg} />
                <RippleItem3 bg={iconBg} />
                <RippleItem4 bg={iconBg} />
              </RippleContainer>
            </IconContainer>
            <LabelEN>{label_en}</LabelEN>
            <LabelZH>{label_zh}</LabelZH>
            <List>
              {content.map(({ key, label }) => (
                <ListItem as={'li'} key={key}>
                  {label}
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
      </MainContainer>
      <SubTitle style={{ paddingBottom: '1.42rem' }}>学生故事</SubTitle>
      <StoryContainer>
        <AvatarContainer>
          <Avatar src={AvatarUrl} />
          <Name>郑昱笙</Name>
          <School>浙江大学</School>
        </AvatarContainer>
        <ContentContainer>
          <StoryList>
            {storyData.map(({ key, text }) => (
              <StoryItem as={'li'} key={key}>
                {text}
              </StoryItem>
            ))}
          </StoryList>
        </ContentContainer>
      </StoryContainer>
    </Section>
  )
}
