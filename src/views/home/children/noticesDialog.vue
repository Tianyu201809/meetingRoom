<template>
  <div>
    <el-dialog :visible.sync="noticesDialogFlag1"
               width="80%"
               ref="noticeDialogTag"
               lock-scroll>
      <!--会议详情展示  -->
      <div slot="title"
           class="center title">
        {{noticesItem.title}}
        <el-divider></el-divider>
      </div>
      <!-- 正文部分 -->
      <div v-html="noticesItem.content"
           class="noticeBody">
      </div>
      <!-- 结尾部分 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button type="danger"
                   @click="noticesDialogFlag1 = false">关 闭</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'noticesDialog',
  data() {
    return {
      noticesDialogFlag1: this.noticesDialogFlag,
    }
  },
  props: {
    noticesItem: {
      type: Object,
      default: function () {
        return {}
      },
    },
    noticesDialogFlag: {
      type: Boolean,
    },
  },
  methods: {
    showDialog() {
      this.noticesDialogFlag1 = true
    },
  },
}
</script>
<style scoped>
.title{
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
}
.center {
  text-align: center;
}
.noticeBody {
  margin-top: -35px;
  font-size: 18px;
}
.dialog-footer {
  text-align: center;
}
</style>