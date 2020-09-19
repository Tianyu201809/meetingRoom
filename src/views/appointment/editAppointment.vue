<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-edit"
             style="margin-right:10px"></i>
          <strong>修改预约信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>

    <div class="center">
      <el-form ref="editAppointmentForm"
               :model="form"
               label-width="auto"
               style="width:90%"
               :rules="rules"
               name='form'>
        <el-form-item label="会议室"
                      prop="meetingRoomNumber">
          <el-select v-model="form.meetingRoomNumber"
                     placeholder="请选择会议室"
                     style="width:20%">
            <el-option v-for="(item, index) in meetingRoomList"
                       :key="index"
                       :label="item.meetingRoomNumber"
                       :value="item.meetingRoomNumber">
              <span style="float: left">{{ item.meetingRoomNumber }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.meetingRoomName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议标题"
                      prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="所属部门"
                      prop="department">
          <el-select v-model="form.department"
                     placeholder="请选择"
                     filterable
                     style="width:100%">
            <el-option v-for="item in departmentList"
                       :key="item.value"
                       :label="item.value"
                       :value="item.key">
            </el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="预约日期"
                      prop="appointDate">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.appointDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="会议时间"
                      prop="meetingTimeArea">
          <el-col :span="11">
            <el-time-select placeholder="开始时间"
                            :picker-options="appointmentTimeArea"
                            @change="timeTransStartTime(form.startTime)"
                            v-model="form.startTime"
                            :editable="false"
                            style="width: 100%;"></el-time-select>
          </el-col>
          <el-col class="line center"
                  :span="2">—
          </el-col>
          <el-col :span="11">
            <el-time-select placeholder="结束时间"
                            v-model="form.endTime"
                            @change="timeTransEndTime(form.endTime)"
                            :picker-options="appointmentTimeArea"
                            :editable="false"
                            style="width: 100%;"></el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="参会人员"
                      prop="members">
          <el-select v-model="form.members"
                     placeholder="请选择"
                     filterable
                     multiple
                     style="width:100%">
            <el-option v-for="item in userList"
                       :key="item._id"
                       :label="item.userName"
                       :value="item.userName">
              <span style="float: left">{{ item.userName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px; margin-right:20px">{{ item.email }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议相关文件">
          <el-upload class="upload-demo"
                     drag
<<<<<<< HEAD
                     action="http://localhost:3000/upload/uploadMeetingFile"
=======
                     action="/upload/uploadMeetingFile"
>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove"
                     :on-success="uploadComplete"
                     multiple
                     :limit="10"
                     :data="appointmentID"
                     :on-exceed="handleExceed"
                     :file-list="fileList">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"
                 style="margin-top:-10px"
                 slot="tip">相关文件列表，点击下载文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="form.description"
                    maxlength="150"
                    show-word-limit
                    :rows="6"></el-input>
        </el-form-item>
        <div class="center">
          <el-button type="primary"
                     @click="updateAppointmentItem()">保存</el-button>
          <el-button type="danger"
                     @click="backLastPage()">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>

</template>
<script>
// import AppointmentInfo from '@/class/AppointmentInfo'
import { getMeetingRoomItems } from '@/api/meetingRoom'
import { getToken, setToken } from '@/api/token'
import {
  queryAppointmentDetail,
  updateAppointmentItem,
} from '@/api/appointment'
import { getUserList } from '@/api/user'
import {
  getUploadFileList,
  removeAppointmentFile,
  downloadFile,
} from '@/api/upload'
export default {
  name: 'editAppointment',
  components: {},
  data() {
    var dateValid = (rule, value, callback) => {
      const d = 10800000 //三个小时的毫秒数
      if (!this.form.appointDate) {
        callback(new Error('请首先选择预约日期'))
      }
      let startTime = new Date(this.form.startTime)
      let endTime = new Date(this.form.endTime)
      if (startTime >= endTime) {
        callback(new Error('时间段选择错误，开始时间不能大于或等于结束时间'))
      }

      let numberStartTime = startTime.getTime()
      let numberEndTime = endTime.getTime()
      if (numberEndTime - numberStartTime > d) {
        callback(new Error('所预约的会议时常不能超过3小时'))
      }

      //没有问题，执行正确回调
      callback()
    }
    return {
      //name, url
      appointmentID: {
        appointmentID: '',
      },
      fileList: [],
      userList: [],
      meetingRoomList: [],
      appointmentTimeArea: {
        start: '09:00',
        step: '00:30',
        end: '18:00',
      },
      form: {
        title: '',
        description: '',
        department: '',
        meetingRoomNumber: '',
        //createdDate: '',
        content: '',
        startTime: '',
        endTime: '',
        members: [],
        appointDate: '',
      },
      departmentList: [
        {
          value: '开发技术部',
          key: '00010',
        },
        {
          value: '产品销售部',
          key: '00020',
        },
      ],
      //验证
      rules: {
        meetingRoomNumber: [
          {
            required: true,
            message: '会议室不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        title: [
          { required: true, message: '会议主题不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 50,
            message: '长度在 6 到 50 个字符',
            trigger: 'blur',
          },
        ],
        department: [
          {
            required: true,
            message: '部门不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        appointDate: [
          {
            required: true,
            message: '预约日期不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        meetingTimeArea: [
          {
            validator: dateValid,
            trigger: ['blur', 'change'],
          },
        ],
        members: [
          {
            required: true,
            message: '不能为空值',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  mounted() {},
  methods: {
    //创建预约
    backLastPage() {
      this.$router.push({ name: 'queryMeeting' })
    },
    //获取会议室下拉菜单列表
    getMeetingRoomList() {
      axios.get('/getMeetingRoomList').then((data) => {
        const meetingRoomList = data.data.filter((item) => {
          return item.status !== 0
        })
        this.meetingRoomList = meetingRoomList
      })
    },
    //更新预约信息
    updateAppointmentItem() {
      const id = this.$route.params.id
      const obj = this.form
      let that = this
      this.$refs.editAppointmentForm
        .validate((valid) => {
          if (valid) {
            this.$confirm('此操作将修改当前预约信息, 是否继续?', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning',
            })
              .then(() => {
                updateAppointmentItem(id, obj)
                  .then((data) => {
                    that.$message({
                      type: 'success',
                      message: '预约信息修改成功',
                    })
                    that.$router.push({ name: 'queryMeeting' })
                  })
                  .catch((e) => {
                    console.log(e)
                  })
              })
              .catch((e) => {
                that.$message({
                  type: 'error',
                  message: '未提交修改',
                })
              })
          } else {
            return false
          }
        })
        .catch((e) => {
          that.$message({
            type: 'error',
            message: '未提交修改',
          })
        })
    },
    //查询预约信息
    queryAppointmentDetail(id) {
      let that = this
      queryAppointmentDetail(id)
        .then((data) => {
          that.form = data.data.data
          console.log(that.form.title)
        })
        .catch((e) => {
          that.form = e.data.data
        })
    },
    //时间存储与转化
    timeTransStartTime(timeString) {
      let Hour = timeString.split(':')[0]
      let Minutes = timeString.split(':')[1]
      let Second = timeString.split(':')[2] || '00'
      let day = this.dayjs(this.form.appointDate)
      //输出转化后的时间
      const outPut = day
        .hour(parseInt(Hour))
        .minute(parseInt(Minutes))
        .second(parseInt(Second))
        .format('YYYY-MM-DD HH:mm:ss')
      console.log(outPut)
      this.form.startTime = outPut
      return outPut
    },
    //时间存储与转化
    timeTransEndTime(timeString) {
      let Hour = timeString.split(':')[0]
      let Minutes = timeString.split(':')[1]
      let Second = timeString.split(':')[2] || '00'
      let day = this.dayjs(this.form.appointDate)
      //输出转化后的时间
      const outPut = day
        .hour(parseInt(Hour))
        .minute(parseInt(Minutes))
        .second(parseInt(Second))
        .format('YYYY-MM-DD HH:mm:ss')
      console.log(outPut)
      this.form.endTime = outPut
      return outPut
    },

    //文件上传部分
    //删除文件
    handleRemove(file, fileList) {
      console.log(file, fileList)
      //执行删除方法
      const id = file.response ? file.response[0].data._id : file._id
      const url = file.response ? file.response[0].data.url : file.url

      removeAppointmentFile(id, url)
        .then((result) => {
          this.$message({
            type: 'success',
            message: '附件删除成功',
          })
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: '附件删除失败',
          })
        })
    },
    handlePreview(file) {
      //下载文件方法
<<<<<<< HEAD
=======
      debugger

>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
      console.log(file)
      this.$confirm(`确定下载文件 ${file.name}？`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
<<<<<<< HEAD
        downloadFile(file.url, file.name).then((res) => {
=======
        let url = ''
        if (file.response) {
          url = file.response[0].data.url
        } else {
          url = file.url
        }
        downloadFile(url, file.name).then((res) => {
>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
          const blobo = new Blob([res.data], { type: 'arraybuffer' })
          const archor = document.createElement('a')
          const href = window.URL.createObjectURL(blobo) //关键点3
          archor.setAttribute('href', href)
          // /* 关键之处：使用download属性必须要html5的页面才行 ，而且它不会刷新，文件名及扩展名均由这里控制*/
          archor.setAttribute('download', file.name) //关键点4
          archor.click()
        })
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
<<<<<<< HEAD
      //   this.$confirm(`此操作将永久移除 ${file.name}, 是否继续?`, '提示', {
      //     cancelButtonText: '取消',
      //     confirmButtonText: '确定',
      //     type: 'warning',
      //   })
      //     .then(() => {
      //       return false
      //     })
      //     .catch(() => {
      //       return false
      //     })
=======
>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
    },
    uploadComplete(e) {
      //   const id = this.$route.params.id
      //   const itemArray = e.map((item) => {
      //     const obj = {}
      //     obj.url = item.url
      //     obj.name = item.originalname
      //     obj._id = item._id
      //     return obj
      //   })
      //   this.fileList.push(...itemArray)
    },
  },
  computed: {},
  created() {
    //查询单条预约
    const id = this.$route.params.id
    this.appointmentID.appointmentID = id
    //执行查询方法
    //首先初始化下拉列表
    const filter = {
      filter: {},
      limit: 0,
      skip: 0,
    }
    let that = this
    getMeetingRoomItems(filter)
      .then((result) => {
        return new Promise((resolve, reject) => {
          that.meetingRoomList = result.data.data
          resolve(true)
        })
      })
      .then(() => {
        that.queryAppointmentDetail(id)
      })
      .catch((e) => {
        console.log(e)
      })

    //初始化人员列表
    const group = null
    getUserList(group)
      .then((res) => {
        console.log(res)
        that.userList = res.data.data
      })
      .catch((e) => {
        console.log(e)
      })

    //获取该会议预约的文件列表
    getUploadFileList(id)
      .then((result) => {
        //获取文件列表，并进行数据过滤处理，只留下url和name两个值
        //url指向后端文件
        //name则是 文件名称+文件类型W
        const filelist = result.data.data //数组
        const showList = filelist.map((item) => {
          const obj = {}
          obj.url = item.url
          obj.name = item.originalname
          obj._id = item._id
          return obj
        })
        this.fileList = showList
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>
<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.center {
  display: flex;
  justify-content: center;
}
.left {
  justify-content: left;
}

.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
/* 解决不出现滚动条的问题 */
.wrapper {
  height: 100vh;
  overflow: auto;
}
.wrapper >>> .el-tag.el-tag--info {
  color: #fff;
  background-color: #409eff;
  border-color: #ccc;
}
</style>