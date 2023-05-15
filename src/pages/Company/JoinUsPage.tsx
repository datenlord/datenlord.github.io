import { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Header } from '@/components/Header'

import hrQRCodeUrl from '@/assets/hr-qr-code.png'
import logoUrl from '@/assets/logo.svg'
import locationIconUrl from '@/assets/Company/JoinUs/location.svg'
import clockIconUrl from '@/assets/Company/JoinUs/clock.svg'
import calendarIconUrl from '@/assets/Company/JoinUs/calendar.svg'

const ViewWrapper = styled.div`
  min-height: 100vh;
  padding-top: 84px;
  background: #fafafa;
`
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  min-height: calc(100vh - 84px);
  margin-inline: auto;
  padding-block: 48px;
  padding-inline: 48px;
`
const LeftSidebarContainer = styled.aside`
  display: block;
  width: 250px;
  margin-right: 48px;
`
const MainContainer = styled.main`
  flex-grow: 1;
`
const RightSidebarContainer = styled.aside`
  width: 200px;
  margin-left: 48px;
`
const Filters = styled.section`
  position: sticky;
  top: calc(84px + 48px);
  left: 0;
  min-height: 100px;
  padding: 16px;
  background: #fff;
`
const SidebarCard = styled.section`
  padding: 16px;
  margin-bottom: 16px;
  min-height: 100px;
  background: #fff;
  :last-child {
    margin-bottom: 0;
  }
`
const SidebarCard1 = styled(SidebarCard)`
  position: sticky;
  top: calc(84px + 48px);
  left: 0;
`
const Text1 = styled.p`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 13.5px;
`
const ColorText1 = styled(Text1)`
  color: #7680dd;
`
const IconText1 = styled(Text1)`
  position: relative;
  padding-left: 24px;
  ::before {
    position: absolute;
    top: -3px;
    left: 0;
    content: '📨';
  }
`
const Text2 = styled.p`
  font-size: 12px;
  margin-bottom: 6px;
`
const Text2Bold = styled(Text2)`
  font-weight: 700;
`
const Text2Regular = styled(Text2)`
  font-weight: 400;
`
const ColorText = styled.span`
  color: #7680dd;
`
const Img = styled.img`
  display: block;
  width: 120px;
  margin-inline: auto;
`
const Test3 = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`
const Test4 = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`
const H2 = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`
const JDList = styled.section`
  min-height: 200px;
  /* background: #000; */
`
const JDCard = styled.div`
  display: flex;
  min-height: 200px;
  margin-bottom: 24px;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(20, 20, 20, 0.05);
  border-radius: 8px;
  box-shadow: 0px 1px 2.5px rgba(0, 0, 0, 0.03);
  :last-child {
    margin-bottom: 0;
  }
`
const Logo = styled.img`
  height: min-content;
  width: 60px;
  margin-right: 24px;
`
const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;
`
const Text5 = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #7767a0;
`
const H3 = styled.h3`
  font-size: 22.5px;
  font-weight: 600;
  margin-bottom: 12px;
`
const TagContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`
const Placeholder = styled.div`
  font-size: 15px;
  font-weight: 400;
  padding-right: 24px;
`
interface TagProps {
  icon: string
}
const Tag = styled.div<TagProps>`
  position: relative;
  padding-left: 20px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 24px;
  ::before {
    position: absolute;
    top: 3px;
    left: 0;
    display: inline-block;
    content: '';
    width: 16px;
    height: 16px;
    background-image: url(${props => props.icon});
    background-size: cover;
  }
`
const P = styled.li`
  font-size: 13.5px;
  font-weight: 400;
`
const SP = styled(P)`
  color: #7680dd;
`
const Button = styled.button`
  padding: 6px 12px;
  color: #d9dbef;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  background: #7680dd;
  border: none;
  border-radius: 4px;
