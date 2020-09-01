<template>
  <div>
    <!-- 标题部分 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-pie-chart"
             style="margin-right:10px"></i>
          <strong>会议室信息维护</strong>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <hr style="width:100%; margin:0 auto" />
      <br>
    </div>

    <!-- 表格显示部分 -->
    <el-table :data="tableData"
              border
              v-loading="loading"
              style="margin:0 auto; width:95%; height:480px">
      <el-table-column prop="meetingRoomID"
                       label="会议室ID"
                       width="220">
        <template slot-scope="scope">
          <span style="margin-left: 5px">
            {{ scope.row._id }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRoomNumber"
                       label="会议室名称"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.meetingRoomName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRoomNumber"
                       label="会议室编号"
                       width="120">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.meetingRoomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRoomStatus"
                       label="会议室状态"
                       width="100">
        <template slot-scope="scope">
          <span style="margin-left: 5px"
                :class="{ suc : scope.row.meetingRoomStatus == 1, err:scope.row.meetingRoomStatus == 0 }">{{ scope.row.meetingRoomStatus == 1 ? '可用':'不可用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdDate"
                       label="创建日期"
                       width="220">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdBy"
                       label="创建人"
                       width="150">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.createdBy.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description"
                       label="备注信息">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation"
                       label="操作"
                       width="160">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click.prevent="navToDetail(scope.row._id)"
                     class="el-icon-edit"></el-button>
          <el-button size="mini"
                     type="danger"
                     @click.native.prevent="deleteMeetingRoomItem(scope.row._id)"
                     class="el-icon-delete"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页部分 -->
    <paging class="paging"
            :total="total"></paging>
  </div>
</template>
<script>
import paging from './children/paging'
import {
  getMeetingRoomItems,
  deleteMeetingRoomItem,
  getMeetingRoomCount,
} from '@/api/meetingRoom'
export default {
  name: 'queryMeetingRoom',
  props: {},
  data() {
    return {
      tableData: [],
      loading: true,
      total: 0,
    }
  },
  components: {
    paging,
  },
  methods: {
    handleEdit() {},
    open() {},
    deleteMeetingRoomItem(id) {
      let that = this
      deleteMeetingRoomItem(id)
        .then(({ data }) => {
          return new Promise((resolve, reject) => {
            console.log(data)
            if (parseInt(data.code) === 200) {
              this.$message({
                type: 'success',
                message: data.mes,
              })
              resolve(true)
            } else {
              this.$message({
                type: '',
                message: data.mes,
              })
              reject(false)
            }
          })
        })
        .then(() => {
          const filter = {
            limit: 10,
            skip: 0,
            filter: {
              //设置filter条件
            },
          }

          //当删除成功之后，需要重新调用查询方法，更新条目数量和table显示数据
          getMeetingRoomItems(filter)
            .then((res) => {
              that.tableData = res.data.data
              that.loading = false
            })
            .then(() => {
              getMeetingRoomCount(filter.filter).then((data) => {
                that.total = data.data.count
              })
            })
        })
    },
    navToDetail(id) {
      debugger
      this.$router.push({ name: 'meetingRoomDetail', params: { id: id } })
    },
  },
  mounted() {},
  computed: {},
  created() {
    const filter = {
      limit: 10,
      skip: 0,
      filter: {
        //设置filter条件
      },
    }
    getMeetingRoomItems(filter).then((res) => {
      debugger
      this.tableData = res.data.data
      this.loading = false
    })

    /**
     * 获取总数
     */
    getMeetingRoomCount(filter.filter)
      .then((data) => {
        this.total = data.data.count
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
</script>
<style scoped>
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
.paging {
  margin-left: 26px;
  margin-top: 20px;
}
.suc {
  color: green;
}
.err {
  color: red;
}
</style>