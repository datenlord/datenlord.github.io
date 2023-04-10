import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter;
  }

  html{
    scroll-padding-top: 68px;
  }
`

export default GlobalStyle
