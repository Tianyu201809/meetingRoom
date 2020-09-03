<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>修改预约信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>

    <div class="center">
      <el-form ref="form"
               :model="form"
               label-width="auto"
               style="width:90%"
               name='form'>
        <el-form-item label="会议室">
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
        <el-form-item label="会议标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
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
        <el-form-item label="预约日期">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.appointDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="会议时间">
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
        <el-form-item label="参会人员">
          <el-select v-model="form.members"
                     placeholder="请选择"
                     filterable
                     multiple
                     style="width:100%"
                     @change="checkMembers(event)">
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
        <el-form-item class="center">
          <el-button type="primary"
                     @click="updateAppointmentItem()">保存</el-button>
          <el-button type="danger"
                     @click="backLastPage()">取消</el-button>
        </el-form-item>
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
export default {
  name: 'createAppointment',
  components: {},
  data() {
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
        //createdDate: '',
        content: '',
        startTime: '',
        endTime: '',
        members: '',
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
  },
  computed: {},
  created() {
    //查询单条预约
    const id = this.$route.params.id
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
  },
}
</script>
<style scope>
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
.wrapper >>> .el-tag.el-tag--info {
  color: #fff;
  background-color: #409eff;
  border-color: #ccc;
}
</style>