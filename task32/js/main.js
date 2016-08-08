/*
使用说明：
  1.必须在本组件必须放到一个 id=fxFrom 的容器
  示例： <div id="fxFrom"></div>  创建一个这样的div即可

  2.创建一个 FxFrom 构造函数函数 并执行 addThis() 即创建成功
  FxFrom 参数说明：
  cssVal     [自定义样式class标签名称]
  labelVal   [表单标签]
  typeVal    [表单类型]
  testingVal [表单验证规则]
  默认规则有：  charLenChecking（字符串长度为4~16位验证）
              passwordChecking(密码验证  由6~12位的字母+数字或字符组成，区分大小)
              emailChecking(邮箱验证)
              phoneChecking(简单手机号验证)

  3.暂时只支持 input创建
 */

window.onload = function () {
  var phone = new FxFrom('手机','input',phoneChecking,'phone');
  phone.addThis(phone);
  var email = new FxFrom('邮箱','input',emailChecking);
  email.addThis(email);
};

// 配置
/**
 * [配置表单组件属性]
 * @param {[type]} cssVal     [自定义样式class标签名称]
 * @param {[type]} labelVal   [表单标签]
 * @param {[type]} typeVal    [表单类型]
 * @param {[type]} testingVal [表单验证规则]  默认规则有：  charLenChecking（字符串长度为4~16位验证）
 *                                                      passwordChecking(密码验证  由6~12位的字母+数字或字符组成，区分大小)
 *                                                      emailChecking(邮箱验证)
 *                                                     phoneChecking(简单手机号验证)
 *
 */
function FxFrom(labelVal, typeVal, testingVal, cssVal) {
    this.label = labelVal;
    this.type = typeVal;
    this.testing = function (value) {
             return  testingVal(value);
          };
    this.cssName = cssVal;
}
FxFrom.prototype.addThis = function (obj) {
    createFrom(obj);
};


// 生成
function createFrom(configVal) {

    // 添加表单元素
    var fxFromId = document.getElementById('fxFrom');
    if (!fxFromId) return;
    var label = document.createElement('label');
    label.innerHTML = configVal.label;
    var type = document.createElement(configVal.type);
    type.style.border = "1px solid rgb(169, 173, 167)";
    type.style.margin = "0 10px 0 10px";
    var span = document.createElement('span');
    var div = document.createElement('div');
    div.style.margin = "0 0 10px 0";
    div.setAttribute('class',configVal.cssName);
    fxFromId.appendChild(div);
    div.appendChild(label);
    div.appendChild(type);
    div.appendChild(span);
    // 应用验证规则
    var validator = configVal.testing(type.value);
    span.innerHTML = validator.startDescVal;
    // 添加触发验证规则逻辑
    type.onblur = function () {
        validator = configVal.testing(type.value);
        span.innerHTML = validator.descVal;
        if (validator.charLenBlooVal) {
          type.style.borderColor = "#2ee461";
          span.style.color = "#2ee461";
        }else {
          type.style.borderColor = "#f00";
          span.style.color = "#f00";
        }


    };
  }
// 样式


// 验证
/**
 * 表单验证处理逻辑
 */

// 字符串长度为4~16位验证
function charLenChecking(value) {

  var charLenBloo , desc  ;
  if (value.gblen() === 0) {
    desc = "不能为空";
    charLenBloo = false;
  }else if (value.gblen() < 4 && value.gblen() > 0) {
    desc = "长度过短，必须为4~16个字符";
    charLenBloo = false;
  }else if (value.gblen()  > 16) {
    desc = "长度过长，必须为4~16个字符";
    charLenBloo = false;
  }else {
    desc = "格式正确";
    charLenBloo = true;
  }
  return {
    charLenBlooVal:charLenBloo,
    descVal:desc,
    startDescVal:"必填，长度为4~16位字符"
  };
}
// 密码验证  由6~12位的字母+数字或字符组成，区分大小
function passwordChecking(value) {
    var charLenBloo , desc;
    var pattern = /^(?![a-zA-z]+$)(?=^.{6,12}$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    if (value.length === 0) {
      desc = "密码不能为空";
      charLenBloo = false;
    }else if (pattern.test(value)) {
      desc = "密码填写正确";
      charLenBloo =  true;
    }else {
      desc = "密码错误，由6~12位的字母+数字或字符组成，区分大小";
      charLenBloo = false;
    }
    return {
      charLenBlooVal:charLenBloo,
      descVal:desc,
      startDescVal:"必填，由6~12位的字母+数字或字符组成，区分大小"
    };
}

// 邮箱
function emailChecking(value) {
  var charLenBloo , desc;
  var pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (value.length === 0) {
    desc = "邮箱不能为空";
    charLenBloo = false;
  }else if (pattern.test(value)) {
    desc = "邮箱填写正确";
    charLenBloo = true;
  }else {
    desc = "邮箱填写错误";
    charLenBloo = false;
  }
  return {
    charLenBlooVal:charLenBloo,
    descVal:desc,
    startDescVal:"必填，请输入邮箱地址"
  };
}
// 手机
function phoneChecking(value) {
  var charLenBloo , desc;
  var pattern = /1\d{10}/;
  if (value.length === 0) {
    desc = "手机号不能为空";
    charLenBloo = false;
  }else if (pattern.test(value)) {
    desc = "手机号填写正确";
    charLenBloo = true;
  }else {
    desc = "手机号填写错误";
    charLenBloo = false;
  }
  return {
    charLenBlooVal:charLenBloo,
    descVal:desc,
    startDescVal:"必填，请输入手机号码"

  };
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
