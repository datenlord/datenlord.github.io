import { useEffect } from 'react'

import styled from 'styled-components'

import { Cover } from '@/components/Cover'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

import coverUrl from '@/assets/RDMA/cover.png'
import imgUrl from '@/assets/RDMA/image1.png'

const { Heading, Paragraph } = Typography
const { CNHead4, CNHead5S } = Heading
const { CNBodyLarge } = Paragraph

const MainWrapper = styled.div`
  background: #f7f7f9;
`
const MainContainer = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`
const SectionContainer = styled.section`
  margin-bottom: 1.2rem;
  color: ${props => props.theme.themeDark};
  &:last-child {
    margin-bottom: 0;
  }
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.87rem;
`
const Line = styled.div`
  flex: 1;
  height: 0.01rem;
`
const LeftLine = styled(Line)`
  background: linear-gradient(90deg, #7b7ce340, #926cd3);
`
const RightLine = styled(Line)`
  background: linear-gradient(270deg, #7b7ce340, #926cd3);
`
const Title = styled(CNHead4)`
  padding-inline: 0.24rem;
`
const SubTitle = styled(CNHead5S)``
const Text = styled(CNBodyLarge)`
  padding-bottom: 0.39rem;
`
const List = styled.ul`
  padding-left: 0.24rem;
  padding-bottom: 0.39rem;
`
const ListItem = styled(CNBodyLarge)``
const Image = styled.img`
  padding-left: 0.58rem;
  padding-bottom: 0.58rem;
  width: 4.18rem;
  float: right;
`

interface Data {
  key: React.Key
  title: string
  subTitle: string
  main: {
    key: React.Key
    type: 'text' | 'list'
    content?: string
    items?: {
      key: React.Key
      text: string
    }[]
  }[]
  url: string
  img?: string
}

const data: Data[] = [
  {
    key: 'Async-RDMA',
    title: 'Async-RDMA',
    subTitle:
      'Async-RDMA是一个框架，为编写远程Remote Direct Memory Access（RDMA）应用程序提供高级抽象和异步API。',
    main: [
      {
        key: 1,
        type: 'text',
        content:
          'RDMA可以实现从一台机器到另一台机器对内存的直接访问。这可以提高需要低延迟和高吞吐量的应用程序的性能。RDMA支持内核旁路和零拷贝，无需CPU的参与。然而，用低级别的C语言库编写RDMA应用程序往往很困难，而且容易出错。为了让事情变得更简单，我们开发了Async-RDMA，它提供了易于使用的API，隐藏了底层RDMA操作的复杂性。有了Async-RDMA，大多数RDMA操作只需一行代码就能完成。它提供了以下几点主要的功能：',
      },
      {
        key: 2,
        type: 'list',
        items: [
          {
            key: 1,
            text: '作为与RDMA端点建立连接的工具。',
          },
          {
            key: 2,
            text: '作为在端点之间传输数据的高级异步API。',
          },
          {
            key: 3,
            text: '作为管理RDMA内存区域的高级API。',
          },
          {
            key: 4,
            text: '作为一个在幕后工作的框架来管理内存区域并异步执行RDMA请求。',
          },
        ],
      },
    ],
    url: 'https://github.com/datenlord/async-rdma',
  },
  {
    key: 'RoCE-Sim',
    title: 'RoCE-Sim',
    subTitle:
      'RoCE-Sim是RoCE v2模拟器，一个用python编写的模拟RoCE v2协议行为的软件。',
    main: [
      {
        key: 1,
        type: 'text',
        content:
          'RoCE v2（RDMA over Converged Ethernet version 2）是一个网络协议来在以太网上实现远程直接内存访问（RDMA）。它是对于原始RoCE标准的改进，为在以太网上执行RDMA提供了一种更有效且可扩展的方式。',
      },
      {
        key: 2,
        type: 'text',
        content:
          'RoCE-Sim模拟了RoCE v2协议的数据处理流程，可用于支持RoCE v2协议的设备的端端验证。模拟器可以灵活地模拟各种正确和错误的RDMA请求和响应数据包，同时通过分析设备的响应数据来决定其是否符合协议要求。',
      },
      {
        key: 3,
        type: 'text',
        content:
          '该模拟器集成了一个测试框架，开发人员只需编写配置文件来控制模拟器生成、发送、接收和检查数据包，从而有效地完成端端验证工作。',
      },
    ],
    url: 'https://github.com/datenlord/roce-sim',
    img: imgUrl,
  },
  {
    key: 'Open-RDMA',
    title: 'Open-RDMA',
    subTitle: 'Open-RDMA是一个使用Spinal HDL的RoCE v2硬件实现。',
    main: [
      {
        key: 1,
        type: 'text',
        content:
          'RoCE v2（RDMA over Converged Ethernet version 2）是一个网络协议来在以太网上实现远程直接内存访问（RDMA）。它是对于原始RoCE标准的改进，为在以太网上执行RDMA提供了一种更有效且可扩展的方式。',
      },
      {
        key: 2,
        type: 'text',
        content:
          'Open-RDMA是RoCEv2的一个开源实现，它利用了敏捷开发和验证方法，以及软硬件协同设计的方法。我们使用Spinal HDL和Bluespec SystemVerilog来实现RoCEv2，利用它们的高级抽象的优势来提高开发效率和减少错误率。我们还使用Cocotb（一种Python验证框架）来进行有效的验证。',
      },
      {
        key: 3,
        type: 'text',
        content:
          '目前，我们已经实现了该协议的基本框架，并计划实现一些增强功能，如优先级流量控制、拥堵控制以及对组播流量的支持，使其更适合大规模数据中心环境。此外，我们正在探索如何使用正式方法来对我们的实现进行验证。',
      },
    ],
    url: 'https://github.com/datenlord/open-rdma',
  },
]

const Section: React.FC<{ item: Data }> = ({ item }) => {
  const { title, subTitle, img, main, url } = item
  return (
    <SectionContainer>
      <TitleContainer>
        <LeftLine />
        <Title>{title}</Title>
        <RightLine />
      </TitleContainer>
      <SubTitle style={{ paddingBottom: '0.41rem', color: '#000' }}>
        {subTitle}
      </SubTitle>
      {img && <Image src={img} />}
      {main.map(({ key, type, content, items }) => {
        if (type === 'text') {
          return <Text key={key}>{content}</Text>
        } else if (type === 'list') {
          return (
            <List key={key}>
              {items?.map(({ key, text }) => {
                return (
                  <ListItem key={key} as={'li'}>
                    {text}
                  </ListItem>
                )
              })}
            </List>
          )
        } else return null
      })}
      <Button
        style={{ color: '#fff', display: 'block' }}
        onClick={() => {
          window.location.href = `${url}`
        }}
      >
        了解更多
      </Button>
    </SectionContainer>
  )
}

export default () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Cover cover={coverUrl}>RDMA</Cover>
      <MainWrapper>
        <MainContainer>
          {data.map(item => (
            <Section key={item.key} item={item} />
          ))}
        </MainContainer>
      </MainWrapper>
    </>
  )
}
