import styled from 'styled-components'

import bgUrl from '@/assets/RDMA-NIC/bg.png'
import coverUrl from '@/assets/RDMA-NIC/cover.png'
import image1Url from '@/assets/RDMA-NIC/image1.png'
import image2Url from '@/assets/RDMA-NIC/image2.png'
import image3Url from '@/assets/RDMA-NIC/image3.png'
import image4Url from '@/assets/RDMA-NIC/image4.png'
import image5Url from '@/assets/RDMA-NIC/image5.png'

const SectWrap = styled.div`
  background: #fff;
`

const Sect1Box = styled.div`
  position: relative;
  width: 100%;
  background: #000;
`

const SectPinkBg = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  angle: 0 deg;
  opacity: 1;
  background: #F529B5D6;
  filter: blur(100px);
`

const SectPinkBlue = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  angle: 0 deg;
  opacity: 1;
  background: #0356CA;
  filter: blur(100px);
`

const SectCtn = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`

const Sect1Header = styled.div`
  text-align: center;
  color: #D9DBEF;
  font-size: 0.26rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const SectMain = styled.div`
  display: flex;
  gap: 0.56rem;
`

const SectCtnCard = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5) ;
  background-color: #0000004D;
  padding: 0.32rem;
`

const SectCtnCardHeader = styled.div`
  color: #A5BDFF;
  font-weight: 600;
  font-size: 0.2rem;
`

const SectCtnCardTittle = styled.div`
  margin-top: 0.26rem;
  color: #D9DBEF;
  font-weight: 600;
  font-size: 0.16rem;
`

const SectCtnCardText = styled.div`
  color: #D9DBEFCC;
  font-size: 0.14rem;
`

const Sect2Box = styled.div`
  width: 100%;
  background: #fff;
`

const Sect2Header = styled.div`
  text-align: center;
  color: #282828;
  font-size: 0.26rem;
  font-weight: 500;
  margin-bottom: 1rem;
`

const SectTex = styled.div`
  text-align: center;
  margin-bottom: 0.8rem;
`

const Sect2TexTittle = styled.div`
  color: #4F4F4F;
  font-size: 0.26rem;
  font-weight: 600;
`

const Sect2TexMain = styled.div`
  color: #000000A6;
  font-size: 0.18rem;
`

const SectImg = styled.img`
	width: 100%;
`

const Sect3Box = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #000000 0%, #1B1C2A 100%);
`

const Sect3TexTittle = styled.div`
  color: #fff;
  font-size: 0.26rem;
  font-weight: 600;
`

const Sect3TexMain = styled.div`
  color: #FFFFFFA6;
  font-size: 0.18rem;
`

const Sect3Card = styled.div`
  color: #fff;
  width: 100%;
  font-size: 0.18rem;
  text-align: center;
`