`
const Container = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 400;
`
const Checkbox = styled.input`
  margin: 0;
  margin-right: 10px;
  height: 14px;
  width: 14px;
`
type JDdataProps = {
  id: string
  label: string
  tag: string[]
  workNature: string
  workType: 'fullTime' | 'internship'
  releaseTime: string
  content: {
    title: string
    body: string[]
  }[]
}[]
const JDdata: JDdataProps = [
  {
    id: 'Distributed storage software development senior engineer'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label: 'Distributed storage software development senior engineer',
    tag: ['full-time', 'urgent recruitment'],
    workNature: 'Teleworking',
    workType: 'fullTime',
    releaseTime: '2023-4-17',
    content: [
      {
        title: '[Job Responsibilities]',
        body: [
          'Participate in the development of high-performance distributed storage systems, involving development content including but not limited to:Distributed storage system development;',
          'Improve the testing of DatenLord and build a new DatenLord testing framework;',
          'Improve the performance of DatenLord distributed performance.',
        ],
      },
      {
        title: '[Job Requirements]',
        body: [
          'At least 5 years of experience in distributed system development or research, preferably in distributed storage system development or research;',
          'Relevant development and usage experience of distributed storage systems such as HDFS , Ceph, GlusterFS;',
          'Familiarity with Rust, C or C++ languages;',
          'Experienced in developing and maintaining open source projects.',
        ],
      },
    ],
  },
  {
    id: 'Rust distributed storage development'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label: 'Rust distributed storage development',
    tag: ['internship', 'soon to be filled'],
    workNature: 'Teleworking',
    workType: 'internship',
    releaseTime: '2023-4-17',
    content: [
      {
        title: '[Job Responsibilities]',
        body: [
          'Participate in the development of high-performance distributed storage systems, involving development content including but not limited to:',
          'Distributed storage system development;',
          'Distributed data consistency protocol research and development;',
          'Distributed caching, data management services;',
          'Kernel-driven development using Rust language.',
        ],
      },
      {
        title: '[Job Requirements]',
        body: [
          'Proficiency in Rust language, familiar with multi-threaded, high concurrency programming;',
          'Familiar with Linux operation system storage management related functions;',
          'Strong learning ability, self-driven and team player;',
          '6 months or more internship time, 4~5 days per week.',
        ],
      },
      {
        title: '[Preferred Skills]',
        body: [
          'Familiarity with Rust asynchronous programming, experienced with tokio or async-std is preferred;',
          'Familiar with distributed consistency protocol Paxos or Raft, distributed KV storage etcd, experienced in programming CSI interface of K8S is preferred;',
          'Previously experienced with open source projects/open source contributions is preferred.',
        ],
      },
    ],
  },
  {
    id: 'FPGA development'.split(' ').join('-').toLowerCase(),
    label: 'FPGA development',
    tag: ['internship'],
    workNature: 'Teleworking',
    workType: 'internship',
    releaseTime: '2023-4-17',
    content: [
      {
        title: '[Job Responsibilities]',
        body: [
          'Responsible for implementing network IO acceleration based on FPGA, as well as the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;',
          'Realize RTL design, integration and verification of commonly used peripheral interface IP;',
          'Cooperate with upper layer software to realize software and hardware joint debugging.',
        ],
      },
      {
        title: '[Job Requirements]',
        body: [
          'Familiar with FPGA-based design flow, familiar with Xilinx FPGA chip architecture, proficient in Xilinx FPGA development tools;',
          'Proficiency in the use of Verilog, SystemVerilog and SystemVerilog Assertion;',
          'Proficiency in TCL, Python scripting language;',
          'Strong learning ability, self-driven and team player;',
          '6 months or more of internship time, 4~5 days per week.',
        ],
      },
      {
        title: '[Preferred Skills]',
        body: [
          'Familiarity with at least one new generation HDL language such as Bluespec, SpinalHDL, Chisel, Clash, etc;',
          'Familiar with CXL, PCIe, AXI, ACE, CHI and other related bus interface development is preferred;',
          'Familiar with TCP/IP, RDMA, NVMe protocols and experienced in encryption, compression and coding development is preferred.',
        ],
      },
    ],
  },
  {
    id: 'The joint hardware and software research and development internship'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label:
      'The joint hardware and software research and development internship',
    tag: ['internship'],
    workNature: 'Teleworking',
    workType: 'internship',
    releaseTime: '2023-4-17',
    content: [
      {
        title: '[Job Responsibilities]',
        body: [
          'Participate in the hardware and software development of high performance storage SoC chips:',
          'Responsible for the RTL implementation of network IO acceleration;',
          'Responsible for the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;',
          'Responsible for Linux driver development of SoC chip;',
          'Responsible for the implementation of hardware and software joint debugging and automated testing.',
        ],
      },
      {
        title: '[Job Requirements]',
        body: [
          'Familiar with IC design flow, familiar with commonly used simulation, synthesis and other EDA tools;',
          "Familiar with Xilinx's FPGA design flow, proficient in Xilinx's FPGA development tools;",
          'Familiar with new generation HDL languages such as Bluespec, SpinalHDL, Chisel or Clash;',
          'Familiarity with Rust for Linux development kernel modules, drivers;',
          'Familiarity with QEMU-based toolchain of hardware and software joint debugging;',
          'Strong learning ability, self-driven and team player.',
        ],
      },
      {
        title: '[Preferred Skills]',
        body: [
          'Experienced in network or storage hardware system development is preferred;',
          'Familiarity with TCP/IP or InfiniBand/RDMA network protocol stack is preferred;',
          'Familiarity with protocol interface development such as CXL, PCIe, AXI, ACE, CHI, NVMe, etc. Is preferred;',
          'Relevant experience in DSP domain, familiar with LDPC, fountain codes, elliptic curve encryption algorithms and zero-knowledge proof algorithms is preferred;',
          'Experienced in Linux kernel network, file and storage related development is preferred;',
          'Long-term internship (more than 1 year) is preferred.',
        ],
      },
    ],
  },
]

