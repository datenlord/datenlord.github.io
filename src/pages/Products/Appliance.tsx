import React from 'react'
import { Cover } from '@/components/Cover'
import { Section } from '@/components/Section'
import img1Url from '@/assets/products/appliance/image1.png'
import img2Url from '@/assets/products/appliance/image2.png'
import img3Url from '@/assets/products/appliance/image3.png'
import img4Url from '@/assets/products/appliance/image4.png'
import allUrl from '@/assets/products/appliance/all.png'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`

const Appliance: React.FC = () => {
  return (
    <React.Fragment>
      <Cover>DatenLord Appliance</Cover>
      <Section>
        <Image src={allUrl} />
      </Section>
    </React.Fragment>
  )
}

export default Appliance
