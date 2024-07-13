<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom: 10px;" type="text" prefix-icon="el-icon-search" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools">
          <el-button size="small" type="primary">添加员工</el-button>
          <el-button size="small">excel导入</el-button>
          <el-button size="small">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartmentInfo } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [],
      defaultProps: {
        children: 'children', // depts树形结构的子节点属性
        label: 'name' // depts树形结构要显示的字段
      }
    }
  },
  created() {
    this.getDepartmentInfo()
  },
  methods: {
    async getDepartmentInfo() {
      // let result = await getDepartmentInfo()
      this.depts = transListToTreeData(await getDepartmentInfo(), 0)
    }
  }
}
</script>

<style scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin: 10px;
    }
  }
}
</style>
