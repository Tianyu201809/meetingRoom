<template>
  <div>
    <el-card shadow="hover"
             style="max-height:650px">
      <div slot="header"
           class="clearfix">
        <span>最近通知</span>
      </div>
      <el-table :show-header="false"
                :data="notification"
                style="width:100%; max-height:540px">
        <el-table-column>
          <template slot-scope="scope">
            <div class="item-msg">{{scope.row.msg}}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="item-date">{{scope.row.date}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div class="pagingItem">
          <el-pagination small
                         layout="prev, pager, next"
                         :page-size="5"
                         :total="50">
          </el-pagination>
        </div>

      </div>

    </el-card>

  </div>
</template>
<script>
export default {
  name: 'notification',
  data() {
    return {}
  },
  props: {
    notification: {
      type: Array,
      default: function () {
        return []
      },
    },
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