<template>
  <div class="search-box">
    <div>
      <el-row justify="left">
        <el-col :span="5">
          <div class="item">
            <el-input v-model="forma.name"
                      placeholder="请输入会议主题">
            </el-input>
          </div>

        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="forma.id"
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
                       :label="item.value"
                       :value="item.value"></el-option>

          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button type="primary"
                     @click="searchCon(forma)"
                     icon="el-icon-search">查询</el-button>
        </el-col>

      </el-row>
      <!-- <input type="text" placeholder="请输入您需要查询的内容" v-model="forma.id"> -->

    </div>

  </div>
</template>
<script>

export default {
  name: 'mySearch',
  data() {
    return {
      search: '',
      forma: {
        id: '',
        name: '',
        meetingRoom: '',
      },
      list: [],
      listSearch: [],
      meetingRoomList: [],
    }
  },
  methods: {
    searchCon({ id, name }) {
      this.listSearch = this.list.filter((text) => {
        //使用过滤方法
        let matchid = true
        let matchname = true
        if (id) {
          matchid = text.id == id
        }
        if (name) {
          // debugger
          const keys = name.toUpperCase().replace('', '').split('')
          // console.log(keys)
          matchname = keys.every((key) => text.tag.toUpperCase().includes(key))

          // console.log(matchname)
        }

        return matchid && matchname
      })

      // console.log( this.listSearch)
    },
  },
  created() {
    this.$axios
      .get('/getMeetingRoomDropList')
      .then((res) => {
        this.meetingRoomList = res.data
      })
      .catch(() => {
        this.meetingRoomList = [{ key: '00010', value: '会议室00010' }]
      })
  },
  mounted() {
      
  },
}
</script>
<style scope>
.item {
  width: 95%;
}
</style>