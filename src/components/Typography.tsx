import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
  font-family: Inter;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
  color: #42424a;
`

export const Title: React.FC<{
  children: string
  style?: React.CSSProperties
}> = ({ children, style }) => {
  return (
    <StyledTitle as={'h2'} style={style}>
      {children}
    </StyledTitle>
  )
}
