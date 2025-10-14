import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PCNav } from './PCNav'
import type { NavItem } from './PCNav'
import { MobNav } from './MobNav'

import logoUrl from '@/assets/logo.svg'
import logoTextDarkUrl from '@/assets/logo-text-dark.svg'
import logoTextLightUrl from '@/assets/logo-text-light.svg'

export const items: NavItem[] = [
  {
    key: 'products',
    label: 'products',
    children: [
      {
        key: 'appliance',
        label: 'RDMA NIC',
        url: '/products/appliance',
      },
    ],
  },
  {
    key: 'solution',
    label: 'solution',
    children: [
      {
        key: 'inference',
        label: 'AI Inference Platform',
        url: '/solution',
      },
      {
        key: 'network',
        label: 'High Performance AI Network',
        url: '/solution',
      },
    ],
  },
  {
    key: 'resources',
    label: 'resources',
    children: [
      {
        key: 'tech-talk',
        label: 'Tech Talk',
        url: '/resources/tech-talk',
      },
      {
        key: 'blog',
        label: 'Blog',
        url: 'https://medium.com/@datenlord',
      },
      {
        key: 'events',
        label: 'Events',
        url: 'https://www.youtube.com/@datenlord',
      },
    ],
  },
  {
    key: 'community',
    label: 'Community',
    children: [
      {
        key: 'communitys',
        label: 'Open Source community',
        url: '/community/communitys',
      },
      {
        key: 'Product',
        label: 'Open Source Product',
        url: '/community/Product',
      },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    children: [
      {
        key: 'about-us',
        label: 'About Us',
        url: '/company',
      },
      {
        key: 'join-us',
        label: 'Join Us',
        url: '/company',
      },
      {
        key: 'contact-us',
        label: 'Contact Us',
        url: '/company',
      },
    ],
  },
]

const HeaderWrapper = styled.header<{
  headerTheme: 'dark' | 'light'
  bg: string
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 86px;
  width: 100%;
  background-color: ${props => props.bg};
  z-index: 1000;
  color: ${props => (props.headerTheme === 'dark' ? '#000' : '#fff')};
  @media screen and (max-width: 1024px) {
    height: 69px;
  }
  @media screen and (max-width: 768px) {
    height: 53px;
  }
`
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: inherit;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 72px;
  @media screen and (max-width: 1024px) {
    padding-inline: 64px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 20px;
    background: #111429;
  }
`
const Logo = styled.img`
  height: 50%;
  margin-right: 16px;
  @media screen and (max-width: 1024px) {
    margin-right: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`
const LogoText = styled.img`
  height: 16px;
  @media screen and (max-width: 1024px) {
    height: 12px;
  }
  @media screen and (max-width: 768px) {
    height: 8px;
  }
`
const Placeholder = styled.div`
  flex: 1;
  min-width: 32px;
  @media screen and (max-width: 1024px) {
    min-width: 16px;
  }
`

export const Header: React.FC<{
  theme: 'dark' | 'light'
  bg: string
  activeId: string
}> = ({ theme, bg = '#fff', activeId }) => {
  const navigate = useNavigate()

  return (
    <HeaderWrapper headerTheme={theme} bg={bg}>
      <HeaderContainer>
        <Logo src={logoUrl} alt="DatenLord" onClick={() => navigate('/')} />
        {theme !== 'dark' || window.innerWidth < 768 ? (
          <LogoText src={logoTextLightUrl} />
        ) : (
          <LogoText src={logoTextDarkUrl} />
        )}
        <Placeholder />
        <PCNav items={items} theme={theme} activeId={activeId} />
        <MobNav items={items} theme={theme} />
      </HeaderContainer>
    </HeaderWrapper>
  )
}
