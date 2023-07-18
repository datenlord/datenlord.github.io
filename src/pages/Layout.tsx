import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Outlet, useLocation } from 'react-router-dom'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import { nav } from '@/configs/nav'

const HeaderPlaceholder = styled.div`
  height: 0.72rem;
`

const Layout: React.FC = () => {
  const location = useLocation()

  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down')
  const [isFocus, setIsFocus] = useState<boolean>(false)

  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY

      scrollY > 1000 ? setIsFocus(true) : setIsFocus(false)

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    // console.log(scrollDir)

    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollDir])

  const getMode = () => {
    if (isFocus && scrollDir === 'up') {
      return 'fixed'
    } else {
      return 'default'
    }
  }

  const getColor = () => {
    if (location.pathname.split('/')[1] === 'job-description') {
      return 'dark'
    } else if (
      (location.pathname.split('/')[1] === 'blogs' ||
        location.pathname.split('/')[1] === 'events' ||
        location.pathname.split('/')[1] === 'highlights' ||
        location.pathname.split('/')[1] === 'news-honor-dynamic') &&
      location.pathname.split('/')[2]
    ) {
      return 'dark'
    } else if (isFocus && scrollDir === 'up') {
      return 'dark'
    } else {
      return 'transparent'
    }
  }

  return (
    <>
      <Header items={nav} mode={getMode()} color={getColor()} />
      {getMode() === 'fixed' && <HeaderPlaceholder />}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
