import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter;
  }

  a {
    display: block;
    text-decoration: none;
  }

  html{
    font-size: 100px;
    scroll-padding-top: 128px;

    @media screen and (max-width: 1440px) {
      font-size: 75px;
    }

    @media screen and (max-width: 1024px) {
      font-size: 54px;
    }

    @media screen and (max-width: 768px) {
      font-size: 40px;
    }
  }
`

export default GlobalStyle
