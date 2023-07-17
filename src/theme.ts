import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    themeDark: '#0A061F'
    themeDark02: '#42424A'
    secondary01: '#7680DD'
    secondary02: '#D9DBEF'
    secondary07: '#F2994A'
    secondary08: '#FDCB6E'
    gray03: '#828282'
    gray04: '#4F4F4F'
    gray007: '#272D37'
    white00: '#fff'
  }
}

export const theme: DefaultTheme = {
  themeDark: '#0A061F',
  themeDark02: '#42424A',
  secondary01: '#7680DD',
  secondary02: '#D9DBEF',
  secondary07: '#F2994A',
  secondary08: '#FDCB6E',
  gray03: '#828282',
  gray04: '#4F4F4F',
  gray007: '#272D37',
  white00: '#fff',
}
