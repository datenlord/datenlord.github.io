import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'

import avatarIconUrl from '@/assets/company/avatar-icon.svg'
import illustrationUrl from '@/assets/company/illustration.png'
import imageUrl from '@/assets/company/image.png'
import { Button } from '@/components/Button'

const { Heading, Paragraph } = Typography
const { CNHead5S, CNTitleLarge, CNTitleMedium } = Heading
const { CNBodyMedium, CNMarkMedium } = Paragraph

const items = [
  {
    title: 'Rust分布式存储开发（远程实习）',
    avatar: '',
    text: '参与高性能分布式存储系统研发，涉及的开发内容包括但不限于：',
    items: [
      '分布式数据一致性协议；',
      '高速网络传输接口、驱动；',
      '分布式缓存、数据管理服务；',
      '对象存储接口；',
      '文件存储接口；',
      '块存储接口。',
    ],
    url: '/job-description/rust-distributed-storage-development',
  },
  {
    title: 'Rust高性能网络系统开发（远程实习）',
    avatar: '',
    text: '参与研发高性能网络系统开发，涉及的工作包括但不限于：',
    items: [
      '网络硬件Linux驱动开发；',
      '网络流量控制算法设计与实现；',
      '网络仿真系统开发与测试。',
    ],
    url: '/job-description/rust-high-performance-web-systems-development',
  },
  {
    title: 'AI平台研发 （远程实习）',
    avatar: '',
    items: [
      '负责大模型平台后端的开发研发，根据产品和项目计划按时完成功能模块的架构设计、编码、测试的全流程工作。',
      '负责持续优化系统架构，提供高并发的数据请求分析的处理能力，提高系统的容灾容错能力，保证系统的可运维、高可用性、高可靠性。',
    ],
    url: '/job-description/ai-platform-development',
  },
  {
    title: 'FPGA开发（远程实习）',
    avatar: '',
    items: [
      '负责基于FPGA实现网络IO加速，以及加密、压缩、编码等算法加速的设计与RTL实现；',
      '实现常用外设接口IP的RTL设计、集成和验证；',
      '参与SoC集成设计与验证；',
      '撰写相关设计文档。',
    ],
    url: '/job-description/fpga-development',
  },
  {
    title: '软硬件联合研发（远程实习）',
    avatar: '',
    text: '参与高性能存储SoC芯片的软硬件开发：',
    items: [
      '负责网络IO加速的RTL实现；',
      '负责加密、压缩、编码等算法加速的设计与RTL实现；',
      '负责SoC芯片的Linux驱动开发；',
      '负责实现软硬件联合调试与自动化测试。',
    ],
    url: '/job-description/joint-research-and-development-of-hardware-and-software',
  },
  {
    title: '数字IC前端设计（远程实习）',
    avatar: '',
    text: '参与高性能存储SoC芯片开发：',
    items: [
      '负责实现网络IO加速，以及加密、压缩、编码等算法加速的设计与RTL实现； ',
      '负责实现SoC的集成、综合与原型验证；',
      '负责实现常用外设接口IP的RTL设计、集成；',
      '撰写相关设计文档。',
    ],
    url: '/job-description/digital-ic-front-end-design',
  },
]

const SectionContainer = styled.section``
const SectionTitle = styled(CNHead5S)``
const MainContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.58rem 0.32rem;
  margin-inline: calc(1.48rem - 1.93rem);
  padding-block: 0.82rem 0;
`
const Card = styled.div`
  padding: 0.24rem;
  color: ${props => props.theme.themeDark02};
  border: 0.01rem solid #eaebf0;
  border-radius: 0.05rem;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.04);
`
const CardTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.24rem;
`
const CardAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.48rem;
  height: 0.48rem;
  background: ${props => props.theme.secondary02};
  border-radius: 50%;
`
const CardAvatarIcon = styled.img`
  width: 0.32rem;
  height: 0.32rem;
`
const CardButton = styled(CNMarkMedium)`
  padding: 0.12rem 0.18rem;
  height: 0.46rem;
  color: ${props => props.theme.gray007};
  background: ${({ theme }) => theme.white00};
  border: 0.01rem solid #dae0e6;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.04);
  cursor: pointer;
`
const CardTitle = styled(CNTitleLarge)`
  color: ${props => props.theme.gray007};
  padding-bottom: 0.08rem;
