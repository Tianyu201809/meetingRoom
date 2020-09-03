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
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="form.password"
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
    return {
      form: {
        userName: '',
        email: '',
        password: '',
      },
      rules: [],
    }
  },
  methods: {
    onSubmit() {
      debugger
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
                message: res.data.msg,
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