const Sect3Card1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 12px;
  padding: 0.32rem;
  background: linear-gradient(134.21deg, #01ECFB 1.34%, #8310F5 99.49%);
`

const Sect3Card2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 12px;
  padding: 0.32rem;
  background: linear-gradient(135deg, #D81AF6 0%, #0094FF 100%);
`

const Sect3Card3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 12px;
  padding: 0.32rem;
  background: linear-gradient(135deg, #01FB83 0%, #F110F5 99.48%);
`

const Sect3Card4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  border-radius: 12px;
  padding: 0.32rem;
  background: linear-gradient(135deg, #FBE201 0%, #F110F5 100%);
`

const Sect4Box = styled.div`
  position: relative;
  height: 3.5rem;
  overflow: hidden;
`

const SectBgImg = styled.img`
  z-index: 0;
	width: 100%;
  position: absolute;
  left: 0;
  bottom: -1.2rem;
`

const Sect4Cnt = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 0.6rem;
  z-index: 1;
	width: 100%;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`

const SectIconImg = styled.img`
	height: 1rem
`

const SCover = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -0.72rem;
  padding-top: 0.72rem;
  height: 6.6rem;
  background: linear-gradient(121.54deg, #FFFFFF 18.78%, #A9ADBB 80.74%);
`

const Img = styled.img`
  width: 9rem;
`

const Span = styled.span`
  font-size: 0.3rem;
  font-weight: 600;
  padding: 3px 20px;
  border: 2px solid #000;
  border-radius: 28px;
`

const OrangeSpan = styled.span`
  color: #F2994A;
  font-size: 0.14rem;
`

export default () => {
  return (
    <>
      <SCover>
        <Img src={bgUrl} />
        <Span>RDMA 网卡</Span>
      </SCover>
      <SectWrap>
        <Sect1Box>
          <SectPinkBg></SectPinkBg>
          <SectPinkBlue></SectPinkBlue>
          <SectCtn>
            <Sect1Header>高性能RDMA网卡的亮点</Sect1Header>
            <SectMain>
              <SectCtnCard>
                <SectCtnCardHeader>高性能 / AI 场景深度优化</SectCtnCardHeader>
                <SectCtnCardTittle>高带宽 & 低时延</SectCtnCardTittle>
                <SectCtnCardText>支持 100Gbps / 200Gbps / 400Gbps 多种方案，可满足大模型应用的海量数据传输需求</SectCtnCardText>
                <SectCtnCardTittle>容忍恶劣网络环境</SectCtnCardTittle>
                <SectCtnCardText>自研通信协议，丢包率高、网络抖动大的环境下仍能保持稳定高效传输</SectCtnCardText>
                <SectCtnCardTittle>透明故障转移</SectCtnCardTittle>
                <SectCtnCardText>与上层开源通信栈无缝衔接，发生链路或节点故障时可自动切换，保障持续服务</SectCtnCardText>
              </SectCtnCard>
              <SectCtnCard>
                <SectCtnCardHeader>开源开放</SectCtnCardHeader>
                <SectCtnCardTittle>100Gbps网卡硬件设计开源</SectCtnCardTittle>
                <SectCtnCardText>开放整套100Gbps网卡硬件设计，满足二次定制开发的需求</SectCtnCardText>
                <SectCtnCardTittle>驱动程序全部开源</SectCtnCardTittle>
                <SectCtnCardText>RDMA网卡采用重用户态的驱动程序设计思路，并采用先进的Rust语言作为主要开发语言。易于维护和调试，对于二次开发和功能扩展非常友好</SectCtnCardText>
                <SectCtnCardTittle>兼容多种操作系统与平台</SectCtnCardTittle>
                <SectCtnCardText>支持国产操作系统及主流 Linux 发行版，可在异构环境中灵活部署</SectCtnCardText>
              </SectCtnCard>
              <SectCtnCard>
                <SectCtnCardHeader>易用性</SectCtnCardHeader>
                <SectCtnCardTittle>零配置 <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>网卡自动识别集群环境并完成关键参数调优，无需繁琐手动配置</SectCtnCardText>
                <SectCtnCardTittle>可视化驱动与管理工具 <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>提供开源驱动与监控接口，方便集群运维与生态扩展</SectCtnCardText>
                <SectCtnCardTittle>自动化运维 <OrangeSpan>*</OrangeSpan></SectCtnCardTittle>
                <SectCtnCardText>监控、告警与日志功能齐全，故障排查更高效</SectCtnCardText>
                <SectCtnCardTittle><OrangeSpan>* 即将支持</OrangeSpan></SectCtnCardTittle>
              </SectCtnCard>
            </SectMain>
          </SectCtn>
        </Sect1Box>
        <Sect2Box>
          <SectCtn>
            <Sect2Header>主要产品：自研高性能 RDMA 网卡，适配国产化 AI 算力生态</Sect2Header>
            <SectTex>
              <Sect2TexTittle>高性能 RDMA 网卡</Sect2TexTittle>
              <Sect2TexMain>高性能网络、总线、存储接口，满足海量数据传输与存储需求</Sect2TexMain>
              <Sect2TexMain>专门为AI大模型场景打造，满足AI大模型的高性能需求</Sect2TexMain>
            </SectTex>
            <SectImg src={image1Url} />
          </SectCtn>
        </Sect2Box>
        <Sect3Box>
          <SectCtn>
            <SectTex>
              <Sect3TexTittle>功能强大</Sect3TexTittle>
              <Sect3TexMain>网卡设计优先保证吞吐性能，限制不超过 1024 个连接数量</Sect3TexMain>
              <Sect3TexMain>极大简化大规模组网复杂度，支持千卡、万卡集群组网</Sect3TexMain>
            </SectTex>
            <SectMain>
              <Sect3Card><Sect3Card1>支持有损以太网允许网络丢包</Sect3Card1></Sect3Card>
              <Sect3Card><Sect3Card2>容忍网络包乱序到达</Sect3Card2></Sect3Card>
              <Sect3Card><Sect3Card3>支持按照 400G 线速收包保证网络吞吐性能</Sect3Card3></Sect3Card>
              <Sect3Card><Sect3Card4>针对AI大模型任务特点深度优化的拥塞控制，不采用 PFC 机制，简化网络管理维护复杂度</Sect3Card4></Sect3Card>
            </SectMain>
          </SectCtn>
        </Sect3Box>
        <Sect2Box>
          <SectCtn>
            <Sect2Header>核心软件功能</Sect2Header>
            <SectImg src={image2Url} />
          </SectCtn>
        </Sect2Box>
        <Sect4Box>
          <SectBgImg src={coverUrl} />
          <Sect4Cnt>
            <div>
              <Sect3TexTittle>良好的兼容性</Sect3TexTittle>
              <Sect3TexMain>特别适配 SONiC 白盒交换机</Sect3TexMain>
              <Sect3TexMain>100% 兼容英伟达 GPU</Sect3TexMain>
              <Sect3TexMain>100% 兼容 AMD GPU</Sect3TexMain>
            </div>
            <div>
              <Sect3TexTittle>良好的适配性</Sect3TexTittle>
              <Sect3TexMain>适配中科海光的国产 GPU</Sect3TexMain>
              <Sect3TexMain>正在适配其他国产 AI 硬件</Sect3TexMain>
              <Sect3TexMain>专门解决国产 GPU 搭建大规模集群的组网难题</Sect3TexMain>
            </div>
            <SectIconImg src={image3Url} />
            <SectIconImg src={image4Url} />
            <SectIconImg src={image5Url} />
          </Sect4Cnt>
        </Sect4Box>
      </SectWrap>
    </>
  )
}
