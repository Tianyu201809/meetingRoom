<template>
  <div>
    <!-- 标题部分 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style=""
                            class="pageTitle">
          <i class="el-icon-setting"
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
              height="535"
              style="margin:0 auto; width:95%">
      <el-table-column prop="meetingRoomNumber"
                       label="会议室编号"
                       width="120">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.meetingRoomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRoomNumber"
                       label="会议室名称"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.meetingRoomName }}</span>
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
                       width="100">
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
                       width="120">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="warning"
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
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage"
                   :page-sizes="pageSizeArray"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total.sync="total"
                   class="block"
                   :filter="filter">
    </el-pagination>
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
      currentPage: 1,
      pageSize: 10,
      pageSizeArray: [10],
      filter: {},
      totalPage: 0,
    }
  },
  components: {
    paging,
  },
  methods: {
    /**
     * 暂未使用
     */
    handleSizeChange() {},
    /**
     * 计算总页码数
     * 用于解决删除当页最后一条数据之后，显示暂无数据的bug
     */
    calculateTotal() {
      return (this.totalPage = Math.ceil(this.total / this.pageSize))
    },
    handleCurrentChange(currentPage) {
      console.log(this.filter)
      this.loading = true
      const limit = 10
      const skip = parseInt((currentPage - 1) * limit)
      const f = {
        filter: {}, //暂未设置的过滤条件
        limit: limit,
        skip: skip,
      }
      this.getMeetingRoomItemsList(f)
    },
    deleteMeetingRoomItem(id) {
      let that = this
      this.$confirm('此操作将永久删除当前会议室信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      }).then(() => {
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
            getMeetingRoomCount(filter.filter).then((data) => {
              that.total = data.data.count
              let totalPage = that.calculateTotal()
              const currentPage =
                that.currentPage > totalPage ? totalPage : that.currentPage

              that.handleCurrentChange(currentPage)
            })
          })
      })
    },
    navToDetail(id) {
      this.$router.push({ name: 'meetingRoomDetail', params: { id: id } })
    },

    getMeetingRoomItemsList(filter) {
      getMeetingRoomItems(filter)
        .then((res) => {
          this.tableData = res.data.data
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
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
    //获取显示的数据
    getMeetingRoomItems(filter).then((res) => {
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
  margin-left: 30px;
  margin-top: 20px;
}
.suc {
  color: green;
}
.err {
  color: red;
}
.block {
  margin-left: 30px;
  margin-top: 10px;
}
</style>