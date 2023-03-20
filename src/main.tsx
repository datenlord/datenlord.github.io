import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { router } from './router'
import { theme } from './theme'

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
)
