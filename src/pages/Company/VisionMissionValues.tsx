import styled from 'styled-components'
import { Typography } from '@/components/Typography'

import SectionBgUrl from '@/assets/company/VMV-section-bg.png'
import BookUrl from '@/assets/company/book.svg'
import BulbUrl from '@/assets/company/bulb.svg'
import TargetUrl from '@/assets/company/target.svg'
import HollowSphere4Url from '@/assets/company/HollowSphere4.png'
import HollowSphere5Url from '@/assets/company/HollowSphere5.png'
import Pipe4Url from '@/assets/company/Pipe4.png'

const { Heading, Paragraph } = Typography
const { CNHead4 } = Heading
const { CNBodyLarge, CNBodyMedium } = Paragraph

const SectionWrapper = styled.section`
  color: ${props => props.theme.secondary02};
  background: ${props => props.theme.themeDark};
  background-image: url(${SectionBgUrl});
  background-size: cover;
`
const SectionContainer = styled.section`
  position: relative;
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.31rem;
  padding-inline: 1.6rem;
`
const SectionTitle = styled(CNHead4)`
  padding-bottom: 1.57rem;
  color: ${props => props.theme.secondary02};
  text-align: center;
`
const MainContainer = styled.div`
  padding-bottom: 1.04rem;
  display: flex;
  justify-content: space-between;
`
const Col = styled.div`
  width: 32%;
`
const Col1 = styled(Col)`
  padding-top: 1rem;
`
const Col2 = styled(Col)``
const Col3 = styled(Col)`
  padding-top: 0.79rem;
`
const Card = styled.div`
  margin-bottom: 0.2rem;
  padding-top: 0.51rem;
  padding-bottom: 0.67rem;
  padding-inline: 0.26rem;
  border-radius: 0.12rem;
  background: #ffffff10;
  border: 0.01rem solid #ffffff80;
  &:last-child {
    margin-bottom: 0;
  }
`
const CardSmall = styled(Card)`
  padding-block: 0.34rem;
`
const CardTitle = styled(CNHead4)`
  color: #fff;
  padding-bottom: 0.2rem;
`
const CardSubTitle = styled(CNBodyLarge)`
  color: #fff;
  padding-bottom: 0.06rem;
`
const CardText = styled(CNBodyLarge)``
const CultureCard = styled(Card)`
  display: flex;
  width: 80%;
  padding-block: 0.4rem;
  padding-inline: 0.46rem;
`
const CultureCardTitle = styled(CNHead4)`
  padding-right: 1rem;
`
const CultureCardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const CultureCardItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.32rem;
  &:last-child {
    padding-bottom: 0;
  }
`
const CultureCardItemIcon = styled.img`
  margin-right: 0.16rem;
  width: 0.58rem;
  height: 0.58rem;
`
const CultureCardItemContent = styled.div``
const CultureCardItemTitle = styled(CNBodyLarge)`
  padding-bottom: 0.06rem;
`
const CultureCardItemText = styled(CNBodyMedium)``
const HollowSphere5 = styled.img`
  position: absolute;
  top: 2.22rem;
  right: 1.59rem;
  width: 1.5rem;
  height: 1.5rem;
`
const Pipe4 = styled.img`
  position: absolute;
`
const Pip4Large = styled(Pipe4)`
  left: 2.64rem;
  top: 9.13rem;
  width: 3.31rem;
  height: 3.31rem;
`
const Pip4Small = styled(Pipe4)`
  left: 2.94rem;
  top: 8.97rem;
  width: 1.37rem;
  height: 1.37rem;
  transform: rotate(-80deg);
`
const HollowSphere4 = styled.img`
  position: absolute;
  right: 0;
  bottom: 0.2rem;
  width: 3.5rem;
`

export const VisionMissionValuesSection = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle>愿景/使命/价值观</SectionTitle>
        <MainContainer>
          <Col1>
            <Card>
              <CardTitle>愿景</CardTitle>
              <CardText>
                使企业能够以高性能和高安全性的方式在全球多个云中读、写和提取数据。
              </CardText>
            </Card>
          </Col1>
          <Col2>
            <Card>
              <CardTitle>使命</CardTitle>
              <CardText>
                通过使用DatenLord 跨云分布式的存储系统，打破跨云之间的隔阂。
              </CardText>
            </Card>
            <Card>
              <CardTitle>价值</CardTitle>
              <CardSubTitle>开放和透明</CardSubTitle>
              <CardText>
                我们努力保证信息和决策过程的透明度，从而创造一个包容性的社区，让每个成员都感到安全和自信，可以贡献不同的意见和多元化的视角。我们相信建设性的冲突可以带来反思和改进。
              </CardText>
            </Card>
          </Col2>
          <Col3>
            <CardSmall>
              <CardSubTitle>敢于成为先锋</CardSubTitle>
              <CardText>
                我们是一群具有成长型思维模式的人，我们不走捷径并且相信慢就是快。我们的目标是成为先锋，敢于标新立异，制定自己的模式，因此我们允许犯错，但更相信我们能够快速、持续地调整和完善。
              </CardText>
            </CardSmall>
            <CardSmall>
              <CardSubTitle>坚持交付卓越</CardSubTitle>
              <CardText>
                我们相信结果与过程同样重要。我们以目标为导向，设定高标准，并发挥我们的聪明才智和努力拼搏的精神来实现它们。我们致力于通过关注自身的行动和外部的变化来获得想要的结果。
              </CardText>
            </CardSmall>
            <CardSmall>
              <CardSubTitle>专注于小而可控的步骤</CardSubTitle>
              <CardText>
                大的里程碑固然值得庆祝，而每一跬步也很重要。我们相信在正确的方向上迈出的每一小步可以跨越难以想象的距离。我们相信不积跬步，无以至千里；不积小流，无以成江海。
              </CardText>
            </CardSmall>
          </Col3>
        </MainContainer>
        <CultureCard>
          <CultureCardTitle>公司文化</CultureCardTitle>
          <CultureCardItemContainer>
            <CultureCardItem>
              <CultureCardItemIcon src={BookUrl} />
              <CultureCardItemContent>
                <CultureCardItemTitle>持续学习</CultureCardItemTitle>
                <CultureCardItemText>
                  持之以恒的自驱学习，求真求致；
                </CultureCardItemText>
              </CultureCardItemContent>
            </CultureCardItem>
            <CultureCardItem>
              <CultureCardItemIcon src={BulbUrl} />
              <CultureCardItemContent>
                <CultureCardItemTitle>精益求精</CultureCardItemTitle>
                <CultureCardItemText>
                  对自己高标准严要求，勇于挑战自我，对创新有极致追求；
                </CultureCardItemText>
              </CultureCardItemContent>
            </CultureCardItem>
            <CultureCardItem>
              <CultureCardItemIcon src={TargetUrl} />
              <CultureCardItemContent>
                <CultureCardItemTitle>积极主动</CultureCardItemTitle>
                <CultureCardItemText>
                  遇到问题主动踏出第一步，做先行者而不是追随者。
                </CultureCardItemText>
              </CultureCardItemContent>
            </CultureCardItem>
          </CultureCardItemContainer>
        </CultureCard>
        <HollowSphere5 src={HollowSphere5Url} />
        <Pip4Large src={Pipe4Url} />
        <Pip4Small src={Pipe4Url} />
        <HollowSphere4 src={HollowSphere4Url} />
      </SectionContainer>
    </SectionWrapper>
  )
}
