<template>
  <div>
    <!-- header部分  -->
    <!-- <el-page-header @back="goBack"
                    class="detail-header">
      <template slot="content">
        会议室信息修改
      </template>
    </el-page-header> -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>修改会议室信息</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:100%; margin:0 auto" />
      <br>
    </div>

    <el-form label-position="right"
             label-width="180px"
             style="margin-top:4px"
             ref="modifyMeetingRoom"
             :rules="rules"
             :model="mrForm">
      <el-form-item label="会议室编号:"
                    prop="meetingRoomNumber">
        <el-input v-model="mrForm.meetingRoomNumber"
                  style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="会议室名称"
                    prop="meetingRoomName">
        <el-input v-model="mrForm.meetingRoomName"
                  style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="会议室状态:"
                    prop="">
        <!-- <el-select v-model="mrForm.meetingRoomStatus">
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
      <el-form-item label="会议室容量:"
                    prop="meetingRoomSize">
        <el-select v-model="mrForm.meetingRoomSize"
                   placeholder="请选择">
          <el-option v-for="item in meetingRoomSize"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有多媒体设备:"
                    prop="hasMedia">
        <el-select v-model="mrForm.hasMedia">
          <el-option :value="true"
                     label="有"></el-option>
          <el-option :value="false"
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
                 @click="updateItem()">保存</el-button>
      <el-button type="danger"
                 @click="cancel()">取消</el-button>
    </div>
  </div>
</template>
<script>
import {
  queryMeetingRoomDetail,
  updateMeetingRoomDetail,
} from '@/api/meetingRoom'
export default {
  name: 'meetingRoomDetail',
  methods: {
    goBack() {
      this.$router.replace('/maintainMeetingRoom')
    },
    cancel() {
      this.$router.replace('/maintainMeetingRoom')
    },
    updateItem() {
      this.$refs.modifyMeetingRoom
        .validate((valid) => {
          if (valid) {
            this.$confirm('此操作将修改当前会议室信息, 是否继续?', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning',
            })
              .then(() => {
                const id = this.$route.params.id
                const obj = this.mrForm
                updateMeetingRoomDetail(id, obj)
                  .then((data) => {
                    console.log(data)
                    this.$message({
                      type: 'success',
                      message: '信息修改成功',
                    })
                    this.$router.push('/maintainMeetingRoom')
                  })
                  .catch((e) => {
                    console.log(e)
                    this.$message({
                      type: 'error',
                      message: '信息修改失败，请检查当前数据是否存在',
                    })
                  })
              })
              .catch(() => {})
          } else {
          }
        })
        .catch(() => {
          return false
        })
    },
  },
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
          value: '1',
          label: '可用',
        },
        {
          value: '0',
          label: '不可用',
        },
      ],
      mrForm: {},
      rules: {
        meetingRoomName: [
          { required: true, message: '请输入会议室名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
        meetingRoomNumber: [
          { required: true, message: '请输入会议室编号', trigger: 'blur' },
          {
            min: 4,
            max: 20,
            message: '长度在 4 到 20 个字符',
            trigger: 'blur',
          },
        ],
        meetingRoomStatus: [
          {
            required: true,
            message: '不能为空值',
            trigger: ['blur', 'change'],
          },
        ],
        hasMedia: [
          {
            required: true,
            message: '不能为空值',
            trigger: ['blur', 'change'],
          },
        ],
        meetingRoomSize: [
          {
            required: true,
            message: '不能为空值',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  created() {
    debugger
    const id = this.$route.params.id
    queryMeetingRoomDetail(id)
      .then((result) => {
        console.log(result)
        this.mrForm = result.data.data
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>
<style scoped>
.detail-header {
  margin-top: 5px;
}
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