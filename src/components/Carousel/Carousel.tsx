import styled from 'styled-components'
import Slider from 'react-slick'
import type { Settings } from 'react-slick'

import { CarouselView } from '@/pages/Home/CarouselView'

import type { CarouseData } from '@/pages/Home/Home'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './carousel.less'

const CarouselWrapper = styled.div`
  background-color: #000;
`

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnFocus: true,
}

export const Carousel: React.FC<{ items: CarouseData[] }> = ({ items }) => {
  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {items.map(items => (
          <CarouselView key={items.key} items={items} />
        ))}
      </Slider>
    </CarouselWrapper>
  )
}
