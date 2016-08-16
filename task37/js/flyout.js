/**
 * UI组件之浮出层
 */

function setUI() {
    var bodyNode = document.getElementsByTagName('body');
    var jsNode = document.getElementsByTagName('script');
    var shade = document.createElement('div');
    var messgDiv = document.createElement('div');
    bodyNode[0].insertBefore(shade,jsNode[0]); // 添加遮罩层 node
    bodyNode[0].insertBefore(messgDiv,jsNode[0]);    // 添加弹窗 node
    // 窗口宽
    var viewWidth = (typeof window.innerWidth === "number") ? window.innerWidth : document.documentElement.clientWidth;
    // 窗口高
    var viewHeight = (typeof window.innerHeight === "number") ? window.innerHeight : document.documentElement.clientHeight;
    // 遮罩层样式
    shade.style.backgroundColor = "rgba(115, 105, 105, 0.3)";
    shade.style.width = viewWidth + "px";
    shade.style.height = viewHeight+ "px";
    shade.style.position= "absolute";
    shade.style.top = '0';
    shade.style.left = '0';
    shade.style.zIndex = "9998";
    shade.setAttribute('onclick','onHidden(this)');
    bodyNode[0].setAttribute('onresize',"chengSize()");
    // 弹窗层样式
    messgDiv.style.backgroundColor = "#fff";
    messgDiv.style.width = "450px";
    messgDiv.style.height = "250px";
    messgDiv.style.position= "absolute";
    messgDiv.style.top = parseFloat(shade.style.height) / 2 - parseFloat(messgDiv.style.height) / 2  - 80 + "px";
    messgDiv.style.left = parseFloat(shade.style.width) / 2 - parseFloat(messgDiv.style.width) / 2 + "px";
    messgDiv.style.zIndex = "9999";
    // 禁止窗口滚动
    bodyNode[0].style.overflow = "hidden";

    // 弹窗层 内容
    var titleNode = document.createElement('h4');
    titleNode.style.width = "440px";
    titleNode.style.height = "30px";
    titleNode.style.margin = "0";
    titleNode.style.padding = "0 0 0 10px";
    titleNode.style.lineHeight = "30px";
    titleNode.style.color = "#fff";
    titleNode.innerHTML = "标题";
    titleNode.style.backgroundColor = "#a79c9c";
    messgDiv.appendChild(titleNode);
    var contentNode = document.createElement('p');
    contentNode.style.width = "400px";
    contentNode.style.height = "110px";
    contentNode.style.margin = "30px 20px 0 20px";
    contentNode.style.textAlign = "center";
    contentNode.style.lineHeight = "28px";
    contentNode.style.overflow = "hidden";
    contentNode.innerHTML = "这是一个浮出浮出层浮出层浮出层浮出层浮出层 浮出层浮出层浮出层";
    messgDiv.appendChild(contentNode);
    var button1 = document.createElement('buttt');
    button1.style.width = "80px";
    button1.style.height = "30px";
    button1.style.margin = "30px 20px 0 0";
    button1.style.border = "none";
    button1.style.outline = "none";
    button1.style.float = "right";
    button1.style.textAlign = "center";
    button1.style.lineHeight = "30px";
    button1.style.backgroundColor = "#c3bdbd";
    button1.style.cursor = "pointer";
    button1.innerHTML = "取消";
    messgDiv.appendChild(button1);
    var button2 = document.createElement('buttt');
    button2.style.width = "80px";
    button2.style.height = "30px";
    button2.style.margin = "30px 20px 0 0";
    button2.style.border = "none";
    button2.style.outline = "none";
    button2.style.float = "right";
    button2.style.textAlign = "center";
    button2.style.lineHeight = "30px";
    button2.style.backgroundColor = "#c3bdbd";
    button2.style.cursor = "pointer";
    button2.innerHTML = "确定";
    messgDiv.appendChild(button2);

    // 弹出层按钮点击事件
    // 取消
    button1.onclick = function () {
        onHidden(shade);  // 点击隐藏弹框
        return false;
    };
    // 确定
    button2.onclick = function () {
        onHidden(shade); // 点击隐藏弹框
        return true;
    };
}

// 点击隐藏
function onHidden(obj) {
    obj.parentNode.removeChild(obj.nextSibling);
    obj.parentNode.removeChild(obj);
    var bodyNode = document.getElementsByTagName('body');
    bodyNode[0].removeAttribute('onresize');
    bodyNode[0].removeAttribute('style');
}

function chengSize() {
  var bodyNode = document.getElementsByTagName('body');
  var div = bodyNode[0].getElementsByTagName('div');
  var shadeNode = div[div.length - 2];
  var messgNode = div[div.length - 1];
  var viewWidth = (typeof window.innerWidth === "number") ? window.innerWidth : document.documentElement.clientWidth;
  var viewHeight = (typeof window.innerHeight === "number") ? window.innerHeight : document.documentElement.clientHeight;
  shadeNode.style.width = viewWidth + "px";
  shadeNode.style.height = viewHeight+ "px";
  messgNode.style.top = parseFloat(shadeNode.style.height) / 2 -
                                 parseFloat(messgNode.style.height) / 2  - 80 + "px";
  messgNode.style.left = parseFloat(shadeNode.style.width) / 2 -
                                  parseFloat(messgNode.style.width) / 2 + "px";
}
