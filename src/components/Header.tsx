import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logoUrl from '@/assets/logo.svg'

interface HeaderProps {
  theme: 'dark' | 'light'
  bg?: string
  activeId?: string
}

interface HeaderStyleProps {
  headerTheme: 'dark' | 'light'
  bg?: string
}

interface MenuItemProps {
  headerTheme: 'dark' | 'light'
  children?: React.ReactNode | React.ReactNode[]
  activeId?: string
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

interface MenuItemSProps {
  isActive: boolean
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
  z-index: 1;
  /* box-shadow: 0px -10px 20px 4px rgba(0, 0, 0, 0.2); */
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
  cursor: pointer;
`
const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 4px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`
const Placeholder = styled.div`
  flex: 1;
  min-width: 0.58rem;
`
const Menu = styled.div`
  display: flex;
  height: 100%;
`
const MenuItemS = styled.div<MenuItemSProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  color: ${({ isActive }) => (isActive ? '#7680DD' : 'inherit')};
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
  margin-block: 8px;
  padding-block: 4px;
  font-weight: 600;
  font-size: 13px;
  line-height: 1;
  color: inherit;
  &:hover {
    color: #7680dd;
  }
`

const headerData = [
  {
    id: 'products',
    label: 'products',
    children: [
      {
        id: 'DatenLord',
        label: 'DatenLord',
        url: 'https://github.com/datenlord/datenlord',
      },
      {
        id: 'Xline',
        label: 'Xline',
        url: 'https://github.com/datenlord/Xline',
      },
      {
        id: 'RDMA',
        label: 'RDMA',
        url: '/products/RDMA',
      },
    ],
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
        url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-geo-distributed-metadata-management-system/',
      },
      {
        id: 'Blog',
        label: 'Blog',
        url: '/resources/blog',
      },
      {
        id: 'Events',
        label: 'Events',
        url: 'https://www.youtube.com/@datenlord',
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
        label: 'Why build DatenLord ?',
        url: '/company/why-build',
      },
      {
        id: 'Why Join DatenLord',
        label: 'Why Join DatenLord ?',
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

const MenuItem: React.FC<MenuItemProps> = ({ headerTheme, data, activeId }) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState<boolean>(false)

  // useEffect(() => {
  //   console.log(activeId)
  // }, [activeId])

  return (
    <MenuItemS
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      isActive={data.id === activeId}
      onClick={() => {
        if (data.url) {
          navigate(data.url)
          // setActiveId(data.id)
        }
      }}
    >
      {data.label}
      {data.children && (
        <SubMenuS headerTheme={headerTheme} active={isActive}>
          {data.children.map(({ id, label, url }) =>
            url.startsWith('http') ? (
              <SubMenuItem as={'a'} href={url} key={id}>
                {label}
              </SubMenuItem>
            ) : (
              <SubMenuItem
                key={id}
                onClick={() => {
                  navigate(url)
                }}
              >
                {label}
              </SubMenuItem>
            ),
          )}
        </SubMenuS>
      )}
    </MenuItemS>
  )
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  bg = '#fff',
  activeId,
}) => {
  const navigate = useNavigate()
  // console.log(theme)
  return (
    <HeaderWrapper headerTheme={theme} bg={bg}>
      <HeaderContainer>
        <Logo src={logoUrl} onClick={() => navigate('/')} />
        <Title onClick={() => navigate('/')}>DatenLord</Title>
        <Placeholder />
        <Menu>
          {headerData.map(item => (
            <MenuItem
              key={item.id}
              data={item}
              headerTheme={theme}
              activeId={activeId}
            ></MenuItem>
          ))}
        </Menu>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
