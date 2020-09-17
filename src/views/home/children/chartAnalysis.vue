<template>
  <div class="wapper">
    <el-card shadow="hover">
      <!-- <div slot="header"
           class="clearfix">
        <span>图表分析</span>
      </div> -->
      <div class="schartBox">

        <schart ref="line"
                class="schart"
                canvasId="line"
                v-if="!schartLoading"
                :options="options">
        </schart>
        <!-- 加载动画显示 -->
        <div v-if="schartLoading">
          <el-table v-loading="schartLoading"
                    empty-text=" "
                    style="height:335px"></el-table>
        </div>
      </div>

    </el-card>
  </div>
</template>
<script>
import Schart from 'vue-schart'
import { getAppointmentNumberListByDept } from '@/api/appointment'
export default {
  name: 'chartAnalysis',
  components: {
    Schart,
  },
  data() {
    return {
      schartLoading: true,
      options: {
        type: 'pie',
        title: {
          text: '各部门会议预约数量统计图',
        },
        legend: {
          position: 'left',
        },
        labels: ['技术开发部', '产品销售部', '人事部'],
        datasets: [
          {
            data: [],
          },
        ],
      },
    }
  },
  props: {
    todoList: {
      type: Array,
      default: function () {
        return []
      },
    },
    todoNum: {
      type: Number,
      default: function () {
        return 10
      },
    },
  },
  methods: {},
  created() {
    debugger
    getAppointmentNumberListByDept().then((res) => {
      this.schartLoading = false
      let _developCount = res.data.data[0].data
      let _saleCount = res.data.data[1].data
      let _hrCount = res.data.data[2].data
      let array = [_developCount, _saleCount, _hrCount]
      this.options.datasets[0].data = array
    })
  },
  mounted() {},
}
</script>
<style scoped>
#line {
  height: 80% !important;
  width: 90% !important;
}
.schartBox {
  /* display: flex; */
  height: 100%;
  /* justify-content: center;
  align-items: center; */
}
.schart {
  width: 100%;
  height: 335px;
}
.wapper >>> #line {
  margin-top: 15px;
}
.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.block {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
</style>