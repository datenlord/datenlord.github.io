import { useEffect } from 'react'

import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'

import coverUrl from '@/assets/service/cover.png'
import imgUrl from '@/assets/service/image.png'
import icon1Url from '@/assets/service/icon1.png'
import icon2Url from '@/assets/service/icon2.png'
import icon3Url from '@/assets/service/icon3.png'
import icon4Url from '@/assets/service/icon4.png'
import icon5Url from '@/assets/service/icon5.png'

const { Heading } = Typography
const { CNHead4 } = Heading

const SectWrap = styled.div`
  background: #fff;
`
const SectCtn = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.87rem;
`
const Line = styled.div`
  flex: 1;
  height: 0.01rem;
`
const LeftLine = styled(Line)`
  background: linear-gradient(90deg, #7b7ce340, #926cd3);
`
const RightLine = styled(Line)`
  background: linear-gradient(270deg, #7b7ce340, #926cd3);
`
const Title = styled(CNHead4)`
  font-size: 0.36rem;
  color: #7680DD;
  padding-inline: 0.24rem;
`
const Image = styled.img`
  width: 100%;
`
const CardCtr = styled.div`
  display: flex;
  gap: 0.42rem;
  margin-bottom: 0.42rem;
`
const CardHori = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.24rem 0.36rem;
  padding-bottom: 0.84rem;
  border-radius: 0.1rem;
  background: #fff;
  `
const CardVert = styled.div`
  display: flex;
  padding: 0.24rem 0.36rem;
  border-radius: 0.1rem;
  background: #fff;
  `
const CardIcon = styled.img`
    width: 0.56rem;
    height: 0.56rem;
    margin-bottom: 0.28rem;
  `
const CardCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.24rem;
`
const CardTitle = styled.div`
  font-size: 0.18rem;
  line-height: 0.24rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.12rem;
`
const CardTxt = styled.div`
  font-size: 0.14rem;
  line-height: 0.24rem;
  font-weight: 400;
  color: #999999;
`

export default () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Cover cover={coverUrl}>DatenLord Cloud Service</Cover>
      <SectWrap>
        <SectCtn>
          <Image src={imgUrl} />
        </SectCtn>
      </SectWrap>
      <SectWrap style={{ background: '#F7F7F9' }}>
        <SectCtn>
          <TitleContainer>
            <LeftLine />
            <Title>DatenLord 技术创新点</Title>
            <RightLine />
          </TitleContainer>
          <CardCtr>
            <CardHori>
              <CardIcon src={icon1Url} />
              <CardTitle>全新自研架构，实现内核旁路</CardTitle>
              <CardTxt>发挥出新一代存储硬件的高性能。</CardTxt>
            </CardHori>
            <CardHori>
              <CardIcon src={icon2Url} />
              <CardTitle>统一命名空间</CardTitle>
              <CardTxt>实现数据对多个存储接口的互通，满足不同场景需求。</CardTxt>
            </CardHori>
            <CardHori>
              <CardIcon src={icon3Url} />
              <CardTitle>数据的自动化管理</CardTitle>
              <CardTxt>自动化实现数据迁移、备份，并对应用程序透明。</CardTxt>
            </CardHori>
          </CardCtr>
          <CardCtr>
            <CardVert>
              <CardIcon src={icon4Url} />
              <CardCont>
                <CardTitle>支持多种自主体系架构</CardTitle>
                <CardTxt>能够适配更多样性的芯片架构，满足用户的多种需求。</CardTxt>
              </CardCont>
            </CardVert>
            <CardVert>
              <CardIcon src={icon5Url} />
              <CardCont>
                <CardTitle>利用硬件加速存储相关的计算密集型任务</CardTitle>
                <CardTxt>诸如数据加密解密、数据压缩解压缩、音视频编解码、模式识别等场景，有力提升数据存储和处理的性能。</CardTxt>
              </CardCont>
            </CardVert>
          </CardCtr>
        </SectCtn>
      </SectWrap>
    </>
  )
}
