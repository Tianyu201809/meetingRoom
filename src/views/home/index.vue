<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 传递用户信息email和name给子组件 -->
        <my-info-card :userInfo="userInfo"></my-info-card>
        <todo-list :todoList="todoList"></todo-list>

      </el-col>
      <el-col :span="8">
        <el-row :gutter="0"
                class="mgb20">
          <my-calendar></my-calendar>
        </el-row>

      </el-col>
      <el-col :span="8">
        <el-row :gutter="0"
                class="mgb20">
          <notification :notification="notification"></notification>
          <today-meeting-card :meetingList="meetingList"
                              :userInfo="userInfo"
                              style="margin-top:10px"></today-meeting-card>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
//import Schart from 'vue-schart'
import bus from '../../components/common/bus'
import notification from './children/notification'
import myInfoCard from './children/myInfoCard'
import todayMeetingCard from './children/todayMeetingCard'
import myCalendar from './children/myCalendar'
import todoList from './children/todoList'
import { getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/api/token'
import { getUserJoinedMeetingCount, userJoinedMeeting } from '@/api/appointment'

import store from '../../store'
import { getLocalProp, setLocalProp } from '../../api/localMethods'
import dayjs from 'dayjs'

export default {
  name: 'index',
  components: {
    myInfoCard,
    todayMeetingCard,
    notification,
    myCalendar,
    todoList,
  },
  beforeRouteEnter(to, from, next) {
    //设置组件导航首位，如果cookit中没有页面，不进行跳转
    //并将提示信息返回给前端
    debugger
    const path = to.path
    const token = getToken()
    console.log(this)
    if (!token) {
      this.$router.push('/login')
    }
    if (path === '/login') {
      next(false)
    }
    //登录成功之后，后端会返回一个成功的验证信息给前端

    next(true)
  },
  data() {
    return {
      todoList: [],
      meetingList: [
        {
          title: '技术讨论会议',
          status: false,
        },
        {
          title: '今天要修复10个bug',
          status: false,
        },
        {
          title: '写bug',
          status: true,
        },
      ],
      notification: [
        {
          index: 1,
          msg: '今天晚上开会',
          date: '2020-07-09',
        },
        {
          index: 1,
          msg: '今天晚上开会',
          date: '2020-07-09',
        },
        {
          index: 1,
          msg: '今天晚上开会',
          date: '2020-07-09',
        },
        {
          index: 1,
          msg: '今天晚上开会',
          date: '2020-07-09',
        },
        {
          index: 1,
          msg: '今天晚上开会',
          date: '2020-07-09',
        },
      ],
      userInfo: {
        userName: '',
        email: '',
        loginDate: '',
        loginTime: '',
      },
    }
  },
  mounted() {
    debugger
    this.userInfo.userName = getLocalProp('userName')
    this.userInfo.email = getLocalProp('email')

    let dateString = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let timeString = dateString.split(' ')[1]

    /**
     * 有BUG以后登录时间需要存在后台数据库中
     */
    this.userInfo.loginDate = dayjs(new Date()).format('YYYY-MM-DD')
    this.userInfo.loginTime = timeString
  },
  computed: {},
  // created() {
  //     this.handleListener();
  //     this.changeDate();
  // },
  // activated() {
  //     this.handleListener();
  // },
  // deactivated() {
  //     window.removeEventListener('resize', this.renderChart);
  //     bus.$off('collapse', this.handleBus);
  // },
  methods: {
    changeDate() {
      const now = new Date().getTime()
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000)
        item.name = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`
      })
    },

    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
  },
}
</script>


<style scoped>
.el-row {
  margin-bottom: 10px;
}

.mgb20 {
  margin-bottom: 20px;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
