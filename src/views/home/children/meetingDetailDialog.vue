<template>
  <div class="dialog">
    <el-dialog title="会议详情"
               :visible.sync="dialogFormVisible">
      <!--  -->
      <el-form :model="form">
        <el-form-item label="会议主题"
                      :label-width="formLabelWidth">
          <el-input v-model="form.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参会人员"
                      :label-width="formLabelWidth">

        </el-form-item>
        <el-form-item label="会议日期"
                      :label-width="formLabelWidth">
          <span>会议日期</span>
        </el-form-item>
        <el-form-item label="时间段"
                      :label-width="formLabelWidth">
          <span>会议日期</span>
        </el-form-item>
        <el-form-item label="会议概述"
                      :label-width="formLabelWidth">
          <span>会议概述</span>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth:180,
      form:{
          title:'1',

      }
    }
  },
  methods: {
    openDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
  },
}
</script>
<style scoped>

</style>