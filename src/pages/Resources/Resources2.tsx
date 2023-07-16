import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SharingSection from './SharingSection'
import { DynamicsSection } from './DynamicsSection'
import { BlogSection } from './BlogSection'

import { Cover } from '@/components/Cover'

import coverUrl from '@/assets/resources/cover.png'

export default () => {
  const { sectionId } = useParams()
  useEffect(() => {
    const sectionEl = document.querySelector(`#${sectionId}`)
    sectionEl?.scrollIntoView()
  }, [sectionId])
  return (
    <React.Fragment>
      <Cover cover={coverUrl}>资源</Cover>
      <SharingSection />
      <DynamicsSection />
      <BlogSection />
    </React.Fragment>
  )
}
