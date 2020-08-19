<template>
  <el-table :data="tableData"
            v-loading="loading"
            border
            style="width: 90%"
            class="mt-table">
    <el-table-column prop="date"
                     label="日期"
                     width="180">
    </el-table-column>
    <el-table-column prop="name"
                     label="姓名"
                     width="180">
    </el-table-column>
    <el-table-column prop="address"
                     label="地址">
    </el-table-column>

  </el-table>

</template>
<script>
export default {
  name: 'meetingRoomTable',
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
      loading: true,
    }
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
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