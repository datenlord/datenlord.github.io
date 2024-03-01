import type { NavItem } from '@/components/PCNav'

export const nav: NavItem[] = [
  {
    key: 'product',
    label: '产品',
    children: [
      {
        key: 'service',
        label: 'Cloud Service',
        url: '/service',
      },
      {
        key: 'app',
        label: 'Appliance',
        url: '/app',
      },
    ],
  },
  {
    key: 'solution',
    label: '解决方案',
    children: [
      {
        key: 'ai',
        label: 'AI 推理',
        url: '/solutions/ai',
      },
      {
        key: 'storage',
        label: '高性能存储',
        url: '/solutions/storage',
      },
      {
        key: 'networks',
        label: '高性能网络',
        url: '/solutions/networks',
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
