import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Scrollbar } from 'swiper/modules'
import cover1Url from '@/assets/Home/cover1.svg'
import cover2Url from '@/assets/Home/cover2.svg'
import cover3Url from '@/assets/Home/cover3.svg'
import cover4Url from '@/assets/Home/cover4.svg'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './index.css'
import { ThemeCtx } from '@/pages/Layout'

const carouselData = [
  {
    id: 1,
    bgColor: '#0A061F',
    txtColor: '#FFFFFF',
    img: cover1Url,
    title: 'High-Performance AI+ Cloud Infrastructure Provider',
    desc: 'By deeply integrating software and hardware, we offer high-performance storage and networking, delivering elastic, convenient, and cost-effective infrastructure services for AI+Cloud applications.',
    btn: '',
  },
  {
    id: 2,
    bgColor: '#D9DBEF',
    txtColor: '#42424A',
    img: cover2Url,
    title: 'High-Performance Cross-Cloud Distributed Storage',
    desc: 'By deeply integrating software and hardware, we offer high-performance storage and networking, delivering elastic, convenient, and cost-effective infrastructure services for AI+Cloud applications.',
    btn: '',
  },
  {
    id: 3,
    bgColor: '#F8FAFF',
    txtColor: '#42424A',
    img: cover3Url,
    title: 'High-Performance RDMA Network',
    desc: 'By deeply integrating software and hardware, we offer high-performance storage and networking, delivering elastic, convenient, and cost-effective infrastructure services for AI+Cloud applications.',
    btn: '',
  },
  {
    id: 4,
    bgColor: '#0A061F',
    txtColor: '#FFFFFF',
    img: cover4Url,
    title: 'Believe in the Power of Open Source',
    desc: 'By deeply integrating software and hardware, we offer high-performance storage and networking, delivering elastic, convenient, and cost-effective infrastructure services for AI+Cloud applications.',
    btn: '',
  },
]

export const Carousel: React.FC<{
  setHeaderTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
}> = ({ setHeaderTheme }) => {
  const ctx = useContext(ThemeCtx)

  return (
    <Swiper
      modules={[Pagination, Scrollbar]}
      pagination={{ clickable: true }}
      onActiveIndexChange={({ activeIndex }) => {
        document.documentElement.style.setProperty(
          '--swiper-pagination-bullet-inactive-color',
          activeIndex === 1 ? '#FFFFFF' : '#d9dbef',
        )
        ctx?.setTheme(activeIndex === 0 || activeIndex === 3 ? 'light' : 'dark')
      }}
      style={{
        height: '100vh',
      }}
    >
      {carouselData.map(({ id, title, desc, img, bgColor, txtColor }) => {
        return (
          <SwiperSlide
            key={id}
            style={{
              background: bgColor,
              color: txtColor,
              display: 'flex',
              alignItems: 'center',
              padding: '1.48rem 0.96rem 0.64rem',
            }}
          >
            <img
              src={img}
              style={{
                maxWidth: '5.8rem',
                maxHeight: '4.4rem',
                marginRight: '0.64rem',
              }}
            />
            <div>
              <div
                role="h2"
                style={{ fontSize: '0.4rem', marginBottom: '0.44rem' }}
              >
                {title}
              </div>
              <div
                role="p"
                style={{ fontSize: '0.26rem', marginBottom: '0.44rem' }}
              >
                {desc}
              </div>
              <div
                role="button"
                style={{
                  fontSize: '0.16rem',
                  width: 'min-content',
                  whiteSpace: 'nowrap',
                  padding: '0.08rem 0.32rem',
                  borderRadius: '0.24rem',
                  background: 'linear-gradient(90deg, #767EE5, #9966CC)',
                  color: '#FFFFFF',
                }}
              >
                Learn more
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
