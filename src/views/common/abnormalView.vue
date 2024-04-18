<template>
    <div class="contain">
        <div class="handel">
            <div class="error-message" v-if="data.flawLine">
              错误行数：第{{ data.flawLine }} 行
            </div>
            <div class="handel-btn">
                <el-button size="small" :type="handelActive==='split'?'primary':'default'" @click="handelBtn('split')">拆分片段</el-button>
                <el-button size="small" :type="handelActive==='ast'?'primary':'default'" @click="handelBtn('ast')">AST</el-button>
                <el-button size="small" :type="handelActive==='spmm'?'primary':'default'" :disabled="!isAst" @click="handelBtn('spmm')">SPMM</el-button>
                <el-button size="small" :type="handelActive==='astedit'?'primary':'default'" :disabled="!isAst" @click="handelBtn('astedit')">AST Edit</el-button>
                <el-button size="small" :type="handelActive==='ddm'?'primary':'default'" :disabled="!isAst" @click="handelBtn('ddm')">DDM</el-button>
            </div>
        </div>
         <Editor
             class="editor"
             v-model="html"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreated"
         />
         <Editor
             class="editor-mini"
             v-model="htmlMini"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreatedMini"
         />
         <div class="btn">
             <el-button type="primary" @click="submitCode">下一步</el-button>
             <el-button>取消</el-button>
         </div>
     </div>
   </template>
   
   <script>
   import { Editor } from '@wangeditor/editor-for-vue'
   export default {
     name: "Home",
     components: { Editor },
     props: {
         data: {
             type: Object,
             default: () => {
                 return {}
             }
         }
     },
     watch: {
         data: {
             handler(newValue, oldValue) {
                 this.html = newValue.codeText;
             },
             deep: true
         }
     },
     data() {
         return {
             handelActive: 'split',
             isAst: false,
             editor: null,
             editorMini: null,
             html: '',
             htmlMini: '',
             toolbarConfig: { },
             editorConfig: { placeholder: '请输入内容...', readOnly: true },
             mode: 'default', // or 'simple'
         }
     },
     methods: {
         handelBtn(type) {
            this.handelActive = type;
         },
         onCreated(editor) {
             this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            //  this.editor.insertText(data.codeText);
         },
         onCreatedMini(editor) {
             this.editorMini = Object.seal(editor);
         },
         submitCode() {
             console.log(this.editor.getHtml())
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
        .handel {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .error-message {
            margin-top: 10px;
            font-size: 16px;
            font-weight: 500;
            color: red;
        }
       .toolbar {
         width: 100%;
       }
       .editor {
         width: 100%;
         height: 500px;
         border: 1px solid #ccc;
       }
       .editor-mini {
         width: 100%;
         height: 250px;
         border: 1px solid #ccc;
       }
       .btn {
         margin-top: 10px;
       }
   }
   </style>
   <style src="@wangeditor/editor/dist/css/style.css"></style>
   