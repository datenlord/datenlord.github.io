import React, { createContext, useState } from 'react'
import { Header } from '@/components/Header1'
import { Footer } from '@/components/Footer'
import { Outlet } from 'react-router-dom'

interface ThemeContextValue {
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export const ThemeCtx = createContext<ThemeContextValue | null>(null)

const Layout = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeCtx.Provider value={{ setTheme }}>
      <Header activeId="" theme={theme} bg="transparent" />
      <Outlet />
      <Footer />
    </ThemeCtx.Provider>
  )
}

export default Layout
