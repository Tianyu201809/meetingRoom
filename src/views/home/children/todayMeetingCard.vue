<template>
  <div>
    <meeting-detail-dialog ref="dialog"
                           :selectedItem="currentItem"></meeting-detail-dialog>
    <el-card shadow="hover"
             style="height:267px;"
             ref="todayMeetingCard">
      <div slot="header"
           class="clearfix">
        <span>今日相关会议</span>
      </div>
      <transition name="fade">
        <el-table :show-header="false"
                  :data="meetingList"
                  v-loading="loading"
                  style="width:100%;">
          <el-table-column>
            <template slot-scope="scope">
              <a href="javascript:void(0)"
                 class="list-item"
                 @click="showDetail(scope.$index)">
                {{scope.row.title}}
              </a>
            </template>
          </el-table-column>
        </el-table>
      </transition>
      <div class="block">
        <div class="pagingItem">
          <el-pagination small
                         layout="prev, pager, next"
                         :page-size="3"
                         :current-page="currentPage"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import meetingDetailDialog from './meetingDetailDialog'
import store from '../../../store'
import { getUserJoinedMeetingCount, userJoinedMeeting } from '@/api/appointment'

export default {
  name: 'todayMeetingCard',
  components: {
    meetingDetailDialog,
  },
  props: {
    meetingDate: String,
  },
  props: {
    meetingList: {
      type: Array,
      default: function () {
        return []
      },
    },
    loading: {
      type: Boolean
    },
    appointDate: {
      type: String,
    },
    userInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
    total: {
      type: Number,
      default: function () {
        return 0
      },
    },
    // currentItem: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   },
    // },
  },
  data() {
    return {
      currentItem: {},
      currentPage: 1,
      pageSize: 3,
      //loading: true,
    }
  },
  mounted() {},
  methods: {
    showDetail(i) {
      debugger
      this.currentItem = this.meetingList[i]
      this.$refs.dialog.openDialog()
    },

    //当变更当前页的时候
    handleCurrentChange(page) {
      this.loading = true
      const limit = this.limit || 3
      const skip = (page - 1) * limit
      const userName = this.userInfo.userName
      const meetingDate = this.appointDate
      const filterObj = {
        limit,
        skip,
        userName,
        meetingDate,
      }
      userJoinedMeeting(filterObj).then((res) => {
        this.$emit('paingUserMeetingItems', res.data.data)
        this.loading = false
      })
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
  cursor: pointer;
}
.list-item:hover {
  color: rgb(0, 70, 128);
  text-decoration: underline !important;
}
</style>