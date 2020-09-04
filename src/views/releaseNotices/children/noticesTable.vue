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
                :class="{ suc : scope.row.status == 1, err:scope.row.status == 0 }">{{ scope.row.meetingRoomStatus == 1 ? '已发布':'未发布' }}</span>
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
      <el-table-column prop=""
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
                     type="success"
                     @click.prevent="navToDetail(scope.row._id)"
                     class="el-icon-edit"></el-button>
          <el-button size="mini"
                     type="danger"
                     @click.native.prevent="deleteMeetingRoomItem(scope.row._id)"
                     class="el-icon-delete"></el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  name: 'noticesTable',
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      tableData: [],
    }
  },
}
</script>
<style>
</style>