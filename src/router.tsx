import { createHashRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import FullPageScroll from './demo/FullPageScroll'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import WhyJoinPage from './pages/Company/WhyJoinPage'
import ContactUsPage from './pages/Company/ContactUsPage'
import WhyBuildPage from './pages/Company/WhyBuildPage'
import ContributingPage from './pages/Resources/Contributing'
import SolutionPage from './pages/Solution'
import BlogList from './pages/Resources/BlogList'
import BlogDetailPage from './pages/Resources/BlogDetail'
import TOC from './demo/TOC/TOC'

export const router = createHashRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'products/RDMA',
    element: <ProductsPage />,
  },
  {
    path: 'customers',
    element: <CustomersPage />,
  },
  {
    path: 'solution/:id',
    element: <SolutionPage />,
  },
  {
    path: 'company',
    children: [
      {
        path: 'why-join',
        element: <WhyJoinPage />,
      },
      {
        path: 'contact-us',
        element: <ContactUsPage />,
      },
      {
        path: 'why-build',
        element: <WhyBuildPage />,
      },
    ],
  },
  {
    path: 'resources',
    children: [
      {
        path: 'contribute',
        element: <ContributingPage />,
      },
      {
        path: 'blog',
        element: <BlogList />,
      },
      {
        path: 'blog/:params',
        element: <BlogDetailPage />,
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
