/**
 * 获取页面元素
 */
var myFrom = document.getElementById('myFrom');
// 输入框
var myInput = myFrom.getElementsByTagName('input')[0];
// 验证按钮
var myButton = myFrom.getElementsByTagName('button')[0];
// 说明显示标签
var descSpan = myFrom.getElementsByTagName('span')[0];
myButton.onclick = function () {
  if (myInput.value.gblen() === 0) {
    descSpan.innerHTML = "姓名不能为空";
    descSpan.style.color = "#f00";
    myInput.style.borderColor = "#f00";
  }else if (myInput.value.gblen() < 4 && myInput.value.gblen() > 0) {
    descSpan.innerHTML = "长度必须为4~16个字符";
    descSpan.style.color = "#f00";
    myInput.style.borderColor = "#f00";
  }else if (myInput.value.gblen()  > 16) {
    descSpan.innerHTML = "长度必须为4~16个字符";
    descSpan.style.color = "#f00";
    myInput.style.borderColor = "#f00";
  }else {
    descSpan.innerHTML = "名称格式正确";
    descSpan.style.color = "#2ee461";
    myInput.style.borderColor = "#2ee461";
  }
};

// 计算字符串长度(英文占1个字符，中文汉字占2个字符)
String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)> 127 || this.charCodeAt(i)==94) {
             len += 2;
         } else {
             len ++;
         }
     }
    return len;
} ;
