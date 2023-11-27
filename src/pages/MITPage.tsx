import React from 'react'
import styled from 'styled-components'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/MIT/cover.png'
import rightArrowUrl from '@/assets/MIT/right-arrow.svg'
import bgSubTtlUrl from '@/assets/MIT/bg-sub-ttl.png'
import bgSecBgUrl from '@/assets/MIT/bg-bg.png'
import contSubTtlUrl from '@/assets/MIT/cont-sub-ttl.png'
import contDelIllUrl from '@/assets/MIT/cont-del-ill.png'
import hlSubTtlUrl from '@/assets/MIT/hl-sub-ttl.png'
import hlIllUrl from '@/assets/MIT/hl-ill.png'
import hlTxtPfxUrl from '@/assets/MIT/hl-text-pfx.png'
import spySubTtlUrl from '@/assets/MIT/spy-sub-ttl.png'
import spyBg1 from '@/assets/MIT/spy-bg1.png'
import spyBg2 from '@/assets/MIT/spy-bg2.png'
import spyBg3 from '@/assets/MIT/spy-bg3.png'
import spyBg4 from '@/assets/MIT/spy-bg4.png'
import footRegQRCode from '@/assets/MIT/foot-reg-qr.png'
import footAssQRCode from '@/assets/MIT/foot-ass-qr.png'

const { Heading, Paragraph } = Typography
const { CNHead1, CNHead5, CNTitleLarge } = Heading
const { CNBodyLarge, CNBodyMedium } = Paragraph

// top section
const TopSecCtr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.72rem;
  padding-top: 0.72rem;
  background-image: url(${coverUrl});
  background-size: cover;
`
const TopTtl = styled(CNHead1)`
  padding-top: 1.68rem;
  color: #fff;
`
const TopBtn = styled(Button)`
  margin-top: 0.46rem;
  color: #fff;
`
const TopSubBtn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.91rem;
  margin-bottom: 0.48rem;
  padding: 0.13rem 2rem;
  background: rgba(0, 0, 0, 0.09);
  border: 0.01rem solid #fff;
  border-radius: 0.12rem;
`
const TopSubBtnTxt = styled.div`
  padding-right: 0.12rem;
  font-size: 0.2rem;
  font-weight: 400;
  line-height: 1;
  color: #fff;
`
const TopSubBtnIcon = styled.img`
  height: 0.2rem;
  width: 0.2rem;
`

// section
const SecWrap = styled.div`
  position: relative;
`
const SecCtr = styled.div`
  /* min-height: 6.4rem; */
  display: flex;
  flex-direction: column;
  padding-inline: 1.2rem;
  color: #252931;
  max-width: 1440px;
  margin-inline: auto;
`
const SecSubTtl = styled.img`
  height: 0.38rem;
  width: min-content;
`
const SecTtl = styled.div`
  font-size: 0.4rem;
  font-weight: 600;
`

// background section
const BgWrap = styled(SecWrap)``
const BgCtr = styled(SecCtr)`
  padding-block: 0.7rem 1.17rem;
`
const BgSubTtl = styled(SecSubTtl)``
const BgTtl = styled(SecTtl)``
const BgTxtTop = styled(CNBodyLarge)`
  padding-top: 0.61rem;
`
const BgCardCtr = styled.div`
  display: flex;
  gap: 0.39rem;
  padding-top: 0.59rem;
`
const BgCard = styled.div`
  padding: 0.12rem 0.23rem 0.16rem;
  background: #fff;
  border-radius: 0.16rem;
  box-shadow: 0px 6px 32px 0px rgba(37, 41, 49, 0.06);
`
const BgCardTtl = styled.div`
  font-size: 0.38rem;
  font-weight: 600;
  color: #7680dd;
`
const BgCardTxt = styled.div`
  padding-top: 0.07rem;
  color: #626262;
  font-size: 0.16rem;
  line-height: 0.2956rem;
`
const BgTxtBtm = styled(CNBodyLarge)`
  padding-top: 0.87rem;
`
const BgBg = styled.img`
  position: absolute;
  z-index: -100;
  top: 0;
  width: 100%;
  height: 100%;
`

