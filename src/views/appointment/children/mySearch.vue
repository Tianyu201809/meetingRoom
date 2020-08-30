<template>
  <div class="search-box">
    <div>
      <el-row justify="left">
        <el-col :span="5">
          <div class="item">
            <el-input v-model="forma.title"
                      placeholder="请输入会议主题">
            </el-input>
          </div>

        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="forma.date"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>

        </el-col>
        <el-col :span="5">
          <el-select v-model="forma.meetingRoom"
                     placeholder="请选择会议室"
                     class="item">
            <el-option v-for="(item, index) in meetingRoomList"
                       :key="index"
                       :label="item"
                       :value="item"></el-option>

          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button type="primary"
                     @click="searchData()"
                     icon="el-icon-search">查询</el-button>
          <el-button type="danger"
                     @click="resetData()"
                     icon="el-icon-search">重置</el-button>
        </el-col>

      </el-row>
      <!-- <input type="text" placeholder="请输入您需要查询的内容" v-model="forma.id"> -->

    </div>

  </div>
</template>
<script>
import { getMeetingRoomItems } from '@/api/meetingRoom'
export default {
  name: 'mySearch',
  data() {
    return {
      search: '',
      forma: {
        id: '',
        title: '',
        date: '',
        meetingRoom: '',
      },
      list: [],
      listSearch: [],
      meetingRoomList: [],
    }
  },
  methods: {
    searchData() {
      //将检索条件整理成一个对象
      //执行查询方法，获取数据
      debugger
      const filter = {
        title: this.forma.title,
        meetingDate: this.forma.date,
        meetingRoomNumber: this.forma.meetingRoom,
      }
      console.log(1)
      this.$parent.queryMeetingRoomByFilter(filter)
    },
    resetData() {
      this.forma.title = ''
      this.forma.date = ''
      this.forma.meetingRoom = ''
    },

    //将所选择的过滤条件传递给父组件
    //通过父组件，影响其子组件
  },
  created() {
    // this.$axios
    //   .get('/meetingRoom/getMeetingRoomDropList')
    //   .then((res) => {
    //     this.meetingRoomList = res.data
    //   })
    //   .catch(() => {
    //     this.meetingRoomList = [{ key: '00010', value: '会议室00010' }]
    //   })
  },
  mounted() {
    // this.$axios
    //   .get('/meetingRoom/getMeetingRoomDropList')
    //   .then((res) => {
    //     this.meetingRoomList = res.data
    //   })
    //   .catch(() => {
    //     this.meetingRoomList = [{ key: '00010', value: '会议室00010' }]
    //   })

    getMeetingRoomItems().then((result) => {
      debugger
      console.log(result)
      let meetingRoomArrayList = result.data.data.map((item) => {
        return item.meetingRoomNumber
      })
      this.meetingRoomList = meetingRoomArrayList
    })
  },
}
</script>
<style scope>
.item {
  width: 95%;
}
</style>