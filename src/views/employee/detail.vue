<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="220px">
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <!-- 工号是系统生成的  禁用这个组件-->
                <el-input v-model="userInfo.workNumber" disabled size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <!-- 编辑时，用户的手机号不允许修改，通过判断是否存在路由传参id -->
          <!-- !!是取反两次，因为$route.params.id是一个字符串，取反两次拿到boolean值 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="userInfo.mobile"
                  :disabled="!!$route.params.id"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <!-- inputW样式会给到selectTree中 template第一层的组件 -->
                <!-- 在父组件使用v-model双向绑定 departmentId 属性 -->
                <select-tree v-model="userInfo.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="userInfo.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式工" value="1" />
                  <el-option label="非正式工" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="userInfo.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="userInfo.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
                <!-- v-model 给子组件传参 双向绑定两个步骤之一 -->
                <image-upload v-model="userInfo.staffPhoto" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import SelectTree from '@/views/employee/components/select-tree.vue'
import ImageUpload from '@/views/employee/components/image-upload.vue'
import { addEmployee, getEmployeeDetail, updateEmployee } from '@/api/employee'

export default {
  components: {
    SelectTree,
    ImageUpload
  },
  data() {
    return {
      userInfo: {
        username: '', // 用户名
        mobile: '', // 手机号
        workNumber: '', // 工号
        formOfEmployment: null, // 聘用形式
        departmentId: null, // 部门id
        timeOfEntry: '', // 入职时间
        correctionTime: '', // 转正时间
        // staffPhoto: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?rs=1&pid=ImgDetMain' // 判断是否能给子组件传参
        staffPhoto: ''
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }, {
          min: 1, max: 4, message: '姓名为1-4位'
        }], // 用户名
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
        //   pattern 正则表达式
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        }], // 手机号
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }], // 工号
        departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }], // 聘用形式
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '请选择转正时间', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (this.userInfo.timeOfEntry) {
              if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                callback(new Error('转正时间不能小于入职时间'))
                return
              }
            }
            callback()
          }
        }] // 转正时间
      }
    }
  },
  created() {
    // 获取路由参数的中id
    // if (this.$route.params.id) { this.getEmployeeDetail() } 用下面这种格式也可以
    this.$route.params.id && this.getEmployeeDetail()
  },
  methods: {
    saveData() {
      this.$refs.userForm.validate(async isOK => {
        if (isOK) {
          // 编辑模式 存在路由传参Id
          if (this.$route.params.id) {
            // 编辑模式
            await updateEmployee(this.userInfo)
            this.$message.success('更新员工成功')
          } else {
            // 新增模式
            // 校验通过
            await addEmployee(this.userInfo)
            this.$message.success('新增员工成功')
          }
          this.$router.push('/employee')
        }
      })
    },
    async getEmployeeDetail() {
      // 获取路由参数的中id
      this.userInfo = await getEmployeeDetail(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
