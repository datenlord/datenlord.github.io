import SharingSection from './SharingSection'
import { DynamicsSection } from './DynamicsSection'
import { BlogSection } from './BlogSection'

import { Cover } from '@/components/Cover'

import coverUrl from '@/assets/resources/cover.png'

export default () => {
  return (
    <>
      <Cover cover={coverUrl}>资源</Cover>
      <SharingSection />
      <DynamicsSection />
      <BlogSection />
    </>
  )
}
