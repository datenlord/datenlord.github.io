import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import LogoUrl from '@/assets/logo-theme-dark.svg'
import FoundingImageUrl from '@/assets/company/founding-image.png'
import ShiJichengAvatarUrl from '@/assets/company/shi-jicheng-avatar.png'
import WangPuAvatarUrl from '@/assets/company/wang-pu-avatar.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNHead5S, CNHead5 } = Heading
const { CNBodyLarge, CNBodySmall } = Paragraph

const cardData = [
  {
    key: 'wang-pu',
    avatar: WangPuAvatarUrl,
    name: '王璞',
    position: '达坦科技创始人兼CEO',
    text: '达坦科技创始人兼CEO，美国George Mason大学计算机博士、北大硕士、北航本科，拥有多年云计算和大数据领域的经验和积累，擅长分布式系统研发、海量数据处理、云计算产品设计及大规模机器学习等。2014年回国创业，创立数人云科技公司，专注容器技术在国内的落地和推广，2018年被上市公司收购。曾发表十余篇论文，共计被引用上千次，拥有多项云计算专利、软著，并于2020年被评选为腾讯云TVP（最有价值专家）。',
    quote:
      "“我读大学的时候玩乐队，弹奏最多的就是Guns N' Roses（枪花）乐队的歌曲。枪花1987年发行的第一张专辑叫《Appetite for Destruction》。虽然我不至于有毁灭欲，但都说创新的本质其实是‘创造性地破坏’，创业亦然。离开大公司后我连续投身科技创业，想要静心做底层技术的颠覆性创新。想来也算是年轻时追求的摇滚精神跨时空的延续”。",
    inscription: '——王璞 达坦科技创始人兼CEO',
  },
  {
    key: 'shi-ji-cheng',
    avatar: ShiJichengAvatarUrl,
    name: '施继成',
    position: '达坦科技联合创始人兼 CTO',
    text: 'DatenLord 联合创始人兼 CTO，复旦大学软件工程本硕，师从华为基础软件首席科学家、鸿蒙实验室主任陈海波教授。擅长操作系统内核开发、分布式系统、嵌入式系统，对分布式数据一致性有钻深的研究，发表多篇操作系统内核相关论文，累计数百次引用。毕业后曾在谷歌中国、微软亚太和阿里巴巴等公司从事分布式计算和存储等相关工作。入选2022年度36氪S级创业者名册，荣获中国“企业工具与底层软件”领域 “36位36岁以下创业者“称号。',
    quote:
      '“魂系游戏和创业很相似，前者大量的离散叙事遍布于各个物件和NPC上，寻找主线剧情就好比创业时把客户的需求、公司的技术优势、VUCA时代瞬息万变的市场变化和趋势等都链接起来，形成完整的产品叙事并落地。两者的难度系数都很高，创业中的踩坑、犯错对应的是游戏中的“死亡”，所以，‘不死精神’或者说‘Grit’（坚毅）是魂系游戏和投身创业企业玩家的必备素质。”',
    inscription: '——施继成 达坦科技联合创始人兼CTO',
  },
]

const SectionWrapper = styled.section`
  background: #f7f7f9;
`
const SectionContainer = styled.section`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.16rem;
  padding-inline: 1.22rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 1.56rem;
  color: ${props => props.theme.themeDark02};
  text-align: center;
`
const Overview = styled.div`
  padding-inline: 0.34rem;
  padding-bottom: 0.73rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const OverviewLogo = styled.img`
  width: 36%;
`
const OverviewText = styled(CNBodyLarge)`
  width: 54%;
`
const FoundingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 0.34rem;
  padding-bottom: 0.65rem;
`
const FoundingImage = styled.img`
  width: 36%;
`
const FoundingContent = styled.div`
  width: 54%;
`
const FoundingTitle = styled(CNHead5S)``
const FoundingText = styled(CNBodyLarge)`
  padding-left: 0.16rem;
`
const Card = styled.div<{ name: string }>`
  display: flex;
  flex-direction: ${props => (props.name == 'wang-pu' ? 'row' : 'row-reverse')};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.39rem;
  padding-top: 0.64rem;
  padding-bottom: 0.6rem;
  padding-inline: 0.48rem;
  border-radius: 0.18rem;
  background: #fff;
  &:last-child {
    margin-top: 0;
  }
`
const CardPerson = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12%;
  text-align: center;
`
const CardContent = styled.div`
  width: 80%;
`
const CardAvatar = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-bottom: 0.13rem;
  border-radius: 50%;
  border: 0.01rem solid #000;
`
const CardName = styled(CNHead5)`
  margin-bottom: 0.04rem;
`
const CardPosition = styled(CNBodyLarge)``
const CardText = styled(CNBodyLarge)`
  padding-bottom: 0.39rem;
`
const CardQuote = styled(CNBodySmall)`
  margin-bottom: 0.3rem;
  padding-left: 0.1rem;
  border-left: 0.02rem solid transparent;
  border-image: linear-gradient(90deg, #767ee5, #9966cc) 1;
  color: ${props => props.theme.gray03};
`
const CardInscription = styled(CNBodySmall)`
  color: ${props => props.theme.gray03};
  text-align: right;
`
const Bold = styled.span`
  color: ${props => props.theme.secondary01};
  font-weight: 600;
`

export const AboutUsSection: React.FC = () => {
  return (
    <SectionWrapper id="about-us">
      <SectionContainer>
        <SectionTitle>关于我们</SectionTitle>
        <Overview>
          <OverviewLogo src={LogoUrl} />
          <OverviewText>
            达坦科技始终致力于打造<Bold>高性能 AI + Cloud 基础设施平台</Bold>
            ，积极推动AI应用的落地。达坦科技通过
            <Bold>软硬件深度融合</Bold>的方式，<Bold>提供 AI 推理引擎和高性能网络</Bold>，为 AI 应用提供弹性、便利、经济的基础设施服务，以此满足不同行业客户对 AI + Cloud 的需求。
          </OverviewText>
        </Overview>
        <FoundingContainer>
          <FoundingContent>
            <FoundingTitle
              style={{ paddingLeft: '0.16rem', paddingBottom: '0.39rem' }}
            >
              创始团队
            </FoundingTitle>
            <FoundingText>
              达坦科技<Bold>专注底层硬核技术</Bold>
              ，通过软硬件深度融合的方式，涉及分布式系统、Linux 内核、
              InfiniBand/RDMA、
              SoC、硬件加速等多个前沿技术领域。公司创始团队和核心成员大部分来自谷歌,
              微软、阿里巴巴等国际知名科技公司的顶尖人才，拥有
              <Bold>深厚的软硬件技术和丰富的行业经验</Bold>。
            </FoundingText>
          </FoundingContent>
          <FoundingImage src={FoundingImageUrl} />
        </FoundingContainer>
        {cardData.map(
          ({ key, name, avatar, position, text, quote, inscription }) => (
            <Card key={key} name={key}>
              <CardPerson>
                <CardAvatar src={avatar} />
                <CardName>{name}</CardName>
                <CardPosition>{position}</CardPosition>
              </CardPerson>
              <CardContent>
                <CardText>{text}</CardText>
                <CardQuote>{quote}</CardQuote>
                <CardInscription>{inscription}</CardInscription>
              </CardContent>
            </Card>
          ),
        )}
      </SectionContainer>
    </SectionWrapper>
  )
}
