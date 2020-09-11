<template>
  <div>
    <div class="container">
      <quill-editor ref="myTextEditor"
                    v-model="cloneContent"
                    :options="editorOption"
                    class="editor"
                    @change="onEditorChange"></quill-editor>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { addQuillTitle } from './quill-title.js'
export default {
  name: 'editor',
  data: function () {
    return {
      content2: this.content || '',
      editorOption: {
        placeholder: '请输入通知正文',
      },
    }
  },
  computed: {
    cloneContent: {
      get() {
        return this.content
      },
      set(value) {
        
      },
    },
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    noticesContent: {
      type: String,
      default: '',
    },
  },
  components: {
    quillEditor,
  },
  mounted() {
    addQuillTitle()
  },
  created() {},
  methods: {
    onEditorChange({ editor, html, text }) {
      // this.content = html
      console.log(html)
      this.content2 = html
      this.$emit('noticesContent', this.content2)
    },
    // submit() {
    //   console.log(this.content)
    //   this.$message.success('提交成功！')
    // },
  },
}
</script>
<style scoped>
.container {
  width: 90%;
  margin: 9px 0 0 0;
}
.ql-picker {
  height: auto !important;
}
.editor {
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>