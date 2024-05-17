import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.8rem;
  padding: calc(0.67rem + 0.9rem) 1.03rem 0.34rem;
  background: #0a061f;
  color: #ffffff;
`
const Title = styled.div`
  font-size: 0.72rem;
  line-height: 0.44rem;
  font-weight: 700;
`

export const Cover: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Wrapper>
      <Title>{children}</Title>
    </Wrapper>
  )
}
