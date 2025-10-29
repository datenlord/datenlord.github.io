import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// import { Typography } from './Typography'
import { items as nav } from './Header1'

import logoUrl from '@/assets/logo-light.png'

const FooterWrapper = styled.footer`
  color: #fff;
  background-color: #0a061f;
`
const FooterContainer = styled.div`
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: 1.22rem;
  padding-block: 0.64rem;
`
const Logo = styled.img`
  height: 0.58rem;
  padding-inline: 0.16rem 0.16rem;
`
const LinkClassContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; 
`;
const LinkClass = styled.div`
  padding-inline: 0.16rem;
  padding-bottom: 0.64rem;
  color: white;
  /* width: 1.8rem; */
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
const Copyright = styled.div`
  padding-top: 0.14rem;
`
const Txt = styled.div`
  font-weight: 400;
  font-size: 0.18rem;
  line-height: 0.4rem;
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
                            if (!url) {
                              return
                            } else if (url.startsWith('http') || url.startsWith('https')) {
                              window.location.href = url
                            } else {
                              navigate(url)
                            }
                          }}
                        >
                          <Txt>{label}</Txt>
                        </LinkListItem>
                      ))}
                    </LinkList>
                  </LinkClass>
                )
              })}
            </LinkClassContainer>
          </MainContainer>
          <Txt style={{ textAlign: 'center', paddingTop: '0.16rem' }}>
            DatenLord Technology Co., Ltd. ©2024 All Rights Reserved.
          </Txt>
        </FooterContainer>
      </FooterWrapper>
    </>
  )
}
