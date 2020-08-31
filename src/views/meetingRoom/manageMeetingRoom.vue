<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>创建会议室信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>
    <el-form label-position="right"
             label-width="180px"
             style="margin-top:4px"
             :model="mrForm">
      <el-form-item label="会议室编号:">
        <el-input v-model="mrForm.meetingRoomNumber"
                  style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="会议室名称">
        <el-input v-model="mrForm.meetingRoomName"
                  style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="会议室状态:">
        <!-- <el-select v-model="meetingRoomStatus">
          <el-option value="1">可用</el-option>
          <el-option value="0">不可用</el-option>
        </el-select> -->

        <el-select v-model="mrForm.meetingRoomStatus"
                   placeholder="请选择">
          <el-option v-for="item in status"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="会议室容量:">
        <el-select v-model="mrForm.meetingRoomSize"
                   placeholder="请选择">
          <el-option v-for="item in meetingRoomSize"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有多媒体设备:">
        <el-select v-model="mrForm.hasMedia">
          <el-option :value="1"
                     label="有"></el-option>
          <el-option :value="0"
                     label="没有"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注说明：">
        <!-- <el-select v-model="mrForm.description">
          <el-option :value="1"
                     label="有"></el-option>
          <el-option :value="0"
                     label="没有"></el-option>
        </el-select> -->
        <el-input type="textarea"
                  :rows="10"
                  style="width:90%"
                  placeholder="请输入内容"
                  v-model="mrForm.description">
        </el-input>
      </el-form-item>

    </el-form>
    <div class="center">
      <el-button type="primary"
                 @click="createMeetingRoom()">创建会议室</el-button>
      <el-button type="danger"
                 @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getLocalProp } from '@/api/localMethods'
import { createMeetingRoom } from '@/api/meetingRoom'
export default {
  name: 'manageMeetingRoom',
  data() {
    return {
      meetingRoomSize: [
        {
          value: 4,
          label: '4人',
        },
        {
          value: 6,
          label: '6人',
        },
        {
          value: 8,
          label: '8人',
        },
        {
          value: 10,
          label: '10人',
        },
        {
          value: 12,
          label: '12人',
        },
        {
          value: 99,
          label: '12人以上',
        },
      ],
      status: [
        {
          value: 1,
          label: '可用',
        },
        {
          value: 0,
          label: '不可用',
        },
      ],
      mrForm: {
        meetingRoomNumber: '',
        meetingRoomName: '',
        meetingRoomStatus: '',
        meetingRoomSize: '',
        hasMedia: '',
        created: '',
        createdBy: {
          userName: getLocalProp('userName'),
          emial: getLocalProp('email'),
        },
        lastModify: '',
        lastModifyBy: '',
        description: '',
      },
    }
  },
  methods: {
    createMeetingRoom() {
      createMeetingRoom(this.mrForm)
        .then((result) => {
          console.log(result)
          this.$message({
            message: '新的会议室数据创建成功',
            type: 'success',
          })
          //创建成功之后，跳转到会议室信息查询页面
          //this.$router.replace();
        })
        .catch((e) => {
          console.log(e)
          this.$message.error('创建会议室数据失败')
        })
    },
    cancel() {},
  },
  mounted() {},
}
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>