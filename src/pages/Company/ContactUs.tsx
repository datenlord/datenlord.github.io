import React from 'react'
import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import styled from 'styled-components'
import img1Url from '@/assets/company/contact-us/image1.png'
import githubIconUrl from '@/assets/company/contact-us/github.png'
import mediumIconUrl from '@/assets/company/contact-us/medium.png'
import substackIconUrl from '@/assets/company/contact-us/substack.png'

const Title = styled.div`
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 0.6rem;
  text-align: center;
  color: #42424a;
  margin-inline: 2.5rem;
  padding-bottom: 0.88rem;
  border-bottom: 0.01rem solid #d9dbef;
  margin-bottom: 0.88rem;
`
const Main = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.24rem;
`
const Image = styled.img`
  width: 4.4rem;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const TxtCtr = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.img`
  height: 0.6rem;
  margin-right: 0.2rem;
`
const Txt = styled.div`
  font-weight: 600;
  font-size: 0.28rem;
  line-height: 0.5rem;
  color: #000000;
`

const ContactUs: React.FC = () => {
  return (
    <React.Fragment>
      <Cover>Contact Us</Cover>
      <Section>
        <Title>Follow Us</Title>
        <Main>
          <Image src={img1Url} />
          <Content>
            <TxtCtr style={{ marginBottom: '20px' }}>
              <Icon src={githubIconUrl} />
              <Txt>https://datenlord.github.io</Txt>
            </TxtCtr>
            <TxtCtr style={{ marginBottom: '20px' }}>
              <Icon src={mediumIconUrl} />
              <Txt>https://medium.com/@datenlord</Txt>
            </TxtCtr>
            <TxtCtr>
              <Icon src={substackIconUrl} />
              <Txt>https://substack.com/@datenlord</Txt>
            </TxtCtr>
          </Content>
        </Main>
      </Section>
    </React.Fragment>
  )
}

export default ContactUs
