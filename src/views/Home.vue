<template>
  <div class="wrapper">
    <v-head title="会议室预定系统" :userInfo="userInfo"></v-head>
    <v-sidebar></v-sidebar>

    <div class="content-box"
         :class="{'content-collapse':collapse}">
      <!-- <v-tags></v-tags> -->
      <div class="content">
        <transition name="move"
                    mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>

<script>
import vHead from '@/components/common/Header.vue'
import vSidebar from '@/components/common/Sidebar.vue'
// import vTags from '@/components/common/Tags.vue';
import bus from '@/components/common/bus'
import { getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/api/token'
// import store from '../store'
import meetingDetailDialog from './home/children/meetingDetailDialog'
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
      userInfo: {},
    }
  },
  components: {
    vHead,
    vSidebar,
    meetingDetailDialog
    // vTags
  },
  //   beforeRouteUpdate(to, from, next) {
  //     //设置组件导航首位，如果cookit中没有页面，不进行跳转
  //     //并将提示信息返回给前端
  //     const path = to.path
  //     const token = getToken();
  //     if(!token){
  //     //   this.$router.push({
  //     //       name:'login'
  //     //   })
  //     }
  //     if(path === '/login'){
  //      next(false)
  //     }
  //     //登录成功之后，后端会返回一个成功的验证信息给前端

  //     next(true)
  //   },

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
  created() {
    bus.$on('collapse-content', (msg) => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    // bus.$on('tags', (msg) => {
    //   let arr = []
    //   for (let i = 0, len = msg.length; i < len; i++) {
    //     msg[i].name && arr.push(msg[i].name)
    //   }
    //   this.tagsList = arr
    // })
  },
  mounted() {

  },
  mothods: {
 
  },
}
</script>
