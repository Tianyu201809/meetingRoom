<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">会议室预定系统</div>
      <el-form :model="param"
               :rules="rules"
               ref="login"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="userName">
          <el-input v-model="param.userName"
                    placeholder="账户名">
            <el-button slot="prepend"
                       icon="el-icon-user-solid"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="密码"
                    v-model="param.password"
                    @keyup.enter.native="submitForm()">
            <el-button slot="prepend"
                       icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     @click="login()">登录</el-button>
        </div>
        <span>
          <span>
            <router-link to='/'
                         class="login-tips">忘了密码？</router-link>
          </span>
          <span>
            <router-link to='/register'
                         class="login-tips"> 注册账户</router-link>
          </span>
        </span>

      </el-form>
    </div>
  </div>
</template>

<script>
import { loginUser, getUserEmail } from '@/api/user'
import { getToken, setToken } from '@/api/token'
export default {
  data: function () {
    return {
      param: {
        userName: '',
        password: '',
        email: '',
      },

      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      let self = this;
      this.$refs.login.validate((valid) => {
        if (valid) {
          console.log(this.param)
          getUserEmail(self.param)
            .then((email) => {
              self.$store.state.userInfo.email = email.data.data.email
              self.$store.state.userInfo.userName = self.param.userName
              self.$store.state.userInfo.password = self.param.password
              //self.email = 
              console.log(self.param)
              let param = self.param
              self.$store.dispatch('login', self.$store.state.userInfo).then((res) => {
                if (
                  parseInt(res.data.code) === 200 &&
                  res.data.mes === 'success'
                ) {
                  //localStorage.setItem('token', )
                  setToken(res.data.data.token)
                  self.$message.success('登录成功')
                  // localStorage.setItem('ms_username', this.param.username)
                  self.$router.replace('/')
                } else {
                  self.$message.error('输入的密码不正确，请重新输入')
                  console.log(res.data)
                  return false
                }
              }).catch(error => {
                  debugger
                 self.$message.error(error.mes);
                 return false
              })
              //   loginUser(this.param)
              //     .then((res) => {
              //       if (
              //         parseInt(res.data.code) === 200 &&
              //         res.data.mes === 'success'
              //       ) {
              //         //localStorage.setItem('token', )
              //         setToken(res.data.data.token)
              //         this.$message.success('登录成功')
              //         // localStorage.setItem('ms_username', this.param.username)
              //         this.$router.push({ name: 'index' })
              //       } else {
              //         this.$message.error('输入的密码不正确，请重新输入')
              //         console.log(res.data)
              //         return false
              //       }
              //     })
              //     .catch((e) => {
              //       this.$message.error(e)
              //       console.log(e)
              //       return false
              //     })
            })
            .catch((e) => {
              this.$message.error('输入的密码不正确，请重新输入')
              console.log(e)
              return false
            })
        } else {
          this.$message.error('请输入账号和密码')
          console.log(e)
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-image: url(../../assets/img/timg.jpg) 22; */
  background: url('../../assets/img/timg.jpg');
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;

  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>