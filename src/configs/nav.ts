import type { NavItem } from '@/components/PCNav'

export const nav: NavItem[] = [
  {
    key: 'product',
    label: '产品',
    children: [
      {
        key: 'service',
        label: 'DatenLord Cloud Service',
        url: '/service',
      },
      {
        key: 'app',
        label: 'DatenLord Appliance',
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
    ],
  },
  {
    key: 'resource',
    label: '资源',
    children: [
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
    key: 'community',
    label: '社区',
    children: [
      {
        key: 'open-source-community',
        label: '开源社区',
        url: '/community/open-source-community',
      },
      {
        key: 'open-source-project',
        label: '开源项目',
        url: '/community/open-source-project',
      },
      {
        key: 'learning-community',
        label: '学习社区',
        url: '/community/learning-community',
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
