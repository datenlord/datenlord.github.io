import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import styled from 'styled-components'

export interface NavItem {
  key: React.Key
  label: string
  url?: string
  children?: NavItem[]
}

const StyledNav = styled.ul`
  display: flex;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const StyledNavItem = styled.li<{ isDropdown: boolean; isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  /* color: #ffffff; */
  color: ${({ isActive }) => (isActive ? '#7680DD' : 'inherit')};
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: ${props =>
    props.isDropdown ? '4px solid hsla(234, 60%, 66%, 1)' : 'none'};
  transition: all 0.05s;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
    font-weight: 300;
    padding-inline: 16px;
  }
`
const StyledSubNav = styled.ul<{
  isDropdown: boolean
  MyTheme: string
}>`
  z-index: 100;
  position: absolute;
  top: 86px;
  right: 0;
  display: ${props => (props.isDropdown ? 'block' : 'none')};
  padding: 16px 20px;
  background: ${({ MyTheme }) =>
    MyTheme === 'dark' ? '#fff' : 'rgb(36,31,56)'};
  border: 1px solid hsl(0, 0%, 50%);
  color: ${({ MyTheme }) => (MyTheme === 'dark' ? '#42424A' : '#fff')};
  border-radius: 8px;
  transition: all 0s ease 0.1s;
  min-width: 150px;
`
const StyledSubNavItem = styled.li`
  display: block;
  padding-block: 8px;
  /* color: hsl(0, 0%, 88%); */
  font-weight: 400;
  font-size: 14px;
  text-transform: none;
  &:hover {
    color: hsl(234, 60%, 66%);
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

const SubNav: React.FC<{
  subNavItems?: NavItem[]
  isDropdown: boolean
  theme: 'dark' | 'light'
}> = ({ subNavItems, isDropdown, theme }) => {
  return (
    <StyledSubNav isDropdown={isDropdown} MyTheme={theme}>
      {subNavItems?.map(({ key, label, url }) => (
        <SubNavItem key={key} label={label} url={url} />
      ))}
    </StyledSubNav>
  )
}

const NavItem: React.FC<{
  id: React.Key
  label: string
  subNavItems?: NavItem[]
  url?: string
  theme: 'dark' | 'light'
  activeId: string
}> = ({ label, subNavItems, url, theme, id, activeId }) => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState<boolean>(false)
  return (
    <StyledNavItem
      isDropdown={dropdown}
      isActive={id === activeId}
      onMouseOver={() => setDropdown(true)}
      onMouseOut={() => setDropdown(false)}
      onClick={() => jumpPage(navigate, url)}
    >
      {label}
      {subNavItems && (
        <SubNav subNavItems={subNavItems} isDropdown={dropdown} theme={theme} />
      )}
    </StyledNavItem>
  )
}

const Nav: React.FC<{
  items: NavItem[]
  theme: 'dark' | 'light'
  activeId: string
}> = ({ items, theme, activeId }) => {
  return (
    <StyledNav>
      {items.map(({ key, label, url, children }) => (
        <NavItem
          key={key}
          id={key}
          label={label}
          url={url}
          subNavItems={children}
          theme={theme}
          activeId={activeId}
        />
      ))}
    </StyledNav>
  )
}

export { Nav as PCNav }
