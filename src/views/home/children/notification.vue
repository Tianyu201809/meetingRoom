<template>
  <div>
    <notices-dialog :noticesItem="noticesItem"
                    ref="noticesDialog"
                    :noticesDialogFlag.sync="noticesDialogFlag"></notices-dialog>
    <el-card shadow="hover"
             style="height:372px; overflow:auto">
      <div slot="header"
           class="clearfix">
        <span>最近通知</span>
      </div>
      <el-table :show-header="false"
                :data="notification"
                v-loading="loading"
                style="width:100%; height:230px">
        <el-table-column>
          <template slot-scope="scope">
            <a class="item-msg"
               href="javascript:void(0)"
               @click="showNoticesDetail(scope.row._id)">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="item-date">{{dateFormat(scope.row.startDate)}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div class="pagingItem">
          <el-pagination small
                         layout="prev, pager, next"
                         :page-size="5"
                         :total="total"
                         :current-page="currentPage"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>

      </div>

    </el-card>

  </div>
</template>
<script>
import {
  queryNotification,
  queryNotificationCount,
  queryNoticesDetail,
} from '@/api/notification'
import noticesDialog from './noticesDialog'
export default {
  name: 'notification',
  components: {
    noticesDialog,
  },
  data() {
    return {
      notification: [],
      total: 0,
      currentPage: 1,
      department: null,
      loading: true,
      noticesItem: {},
      noticesDialogFlag: false,
    }
  },
  props: {
    // notification: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   },
    // },
    // department: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   },
    // },
  },
  computed: {
    dateFormat(date) {
      return function (date) {
        return this.dayjs(date).format('YYYY-MM-DD')
      }
    },
  },
  methods: {
    queryNotification(f1) {
      return new Promise((resolve, reject) => {
        queryNotification(f1)
          .then((d) => {
            resolve(d)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    queryNotificationCount(f2) {
      return new Promise((resolve, reject) => {
        queryNotificationCount(f2)
          .then((d) => {
            resolve(d)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    handleCurrentChange(page) {
      const limit = 5
      this.loading = true
      const f1 = {
        department: this.department,
        limit: parseInt(limit),
        skip: parseInt((page - 1) * limit),
      }
      this.queryNotification(f1)
        .then((d) => {
          this.notification = d.data.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    showNoticesDetail(id) {
      this.noticesDialogFlag = true
      queryNoticesDetail(id)
        .then((result) => {
          this.noticesItem = result.data.data[0]
          this.$refs.noticesDialog.showDialog()
        })
        .catch((e) => {
          this.noticesItem = e.data
        })

      console.log(id)
    },
  },
  created() {
    const f1 = {
      department: this.department,
      limit: 5,
      skip: 0,
    }
    const f2 = {
      department: this.department,
    }
    this.loading = true
    Promise.all([
      this.queryNotification(f1),
      this.queryNotificationCount(f2),
    ]).then(
      function (result) {
        this.total = result[1].data.data
        this.notification = result[0].data.data
        console.log(result)
        this.loading = false
      }.bind(this)
    )
  },
}
</script>
<style scoped>
.item-msg {
  font-size: 14px;
  color: #606266;
}
.item-date {
  float: right;
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.block {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
</style>