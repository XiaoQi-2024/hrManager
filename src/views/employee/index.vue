<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom: 10px;" type="text" prefix-icon="el-icon-search" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @current-change="changeNode"
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
      },
      // 存储查询参数
      queryParams: {
        departmentId: null
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
      this.queryParams.departmentId = this.depts[0].id
      // 树形结构的页面渲染是异步的，设置选中节点需要等待页面渲染完成，使用$nextTick方法等待异步完成
      this.$nextTick(() => {
        // 调用树形组件的方法：设置选中节点
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
    },
    changeNode(node) {
      this.queryParams.departmentId = node.id
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
