<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :data="depts" :props="defaultProps" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{ name: '黑马', children: [{
        name: '行政'
      }, {
        name: '人事'
      }, {
        name: 'IT',
        children: [{
          name: '前端'
        }, {
          name: '后端'
        }]
      }] }], // 数据属性
      defaultProps: {
        label: 'name', // 要显示的字段名name
        children: 'children' // 读取子节点的字段名
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 40px;
  font-size: 14px;
}
</style>
