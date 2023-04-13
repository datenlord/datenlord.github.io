import { createHashRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import FullPageScroll from './demo/FullPageScroll'
import TOC from './demo/TOC/TOC'

export const router = createHashRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'test',
    children: [
      {
        path: 'full-page-scroll',
        element: <FullPageScroll />,
      },
      {
        path: 'toc',
        element: <TOC />,
      },
    ],
  },
])
