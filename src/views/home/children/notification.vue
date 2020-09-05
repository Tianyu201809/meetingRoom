<template>
  <div>
    <el-card shadow="hover"
             style="height:372px; overflow:auto">
      <div slot="header"
           class="clearfix">
        <span>最近通知</span>
      </div>
      <el-table :show-header="false"
                :data="notification"
                style="width:100%; height:230px">
        <el-table-column>
          <template slot-scope="scope">
            <div class="item-msg">{{scope.row.title}}</div>
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
import { queryNotification, queryNotificationCount } from '@/api/notification'
export default {
  name: 'notification',
  data() {
    return {
      notification: [],
      total: 0,
      currentPage: 1,
      department: null,
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
      const f1 = {
        department: this.department,
        limit: parseInt(limit),
        skip: parseInt((page - 1) * limit),
      }
      this.queryNotification(f1).then((d) => {
        this.notification = d.data.data
      })
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
    Promise.all([
      this.queryNotification(f1),
      this.queryNotificationCount(f2),
    ]).then(
      function (result) {
        debugger
        this.total = result[1].data.data
        this.notification = result[0].data.data
        console.log(result)
      }.bind(this)
    )
  },
}
</script>
<style scoped>
.item-msg {
  font-size: 14px;
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