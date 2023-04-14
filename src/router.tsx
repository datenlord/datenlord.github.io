import { createHashRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import FullPageScroll from './demo/FullPageScroll'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import WhyJoinPage from './pages/Company/WhyJoinPage'
import TOC from './demo/TOC/TOC'

export const router = createHashRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'products',
    element: <ProductsPage />,
  },
  {
    path: 'customers',
    element: <CustomersPage />,
  },
  {
    path: 'company',
    children: [
      {
        path: 'why-join',
        element: <WhyJoinPage />,
      },
    ],
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
