import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { PCNav } from '@/components/PCNav'
import { MobNav } from '@/components/MobNav'

import logoLightUrl from '@/assets/logo-light.svg'

import type { NavItem } from '@/components/PCNav'

const HeaderWrapper = styled.header`
  z-index: 10;
  position: relative;
  top: 0;
  left: 0;
  height: 0.72rem;
  width: 100vw;
  background-color: transparent;
  color: #fff;
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

export const Header: React.FC<{ items: NavItem[] }> = ({ items }) => {
  const navigate = useNavigate()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo src={logoLightUrl} alt="达坦科技" onClick={() => navigate('/')} />
        <Placeholder />
        <PCNav items={items} />
        {/* <MobNav items={items} /> */}
      </HeaderContainer>
    </HeaderWrapper>
  )
}
