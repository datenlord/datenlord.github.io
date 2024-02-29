import { createHashRouter } from 'react-router-dom'

import Layout from '@/pages/Layout'
import Home from '@/pages/Home/Home'
import Products from '@/pages/Products'
import RDMA from '@/pages/RDMA'
import Service from '@/pages/Service'
import App from '@/pages/App'
import Solutions from '@/pages/Solutions'
import Resources1 from '@/pages/Resources/Resources1'
import Resources2 from '@/pages/Resources/Resources2'
import Clients from '@/pages/Clients'
import Company1 from '@/pages/Company/Company1'
import Company2 from '@/pages/Company/Company2'
import VideoList from '@/pages/VideoList'
import ArticleLIst from '@/pages/ArticleLIst'
import ArticleContent from '@/pages/ArticleContent'
import JDList from '@/pages/JDList'
import JDDetail from '@/pages/JDDetail'
import MIT from '@/pages/MITPage'
import MITRank from '@/pages/MITRank'

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:sectionId',
        element: <Products />,
      },
      {
        path: 'rdma',
        element: <RDMA />,
      },
      {
        path: 'service',
        element: <Service />,
      },
      {
        path: 'app',
        element: <App />,
      },
      {
        path: 'solutions',
        element: <Solutions />,
      },
      {
        path: 'solutions/:sectionId',
        element: <Solutions />,
      },
      {
        path: 'resources1',
        element: <Resources1 />,
      },
      {
        path: 'resources1/:sectionId',
        element: <Resources1 />,
      },
      {
        path: 'resources2',
        element: <Resources2 />,
      },
      {
        path: 'resources2/:sectionId',
        element: <Resources2 />,
      },
      {
        path: 'clients',
        element: <Clients />,
      },
      {
        path: 'clients/:sectionId',
        element: <Clients />,
      },
      {
        path: 'company1',
        element: <Company1 />,
      },
      {
        path: 'company1/:sectionId',
        element: <Company1 />,
      },
      {
        path: 'company2',
        element: <Company2 />,
      },
      {
        path: 'company2/:sectionId',
        element: <Company2 />,
      },
      {
        path: 'tech-talk',
        element: <VideoList />,
      },
      {
        path: 'oss-showcase',
        element: <VideoList />,
      },
      {
        path: 'rust-showcase',
        element: <VideoList />,
      },
      {
        path: 'hardware-acceleration',
        element: <VideoList />,
      },
      {
        path: ':title',
        element: <ArticleLIst />,
      },
      {
        path: ':section/:title',
        element: <ArticleContent />,
      },
      {
        path: 'job-description',
        element: <JDList />,
      },
      {
        path: 'job-description/:key',
        element: <JDDetail />,
      },
      {
        path: 'MIT',
        element: <MIT />,
      },
      {
        path: 'MIT/rank',
        element: <MITRank />,
      },
    ],
  },
])
