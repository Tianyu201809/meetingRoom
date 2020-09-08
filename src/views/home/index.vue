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
          <my-calendar @currentSelectDate="getSelectDate"></my-calendar>
        </el-row>

      </el-col>
      <el-col :span="8">
        <el-row :gutter="0"
                class="mgb20">
          <notification></notification>
          <transition name="fade">
            <today-meeting-card :meetingList="meetingList"
                                :userInfo="userInfo"
                                :total="totalCount"
                                :appointDate='meetingDate'
                                @paingUserMeetingItems="getPagingUserMeeting"
                                :loading.sync='loading'
                                style="margin-top:10px"></today-meeting-card>
          </transition>

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
import { getLocalProp, setLocalProp, _debounce } from '@/api/localMethods'
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
      userInfo: {
        userName: '',
        email: '',
        role: 1,
        loginDate: '',
        loginTime: '',
      },
      totalCount: 0, //index页面中的当日会议的总数
      meetingDate: '',
      todoList: [],
      meetingList: [],
      loading: true,
    }
  },
  mounted() {},
  computed: {},
  methods: {
    //获取用户
    getPagingUserMeeting(data) {
      this.meetingList = data
    },
    getSelectDate(selectDate) {
        this.loading = true
      this.meetingDate = selectDate
      const filterObj = {
        userName: this.userInfo.userName,
        meetingDate: this.meetingDate,
      }
      //   this.getUserJoinedMeetingCount(filterObj).then((d) => {
      //     that.totalCount = d.data.count
      //     that.userJoinedMeetingItems(filterObj)
      //   })

      /**
       * 加载速度优化，同时请求两个接口
       */
      Promise.all([
        getUserJoinedMeetingCount(filterObj),
        userJoinedMeeting(filterObj),
      ]).then((result) => {
        console.log(result[0])
        console.log(result[1])
        this.totalCount = result[0].data.count || 0
        this.meetingList = result[1].data.data
        this.loading = false
      })
    },

    //获取登陆人当日会议数量,用于分页使用
    getUserJoinedMeetingCount(obj) {
      return new Promise((resolve, reject) => {
        getUserJoinedMeetingCount(obj)
          .then((res) => {
            this.loading = false
            resolve(res)
          })
          .catch((e) => {
            this.loading = false
            console.log(e)
          })
      })
    },
    //获取登陆人当日会议显示条目，默认显示3条
    //查询参会人中包含登陆人的预约条目
    userJoinedMeetingItems(obj) {
      return new Promise((resolve, reject) => {
        userJoinedMeeting(obj).then((result) => {
          this.meetingList = result.data.data
        })
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
  created() {
    /**
     * 获取用户数据部分email username
     */
    let that = this
    this.userInfo.userName = getLocalProp('userName')
    this.userInfo.email = getLocalProp('email')
    let dateString = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let timeString = dateString.split(' ')[1]
    this.userInfo.loginDate = dayjs(new Date()).format('YYYY-MM-DD')
    this.userInfo.loginTime = timeString //登录时间以后需要修改

    /**
     * today meeting部分
     */
    const obj = {
      userName: this.userInfo.userName,
      meetingDate: this.meetingDate || dayjs(new Date()).format('YYYY-MM-DD'),
    }
    // getUserJoinedMeetingCount(obj).then((result) => {
    //   return new Promise((resolve1, reject1) => {
    //     this.totalCount = result.data.count || 0
    //     console.log(result)
    //     resolve1()
    //   }).then(() => {
    //     //该用户获取当日会议（需要显示的数据）
    //     userJoinedMeeting(obj).then((result) => {
    //       console.log(result)
    //       that.meetingList = result.data.data
    //     })
    //   })
    // })

    Promise.all([getUserJoinedMeetingCount(obj), userJoinedMeeting(obj)])
      .then((result) => {
        console.log(result[0])
        console.log(result[1])
        this.totalCount = result[0].data.count || 0
        this.meetingList = result[1].data.data
        this.loading = false
      })
      .catch((e) => {
        this.loading = false
      })
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
