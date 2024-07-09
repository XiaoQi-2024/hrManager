<template>
  <div class="container">
    <div class="app-container">
      <div class="addRoleButton">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p>{{ dataText }}</p>
        </template>
        <el-table-column align="center" prop="name" label="角色" width="200" />
        <el-table-column align="center" prop="state" label="启用" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.state === 1 ? '启用' : scope.row.state === 0 ? '停用' : '未知' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <div>
              <el-button size="small" type="text">分配权限</el-button>
              <el-button size="small" type="text">编辑</el-button>
              <el-button size="small" type="text">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height: 60px;" align="middle" justify="end">
        <el-pagination
          :page-size="pageParams.pagesize"
          :page-sizes="[5, 10, 20, 50]"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="total, sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRoleInfoList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      tableData: [],
      dataText: '', // 进去页面先让字样为空
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleInfoList()
  },
  methods: {
    async getRoleInfoList() {
      const { rows, total } = await getRoleInfoList(this.pageParams)
      this.tableData = rows
      this.pageParams.total = total
    },
    handleCurrentChange(newPage) { // 修改页码
      this.pageParams.page = newPage
      this.getRoleInfoList()
    },
    handleSizeChange(pagesize) { // 修改每页行数
      this.pageParams.pagesize = pagesize
      this.getRoleInfoList()
    }
  }
}

</script>

<style scoped>
.addRoleButton {
  padding: 15px;
}
</style>
