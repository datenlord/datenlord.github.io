import styled from 'styled-components'

import { Typography } from '@/components/Typography'

import reactImageUrl from '@/assets/company/react.svg'

const { Heading } = Typography
const { CNHead5S, CNTitleLarge } = Heading

const SectionContainer = styled.section`
  padding-bottom: 1.83rem;
`
const SectionTitle = styled(CNHead5S)``
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.67rem;
  padding-inline: 0.32rem;
`
const ContentContainer = styled.div`
  width: calc(2.42rem + 0.08rem + 0.12rem);
`
const ContentItem = styled(CNTitleLarge)`
  padding-left: 0.08rem;
  color: ${props => props.theme.themeDark02};
`
const ContentItemYellow = styled(ContentItem)`
  border-left: 0.12rem solid ${props => props.theme.secondary08};
`
const ContentItemOrange = styled(ContentItem)`
  border-left: 0.12rem solid ${props => props.theme.secondary07};
`
const Logo = styled.img`
  padding-inline: 0.24rem;
  width: 4.55rem;
`

export const ProvideWhatSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionTitle>我们能提供什么？</SectionTitle>
      <MainContainer>
        <ContentContainer>
          <ContentItemYellow style={{ marginTop: '0.64rem' }}>
            灵活的工作内容，艰巨挑战，激发创新
          </ContentItemYellow>
          <ContentItemOrange style={{ marginTop: '1.28rem' }}>
            每年可申请长达2周的学习假期，自由选择充电课题
          </ContentItemOrange>
        </ContentContainer>
        <Logo src={reactImageUrl} />
        <ContentContainer>
          <ContentItemOrange style={{ marginTop: '0.64rem' }}>
            丰富的软性素质及专业技能培训
          </ContentItemOrange>
          <ContentItemYellow style={{ marginTop: '1.28rem' }}>
            诸多行业交流和展现自我的机会
          </ContentItemYellow>
        </ContentContainer>
      </MainContainer>
    </SectionContainer>
  )
}
