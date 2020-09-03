<template>
  <div class="dialog">
    <el-dialog :visible.sync="dialogFormVisible"
               width="30%"
               lock-scroll>
      <!--会议详情展示  -->
      <div slot="title">
        会议详情
        <el-divider></el-divider>
      </div>
      <div class="dialog-container">
        <el-form label-width="120px"
                 style=""
                 :label-position="labelPosition">
          <el-form-item label="会议主题:"
                        class="form-item">
            {{selectedItem.title}}
          </el-form-item>
          <el-form-item label="会议日期:"
                        class="form-item">
            {{formatDate()}}
          </el-form-item>
          <el-form-item label="会议开始时间:"
                        class="form-item">
            <div class="startTime"> {{formatStartTime()}}</div>

          </el-form-item>
          <el-form-item label="会议结束时间:"
                        class="form-item">
            <div class="endTime">{{formatEndTime()}}</div>
          </el-form-item>
          <el-form-item label="参会人员:"
                        class="form-item">
            <span v-for="(item, index) in selectedItem.members"
                  :key="index"
                  style="display:inline">
              {{item.trim()}},
            </span>
          </el-form-item>
          <el-form-item label="会议室:"
                        class="form-item">
            {{selectedItem.meetingRoomNumber}}
          </el-form-item>
          <!-- <el-form-item label="当前状态:"
                        class="form-item">
            <span>{{selectedItem.status}}</span>
          </el-form-item> -->
          <el-form-item label="会议概述:"
                        class="form-item">
            <span>{{selectedItem.description}}</span>
          </el-form-item>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: 'left',
      dialogFormVisible: false,
      formLabelWidth: 180,
    }
  },
  computed: {
    //格式化时间
    // formatStartTime: function () {
    //   return this.dayjs(this.selectedItem.startTime).format('HH:MM:SS')
    // },
    // formatEndTime: function () {
    //   return this.dayjs(this.selectedItem.endTime).format('HH:MM:SS')
    // },
    // //格式化日期
    // formatDate: function () {
    //   return this.dayjs(this.selectedItem.appointDate).format('YYYY-MM-DD')
    // },
  },
  props: {
    selectedItem: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  computed: {},
  methods: {
    formatStartTime: function () {
      return this.dayjs(this.selectedItem.startTime).format('HH:mm:ss')
    },
    formatEndTime: function () {
      return this.dayjs(this.selectedItem.endTime).format('HH:mm:ss')
    },
    //格式化日期
    formatDate: function () {
      return this.dayjs(this.selectedItem.appointDate).format('YYYY-MM-DD')
    },
    openDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
  },
}
</script>
<style scoped>
.dialog-container {
  margin-top: -50px;
}
.form-item {
  height: 20px;
}

.startTime {
  color: green;
}
.endTime {
  color: brown;
}
</style>