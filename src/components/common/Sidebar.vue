<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             :unique-opened="false"
             :collapse-transition="true"
             router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index"
                      :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs"
                          :index="subItem.index"
                          :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs"
                              :key="i"
                              :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                            :index="subItem.index"
                            :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index"
                        :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: '/index', //这里一定要注意加上 /
          title: '系统首页',
        },
        {
          icon: 'el-icon-chat-dot-round',
          index: '1',
          title: '通知管理',
          subs: [
            {
              index: '/queryNotices',
              title: '通知查询',
            },
            {
              index: '/releaseNotices',
              title: '发布通知',
            },
          ],
        },
        {
          icon: 'el-icon-time',
          index: '2',
          title: '会议预约',
          subs: [
            {
              index: '/queryMeeting',
              title: '会议预约查询',
            },
            {
              index: '/createAppointment',
              title: '创建预约',
            },
          ],
        },
        {
          icon: 'el-icon-s-management',
          index: '3',
          title: '会议室管理',
          subs: [
            {
              index: '/maintainMeetingRoom',
              title: '维护会议室信息',
            },
            {
              index: '/createMeetingRoom',
              title: '创建会议室',
            },
          ],
        },
        {
          icon: 'el-icon-user-solid',
          index: '/charts',
          title: '与我相关',
          subs: [
            {
              index: '/createAppoint',
              title: '我的预约',
            },
            {
              index: '/myMeeting',
              title: '我的参加的会议',
            },
            {
              index: '/myMessage',
              title: '我的基本信息',
            },
            {
              index: '/message',
              title: '收到的通知',
            },
          ],
        },
      ],
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/')
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', (msg) => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  },
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
