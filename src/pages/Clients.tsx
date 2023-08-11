import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import { UseSection } from './Home/UseSection'

import coverUrl from '@/assets/clients/cover.png'
import SJTULogoUrl from '@/assets/clients/SJTU-logo.png'
import BUPTLogoUrl from '@/assets/clients/BUPT-logo.png'
import RUCLogoUrl from '@/assets/clients/RUC-logo.png'
import SCUTLogoUrl from '@/assets/clients/SCUT-logo.png'
import SBULogoUrl from '@/assets/clients/SBU-logo.png'
import imageUrl from '@/assets/clients/image.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNHead5 } = Heading
const { CNBodyLarge } = Paragraph

const SectionWrapper = styled.section`
  background: ${props => props.theme.white00};
  background: linear-gradient(180deg, #BFC5FB, #BFC5FB00 50%);
`
const SectionContainer = styled.div`
  padding-top: 1.48rem;
  max-width: 1440px;
  margin-inline: auto;
  padding-bottom: 0.79rem;
  padding-inline: 2.03rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 0.5rem;
  text-align: center;
`
const SectionSubTitle = styled(CNBodyLarge)`
  padding-bottom: 0.52rem;
  margin-bottom: 1rem;
  border-bottom: 0.01rem solid ${props => props.theme.secondary02};
  text-align: center;
`
const SectionContent = styled.div`
  display: flex;
  justify-content: space-between;
`
const LogoContainer = styled.div`
  display: grid;
  grid-gap: 0.3rem 0.2rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 57%;
  /* height: 11rem; */
`
const TextContainer = styled.ul`
  width: 37%;
  list-style-type: none;
`
const Logo = styled.img`
  width: 100%;
  /* height: 100%; */
`
const SJTULogo = styled(Logo)`
  grid-area: 1 / 2 / 2 / 4;
`
const BUPTLogo = styled(Logo)`
  grid-area: 2 / 1 / 3 / 3;
`
const RUCLogo = styled(Logo)`
  grid-area: 2 / 3 / 3 / 5;
`
const SCUTLogo = styled(Logo)`
  width: 120%;
  transform: translateX(-10%);
  grid-area: 3/ 2 / 4 / 4;
`
const SBULogo = styled(Logo)`
  transform: translateX(5%);
  width: 90%;
  grid-area: 4 / 2 / 5 / 4;
`
// const List = styled.ul``
const ListItem = styled.li`
  padding-bottom: 0.46rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const ItemTitle = styled(CNHead5)`
  padding-bottom: 0.16rem;
  color: ${props => props.theme.secondary01};
`
const ItemText = styled(CNBodyLarge)``
const Image = styled.img`
  width: 100%;
  padding-bottom: 1.18rem;
`

const items = [
  {
    title: '高性能跨云SaaS服务基础',
    content: [
      {
        text: '上海交通大学',
      },
      {
        text: ' 合作项目：利用RDMA加速serverless的性能',
      },
    ],
  },
  {
    title: '高性能跨云网络基础',
    content: [
      {
        text: '北京邮电大学 合作项目：RDMA的流量控制',
      },
      {
        text: ' 中国人民大学 合作项目：RDMA传输层优化',
      },
    ],
  },
  {
    title: '高性能网络硬件支持',
    content: [
      {
        text: '华南理工大学',
      },
      {
        text: '合作项目：硬件敏捷开发和验证',
      },
    ],
  },
  {
    title: '高性能跨云一致性算法',
    content: [
      {
        text: '美国石溪大学',
      },
      {
        text: '合作项目：分布式一致性',
      },
    ],
  },
]

export default () => {
  const { sectionId } = useParams()
  useEffect(() => {
    const sectionEl = document.querySelector(`#${sectionId}`)
    if (sectionEl) {
      sectionEl?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [sectionId])
  return (
    <React.Fragment>
      <Cover
        cover={coverUrl}
        subTitle="通过实现跨云、跨数据中心的数据高速访问，DatenLord将大大提升存储系统的可扩展性，同时大大降低企业级IT业务系统在实现高可用性、多活方面的复杂性。随着多云、多数据中心成为企业级IT的主流架构，跨云分布式存储将在互联网、金融、电信、能源等不同行业得到广泛应用。"
      >
        客 户
      </Cover>
      <UseSection />
      <SectionWrapper id="project-cooperation">
        <SectionContainer>
          <Image src={imageUrl} />
          <SectionTitle>产学研项目合作</SectionTitle>
          <SectionSubTitle>
            DatenLord积极推动产学研合作，与国内外各大高校的顶尖实验室合作，在高性能跨云SaaS服务基础、高性能跨云网络基础、高性能网络硬件支持和高性能跨云网络一致性算法领域共同进行深入的前瞻研究和实践落地。
          </SectionSubTitle>
          <SectionContent>
            <LogoContainer>
              <SJTULogo src={SJTULogoUrl} />
              <BUPTLogo src={BUPTLogoUrl} />
              <RUCLogo src={RUCLogoUrl} />
              <SCUTLogo src={SCUTLogoUrl} />
              <SBULogo src={SBULogoUrl} />
            </LogoContainer>
            <TextContainer>
              {items.map(({ title, content }, index) => (
                <ListItem key={index}>
                  <ItemTitle>{title}</ItemTitle>
                  {content.map(({ text }, index) => (
                    <ItemText key={index}>{text}</ItemText>
                  ))}
                </ListItem>
              ))}
            </TextContainer>
          </SectionContent>
        </SectionContainer>
      </SectionWrapper>
    </React.Fragment>
  )
}
