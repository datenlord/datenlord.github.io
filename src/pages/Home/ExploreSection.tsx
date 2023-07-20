import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'

import bgUrl from '@/assets/home/bg-explore.png'
import ArrowBlackUrl from '@/assets/home/icon-arrow-right-black.svg'
import ArrowWhiteUrl from '@/assets/home/icon-arrow-right-white.svg'
import React, { useState } from 'react'

const { Heading } = Typography
const { CNHead4 } = Heading

const data: Data[] = [
  {
    key: 'first',
    content:
      '我们致力于探索前沿科技，拥抱创新与改变，并做持续的技术分享与思考。',
    url: '/tech-talk',
  },
  {
    key: 'second',
    content:
      '我们一直深耕科学前沿技术的研究和软硬件融合创新的实践，并对外持续输出我们的创新观察。',
    url: '/blogs',
  },
]

interface Data {
  key: React.Key
  content: string
  url: string
}

const SectionWrapper = styled.section`
  background: ${props => props.theme.themeDark};
  background-image: url(${bgUrl});
  background-size: cover;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.33rem;
  padding-inline: 2.28rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 1.67rem;
  color: ${props => props.theme.secondary02};
  text-align: center;
`
const SCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  padding-block: 0.34rem;
  padding-inline: 0.38rem;
  border: 0.015rem solid transparent;
  border-image: linear-gradient(90deg, transparent, transparent) 1;
  transition: all 0.5s;
  &:hover {
    background: #07070850;
    border: 0.015rem solid transparent;
    border-image: linear-gradient(90deg, #ffffff, #ffffff00) 1;
    clip-path: inset(0 round 0.14rem);
  }
  &:last-child {
    margin-bottom: 0;
  }
`
const Content = styled(CNHead4)`
  max-width: 80%;
  color: #fff;
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.6rem;
  height: 0.6rem;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
`
const ButtonHover = styled(Button)`
  background: ${props => props.theme.secondary08};
`
const ArrowIcon = styled.img`
  width: 0.42rem;
  height: 0.42rem;
`

const Card: React.FC<{ item: Data }> = ({ item }) => {
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState<boolean>(false)
  const pageJump = (url: string) => {
    navigate(url)
  }
  return (
    <SCard
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Content>{item.content}</Content>
      {isHover ? (
        <ButtonHover onClick={() => pageJump(item.url)}>
          <ArrowIcon src={ArrowWhiteUrl} />
        </ButtonHover>
      ) : (
        <Button onClick={() => pageJump(item.url)}>
          <ArrowIcon src={ArrowBlackUrl} />
        </Button>
      )}
    </SCard>
  )
}

export const ExploreSection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>前沿探索</SectionTitle>
        {data.map(item => (
          <Card key={item.key} item={item} />
        ))}
      </SectionContainer>
    </SectionWrapper>
  )
}
