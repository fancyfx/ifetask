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
