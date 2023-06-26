import { ProductSection } from '@/pages/Home/ProductSection'
import { Cover } from '@/components/Cover'

import CoverUrl from '@/assets/products/cover.png'

export default () => {
  return (
    <>
      <Cover cover={CoverUrl}>开源产品</Cover>
      <ProductSection />
    </>
  )
}
