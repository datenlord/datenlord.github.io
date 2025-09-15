import styled from "styled-components"

import addUrl from '@/assets/home/add.png'
import pcUrl from '@/assets/home/pc.png'

const Wrapper = styled.section`
  background: #fff;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.64rem;
  padding-block: 0.94rem;
  padding-bottom: 1.8rem;
`
const Title = styled.div`
    color: #7680DD;
    font-size: 0.42rem;
    line-height: 0.56rem;
    font-weight: 600;
    text-align: center;
    max-width: 72vw;
    padding-inline: 6vw;
    padding-bottom: 0.36rem;
    border-bottom: 0.01rem solid #D9DBEF;
    margin-bottom: 0.64rem;
`
const Section = styled.div`
    padding-bottom: 0.56rem;
    text-align: left;
    width: 100%;
		height: min-content;
		&:last-child {
			padding-bottom: 0;
		}
`
const SectionTitle = styled.div`
    font-size: 0.32rem;
    line-height: 0.58rem;
    font-weight: 600;
    color: #42424A;
`
const SectCont = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.56rem;
`
const SectTxtCnt = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const SectTxt = styled.div`
	font-size: 0.16rem;
	line-height: 0.28rem;
	padding-block: 0.24rem;
`
const SectImg = styled.img`
	width: 45%;
`
const SectBox = styled.div`
	width: 100%;
	margin-block: 0.56rem;
	padding-inline: 0.56rem;
	border-radius: 12px;
	background: linear-gradient(180deg, rgba(187, 202, 243, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%);
`
const SectTittle = styled.div`
	font-size: 0.2rem;
	font-weight: 500;
	padding-block: 0.12rem;
`
const SectTxtTittle = styled.div`
	font-size: 0.2rem;
	font-weight: 500;
	padding-block: 0.24rem;
	&::before {
		content: '';
		display: inline-block;
		width: 0.12rem;
		height: 0.12rem;
		background: linear-gradient(90deg, #767EE5 0%, #9966CC 106.43%);
		border-radius: 50%;
		margin-left: -0.22rem;
		margin-right: 0.1rem;
	}
`
const SectTxtMain= styled.div`
	font-size: 0.16rem;
	line-height: 0.28rem;
	color: #42424ACC;
`
const SectNum = styled.div`
    color: #5465CF;
	font-size: 0.6rem;
	font-family: PingFang SC;
	font-weight: 500;
`

export const DetailSection: React.FC = () => {
	return (
		<Wrapper style={{}}>
			<Container>
				<Title>推理场景的高性能 AI 基础设施</Title>
				<Section>
					<SectionTitle>高性能 AI 基础设施的核心特征：软硬件深度融合</SectionTitle>
					<SectCont>
						<SectImg src={addUrl} />
						<SectTxtCnt>
							<SectTxtTittle>AI 大模型推理对系统性能提出极高要求</SectTxtTittle>
							<SectTxtTittle>硬件能力需与软件栈深度协同，提升整体效率</SectTxtTittle>
						</SectTxtCnt>
					</SectCont>
					<SectBox>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>算子性能与可移植性双提升</SectTxtTittle>
								<SectTxtMain>面向新硬件平台做算子底层优化</SectTxtMain>
								<SectTxtMain>提升算子在不同设备间的可迁移性</SectTxtMain>
							</SectTxt>
							<SectTxt>
								<SectTxtTittle>通信性能的系统级优化</SectTxtTittle>
								<SectTxtMain>优化网络协议与通信栈，降低延迟与丢包</SectTxtMain>
								<SectTxtMain>适配AI场景下的集合通信模式</SectTxtMain>
							</SectTxt>
						</SectCont>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>计算与通信的智能调度与重叠</SectTxtTittle>
								<SectTxtMain>动态追踪系统性能瓶颈</SectTxtMain>
								<SectTxtMain>让计算与通信协同推进，不断迭代匹配，释放最大吞吐</SectTxtMain>
							</SectTxt>
						</SectCont>
					</SectBox>
				</Section>
				<Section>
					<SectionTitle>为什么要做新一代RDMA网络与深度优化推理框架？</SectionTitle>
					<SectCont>
							<SectBox>
								<SectNum>01</SectNum>
								<SectTittle>性能权衡</SectTittle>
								<SectTxtMain>虽然RDMA是目前AI大模型跨节点通信的事实标准，但作为25年前为HPC场景设计的协议，其在应对AI大模型新需求时的局限性正日益显现。</SectTxtMain>
							</SectBox>
							<SectBox>
								<SectNum>02</SectNum>
								<SectTittle>通盘优化</SectTittle>
								<SectTxtMain>随着AI大模型的快速发展，对大模型系统性能提出更高的要求。如何降本增效成为大家关注的核心问题。极致的高性能要求采用软硬件协同设计的理念，而不能单独改进软件算法或堆高端硬件。</SectTxtMain>
							</SectBox>
							<SectBox>
								<SectNum>03</SectNum>
								<SectTittle>开放性</SectTittle>
								<SectTxtMain>开源开放已成为趋势，也是推动技术演进的必要条件。而目前商用智能网卡都是黑盒闭源方案，难以二次开发，扩展性差。很难与上层通信、计算框架进行深度融合。</SectTxtMain>
							</SectBox>
					</SectCont>
				</Section>
				<Section>
					<SectionTitle>达坦科技软硬件融合的AI基础设施的亮点</SectionTitle>
					<SectCont>
						<SectImg src={pcUrl} />
						<SectTxtCnt>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>国产信创</SectTxtTittle>
								<SectTxtMain>适配多款软硬件平台，支持国产信创操作系统及国产GPU。对国产FPGA芯片的适配也在进行中。</SectTxtMain>
							</SectTxt>
							<SectTxt>
								<SectTxtTittle>高性能</SectTxtTittle>
								<SectTxtMain>提供从硬件到软件的统一解决方案，深度打通AI大模型系统不同层级之间的壁垒，最大限度发挥硬件效能。</SectTxtMain>
							</SectTxt>
						</SectCont>
						<SectCont>
							<SectTxt>
								<SectTxtTittle>开源开放</SectTxtTittle>
								<SectTxtMain>从硬件到软件，全栈开源。对于开发能力强的客户，甚至可以对RDMA硬件的逻辑进行二次开发扩展，从而适配自己的需求。</SectTxtMain>
							</SectTxt>
							<SectTxt>
								<SectTxtTittle>易用性</SectTxtTittle>
								<SectTxtMain>采用创新的通信协议，在兼容标准RDMA API接口的同时，降低了对网络环境的要求，可以实现免调参一键部署，可以实现无感故障迁移。</SectTxtMain>
							</SectTxt>
						</SectCont>
						</SectTxtCnt>
					</SectCont>
				</Section>
			</Container>
		</Wrapper>
	)
}
