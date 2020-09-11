<template>
  <div>
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
<style>
.is-selected {
  color: white;
  background-color: rgb(45, 134, 185) !important;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.is-selected :hover {
  color: white;
  background-color: rgb(45, 134, 185) !important;
  cursor: pointer;
}
.selectCell {
  margin-top: 12px;
  margin-left: 4px;
}
.is-today {
  color: rgb(45, 134, 185) !important;
  font-weight: 700;
}
</style>