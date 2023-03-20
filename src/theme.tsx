import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: string
  }
}

export const theme: DefaultTheme = {
  color: 'lightpink',
}
