import layout from '@/layout'
export default {
  path: '/employee',
  name: 'employee',
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
    path: '/employee/detail/:id?', // 员工详情的地址 :id? 表示路由传参id ?可以传id也可以选择不传，页面都能正确显示
    name: 'detail',
    component: () => import('@/views/employee/detail.vue'),
    meta: {
      title: '员工详情' // 显示在导航的文本
    },
    hidden: true // 表示隐藏在左侧菜单
  }]
}
