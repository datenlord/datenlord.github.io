import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PCNav } from './PCNav'
import type { NavItem } from './PCNav'
import { MobNav } from './MobNav'

import logoUrl from '@/assets/logo.svg'
import logoTextDarkUrl from '@/assets/logo-text-dark.svg'
import logoTextLightUrl from '@/assets/logo-text-light.svg'

const items: NavItem[] = [
  {
    key: 'products',
    label: 'products',
    children: [
      {
        key: 'DatenLord',
        label: 'DatenLord',
        url: 'https://github.com/datenlord/datenlord',
      },
      {
        key: 'Xline',
        label: 'Xline',
        url: 'https://github.com/datenlord/Xline',
      },
      {
        key: 'RDMA',
        label: 'RDMA',
        url: '/products/RDMA',
      },
    ],
  },
  {
    key: 'solution',
    label: 'solution',
    children: [
      {
        key: 'Unified and High Performance Data Access Across Clouds',
        label: 'Unified and High Performance Data Access Across Clouds',
        url: '/solution/Unified-and-High-Performance-Data-Access-Across-Clouds',
      },
      {
        key: 'Geo-Distributed Metadata management',
        label: 'Geo-Distributed Metadata management',
        url: '/solution/Geo-Distributed-Metadata-management',
      },
      {
        key: 'Hardware Acceleration For Storage Network',
        label: 'Hardware Acceleration For Storage Network',
        url: '/solution/Hardware-Acceleration-For-Storage-Network',
      },
    ],
  },
  {
    key: 'resources',
    label: 'resources',
    children: [
      {
        key: 'Contributing is Thinking and Learning',
        label: 'Community',
        url: '/resources/contribute',
      },
      {
        key: 'Tech Talk',
        label: 'Tech Talk',
        url: '/resources/tech-talk',
      },
      {
        key: 'Blog',
        label: 'Blog',
        url: '/resources/blog',
      },
      {
        key: 'Events',
        label: 'Events',
        url: 'https://www.youtube.com/@datenlord',
      },
    ],
  },
  {
    key: 'customers',
    label: 'customers',
    url: '/customers',
  },
  {
    key: 'company',
    label: 'company',
    children: [
      {
        key: 'Why build DatenLord',
        label: 'Why build DatenLord ?',
        url: '/company/why-build',
      },
      {
        key: 'Why Join DatenLord',
        label: 'Why Join DatenLord ?',
        url: '/company/why-join',
      },
      {
        key: 'Contact Us',
        label: 'Contact Us',
        url: '/company/contact-us',
      },
      {
        key: 'Join Us',
        label: 'Join Us',
        url: '/company/join-us',
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
    background: #111429;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 20px;
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
        {theme !== 'dark' || window.innerWidth < 1024 ? (
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