// content section
const ContWrap = styled(SecWrap)`
  background: linear-gradient(
    106deg,
    #e4f4ff -1.1%,
    #f9fcff 47.11%,
    #edf6fc 102.52%
  );
`
const ContCtr = styled(SecCtr)`
  min-height: 6.4rem;
  padding-block: 0.7rem 1.49rem;
`
const ContSubTtl = styled(SecSubTtl)`
  height: 0.26rem;
`
const ContTtl = styled(SecTtl)``
// detail
const ContDetCard = styled.div`
  display: flex;
  margin-top: 0.8rem;
  background: #fff;
  border-radius: 0.16rem;
`
const ContDetCont = styled.div`
  padding: 0.49rem 0.38rem 0.82rem;
`
const ContDetTtl = styled(CNHead5)`
  color: #000;
`
const ContDetTxt = styled(CNBodyLarge)`
  padding-top: 0.32rem;
  color: #565960;
`
type ContDetStepItemProps = {
  isActive: boolean
}
const ContDetStepCtr = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.21rem;
  padding-top: 0.48rem;
`
const ContDetStepLine = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 0;
  width: 100%;
  height: 0.01rem;
  background: #565960;
`
const ContDetStepItem = styled.div<ContDetStepItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => (props.isActive ? '#fff' : '#565960')};
`
const ContDetStepItemName = styled(CNTitleLarge)<ContDetStepItemProps>`
  padding: 0.2rem 0.44rem;
  background: ${props => (props.isActive ? '#7680DD' : '#fff')};
  border-radius: 0.08rem;
  box-shadow: 0px 4px 9px 0px
    ${props => (props.isActive ? 'rgba(30, 25, 255, 0.31)' : 'transparent')};
  border: ${props => (props.isActive ? 'none' : '0.01rem solid #1966FF')};
`
const ContDetStepItemTriangle = styled.div<ContDetStepItemProps>`
  margin-top: -0.14rem;
  width: 0.48rem;
  height: 0.48rem;
  transform: rotate(45deg);
  background: ${props =>
    props.isActive
      ? 'linear-gradient(-45deg,rgba(25, 102, 255, 0.5) 0,rgba(25, 102, 255, 0) 50%)'
      : 'linear-gradient(-45deg,rgba(86, 89, 96, 0.5) 0,rgba(25, 102, 255, 0) 50%)'};
`
const ContDetStepItemDot = styled.div<ContDetStepItemProps>`
  margin-top: 0.02rem;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background: ${props => (props.isActive ? '#7680dd' : '#565960')};
`
const ContDetStepItemTxt = styled(CNBodyLarge)`
  padding-top: 0.23rem;
  color: #000;
  font-weight: 600;
`
const ContDetIll = styled.img`
  margin-top: -0.13rem;
  width: 4.2rem;
  border-radius: 0.16rem;
`
// content
const ContContCtr = styled.div`
  margin-top: 0.8rem;
  padding-inline: 0.36rem;
`
const ContContTtl = styled(CNHead5)`
  color: #000;
`
const ContContCont = styled.div`
  margin-top: calc(1.12rem - 0.8rem);
  width: min-content;
  margin-inline: auto;
`
const ContContHeadCtr = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  color: #fff;
`
const ContContHead = styled.div`
  background: #7680dd;
  padding-block: 0.14rem;
  border-radius: 0.08rem;
  margin-bottom: 0.38rem;
`
const ContContHead1 = styled(ContContHead)`
  margin-left: 0.8533rem;
  width: 2.24rem;
  text-align: center;
`
const ContContHead2 = styled(ContContHead)`
  margin-left: 0.96rem;
  padding-inline: 1.97rem;
`
const ContContCardCtr = styled.div`
  position: relative;
`
const ContContCard = styled.div`
  display: flex;
  background: #fff;
  border-radius: 0.16rem;
  font-size: 0.2rem;
  font-weight: 700;
  margin-bottom: 0.34rem;
`
const ContContCardHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 0.8533rem;
  padding-inline: 0.2rem;
  background: rgba(118, 128, 221, 0.22);
  border-radius: 0.08rem;
