<template>
  <el-dialog title="新增角色" :visible="showDialog" @close="close">
    <!-- 表单内容 -->
    <el-form ref="addRole" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" style="width: 300px;" size="mini" />
      </el-form-item>
      <!-- 如果不需要检验，不需要设置prop属性 -->
      <!-- 但是不设置prop resetFields重置表单时不会被该属性重置 -->
      <el-form-item label="状态" prop="state">
        <el-switch v-model="formData.state" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" style="width: 300px;" :rows="3" type="textarea" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole } from '@/api/role'
export default {
  name: 'AddRole',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    close() {
      this.$refs.addRole.resetFields() // 重置表单数据和校验规则,resetFields 只会重置data中定义了的字段，其他没有定义过的字段不会被重置,详见add-dept.vue
      // 修改父组件的值 子传父 自定义事件update:showDialog
      this.$emit('update:showDialog', false)
    },
    onSubmit() {
      this.$refs.addRole.validate(async isOK => {
        if (isOK) {
          console.log(this.formData)
          await addRole(this.formData)
          this.$message.success('新增成功')
          // 子组件通知父组件 执行自定义事件：更新角色列表
          this.$emit('updaRoleList')
          this.close()
        }
      })
    }
  }
}
</script>

<style>
/* 控制表单行间距 */
.el-form-item{
    margin-bottom: 5px;
}

</style>
