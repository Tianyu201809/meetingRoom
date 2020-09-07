<template>
  <el-table :data="tableData"
            v-loading="loading"
            stripe
            height="400px"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
            class="mt-table">
    <el-table-column prop="title"
                     label="会议主题"
                     width="180">

      <template slot-scope="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="meeting-room-number"
                     label="会议室编号"
                     width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.meetingRoomNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='meeting-date'
                     label="创建日期"
                     width="160">
      <template slot-scope="scope">
        <span>{{TransFormDateTime(scope.row.createdDate)}}</span>
      </template>
    </el-table-column>
    <el-table-column prop=''
                     label="会议时段"
                     width="170">
      <template slot-scope="scope">
        <span>{{TransFormDateTime(scope.row.startTime)}} ~ {{TransFormDateTime(scope.row.endTime)}}</span>
      </template>
    </el-table-column>

    <el-table-column prop='subscriber'
                     label="预约人"
                     width="100">
      <template slot-scope="scope">
        <span>
          <!-- <a :href="scope.row.subscriber ? 'mailto:' + scope.row.subscriber.email:null">{{ scope.row.subscriber ? scope.row.subscriber.userName : ''}}</a> -->
          {{scope.row.subscriber ? scope.row.subscriber.userName : ''}}
        </span>
      </template>
    </el-table-column>
    <!-- <el-table-column prop='currentStatus'
                     label="当前状态"
                     width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.status }}</span>
      </template>
    </el-table-column> -->
    <el-table-column prop='department'
                     label="所属部门"
                     width="100">
    </el-table-column>
    <el-table-column prop='createdDate'
                     label="最后修改日期"
                     width="180">
      <template slot-scope="scope">
        <span>{{ TransFormDateTime(scope.row.modifyDate) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop='description'
                     label="备注信息"
                     width="auto">
      <template slot-scope="scope">
        <span>{{ scope.row.description }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="operation"
                     label="操作"
                     width="120"
                     v-if="isAdmin">
      <template slot-scope="scope">
        <el-button size="mini"
                   type="warning"
                   @click.native.prevent="navToAppointDetail(scope.row._id)"
                   class="el-icon-edit"></el-button>
        <el-button size="mini"
                   type="danger"
                   @click.native.prevent="deleteAppointItem(scope.row._id)"
                   class="el-icon-delete"></el-button>
      </template>
    </el-table-column>

  </el-table>

</template>
<script>
import {
  deleteAppointmentItem,
  getQueryAppointCount,
  queryAppointment,
} from '@/api/appointment'
import { getUserRole } from '@/api/user' //用于以后的权限管理
import { getLocalProp } from '@/api/localMethods'
export default {
  name: 'meetingRoomTable',
  props: {
    loading: {
      type: Boolean,
    },
    tableData: {
      type: Array,
      default: function () {
        return []
      },
    },
    filter: {
      type: Object,
      default: function () {
        return {}
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isAdmin: true,
    }
  },
  computed: {
    //时间格式化
    TransFormDateTime(data) {
      return function (data) {
        return this.dayjs(data).format('YYYY-MM-DD HH:mm:ss') != 'Invalid Date'
          ? this.dayjs(data).format('YYYY-MM-DD HH:mm:ss')
          : ''
      }
    },

    //显示名称
    subscriberUserName(obj) {
      return function (obj) {
        debugger
        return obj.userName
      }
    },
  },
  methods: {
    navToAppointDetail(id) {
      this.$router.push({ name: 'editAppointment', params: { id: id } })
    },
    deleteAppointItem(id) {
      //根据id删除appointment
      let that = this
      this.$confirm('此操作将永久删除当前会议室信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          deleteAppointmentItem(id).then(() => {
            //重置数量和分页查询
            getQueryAppointCount().then((count) => {
              debugger
              //条目数
              let total = count.data.count
              that.$emit('itemTotal', total)
              let totalPage = Math.ceil(total / 10)
              //计算总页数
              const curPage =
                that.currentPage > totalPage ? totalPage : that.currentPage
              that.$parent.handleCurrentChange(curPage)
            })
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    emailToUser(e, email) {
      console.log(e)
      console.log(email)
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1400)
  },

  created() {
    //转移
    const userName = getLocalProp('userName')
    const that = this
    getUserRole(userName).then((role) => {
      if (!role || parseInt(role) === 1) {
        return
      } else {
        //that.isAdmin = true
      }
    })
  },
}
</script>
<style scoped>
.mt-table {
  margin-top: 20px;
  min-height: 70vh;
  max-height: 90vh;
  margin-bottom: 20px;
}
</style>