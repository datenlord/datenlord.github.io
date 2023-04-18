import styled from 'styled-components'
import { Header } from '@/components/Header'
import imgUrl1 from '@/assets/Home/cover3.svg'
import imgUrl2 from '@/assets/Home/cover5.svg'

const ViewWrapper = styled.div`
  padding-top: 128px;
  color: #42424a;
`
const ViewContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
`
const Heading1 = styled.div`
  margin-bottom: 52px;
  font-weight: 700;
  font-size: 30px;
  line-height: 33px;
  text-align: center;
`
const Heading3 = styled.div`
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 22.5px;
  line-height: 33.3px;
  text-align: center;
`
const Heading4 = styled.div`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`
const DecorationHeading1 = styled(Heading1)`
  padding-left: 16px;
  text-align: left;
  border-left: 16px solid #7680dd;
`
const DecorationHeading4 = styled(Heading4)`
  margin-bottom: 32px;
  padding-right: 12px;
  width: min-content;
  line-height: 16.5px;
  border-right: 4px solid #7680dd;
`
const Section = styled.div`
  margin-bottom: 96px;
`
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`
const Card = styled.div`
  padding: 32px;
  width: 48%;
  min-height: 200px;
  border-radius: 14px;
  box-shadow: 0px 9px 30px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 1024px) {
    margin-bottom: 32px;
    width: 100%;
  }
`
const SText = styled.div`
  font-weight: 400;
  font-size: 13.5px;
  line-height: 22.5px;
`
const Image = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  margin-inline: auto;
`

const SolutionPage: React.FC = () => {
  return (
    <ViewWrapper>
      <ViewContainer>
        <Header theme="dark" />
        <Section>
          <Heading1>Hardware Acceleration For Storage Network</Heading1>
          <CardContainer>
            <Card>
              <DecorationHeading4>Problem</DecorationHeading4>
              <Heading4>
                High latency and inconsistency for geo-distributed Storage
              </Heading4>
              <SText>
                Data is bound to a specific cloud and cannot access freely. The
                isolation between clouds may not pose a problem when business
                scale is small. However, with the development of business which
                needs to access multiple clouds and multiple data centers world
                wide frequently, data isolation and data fragmentation resulting
                from cloud barrier become impediment to business growth.
              </SText>
            </Card>
            <Card>
              <DecorationHeading4>Solution</DecorationHeading4>
              <Heading4>
                Unified data management to automate data migration and backup:
              </Heading4>
              <SText>
                No matter where data is stored, DatenLord can accelerate data
                access across clouds by leveraging memory to cache hot data, and
                provide unified data management to automate data migration and
                backup.
              </SText>
            </Card>
          </CardContainer>
        </Section>
        <Section>
          <DecorationHeading1>Related Resources</DecorationHeading1>
          <CardContainer>
            <Card>
              <Heading3>Geo-distributed metadata management</Heading3>
              <Image src={imgUrl1} />
            </Card>
            <Card>
              <Heading3>Geo-distributed metadata management</Heading3>
              <Image src={imgUrl1} />
            </Card>
          </CardContainer>
        </Section>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default SolutionPage
