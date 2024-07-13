<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom: 10px;"
          type="text"
          prefix-icon="el-icon-search"
          placeholder="输入员工姓名全员搜索"
          @change="whithUserNameQuery"
        />
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
          <el-button size="small" @click="exportEmployeeInfo">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 解决element-ui表格刷新出现暂无数据后显示表格数据的问题 -->
          <template slot="empty">
            <p>{{ dataText }}</p>
          </template>
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <!-- <img v-if="row.staffPhoto" :src="row.staffPhoto" height="30" width="30"> -->
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto" />
              <span v-else class="userNameAvatar">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" sortable label="手机号" />
          <el-table-column prop="workNumber" sortable label="工号" />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment === 1 ? '正式' : '非正式' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" sortable label="入职时间" />
          <el-table-column style="width: 280px;" label="操作">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end">
          <el-pagination
            :current-page.sync="queryParams.page"
            :page-size="queryParams.pagesize"
            :total="total"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartmentInfo } from '@/api/department'
import { getEmployeeList, exportEmployeeInfo } from '@/api/employee'
import { transListToTreeData } from '@/utils'
import FileSaver from 'file-saver'

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
        page: 1,
        pagesize: 5,
        departmentId: null,
        keyword: ''
      },
      total: 0,
      tableData: [],
      dataText: '' // 进去页面先让字样为空
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
      this.getEmployeeList()
    },
    changeNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1 // 切换部门，设置为第一页
      this.getEmployeeList()
    },
    async getEmployeeList() {
      // 先将变量清空
      this.dataText = ''
      const result = await getEmployeeList(this.queryParams)
      if (result.total === 0) {
        //   当请求后台，数据为空时，再让页面显示暂无数据
        this.dataText = '暂无数据'
      }
      this.total = result.total
      this.tableData = result.rows
    },
    handleCurrentChange(newPage) { // 修改页码
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    handleSizeChange(pagesize) { // 修改每页行数
      this.queryParams.pagesize = pagesize
      this.getEmployeeList()
    },
    whithUserNameQuery() { // 输入框失去焦点或回车时触发模糊查询
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    async exportEmployeeInfo() {
      const result = await exportEmployeeInfo()
      // FileSaver.saveAs(blob对象,文件名称)
      FileSaver(result, '员工信息表.xlsx') // 下载文件
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
.userNameAvatar {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: white;
          /* 同一行内的块级元素，可以实现文字居中 */
          display: inline-block;
        }
</style>
