import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header'
import imgUrl1 from '@/assets/Home/cover3.svg'
import imgUrl2 from '@/assets/Home/cover5.svg'
import imgUrl3 from '@/assets/Home/cover2.svg'
import { useEffect, useState } from 'react'

interface PageDataProps {
  title: string
  problem: {
    title: string
    description: string
  }
  solution: {
    title: string
    description: string
  }
  related: {
    title: string
    cover: string
    url: string
  }[]
}

const ViewWrapper = styled.div`
  padding-top: 84px;
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
const RelatedCard = styled(Card)`
  cursor: pointer;
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
  const [pageData, setPageData] = useState<PageDataProps>()
  const navigate = useNavigate()
  const { id } = useParams()

  const getPageData = (id: string | undefined) => {
    switch (id) {
      case 'Unified-and-High-Performance-Data-Access-Across-Clouds':
        return {
          title: 'Unified and High Performance Data Access Across Clouds',
          problem: {
            title:
              'Cloud barrier leads to data isolation and data fragmentation:',
            description:
              'Data is bound to a specific cloud and cannot access freely. The isolation between clouds may not pose a problem when business scale is small. However, with the development of business which needs to access multiple clouds and multiple data centers world wide  frequently, data isolation and data fragmentation resulting from cloud barrier become impediment to business growth.',
          },
          solution: {
            title:
              'Unified data management to automate data migration and backup:',
            description:
              'No matter where data is stored, DatenLord can accelerate data access across clouds by leveraging memory to cache hot data, and provide unified data management to automate data migration and backup.',
          },
          related: [
            {
              title: 'Geo-distributed metadata management',
              cover: imgUrl1,
              url: '/solution/Geo-Distributed-Metadata-management',
            },
            {
              title: 'Hardware acceleration for storage network',
              cover: imgUrl2,
              url: '/solution/Hardware-Acceleration-For-Storage-Network',
            },
          ],
        }
      case 'Geo-Distributed-Metadata-management':
        return {
          title: 'Geo-Distributed Metadata management',
          problem: {
            title: 'High latency and inconsistency for geo-distributed Storage',
            description:
              'Nowadays distributed consensus protocol is confined to be used in a single data center, and geo-distributed consensus protocol is only contemplated in theory. In the circumstances of accessing data across clouds, the speed and consistency has to be compromised.',
          },
          solution: {
            title:
              'The first industrial geo-distributed metadata management by consensus protocol',
            description:
              'DatenLord leverages asynchronous programming architecture and bypasses the Linux kernel to achieve completely kernel-independent, autonomous scheduling and management of storage IO. The protocol ensures data consistency across data nodes. The low-latency geo-distributed consensus protocol guarantees high-speed and strong consistency in WAN scenarios; and no single point bottleneck in the system.',
          },
          related: [
            {
              title: 'Unified and high performance data access across cloud',
              cover: imgUrl3,
              url: '/solution/Unified-and-High-Performance-Data-Access-Across-Clouds',
            },
            {
              title: 'Hardware acceleration for storage network',
              cover: imgUrl2,
              url: '/solution/Hardware-Acceleration-For-Storage-Network',
            },
          ],
        }
      case 'Hardware-Acceleration-For-Storage-Network':
        return {
          title: 'Hardware-Acceleration-For-Storage-Network',
          problem: {
            title: 'High latency and inconsistency for geo-distributed Storage',
            description:
              'Communication across clouds requires reliable high-speed network and fast caching mechanism. Current software-based solution has become the performance bottleneck and can no longer meet the requirement as huge amount of data  already scatter around  different cloud providers and geo-distributed data centers.',
          },
          solution: {
            title: 'Hardware Accelerator',
            description:
              'Hardware agile development methodology to build customized hardware; Adoption of RDMA and DPDK to build high performance network; Hardware implementations of RDMA protocol, encryption, compression and encoding and ultra-fast storage proof. ',
          },
          related: [
            {
              title: 'Unified and high performance data access across cloud',
              cover: imgUrl1,
              url: '/solution/Unified-and-High-Performance-Data-Access-Across-Clouds',
            },
            {
              title: 'Hardware acceleration for storage network',
              cover: imgUrl3,
              url: '/solution/Hardware-Acceleration-For-Storage-Network',
            },
          ],
        }
      default:
        return {
          title: 'Unified and High Performance Data Access Across Clouds',
          problem: {
            title:
              'Cloud barrier leads to data isolation and data fragmentation:',
            description:
              'Data is bound to a specific cloud and cannot access freely. The isolation between clouds may not pose a problem when business scale is small. However, with the development of business which needs to access multiple clouds and multiple data centers world wide  frequently, data isolation and data fragmentation resulting from cloud barrier become impediment to business growth.',
          },
          solution: {
            title:
              'Unified data management to automate data migration and backup:',
            description:
              'No matter where data is stored, DatenLord can accelerate data access across clouds by leveraging memory to cache hot data, and provide unified data management to automate data migration and backup.',
          },
          related: [
            {
              title: 'Geo-distributed metadata management',
              cover: imgUrl1,
              url: '/solution/Geo-Distributed-Metadata-management',
            },
            {
              title: 'Hardware acceleration for storage network',
              cover: imgUrl2,
              url: '/solution/Hardware-Acceleration-For-Storage-Network',
            },
          ],
        }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const _pageData = getPageData(id)
    setPageData(_pageData)
  }, [id])

  return (
    <ViewWrapper>
      <ViewContainer>
        <Header theme="dark" activeId="solution" />
        <Section>
          <Heading1>{pageData?.title}</Heading1>
          <CardContainer>
            <Card>
              <DecorationHeading4>Problem</DecorationHeading4>
              <Heading4>{pageData?.problem?.title}</Heading4>
              <SText>{pageData?.problem?.description}</SText>
            </Card>
            <Card>
              <DecorationHeading4>Solution</DecorationHeading4>
              <Heading4>{pageData?.solution?.title}</Heading4>
              <SText>{pageData?.solution?.description}</SText>
            </Card>
          </CardContainer>
        </Section>
        <Section>
          <DecorationHeading1>Related Resources</DecorationHeading1>
          <CardContainer>
            {(pageData?.related || []).map(({ title, cover, url }) => (
              <RelatedCard key={title} onClick={() => navigate(url)}>
                <Heading3>{title}</Heading3>
                <Image src={cover} />
              </RelatedCard>
            ))}
          </CardContainer>
        </Section>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default SolutionPage
