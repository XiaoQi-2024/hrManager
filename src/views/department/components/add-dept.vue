<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <!-- 表单内容 -->
    <el-form ref="addDept" :model="formData" :rules="rules" label-position="right" label-width="100px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width: 80%;" placeholder="1-10字符" size="mini" />
      </el-form-item>
      <el-form-item prop="code" label="部门编号">
        <el-input v-model="formData.code" style="width: 80%;" placeholder="1-10字符" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" style="width: 80%;" placeholder="请选择部门负责人" size="mini">
          <!-- 下拉选项 循环负责人数据 label表示要回显的数据 vlue表示存储字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" type="textarea" rows="4" style="width: 80%;" placeholder="1-100字符"
          size="mini" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="btnOk">确认</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addDepartment, getDepartmentInfo, getManagerList, getDepartmentDetail, updateDepartment } from '@/api/department'

export default {
  name: 'AddDept',
  props: {
    currentId: {
      type: Number,
      default: null
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      managerList: [],
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人Id
        name: '', // 部门名称
        pid: '' // 父级部门Id
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码长度2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async (rule, vlue, callback) => {
              let result = await getDepartmentInfo()
              if (this.formData.id) { // 判断是编辑还是新增 新增没有Id
                result = result.filter(item => item.id !== this.formData.id)
              }
              if (result.some(item => item.code === vlue)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback()
              }
            }
          }
        ], // 部门编码
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍长度2-10个字符', trigger: 'blur' }
        ], // 部门介绍
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }], // 部门负责人Id
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称长度2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async (rule, vlue, callback) => {
              let result = await getDepartmentInfo()
              if (this.formData.id) {
                result = result.filter(item => item.id !== this.formData.id)
              }
              if (result.some(item => item.name === vlue)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            }
          }
        ] // 部门名称
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      // resetFields 只会重置data中定义了的字段，其他没有定义过的字段不会被重置,直接重新赋值
      this.formData = {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人Id
        name: '', // 部门名称
        pid: '' // 父级部门Id
      }
      this.$refs.addDept.resetFields() // 重置表单数据和校验规则
      // 修改父组件的值 子传父 自定义事件update:showDialog
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    btnOk() {
      this.$refs.addDept.validate(async isOK => {
        if (isOK) {
          // 判断是新增还是编辑提交
          let msg = '新增'
          if (this.formData.id) {
            // 编辑
            await updateDepartment(this.formData)
            msg = '编辑'
          } else {
            // 新增
            await addDepartment({ ...this.formData, pid: this.currentId })
          }
          this.$message.success(`${msg}成功`)
          // 子组件通知父组件 执行自定义事件：更新部门信息列表
          this.$emit('updaDepartment')
          // 重置表单 关闭弹层
          this.close()
        }
      })
    },
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentId)
    }
  }
}
</script>
