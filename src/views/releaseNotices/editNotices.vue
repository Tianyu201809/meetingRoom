<template>
  <div>
    <!-- 标题 -->
    <template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>修改通知信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </template>
    <!-- 表单部分 -->
    <release-notices-form :noticeItem="form"></release-notices-form>

  </div>
</template>
<script>
export default {
  name: 'editNotices',
  data() {
    return {
        form:{}
    }
  },
  methods: {},
  created(){
      //首先获取id,然后执行查询
  }
}
</script>
<style>
</style>