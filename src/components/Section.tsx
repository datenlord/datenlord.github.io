import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ bgColor: string }>`
  padding: 0.96rem 1.24rem 1.24rem;
  background: ${props => props.bgColor};
`

export const Section: React.FC<{
  children: React.ReactNode
  backgroundColor?: string
}> = ({ children, backgroundColor = '#fff' }) => {
  return <Wrapper bgColor={backgroundColor}>{children}</Wrapper>
}
