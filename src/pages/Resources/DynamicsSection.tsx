import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import rightArrowUrl from '@/assets/resources/right-arrow.svg'
import dynamicsTestImageUrl from '@/assets/resources/dynamics-test-image.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNTitleLarge, CNTitleMedium } = Heading
const { CNBodySmall, CNMarkSmall } = Paragraph

const SectionWrapper = styled.section`
  background: ${props => props.theme.white00};
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.29rem;
  padding-inline: 1.22rem;
`
const Title = styled(CNHead4)`
  padding-bottom: 1.22rem;
  color: ${props => props.theme.themeDark02};
  text-align: center;
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.21rem 0.32rem;
`

const Card = styled.div`
  position: relative;
  background: ${props => props.theme.white00};
  overflow: hidden;
  cursor: pointer;
`
const CardBig = styled(Card)`
  grid-area: 1 / 1 / 3 / 3;
  border-radius: 0.156rem;
  box-shadow: 0.234rem 0.156rem 0.781rem rgba(0, 0, 0, 0.1);
`
const CardSmall = styled(Card)`
  border-radius: 0.081rem;
  box-shadow: 0.121rem 0.08rem 0.403rem rgba(0, 0, 0, 0.1);
`

const CardCover = styled.img`
  display: block;
  width: 100%;
`
const CardCoverBig = styled(CardCover)`
  /* height: 4.14rem; */
`
const CardCoverSmall = styled(CardCover)`
  /* height: 1.4rem; */
`

const CardContent = styled.div``
const CardContentBig = styled(CardContent)`
  padding: 0.24rem 0.28rem 0.33rem;
`
const CardContentSmall = styled(CardContent)`
  padding: 0.13rem 0.12rem 0.23rem;
`

const CardTitleBig = styled(CNTitleLarge)`
  margin-bottom: 0.09rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CardTitleSmall = styled(CNTitleMedium)`
  margin-bottom: 0.13rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardTextBig = styled(CNBodySmall)`
  margin-bottom: 0.36rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CardTextSmall = styled(CNBodySmall)`
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LinkContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${props => props.theme.secondary01};
`
const LinkContainerBig = styled(LinkContainer)`
  bottom: 0.28rem;
  left: 0.28rem;
`
const LinkContainerSmall = styled(LinkContainer)`
  bottom: 0.12rem;
  left: 0.12rem;
`
const LinkText = styled(CNMarkSmall)`
  padding-right: 0.04rem;
`
const LinkIcon = styled.img`
  width: 0.12rem;
  height: 0.12rem;
`
const SectionButton = styled(Button)`
  margin-top: 0.64rem;
  display: block;
  margin-inline: auto;
  color: #fff;
`

const _data = import.meta.glob(`@/articles/events/*/index.md`)

export const DynamicsSection: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<typeof import('*.md')[]>([])

  const getBlogs = async () => {
    const data = (await Promise.all(
      Object.keys(_data).map(path => _data[path]()),
    )) as typeof import('*.md')[]
    setData(data.reverse())
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <SectionWrapper id="dynamics">
      <SectionContainer>
        <Title>达坦动态</Title>
        <CardContainer>
          {data.map(({ metadata, assetURLs }, index) => {
            const { title, date, cover, label, description } = metadata
            if (index === 0) {
              return (
                <CardBig key={title}>
                  <CardCoverBig
                    src={cover ? assetURLs[0] : dynamicsTestImageUrl}
                  />
                  <CardContentBig>
                    <CardTitleBig>{label}</CardTitleBig>
                    <CardTextBig>{description}</CardTextBig>
                  </CardContentBig>
                  <LinkContainerBig
                    onClick={() => {
                      navigate(`/events/${date}-${title.split(' ').join('-')}`)
                    }}
                  >
                    <LinkText>详情</LinkText>
                    <LinkIcon src={rightArrowUrl} />
                  </LinkContainerBig>
                </CardBig>
              )
            } else if (index < 5) {
              return (
                <CardSmall key={title}>
                  <CardCoverSmall
                    src={cover ? assetURLs[0] : dynamicsTestImageUrl}
                  />
                  <CardContentSmall>
                    <CardTitleSmall>{label}</CardTitleSmall>
                    <CardTextSmall>{description}</CardTextSmall>
                  </CardContentSmall>
                  <LinkContainerSmall
                    onClick={() => {
                      navigate(`/events/${date}-${title.split(' ').join('-')}`)
                    }}
                  >
                    <LinkText>详情</LinkText>
                    <LinkIcon src={rightArrowUrl} />
                  </LinkContainerSmall>
                </CardSmall>
              )
            }
          })}
        </CardContainer>
        <SectionButton onClick={() => navigate('/events')}>
          了解更多
        </SectionButton>
      </SectionContainer>
    </SectionWrapper>
  )
}
