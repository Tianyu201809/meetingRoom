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
        <div>{{userInfo.userName}}</div>
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
        <i class="el-icon-upload editInfo-label blue mr-right15"
           @click="editMode = !editMode">保存</i>
        <i class="el-icon-refresh-left editInfo-label green"
           @click="editMode = !editMode">返回</i>
      </div>
      <el-divider></el-divider>
      <!-- 基本信息 -->
      <div class="baseInfo">
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-message"></i> -->
            <label for=""
                   class="el-icon-user-solid"></label>
            #ID Number
          </div>
          <div class="info-propotype-value">
            {{userInfo._id ? userInfo._id:'null'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-message"></i> -->
            <label for="">📧 #Email Address:</label>
          </div>
          <div class="info-propotype-value email-text">
            {{userInfo.email ? userInfo.email:'tianyu.zhang@163.com'}}
            <span class="el-icon-edit email-val blue"
                  id="email-icon"
                  @click="updateUserEmail"
                  title="点击修改邮箱地址"></span>
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name phone-number-text">
            <!-- <i class="el-icon-phone-outline"></i> -->
            <label for="">📱</label>
            #Phone Number:
          </div>
          <div class="info-propotype-value phone-number-value">
            {{userInfo.phone ? userInfo.phone:'123456789'}}
            <span class="el-icon-edit email-val blue"
                  @click="updateUserPhone"
                  id="phone-number-icon"
                  title="点击修改电话"></span>
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
            <span id="userBirthdayValue">
              {{userInfo.birthday ? userInfo.birthday:'2003-12-23'}}
            </span>
            <span class="el-icon-edit email-val blue"
                  @click="updateUserBirthday"
                  id="userBirthdayIcon"
                  title="点击修改生日日期"></span>
            <span>

              <input type="text"
                     v-model="userInfo.birthday"
                     style="display:none;"
                     @change="checkUserBirthday()"
                     placeholder="birthday"
                     id="userBirthdayInput">

            </span>

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
            {{userInfo.createdDate ? dateFormat(userInfo.createdDate):'2020-08-15'}}
          </div>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script >
import { getUserInfo } from '@/api/user'
import { getLocalProp, dateformatTransform } from '@/api/localMethods'
export default {
  name: 'myInformation',
  data() {
    return {
      rate: 3.5,
      userInfo: {},
      editMode: false,
    }
  },
  computed: {
    dateFormat(value) {
      return function (value) {
        return dateformatTransform(value, 'YYYY-MM-DD')
      }
    },
  },
  created() {
    debugger
    const userName = getLocalProp('userName')
    const email = getLocalProp('email')

    getUserInfo({ userName, email })
      .then((d) => {
        this.userInfo = d.data.user
      })
      .catch((e) => {
        this.$message.error(e)
      })
  },
  mounted() {},
  methods: {
    errorHandler() {},
    updateUserEmail() {},
    updateUserBirthday($event) {
      document.getElementById('userBirthdayInput').style.display = 'block'
      document.getElementById('userBirthdayValue').style.display = 'none'
    },
    checkUserBirthday() {
      console.log(1)
      document.getElementById('userBirthdayValue').style.display = 'inline'
      document.getElementById('userBirthdayInput').style.display = 'none'
      this.$confirm('是否修改生日日期?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
    },
  },
}
</script>
<style scoped>
/* .wapper{
    text-align: left;
} */
.email-val {
  display: none;
}

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
.blue {
  color: #409eff;
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

.info-propotype-value:hover span#userBirthdayIcon {
  display: inline;
}
/* 修改邮箱部分css */
.phone-number-value:hover span#phone-number-icon {
  display: inline;
}

/* 修改 */
.email-text:hover span#email-icon {
  display: inline;
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