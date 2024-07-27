import layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  name: 'department',
  component: layout, // 一级路由 整个页面
  children: [{
    path: '', // 二级路由为空时 表示/department (显示一级路由 ＋ 二级路由)
    component: () => import ('@/views/department'), // 按需导入组件
    name: 'department', // 可以用来跳转 也可以用来标记路由
    meta: { // 框架底层定义的显示侧边栏图标标题的元素
      icon: 'tree',
      title: '组织'
    }
  }]
}
