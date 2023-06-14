import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    test: 'test'
  }
}

export const theme: DefaultTheme = {
  test: 'test',
}
