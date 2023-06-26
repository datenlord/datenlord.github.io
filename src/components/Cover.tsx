import styled from 'styled-components'

import { Typography } from '@/components/Typography'

const { Heading } = Typography
const { CNHead1 } = Heading

const SCover = styled.section<{cover: string}>`
  display: flex;
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

export const Cover: React.FC<{ cover: string; children: string }> = ({
  cover,
  children,
}) => {
  return (
    <SCover cover={cover}>
      <Title>{children}</Title>
    </SCover>
  )
}
