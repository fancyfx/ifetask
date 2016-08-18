
/**
 * UI组件之浮出层
 * [浮出层构造函数]
 * @param {[type]} msg   [显示内容]
 * @param {[type]} title [标题]
 */
function Flyout(msg,title) {
    this.msgNode = {
        msgDIV1:null,      // 浮出层主框体
        titleNode:null,    // 浮出层标题
        contentNode:null,  // 浮出层内容
        trueButton:null,   // 确认按钮
        falseButton:null   // 取消按钮
    };       // 弹窗框 dom
    this.shadeNode = null;     // 弹窗框 node
    this.messageVal =  msg;    // 正文显示内容
    this.titleVal = title;     // 标题内容
    this.isButton = false;     // 点击按钮反馈消息
}

Flyout.prototype.setUI = function () {
    var bodyNode = document.getElementsByTagName('body');
    bodyNode[0].style.overflow = "hidden";     // 禁止窗口滚动
    var jsNode = document.getElementsByTagName('script');
    this.shadeNode = document.createElement('div');
    this.msgNode.msgDIV1 = document.createElement('div');
    bodyNode[0].insertBefore(this.shadeNode,jsNode[0]); // 添加遮罩层 node
    bodyNode[0].insertBefore(this.msgNode.msgDIV1,jsNode[0]);    // 添加弹窗 node
    // 弹窗层 内容
    this.msgNode.titleNode = document.createElement('h4');
    this.msgNode.msgDIV1.appendChild(this.msgNode.titleNode);
    this.msgNode.contentNode = document.createElement('p');
    this.msgNode.msgDIV1.appendChild(this.msgNode.contentNode);
    this.msgNode.falseButton = document.createElement('buttt');
    this.msgNode.msgDIV1.appendChild(this.msgNode.falseButton);
    this.msgNode.trueButton = document.createElement('buttt');
    this.msgNode.trueButton.innerHTML = "确定";
    this.msgNode.msgDIV1.appendChild(this.msgNode.trueButton);


    // 滚动偏移宽度
    var scrollLeft = (typeof window.pageXOffset === "number") ?
                      window.pageXOffset : document.body.scrollLeft;
    // 滚动偏移高度
    var scrollHeight = (typeof window.pageYOffset === "number") ?
                        window.pageYOffset : document.body.scrollTop;
    // 窗口宽
    var viewWidth = (typeof window.innerWidth === "number") ?
                    (window.innerWidth + scrollLeft): (document.documentElement.clientWidth + scrollLeft);

    // 窗口高

    var viewHeight = (typeof window.innerHeight === "number") ?
                        (window.innerHeight + scrollHeight): (document.documentElement.clientHeight + scrollHeight);

    // 遮罩层样式
    this.shadeNode.style.backgroundColor = "rgba(115, 105, 105, 0.3)";
    this.shadeNode.style.width = viewWidth + "px";
    this.shadeNode.style.height = viewHeight+ "px";
    this.shadeNode.style.position= "absolute";
    this.shadeNode.style.top = '0';
    this.shadeNode.style.left = '0';
    this.shadeNode.style.zIndex = "9998";


    // 弹窗层样式
    // 主框样式
    this.msgNode.msgDIV1.style.backgroundColor = "#fff";
    this.msgNode.msgDIV1.style.width = "450px";
    this.msgNode.msgDIV1.style.height = "250px";
    this.msgNode.msgDIV1.style.position= "absolute";
    this.msgNode.msgDIV1.style.top = parseFloat(this.shadeNode.style.height) / 2 -
                                    parseFloat(this.msgNode.msgDIV1.style.height) / 2  + scrollHeight/2 - 80 + "px";
    console.log(this.msgNode.msgDIV1.style.top);
    this.msgNode.msgDIV1.style.left = parseFloat(this.shadeNode.style.width) / 2 - parseFloat(this.msgNode.msgDIV1.style.width) / 2 + "px";
    this.msgNode.msgDIV1.style.zIndex = "9999";

    // 标题样式
    this.msgNode.titleNode.style.width = "440px";
    this.msgNode.titleNode.style.height = "30px";
    this.msgNode.titleNode.style.margin = "0";
    this.msgNode.titleNode.style.padding = "0 0 0 10px";
    this.msgNode.titleNode.style.lineHeight = "30px";
    this.msgNode.titleNode.style.color = "#fff";
    if (this.titleVal) {
      this.msgNode.titleNode.innerHTML = this.titleVal;
      this.msgNode.titleNode.style.backgroundColor = "#a79c9c";
    }

    // 内容样式
    this.msgNode.contentNode.style.width = "400px";
    this.msgNode.contentNode.style.height = "110px";
    this.msgNode.contentNode.style.margin = "30px 20px 0 20px";
    this.msgNode.contentNode.style.textAlign = "center";
    this.msgNode.contentNode.style.lineHeight = "28px";
    this.msgNode.contentNode.style.overflow = "hidden";
    if (this.messageVal) {
      this.msgNode.contentNode.innerHTML = this.messageVal;
    }

    // 取消按钮样式
    this.msgNode.falseButton.style.width = "80px";
    this.msgNode.falseButton.style.height = "30px";
    this.msgNode.falseButton.style.margin = "30px 20px 0 0";
    this.msgNode.falseButton.style.border = "none";
    this.msgNode.falseButton.style.outline = "none";
    this.msgNode.falseButton.style.float = "right";
    this.msgNode.falseButton.style.textAlign = "center";
    this.msgNode.falseButton.style.lineHeight = "30px";
    this.msgNode.falseButton.style.backgroundColor = "#c3bdbd";
    this.msgNode.falseButton.style.cursor = "pointer";
    this.msgNode.falseButton.innerHTML = "取消";
    // 确认按钮样式
    this.msgNode.trueButton.style.width = "80px";
    this.msgNode.trueButton.style.height = "30px";
    this.msgNode.trueButton.style.margin = "30px 20px 0 0";
    this.msgNode.trueButton.style.border = "none";
    this.msgNode.trueButton.style.outline = "none";
    this.msgNode.trueButton.style.float = "right";
    this.msgNode.trueButton.style.textAlign = "center";
    this.msgNode.trueButton.style.lineHeight = "30px";
    this.msgNode.trueButton.style.backgroundColor = "#c3bdbd";
    this.msgNode.trueButton.style.cursor = "pointer";


    // 弹出层按钮点击事件
    // 取消
    var that = this;
    this.msgNode.falseButton.onclick = function () {
        that.onHidden();  // 点击隐藏弹框
        that.isButton =  false;
    };
    // 确定
    this.msgNode.trueButton.onclick = function () {
        that.onHidden(); // 点击隐藏弹框
        that.isButton =  true;
    };
    this.shadeNode.onclick = function () {
        that.onHidden();
    };
    bodyNode[0].onresize = function () {       // 添加窗口大小改变方法
      // 滚动偏移宽度
      var scrollLeft1 = (typeof window.pageXOffset === "number") ?
                        window.pageXOffset : document.body.scrollLeft;
      // 滚动偏移高度
      var scrollHeight1 = (typeof window.pageYOffset === "number") ?
                          window.pageYOffset : document.body.scrollTop;
      // 窗口宽
      var viewWidth1 = (typeof window.innerWidth === "number") ?
                      (window.innerWidth + scrollLeft1): (document.documentElement.clientWidth + scrollLeft1);

      // 窗口高

      var viewHeight1 = (typeof window.innerHeight === "number") ?
                          (window.innerHeight + scrollHeight1): (document.documentElement.clientHeight + scrollHeight1);
      that.shadeNode.style.width = viewWidth1 + "px";
      that.shadeNode.style.height = viewHeight1+ "px";
      that.msgNode.msgDIV1.style.top = parseFloat(that.shadeNode.style.height) / 2 -
                                     parseFloat(that.msgNode.msgDIV1.style.height) / 2 + scrollHeight1/2 - 80 + "px";
      that.msgNode.msgDIV1.style.left = parseFloat(that.shadeNode.style.width) / 2 -
                                      parseFloat(that.msgNode.msgDIV1.style.width) / 2 + "px";
    };
};

// 点击隐藏(删除元素)
Flyout.prototype.onHidden = function () {
  this.msgNode.msgDIV1.parentNode.removeChild(this.msgNode.msgDIV1);
  this.shadeNode.parentNode.removeChild(this.shadeNode);
  var bodyNode = document.getElementsByTagName('body');
  bodyNode[0].removeAttribute('style');
};
