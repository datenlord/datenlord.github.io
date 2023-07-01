import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

const { Heading, Paragraph } = Typography
const { CNHead5S, CNHead4 } = Heading
const { CNBodyLarge } = Paragraph

const QAdata = [
  {
    title: 'Q：当时是在什么契机下决定要创立达坦科技呢？',
    content: [
      {
        avatar: '',
        name: '王璞',
        text: [
          '首先我和继成过往的经验一直都是在云计算、分布式系统相关领域。我自己一直是一个喜欢创业的人，上一家公司被收购之后尝试着在上市公司做高管，但说实话不喜欢。上市公司门多组织复杂，里面繁冗的流程、复杂的人际关系，这些都不是我想要的，所以决定还是要出来创业，专注前沿技术，并且从创业最初期就特别关注团队的人才培养和文化建设，营造追求极致的技术氛围。',
          '既然创业肯定还是希望能赢，那就需要对未来的发展趋势有准确的判断。我们的判断是整个互联网还会有新的增长曲线或者说新的浪潮。只要这个判断成立，那么对云计算和云存储的需求理论上就是持续上升的，甚至会有更大的增量空间。随着AI、Web3.0特别是ChatGPT的兴起，我们的判断也得到一些印证：比如ChatGPT要1万张GPU卡做训练，这需要相当大的计算和存储资源来支撑。那么DatenLord要做的就是突破现有云计算的规模，实现从云计算到天空计算。能做自己擅长并喜欢的事情，找到一群志同道合的人，挑战技术极限，做前沿技术的弄潮儿，没有什么比这个更让人兴奋的。',
        ],
      },
      {
        avatar: '',
        name: '施继成',
        text: [
          '我从另一个角度补充一下。作为技术人员，能够深入钻研技术是很令人开心的一件事情。技术人员往往更愿意在感兴趣的领域进行深挖，探索其中的深入问题，甚至是一些世界级的前沿技术和问题。当然这也需要花费大量的时间和精力，短时间的速成往往是欲速则不达。我们在创办 DatenLord 的时候就想做这么一家沉下心钻研技术的公司，相信也会吸引一群有同样追求的人员加入我们。',
          '另外一方面，有深入的技术钻研和投入更能够形成技术壁垒，避免了企业间的同质化竞争，最终更能够从某一个领域脱颖而出，这些对于一家 ToB 的科技型企业至关重要。',
        ],
      },
    ],
  },
  {
    title: 'Q：为什么选择“跨云”这个细分领域？',
    content: [
      {
        avatar: '',
        name: '王璞',
        text: [
          '跨云存储是非常有挑战的问题，达坦科技立志要做出世界级产品，我们选择的领域也是业界公认的难点。 回答这个问题之前，我们先看看云计算的现状：现在的云计算其实是一座座围城，用户一旦进入一座围城中就很难再翻越出来。例如用户一旦开始大规模使用私有云部署，一段时间之后想要上公有云就非常困难；又或者用户一旦选择了一家云计算厂商，之后想要迁移到另外一家厂商成本就会很高。',
          '因此，我们认为未来的云计算会跨越现有云计算的边界——未来的云计算应该是“相互联通”的，这也是UC Bekerley的Ion Stoica教授提出的天空计算。云计算的用户应该非常容易能够在多个云计算厂商之间进行切换，选择适合自己的服务，选择性价比更高的服务。同时用户也能够在私有云和公有云间无缝衔接，在计算性能拓展和安全性之间找到一个平衡。',
        ],
      },
      {
        avatar: '',
        name: '施继成',
        text: [
          '是的，如何高效解决数据远程访问的问题是上云碰到的最突出问题，有了高性能跨云数据访问能力，即可以轻松上云又可以突破云厂商的绑定，让客户真正享受到云计算带来的弹性便利。而想要能大幅度提升跨云数据访问性能，就需要做软硬件深度融合。目前软硬件融合领域，不论对互联网公司、云计算巨头，还是老牌企业级IT厂商，都是极具挑战的场景。总之，达坦选择跨云存储领域，具有很高的技术门槛，即使对大厂来说也很有挑战。我们跟巨头站在差不多的起跑线上，真正用技术实力来竞争。',
        ],
      },
    ],
  },
  {
    title: 'Q：达坦科技希望能带来什么样的价值呢？',
    content: [
      {
        avatar: '',
        name: '王璞',
        text: [
          '我从市场和产业的角度说一下吧。一方面，随着云计算的普及，企业客户对应用上云已经形成共识，但是企业客户对于数据上云还有不少顾虑，会更倾向于将数据保存在可控的环境，比如私有数据中心。那企业应用上云后如何访问远程私有数据中心的数据，成为云计算进一步普及落地亟需解决的问题。',
          '另一方面，随着云计算进一步发展，业界基本公认无服务计算成为下一代云上应用的计算形态，无服务计算使得应用的部署调度更加灵活，但是数据无法随应用任意迁移，于是无服务计算大大增加了应用对于数据灵活访问的需求，即不论应用部署在哪里都要能高效访问到需要的数据，所以远程跨数据中心、跨地域甚至跨云数据访问成为下一代云计算最大的挑战。',
          '达坦想做的，就是解决这两个具有挑战性的问题，为用户提供高性能、安全的跨云数据访问体验。',
        ],
      },
      {
        avatar: '',
        name: '施继成',
        text: [
          '跨云存储是非常有挑战的场景，不仅要保证跨云数据访问的性能，更要保证跨云访问场景下，数据被竞争读写时仍然能保证数据一致性（正确性），即跨云、跨数据中心的数据一致性。我们当前已经推出的DatenLord开源项目可以实现跨云、跨数据中心场景下远程数据高性能访问，一方面方便企业客户的应用上云后访问远程私有数据中心的数据，另一方面方便无服务计算的应用（跨云）访问远程数据。',
          '随着ChatGPT引爆整个科技领域，AGI的产品在颠覆搜索引擎的同时，也对存储提出了更高的要求。对我们来说，既需要保证原有战略方向的稳定及快速迭代落地，又需要快速的学习和重新锚定市场需求发展趋势，调整航向。因此，我们不仅在产品开发过程中使用了 AGI 的相关技术进行辅助，而且还在探索为大模型机器学习提供高效存储的可能性。',
        ],
      },
    ],
  },
]

