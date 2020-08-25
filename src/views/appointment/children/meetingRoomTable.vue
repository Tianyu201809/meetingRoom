<template>
  <el-table :data="tableData"
            v-loading="loading"
            stripe
            height="400px"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
            class="mt-table">
    <el-table-column prop="title"
                     label="会议主题"
                     width="180">

      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="meeting-room-number"
                     label="会议室"
                     width="180">
      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.meetingRoomNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='meeting-date'
                     label="会议日期"
                     width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 5px">{{ scope.row.modifyDate }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='meetingArea'
                     label="会议时段"
                     width="180">
    </el-table-column>
    <el-table-column prop='appointmentPerson'
                     label="预约人"
                     width="180">
      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.subscriber }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='currentStatus'
                     label="当前状态"
                     width="100">
      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='department'
                     label="部门"
                     width="100">
    </el-table-column>
    <el-table-column prop='createdDate'
                     label="预约创建日期"
                     width="180">
      <template slot-scope="scope">
        <span style="margin-left: 5px">{{ scope.row.createdDate }}</span>
      </template>
    </el-table-column>

  </el-table>

</template>
<script>
export default {
  name: 'meetingRoomTable',
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
}
</script>
<style scoped>
.mt-table {
  margin-top: 20px;
  min-height: 70vh;
  max-height: 90vh;
  margin-bottom: 20px;
}
</style>