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
//             const htmlContent = `/* TEMPLATE GENERATED TESTCASE FILE
// Filename: CWE124_Buffer_Underwrite__char_alloca_cpy_02.c
// Label Definition File: CWE124_Buffer_Underwrite.stack.label.xml
// Template File: sources-sink-02.tmpl.c
// */
// /*
//  * @description
//  * CWE: 124 Buffer Underwrite
//  * BadSource:  Set data pointer to before the allocated memory buffer
//  * GoodSource: Set data pointer to the allocated memory buffer
//  * Sink: cpy
//  *    BadSink : Copy string to data using strcpy
//  * Flow Variant: 02 Control flow: if(1) and if(0)
//  *
//  * */

// #include "std_testcase.h"

// #include <wchar.h>

// #ifndef OMITBAD

// void CWE124_Buffer_Underwrite__char_alloca_cpy_02_bad()
// {
//     char * data;
//     char * dataBuffer = (char *)ALLOCA(100*sizeof(char));
//     memset(dataBuffer, 'A', 100-1);
//     dataBuffer[100-1] = '\0';
//     if(1)
//     {
//         /* FLAW: Set data pointer to before the allocated memory buffer */
//         data = dataBuffer - 8;
//     }
//     {
//         char source[100];
//         memset(source, 'C', 100-1); /* fill with 'C's */
//         source[100-1] = '\0'; /* null terminate */
//         /* POTENTIAL FLAW: Possibly copying data to memory before the destination buffer */
//         strcpy(data, source);
//         printLine(data);
//     }
// }

// #endif /* OMITBAD */

// #ifndef OMITGOOD

// /* goodG2B1() - use goodsource and badsink by changing the 1 to 0 */
// static void goodG2B1()
// {
//     char * data;
//     char * dataBuffer = (char *)ALLOCA(100*sizeof(char));
//     memset(dataBuffer, 'A', 100-1);
//     dataBuffer[100-1] = '\0';
//     if(0)
//     {
//         /* INCIDENTAL: CWE 561 Dead Code, the code below will never run */
//         printLine("Benign, fixed string");
//     }
//     else
//     {
//         /* FIX: Set data pointer to the allocated memory buffer */
//         data = dataBuffer;
//     }
//     {
//         char source[100];
//         memset(source, 'C', 100-1); /* fill with 'C's */
//         source[100-1] = '\0'; /* null terminate */
//         /* POTENTIAL FLAW: Possibly copying data to memory before the destination buffer */
//         strcpy(data, source);
//         printLine(data);
//     }
// }

// /* goodG2B2() - use goodsource and badsink by reversing the blocks in the if statement */
// static void goodG2B2()
// {
//     char * data;
//     char * dataBuffer = (char *)ALLOCA(100*sizeof(char));
//     memset(dataBuffer, 'A', 100-1);
//     dataBuffer[100-1] = '\0';
//     if(1)
//     {
//         /* FIX: Set data pointer to the allocated memory buffer */
//         data = dataBuffer;
//     }
//     {
//         char source[100];
//         memset(source, 'C', 100-1); /* fill with 'C's */
//         source[100-1] = '\0'; /* null terminate */
//         /* POTENTIAL FLAW: Possibly copying data to memory before the destination buffer */
//         strcpy(data, source);
//         printLine(data);
//     }
// }

// void CWE124_Buffer_Underwrite__char_alloca_cpy_02_good()
// {
//     goodG2B1();
//     goodG2B2();
// }

// #endif /* OMITGOOD */

// /* Below is the main(). It is only used when building this testcase on
//  * its own for testing or for building a binary to use in testing binary
//  * analysis tools. It is not used when compiling all the testcases as one
//  * application, which is how source code analysis tools are tested.
//  */

// #ifdef INCLUDEMAIN

// int main(int argc, char * argv[])
// {
//     /* seed randomness */
//     srand( (unsigned)time(NULL) );
// #ifndef OMITGOOD
//     printLine("Calling good()...");
//     CWE124_Buffer_Underwrite__char_alloca_cpy_02_good();
//     printLine("Finished good()");
// #endif /* OMITGOOD */
// #ifndef OMITBAD
//     printLine("Calling bad()...");
//     CWE124_Buffer_Underwrite__char_alloca_cpy_02_bad();
//     printLine("Finished bad()");
// #endif /* OMITBAD */
//     return 0;
// }

// #endif`
            let result = CodeUtil.splitBadCode(htmlContent);
            console.log(result,'res');
            this.$message.success('提交成功');
            setTimeout(() => {
                this.$emit('submitCode',result);
            }, 1000);
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
  