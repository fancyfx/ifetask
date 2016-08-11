/**
 * 命令 输入框处理逻辑
 */
// 命令输入框
var codeText = document.getElementById('codeText');
// 代码行数条
var codeLine = document.getElementById('codeLine');
var codeLineVal = codeLine.getElementsByTagName('i');

codeText.onkeyup = function (event) {

    if (event.keyCode === 13) {
      var iNode = document.createElement('i');
      iNode.innerHTML = codeLineVal.length + 1;
      codeLine.appendChild(iNode);
      // 让codeLine 自动跟随 codeText 回车 滚动
      codeLine.scrollTop = codeLine.scrollHeight;
    }
    if (codeLineVal.length !== numLine()) {
      codeLine.removeChild(codeLineVal[codeLineVal.length - 1]);
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
   //  把正确的指令设置为false
    for (var n = 0; n < errorLine.length; n++) {
      for (var j = 0; j < trueCode.length; j++) {
        if (errorLine[n] === trueCode[j]) {
            errorLine[n] = false;
        }
      }
    }
    // 给错误的指令添加样式，并返回错误码
   for (var m = 0; m < errorLine.length; m++) {
     if (errorLine[m]) {
       codeLineVal[m].setAttribute('class','error-show');
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
