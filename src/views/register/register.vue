<template >
  <div class="container1">
    <div class="registerBox">
      <div class="title">用户注册</div>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="success"
                     @click="onSubmit">立即创建</el-button>
          <el-button type="danger">取消</el-button>
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
    }
  },
  methods: {
    onSubmit() {
      debugger
      registerUser(this.form)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
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