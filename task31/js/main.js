/**
 * 获取页面dom
 */
// 单选框
var radioDiv = document.getElementById('radio');
var radioInput = radioDiv.getElementsByTagName('input');
// 下拉框
var selectDiv = document.getElementById('select');
var select = selectDiv.getElementsByTagName('select');
// 输入框
var inputDiv = document.getElementById('input');
var input = inputDiv.getElementsByTagName('input');

// 单选框点击事件
// 在校生
radioInput[0].onclick = function () {
  if (radioInput[0].checked) {
    selectDiv.style.display = "block";
    inputDiv.style.display = "none";
  }
};
// 非在校生
radioInput[1].onclick = function () {
  if (radioInput[1].checked) {
    selectDiv.style.display = "none";
    inputDiv.style.display = "block";
  }
};

// 下拉框点击事件
select[0].onchange = function () {
  switch (select[0].value) {
    case "北京":
      select[1].style.display = "inline-block";
      select[2].style.display = "none";
      select[3].style.display = "none";
      break;
    case "武汉":
      select[1].style.display = "none";
      select[2].style.display = "inline-block";
      select[3].style.display = "none";
      break;
    case "上海":
      select[1].style.display = "none";
      select[2].style.display = "none";
      select[3].style.display = "inline-block";
      break;
  }
};
