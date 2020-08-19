<template>
  <div>
    <el-card shadow="hover"
             class="mgb20"
             style="height:252px;">
      <div class="user-info">
        <keep-alive>
          <el-avatar  @error="errorHandler"
                     :size="120">
            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 class="user-avator-index"
                 alt 
                 ref="avatar"/>
          </el-avatar>
        </keep-alive>

        <div class="user-info-cont">
          <div class="user-info-name">{{user.name}}</div>
          <div>{{user.role}}</div>
        </div>
      </div>
      <div class="user-info-list">
        上次登录日期：
        <span>2020-08-17</span>
      </div>
      <div class="user-info-list">
        上次登录时间：
        <span>09:00</span>
      </div>
    </el-card>
  </div>
</template>
<script>
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
  methods: {
    errorHandler() {
        debugger;
        this.refs.avatar.src = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
      return true
    },
  },
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
</style>