/**
 * 命令 输入框处理逻辑
 */


codeText.onkeyup = function (event) {

    if (event.keyCode === 13 ) {
      var iNode = document.createElement('i');
      iNode.innerHTML = codeLineVal.length + 1;
      codeLine.appendChild(iNode);
      // 让codeLine 自动跟随 codeText 回车 滚动
      codeLine.scrollTop = codeLine.scrollHeight;
    }
    if (event.keyCode === 8) {
      removeError();
      if (numLine() !== codeLineVal.length) {
          var num = codeLineVal.length - numLine();
          for (var i = num; i >0 ; i--) {
            codeLine.removeChild(codeLineVal[codeLineVal.length -i]);
          }
      }
    }
};
// 计算codeText 有多少行
function numLine() {
  var num = 0;
  for (var i = 0; i < codeText.value.length; i++) {
      if (codeText.value[i] ==='\n') {
          num++;
      }
  }
  return num + 1;
}

// 给错误代码行添加 错误样式
function addErrorCodeLine() {
    // 正确指令集合
    var trueCode1 = ['TUN LEF','TUN RIG','TUN BAC','TRA LEF','TRA TOP','TRA RIG','TRA BOT','MOV LEF','MOV TOP','MOV RIG','MOV BOT'];
    var trueCode2 = ['TRA LEF','TRA TOP','TRA RIG','TRA BOT','MOV LEF','MOV TOP','MOV RIG','MOV BOT'];
    if (!codeText.value) return;
    var errorLine = codeText.value.split('\n');
    // 找出空白行 并把字符换首尾去空格
    for (var i = 0; i < errorLine.length; i++) {
      errorLine[i] = errorLine[i].trim();
      if (errorLine[i].trim() === '') {
        errorLine[i] = false;
      }
    }
    // 1~10的正整数正则表达式
    var pattern = /^[1-9]d*$/;
   //  把正确的指令设置为false
    for (var n = 0; n < errorLine.length; n++) {
        switch (errorLine[n].length) {
          case 2:  // 'GO' 不带参数
            if (errorLine[n] === 'GO') errorLine[n] = false;
            break;
          case 4:  // 'GO' 带参数
            if (errorLine[n].slice(0, 3) === 'GO ' && pattern.test(parseFloat(errorLine[n].substr(3))))
            errorLine[n] = false;
            break;
          case 5:  // 'BUILD'
            if (errorLine[n] === 'BUILD') errorLine[n] = false;
            break;
          case 11:  // 'BRU color' and 'MOV TO x, y 坐标有一个是双数'
            if (errorLine[n].slice(0, 4) === 'BRU ') {
              errorLine[n] = false;
              break;
            }
            if (errorLine[n].slice(0, 7) === 'MOV TO ') {
                var x1 = charXandY(errorLine[n].substr(7)).x,
                    y1 = charXandY(errorLine[n].substr(7)).y;
                if (x1 > 0 && x1 < 11 && y1 > 0 && y1 < 11) errorLine[n] = false;
            }
            break;
          case 7:  // 'TUN TRA MOV' 不带参数
            for (var j = 0; j < trueCode1.length; j++) {
              if (errorLine[n] === trueCode1[j]) {
                errorLine[n] = false;
                break;
              }
            }
            break;
          case 9:  // 'TRA MOV' 带参数
            for (var k = 0; k < trueCode2.length; k++) {
              if (errorLine[n].substr(0,7) === trueCode2[k] && pattern.test(parseFloat(errorLine[n].substr(7)))) {
                errorLine[n] = false;
                break;
              }
            }
            break;
          case 10:  // 'MOV TO x, y' x,y 单数
              if (errorLine[n].slice(0, 7) === 'MOV TO ') {
                  var x2 = charXandY(errorLine[n].substr(7)).x,
                      y2 = charXandY(errorLine[n].substr(7)).y;
                  if (x2 > 0 && x2 < 10 && y2 > 0 && y2 < 10) errorLine[n] = false;
              }
            break;
          case 12:  // 'MOV TO x, y' x,y 都为双数
              if (errorLine[n].slice(0, 7) === 'MOV TO ') {
                  var x3 = charXandY(errorLine[n].substr(7)).x,
                      y3 = charXandY(errorLine[n].substr(7)).y;
                  if (x3 > 0 && x3 < 11 && y3 > 0 && y3 < 11) errorLine[n] = false;
              }
            break;
        }
    }
    // 给错误的指令添加样式，并返回错误码
   for (var m = 0; m < errorLine.length; m++) {
     if (errorLine[m]) {
       codeLineVal[m].setAttribute('class','error-show');
     }
   }
   for (var g = 0; g < errorLine.length; g++) {
     if (errorLine[g]) {
       return 404;
     }
   }
}

// 删除错误样式提示
function removeError() {
  for (var i = 0; i < codeLineVal.length; i++) {
    if (codeLineVal[i].getAttribute('class') === 'error-show') {
        codeLineVal[i].setAttribute('class','error-hide');
    }
  }
}
