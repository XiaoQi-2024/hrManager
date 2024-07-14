import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '', // 二级路由为空时 表示/department (显示一级路由 ＋ 二级路由)
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: '/employee/detail', // 员工详情的地址
    name: 'detail',
    component: () => import('@/views/employee/detail.vue'),
    meta: {
      title: '员工详情' // 显示在导航的文本
    },
    hidden: true // 表示隐藏在左侧菜单
  }]
}
