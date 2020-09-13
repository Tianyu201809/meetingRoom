<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-document-add"
             style="margin-right:10px"></i>
          <strong>创建预约</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>

    <div class="center">
      <el-form ref="createAppointmentForm1"
               :model="form"
               :rules="rules"
               label-width="auto"
               style="width:90%"
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
        <el-form-item label="会议主题"
                      prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="所属部门"
                      prop="department">
          <el-select v-model="form.department"
                     placeholder="请选择"
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
                          :editable="false"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="会议时间"
                      prop="meetingTimeArea">
          <el-col :span="11">
            <el-time-select placeholder="开始时间"
                            @change="timeTransStartTime(form.startTime)"
                            :picker-options="appointmentTimeArea"
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

        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="form.description"
                    maxlength="150"
                    show-word-limit
                    :rows="6"></el-input>
        </el-form-item>
        <div class="center">
          <el-button type="primary"
                     @click="onSubmitForm()">创建预约</el-button>
          <el-button type="danger"
                     @click="onClearFormData()">取消</el-button>
        </div>
      </el-form>

    </div>
  </div>

</template>
<script>
import { getMeetingRoomItems } from '@/api/meetingRoom'
import { getToken, setToken } from '@/api/token'
import { createAppointment } from '@/api/appointment'
import { getUserList } from '@/api/user'
export default {
  name: 'createAppointment',
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
        //createdDate: '', //后端计算
        startTime: '',
        endTime: '',
        members: [],
        appointDate: '',
        modifyDate: Date.now(),
      },
      departmentList: [
        {
          value: '技术开发部',
          key: '00010',
        },
        {
          value: '产品销售部',
          key: '00020',
        },
        {
          value: '人事部',
          key: '00030',
        },
      ],
      //select测试数据
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
    onSubmitForm() {
      this.$refs.createAppointmentForm1.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将创建会议室信息, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
          })
            .then(() => {
              //   let obj = JSON.parse(JSON.stringify(this.form)) //变更格式
              //   obj.appointDate = this.dayjs(this.form.appointDate).format(
              //     'YYYY-MM-DD HH:mm:ss'
              //   )
              createAppointment(this.form)
                .then((result) => {
                  if (result.data.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '创建预约信息成功',
                    })
                    this.$router.push({ name: 'queryMeeting' })
                    console.log(result.data)
                  } else {
                    this.$message({
                      type: 'error',
                      message: result.data.data,
                    })
                  }
                })
                .catch((e) => {
                  console.log(e)
                })
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          return false
        }
      })
    },
    onClearFormData() {
      this.$router.replace({ name: 'queryMeeting' })
    },
    getMeetingRoomList() {
      axios.get('/getMeetingRoomList').then((data) => {
        const meetingRoomList = data.data.filter(() => {
          return item.status !== 0
        })
        this.meetingRoomList = meetingRoomList
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
  },
  computed: {},
  created() {
    //初始化参会人员下拉列表
    const group = null
    getUserList(group)
      .then((res) => {
        this.userList = res.data.data
      })
      .catch((e) => {
        console.log(e)
      })

    //1.获取所有下拉框中的数据
    //2.初始化信息
    const token = getToken()
    getMeetingRoomItems(token).then((result) => {
      this.meetingRoomList = result.data.data.filter((item) => {
        return item.meetingRoomStatus === '1'
      })
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