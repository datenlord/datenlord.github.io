import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductSection } from '@/pages/Home/ProductSection'
import { Cover } from '@/components/Cover'

import CoverUrl from '@/assets/products/cover.png'

export default () => {
  const { sectionId } = useParams()
  console.log(sectionId)

  useEffect(() => {
    const sectionEl = document.querySelector(`#${sectionId}`)
    sectionEl?.scrollIntoView()
    window.scrollBy(0, -32)
  }, [sectionId])

  return (
    <>
      <Cover cover={CoverUrl}>开源产品</Cover>
      <ProductSection />
    </>
  )
}
