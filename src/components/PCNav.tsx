import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import styled from 'styled-components'

import { Typography } from '@/components/Typography'
import { HeaderContext } from '@/components/Header'

const { Paragraph } = Typography
const { CNBodyMedium } = Paragraph

export interface NavItem {
  key: string
  label: string
  url?: string
  children?: NavItem[]
}

const StyledNav = styled.ul`
  display: flex;
  height: 100%;
  @media screen and (max-width: 425px) {
    display: none;
  }
`
const StyledNavItem = styled.li<{ isdropdown: string; isactive: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 0.24rem;
  border-bottom: ${props =>
    props.isdropdown === 'true'
      ? '0.04rem solid hsla(234, 60%, 66%, 1)'
      : 'none'};
  transition: all 0.05s;
  cursor: pointer;
  color: ${props =>
    props.isactive === 'true' ? props.theme.secondary08 : props.theme.white00};
`
const StyledSubNav = styled.ul<{ isdropdown: string }>`
  position: absolute;
  top: 0.72rem;
  right: -0.6rem;
  display: ${props => (props.isdropdown === 'true' ? 'block' : 'none')};
  padding: 0.16rem 0.2rem;
  background: ${props => props.theme.themeDark};
  border-radius: 0.08rem;
  transition: all 0s ease 0.1s;
  width: 2rem;
`
const StyledSubNavItem = styled.li`
  display: block;
  padding-block: 0.08rem;
  color: hsl(0, 0%, 88%);
  font-weight: 400;
  font-size: 0.14rem;
  &:hover {
    color: ${props => props.theme.secondary01};
  }
`

const jumpPage = (navigate: NavigateFunction, url?: string) => {
  if (!url) {
    return
  }
  if (url.startsWith('http') || url.startsWith('https')) {
    window.location.href = url
  } else {
    navigate(url)
  }
}

const SubNavItem: React.FC<{
  label: string
  url?: string
}> = ({ label, url }) => {
  const navigate = useNavigate()
  return (
    <StyledSubNavItem onClick={() => jumpPage(navigate, url)}>
      {label}
    </StyledSubNavItem>
  )
}

const SubNav: React.FC<{ subNavItems?: NavItem[]; isdropdown: string }> = ({
  subNavItems,
  isdropdown,
}) => {
  return (
    <StyledSubNav isdropdown={isdropdown}>
      {subNavItems?.map(({ key, label, url }) => (
        <SubNavItem key={key} label={label} url={url} />
      ))}
    </StyledSubNav>
  )
}

const NavItem: React.FC<{
  id: string
  label: string
  subNavItems?: NavItem[]
  url?: string
}> = ({ id, label, subNavItems, url }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdown, setDropdown] = useState<string>('false')
  const { mode, activeId } = useContext(HeaderContext)

  useEffect(() => {
    setDropdown('false')
  }, [mode, location.pathname])

  return (
    <StyledNavItem
      isactive={activeId === id ? 'true' : 'false'}
      isdropdown={dropdown}
      onMouseOver={() => setDropdown('true')}
      onMouseOut={() => setDropdown('false')}
      onClick={() => jumpPage(navigate, url)}
    >
      <CNBodyMedium>{label}</CNBodyMedium>
      {subNavItems && (
        <SubNav subNavItems={subNavItems} isdropdown={dropdown} />
      )}
    </StyledNavItem>
  )
}

const Nav: React.FC<{
  items: NavItem[]
}> = ({ items }) => {
  return (
    <StyledNav>
      {items.map(({ key, label, url, children }) => (
        <NavItem
          key={key}
          id={key}
          label={label}
          url={url}
          subNavItems={children}
        />
      ))}
    </StyledNav>
  )
}

export { Nav as PCNav }