`
const ContContCardCont = styled.div`
  white-space: nowrap;
  padding-block: 0.2rem;
`
const ContContCardRaw = styled.div`
  display: flex;
  padding-block: 0.15rem;
`
const ContContCardRawTtl = styled.div`
  position: relative;
  width: 2.24rem;
  height: min-content;
  padding-left: 1.17rem;
  color: #222;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    display: inline-block;
    width: 0.09rem;
    height: 0.09rem;
    background: #7680dd;
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
`
const ContContCardRawCtr = styled.div`
  padding-inline: 0.96rem;
`
const ContContCardRawCtrTxt = styled.div`
  color: #222;
`
const ContContCardRawCtrDesCtr = styled.div`
  padding-top: 0.11rem;
`
const ContContCardRawCtrDes = styled.div`
  font-size: 0.16rem;
  color: #444;
`
const ContContLine = styled.div`
  position: absolute;
  left: calc(2.24rem + 0.85rem);
  bottom: 2%;
  width: 0.01rem;
  height: 96%;
  background: #7680dd;
`

// highlights section
const HlSecWrap = styled(SecWrap)`
  background: linear-gradient(180deg, #f9fffe 4.64%, #fff 168.71%);
`
const HlSecCtr = styled(SecCtr)`
  padding-block: 0.7rem 1.45rem;
`
const HlSubTtl = styled(SecSubTtl)``
const HlTtl = styled(SecTtl)``
const HlCont = styled.div`
  display: flex;
  align-items: center;
  gap: 0.32rem;
  margin-top: 0.97rem;
`
const HlContIll = styled.img`
  width: 5.2021rem;
`
const HlContContCtr = styled.div``
const HlContPCtr = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.22rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const HlContPPfx = styled.img`
  margin-right: 0.07rem;
  width: 0.44954rem;
  height: 0.44954rem;
`
const HlContP = styled(CNBodyLarge)``

// supply station section
const SpyWrap = styled(SecWrap)`
  background: linear-gradient(180deg, #f9fffe 4.64%, #fff 168.71%);
`
const SpyCtr = styled(SecCtr)`
  padding-block: 0.7rem 2.06rem;
`
const SpySubTtl = styled(SecSubTtl)``
const SpyTtl = styled(SecTtl)``
const SpyCont = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.34rem 0.21rem;
  padding-top: 1rem;
`
const SpyCard = styled.img`
  width: 100%;
`

// Footer section
const FootSecWarp = styled(SecWrap)`
  background: #fafafa;
`
const FootSecCtr = styled(SecCtr)`
  padding-block: 0.44rem 0.56rem;
`
const FootSecTxtCtr = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.46rem 0.49rem;
`
const FootSecCont = styled.div``
const FootSecTtl = styled.div`
  color: #333;
  font-size: 0.2rem;
  line-height: 0.28rem;
  height: min-content;
`
const FootSecTxt = styled(CNBodyMedium)`
  padding-top: 0.16rem;
  color: #666;
  font-size: 0.16rem;
  line-height: 0.22rem;
`
const FootQRCtr = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.49rem;
  padding-top: 0.42rem;
`
const FootSecQR = styled.img`
  width: 2.17809rem;
`
const FootSecLink = styled(CNTitleLarge)`
  padding-top: 0.41rem;
  color: #333;
`

export default () => {
  return (
    <React.Fragment>
      <TopSec />
      <BgSec />
      <ContSec />
      <HlSec />
      <SpySec />
      <FootSec />
    </React.Fragment>
  )
}

const TopSec: React.FC = () => {
  return (
    <TopSecCtr>
      <TopTtl>MIT体系结构公开课学习社区</TopTtl>
      <TopBtn>立即报名</TopBtn>
      <TopSubBtn>
        <TopSubBtnTxt>点击查看荣誉榜单</TopSubBtnTxt>
        <TopSubBtnIcon src={rightArrowUrl} />
      </TopSubBtn>
    </TopSecCtr>
  )
}

const BgSec: React.FC = () => {
  return (
    <BgWrap>
      <BgCtr>
        <BgSubTtl src={bgSubTtlUrl} />
        <BgTtl>项目背景</BgTtl>
        <BgTxtTop>
          随着芯片技术自主可控成为国家重要的战略发展规划，对芯片设计相关领域的人才需求也在快速增长。体系结构课程相对于硬件设计的重要性可以类比于设计模式相对于软件设计的重要性，扎实的体系结构基础是设计复杂硬件的基石。然而现实情况是，虽然国内大专院校计算机学科、电子工程学科、微电子等都有开设体系结构或组成原理等相关课程，但由于前些年对相关教学重视度不够，导致教学实践环节存在诸多缺失，毕业生掌握的技能与工业界的期望之间存在较大差距，例如：
        </BgTxtTop>
        <BgCardCtr>
          <BgCard>
            <BgCardTtl>01</BgCardTtl>
            <BgCardTxt>
              教学内容局限在基础知识，而对于业界所需的诸多技术（例如异常处理、缓存技术、内存管理、多核一致性等）往往在教学中一笔带过。
            </BgCardTxt>
          </BgCard>
          <BgCard>
            <BgCardTtl>02</BgCardTtl>
            <BgCardTxt>
              实验、大作业、课程设计等实操环节过于简单，很少有系统级别的实验项目，学生在动手实践环节投入的精力有限，通常只需要编写HDL代码即可顺利完成相关考核，而对于前期开发环境搭建、后期验证调试、性能调优等基本不会涉及。
            </BgCardTxt>
          </BgCard>
          <BgCard>
            <BgCardTtl>03</BgCardTtl>
            <BgCardTxt>
              学科领域泾渭分明，软硬件结合部分训练缺失。软件相关专业课程对硬件相关知识经常快速略过，而硬件相关专业课程也较少涉及上层软件相关的知识。
            </BgCardTxt>
          </BgCard>
        </BgCardCtr>
        <BgTxtBtm>
          为了解决上述问题，我们很高兴看到已经有类似“一生一芯”这样的项目启动并取得了很好的成果，但“一生一芯”项目主要解决了上述的问题2和问题3，而对于工业界实际需要的技能，如多核处理器技术及多核下的数据一致性问题等，依旧存在覆盖上的缺失。
        </BgTxtBtm>
      </BgCtr>
      <BgBg src={bgSecBgUrl} />
    </BgWrap>
  )
}

const ContSec: React.FC = () => {
  return (
    <ContWrap>
      <ContCtr>
        <ContSubTtl src={contSubTtlUrl} />
        <ContTtl>课程内容</ContTtl>
        <ContSecDet />
        <ContSecCont />
      </ContCtr>
    </ContWrap>
  )
}

const ContSecDet: React.FC = () => {
  return (
    <ContDetCard>
      <ContDetCont>
        <ContDetTtl>详情说明</ContDetTtl>
        <ContDetTxt>
          为了进一步缩小学生能力与业界期望之间的差距，我们找到了MIT体系结构方面的3门公开课及其对应的课程实验，希望通过学习公开课并亲自动手完成实验的方式，进一步增加学生的动手实践能力以及解决实际问题的能力。对这些公开课的说明如下：
        </ContDetTxt>
        <ContDetTxt>
          三门公开课难度级别分别对应本科必修课（6.004）、硕士必修课（6.175）以及实践选修课（6.375）
        </ContDetTxt>
        <ContDetStepCtr>
          <ContDetStepLine />
          <ContDetStepItem isActive={true}>
            <ContDetStepItemName isActive={true}>MIT6.004</ContDetStepItemName>
            <ContDetStepItemTriangle isActive={true}></ContDetStepItemTriangle>
            <ContDetStepItemDot isActive={true}></ContDetStepItemDot>
            <ContDetStepItemTxt>第一阶段</ContDetStepItemTxt>
          </ContDetStepItem>
          <ContDetStepItem isActive={false}>
            <ContDetStepItemName isActive={false}>MIT6.375</ContDetStepItemName>
            <ContDetStepItemTriangle isActive={false}></ContDetStepItemTriangle>
            <ContDetStepItemDot isActive={false}></ContDetStepItemDot>
            <ContDetStepItemTxt>第二阶段</ContDetStepItemTxt>
          </ContDetStepItem>
          <ContDetStepItem isActive={false}>
            <ContDetStepItemName isActive={false}>MIT6.175</ContDetStepItemName>
            <ContDetStepItemTriangle isActive={false}></ContDetStepItemTriangle>
            <ContDetStepItemDot isActive={false}></ContDetStepItemDot>
            <ContDetStepItemTxt>第三阶段</ContDetStepItemTxt>
          </ContDetStepItem>
        </ContDetStepCtr>
        <ContDetTxt>
          内容涵盖了组合逻辑、简单时序逻辑、流水线及流式数据处理、RISC-V指令集架构、RISC-V处理器实现、Cache、中断异常、Non-Blocking
          Cache、多核处理器、Cache
          Coherence等。该课程及实验的授课老师为MIT的Arvind教授，他也是新一代开源HDL语言Bluespec
          SystemVerilog的发明人，因此该课程的全部实验也采用Bluespec进行RTL的编写。
        </ContDetTxt>
        <ContDetTxt>
          在学习三门公开课的同时，我们也自己加入了一些专项训练内容，例如AXI协议握手、流式编程在控制通路上的应用等，从而进一步提升参与者的能力，加深对硬件设计中并发性和流水线的理解。
        </ContDetTxt>
      </ContDetCont>
      <ContDetIll src={contDelIllUrl} />
    </ContDetCard>
  )
}

const ContSecCont: React.FC = () => {
  return (
    <ContContCtr>
      <ContContTtl>培训内容</ContContTtl>
      <ContContCont>
        <ContContHeadCtr>
          <ContContHead1>序号</ContContHead1>
          <ContContHead2>实验内容</ContContHead2>
        </ContContHeadCtr>
        <ContContCardCtr>
          <ContContCard>
            <ContContCardHead>第一阶段</ContContCardHead>
            <ContContCardCont>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab0</ContContCardRawTtl>
                <ContContCardRawCtr>实验环境搭建</ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab1</ContContCardRawTtl>
                <ContContCardRawCtr>多路复用器和加法器</ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab2</ContContCardRawTtl>
                <ContContCardRawCtr>乘法器</ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab3</ContContCardRawTtl>
                <ContContCardRawCtr>流水线</ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab4</ContContCardRawTtl>
                <ContContCardRawCtr>
                  FIFO(Bypass/Pass through/Concurrent)
                </ContContCardRawCtr>
              </ContContCardRaw>
            </ContContCardCont>
          </ContContCard>
          <ContContCard>
            <ContContCardHead>第二阶段</ContContCardHead>
            <ContContCardCont>
              <ContContCardRaw>
                <ContContCardRawTtl>专项1</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    AXI总线握手打拍与反压机制
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>专项2</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>流式数据处理</ContContCardRawCtrTxt>
                  <ContContCardRawCtrDesCtr>
                    <ContContCardRawCtrDes>
                      简单音频处理流水线
                    </ContContCardRawCtrDes>
                    <ContContCardRawCtrDes>
                      音频处理扩展：FFT
                    </ContContCardRawCtrDes>
                    <ContContCardRawCtrDes>
                      音频处理扩展：Pitch Shifting
                    </ContContCardRawCtrDes>
                    <ContContCardRawCtrDes>
                      流水线的软硬件联调仿真
                    </ContContCardRawCtrDes>
                  </ContContCardRawCtrDesCtr>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>专项3</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    网络设备中的流式数据包处理
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
            </ContContCardCont>
          </ContContCard>
          <ContContCard>
            <ContContCardHead>第三阶段</ContContCardHead>
            <ContContCardCont>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab5</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    单周期及多周期RISC-V处理器
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab6</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    支持分支预测及6级流水的RISC-V处理器
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab7</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    具备ICache和DCache的RISC-V处理器
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Lab8</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    支持异常处理的RISC-V处理器
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Project1</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    支持乱序执行的RISC-V处理器（Store Queue）
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
              <ContContCardRaw>
                <ContContCardRawTtl>Project2</ContContCardRawTtl>
                <ContContCardRawCtr>
                  <ContContCardRawCtrTxt>
                    多核处理器及缓存一致性（基于MSI协议）
                  </ContContCardRawCtrTxt>
                </ContContCardRawCtr>
              </ContContCardRaw>
            </ContContCardCont>
          </ContContCard>
          <ContContLine />
        </ContContCardCtr>
      </ContContCont>
    </ContContCtr>
  )
}

const HlSec: React.FC = () => {
  return (
    <HlSecWrap>
      <HlSecCtr>
        <HlSubTtl src={hlSubTtlUrl} />
        <HlTtl>项目课程亮点</HlTtl>
        <HlCont>
          <HlContIll src={hlIllUrl} />
          <HlContContCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>
                课程及实验安排由浅入深，并在最终到达相当的深度，既可作为“一生一芯”项目的补充课程，也可作为独立项目进行学习。
              </HlContP>
            </HlContPCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>
                采用Bluespec作为实验语言，具有更强的抽象表达能力，可以更高效的实现复杂功能，使得学生可以把精力更集中的放在架构设计上。
              </HlContP>
            </HlContPCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>注重软硬件联合开发，培养软硬通吃的复合型人才。</HlContP>
            </HlContPCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>
                课程时间安排紧凑，内容丰富，学生通常可以通过2~3个月的业余时间即可自学完成所有实验。
              </HlContP>
            </HlContPCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>
                主要课程资料均为英文，有助于锻炼国外文献阅读能力。
              </HlContP>
            </HlContPCtr>
            <HlContPCtr>
              <HlContPPfx src={hlTxtPfxUrl} />
              <HlContP>全开源、社区化</HlContP>
            </HlContPCtr>
          </HlContContCtr>
        </HlCont>
      </HlSecCtr>
    </HlSecWrap>
  )
}

const SpySec: React.FC = () => {
  return (
    <SpyWrap>
      <SpyCtr>
        <SpySubTtl src={spySubTtlUrl} />
        <SpyTtl>新手上路补给站</SpyTtl>
        <SpyCont>
          <SpyCard src={spyBg1}></SpyCard>
          <SpyCard src={spyBg2}></SpyCard>
          <SpyCard src={spyBg3}></SpyCard>
          <SpyCard src={spyBg4}></SpyCard>
        </SpyCont>
      </SpyCtr>
    </SpyWrap>
  )
}

const FootSec: React.FC = () => {
  return (
    <FootSecWarp>
      <FootSecCtr>
        <FootSecTxtCtr>
          <FootSecCont style={{ gridColumnStart: 'span 2' }}>
            <FootSecTtl>申明</FootSecTtl>
            <FootSecTxt>
              MIT体系结构公开课学习社区项目以学习者自学开源的MIT三门公开课为主，社区内大家互相监督和交流，社区有助教在线答疑，帮助有志于从事数字芯片设计的同学强化体系结构基础知识，提升数字芯片设计的能力。
            </FootSecTxt>
          </FootSecCont>
          <FootSecCont>
            <FootSecTtl>报名表</FootSecTtl>
            <FootSecTxt>
              请扫描二维码，填写报名表，加入MIT体系结构公开课学习社区项目。报名成功后，将收到邮件确认。
            </FootSecTxt>
          </FootSecCont>
          <FootSecCont>
            <FootSecTtl>咨询</FootSecTtl>
            <FootSecTxt>
              关于MIT体系结构公开课学习社区项目有任何问题或疑问，可以邮件：ta@datenlord.com或添加DatenLord小助手微信咨询。
            </FootSecTxt>
          </FootSecCont>
        </FootSecTxtCtr>
        <FootQRCtr>
          <FootSecQR src={footRegQRCode} />
          <FootSecQR src={footAssQRCode} />
        </FootQRCtr>
        <FootSecLink>往届学员{'>>'}</FootSecLink>
      </FootSecCtr>
    </FootSecWarp>
  )
}
