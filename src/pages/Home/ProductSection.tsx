import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import datenlordLogoUrl from '@/assets/logo-dark.svg'
import xlineLogoUrl from '@/assets/xline-logo.svg'
import coneUrl from '@/assets/home/cone.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNTitleLarge } = Heading
const { CNBodyLarge } = Paragraph

const Wrapper = styled.section`
  background: #ededf6;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 2.56rem;
  padding-block: 0.94rem;
  padding-bottom: 1.8rem;
`
const Title = styled(CNHead4)`
  padding-bottom: 1.08rem;
  color: ${props => props.theme.gray04};
`

const CardWrapper = styled.div`
  padding: 0.06rem;
  border: 0.03rem solid transparent;
  border-radius: 0.18rem;
`
const DatenLordCardWrapper = styled(CardWrapper)`
  position: relative;
  width: 100%;
  border-left: 0.03rem solid #767ee5;
`
const XlineCardWrapper = styled(CardWrapper)`
  position: relative;
  width: 80%;
  border-right: 0.03rem solid #767ee5;
  border-top: none;
`
const RDMACardWrapper = styled(CardWrapper)`
  position: relative;
  width: 100%;
  border-left: 0.03rem solid #767ee5;
  border-top: none;
`

const Card = styled.div`
  display: flex;
  padding-block: 0.32rem;
  padding-inline: 0.64rem;
  color: #42424a;
  border-radius: 0.18rem;
`
const DatenLordCard = styled(Card)`
  flex-direction: column;
  background: linear-gradient(90deg, #ffffff95, #ffffff00);
`
const XlineCard = styled(Card)`
  align-items: end;
  padding-top: 0.96rem;
`
const RDMACard = styled(Card)`
  flex-direction: column;
  padding-right: 1.24rem;
  background: linear-gradient(90deg, #ffffff95, #ffffff00);
`

const DatenLordLogo = styled.img`
  height: 0.58rem;
  align-self: flex-end;
`
const DatenLordTitle = styled(CNHead4)`
  color: #000;
`
const DatenLordDescription = styled(CNBodyLarge)`
  width: 90%;
  padding-bottom: 0.14rem;
`

const XlineTitle = styled(CNHead4)`
  color: #000;
  padding-bottom: 0.14rem;
`
const XlineDescription = styled(CNBodyLarge)`
  width: 70%;
  text-align: right;
  padding-bottom: 0.14rem;
`
const XlineLogo = styled.img`
  height: 0.42rem;
`
const XlineContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: end;
`
const Cone1 = styled.img`
  z-index: 100;
  position: absolute;
  top: -5%;
  left: -35%;
  width: 4rem;
  height: 4rem;
`
const Cone2 = styled.img`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 1.2rem;
  height: 1.2rem;
  transform: rotate(80deg);
`

const RDMATitle = styled(CNHead4)`
  color: #000;
`
const RDMADescription = styled(CNBodyLarge)`
  padding-bottom: 0.35rem;
`
const RDMAList = styled.ul`
  padding-bottom: 0.3rem;
  color: #7680dd;
`
const RDMAListItem = styled(CNTitleLarge)`
  padding-bottom: 0.05rem;
`
const RDMAContent = styled(CNBodyLarge)`
  padding-bottom: 0.05rem;
  color: ${props => props.theme.themeDark};
`

const DecorationContainer = styled.div``
const Corner = styled.div`
  position: absolute;
  width: 0.36rem;
  height: 0.36rem;
  background-color: transparent;
  border-radius: 0.18rem;
`
const TopLeftCorner = styled(Corner)`
  top: -0.02rem;
  left: -0.02rem;
  border-left: 0.03rem solid #767ee5;
  transform: rotate(45deg);
`
const BottomLeftCorner = styled(Corner)`
  bottom: -0.02rem;
  left: -0.02rem;
  border-left: 0.03rem solid #767ee5;
  transform: rotate(-45deg);
`
const TopRightCorner = styled(Corner)`
  top: -0.02rem;
  right: -0.02rem;
  border-right: 0.03rem solid #767ee5;
  transform: rotate(-45deg);
`
const BottomRightCorner = styled(Corner)`
  bottom: -0.02rem;
  right: -0.02rem;
  border-right: 0.03rem solid #767ee5;
  transform: rotate(45deg);
`

const Line = styled.div`
  position: absolute;
  height: 0.03rem;
