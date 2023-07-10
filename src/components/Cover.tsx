import styled from 'styled-components'

import { Typography } from '@/components/Typography'
import React from 'react'

const { Heading } = Typography
const { CNHead1, CNTitleLarge } = Heading

const SCover = styled.section<{ cover: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -0.72rem;
  padding-top: 0.72rem;
  height: 6.6rem;
  background-color: #000;
  background-image: url(${props => props.cover});
  background-size: cover;
`
const Title = styled(CNHead1)`
  color: #fff;
`
const SubTitle = styled(CNTitleLarge)`
  max-width: 10rem;
  padding-top: 0.5rem;
  font-weight: 400;
  color: #fff;
  text-align: center;
`

export const Cover: React.FC<{
  cover: string
  children?: React.ReactNode
  subTitle?: string
}> = ({ cover, children, subTitle }) => {
  return (
    <SCover cover={cover}>
      <Title>{children}</Title>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </SCover>
  )
}
