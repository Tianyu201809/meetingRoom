<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
           class="clearfix">
        <span>我的待办</span>
      </div>
      <el-table :show-header="false"
                :data="todoList"
                style="width:100%; height:236px">
        <el-table-column>
          <template slot-scope="scope">
            <div class="to-do-item">{{scope.row.msg}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div class="pagingItem">
          <el-pagination small
                         layout="prev, pager, next"
                         :page-size="5"
                         :total="todoNum">
          </el-pagination>
        </div>

      </div>

    </el-card>
  </div>
</template>
<script>
export default {
  name: 'todoList',
  data() {
    return {}
  },
  props: {
    todoList: {
      type: Array,
      default: function () {
        return []
      },
    },
    todoNum:{
        type:Number,
        default:function(){
            return 10
        }
    }
  },
  methods: {},
  mounted() {},
}
</script>
<style scoped>
.todo-item {
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