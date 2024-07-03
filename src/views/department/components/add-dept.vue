<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 表单内容 -->
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
