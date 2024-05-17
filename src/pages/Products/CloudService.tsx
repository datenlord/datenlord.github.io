import React from 'react'
import styled from 'styled-components'
import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import { Title } from '@/components/Typography'
import img1Url from '@/assets/products/cloud-service/image1.png'
import img2Url from '@/assets/products/cloud-service/image2.png'

const Image = styled.img`
  width: 100%;
`

const CloudService = () => {
  return (
    <React.Fragment>
      <Cover>DatenLord Cloud Service</Cover>
      <Section>
        <Image style={{ width: '100%' }} src={img1Url} />
      </Section>
      <Section backgroundColor="#F8FAFF">
        <Title style={{ marginBottom: '1rem' }}>Open Source Product</Title>
        <Image style={{ width: '100%' }} src={img2Url} />
      </Section>
    </React.Fragment>
  )
}

export default CloudService
