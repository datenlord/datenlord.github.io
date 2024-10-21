import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  margin-block: 0;
  font-family: PingFang SC;
`
const Paragraph = styled(Text)`
  font-weight: 400;
  font-size: 0.16rem;
  line-height: 0.28rem;
`
const Heading = styled(Text)`
  font-weight: 600;
  font-size: 0.64rem;
  line-height: 0.72rem;
`

// Heading
const CNHead1 = styled(Heading)``
const Heading2 = styled(Heading)`
  font-size: 0.32rem;
  line-height: 0.352rem;
`
const Heading3 = styled(Heading)`
  font-size: 0.3rem;
  line-height: 0.444rem;
`
const CNHead4 = styled(Heading)`
  font-size: 0.28rem;
  line-height: 0.56rem;
`
const Heading6 = styled(Heading)`
  font-size: 0.24rem;
  line-height: 0.44rem;
`
const CNHead5 = styled(Heading)`
  font-size: 0.24rem;
  line-height: 0.32rem;
`
const CNTitleLarge = styled(Heading)`
  font-size: 0.2rem;
  line-height: 0.28rem;
`
const TitleLarge = styled(Heading)`
  font-size: 0.2rem;
  line-height: 0.4rem;
`
const CNTitleMedium = styled(Heading)`
  font-size: 0.16rem;
  line-height: 0.24rem;
`
const CNTitleSmall = styled(Heading)`
  font-size: 0.14rem;
  line-height: 0.22rem;
`

// Paragraph
const CNBodyLarge = styled(Paragraph)`
  font-size: 0.18rem;
  line-height: 0.32rem;
`
const CNBodyMedium = styled(Paragraph)``
const CNBodySmall = styled(Paragraph)`
  font-size: 0.14rem;
  line-height: 0.2rem;
`
const CNMarkMedium = styled(Paragraph)`
  font-size: 0.14rem;
  line-height: 0.22rem;
`
const CNMarkSmall = styled(Paragraph)`
  font-size: 0.12rem;
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

export const Typography = {
  Heading: {
    CNHead1,
    Heading2,
    Heading3,
    CNHead4,
    Heading6,
    CNHead5,
    CNTitleLarge,
    TitleLarge,
    CNTitleMedium,
    CNHead5S,
    CNTitleSmall,
  },
  Paragraph: {
    CNBodyLarge,
    CNBodyMedium,
    CNBodySmall,
    CNMarkMedium,
    CNMarkSmall,
  },
}
