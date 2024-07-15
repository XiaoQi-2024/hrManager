<template>
  <div class="container">
    <div class="app-container">
      <el-button size="mini" style="margin: 10px;" type="primary">新增权限</el-button>
      <!-- 渲染树形数据时，必须要指定 row-key, 一般使用唯一主键 -->
      <el-table :data="list" row-key="id" :default-expand-all="true" style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    }
  }
}
</script>
