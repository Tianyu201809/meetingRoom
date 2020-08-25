<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>创建预约</strong>
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
                     style="width:100%">
            <el-option v-for="(item, index) in meetingRoomList"
                       :key="index"
                       :label="item.meetingRoomNumber"
                       :value="item.meetingRoomNumber">
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
                          v-model="form.appoDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="会议时间">
          <el-col :span="11">
            <el-time-select placeholder="开始时间"
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
                            :picker-options="appointmentTimeArea"
                            :editable="false"
                            style="width: 100%;"></el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="参会人员">
          <el-select v-model="value"
                     placeholder="请选择"
                     filterable
                     multiple
                     style="width:100%"
                     @change="checkMembers(event)">
            <el-option-group v-for="group in options"
                             :key="group.label"
                             :label="group.label">
              <el-option v-for="item in group.options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea"
                    v-model="form.desc"
                    maxlength="150"
                    show-word-limit
                    :rows="6"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary"
                     @click="onSubmitForm()">创建预约</el-button>
          <el-button type="danger"
                     @click="onClearFormData()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import AppointmentInfo from '@/class/AppointmentInfo'
import { getMeetingRoomItems } from '@/api/meetingRoom'
import { getToken, setToken } from '@/api/token'
import { createAppointment } from '@/api/appointment'
export default {
  name: 'createAppointment',
  components: {},
  data() {
    return {
      meetingRoomList: [
        {
          meetingRoomNumber: '1-1102',
          createdBy: {},
          hasMedia: true,
          meetingRoomSize: '4',
          meetingRoomStatus: 0,
        },
        {
          meetingRoomNumber: '1-1103',
          createdBy: {},
          hasMedia: false,
          meetingRoomSize: '5',
          meetingRoomStatus: 1,
        },
      ],
      appointmentTimeArea: {
        start: '09:00',
        step: '00:30',
        end: '18:00',
      },
      form: {
        title: '',
        desc: '',
        department: '',
        meetingRoomNumber: '',
        createdDate: '',
        content: '',
        startTime: '',
        endTime: '',
        members: '',
        appointData: '',
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
      //select测试数据
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value1: [],
      value2: [],
      value: '',
    }
  },
  mounted() {
    //1.获取所有下拉框中的数据
    //2.初始化信息
    const token = getToken()
    getMeetingRoomItems(token).then((result) => {
      if (result.data.data.length === 0) {
        mockMeetingRoomList = [
          {
            meetingRoomID: '',
            meetingRoomNumber: '1-1102',
            createdBy: {},
            hasMedia: true,
            meetingRoomSize: '4',
            meetingRoomVolume: '',
            meetingRoomStatus: 0,
          },
          {
            meetingRoomID: '',
            meetingRoomNumber: '1-1103',
            createdBy: {},
            hasMedia: false,
            meetingRoomSize: '5',
            meetingRoomStatus: 1,
          },
        ]
        this.meetingRoomList = mockMeetingRoomList
      }
      this.meetingRoomList = result.data.data
    })
  },
  methods: {
    //创建预约
    onSubmitForm() {
      createAppointment(this.form).then((result) => {
        console.log(result.data)
      })
    },
    onClearFormData() {},
    getMeetingRoomList() {
      axios.get('/getMeetingRoomList').then((data) => {
        const meetingRoomList = data.data.filter(() => {
          return item.status !== 0
        })
        this.meetingRoomList = meetingRoomList
      })
    },
  },
  computed: {},
  created() {},
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
</style>