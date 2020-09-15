<template>
  <el-tabs v-model="activeName"
           @tab-click="handleClick">
    <el-tab-pane label="基本信息修改"
                 name="baseInfo">
      <div>

      </div>
    </el-tab-pane>
    <el-tab-pane label="密码修改"
                 name="password">
      <div class="box mr-top-20">
        <el-form :label-position="left"
                 label-width="120px"
                 style="width:60%"
                 :model="formLabelAlign">
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
import { modifyPassword } from '@/api/user'
import { getLocalProp } from '@/api/localMethods'
export default {
  data() {
    return {
      activeName: 'password',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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