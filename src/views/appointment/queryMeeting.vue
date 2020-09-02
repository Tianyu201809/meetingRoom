<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-search"
             style="margin-right:10px"></i>
          <strong>会议查询</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>

    </div>
    <div style="margin-left:17px">
      <my-search @filterCondition='getFilter'></my-search>
      <meeting-room-table :tableData="tableData"></meeting-room-table>
      <paging :total="total"
              :filter="filter"></paging>
    </div>

  </div>
</template>
<script>
import mySearch from './children/mySearch.vue'
import meetingRoomTable from './children/meetingRoomTable'
import paging from '@/components/common/Paging'

//获取会议查询页面的全部数据的数量
import { getQueryAppointCount, queryAppointment } from '@/api/appointment'
export default {
  name: 'queryMeeting',
  components: {
    mySearch,
    meetingRoomTable,
    paging,
  },
  data() {
    return {
      total: 0,
      limit: 10,
      skip: 0,
      tableData: [],
      filter: {},
    }
  },
  methods: {
    getFilter(filter) {
      console.log(filter)
      this.filter = filter
    },
    queryMeetingRoomByFilter(filter, limit = 10, skip = 0) {
      //1.首先根据过滤条件，查询数据总数
      // title, date, meetingRoomNumber
      let that = this
      //查询条目总数
      getQueryAppointCount(filter).then((count) => {
        return new Promise((resolve, reject) => {
          //获取总数
          that.total = count.data.count
          resolve(true)
        }).then(() => {
          //查询数据
          //   let limit = that.limit
          //   let skip = that.skip
          queryAppointment(filter, limit, skip).then((result) => {
            debugger
            that.tableData = result.data
          })
        })
      })
    },
    // queryMeetingRoomCount() {},
  },
  mounted() {},
  created() {
    this.queryMeetingRoomByFilter({})
  },
}
</script>
<style scoped>
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>