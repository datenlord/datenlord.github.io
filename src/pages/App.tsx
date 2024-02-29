import { useEffect } from 'react'

import styled from 'styled-components'

import { Cover } from '@/components/Cover'

import coverUrl from '@/assets/app/cover.png'
import sect1Url from '@/assets/app/sect1.png'
import sect2Url from '@/assets/app/sect2.png'
import sect3Url from '@/assets/app/sect3.png'
import sect4Url from '@/assets/app/sect4.png'

const SectWrap = styled.div`
  background: #fff;
`
const SectCtn = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: 1rem;
  padding-bottom: 1.49rem;
  padding-inline: 1.77rem;
`
const Image = styled.img`
  width: 100%;
`

export default () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Cover cover={coverUrl}>DatenLord Appliance</Cover>
      <SectWrap>
        <SectCtn>
          <Image src={sect1Url} />
          <Image src={sect2Url} style={{ marginBottom: '0.82rem' }} />
          <Image src={sect3Url} style={{ marginBottom: '0.64rem' }} />
          <Image src={sect4Url} />
        </SectCtn>
      </SectWrap>
    </>
  )
}
