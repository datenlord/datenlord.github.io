import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import React from 'react'
import styled from 'styled-components'
import img1Url from '@/assets/community/project/image1.png'

const Card = styled.div`
  padding: 0.75rem 0.4rem;
  border-radius: 0.12rem;
  position: relative;
  overflow: hidden;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 0.63rem;
  line-height: 0.84rem;
`
const Desc = styled.div`
  font-weight: 600;
  font-size: 0.3rem;
  line-height: 0.375rem;
`
const List = styled.div`
  font-weight: 400;
  font-size: 0.24rem;
  line-height: 0.64rem;
  color: #0a061f;
`
const CardTxt = styled.div`
  font-weight: 700;
  font-size: 0.4rem;
  line-height: 0.53rem;
`
const CardDesc = styled.div`
  font-weight: 400;
  font-size: 0.24rem;
  line-height: 0.36rem;
`
const Image = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 4.2rem;
`

const Project: React.FC = () => {
  return (
    <React.Fragment>
      <Cover>Open Source Project</Cover>
      <Section>
        <Title style={{ marginBottom: '0.36rem' }}>RDMA</Title>
        <Desc style={{ marginBlock: '0.88rem' }}>
          Async-RDMA is a framework designed to provide advanced abstractions
          and an asynchronous API for developing Remote Direct Memory Access
          (RDMA) applications.
        </Desc>
        <Card
          style={{
            background: '#7767A0',
            color: '#FFFFFF',
            marginBottom: '0.32rem',
          }}
        >
          <CardDesc
            style={{
              marginBottom: '0.16rem',
            }}
          >
            RDMA enables direct memory access from one machine to another,
            enhancing the performance of applications that require low latency
            and high throughput. RDMA supports kernel bypass and zero-copy,
            eliminating the need for CPU involvement. However, writing RDMA
            applications using low-level C language libraries can be challenging
            and error-prone. To simplify this process, we developed Async-RDMA,
            which offers an easy-to-use API, abstracting the complexity of
            underlying RDMA operations.
          </CardDesc>
          <CardDesc>
            With Async-RDMA, most RDMA operations can be accomplished with just
            a single line of code. It provides the following key features:
          </CardDesc>
        </Card>
        <Card
          style={{
            background: '#D9DBEF',
            marginBottom: '0.88rem',
          }}
        >
          <List>
            1. A tool for establishing connections with RDMA endpoints.
          </List>
          <List>
            2. An advanced asynchronous API for transferring data between
            endpoints.
          </List>
          <List>3. A high-level API for managing RDMA memory regions.</List>
          <List>
            4. A framework working behind the scenes to manage memory regions
            and execute RDMA requests asynchronously.
          </List>
          <Image src={img1Url} />
        </Card>
        <Desc style={{ marginBottom: '0.88rem' }}>
          Open-RDMA is an open-source software and hardware implementation suite
          based on the optimized extension of the RoCE v2 protocol.
        </Desc>
        <Card style={{ background: '#0A061F', color: '#FFFFFF' }}>
          <CardDesc style={{ marginBottom: '0.16rem' }}>
            RoCE v2
              {' '}
              (RDMA over Converged Ethernet version 2)
            {' '}
            is a network protocol designed to enable Remote Direct Memory Access
            (RDMA) over Ethernet. It represents an improvement over the original
            RoCE standard, offering a more efficient and scalable approach to
            RDMA execution on Ethernet.
          </CardDesc>
          <CardDesc style={{ marginBottom: '0.48rem' }}>
            The core component of the Open-RDMA suite is a software and hardware
            implementation that further optimizes the RoCE v2 protocol. Taking
            full advantage of collaborative software and hardware design, it
            achieves high throughput and low latency through hardware
            acceleration. The suite utilizes a software user-space protocol
            stack for centralized management and highly configurable transfer
            strategies, ensuring optimal performance in various network
            environments. The project employs Bluespec SystemVerilog, C, and
            Rust for implementing hardware and software logic, ensuring
            correctness and maintainability of the open-source project.
          </CardDesc>
          <CardDesc style={{ marginBottom: '0.48rem' }}>
            In terms of testing and validation, we actively utilize open-source
            verification tools while also developing our own. Open-RDMA suite
            undergoes RTL-level verification using Bluesim and Cocotb tools,
            protocol packet-level verification with our in-house RoCE-Sim tool,
            and software-hardware co-simulation verification and debugging using
            the Distro-Sim tool.
          </CardDesc>
          <CardDesc>
            Currently, we have established the basic framework for the entire
            open-source suite and are progressively incorporating additional
            features.
          </CardDesc>
        </Card>
      </Section>
    </React.Fragment>
  )
}

export default Project
