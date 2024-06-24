<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 设置宽度方向占满 水平方向两头对齐 垂直方向居中 -->
        <!-- v-slot="{ node, data }"数据插槽 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <!-- 加冒号变成数值类型 设置占据的分数 默认各一半 总共24份 -->
            <el-col :span="4">
              <span style="padding-right: 10px;">{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{
        name: '黑马',
        managerName: '管理员',
        children: [{
          name: '行政',
          managerName: '张三'
        }, {
          name: '人事',
          managerName: '李四'
        }, {
          name: 'IT',
          children: [{
            name: '前端',
            managerName: '王五'
          }, {
            name: '后端',
            managerName: '赵六'
          }]
        }]
      }], // 数据属性
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
