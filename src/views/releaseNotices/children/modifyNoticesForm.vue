<template>
  <div class="parentBox">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form ref="modifyNoticesForm"
                 :model="noticesForm"
                 :rules="rules"
                 label-width="80px"
                 class="noticeForm"
                 size="medium">
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="noticesForm.title"
                      style="width:40.4%"></el-input>
          </el-form-item>
          <el-form-item label="通知部门"
                        prop="department">
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
          <el-form-item label="发布状态">
            <el-select v-model="noticesForm.status"
                       value-key="status"
                       placeholder="发布状态">
              <!-- <el-option label="所有部门"
                         value="All"></el-option>
              <el-option label="技术开发部"
                         value="development"></el-option> -->

              <el-option v-for="item in status"
                         :key="item.status"
                         :label="item.status"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效日期"
                        prop="noticesDate">
            <el-col :span="4">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="noticesForm.startDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="1">——</el-col>
            <el-col :span="4">
              <el-date-picker placeholder="选择日期"
                              v-model="noticesForm.endDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="通知正文"
                        prop="desc">
            <vue-editor @noticesContent="getContent"
                        :content.sync="noticesForm.content"></vue-editor>
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
  name: 'modifyNoticesForm',
  components: {
    VueEditor,
  },
  data() {
    const noticeDateValid = (rule, value, callback) => {
      const d1 = new Date(this.noticesForm.startDate).getTime()
      const d2 = new Date(this.noticesForm.endDate).getTime()
      debugger
      if (d2 < d1) {
        callback(Error('结束时间不能大于开始时间'))
      }
      callback()
    }
    return {
      //   form: {},

      status: [
        {
          status: '未发布',
          value: 0,
        },
        {
          value: 1,
          status: '已发布',
        },
        {
          value: 2,
          status: '已撤销',
        },
      ],
      noticesForm: {},
      noticesContent: '11111111111111111',
      department: [
        { number: '00010', name: '技术开发部门' },
        { number: '00020', name: '产品销售部' },
        { number: '00000', name: '所有部门' },
      ],
      rules: {
        title: [
          { required: true, message: '请输入通知标题', trigger: 'blur' },
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur',
          },
        ],
        department: [
          {
            required: true,
            message: '请选择通知部门',
            trigger: ['blur', 'change'],
          },
        ],
        noticesDate: {
          validator: noticeDateValid,
          trigger: ['blur', 'change'],
        },
      },
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
    let that = this
    that.queryNoticesDetail(id).then((d) => {
      //获取通知的详细信息
      that.noticesForm = d.data.data[0]
      //debugger
      //that.noticesContent = d.data.data[0].content
      //that.noticesForm.content = that.noticesContent
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
      obj.content = this.noticesContent
      let that = this
      this.$refs.modifyNoticesForm.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将修改通知信息, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
          })
            .then(() => {
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
            })
            .catch(() => {
              that.$message({
                type: 'error',
                message: '未提交修改信息',
              })
              return false
            })
        } else {
          return false
        }
      })
    },

    backTo() {
      this.$router.replace({ name: 'queryNotices' })
    },
    getContent(content) {
      this.noticesContent = content
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

