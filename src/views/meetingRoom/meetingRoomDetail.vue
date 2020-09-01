<template>
  <div>
    <!-- header部分  -->
    <el-page-header @back="goBack"
                    class="detail-header">
      <!-- <template slot="title">
        返回
      </template>-->
      <template slot="content">
        会议室信息修改
      </template>
    </el-page-header>
    <el-form>

    </el-form>
  </div>
</template>
<script>
export default {
  name: 'meetingRoomDetail',
  methods: {
    goBack() {
      this.$router.replace('/maintainMeetingRoom')
    },
  },
}
</script>
<style scoped>
.detail-header {
  margin-top: 5px;
}
</style>