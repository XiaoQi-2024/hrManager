<template>
  <div class="container">
    <div class="app-container">
      <div class="addRoleButton">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
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
        <el-pagination layout="prev, pager, next" />
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
      tableData: []
    }
  },
  created() {
    this.getRoleInfoList()
  },
  methods: {
    async getRoleInfoList() {
      const { rows } = await getRoleInfoList()
      this.tableData = rows
    }
  }
}

</script>

<style scoped>
.addRoleButton {
  padding: 15px;
}
</style>
