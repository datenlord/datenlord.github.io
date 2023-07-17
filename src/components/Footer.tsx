import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from './Typography'
import { nav } from '@/configs/nav'

import logoUrl from '@/assets/logo-light.svg'

const { Paragraph } = Typography
const { CNBodyLarge } = Paragraph

const FooterWrapper = styled.footer`
  color: #fff;
  background-color: ${props => props.theme.themeDark};
`
const FooterContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.22rem;
  padding-block: 0.64rem;
`
const Logo = styled.img`
  height: 0.58rem;
  padding-inline: 0.64rem;
`
const LinkClassContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const LinkClass = styled.div`
  padding-inline: 0.16rem;
  padding-bottom: 0.64rem;
  color: white;
  width: 2rem;
`
const LinkClassTitle = styled.h2`
  padding-bottom: 0.16rem;
  margin-bottom: 0.24rem;
  font-weight: 500;
  font-size: 0.2rem;
  line-height: 0.4rem;
  text-transform: capitalize;
  border-bottom: 1px solid white;
  cursor: default;
`
const LinkList = styled.ul``
const LinkListItem = styled.li`
  margin-bottom: 0.15rem;
  text-transform: capitalize;
  list-style-type: none;
  cursor: pointer;
`
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fff;
`
const Copyright = styled(CNBodyLarge)`
  padding-top: 0.14rem;
`

export const Footer: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <MainContainer>
            <Logo src={logoUrl} />
            <LinkClassContainer>
              {nav.map(({ key, label, children }) => {
                return (
                  <LinkClass key={key}>
                    <LinkClassTitle>{label}</LinkClassTitle>
                    <LinkList>
                      {(children || []).map(({ key, label, url }) => (
                        <LinkListItem
                          key={key}
                          onClick={() => {
                            url && navigate(url)
                          }}
                        >
                          <CNBodyLarge>{label}</CNBodyLarge>
                        </LinkListItem>
                      ))}
                    </LinkList>
                  </LinkClass>
                )
              })}
            </LinkClassContainer>
          </MainContainer>
          <Copyright style={{ textAlign: 'center' }}>
            北京达坦科技有限公司©2023版权所有
          </Copyright>
        </FooterContainer>
      </FooterWrapper>
    </>
  )
}
