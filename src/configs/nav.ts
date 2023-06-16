import type { NavItem } from '@/components/PCNav'

export const nav: NavItem[] = [
  {
    key: 'product',
    label: '产品',
    children: [
      {
        key: 'datenlord',
        label: 'DatenLord',
        url: '',
      },
      {
        key: 'xline',
        label: 'Xline',
        url: '',
      },
      {
        key: 'rdma',
        label: 'RDMA',
        url: '',
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
        url: '',
      },
      {
        key: 'metadata-management',
        label: '跨云分布式元数据管理',
        url: '',
      },
      {
        key: 'hardware-acceleration',
        label: '存储网络的硬件加速',
        url: '',
      },
      {
        key: 'related-resource',
        label: '相关资源',
        url: '',
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
        url: '',
      },
      {
        key: 'tech-share',
        label: '技术分享',
        url: '',
      },
      {
        key: 'dynamics',
        label: '达坦动态',
        url: '',
      },
      {
        key: 'blog',
        label: '技术博客',
        url: '',
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
        url: '',
      },
      {
        key: 'project-cooperation',
        label: '产学研项目合作',
        url: '',
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
        url: '',
      },
      {
        key: 'join-us',
        label: '加入我们',
        url: '',
      },
      {
        key: 'contact-us',
        label: '联系我们',
        url: '',
      },
    ],
  },
]
