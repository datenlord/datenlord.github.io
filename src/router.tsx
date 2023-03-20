import { createBrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: ${props => props.theme.color};
`

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StyledDiv>Hello world!</StyledDiv>,
  },
])
