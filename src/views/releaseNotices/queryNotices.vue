<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="pageTitle">
          <i class="el-icon-search"
             style="margin-right:10px"></i>
          <strong>通知查询</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:100%; margin:0 auto" />
      <br>
    </div>

    <notices-table :tableData="tableData"
                   :totalPage.sync="totalPage"
                   :currentPage.sync="currentPage"
                   :total.sync="total"
                   :loading.sync="loading"
                   @totalItemsNum="getTotalCount"></notices-table>
    <keep-alive>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-sizes="[10]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     style="margin-left:31px;margin-top:17px">
      </el-pagination>
    </keep-alive>

  </div>
</template>

<script>
import { queryNotification, queryNotificationCount } from '@/api/notification'
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
      totalPage: 1,
      loading: true,
    }
  },
  created() {
    this.initialPage()
  },
  methods: {
    //获取删除之后的总数量
    getTotalCount(count) {
      this.total = count
    },

    //{ department, limit, skip }
    initialPage() {
      const obj1 = {
        department: this.department || null,
        limit: 10,
        skip: 0,
      }
      const obj2 = {
        department: this.department || null,
      }

      Promise.all([
        this.queryNotification(obj1),
        this.queryNotificationCount(obj2),
      ])
        .then((result) => {
          const noticesList = result[0].data.data //显示数据
          const count = result[1].data.data //总数量
          this.tableData = noticesList
          this.total = count
          this.currentPage = 1
          this.loading = false
        })
        .catch((e) => {
          this.loading = false
        })
    },
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
    queryNotificationCount(obj) {
      return new Promise((resolve, reject) => {
        if (!obj) {
          obj = {
            department: null,
          }
        }
        queryNotificationCount(obj).then((d) => {
          resolve(d)
        })
      })
    },
    handleCurrentChange(page) {
      console.log(page)
      const obj = {}
      obj['department'] = null
      obj['limit'] = 10
      obj['skip'] = (page - 1) * obj['limit']
      this.loading = true
      this.queryNotification(obj)
        .then((result) => {
          this.tableData = result.data.data
          this.loading = false
        })
        .catch((e) => {
          this.loading = false
        })
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