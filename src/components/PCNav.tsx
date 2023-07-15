import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import styled from 'styled-components'

import { Typography } from '@/components/Typography'
import { HeaderContext } from '@/components/Header'

const { Paragraph } = Typography
const { CNBodyMedium } = Paragraph

export interface NavItem {
  key: React.Key
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
const StyledNavItem = styled.li<{ isdropdown: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 0.24rem;
  /* color: #fff; */
  border-bottom: ${props =>
    props.isdropdown === 'true'
      ? '0.04rem solid hsla(234, 60%, 66%, 1)'
      : 'none'};
  transition: all 0.05s;
  cursor: pointer;
  /* @media screen and (max-width: 1024px) {
    font-size: 16px;
    font-weight: 300;
    padding-inline: 16px;
  } */
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
    color: ${props => props.theme.themeDark};
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
  label: string
  subNavItems?: NavItem[]
  url?: string
}> = ({ label, subNavItems, url }) => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState<string>('false')
  const { mode } = useContext(HeaderContext)

  useEffect(() => {
    setDropdown('false')
  }, [mode])

  return (
    <StyledNavItem
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
        <NavItem key={key} label={label} url={url} subNavItems={children} />
      ))}
    </StyledNav>
  )
}

export { Nav as PCNav }
