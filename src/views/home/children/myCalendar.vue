<template>
  <div class="wapper">
    <el-calendar v-model="value"
                 style="height:650px">
      <template slot="dateCell"
                slot-scope="{data}"
                class="box-ie-size"
                :class="data.isSelected">
        <div :class="data.isSelected ? 'is-selected' : ''"
             @click="currentSelectDate(data.day)"
             style="height:100%;width:100%">
          <div class="day-number">
            {{ data.day.split('-').slice(2).join('') }}
          </div>

          <div class="selectCell"
               ref="selectCell">
            <div v-if="data.isSelected"
                 class="image-dog">
              <!-- <div>{{ data.isSelected}}</div> -->
              <!-- <img src="~/@/assets/img/dog.webp"
                   alt=""
                   id="img-dog-1"
                   style="height:22px; width:22px">
              <img src="~/@/assets/img/dog2.webp"
                   alt=""
                   id="img-dog-2"
                   style="height:22px; width:22px; display:none"> -->
              <div>
                <!-- 🥝 -->
                🍋
              </div>
            </div>
            <div v-else>
              <!-- {{data.isSelected}} -->
            </div>

            <!-- 以后扩展：用户有会的日子，使用图标进行标记-->
            <!-- <div>
              <el-badge is-dot
                        class="item"></el-badge>
            </div> -->
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
import { getLocalProp, setLocalProp, _debounce } from '@/api/localMethods'
export default {
  name: 'myCalendar',
  data() {
    return {
      value: new Date(),
    }
  },
  mounted() {},
  methods: {
    currentSelectDate(day) {
      console.log(this.value)
      const val = this.dayjs(this.value).format('YYYY-MM-DD')
      this.$emit('currentSelectDate', day)
    },
  },
}
</script>
<style scoped>
.wapper {
  position: relative;
}
.image-dog :hover :nth-child(2) {
  display: block;
}
.box-ie-size {
  box-sizing: border-box;
}
.wapper >>> .el-calendar-day {
  padding: 0;
  margin: 0;
  text-align: center;
  vertical-align: middle;
}
.wapper .day-number {
  padding-top: 5px;
}
.wapper >>> .is-selected {
  color: whitesmoke;

  background-color: rgba(14, 156, 92, 0.3) !important;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
/* .wapper >>> .is-selected :hover {
  color: whitesmoke;
  background-color: rgb(45, 134, 185) !important;
  cursor: pointer; 
} */
.wapper >>> .selectCell {
  margin-top: 12px;
  margin-left: 4px;
}
.wapper >>> .is-today {
  color: rgb(45, 134, 185) !important;
  font-weight: 700;
}
</style>