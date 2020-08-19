<template>
  <div>
    <!-- 标题 -->
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>发布通知</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </template>
    <!-- 表单部分 -->
    <release-notices-form></release-notices-form>

  </div>
</template>
<script>
import releaseNoticesForm from './children/releaseNoticesForm.vue'
export default {
  name: 'releaseNotices',
  components: {
    releaseNoticesForm,
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
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