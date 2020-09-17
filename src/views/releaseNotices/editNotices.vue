<template>
  <div>
    <!-- 标题 -->
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-edit"
             style="margin-right:10px"></i>
          <strong>修改通知信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </template>
    <!-- 表单部分 -->
    <modify-notices-form></modify-notices-form>

  </div>
</template>
<script>
import { queryNoticesDetail, editNotification } from '@/api/notification'
import modifyNoticesForm from './children/modifyNoticesForm.vue'
export default {
  name: 'editNotices',
  components: {
    modifyNoticesForm,
  },
  data() {
    return {
      form: {},
    }
  },
  methods: {
    // queryNoticesDetail(id) {
    //   return new Promise((resolve, reject) => {
    //     queryNoticesDetail(id).then((result) => {
    //       resolve(result)
    //     })
    //   })
    // },
  },
  created() {
    //首先获取id,然后执行查询
    // const id = this.$route.params.id
    // this.queryNoticesDetail(id).then((d) => {
    //   this.form = d.data.data[0]
    // })
  },
}
</script>
<style scoped>
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>