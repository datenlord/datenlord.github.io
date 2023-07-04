import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import cardBg1Url from '@/assets/company/card-bg1.png'
import cardBg2Url from '@/assets/company/card-bg2.png'
import cardBg3Url from '@/assets/company/card-bg3.png'

const { Heading, Paragraph } = Typography
const { CNHead5S, CNHead4 } = Heading
const { CNBodyLarge } = Paragraph

const SectionContainer = styled.section`
  padding-bottom: 0.63rem;
`
const SectionTitle = styled(CNHead5S)``
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 0.23rem;
`
const Card = styled.div<{ bg: string }>`
  padding-top: 0.79rem;
  padding-bottom: 0.9rem;
  padding-inline: 0.25rem;
  border-radius: 0.1rem;
  color: ${props => props.theme.themeDark02};
  text-align: center;
  background: #00000015;
  background-image: url(${props => props.bg});
`
const CardTitle = styled(CNHead4)`
  padding-bottom: 0.51rem;
`
const CardText = styled(CNBodyLarge)``

const items = [
  {
    title: '创造性工作',
    text: '在DatenLord，你将有机会与一群才华横溢、积极进取的人一起创造性且高效率地工作。',
    bg: cardBg1Url,
  },
  {
    title: '归属感',
    text: 'DatenLord重视社区文化不仅仅局限于开源社区，我们也希望我们的员工在这里有一种包容感和归属感。',
    bg: cardBg2Url,
  },
  {
    title: '远程工作',
    text: 'DatenLord专注于研究和开发分布式存储系统，我们是一个分布式的团队，大多数成员都可以远程工作。',
    bg: cardBg3Url,
  },
]

export const WhyChooseSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle style={{ paddingBottom: '.63rem' }}>
        为什么选择达坦科技？
      </SectionTitle>
      <CardContainer>
        {items.map(({ title, text, bg }, index) => (
          <Card key={index} bg={bg}>
            <CardTitle>{title}</CardTitle>
            <CardText>{text}</CardText>
          </Card>
        ))}
      </CardContainer>
    </SectionContainer>
  )
}
