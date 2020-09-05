<template>
  <div>
    <div class="container">
      <quill-editor ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
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
      content: '',
      editorOption: {
        placeholder: 'Hello World',
      },
    }
  },
  components: {
    quillEditor,
  },
  mounted() {
    addQuillTitle()
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html
      console.log(html)
      this.$emit('content', this.content)
    },
    // submit() {
    //   console.log(this.content)
    //   this.$message.success('提交成功！')
    // },
  },
}
</script>
<style>
.container {
  width: 90%;
  margin: 9px 0 0 0;
}
.ql-picker {
  height: auto !important;
}
</style>