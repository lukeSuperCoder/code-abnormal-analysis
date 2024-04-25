let codeUtil = {
  //获取异常代码段
  splitBadCode: function (badCode) {
    // 假设 lines 是以静态字符串数组形式模拟的文件内容
    const cCode =  badCode; // 这里填充模拟的文件内容，每一行一个字符串
    // 拆分成一个字符串数组
    const lines = cCode.split('\n');
    function removeCommentsAndEmptyLines(code) {
      const newCode = [];
      let inCommentBlock = false;
      let flawLineNumber = null;
    
      code.forEach((line, index) => {
        // 删除行内的注释
        line = line.split('//')[0];
        
        // 处理多行注释块
        if (inCommentBlock) {
          if (line.includes('*/')) {
            line = line.split('*/')[1];
            inCommentBlock = false;
          } else {
            return;
          }
        } else if (line.includes('/*')) {
          if (line.includes('FLAW')) {
            flawLineNumber = newCode.length + 1;
          }
          if (line.includes('*/')) {
            line = line.split('/*')[0] + line.split('*/')[1];
          } else {
            line = line.split('/*')[0];
            inCommentBlock = true;
            return;
          }
        }
        
        // 删除空行
        line = line.trim();
        if (line) {
          newCode.push(line);
        }
      });
    
      return {code: newCode.join('\n'), flawLineNumber};
    }
    
    function processLines(lines) {
      let inBadFunction = false;
      const bracketStack = [];
      const newLines = [];
    
      lines.forEach((line) => {
        if ((line.indexOf('bad')>-1 || line.indexOf('Bad')>-1) && line.includes('(') && line.includes('void') && !inBadFunction) {
          inBadFunction = true;
        }
        if (line.includes('{') && inBadFunction) {
          bracketStack.push('{');
        }
        if (line.includes('}') && inBadFunction) {
          bracketStack.pop();
          if (bracketStack.length === 0) {
            newLines.push(line);
            inBadFunction = false;
          }
        }
        if (inBadFunction) {
          newLines.push(line);
        }
      });
    
      const { code: processedLines, flawLineNumber } = removeCommentsAndEmptyLines(newLines);
      return { codeText: processedLines, filename: 'example.c', flawLine: flawLineNumber };
    }
    
    // 调用 processLines 函数并打印结果
    const result = processLines(lines);
    return result;
  },
  //查找并返回两个字符之间的所有字符串片段。接受三个参数：一个字符串 s 以及两个指定的字符串 startStr 和 endStr。
  getBetweenChars(s, startStr, endStr) {
    const results = [];
    let start = s.indexOf(startStr) + startStr.length;
    while (start > startStr.length - 1) {
        const end = s.indexOf(endStr, start);
        if (end === -1) break;
        results.push(s.substring(start, end));
        start = s.indexOf(startStr, end) + startStr.length;
    }
    return results;
 },
 //格式化html文本，转义输出
  escapeHtml(html) {
    return html
        .replace(/&/g, '&amp;')   // Must be done first!
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
  },
  //匹配id
  extractContentBeforeBad(functionName) {
    var pattern = /_([^_]+)_bad\(\)$/;
    var match = functionName.match(pattern);
    if (match) {
        return match[1]; // 返回匹配的部分
    } else {
        return null;
    }
  },
  //添加行号
  addLineNumbers(code) {
    var lines = code.split('\n');
    var numberedLines = lines.map((line, index) => {
      return (index + 1) + ' \t' + line;
    });
    return numberedLines.join('\n');
  },
}
export default codeUtil;