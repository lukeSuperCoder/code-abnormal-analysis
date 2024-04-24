<template>
    <div class="contain">
        <div class="handel">
            <div class="error-message" v-if="data.flawLine && handelActive==='split'">
              <!-- 错误行数: 第{{ data.flawLine }} 行 -->
            </div>
            <div class="error-message" v-else-if="handelActive==='spmm'">
              相似度: {{ this.dataRow.similar }}
            </div>
            <div v-else-if="handelActive==='token' || handelActive==='ddm'">
                <span class="error-message">Top-{{ highlightIndex+1 }}</span>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="nextStep()">下一个</el-button>
            </div>
            <div v-else></div>
            <div class="handel-btn">
                <el-button size="small" :type="handelActive==='split'?'primary':'default'" @click="handelBtn('split')">函数片段</el-button>
                <el-button size="small" :type="handelActive==='ast'?'primary':'default'" @click="handelBtn('ast')">AST</el-button>
                <el-button size="small" :type="handelActive==='spmm'?'primary':'default'" :disabled="!isAst" @click="handelBtn('spmm')">SPMM</el-button>
                <el-button size="small" :type="handelActive==='astedit'?'primary':'default'" :disabled="!isAst" @click="handelBtn('astedit')">AST Edit</el-button>
                <el-button size="small" :type="handelActive==='token'?'primary':'default'" :disabled="!isAst" @click="handelBtn('token')">Token</el-button>
                <el-button size="small" :type="handelActive==='ddm'?'primary':'default'" :disabled="!isAst" @click="handelBtn('ddm')">DDM</el-button>
            </div>
        </div>
         <Editor
             v-show="handelActive!=='spmm' && handelActive!=='astedit'"
             class="editor"
             v-model="html"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreated"
         />
         <code-compare class="editor" :data="compare_data" v-show="handelActive=='spmm' || handelActive=='astedit'"></code-compare>
         <Editor
             class="editor-mini"
             v-model="htmlMini"
             :defaultConfig="editorConfig"
             :mode="mode"
             @onCreated="onCreatedMini"
         />
         <!-- <div class="btn">
             <el-button type="primary" @click="submitCode">下一步</el-button>
             <el-button>取消</el-button>
         </div> -->
     </div>
   </template>
   
   <script>
    import CodeUtil from '../../utils/codeUtil';
    import CodeData from '../../assets/data/codeData';
    import { Editor } from '@wangeditor/editor-for-vue'
    import codeUtil from '../../utils/codeUtil';
    import codeCompare from './codeCompare.vue';
   export default {
     name: "Home",
     components: { Editor, codeCompare },
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
                 this.splitHtml = newValue.codeText;
                //  this.handelBtn('split');
             },
             deep: true
         }
     },
     data() {
         return {
             handelActive: '',
             isAst: false,
             editor: null,
             editorMini: null,
             html: '',
             htmlMini: '',
             toolbarConfig: { },
             editorConfig: { placeholder: '请输入内容...', readOnly: true },
             mode: 'default', // or 'simple'
             dataRow: {},
             splitHtml: '',
             astHtml: '',
             spmmHtml: '',
             asteditHtml: '',
             ddmHtml: '',
             highlightIndex: 0,
             top5Arr: [],
             compare_data: {},
             loading: null,
             load_text_map: {
                split: '函数片段',
                ast: 'AST',
                spmm: 'SPMM',
                astedit: 'AST Edit',
                token: 'Token',
                ddm: 'DDM'
             }
         }
     },
     methods: {
         handelBtn(type) {
            this.handelActive = type;
            this.html = '';
            this.htmlMini = '';
            this.load(type).then(() => {
                switch(type) {
                    case 'split':
                        this.html = this.splitHtml;
                        break;
                    case 'ast':
                        this.getAstData();
                        break;
                    case 'spmm':
                        this.getSpmmData();
                        break;
                    case 'astedit':
                        this.getAstEditData();
                        break;
                    case 'token':
                        this.getTokenData();
                        break;
                    case 'ddm':
                        this.getDdmData();
                        break;
                }
            });
         },
         load(text) {
            //生成一个1-3的随机数
            let num = Math.floor(Math.random() * 3 + 2);
            this.loading = this.$loading({
                lock: true,
                text: '正在进行'+this.load_text_map[text]+'计算中，请稍后...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.loading.close();
                    resolve();
                }, num*1000);
            });
         },
         onCreated(editor) {
             this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            //  this.editor.insertText(data.codeText);
         },
         onCreatedMini(editor) {
             this.editorMini = Object.seal(editor);
         },
         submitCode() {
            //  console.log(this.editor.getHtml())
         },
         getAstData() {
            let fun_name = this.splitHtml.split('\n')[0];
            console.log(fun_name);
            let id = CodeUtil.getBetweenChars(fun_name, 'CWE', '_')[0]; //获取文件名
            let index = parseInt(CodeUtil.getBetweenChars(fun_name, 'cpy_', '_')[0]); //获取序号
            let data = CodeData.filter((item) => {
                return item.fileName === id;
            })
            //获取到了对应的数据集，根据序号获取对应数据项
            if(data.length>0) {
                //目前由于数据少 所以默认取第一个
                this.dataRow = data[0];
                index = 0;
                this.astHtml = this.dataRow.ast_bad;
                this.html = codeUtil.escapeHtml(this.astHtml);
                this.isAst = true;
                // console.log(this.editor);
            }
            console.log(id,index,data);
         },
         getSpmmData() {
            this.spmmHtml = {
                ast_bad: codeUtil.escapeHtml(this.dataRow.ast_bad),
                ast_good: codeUtil.escapeHtml(this.dataRow.ast_good),
            };
            this.compare_data = this.spmmHtml;
         },
         getAstEditData() {
            this.asteditHtml = this.dataRow.edits;
            this.htmlMini = this.asteditHtml;
         },
         nextStep() {
            if(this.highlightIndex>=this.top5Arr.length-1) {
                this.highlightIndex = 0;
            } else {
                this.highlightIndex++;
            }
            this.getTopData(this.highlightIndex)
         },
         getTopData(index) {
            let cur_high = this.top5Arr[index].split(',');
            let code_arr = this.splitHtml.split('\n');
            let str = code_arr[parseInt(cur_high[1])-1];
            if(str.indexOf(cur_high[0])>-1) {
                let start = str.indexOf(cur_high[0]);
                let end = start + cur_high[0].length;
                let newStr = str.substring(0,start) + '<span style="color:red;font-size: 22px;">' + str.substring(start,end) + '</span>' + str.substring(end);
                code_arr[parseInt(cur_high[1])-1] = newStr;
            }
            else {
            }
            this.html = code_arr.join('\n');
         },
         getTokenData() {
            this.html = this.splitHtml;
            this.htmlMini = JSON.stringify(this.dataRow.edits_top5);
            this.highlightIndex = 0;
            this.top5Arr = this.dataRow.edits_top5;
            this.getTopData(this.highlightIndex)
         },
         getDdmData() {
            this.html = this.splitHtml;
            this.htmlMini = JSON.stringify(this.dataRow.dmm_line)+'\n'+JSON.stringify(this.dataRow.dmm_top5);
            this.highlightIndex = 0;
            this.top5Arr = this.dataRow.dmm_top5;
            this.getTopData(this.highlightIndex)
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
   