const SectionWrapper = styled.section`
  background: #ededf6;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 0.59rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.58rem;
`
const SectionTitle = styled(CNHead5S)``
const Card = styled.div`
  margin-bottom: 0.36rem;
  padding-top: 0.48rem;
  padding-bottom: 0.77rem;
  padding-inline: 0.48rem;
  background: #ffffffa3;
  border-radius: 0.32rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const CardTitle = styled(CNHead4)`
  padding-bottom: 0.39rem;
`
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const CardPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8%;
`
const CardAvatar = styled.div`
  width: 0.64rem;
  height: 0.64rem;
  margin-bottom: 0.08rem;
  background: #d9d9d9;
  border-radius: 50%;
`
const CardName = styled(CNBodyLarge)``
const CardTextWrapper = styled.div<{ index: number }>`
  position: relative;
  width: 90%;
  margin-bottom: 0.5rem;
  padding-block: 0.12rem;
  padding-inline: 0.24rem;
  background: ${props =>
    props.index % 2 === 0 ? '#9797971A' : props => props.theme.secondary02};
  color: ${props => props.theme.themeDark02};
  border-radius: 0.08rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const CardText = styled(CNBodyLarge)``
const Rectangle = styled.div<{ index: number }>`
  position: absolute;
  left: -0.08rem;
  top: 0.32rem;
  width: 0;
  height: 0;
  border-top: 0.08rem solid
    ${props =>
      props.index % 2 === 0 ? '#9797971A' : props => props.theme.secondary02};
  border-left: 0.08rem solid transparent;
`

export const QuickQA: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SectionTitle
          style={{ paddingBottom: '0.82rem', paddingLeft: '0.16rem' }}
        >
          创立达坦科技的快问快答
        </SectionTitle>
        {QAdata.map(({ title, content }, index) => (
          <Card key={index}>
            <CardTitle>{title}</CardTitle>
            {content.map(({ name, text }, index) => (
              <CardContent key={index}>
                <CardPerson>
                  <CardAvatar />
                  <CardName>{name}</CardName>
                </CardPerson>
                <CardTextWrapper index={index}>
                  <Rectangle index={index} />
                  {text.map((item, index) => (
                    <CardText key={index}>{item}</CardText>
                  ))}
                </CardTextWrapper>
              </CardContent>
            ))}
          </Card>
        ))}
      </SectionContainer>
    </SectionWrapper>
  )
}
