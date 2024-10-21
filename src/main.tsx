import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { GlobalStyle } from '@/style'

import { router } from '@/router'
import { theme } from '@/theme'
import { store } from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>
)
