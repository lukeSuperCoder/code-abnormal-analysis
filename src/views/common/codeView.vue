<template>
   <div class="contain">
        <Editor
            class="editor"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
        <div class="btn">
            <el-button type="primary" @click="submitCode">提交</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
  </template>
  
  <script>
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import CodeUtil from '../../utils/codeUtil';
  export default {
    name: "Home",
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        submitCode() {
            const htmlContent = this.editor.getText();
            let result = CodeUtil.splitBadCode(htmlContent);
            console.log(result,'res');
            this.$emit('submitCode',result);
        }
    },
    mounted() {
        
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
  };
  </script>
  <style lang="scss" scoped>
  .contain {
      .toolbar {
        width: 100%;
        border-bottom: 1px solid #ccc;
      }
      .editor {
        width: 100%;
        height: 500px;
        border: 1px solid #ccc;
      }
      .btn {
        margin-top: 10px;
      }
  }
  </style>
  <style src="@wangeditor/editor/dist/css/style.css"></style>
  