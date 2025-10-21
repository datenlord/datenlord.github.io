import { createHashRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import FullPageScroll from './demo/FullPageScroll'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import WhyJoinPage from './pages/Company/WhyJoinPage'
import ContactUsPage from './pages/Company/ContactUsPage'
import WhyBuildPage from './pages/Company/WhyBuildPage'
import JoinUsPage from './pages/Company/JoinUsPage'
import ContributingPage from './pages/Resources/Contributing'
import SolutionPage from './pages/Solution'
import BlogList from './pages/Resources/BlogList'
import BlogDetailPage from './pages/Resources/BlogDetail'
import TechTalkPage from './pages/Resources/TechTalkPage'
import TOC from './demo/TOC/TOC'
import Appliance from './pages/Products/Appliance'
import AIInferencePlatform from './pages/Solutions/AIInferencePlatform'
import NetworkSolutions from './pages/Solutions/NetworkSolutions'
import ContactUs from './pages/Company/ContactUs'
import Project from './pages/Community/Project'
import Company from './pages/Company'
import Layout from './pages/Layout'
import OpenSourceProduct from './pages/Resources/sections/OpenSourceProduct'
export const router = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'products',
        children: [
          {
            path: 'appliance',
            element: <Appliance />,
          },
        ],
      },
      {
        path: 'solution',
        children: [
          {
            path: 'AI-inference-platform',
            element: <AIInferencePlatform />,
          },
          {
            path: 'network-solutions',
            element: <NetworkSolutions />,
          },
        ],
      },
      {
        path: 'community',
        children: [
          {
            path: 'communitys',
            element: <ContributingPage />,
          },
          {
            path: 'Product',
            element: <OpenSourceProduct />,  
          },
        ],
      },
      {
        path: 'company',
        element: <Company />,
      },
    ],
  },
  {
    path: 'resources',
    children: [
      {
        path: 'tech-talk',
        element: <TechTalkPage />,
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
    path: 'Project',
    element: <Project />,
  },
])
