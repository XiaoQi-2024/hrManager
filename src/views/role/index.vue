<template>
  <div class="container">
    <div class="app-container">
      <div class="addRoleButton">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <p>{{ dataText }}</p>
        </template>
        <el-table-column align="center" prop="name" label="角色" width="200">
          <!-- 插槽本行取值 使用slot-scop 或 v-slot都可以 -->
          <template slot-scope="{ row }">
            <!-- 判断使用输入框还是普通span标签，行内编辑使用输入框 -->
            <el-input v-if="row.isEdit" v-model="row.editData.name" style="padding-left: 50px;" size="small" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="启用" width="200">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.isEdit" v-model="scope.row.editData.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ scope.row.state === 1 ? '启用' : scope.row.state === 0 ? '停用' : '未知' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editData.description" style="padding-left: 50px;" type="textarea" size="small" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnCommitEditRole(row)">确认</el-button>
              <el-button size="mini" @click="btnCancleEditRole(row)">取消</el-button>
            </template>
            <template v-else>
              <el-button size="small" type="text">分配权限</el-button>
              <el-button size="small" type="text" @click="btnEditRole(row)">编辑</el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteRole(row.id)"
              >
                <el-button slot="reference" style="padding-left: 10px;" size="small" type="text">删除</el-button>
              </el-popconfirm>
            </template>
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
    <add-role :show-dialog.sync="showDialog" @updaRoleList="getRoleInfoList" />
  </div>
</template>

<script>
import { getRoleInfoList, updateRole, deleteRole } from '@/api/role'
import AddRole from '@/views/role/components/add-role.vue'

export default {
  name: 'Role',
  components: { AddRole },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
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
      // 先将变量清空
      this.dataText = ''
      const { rows, total } = await getRoleInfoList(this.pageParams)
      if (total === 0) {
        //   当请求后台，数据为空时，再让页面显示暂无数据
        this.dataText = '暂无数据'
      }
      this.tableData = rows
      this.pageParams.total = total
      // 为每行数据添加一个编辑标识
      this.tableData.forEach(item => {
        // item.isEdit = false // 这样添加的动态属性，不具备响应式特点（即不具备数据变化，视图更新）
        this.$set(item, 'isEdit', false) // (目标对象，属性名称，默认值) 可以通过这种方式添加响应式
        this.$set(item, 'editData', { // 添加响应式编辑数据，用于修改数据，不污染源数据
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    handleCurrentChange(newPage) { // 修改页码
      this.pageParams.page = newPage
      this.getRoleInfoList()
    },
    handleSizeChange(pagesize) { // 修改每页行数
      this.pageParams.pagesize = pagesize
      this.getRoleInfoList()
    },
    btnEditRole(row) {
      row.isEdit = true
    },
    btnCancleEditRole(row) {
      row.isEdit = false
      // 将本次编辑的数据还原
      row.editData.name = row.name
      row.editData.state = row.state
      row.editData.description = row.description
    },
    async btnCommitEditRole(row) {
      await updateRole({ ...row.editData, id: row.id })
      this.$message.success('修改成功')
      this.btnCancleEditRole(row)
      this.getRoleInfoList()
    },
    async deleteRole(id) {
      await deleteRole(id)
      this.$message.success('删除成功')
      // 当前页只有一条数据，刷新页面时访问前一页
      if (this.tableData.length === 1) this.pageParams.page--
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
