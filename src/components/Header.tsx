import { createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { PCNav } from '@/components/PCNav'
import { MobNav } from '@/components/MobNav'

import logoLightUrl from '@/assets/logo-light.svg'

import type { NavItem } from '@/components/PCNav'

const HeaderWrapper = styled.header<HeaderContextProps>`
  z-index: 1000;
  position: ${props => (props.mode === 'fixed' ? 'fixed' : 'sticky')};
  top: ${props => (props.mode === 'fixed' ? '0' : '-0.72rem')};
  left: 0;
  height: 0.72rem;
  width: 100%;
  background-color: ${props =>
    props.color === 'transparent' ? 'transparent' : props.theme.themeDark};
  color: ${props => props.theme.white00};
  transition: all 0.3s;
  // - - -
  /* background-color: ${props => props.theme.themeDark}; */
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.4rem;
`
const Logo = styled.img`
  height: 0.47rem;

  font-size: 0.3rem;
`
const Placeholder = styled.div`
  flex: 1;
  min-width: 32px;
`

interface HeaderContextProps {
  color: 'dark' | 'light' | 'transparent'
  mode: 'default' | 'fixed'
  // activeId: string
}

export const HeaderContext = createContext<HeaderContextProps>({
  color: 'dark',
  mode: 'default',
  // activeId: 'home',
})

// const HeaderMap = new Map([
//   ['/products', ['product', 'datenlord', 'xline']],
//   ['/rdma', ['rdma']],
//   ['/solutions', ['solution', 'data-access', 'metadata-management', 'hardware-acceleration', 'related-resource']],
//   ['/resources1', ['resource', 'community']],
//   ['/resources2', ['resource', 'tech-share', 'dynamics', 'blog']],
//   ['/clients', ['client', 'usage-scenarios', 'project-cooperation']],
//   ['/company1', ['company', 'about-us']],
//   ['/company2', ['company', 'join-us', 'contact-us']],
// ])

export const Header: React.FC<{
  items: NavItem[]
  color?: 'dark' | 'light' | 'transparent'
  mode?: 'default' | 'fixed'
}> = ({ items, color = 'dark', mode = 'default' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)

  return (
    <HeaderContext.Provider value={{ color, mode }}>
      <HeaderWrapper color={color} mode={mode}>
        <HeaderContainer>
          <Logo
            src={logoLightUrl}
            alt="达坦科技"
            onClick={() => navigate('/')}
          />
          <Placeholder />
          {window.innerWidth > 425 ? (
            <PCNav items={items} />
          ) : (
            <MobNav items={items} />
          )}
        </HeaderContainer>
      </HeaderWrapper>
    </HeaderContext.Provider>
  )
}
