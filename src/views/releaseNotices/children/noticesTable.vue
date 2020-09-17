<template>
  <div>
    <el-table :data="tableData"
              border
              v-loading="loading"
              height="535"
              style="margin:0 auto; width:95%">
      <el-table-column prop="title"
                       label="通知标题"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department"
                       label="通知部门"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.department ? scope.row.department.name:null }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status"
                       label="发布状态"
                       width="100">
        <template slot-scope="scope">
          <span style="margin-left: 5px"
                :class="{ suc : scope.row.status == 1, err:scope.row.status == 0 }">{{ scope.row.status == 1 ? '已发布' : scope.row.status == 2 ? '已撤销': scope.row.status == 0 ? '未发布':'其他' }}</span>
          <!-- (scope.row.status == 1 ? '已发布':'未发布') || (scope.row.status == 2 ? '已发布':'未发布') -->
        </template>
      </el-table-column>
      <el-table-column prop="createdDate"
                       label="创建日期"
                       width="130">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ dateFormat(scope.row.createdDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdBy"
                       label="创建人"
                       width="100">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.createdBy ? scope.row.createdBy.userName:'' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content"
                       label="备注信息"
                       :show-overflow-tooltip="true"
                       max-width="100">
        <template slot-scope="scope"
                  :show-overflow-tooltip="true">
          <span style="margin-left: 5px">{{ scope.row.content }}</span>
          <!-- <span v-html="scope.row.content"></span> -->
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
                     @click.native.prevent="deleteNotices(scope.row._id)"
                     class="el-icon-delete"></el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { deleteNotices } from '@/api/notification'
export default {
  name: 'noticesTable',
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      },
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    filter: {
      type: Object,
      default: function () {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {}
  },
  computed: {
    dateFormat(date) {
      return function (date) {
        return this.dayjs(date).format('YYYY-MM-DD')
      }
    },
  },
  methods: {
    //进入编辑页
    navToDetail(id) {
      this.$router.push({ name: 'editNotices', params: { id: id } })
    },
    //删除条目
    deleteNotices(id) {
      debugger
      let that = this
      this.$confirm('此操作将会删除通知信息, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
      })
        .then(() => {
          deleteNotices(id)
            .then((d) => {
              if (d.data.code == 200) {
                that.$message({
                  type: 'success',
                  message: d.data.mes,
                })
                // that.$router.replace({
                //   name: 'queryNotices',
                // })
                //获取数量和显示条目
                //首先获取删除后的数量，然后进行初始化
                //this.$parent.initialPage()

                that.$parent
                  .queryNotificationCount(that.filter)
                  .then((count) => {
                    //n:查询到的全部数量
                    const n = count.data.data
                    that.totalPage = Math.ceil(n / 10)
                    //将总数量回传给父组件，让父组件重新渲染分页插件
                    that.$emit('totalItemsNum', n)
                    const page =
                      that.currentPage > that.totalPage
                        ? that.totalPage
                        : that.currentPage
                    that.$parent.handleCurrentChange(page)
                  })
              } else {
                that.$message({
                  type: 'error',
                  message: d.data.mes,
                })
              }
            })
            .catch((e) => {
              that.$message({
                type: 'error',
                message: e,
              })
            })
        })
        .catch((e) => {
          that.$message({
            type: 'error',
            message: '已取消删除操作',
          })
        })
    },
  },
}
</script>
<style scoped>
.suc {
  color: green;
}
.err {
  color: red;
}
</style>