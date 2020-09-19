<template>
  <div>
    <el-dialog title="修改个人信息"
               :visible.sync="DialogVisible"
               width="40%"
               center>
      <div>
        <el-form>
          <el-form-item :label="'修改' + propTitle + ':'"
                        label-width="120">
            <div v-if="modifiedProp != 'birthday' ">
              <el-input v-model="value"
                        auto-complete="off"
                        width="50%"></el-input>
            </div>
            <div v-else>
              <el-date-picker v-model="value"
                              type="date"
                              format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>
            </div>

          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="modifyUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateUserInfo } from '@/api/user'
import { getLocalProp } from '@/api/localMethods'
export default {
  name: 'modifyInfoDialog',
  data() {
    return {
      DialogVisible: false,
      value: '',
    }
  },
  props: {
    modifiedProp: {
      type: String,
      default: '',
    },
    propTitle: {
      type: String,
      default: '无标题',
    },
  },
  methods: {
    openDialog() {
      this.DialogVisible = true
    },
    modifyUserInfo() {
      //修改的数据属性和值
      const userId = getLocalProp('userId')
      const data = {
        //修改传递的属性 && 属性值
        [this.modifiedProp]: this.value,
      }
      let val = this.value
      const that = this

      updateUserInfo(userId, data)
        .then((d) => {
          if (parseInt(d.data.code) === 200) {
            that.$message({
              type: 'success',
              message: `${that.propTitle}修改成功`,
            })
            that.$emit('change-value', data)
            if ('email' == that.modifiedProp) {
              /**
               * 同步cookie中的值与数据库中的值保持一致
               */
              setLocalProp(that.modifiedProp, value)
            }
            that.DialogVisible = false
            that.value = ''
          } else {
            that.$message({
              type: 'error',
              message: `修改异常`,
            })
            that.DialogVisible = false
            that.value = ''
          }
        })
        .catch((e) => {
          that.$message.error(e)
          that.DialogVisible = false
          that.value = ''
        })
    },
  },
}
</script>
<style>
</style>