import { styled } from 'styled-components'

import { Typography } from '@/components/Typography'

import AndreasUrl from '@/assets/home/andreas.png'
import BrunoThethe from '@/assets/home/bruno-thethe.png'
import MahdiBafande from '@/assets/home/mahdi-bafande.png'

const { Heading, Paragraph } = Typography
const { Heading3, CNHead4 } = Heading
const { CNBodyLarge } = Paragraph

const SectionWrapper = styled.section`
  background: #f7f7f9;
`
const SectionContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.84rem;
  padding-inline: 2.24rem;
`
const Title = styled(CNHead4)`
  text-align: center;
  padding-bottom: 1.1rem;
`
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.17rem 0.26rem;
  height: 4.5rem;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 0.48rem;
  background-size: cover;
  border-radius: 0.18rem;
`
const BackupCard = styled(Card)`
  background-image: url(${AndreasUrl});
  grid-area: 1 / 1 / 2 / 2;
`
const LoadingCard = styled(Card)`
  background-image: url(${BrunoThethe});
  grid-area: 2 / 1 / 3 / 2;
`
const MigrationCard = styled(Card)`
  background-image: url(${MahdiBafande});
  grid-area: 1 / 2 / 3 / 3;
`
const CardTitle = styled(Heading3)`
  padding-bottom: 0.06rem;
  color: #fff;
`
const CardDescription = styled(CNBodyLarge)`
  color: #d9dbef;
`

export const UseSection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionContainer>
        <Title>使用场景</Title>
        <ContentContainer>
          <BackupCard>
            <CardTitle>跨云数据实时备份</CardTitle>
            <CardDescription>
              尤其针对关键业务应用场景，如数据库。
            </CardDescription>
          </BackupCard>
          <LoadingCard>
            <CardTitle>跨云数据加载</CardTitle>
            <CardDescription>
              特别针对人工智能、大数据训练场景。
            </CardDescription>
          </LoadingCard>
          <MigrationCard>
            <CardTitle>跨云应用迁移</CardTitle>
            <CardDescription>
              尤其针对具有高并发性和业务弹性要求高的场景的应用，如中国的双十一促销活动。
            </CardDescription>
          </MigrationCard>
        </ContentContainer>
      </SectionContainer>
    </SectionWrapper>
  )
}
