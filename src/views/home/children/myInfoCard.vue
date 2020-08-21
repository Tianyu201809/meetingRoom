<template>
  <div class="card-container">
    <keep-alive>
      <el-card shadow="hover"
               class="mgb20"
               style="height:252px;">
        <div class="user-info">

          <el-avatar @error="errorHandler"
                     :size="120">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 class="user-avator-index"
                 alt
                 ref="avatar" />
          </el-avatar>

          <div class="user-info-cont">
            <div class="user-info-name">{{userInfo.userName}}</div>
            <div>{{userInfo.email}}</div>
            <div class="edit-info"><a href="#">修改</a></div>
          </div>
        </div>
        <div class="user-info-list">
          本次登录日期：
          <span>{{loginDate}}</span>
        </div>
        <div class="user-info-list">
          本次登录时间：
          <span>{{loginTime}}</span>
        </div>
      </el-card>
    </keep-alive>

  </div>
</template>
<script>
import store from '../../../store'
import { getLocalProp, setLocalProp } from '../../../api/localMethods'
import dayjs from 'dayjs'
export default {
  name: 'myInfoCard',
  props: {
    user: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      userInfo: {
        userName: '',
        email: '',
      },
      loginTime: '',
      loginDate: '',
    }
  },
  mounted() {
    this.userInfo.userName = getLocalProp('userName')
    this.userInfo.email = getLocalProp('email')

    let dateString = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let timeString = dateString.split(' ')[1]

    /**
     * 有BUG以后登录时间需要存在后台数据库中
     */
    this.loginDate = dayjs(new Date()).format('YYYY-MM-DD')
    this.loginTime = timeString
  },
  methods: {
    errorHandler() {
      debugger
      this.refs.avatar.src =
        'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
      return true
    },
  },
  computed: {},
}
</script>
<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator-index {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.edit-info {
  margin-top: 5px;
  font-size: 13px;
  font-family: initial;
  font-weight: 400;
}
.edit-info a {
  color: rgb(8, 168, 8);
}
</style>