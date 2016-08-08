/**
 * 获取页面元素
 */
var myFrom = document.getElementById('myFrom');
// 输入框
var myInput = myFrom.getElementsByTagName('input');
// 提交按钮
var myButton = myFrom.getElementsByTagName('button')[0];
// 说明标签
var descSpan = myFrom.getElementsByTagName('span');
// 名称
var nameInput = myInput[0];
var nameDesc = descSpan[0];
// 密码
var passwordInput = myInput[1];
var passwordDesc = descSpan[1];
// 密码确认
var passwordTwoInput = myInput[2];
var passwordTwoDesc = descSpan[2];
// 邮箱
var emailInput = myInput[3];
var emailDesc = descSpan[3];
// 手机
var phoneInput = myInput[4];
var phoneDesc = descSpan[4];

/**
 * 触发表单事件
 */
// 名称
nameInput.onfocus = function () {
    nameDesc.style.display = "block";
};
nameInput.onblur = function () {
    nameChecking();
};
// 密码
passwordInput.onfocus = function () {
    passwordDesc.style.display = "block";
};
passwordInput.onblur = function () {
    passwordChecking();
};
// 密码验证
passwordTwoInput.onfocus = function () {
    passwordTwoDesc.style.display = "block";
};
passwordTwoInput.onblur = function () {
    passwordTwoChecking();
};
// 邮箱
emailInput.onfocus = function () {
    emailDesc.style.display = "block";
};
emailInput.onblur = function () {
    emailChecking();
};
// 手机
phoneInput.onfocus = function () {
    phoneDesc.style.display = "block";
};
phoneInput.onblur = function () {
    phoneChecking();
};

/**
 * 提交验证
 */
myButton.onclick = function () {
   var name = nameChecking(),
        password = passwordChecking(),
        passwordTwo = passwordTwoChecking() ,
        email = emailChecking(),
        phone = phoneChecking();
    if (name && password && passwordTwo && email && phone) {
        alert("提交成功");
    }else {
      alert("输入有误");
    }
};
/**
 * 表单验证处理逻辑
 */
// 名称验证
function nameChecking() {
  if (nameInput.value.gblen() === 0) {
    nameDesc.innerHTML = "姓名不能为空";
    nameDesc.style.color = "#f00";
    nameInput.style.borderColor = "#f00";
    nameDesc.style.display = "block";
    return false;
  }else if (nameInput.value.gblen() < 4 && nameInput.value.gblen() > 0) {
    nameDesc.innerHTML = "长度必须为4~16个字符";
    nameDesc.style.color = "#f00";
    nameInput.style.borderColor = "#f00";
    nameDesc.style.display = "block";
    return false;
  }else if (nameInput.value.gblen()  > 16) {
    nameDesc.innerHTML = "长度必须为4~16个字符";
    nameDesc.style.color = "#f00";
    nameInput.style.borderColor = "#f00";
    nameDesc.style.display = "block";
    return false;
  }else {
    nameDesc.innerHTML = "名称格式正确";
    nameDesc.style.color = "#2ee461";
    nameDesc.style.display = "block";
    nameInput.style.borderColor = "#2ee461";
    return true;
  }
}
// 密码
function passwordChecking() {
    var pattern = /^(?![a-zA-z]+$)(?=^.{6,12}$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    if (passwordInput.value.length === 0) {
      passwordDesc.innerHTML = "密码不能为空";
      passwordDesc.style.color = "#f00";
      passwordInput.style.borderColor = "#f00";
      passwordDesc.style.display = "block";
      return false;
    }else if (pattern.test(passwordInput.value)) {
      passwordDesc.innerHTML = "密码填写正确";
      passwordDesc.style.color = "#2ee461";
      passwordDesc.style.display = "block";
      passwordInput.style.borderColor = "#2ee461";
      return true;
    }else {
      passwordDesc.innerHTML = "密码错误，由6~12位的字母+数字或字符组成，区分大小";
      passwordDesc.style.color = "#f00";
      passwordInput.style.borderColor = "#f00";
      passwordDesc.style.display = "block";
      return false;
    }
}
// 密码确认
function passwordTwoChecking() {
    if (passwordTwoInput.value.length === 0) {
      passwordTwoDesc.innerHTML = "密码不能为空";
      passwordTwoDesc.style.color = "#f00";
      passwordTwoDesc.style.display = "block";
      passwordTwoInput.style.borderColor = "#f00";
    }else if (passwordInput.value === passwordTwoInput.value && passwordChecking()) {
      passwordTwoDesc.innerHTML = "密码填写正确";
      passwordTwoDesc.style.color = "#2ee461";
      passwordTwoDesc.style.display = "block";
      passwordTwoInput.style.borderColor = "#2ee461";
      return true;
    }else {
      passwordTwoDesc.innerHTML = "密码不正确，请重新填写";
      passwordTwoDesc.style.color = "#f00";
      passwordTwoDesc.style.display = "block";
      passwordTwoInput.style.borderColor = "#f00";
      return false;
    }
}
// 邮箱
function emailChecking() {
  var pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (emailInput.value.length === 0) {
    emailDesc.innerHTML = "邮箱不能为空";
    emailDesc.style.color = "#f00";
    emailInput.style.borderColor = "#f00";
    emailDesc.style.display = "block";
    return false;
  }else if (pattern.test(emailInput.value)) {
    emailDesc.innerHTML = "邮箱填写正确";
    emailDesc.style.color = "#2ee461";
    emailDesc.style.display = "block";
    emailInput.style.borderColor = "#2ee461";
    return true;
  }else {
    emailDesc.innerHTML = "邮箱填写错误";
    emailDesc.style.color = "#f00";
    emailInput.style.borderColor = "#f00";
    emailDesc.style.display = "block";
    return false;
  }
}
// 手机
function phoneChecking() {
  var pattern = /1\d{10}/;
  if (phoneInput.value.length === 0) {
    phoneDesc.innerHTML = "手机号不能为空";
    phoneDesc.style.color = "#f00";
    phoneInput.style.borderColor = "#f00";
    phoneDesc.style.display = "block";
    return false;
  }else if (pattern.test(phoneInput.value)) {
    phoneDesc.innerHTML = "手机号填写正确";
    phoneDesc.style.color = "#2ee461";
    phoneDesc.style.display = "block";
    phoneInput.style.borderColor = "#2ee461";
    return true;
  }else {
    phoneDesc.innerHTML = "手机号填写错误";
    phoneDesc.style.color = "#f00";
    phoneInput.style.borderColor = "#f00";
    phoneDesc.style.display = "block";
    return false;
  }
}

/**
 * 计算字符串长度(英文占1个字符，中文汉字占2个字符)
 * @return 字符串长度
 */
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
