<template>
  <div class="wapper"
       v-cloak>
    <modify-info-dialog ref="infoDialog"
                        :modified-prop="modifiedProp"
                        @change-value="getModifiedValue"
                        :prop-title="propTitle"></modify-info-dialog>
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
            <label class="el-icon-user-solid">#ID Number</label>
          </div>
          <div class="info-propotype-value">
            {{userInfo._id ? userInfo._id:'*****-*****-*****'}}
          </div>
        </div>
        <div class="baseInfo-item">
          <div class="info-propotype-name">
            <!-- <i class="el-icon-message"></i> -->
            <label for="">📧 #Email Address:</label>
          </div>
          <div class="info-propotype-value email-text">
            {{userInfo.email ? userInfo.email:'tianyu.zhang@163.com'}}
            <span class="el-icon-edit hidden-element blue"
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
            <span class="el-icon-edit hidden-element blue"
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
            <label>🎂#Birthday</label>
          </div>
          <div class="info-propotype-value">
            <span id="userBirthdayValue">
              {{userInfo.birthday ? dateFormat(userInfo.birthday):'2020-9-18'}}
            </span>
            <span class="el-icon-edit hidden-element blue"
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
            <label for="">⌚#Created Date</label>
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
import modifyInfoDialog from './modifyInfoDialog'
import { getUserInfo } from '@/api/user'
import {
  getLocalProp,
  dateformatTransform,
  setLocalProp,
} from '@/api/localMethods'

export default {
  name: 'myInformation',
  components: {
    modifyInfoDialog,
  },
  data() {
    return {
      rate: 3.5,
      userInfo: {
        birthday: '',
      },
      editMode: false,
      modifiedProp: '', //传给dialog子组件的属性
      propTitle: '', //传给dialog子组件的属性
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
    updateUserEmail() {
      const PROP = 'email'
      const TITLE = '电子邮箱'
      this.changeUserInfo(PROP, TITLE)
    },

    updateUserPhone() {
      const PROP = 'phone'
      const TITLE = '手机号'
      this.changeUserInfo(PROP, TITLE)
    },
    updateUserBirthday() {
      const PROP = 'birthday'
      const TITLE = '生日'
      this.changeUserInfo(PROP, TITLE)
    },
    //获取从dialog中修改的birthday
    getModifiedValue(obj) {
      //父组件做出响应
      for (const key in obj) {
        this.userInfo[key] = obj[key]
      }
    },

    // 传递属性名和属性值给dialog子组件
    changeUserInfo(prop, title) {
      this.modifiedProp = prop
      this.propTitle = title
      //调用子组件方法
      this.$refs.infoDialog.openDialog()
    },
  },
}
</script>
<style scoped>
/* .wapper{
    text-align: left;
} */
[v-cloak] {
  display: none;
}
.hidden-element {
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