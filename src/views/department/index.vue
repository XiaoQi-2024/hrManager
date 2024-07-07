<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depts" :props="defaultProps" :expand-on-click-node="false">
        <!-- 节点结构 设置宽度方向占满 水平方向两头对齐 垂直方向居中 -->
        <!-- v-slot="{ node, data }"数据插槽 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width: 100%; height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <!-- 加冒号变成数值类型 设置占据的分数 默认各一半 总共24份 -->
            <el-col :span="4">
              <span style="padding-right: 10px;">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型type，如果不需要传参，默认可以不传
               因为需要传参data.id 所以需要显式声明$event -->
              <el-dropdown @command="operateDept($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 父组件给子组件传值 -->
    <!-- .sync 表示会接收子组件的事件：update:showDialog 值传给 showDialog 实现子传父 -->
    <!-- :current-id="currentId" 父组件给子组件传值 -->
    <!-- @updaDepartment 子组件通知父组件的自定义事件，更新后通知父组件执行重新获取部门信息列表 -->
    <!-- ref="addDept" 可以拿到子组件的实例，用以下面调用子组件的方法 -->
    <add-dept ref="addDept" :current-id="currentId" :show-dialog.sync="showDialog"
      @updaDepartment="getDepartmentInfo" />
  </div>
</template>

<script>
import { getDepartmentInfo, deleteDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from '@/views/department/components/add-dept.vue'

export default {
  name: 'Department',
  components: { AddDept },
  data() {
    return {
      currentId: null, // 给子组件传递当前的父级部门Id
      showDialog: false, // 控制弹层的显示和隐藏
      depts: [], // 数据属性
      defaultProps: {
        label: 'name', // 要显示的字段名name
        children: 'children' // 读取子节点的字段名
      }
    }
  },
  created() {
    this.getDepartmentInfo()
  },
  methods: {
    async getDepartmentInfo() {
      const result = await getDepartmentInfo()
      this.depts = transListToTreeData(result, 0)
    },
    operateDept(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentId = id
      } else if (type === 'edit') {
        this.showDialog = true
        this.currentId = id
        // 更新props- 异步动作
        // this.$refs.addDept 获取到子组件对象，直接调用子组件的方法- 同步动作 （父组件调用子组件的方法来获取数据）
        // 为了保证父组件给子组件传值，更新props后，再调用子组件方法，使用nextTick方法，阻塞让上一步刷新渲染先执行完毕
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else {
        this.$confirm('是否确定删除此部门?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await deleteDepartment(id) // 调用后端接口
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新前端页面
          this.getDepartmentInfo()
        })
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