`
const SubTitle = styled(CNBodyMedium)``
const CardText = styled(CNBodyMedium)``
const CardContent = styled.ol`
  padding-left: 0.2rem;
`
const CardContentItem = styled(CNBodyMedium)``
const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d8dcfa;
  border-radius: 0.05rem;
  padding: 0.72rem 0.64rem 0.59rem;
`
const DetailCardAvatar = styled.div`
  width: 1.28rem;
  height: 1.28rem;
  margin-bottom: 0.3rem;
  padding: 0.21rem;
  background: ${props => props.theme.secondary02};
  border-radius: 50%;
`
const DetailCardAvatarIcon = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`
const DetailCardText = styled(CNTitleLarge)`
  padding-bottom: 0.07rem;
  color: ${props => props.theme.secondary08};
`
const DetailCardLink = styled.div`
  font-size: 0.2rem;
  line-height: 0.28rem;
  font-weight: 600;
  color: #fff;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Illustration = styled.img`
  width: 50%;
  height: min-content;
`
const ContentContainer = styled.div`
  width: 46%;
`
const DetailTitle = styled(CNTitleMedium)``
const DetailList = styled.ul`
  padding-block: 0.36rem;
  list-style-type: none;
`
const DetailListItem = styled(CNBodyMedium)``
const DetailText = styled(CNBodyMedium)``
const Emphasis = styled.span`
  color: ${props => props.theme.secondary01};
`
const Image = styled.img`
  width: 2.44rem;
  padding-bottom: 0.16rem;
`
const DetailButton = styled(Button)`
  color: #fff;
`

export const RecruitmentSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <SectionContainer>
      <SectionTitle>公开招聘</SectionTitle>
      <MainContainer>
        {items.map(({ title, text, items, url }, index) => (
          <Card key={index}>
            <CardTopSection>
              <CardAvatar>
                <CardAvatarIcon src={avatarIconUrl} />
              </CardAvatar>
              <CardButton onClick={() => navigate(url)}>岗位详情</CardButton>
            </CardTopSection>
            <CardTitle>{title}</CardTitle>
            <SubTitle>【岗位职责】</SubTitle>
            {text && <CardText>{text}</CardText>}
            <CardContent>
              {items.map((item, index) => (
                <CardContentItem key={index} as={'li'}>
                  {item}
                </CardContentItem>
              ))}
            </CardContent>
          </Card>
        ))}
        <DetailCard>
          <Image src={imageUrl} />
          <DetailButton onClick={() => navigate('/job-description')}>
            进入招聘岗位详情
          </DetailButton>
          {/* <DetailCardAvatar>
            <DetailCardAvatarIcon src={avatarIconUrl} />
          </DetailCardAvatar>
          <DetailCardText>进入招聘岗位详情</DetailCardText>
          <DetailCardLink onClick={() => navigate('/job-description')}>
            【寻人启事】达坦科技持续招人ing
          </DetailCardLink> */}
        </DetailCard>
      </MainContainer>
      {/* <DetailContainer>
        <Illustration src={illustrationUrl} />
        <ContentContainer>
          <DetailTitle>
            同时，为了更好地激励表现优异、符合达坦文化价值观、为公司作出卓越贡献的同学，我们的实习生薪资规则如下：
          </DetailTitle>
          <DetailList>
            <DetailListItem as={'li'}>
              - 实习生入职薪资设置初始值，岗位不同则初始薪资有所差异；
            </DetailListItem>
            <DetailListItem as={'li'}>
              -
              入职后，根据能力、产出、价值观三个维度，每3个月进行整体review，表现优异的同学将获得薪资调增的机会，
              <Emphasis>调增幅度最高可达200元/天</Emphasis>；
            </DetailListItem>
            <DetailListItem as={'li'}>
              - 如有作出颠覆级贡献的同学（如一人能独立负责公司主产品），
              <Emphasis>原则上薪资上不封顶</Emphasis>，根据具体情况一事一议。
            </DetailListItem>
          </DetailList>
          <DetailTitle>
            达坦设置了丰厚的推荐奖金，欢迎大家推荐优秀的小伙伴加入达坦。推荐成功的奖金设置为：
          </DetailTitle>
          <DetailText>
            实习生：<Emphasis>4000元/人</Emphasis>
          </DetailText>
          <DetailText>
            初级工程师：<Emphasis>15000元/人</Emphasis>
          </DetailText>
        </ContentContainer>
      </DetailContainer> */}
    </SectionContainer>
  )
}
