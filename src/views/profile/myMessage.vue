<template>
  <el-tabs v-model="activeName"
           @tab-click="handleClick">
    <el-tab-pane label="基本信息"
                 name="userInfo">
      <el-row>
        <el-col :span="24"
                align="center">
          <user-info-card style="width:50%"></user-info-card>
          <!-- <el-button type="danger"
                     size="small">返回首页</el-button> -->
          <el-button type="primary"
                     icon="el-icon-refresh-left"
                     circle
                     @click="navToIndex"></el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="密码修改"
                 name="password">
      <div class="box mr-top-20">
        <el-form label-position="left"
                 label-width="120px"
                 style="width:60%">
          <el-form-item label="原密码：">
            <el-input v-model="oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="confirmPassword"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div class="box mr-top-20">
        <el-button type="primary"
                   @click="modifyPassword()">确认修改</el-button>
        <el-button type="danger"
                   @click="onClearFormData()">取消</el-button>
      </div>

    </el-tab-pane>

  </el-tabs>
</template>
<script>
import userInfoCard from './children/myInformation'
import { modifyPassword } from '@/api/user'
import { getLocalProp } from '@/api/localMethods'
export default {
  components: {
    userInfoCard,
  },
  data() {
    return {
      activeName: 'userInfo',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      rules: {},
      ruleForm: {},
      fits: ['fill'],
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    navToIndex() {
      this.$router.replace({
        name: 'index',
      })
    },
    modifyPassword() {
      const userName = getLocalProp('userName')
      const email = getLocalProp('email')
      const password = this.oldPassword
      const newPassword = this.newPassword
      const obj = {
        userName,
        email,
        password,
        newPassword,
      }
      modifyPassword(obj)
        .then((result) => {
          if (parseInt(result.data.code) === 200) {
            this.$message({
              type: 'success',
              message: result.data.data,
            })
          } else {
            this.$message({
              type: 'error',
              message: result.data.data,
            })
          }
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: e,
          })
        })
    },
  },
}
</script>
<style scoped>
.box {
  display: flex;
  justify-content: center;
}
.mr-top-20 {
  margin-top: 20px;
}
</style>