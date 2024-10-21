import styled from "styled-components"

import mapUrl from '@/assets/home/map.png'
import infrastructureUrl from '@/assets/home/infrastructure.png'
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
	&::before {
		content: '';
		display: inline-block;
		width: 0.12rem;
		height: 0.12rem;
		background: #7680DD;
		border-radius: 50%;
		margin-left: -0.22rem;
		margin-right: 0.1rem;
	}
`
const SectStylTxt = styled.span`
	color: #7680DD;
`
const SectImg = styled.img`
	width: 45%;
`
const SectInfra = styled.img`
	width: 100%;
	margin-bottom: -0.24rem;
`

export const DetailSection: React.FC = () => {
	return (
		<Wrapper>
			<Container>
				<Title>DatenLord 存储+网络的融合方案解决 AI 算力资源问题</Title>
				<Section>
					<SectionTitle>AI 的发展引起算力资源的紧张、分散和昂贵</SectionTitle>
					<SectCont>
						<SectTxtCnt>
							<SectTxt><SectStylTxt>AI 大模型对高性能 GPU 算力资源需求大爆发。</SectStylTxt>GPU 算力供不应求，供需极度不平衡。这进一步<SectStylTxt>推高</SectStylTxt>了原本因设计和制造成本以及市场垄断等因素就<SectStylTxt>已经高企不下的GPU 算力价格</SectStylTxt>。</SectTxt>
							<SectTxt>GPU 算力资源优先满足 AI 训练场景，这造成 <SectStylTxt>AI 推断场景的 GPU 算力资源具有分散或碎片化</SectStylTxt>的特点。</SectTxt>
						</SectTxtCnt>
						<SectImg src={mapUrl} />
					</SectCont>
				</Section>
				<Section>
					<SectionTitle>AI 算力资源的分散和昂贵对云计算带来的新问题</SectionTitle>
					<SectInfra src={infrastructureUrl} />
				</Section>
				<Section>
					<SectionTitle>将云计算资源复用的方式引入 AI 算力资源分配管理</SectionTitle>
					<SectCont>
						<SectImg src={pcUrl} />
						<SectTxtCnt>
							<SectTxt>优化缓存技术，实现数据预加载、异步持久化，进而提升数据访问的性能； </SectTxt>
							<SectTxt> 高性能RDMA网络，实现多节点内存共享，加速大模型的分发、加载。</SectTxt>
						</SectTxtCnt>
					</SectCont>
				</Section>
			</Container>
		</Wrapper>
	)
}
