<template>
    <div class="contain">
         <Editor
             class="editor-left"
             v-model="htmlLeft"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreatedLeft"
         />
         <Editor
             class="editor-right"
             v-model="htmlRight"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreatedRight"
         />
     </div>
   </template>
   
   <script>
    import CodeUtil from '../../utils/codeUtil';
    import CodeData from '../../assets/data/codeData';
    import { Editor } from '@wangeditor/editor-for-vue'
    import codeUtil from '../../utils/codeUtil';
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
                this.initCompareData();
             },
             deep: true
         }
     },
     data() {
         return {
             editorLeft: null,
             editorRight: null,
             htmlLeft: '',
             htmlRight: '',
             toolbarConfig: { },
             editorConfig: { placeholder: '请输入内容...', readOnly: true },
             mode: 'default', // or 'simple'
         }
     },
     methods: {
         initCompareData() {
            this.htmlLeft = this.data.ast_bad;
            this.htmlRight = this.data.ast_good;
         },
         onCreatedLeft(editor) {
             this.editorLeft = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
         },
         onCreatedRight(editor) {
             this.editorRight = Object.seal(editor);
         }
     },
     mounted() {
        this.initCompareData();
     },
     beforeDestroy() {
         const editorLeft = this.editorLeft
         const editorRight = this.editorRight
         if (editorLeft == null || editorRight == null) return
         editorLeft.destroy() // 组件销毁时，及时销毁编辑器
         editorRight.destroy() // 组件销毁时，及时销毁编辑器
     }
   };
   </script>
   <style lang="scss" scoped>
   .contain {
        width: 100%;
        height: 100%;
        display: flex;
       .editor-left {
         width: 50%;
         height: 100%;
         border-right: 1px solid #ccc;
       }
       .editor-right {
         width: 50%;
         height: 100%;
       }
   }
   </style>
   <style src="@wangeditor/editor/dist/css/style.css"></style>
   