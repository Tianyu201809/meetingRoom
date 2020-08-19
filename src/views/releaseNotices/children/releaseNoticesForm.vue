<template>
  <div class="parentBox">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 class="noticeForm"
                 size="medium">
          <el-form-item label="标题">
            <el-input v-model="form.title"
                      style="width:40.4%"></el-input>
          </el-form-item>
          <el-form-item label="通知部门">
            <el-select v-model="form.department"
                       placeholder="请选择通知部门">
              <el-option label="所有部门"
                         value="All"></el-option>
              <el-option label="技术开发部"
                         value="development"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-col :span="4.1">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.date1"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="1">----</el-col>
            <el-col :span="4.1">
              <el-date-picker placeholder="选择日期"
                              v-model="form.date1"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="通知正文"
                        prop="desc">
            <vue-editor></vue-editor>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <div class="btn">
      <el-button type="primary"
                 @click="sendReleaseNotices()">发布通知</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import VueEditor from './VueEditor'
export default {
  name: 'releaseNoticesForm',
  components: {
    VueEditor,
  },
  props: {},
  data() {
    return {
      form: {
        title: '',
        department: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    sendReleaseNotices(){

    }
  },
}
</script>
<style scoped>
.parentBox {
  margin-left: 10px;
}
.line {
  text-align: center;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>

