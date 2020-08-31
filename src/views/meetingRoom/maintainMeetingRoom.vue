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
      <hr style="width:97%; margin:0 auto" />
      <br>
    </div>

    <!-- 表格显示部分 -->
    <el-table :data="tableData"
              border
              style="margin:0 auto; width:95%">
      <el-table-column prop="meetingRoomID"
                       label="会议室ID"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRoomNumber"
                       label="会议室编号"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.meetingRoomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdDate"
                       label="创建时间">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description"
                       label="备注信息">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini"
                     type="danger"
                     @click.native.prevent="deleteMeetingRoomItem(scope.row._id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
  </div>
</template>
<script>
import { getMeetingRoomItems, deleteMeetingRoomItem } from '@/api/meetingRoom'
export default {
  name: 'queryMeetingRoom',
  props: {},
  data() {
    return {
      tableData: [],
    }
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
          getMeetingRoomItems().then((res) => {
            that.tableData = res.data.data
          })
        })
    },
  },
  mounted() {},
  computed: {},
  created() {
    getMeetingRoomItems().then((res) => {
      this.tableData = res.data.data
    })
  },

  watch: {},
}
</script>
<style scoped>
.pageTitle {
  margin: 20px 0 20px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>