<template >
  <div class="container1">
    <div class="registerBox">
      <div class="title">用户注册</div>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               status-icon
               label-width="80px">
        <el-form-item label="用户名"
                      prop="userName">
<<<<<<< HEAD
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="form.email"></el-input>
=======
          <el-input v-model="form.userName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="form.email"
                    auto-complete="off"></el-input>
>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="form.password"
                    type="password"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="confirmPassword">
          <el-input v-model="form.confirmPassword"
                    type="password"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="confirmPassword">
          <el-input v-model="form.confirmPassword"
                    type="password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="success"
                     @click="onSubmit">立即创建</el-button>
          <el-button type="danger"
                     @click="backToLogin()">取消</el-button>
        </div>
      </el-form>

    </div>
  </div>

</template>

<script>
import { registerUser } from '@/api/user'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'))
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'))
          }
        }
        callback()
      }
    }

    return {
      form: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        confirmPassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
          },
          {
            validator: validatePass2,
            trigger: 'blur',
          },
          {},
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$confirm('此操作将提交表单信息进行用户创建, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          let status
          registerUser(this.form)
            .then((res) => {
              console.log(res)
              if (res.data.code == 200) {
                status = 'success'
              } else {
                status = 'error'
              }

              this.$message({
                type: status,
                message: res.data.mes,
              })
              this.$router.replace({
                name: 'login',
              })
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: e,
                time: 5000,
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '已取消注册',
          })
        })
    },
    backToLogin() {
      this.$router.replace({
        name: 'login',
      })
    },
  },
}
</script>

<style scoped>
.container1 {
  /* 需要设置定位才能铺满全屏*/
  position: relative;
  width: 100%;
  height: 100%;
  /* background-image: url(../../assets/img/timg.jpg) 22; */
  background: url('../../assets/img/timg.jpg');
  background-size: 100%;
}
.title {
  text-align: center;
  padding: 20px 0 20px 0;
  font-size: 20px;
}
.registerBox {
  margin: 0 auto;
  width: 40%;
}
.btn {
  text-align: center;
}
</style>