import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logoUrl from '@/assets/logo.svg'

interface HeaderProps {
  theme: 'dark' | 'light'
  bg?: string
}

interface HeaderStyleProps {
  headerTheme: 'dark' | 'light'
  bg?: string
}

interface MenuItemProps {
  headerTheme: 'dark' | 'light'
  children?: React.ReactNode | React.ReactNode[]
  data: {
    id: string
    label: string
    url?: string
    children?: {
      id: string
      label: string
      url: string
    }[]
  }
}

interface SubMenuProps {
  headerTheme: 'dark' | 'light'
  active: boolean
}

const HeaderWrapper = styled.div<HeaderStyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 84px; //20% - 14%
  background: ${({ bg }) => bg};
  color: ${({ headerTheme }) => (headerTheme === 'dark' ? 'black' : 'white')};
  transition: color 0.5s;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: 64px;
`
const Logo = styled.img`
  height: 44px;
  margin-right: 20px;
`
const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 4px;
  font-family: Arial, Helvetica, sans-serif;
`
const Placeholder = styled.div`
  flex: 1;
  min-width: 0.58rem;
`
const Menu = styled.div`
  display: flex;
  height: 100%;
`
const MenuItemS = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  font-size: 14px;
  line-height: 1.5rem;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all 0.05s;
  cursor: pointer;
`
const SubMenuS = styled.div<SubMenuProps>`
  position: absolute;
  top: 72px;
  right: 0;
  /* display: block; */
  display: ${props => (props.active ? 'block' : 'none')};
  padding: 4px 20px;
  background: ${({ headerTheme }) =>
    headerTheme === 'dark' ? '#fff' : 'rgb(36,31,56)'};
  border: 1px solid #d9dbef;
  /* border-color: ${({ headerTheme }) =>
    headerTheme === 'dark' ? '#D9DBEF' : '#D9DBEF'}; */
  border-radius: 8px;
  transition: all 0s ease 0.1s;
  min-width: 120px;
  z-index: 100;
  color: ${({ headerTheme }) => (headerTheme === 'dark' ? '#42424A' : '#fff')};
  text-transform: none;
`
const SubMenuItem = styled.p`
  display: block;
  padding-block: 4px;
  font-weight: 600;
  font-size: 13px;
  line-height: 1;
  &:hover {
    color: #7680dd;
  }
`

const headerData = [
  {
    id: 'products',
    label: 'products',
    url: '/products',
  },
  {
    id: 'solution',
    label: 'solution',
    children: [
      {
        id: 'Unified and High Performance Data Access Across Clouds',
        label: 'Unified and High Performance Data Access Across Clouds',
        url: '/solution/Unified-and-High-Performance-Data-Access-Across-Clouds',
      },
      {
        id: 'Geo-Distributed Metadata management',
        label: 'Geo-Distributed Metadata management',
        url: '/solution/Geo-Distributed-Metadata-management',
      },
      {
        id: 'Hardware Acceleration For Storage Network',
        label: 'Hardware Acceleration For Storage Network',
        url: '/solution/Hardware-Acceleration-For-Storage-Network',
      },
    ],
  },
  {
    id: 'resources',
    label: 'resources',
    children: [
      {
        id: 'Contributing is Thinking and Learning',
        label: 'Contributing is Thinking and Learning',
        url: '/resources/contribute',
      },
      {
        id: 'Tech Talk',
        label: 'Tech Talk',
        url: 'https://www.baibu.com',
      },
      {
        id: 'Blog',
        label: 'Blog',
        url: '/resources/blog',
      },
      {
        id: 'Events',
        label: 'Events',
        url: 'https://www.baibu.com',
      },
    ],
  },
  {
    id: 'customers',
    label: 'customers',
    url: '/customers',
  },
  {
    id: 'company',
    label: 'company',
    children: [
      {
        id: 'Why build DatenLord',
        label: 'Why build DatenLord?',
        url: '/company/why-build',
      },
      {
        id: 'Why Join DatenLord',
        label: 'Why Join DatenLord?',
        url: '/company/why-join',
      },
      {
        id: 'Contact Us',
        label: 'Contact Us',
        url: '/company/contact-us',
      },
    ],
  },
]

const MenuItem: React.FC<MenuItemProps> = ({ headerTheme, data }) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <MenuItemS
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => {
        if (data.url) {
          navigate(data.url)
        }
      }}
    >
      {data.label}
      {data.children && (
        <SubMenuS headerTheme={headerTheme} active={isActive}>
          {data.children.map(({ id, label, url }) => (
            <SubMenuItem key={id} onClick={() => navigate(url)}>
              {label}
            </SubMenuItem>
          ))}
        </SubMenuS>
      )}
    </MenuItemS>
  )
}

export const Header: React.FC<HeaderProps> = ({ theme, bg = '#fff' }) => {
  // console.log(theme)
  return (
    <HeaderWrapper headerTheme={theme} bg={bg}>
      <HeaderContainer>
        <Logo src={logoUrl} />
        <Title>DatenLord</Title>
        <Placeholder />
        <Menu>
          {headerData.map(item => (
            <MenuItem key={item.id} data={item} headerTheme={theme}></MenuItem>
          ))}
        </Menu>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
