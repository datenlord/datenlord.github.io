import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import React from 'react'
import styled from 'styled-components'
import img1Url from '@/assets/company/intro/image1.png'
import img2Url from '@/assets/company/intro/image2.png'
import userUrl from '@/assets/company/join-us/user.png'
import githubIconUrl from '@/assets/company/contact-us/github.png'
import mediumIconUrl from '@/assets/company/contact-us/medium.png'
import substackIconUrl from '@/assets/company/contact-us/substack.png'

interface JD {
  name: string
  txt?: string
  responsibilities: string[]
  requirements: string[]
  skills?: string[]
  link?: string
}

const JDData = [
  {
    name: 'Distributed storage software development senior engineer (full-time, urgent recruitment)',
    responsibilities: [
      'Participate in the development and maintenance of the open source distributed storage project DatenLord;',
      'Improve the testing of DatenLord and build a new DatenLord testing framework;',
      'Improve the performance of DatenLord distributed performance.',
    ],
    requirements: [
      'At least 5 years of experience in distributed system development or research, preferably in distributed storage system development or research;',
      'Relevant development and usage experience of distributed storage systems such as HDFS , Ceph, GlusterFS;',
      'Familiarity with Rust, C or C++ languages;',
      'Experienced in developing and maintaining open source projects.',
    ],
  },
  {
    name: 'Rust distributed storage development (internship, soon to be filled)',
    txt: 'Participate in the development of high-performance distributed storage systems, involving development content including but not limited to:',
    responsibilities: [
      'Distributed storage system development;',
      'Distributed data consistency protocol research and development;',
      'Distributed caching, data management services;',
      'Kernel-driven development using Rust language.',
    ],
    requirements: [
      'Proficiency in Rust language, familiar with multi-threaded, high concurrency programming;',
      'Familiar with Linux operation system storage management related functions;',
      'Strong learning ability, self-driven and team player;',
      '6 months or more internship time, 4~5 days per week.',
    ],
    skills: [
      'Familiarity with Rust asynchronous programming, experienced with tokio or async-std is preferred;',
      'Familiar with distributed consistency protocol Paxos or Raft, distributed KV storage etcd, experienced in programming CSI interface of K8S is preferred;',
      'Previously experienced with open source projects/open source contributions is preferred.',
    ],
  },
  {
    name: 'FPGA development (internship)',
    responsibilities: [
      'Responsible for implementing network IO acceleration based on FPGA, as well as the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;',
      'Realize RTL design, integration and verification of commonly used peripheral interface IP;',
      'Cooperate with upper layer software to realize software and hardware joint debugging.',
    ],
    requirements: [
      'Familiar with FPGA-based design flow, familiar with Xilinx FPGA chip architecture, proficient in Xilinx FPGA development tools;',
      'Proficiency in the use of Verilog, SystemVerilog and SystemVerilog Assertion;',
      'Proficiency in TCL, Python scripting language;',
      'Strong learning ability, self-driven and team player;',
      '6 months or more of internship time, 4~5 days per week.',
    ],
    skills: [
      'Familiarity with at least one new generation HDL language such as Bluespec, SpinalHDL, Chisel, Clash, etc;',
      'Familiar with CXL, PCIe, AXI, ACE, CHI and other related bus interface development is preferred;',
      'Familiar with TCP/IP, RDMA, NVMe protocols and experienced in encryption, compression and coding development is preferred.',
    ],
  },
  {
    name: 'The joint hardware and software research and development internship (internship)',
    txt: 'Participate in the hardware and software development of high performance storage SoC chips:',
    responsibilities: [
      'Responsible for the RTL implementation of network IO acceleration;',
      'Responsible for the design and RTL implementation of algorithm acceleration for encryption, compression, coding, etc.;',
      'Responsible for Linux driver development of SoC chip;',
      'Responsible for the implementation of hardware and software joint debugging and automated testing.',
    ],
    requirements: [
      'Familiar with IC design flow, familiar with commonly used simulation, synthesis and other EDA tools;',
      "Familiar with Xilinx's FPGA design flow, proficient in Xilinx's FPGA development tools;",
      'Familiar with new generation HDL languages such as Bluespec, SpinalHDL, Chisel or Clash;',
      'Familiarity with Rust for Linux development kernel modules, drivers;',
      'Familiarity with QEMU-based toolchain of hardware and software joint debugging;',
      'Strong learning ability, self-driven and team player.',
    ],
    skills: [
      'Experienced in network or storage hardware system development is preferred;',
      'Familiarity with TCP/IP or InfiniBand/RDMA network protocol stack is preferred;',
      'Familiarity with protocol interface development such as CXL, PCIe, AXI, ACE, CHI, NVMe, etc. Is preferred;',
      'Relevant experience in DSP domain, familiar with LDPC, fountain codes, elliptic curve encryption algorithms and zero-knowledge proof algorithms is preferred;',
      'Experienced in Linux kernel network, file and storage related development is preferred;',
      'Long-term internship (more than 1 year) is preferred.',
    ],
  },
]

