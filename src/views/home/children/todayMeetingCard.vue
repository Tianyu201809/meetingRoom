<template>
  <div>
    <meeting-detail-dialog ref="dialog" :selectedItem="currentItem"></meeting-detail-dialog>
    <el-card shadow="hover"
             style="height:267px;">
      <div slot="header"
           class="clearfix">
        <span>当日会议</span>
      </div>
      <el-table :show-header="false"
                :data="meetingList"
                style="width:100%;">
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.status"></el-checkbox>
          </template>
        </el-table-column> -->
        <el-table-column>
          <!-- <template slot-scope="scope">
            <div class="today-meeting-item"
                 :class="{'today-todo-item-del': scope.row.status}">{{scope.row.title}}</div>
          </template> -->
          <template slot-scope="scope">
            <a href="#"
               class="list-item"
               @click="showDetail(scope.$index)">{{scope.row.title}}</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <div class="pagingItem">
          <el-pagination small
                         layout="prev, pager, next"
                         :page-size="3"
                         :total="50">
          </el-pagination>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import meetingDetailDialog from './meetingDetailDialog'
export default {
  name: 'todayMeetingCard',
  components: {
    meetingDetailDialog,
  },
  data() {
    return {
    
    }
  },
  props: {
    meetingList: {
      type: Array,
      default: function () {
        return []
      },
    },
    currentItem:{
        type:Object,
        default:function(){
            return {}
        }
    }
  },
  methods: {
    showDetail(i) {
        debugger;
      this.currentItem = this.meetingList[i];
      this.$refs.dialog.openDialog()
    },
  },
}
</script>
<style scoped>
.today-meeting-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: red;
}
.block {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
.list-item {
  color: #606266;
}
.list-item:hover {
  color: green;
  text-decoration: underline !important;
  cursor: pointer !important;
}
</style>