import Layout from '@/views/home/index.vue'

const baseRouters = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title:'首页',
    }
  },
  {
    path: '/tableResize',
    name: 'tableResize',
    component: () => import('@/views/tableResize/index.vue'),
    meta: {
      title:'表格操作',
    }
  },
  {
    path: '/dragDiv',
    name: 'dragDiv',
    component: () => import('@/views/dragDiv/index.vue'),
    meta: {
      title:'块内拖拽',
    }
  },
]

export default baseRouters
