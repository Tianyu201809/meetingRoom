<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
  data() {
    return {
      currentPage1: 1,
    }
  },
  props: {
    total: {
      type: Number,
      default: function () {
        return 0
      },
    },
  },
  methods: {
    currentPage(count) {
      console.log(count)
    },
  },
}
</script>