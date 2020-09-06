<template>
  <div class="parentBox">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form ref="form"
                 :model="noticesForm"
                 label-width="80px"
                 class="noticeForm"
                 size="medium">
          <el-form-item label="标题">
            <el-input v-model="noticesForm.title"
                      style="width:40.4%"></el-input>
          </el-form-item>
          <el-form-item label="通知部门">
            <el-select v-model="noticesForm.department"
                       value-key="number"
                       placeholder="请选择通知部门">
              <!-- <el-option label="所有部门"
                         value="All"></el-option>
              <el-option label="技术开发部"
                         value="development"></el-option> -->

              <el-option v-for="item in department"
                         :key="item.number"
                         :label="item.name"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-col :span="4.1">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="noticesForm.startDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="1">----</el-col>
            <el-col :span="4.1">
              <el-date-picker placeholder="选择日期"
                              v-model="noticesForm.endDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="通知正文"
                        prop="desc">
            <vue-editor @content="getContent"
                        :content.sync="noticesContent"></vue-editor>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <div class="btn">
      <el-button type="primary"
                 @click="editNotification()">修改通知</el-button>
      <!-- <el-button type="primary"
                 @click="sendReleaseNotices()">发布通知</el-button> -->
      <el-button type="danger"
                 @click="backTo()">返回</el-button>
    </div>
  </div>
</template>

<script>
import VueEditor from './VueEditor'
import {
  createNotification,
  editNotification,
  deleteNotices,
  queryNoticesDetail,
} from '@/api/notification'
export default {
  name: 'releaseNoticesForm',
  components: {
    VueEditor,
  },
  data() {
    return {
      //   form: {},
      noticesForm: {},
      noticesContent: '',
      department: [
        { number: '00010', name: '技术开发部门' },
        { number: '00020', name: '产品销售部' },
        { number: 'all', name: '所有部门' },
      ],
    }
  },
  mounted() {},
  props: {
    // noticesForm: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       title: '',
    //       department: '',
    //       startDate: '',
    //       endDate: '',
    //       content: '',
    //       status: '',
    //     }
    //   },
    // },
  },
  created() {
    //首先获取id,然后执行查询
    const id = this.$route.params.id
    this.queryNoticesDetail(id).then((d) => {
      this.noticesForm = d.data.data[0]
      this.noticesContent = d.data.data[0].content
    })
  },
  mounted() {},
  methods: {
    queryNoticesDetail(id) {
      return new Promise((resolve, reject) => {
        queryNoticesDetail(id).then((result) => {
          resolve(result)
        })
      })
    },
    editNotification() {
      const id = this.$route.params.id
      const obj = this.noticesForm
      let that = this
      editNotification(id, obj)
        .then((d) => {
          if (d.data.code == 200) {
            that.$message({
              type: 'success',
              message: '通知信息修改成功',
            })
            that.$router.replace({ name: 'queryNotices' })
          } else {
            that.$message({
              type: 'error',
              message: '信息修改失败',
            })
          }
        })
        .catch((e) => {
          that.$message({
            type: 'error',
            message: e.data,
          })
        })
    },

    backTo() {
      this.$router.replace({ name: 'queryNotices' })
    },
    getContent(content) {
      this.form.content = content
    },
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

