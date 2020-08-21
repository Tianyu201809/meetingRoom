<template>
  <div class="dialog">
    <el-dialog :visible.sync="dialogFormVisible"
               width="30%"
               lock-scroll>
      <!--会议详情展示  -->
      <div slot="title">
        会议详情
        <el-divider></el-divider>
      </div>
      <div class="dialog-container">
        <el-form label-width="90px"
                 style=""
                 :label-position="labelPosition">
          <el-form-item label="会议主题:"
                        class="form-item">
            {{form.title}}
          </el-form-item>
          <el-form-item label="会议日期:"
                        class="form-item">
            {{form.meetingDate}}
          </el-form-item>
          <el-form-item label="会议时间段:"
                        class="form-item">
            {{form.startTime}} ~ {{form.endTime}}
          </el-form-item>
          <el-form-item label="参会人员:"
                        class="form-item">
            {{form.startTime}} ~ {{form.endTime}}
          </el-form-item>
          <el-form-item label="会议室:"
                        class="form-item">
            2-1103
          </el-form-item>
          <el-form-item label="当前状态:"
                        class="form-item">
            <span>已结束</span>
          </el-form-item>
          <el-form-item label="会议概述:"
                        class="form-item">
            <span>This  meeting is about techonlogy meeting！</span>
          </el-form-item>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'left',
      dialogFormVisible: false,
      formLabelWidth: 180,
      form: {
        title: '技术讨论会议',
        meetingDate: '2020-8-20',
        startTime: '9:30',
        endTime: '11:30',
      },
    }
  },
  props: {},
  methods: {
    openDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
  },
}
</script>
<style scoped>
.dialog-container {
  margin-top: -50px;
}
.form-item {
  height: 20px;
}
</style>