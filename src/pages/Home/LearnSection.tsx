import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import IconCpuUrl from '@/assets/home/icon-cpu.svg'
import IconInboxUrl from '@/assets/home/icon-inbox.svg'

const { Heading, Paragraph } = Typography
const { CNHead4 } = Heading
const { CNBodyLarge, CNMarkSmall } = Paragraph

const SectionWrapper = styled.section`
  background: #fff;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.87rem;
  padding-top: 1rem;
  padding-bottom: 1.4rem;
`
const Title = styled(CNHead4)`
  text-align: center;
  padding-bottom: 1.6rem;
`
const MainContainer = styled.div`
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
  padding-bottom: 0.48rem;
  padding-inline: 0.32rem;

  &:hover {
    background: #fff;
    border: 0.01rem solid ${props => props.theme.secondary01}
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
  cursor: pointer;
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
const ListBtn = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.18rem;
  color: #9966CC;
  border: 1px solid #9966CC;
  border-radius: 0.16rem;
  padding-block: 0.04rem;
  margin-top: 0.18rem;
`

const Data = [
  {
    key: 'hardware-design-learning-community',
    icon: IconInboxUrl,
    iconBg: '#7680DD',
    label_en: 'Hardware Design Learning Community',
    label_zh: '硬件设计学习社区',
    url: 'mit',
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
  {
    key: 'open-source-diploma-internship',
    icon: IconCpuUrl,
    iconBg: '#FDCB6E',
    label_en: 'Open Source Project Internship',
    label_zh: '开源毕业设计',
    url: '',
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
]

export const LearnSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <SectionWrapper>
      <SectionContainer>
        <Title>学习社区</Title>
        <MainContainer>
          {Data.map(({ key, icon, iconBg, label_en, label_zh, url, content }) => (
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
              {url && <ListBtn onClick={() => navigate(url)}>了解详情</ListBtn>}
            </Card>
          ))}
        </MainContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}
