import { createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { PCNav } from '@/components/PCNav'
// import { MobNav } from '@/components/MobNav'

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
const Button = styled.div`
  font-size: 0.14rem;
  line-height: 0.2rem;
  font-weight: 600;
  color: #7680DD;
  padding: 0.08rem 0.24rem;
  border-radius: 0.24rem;
  border: 0.01rem solid #7680DD;
  margin-left: 0.24rem;
`

interface HeaderContextProps {
  color: 'dark' | 'light' | 'transparent'
  mode: 'default' | 'fixed'
  activeId?: string
}

export const HeaderContext = createContext<HeaderContextProps>({
  color: 'dark',
  mode: 'default',
  activeId: 'home',
})

export const HeaderMap = new Map([
  ['products', 'product'],
  ['rdma', 'product'],
  ['solutions', 'solution'],
  ['resources1', 'resource'],
  ['resources2', 'resource'],
  ['news-honor-dynamic', 'resource'],
  ['tech-talk', 'resource'],
  ['events', 'resource'],
  ['blogs', 'resource'],
  ['clients', 'client'],
  ['company1', 'company'],
  ['company2', 'company'],
  ['job-description', 'company'],
])

export const Header: React.FC<{
  items: NavItem[]
  color?: 'dark' | 'light' | 'transparent'
  mode?: 'default' | 'fixed'
}> = ({ items, color = 'dark', mode = 'default' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const activeId = HeaderMap.get(location.pathname.split('/')[1])

  return (
    <HeaderContext.Provider value={{ color, mode, activeId }}>
      <HeaderWrapper color={color} mode={mode}>
        <HeaderContainer>
          <Logo
            src={logoLightUrl}
            alt="达坦科技"
            onClick={() => navigate('/')}
          />
          <Placeholder />
          {
            window.innerWidth > 425 ? <PCNav items={items} /> : null
            // <MobNav items={items} />
          }
          <Button onClick={() => window.location.href = 'https://datenlord.github.io/'}>中/英</Button>
        </HeaderContainer>
      </HeaderWrapper>
    </HeaderContext.Provider>
  )
}
