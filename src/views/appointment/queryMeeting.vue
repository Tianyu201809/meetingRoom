<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>会议查询</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:97%; margin:0 auto" />
      <br>

    </div>
    <div style="margin-left:17px">
<my-search></my-search>
    <meeting-room-table :tableData="tableData"></meeting-room-table>
    <paging></paging>
    </div>
    
  </div>
</template>
<script>
import mySearch from './children/mySearch.vue'
import meetingRoomTable from './children/meetingRoomTable'
import paging from '@/components/common/Paging'
export default {
  name: 'queryMeeting',
  components: {
    mySearch,
    meetingRoomTable,
    paging,
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
}
</script>
<style scoped>
.pageTitle {
  margin:20px 0 20px 20px;
  font-family:Arial, Helvetica, sans-serif;
  font-size:18px;
}
</style>