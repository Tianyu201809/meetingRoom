<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>通知查询</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:100%; margin:0 auto" />
      <br>
    </div>

    <notices-table :tableData="tableData"></notices-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   style="margin-left:31px;margin-top:17px">
    </el-pagination>
  </div>
</template>

<script>
import { queryNotification } from '@/api/notification'
import noticesTable from './children/noticesTable'
export default {
  components: {
    noticesTable,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
    }
  },
  created() {
    const obj = {
      department: null,
      limit: 10,
      skip: 0,
    }
    this.queryNotification(obj).then((data) => {
        debugger
      this.tableData = data.data.data
      console.log(data)
    })
  },
  methods: {
    //{ department, limit, skip }
    queryNotification(obj) {
      return new Promise((resolve, reject) => {
        if (!obj) {
          obj = {
            department: null,
            limit: 10,
            skip: 0,
          }
        }
        queryNotification(obj).then((d) => {
          resolve(d)
        })
      })
    },
    handleSizeChange() {},
    handleCurrentChange(page) {
      console.log(page)
    },
  },
}
</script>
<style>
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>