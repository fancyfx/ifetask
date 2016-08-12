/**
 * 命令 输入框处理逻辑
 */
// 命令输入框
var codeText = document.getElementById('codeText');
// 代码行数条
var codeLine = document.getElementById('codeLine');
var codeLineVal = codeLine.getElementsByTagName('i');

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
          console.log(num);
          for (var i = num; i >0 ; i--) {
            codeLine.removeChild(codeLineVal[codeLineVal.length -i]);
            console.log(codeLineVal.length -i);
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
    var trueCode = ['GO','TUN LEF','TUN RIG','TUN BAC','TRA LEF','TRA TOP','TRA RIG','TRA BOT','MOV LEF','MOV TOP','MOV RIG','MOV BOT'];
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
      for (var j = 0; j < trueCode.length; j++) {
        // 命令是 'GO' 的情况
        if (errorLine[n]) {
          if (errorLine[n].substr(0,2) === 'GO')
            if(pattern.test(parseFloat(errorLine[n].substr(3))) || errorLine[n].substr(3) === ''){
                errorLine[n] = false;
            }
        }

        if (errorLine[n]) {
          // 判断指令是否在 指令集合里面
          if (errorLine[n].substr(0,7) === trueCode[j] ) {
            // 排除 'TUN' 指令带参数
              if (errorLine[n].substr(0,3) !== 'TUN') {
                if(pattern.test(parseFloat(errorLine[n].substr(7))) || errorLine[n].substr(7) === ''){
                    errorLine[n] = false;
                }
              }else if(errorLine[n].substr(7) === ''){
                 errorLine[n] = false;
              }
          }
        }

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
