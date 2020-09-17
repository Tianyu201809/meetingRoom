<template>
  <div class="wapper">
    <el-card shadow="hover"
             class="mgb20"
             style="height:100%; width:100%">
      <div class="user-info">
        <!-- 头像 -->
        <el-avatar @error="errorHandler"
                   :size="120">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
               class="user-avator-index"
               alt
               ref="avatar" />
        </el-avatar>

      </div>
      <div class="user-name">
        <div>{{userInfo.userName}}Tianyu Zhang</div>
      </div>
      <!-- <div class="modify-avator-btn">
        <el-button type="warning"
                   icon="el-icon-edit"
                   size="small">修改头像</el-button>
      </div> -->
      <!-- 职位等级 -->
      <div class="user-level">
        <span>职 级:</span>
        <el-rate v-model="rate"
                 disabled
                 show-score
                 text-color="#ff9900"></el-rate>
      </div>
      <div v-if="!editMode">
        <i class="el-icon-edit editInfo-label"
           @click="editMode = !editMode">编辑个人信息</i>
      </div>
      <div v-else>
        <i class="el-icon-upload editInfo-label red mr-right15" @click="editMode = !editMode">保存</i>
        <i class="el-icon-refresh-left editInfo-label green" @click="editMode = !editMode">返回</i>
      </div>
      <el-divider></el-divider>
      <!-- 基本信息 -->
      <div class="baseInfo">
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-message"></i> -->
            <label for="">📧</label>
            #Email Address:
          </div>
          <div class="info-propotype-value">
            {{userInfo.email ? userInfo.email:'tianyu.zhang@163.com'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-phone-outline"></i> -->
            <label for="">📱</label>
            #Phone Number:
          </div>
          <div class="info-propotype-value">
            {{userInfo.phone ? userInfo.phone:'123456789'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <i class="el-icon-user"></i>
            #Position
          </div>
          <div class="info-propotype-value">
            {{userInfo.Position ? userInfo.Position:'3.5'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <label>🎂</label>
            #Birthday
          </div>
          <div class="info-propotype-value">
            {{userInfo.role ? userInfo.role:'1993-12-23'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">#Role</div>
          <div class="info-propotype-value">
            {{userInfo.role ? userInfo.role:'普通用户'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-watch"></i> -->
            <label for="">⌚</label>
            #Created Date
          </div>
          <div class="info-propotype-value">
            {{userInfo.role ? userInfo.role:'2020-08-15'}}
          </div>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script >
export default {
  name: 'myInformation',
  data() {
    return {
      rate: 3.5,
      userInfo: {},
      editMode: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    errorHandler() {},
  },
}
</script>
<style scoped>
/* .wapper{
    text-align: left;
} */
.mr-right15 {
  margin-right: 15px;
}

.editInfo-label {
  font-size: 13px;
  color: #9c9c9c;
  cursor: pointer;
}
.red {
  color: #f56c6c;
}
.green {
  color: #67c23a;
}
.baseInfo-item {
  margin-bottom: 16px;
}
.info-propotype-name {
  color: #9c9c9c;
  font-size: 0.85rem;
}
.info-propotype-value {
  font-size: 0.85rem;
  color: black;
}
.user-level {
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.user-level span {
  font-size: 14px;
  margin-right: 0px;
  margin-top: -3px;
}
.user-name {
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.modify-avator-btn {
  display: flex;
  justify-content: center;
  width: auto;
  font-size: 10px;
  margin-top: 20px;
}
.user-info {
  display: flex;
  justify-content: center;
}
</style>