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
            <vue-editor @content="getContent"></vue-editor>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <div class="btn">
      <el-button type="success"
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
            name:'queryNotices'
        })
    },
    getContent(content) {
      this.form.content = content
    },
    sendReleaseNotices() {
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
    },
    saveDraft() {
      this.$confirm('此操作将会保存通知信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          this.createInfo(0)
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '未保存通知信息',
          })
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
                resolve()
              })
              .catch((e) => {
                console.log(e)
                reject()
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

