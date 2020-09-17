<template>
  <div>
    <my-search></my-search>
    <meeting-room-table></meeting-room-table>
  </div>
</template>
<script>
import mySearch from './children/mySearch.vue'
import meetingRoomTable from './children/meetingRoomTable'
export default {
  name: 'appointmentList',
  components: {
    mySearch,
    meetingRoomTable,
  },
  data() {
    return {}
  },
}
</script>
<style>
</style>