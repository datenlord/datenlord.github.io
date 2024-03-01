import type { NavItem } from '@/components/PCNav'

export const nav: NavItem[] = [
  {
    key: 'product',
    label: '产品',
    children: [
      {
        key: 'service',
        label: 'Cloud Service',
        url: '/products/service',
      },
      {
        key: 'app',
        label: 'Appliance',
        url: '/products/app',
      },
    ],
  },
  {
    key: 'solution',
    label: '解决方案',
    children: [
      {
        key: 'data-access',
        label: '统一高性能的跨云数据访问',
        url: '/solutions/data-access',
      },
      {
        key: 'metadata-management',
        label: '跨云分布式元数据管理',
        url: '/solutions/metadata-management',
      },
      {
        key: 'hardware-acceleration',
        label: '存储网络的硬件加速',
        url: '/solutions/hardware-acceleration',
      },
      {
        key: 'related-resource',
        label: '相关资源',
        url: '/solutions/related-resource',
      },
    ],
  },
  {
    key: 'resource',
    label: '资源',
    children: [
      {
        key: 'community',
        label: '社区',
        url: '/resources1/community',
      },
      {
        key: 'tech-share',
        label: '技术分享',
        url: '/resources2/tech-share',
      },
      {
        key: 'dynamics',
        label: '达坦动态',
        url: '/resources2/dynamics',
      },
      {
        key: 'blog',
        label: '技术博客',
        url: '/resources2/blog',
      },
    ],
  },
  {
    key: 'client',
    label: '客户',
    children: [
      {
        key: 'usage-scenarios',
        label: '使用场景',
        url: '/clients/usage-scenarios',
      },
      {
        key: 'project-cooperation',
        label: '产学研项目合作',
        url: '/clients/project-cooperation',
      },
    ],
  },
  {
    key: 'company',
    label: '公司',
    children: [
      {
        key: 'about-us',
        label: '关于我们',
        url: '/company1/about-us',
      },
      {
        key: 'join-us',
        label: '加入我们',
        url: '/company2/join-us',
      },
      {
        key: 'contact-us',
        label: '联系我们',
        url: '/company2/contact-us',
      },
    ],
  },
]
