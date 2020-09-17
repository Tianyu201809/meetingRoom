<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   :filter="filter">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Paging',
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // },
    handleCurrentChange(currentPage) {
      console.log(this.filter)
      const limit = 10
      const skip = parseInt((currentPage - 1) * limit)
      const f = {
        filter: {}, //暂未设置的过滤条件
        limit: limit,
        skip: skip,
      }
      debugger
      this.$parent.getMeetingRoomItemsList(f)
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  props: {
    total: {
      type: Number,
      default: function () {
        return 0
      },
    },
    filter: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
}
</script>