const Title = styled.div`
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 0.6rem;
  text-align: center;
  color: #42424a;
  margin-inline: 2.5rem;
  padding-bottom: 0.88rem;
  border-bottom: 0.01rem solid #d9dbef;
  margin-bottom: 0.88rem;
`
const Txt = styled.div`
  font-weight: 400;
  font-size: 0.28rem;
  line-height: 0.5rem;
`
const List = styled(Txt)`
  position: relative;
  padding-left: 0.24rem;
  &::before {
    content: '•';
    position: absolute;
    top: 0;
    left: 0;
  }
`
const Bold = styled.span`
  font-weight: 600;
  color: #7680dd;
`
const CardTitle = styled.div`
  font-weight: 600;
  font-size: 0.3rem;
  line-height: 0.41rem;
  margin-bottom: 0.16rem;
`
const CardTxt = styled.div`
  font-weight: 400;
  font-size: 0.24rem;
  line-height: 0.41rem;
`
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.24rem;
`
const Image = styled.img`
  width: 4.4rem;
  height: min-content;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const TxtCtr = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.img`
  height: 0.6rem;
  margin-right: 0.2rem;
`
const Txt1 = styled.div`
  font-weight: 600;
  font-size: 0.28rem;
  line-height: 0.5rem;
  color: #000000;
`

const Card: React.FC<{ data: JD }> = ({ data }) => {
  const { name, responsibilities } = data
  return (
    <div
      style={{
        border: '0.01rem solid #EAEBF0',
        padding: '0.35rem',
        borderRadius: '0.01rem',
        color: '#42424A',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '0.7rem',
          height: '0.7rem',
          background: '#D9DBEF',
          borderRadius: '50%',
          position: 'relative',
          marginBottom: '0.35rem',
        }}
      >
        <img
          src={userUrl}
          style={{
            width: '0.31rem',
            position: 'absolute',
            top: '0.19rem',
            left: '0.19rem',
          }}
        />
      </div>
      <CardTitle>{name}</CardTitle>
      <CardTxt>[ Job Responsibilities ]</CardTxt>
      {responsibilities.map(item => (
        <CardTxt key={item}>{item}</CardTxt>
      ))}
      <div
        style={{
          position: 'absolute',
          top: '0.35rem',
          right: '0.4rem',
          fontWeight: '600',
          fontSize: '0.2rem',
          lineHeight: '0.32rem',
          padding: '0.17rem 0.26rem',
          border: '0.01rem solid #DAE0E6',
          borderRadius: '0.08rem',
        }}
      >
        Job Details
      </div>
    </div>
  )
}

const Company = () => {
  return (
    <React.Fragment>
      <Cover>Company</Cover>
      <Section>
        <Title>Company Introduction</Title>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.88rem',
            marginBottom: '0.88rem',
          }}
        >
          <img
            src={img1Url}
            style={{ width: '4.46rem', height: 'min-content' }}
          />
          <Txt>
            DatenLord has consistently dedicated itself to building{' '}
            <Bold>
              the high-performance AI+Cloud infrastructure platform, actively
              driving the implementation of AI applications.
            </Bold>{' '}
            Through deep integration of software and hardware, DatenLord
            delivers high-performance storage and networking. It provides
            <Bold>elastic , convenient, and cost-effective</Bold> infrastructure
            services for AI applications, aiming to meet the diverse demands of
            AI + Cloud across various industries.
          </Txt>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <div>
            <List style={{ marginBottom: '0.64rem' }}>
              DatenLord focuses on <Bold>core foundational technologies</Bold>,
              engaging in various cutting-edge technical domains such as
              distributed systems, Linux kernel, InfiniBand/RDMA, SoC (System on
              Chip), hardware acceleration, and more, through deep integration
              of software and hardware.
            </List>
            <List>
              The core members of the company mostly hail from top international
              technology companies like Google, Microsoft, Alibaba, bringing{' '}
              <Bold>
                profound expertise in both software and hardware technologies
                along with rich industry experience
              </Bold>
              .
            </List>
          </div>
          <img src={img2Url} style={{ width: '5.11rem' }} />
        </div>
        <Title>Join Us</Title>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridAutoFlow: 'dense',
            gap: '0.88rem',
            marginBottom: '1.2rem',
          }}
        >
          {JDData.map(data => {
            return <Card key={data.name} data={data} />
          })}
        </div>
        <Title>Follow Us</Title>
        <Main>
          <Image src={img1Url} />
          <Content>
            <TxtCtr style={{ marginBottom: '20px' }}>
              <Icon src={githubIconUrl} />
              <Txt1>https://datenlord.github.io</Txt1>
            </TxtCtr>
            <TxtCtr style={{ marginBottom: '20px' }}>
              <Icon src={mediumIconUrl} />
              <Txt1>https://medium.com/@datenlord</Txt1>
            </TxtCtr>
            <TxtCtr>
              <Icon src={substackIconUrl} />
              <Txt1>https://substack.com/@datenlord</Txt1>
            </TxtCtr>
          </Content>
        </Main>
      </Section>
    </React.Fragment>
  )
}

export default Company
