<template>
  <div class="parentBox">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form ref="createNoticeForm"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 class="noticeForm"
                 size="medium">
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="form.title"
                      style="width:40.4%"></el-input>
          </el-form-item>
          <el-form-item label="通知部门"
                        prop="department">
            <el-select v-model="form.department"
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
          <el-form-item label="有效日期"
                        prop="noticesDate">
            <el-col :span="4.1">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.startDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="1">----</el-col>
            <el-col :span="4.1">
              <el-date-picker placeholder="选择日期"
                              v-model="form.endDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="通知正文"
                        prop="desc">
            <vue-editor @noticesContent="getContent"></vue-editor>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <div class="btn">
      <el-button type="warning"
                 @click="saveDraft()">保存草稿</el-button>
      <el-button type="primary"
                 @click="sendReleaseNotices()">发布通知</el-button>
      <el-button type="danger"
                 @click="backTo()">返回</el-button>
    </div>
  </div>
</template>

<script>
import VueEditor from './VueEditor'
import { createNotification } from '@/api/notification'
export default {
  name: 'releaseNoticesForm',
  components: {
    VueEditor,
  },
  props: {},
  data() {
    const noticeDateValid = (rule, value, callback) => {
      const d1 = new Date(this.form.startDate).getTime()
      const d2 = new Date(this.form.endDate).getTime()
      debugger
      if (d2 < d1) {
        callback(Error('结束时间不能大于开始时间'))
      }
      callback()
    }
    return {
      form: {
        title: '',
        department: '',
        startDate: '',
        endDate: '',
        content: '',
        status: '',
      },
      department: [
        { number: '00010', name: '技术开发部门' },
        { number: '00020', name: '产品销售部' },
        { number: 'all', name: '所有部门' },
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
    noticesForm: {
      type: Object,
      default: function () {
        return {
          title: '',
          department: '',
          startDate: '',
          endDate: '',
          content: '',
          status: '',
        }
      },
    },
  },
  mounted() {
    console.log(this.form)
  },
  methods: {
    backTo() {
      this.$router.replace({
        name: 'queryNotices',
      })
    },
    getContent(content) {
      this.form.content = content
    },
    sendReleaseNotices() {
      this.$refs.createNoticeForm.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将会发布通知信息, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
          })
            .then(() => {
              this.createInfo(1)
            })
            .catch((e) => {
              this.$message({
                type: 'success',
                message: '未发布通知信息',
              })
            })
        } else {
          return false
        }
      })
    },
    saveDraft() {
      this.$refs.createNoticeForm.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将会保存通知信息, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
          })
            .then(() => {
              this.createInfo(0)
                .then((d) => {
                  this.$message({
                    type: 'success',
                    message: '通知保存成功',
                  })
                  this.$router.replace({
                    name: 'queryNotices',
                  })
                })
                .catch(() => {
                  this.$message({
                    type: 'error',
                    message: '通知创建失败',
                  })
                })
            })
            .catch(() => {
              this.$message({
                type: 'success',
                message: '未保存通知信息',
              })
            })
        } else {
          return false
        }
      })
    },
    createInfo(status) {
      console.log(this.form)
      return new Promise((resolve, reject) => {
        switch (status) {
          case 0:
            this.form.status = 0
            createNotification(this.form)
              .then((d) => {
                console.log(d)
                resolve(d)
              })
              .catch((e) => {
                console.log(e)
                reject(e)
              })
            break

          case 1:
            this.form.status = 1
            createNotification(this.form)
              .then((d) => {
                console.log(d)
                resolve()
              })
              .catch((e) => {
                console.log(e)
                reject()
              })
            break

          default:
            this.form.status = 0
            createNotification(this.form)
              .then((d) => {
                console.log(d)
                resolve()
              })
              .catch((e) => {
                console.log(e)
                reject()
              })
            break
        }
      })
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

