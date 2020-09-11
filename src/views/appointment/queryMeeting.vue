<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-search"
             style="margin-right:10px"></i>
          <strong>会议预约查询</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>
    <div style="margin-left:17px">
      <my-search @filterCondition='getFilter'
                 :current-page.sync="currentPage"></my-search>
      <meeting-room-table :tableData="tableData"
                          @itemTotal="getTotalItem"
                          :filter="filter"
                          :loading.sync="loading"
                          :current-page.sync="currentPage"
                          :totalPage.sync="totalPage"></meeting-room-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-sizes="pageSizeArray"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total.sync="total"
                     :filter="filter">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import mySearch from './children/mySearch.vue'
import meetingRoomTable from './children/meetingRoomTable'
// import paging from '@/components/common/Paging'

//获取会议查询页面的全部数据的数量
import { getQueryAppointCount, queryAppointment } from '@/api/appointment'
export default {
  name: 'queryMeeting',
  components: {
    mySearch,
    meetingRoomTable,
    // paging,
  },
  data() {
    return {
      loading: true,
      total: 0,
      limit: 10,
      skip: 0,
      tableData: [],
      filter: {},
      currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      pageSizeArray: [10],
      currentPage: 1,
    }
  },
  methods: {
    getLoading(loading) {
      this.loading = loading
    },
    getTotalItem(count) {
      this.total = count
    },
    /**
     * filter部分重置页码数
     *
     */
    resetPages(filter) {
      //首先获取数量
      let that = this
      getQueryAppointCount(filter).then((count) => {
        that.total = count.data.count || 0
      })
    },
    handleSizeChange() {},
    /**
     * 计算总页数
     */

    // calculateTotal() {
    //   return (this.totalPage = Math.ceil(this.total / this.pageSize))
    // },

    //会议室分页
    handleCurrentChange(currentPage) {
      this.loading = true
      this.currentPage = currentPage
      const limit = 10
      const skip = parseInt((currentPage - 1) * limit)
      this.queryMeetingRoomByFilter(this.filter, limit, skip)
    },

    //获取过滤条件
    getFilter(filter) {
      console.log(filter)
      this.filter = filter
    },
    queryMeetingRoomByFilter(filter, limit = 10, skip = 0) {
      //1.首先根据过滤条件，查询数据总数
      // title, date, meetingRoomNumber
      this.loading = true
      let that = this
      //查询条目总数
      queryAppointment(filter, limit, skip)
        .then((result) => {
          that.tableData = result.data
          that.loading = false
        })
        .catch((e) => {
          console.log(e)
          that.loading = false
        })
      //   getQueryAppointCount(filter).then((count) => {
      //     return new Promise((resolve, reject) => {
      //       //获取总数
      //       that.total = count.data.count
      //       resolve(true)
      //     }).then(() => {
      //       //查询数据

      //     })
      //   })
    },
    // queryMeetingRoomCount() {},
    getQueryAppointCount(obj) {
      getQueryAppointCount(obj).then((count) => {
        this.total = count.data.count
        this.totalPage = Math.ceil(count / 10)
      })
    },
  },
  mounted() {},
  created() {
    //初始加载动画
    this.loading = true
    this.getQueryAppointCount({})
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