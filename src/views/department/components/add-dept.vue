<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 表单内容 -->
    <el-form label-position="right" label-width="100px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%;" placeholder="1-10字符" size="mini" />
      </el-form-item>
      <el-form-item label="部门编号">
        <el-input style="width: 80%;" placeholder="1-10字符" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%;" placeholder="请选择部门负责人" size="mini" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input type="textarea" rows="4" style="width: 80%;" placeholder="1-100字符" size="mini" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary">确认</el-button>
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 修改父组件的值 子传父 自定义事件update:showDialog
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
