import { createBrowserRouter } from 'react-router-dom'
import FullPageScroll from './demo/FullPageScroll'

export const router = createBrowserRouter([
  {
    path: 'test',
    children: [
      {
        path: 'full-page-scroll',
        element: <FullPageScroll />,
      },
    ],
  },
])
