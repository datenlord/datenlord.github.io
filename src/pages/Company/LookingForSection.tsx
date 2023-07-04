import styled from 'styled-components'

import { Typography } from '@/components/Typography'

const { Heading, Paragraph } = Typography
const { CNHead5S } = Heading
const { CNBodyLarge } = Paragraph

const SectionContainer = styled.section`
  padding-bottom: 0.63rem;
`
const SectionTitle = styled(CNHead5S)``
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.94rem;
  padding-inline: 0.48rem;
`
const TagRawContainer = styled.div`
  display: flex;
  padding-bottom: 0.46rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const Tag = styled(CNBodyLarge)`
  border-radius: 50vh;
  padding-block: 0.16rem;
  padding-inline: 0.34rem;
  white-space: nowrap;
`
const TagYellow = styled(Tag)`
  color: #fff;
  background: ${props => props.theme.secondary08};
  box-shadow: 0px 4px 20px 0px rgba(251, 170, 48, 0.51);
`
const TagWhite = styled(Tag)`
  color: #2e2f33;
  background: ${props => props.theme.white00};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.11);
`
const TagBlue = styled(Tag)`
  color: ${props => props.theme.white00};
  background: ${props => props.theme.secondary01};
  box-shadow: 0px 4px 20px 0px rgba(54, 84, 255, 0.45);
`
const TagLightBlue = styled(Tag)`
  color: #2e2f33;
  background: ${props => props.theme.secondary02};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.11);
`
const Tag1 = styled(TagYellow)`
  transform: translateX(calc(4.81rem - 2.03rem));
`
const Tag2 = styled(TagWhite)`
  transform: translateY(calc(-0.46rem + 0.3rem));
`
const Tag3 = styled(TagBlue)`
  transform: translateX(calc(0.99rem));
`
const Tag4 = styled(TagLightBlue)`
  transform: translateX(calc(3.7rem - 2.03rem));
`
const Tag5 = styled(TagBlue)`
  transform: translateX(calc(3.1rem - 2.03rem));
`
const Tag6 = styled(TagBlue)`
  transform: translate(3.31rem, calc(-0.43rem + 0.13rem));
`
const Tag7 = styled(TagWhite)`
  transform: translateX(calc(6.56rem - 2.03rem));
`

export const LookingForSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle>我们在寻找什么样的人才？</SectionTitle>
      <TagContainer>
        <TagRawContainer>
          <Tag1>对行业内的最新技术发展保持敏锐的洞察力</Tag1>
        </TagRawContainer>
        <TagRawContainer style={{ paddingBottom: '0.27rem' }}>
          <Tag2>对于以创新的方式做有意义的事情饱含热情</Tag2>
          <Tag3>具有好奇心，养成良好的学习习惯和方法</Tag3>
        </TagRawContainer>
        <TagRawContainer style={{ paddingBottom: '0.43rem' }}>
          <Tag4>对于以创新的方式做有意义的事情饱含热情</Tag4>
        </TagRawContainer>
        <TagRawContainer style={{ paddingBottom: '0.14rem' }}>
          <Tag5>始终以终为始</Tag5>
          <Tag6>热衷于开放且有意识地分享知识</Tag6>
        </TagRawContainer>
        <TagRawContainer>
          <Tag7>坦率而直接地进行沟通</Tag7>
        </TagRawContainer>
      </TagContainer>
    </SectionContainer>
  )
}
