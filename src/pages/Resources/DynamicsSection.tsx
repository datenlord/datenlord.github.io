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
  height: 4.14rem;
`
const CardCoverSmall = styled(CardCover)`
  height: 1.4rem;
`

const CardContent = styled.div``
const CardContentBig = styled(CardContent)`
  padding: 0.24rem 0.28rem 0.33rem;
`
const CardContentSmall = styled(CardContent)`
  padding: 0.13rem 0.12rem 0.23rem;
`

const CardTitleBig = styled(CNTitleLarge)`
  padding-bottom: 0.09rem;
`
const CardTitleSmall = styled(CNTitleMedium)`
  padding-bottom: 0.13rem;
`

const CardTextBig = styled(CNBodySmall)`
  padding-bottom: 0.36rem;
`
const CardTextSmall = styled(CNBodySmall)`
  padding-bottom: 0.25rem;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.secondary01};
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

const items = [
  {
    key: 1,
    cover: dynamicsTestImageUrl,
    title: '达坦科技受邀在2022中国计算机学会芯片大会做硬件加速研究分享',
    text: '2022年7月29日至7月30日，由中国计算机学会（CCF）集成电路设计专业委员会、容错计算专业委员会、体系结构专业委员会和信息存储技术专业委员会联合举办的学术大会中国计算机学会芯片大会在江苏南京如期圆满举行。',
  },
  {
    key: 2,
    cover: dynamicsTestImageUrl,
    title: '达坦科技受邀在2022中国计算机学会芯片大会做硬件加速研究分享',
    text: '2022年7月29日至7月30日，由中国计算机学会（CCF）集成电路设计专业委...',
  },
  {
    key: 3,
    cover: dynamicsTestImageUrl,
    title: '达坦科技受邀在2022中国计算机学会芯片大会做硬件加速研究分享',
    text: '2022年7月29日至7月30日，由中国计算机学会（CCF）集成电路设计专业委...',
  },
  {
    key: 4,
    cover: dynamicsTestImageUrl,
    title: '达坦科技受邀在2022中国计算机学会芯片大会做硬件加速研究分享',
    text: '2022年7月29日至7月30日，由中国计算机学会（CCF）集成电路设计专业委...',
  },
  {
    key: 5,
    cover: dynamicsTestImageUrl,
    title: '达坦科技受邀在2022中国计算机学会芯片大会做硬件加速研究分享',
    text: '2022年7月29日至7月30日，由中国计算机学会（CCF）集成电路设计专业委...',
  },
]

export const DynamicsSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <SectionWrapper id="dynamics">
      <SectionContainer>
        <Title>达坦动态</Title>
        <CardContainer>
          {items.map(({ key, cover, title, text }, index) =>
            index === 0 ? (
              <CardBig key={key}>
                <CardCoverBig src={cover} />
                <CardContentBig>
                  <CardTitleBig>{title}</CardTitleBig>
                  <CardTextBig>{text}</CardTextBig>
                  <LinkContainer>
                    <LinkText>详情</LinkText>
                    <LinkIcon src={rightArrowUrl} />
                  </LinkContainer>
                </CardContentBig>
              </CardBig>
            ) : (
              <CardSmall key={key}>
                <CardCoverSmall src={cover} />
                <CardContentSmall>
                  <CardTitleSmall>{title}</CardTitleSmall>
                  <CardTextSmall>{text}</CardTextSmall>
                  <LinkContainer>
                    <LinkText>详情</LinkText>
                    <LinkIcon src={rightArrowUrl} />
                  </LinkContainer>
                </CardContentSmall>
              </CardSmall>
            ),
          )}
        </CardContainer>
        <SectionButton onClick={() => navigate('/events')}>
          了解更多
        </SectionButton>
      </SectionContainer>
    </SectionWrapper>
  )
}