`
const TopLine1 = styled(Line)`
  top: -0.03rem;
  left: 0.13rem;
  width: 93%;
  background: linear-gradient(90deg, #767ee5, #9966cc);
`
const TopLine2 = styled(Line)`
  top: -0.03rem;
  right: 0.13rem;
  width: 10%;
  background: #767ee5;
`
const TopLine3 = styled(Line)`
  top: -0.03rem;
  left: 0.13rem;
  width: 10%;
  background: #767ee5;
`
const BottomLine1 = styled(Line)`
  bottom: -0.03rem;
  left: 0.13rem;
  width: 70%;
  background: linear-gradient(90deg, #767ee5, #9966cc);
`
const BottomLine2 = styled(Line)`
  bottom: -0.03rem;
  right: 0.13rem;
  width: 90%;
  background: linear-gradient(90deg, #9966cc, #767ee5);
`
const BottomLine3 = styled(Line)`
  bottom: -0.03rem;
  left: 0.13rem;
  width: 100%;
  background: linear-gradient(90deg, #9966cc, #767ee5);
`

const Dot = styled.div`
  position: absolute;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
`
const Dot1 = styled(Dot)`
  top: calc(-0.08rem - 0.02rem);
  right: 5%;
  background: #9966cc;
`
const Dot2 = styled(Dot)`
  bottom: calc(-0.08rem - 0.02rem);
  right: 28%;
  background: #9966cc;
`
const Dot3 = styled(Dot)`
  top: calc(-0.08rem - 0.01rem);
  right: 10%;
  background: #767ee5;
`
const Dot4 = styled(Dot)`
  bottom: calc(-0.08rem - 0.01rem);
  left: 8%;
  background: #9966cc;
`
const Dot5 = styled(Dot)`
  top: calc(-0.08rem - 0.02rem);
  left: 10%;
  background: #767ee5;
`
const Dot6 = styled(Dot)`
  bottom: calc(-0.08rem - 0.01rem);
  right: -2%;
  background: #767ee5;
`

const FakeNav = styled.div`
  position: relative;
  bottom: 0.32rem;
  left: 30%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FakeNavDot = styled.div`
  width: 0.16rem;
  height: 0.16rem;
  background: #d9dbef;
  border-radius: 50%;
`
const FakeNaveDotActive = styled.div`
  margin-block: 0.18rem;
  width: 0.22rem;
  height: 0.22rem;
  background: #7680dd;
  border-radius: 50%;
`

const StylTxt = styled.span`
	color: #7680DD;
`

export const ProductSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Wrapper id='open-source-project'>
      <Container>
        <Title>开源项目</Title>
        <DatenLordCardWrapper id="datenlord">
          <DatenLordCard>
            <DatenLordLogo src={datenlordLogoUrl} />
            <DatenLordTitle>DatenLord</DatenLordTitle>
            <DatenLordDescription>
              DatenLord 是一套<StylTxt>跨云跨数据中心的存储解决方案</StylTxt>，帮助企业实现高效的跨云跨数据中心的存储访问。该方案为用户提供了丰富的系统结构，包括 Posix 文件接口， KV 接口 和 面向对象存储接口等，用户可以根据需求选择适合自己的方式。DatenLord 使用了软硬件融合的方式，充分发挥软硬件的性能潜力，实现了极致的数据传输和读写性能。
            </DatenLordDescription>
            <Button
              style={{ width: 'max-content', color: '#fff' }}
              onClick={() =>
                (window.location.href =
                  'https://github.com/datenlord/datenlord')
              }
            >
              了解更多
            </Button>
          </DatenLordCard>
          <DecorationContainer>
            <TopLine1 />
            <BottomLine1 />
            <TopLeftCorner />
            <BottomLeftCorner />
            <Dot1 />
            <Dot2 />
          </DecorationContainer>
        </DatenLordCardWrapper>
        <XlineCardWrapper id="xline">
          <XlineCard>
            <XlineLogo src={xlineLogoUrl} />
            <XlineContent>
              <XlineTitle>Xline开源分布式KV存储系统</XlineTitle>
              <XlineDescription>
                保证数据在跨数据中心跨云访问时的一致性，方便业务系统实现多地多中心多活部署
              </XlineDescription>
              <Button
                style={{ width: 'max-content', color: '#fff' }}
                onClick={() => (window.location.href = 'https://xline.cloud/')}
              >
                了解更多
              </Button>
            </XlineContent>
            <FakeNav>
              <FakeNavDot />
              <FakeNaveDotActive />
              <FakeNavDot />
            </FakeNav>
          </XlineCard>
          <DecorationContainer>
            <TopLine2 />
            <BottomLine2 />
            <TopRightCorner />
            <BottomRightCorner />
            <Dot3 />
            <Dot4 />
            <Cone1 src={coneUrl} />
            <Cone2 src={coneUrl} />
          </DecorationContainer>
        </XlineCardWrapper>
        <RDMACardWrapper id="rdma">
          <RDMACard>
            <RDMATitle>RDMA</RDMATitle>
            <RDMADescription>
              跨云场景下，网络对数据访问的性能影响最为突出，DatenLord采用高性能网络RDMA来降低延迟并提高带宽。RDMA方面我们有多个相关的开源项目：
            </RDMADescription>
            <RDMAList>
              <RDMAListItem as={'li'}>async-rdma</RDMAListItem>
              <RDMAContent>
                是用Rust封装的RDMA异步API库，它为编写RDMA应用程序提供高级抽象和异步API接口。
              </RDMAContent>
              <RDMAListItem as={'li'}>open-rdma</RDMAListItem>
              <RDMAContent>
                是RDMA协议的开源硬件实现，采用Bluespec和SpinalHDL实现，目前主要实现了RoCEv2协议，此外，我们还进行一些特定功能的拓展来提升RDMA的传输效率。
              </RDMAContent>
              {/* <RDMAListItem as={'li'}>roce-sim</RDMAListItem>
              <RDMAContent>
                是一套验证RDMA协议的软件框架，方便测试RDMA硬件的正确性，即是否符合RoCEv2协议的要求。
              </RDMAContent> */}
            </RDMAList>
            <Button
              style={{ width: 'max-content', color: '#fff' }}
              onClick={() => {
                navigate('/rdma')
              }}
            >
              了解更多
            </Button>
          </RDMACard>
          <DecorationContainer>
            <TopLine3 />
            <BottomLine3 />
            <TopLeftCorner />
            <BottomLeftCorner />
            <Dot5 />
            <Dot6 />
          </DecorationContainer>
        </RDMACardWrapper>
      </Container>
    </Wrapper>
  )
}
