<template>
  <div class="wapper">
    <el-calendar v-model="value"
                 style="height:650px">
      <template slot="dateCell"
                slot-scope="{data}"
                :class="data.isSelected">
        <div :class="data.isSelected ? 'is-selected' : ''"
             @click="currentSelectDate(data.day)"
             style="height:100%;width:100%">
          {{ data.day.split('-').slice(2).join('') }}
          <div class="selectCell"
               ref="selectCell">
            {{ data.isSelected ? '✔' : ''}}
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
.wapper >>> .is-selected {
  color: white;
  background-color: rgb(45, 134, 185) !important;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.wapper >>> .is-selected :hover {
  color: white;
  background-color: rgb(45, 134, 185) !important;
  cursor: pointer;
}
.wapper >>> .selectCell {
  margin-top: 12px;
  margin-left: 4px;
}
.wapper >>> .is-today {
  color: rgb(45, 134, 185) !important;
  font-weight: 700;
}
</style>