const JoinUsPage: React.FC = () => {
  const [data, setData] = useState(JDdata)
  const [selected, setSelected] = useState({
    fullTime: true,
    internship: true,
  })

  useEffect(() => {
    setData(JDdata.filter(item => selected[item.workType] === true))
  }, [selected])

  return (
    <ViewWrapper>
      <Header theme="dark" activeId="company" />
      <ViewContainer>
        <LeftSidebarContainer>
          <Filters>
            <Test3>Filters</Test3>
            <Test4>Type of employment</Test4>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="full-time"
                checked={selected['fullTime']}
                onChange={() => {
                  const _selected = { ...selected }
                  _selected['fullTime'] = !_selected['fullTime']
                  setSelected(_selected)
                }}
              />
              <label htmlFor="full-time">Full time</label>
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="internship"
                checked={selected['internship']}
                onChange={() => {
                  const _selected = { ...selected }
                  _selected['internship'] = !_selected['internship']
                  setSelected(_selected)
                }}
              />
              <label htmlFor="internship">internship</label>
            </CheckboxContainer>
          </Filters>
        </LeftSidebarContainer>
        <MainContainer>
          <JDList>
            {data.map(props => {
              const {
                id,
                label,
                tag,
                workNature,
                workType,
                releaseTime,
                content,
              } = props
              return (
                <JDCard key={id}>
                  <Logo src={logoUrl} />
                  <ContentContainer>
                    <Text5>{tag.join(', ')}</Text5>
                    <Container>
                      <H3>{label}</H3>
                      {/* <Button>New Post</Button> */}
                    </Container>
                    <TagContainer>
                      <Tag icon={locationIconUrl}>{workNature}</Tag>
                      <Placeholder>·</Placeholder>
                      <Tag icon={clockIconUrl}>{workType}</Tag>
                      <Placeholder>·</Placeholder>
                      <Placeholder>·</Placeholder>
                      <Tag icon={calendarIconUrl}>
                        {moment(releaseTime, 'YYYY-MM-DD').fromNow()}
                      </Tag>
                    </TagContainer>
                    {content.map(({ title, body }) => (
                      <div key={title}>
                        <SP as={'p'}>{title}</SP>
                        <ol>
                          {body.map(item => (
                            <P key={item}>{item}</P>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </ContentContainer>
                </JDCard>
              )
            })}
          </JDList>
        </MainContainer>
        <RightSidebarContainer>
          <SidebarCard>
            <Text2Bold>
              - After the resume evaluation is qualified, the interview process
              is
            </Text2Bold>
            <ColorText1>Internship position:</ColorText1>
            <Text2Regular>
              Project written test - two days Idea review-communication and
              mentoring
            </Text2Regular>
            <Text2Regular>
              Performance optimization - no more than one week Cross-Interview
            </Text2Regular>
            <ColorText1>
              School recruitment / social recruitment positions:
            </ColorText1>
            <Text2Regular>
              Project written test - two days Idea review-communication and
              mentoring
            </Text2Regular>
            <Text2Regular>
              Performance optimization - no more than one week Technical open
              talk evaluation
            </Text2Regular>
          </SidebarCard>
          <SidebarCard1>
            <IconText1>Interview Process</IconText1>
            <Text2Bold>- Resume submission to the email:</Text2Bold>
            <Text2Regular>
              <ColorText>ruopeng.zhou@datenlord.com</ColorText> or scan the QR
              code at the bottom of the article to add WeChat.
            </Text2Regular>
            <Img src={hrQRCodeUrl} />
          </SidebarCard1>
        </RightSidebarContainer>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default JoinUsPage
