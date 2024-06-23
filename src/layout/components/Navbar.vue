<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像图标 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <!-- 头像url为null时，使用userName第一个字作为头像，并防止userName也为null报空指针，使用了？ -->
          <span v-else class="userNameAvatar">{{ name?.charAt(0) }}</span>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- 用户名 -->
          <span class="name">{{ name }}</span>
          <!-- 设置图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/XiaoQi-2024/hrManager/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- <el-dropdown-item divided @click.native="logout"> -->
          <!-- .native事件修饰符 -->
          <!-- 注册组件的根元素的原生事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog width="500px" title="修改密码" :visible.sync="showDialog" append-to-body @close="passFormDataCancle">
      <!-- 修改密码表单 -->
      <el-form ref="passFormData" label-width="80px" :model="passFormData" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passFormData.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passFormData.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passFormData.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="passFormDataComit">确认修改</el-button>
          <el-button size="small" @click="passFormDataCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updateUserPassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false,
      passFormData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {
            trigger: 'blur',
            required: true,
            message: '原密码不能为空'
          }
        ],
        newPassword: [
          {
            trigger: 'blur',
            required: true,
            message: '新密码不能为空'
          },
          {
            trigger: 'blur',
            min: 6,
            max: 16,
            message: '新密码长度应在6-16位'
          }
        ],
        confirmPassword: [
          {
            trigger: 'blur',
            required: true,
            message: '确认密码不能为空'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passFormData.newPassword) {
                callback(new Error('确认密码与新密码不一致'))
                return
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    updatePassword() {
      this.showDialog = true
    },
    passFormDataComit() {
      this.$refs.passFormData.validate(async isOK => {
        if (isOK) {
          await updateUserPassword(this.passFormData)
        }
        this.passFormDataCancle()
        this.$message.success('修改密码成功')
      })
    },
    passFormDataCancle() {
      this.$refs.passFormData.resetFields() // 重置表单数据和校验规则
      // this.$refs['passFormData'].resetFields() // 上一行不同写法
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .userNameAvatar {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: white;
        }
        .name {
          font-size: 16px;
          padding-left: 5px;
          padding-right: 10px;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .el-icon-setting {
          font-size: 20px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
