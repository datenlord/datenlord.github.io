import { createHashRouter } from 'react-router-dom'
import FullPageScroll from './demo/FullPageScroll'
import TOC from './demo/TOC/TOC'

export const router = createHashRouter([
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
