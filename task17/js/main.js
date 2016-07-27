/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
/**
 * 获取页面dom元素
 */
// 获取select 城市下拉节点
var selectCity = document.getElementById('city-select');
// 获取柱状图标题节点
var wrapTitle = document.getElementById("chart-wrap-title");
// 获取柱状图渲染区域节点
var wrap = document.getElementById("chart-wrap");
// 获取日期选择框"日"节点
var graTimeDay = document.getElementById("gra-time-day");
// 获取日期选择框"周"节点
var graTimeWeek = document.getElementById("gra-time-week");
// 获取日期选择框"月"节点
var graTimeMonth = document.getElementById("gra-time-month");
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var aqiSourceDataCity = Object.keys(aqiSourceData);
  for (var i = 0; i < aqiSourceDataCity.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.innerHTML = aqiSourceDataCity[i];
    selectCity.appendChild(option);
  }
}
/**
 * select发生变化时的处理函数
 */
 function citySelectChange() {
  // 确定是否选项发生了变化
  selectCity.onchange = function(){
      if (graTimeDay.checked ) {
        clearText();
        renderChartDay();
    }
    if (graTimeWeek.checked ) {
        clearText();
        renderChartWeek();
    }
    if (graTimeMonth.checked ) {
        clearText();
        renderChartMonth();
    }
   }; 
}
/**
 * 每月空气质量柱状图
 */
function renderChartMonth() {
// 获取aqiSourceData 对象所有的城市名称 存储为一个数组myCityName
var myCityName = Object.keys(aqiSourceData);
// 把页面城市下拉框当前选择的值 赋值给 citySelectValue
var citySelectValue = parseInt(selectCity.value);
// 把当前选择的城市名称 赋值给 cityValueName
var cityValueName = myCityName[citySelectValue];
// 把当前城市对象的空气数据 赋值给 myDate
var myDate = aqiSourceData[cityValueName];
// 把城市的每天的日期数据 赋值给myDay myDay保存为一个数组
var myDay = Object.keys(myDate);
// 添加标题数据
    wrapTitle.innerHTML = cityValueName +"每月空气质量柱状图";
// 保存每个月的 空气质量总和
    var heightValue1 = 0 , heightValue2 = 0, heightValue3 = 0;
// 计算第一个与的空气质量总和
    for (var i = 0; i < 31; i++) {
      heightValue1 += myDate[myDay[i]];
    }
// 计算第2个与的空气质量总和
    for (var i = 31; i < 60; i++) {
      heightValue2 += myDate[myDay[i]];
    }
// 计算第3个与的空气质量总和
    for (var i = 60; i < 91; i++) {
      heightValue3 += myDate[myDay[i]];
    }
// 计算每个月的空气质量平均值 保存为monthArryNum 数组
    var monthArryNum = [heightValue1 / 31,heightValue2 / 29,heightValue3 / 31]
// 渲染柱状图
    for (var i = 0; i < 3; i++) {
      var block = document.createElement("span");
      var title = "日期：2016年" +(i + 1)+ "月" +"  "+"空气质量平均值是：" + parseInt(monthArryNum[i]);
      block.setAttribute("title",title);
      wrap.appendChild(block);
      var heightValue = parseInt(monthArryNum[i])  + "px";
       block.style.height = heightValue;
       block.className = "month"; 
    }
}
/**
 * 每星期空气质量柱状图
 */
function renderChartWeek() {
// 获取aqiSourceData 对象所有的城市名称 存储为一个数组myCityName
var myCityName = Object.keys(aqiSourceData);
// 把页面城市下拉框当前选择的值 赋值给 citySelectValue
var citySelectValue = parseInt(selectCity.value);
// 把当前选择的城市名称 赋值给 cityValueName
var cityValueName = myCityName[citySelectValue];
// 把当前城市对象的空气数据 赋值给 myDate
var myDate = aqiSourceData[cityValueName];
// 把城市的每天的日期数据 赋值给myDay myDay保存为一个数组
var myDay = Object.keys(myDate);
// 添加标题数据
    wrapTitle.innerHTML = cityValueName +"每星期空气质量柱状图";
// 创建 heightValueArray 保存每周平均值
    var heightValueArray = [];
// 保存第一周的平均值 
    var heightValueNumFirst = 0;
// 保存最后一周的平均值
    var heightValueNumLast = 0;
// 保存 除了第一周和最后一周 空气质量总和
    var heightValueNum = [0,0,0,0,0,0,0,0,0,0,0,0];
// 计算第一周 平局值 第一周只有2天
    for (var i = 0; i < 2; i++) {
         heightValueNumFirst += myDate[myDay[i]];
    }
    heightValueArray[0] = parseInt(heightValueNumFirst / 2);
// 计算最后一周 平局值 最后一周有5天
    for (var i = 86; i < 91; i++) {
         heightValueNumLast += myDate[myDay[i]];
    }
    heightValueArray[13] = parseInt(heightValueNumLast / 5);
// 计算 除了第一周和最后一周 空气质量总和
    for (var i = 0; i < 12; i++) {
       var n = 3 + (7 * i);
       var m = 10 + (7 * i);
      for (var j = n; j < m ; j++) {
        heightValueNum[i] += myDate[myDay[j]];
      }
    }
// 计算 除了第一周和最后一周 空气质量平局值
    for (var i = 1; i < 13; i++) {
      heightValueArray[i] = parseInt(heightValueNum[i - 1] / 7) ;
    }
// 渲染每周空气质量柱状图
    for (var i = 0; i < 14; i++) {
      var block = document.createElement("span");
      var title = "第" +(i + 1)+ "周" +"  "+"空气质量平均值是：" + heightValueArray[i];
      block.setAttribute("title",title);
      wrap.appendChild(block);
      var heightValue = heightValueArray[i]  + "px";
       block.style.height = heightValue;
       block.className = "week"; 
    }
}
// renderChartWeek();
/**
 * 每天空气质量柱状图
 */
function renderChartDay() {
// 获取aqiSourceData 对象所有的城市名称 存储为一个数组myCityName
var myCityName = Object.keys(aqiSourceData);
// 把页面城市下拉框当前选择的值 赋值给 citySelectValue
var citySelectValue = parseInt(selectCity.value);
// 把当前选择的城市名称 赋值给 cityValueName
var cityValueName = myCityName[citySelectValue];
// 把当前城市对象的空气数据 赋值给 myDate
var myDate = aqiSourceData[cityValueName];
// 把城市的每天的日期数据 赋值给myDay myDay保存为一个数组
var myDay = Object.keys(myDate);
// 添加标题数据
    wrapTitle.innerHTML = cityValueName + "每天空气质量柱状图";
// 渲染每天的空气质量柱状图
    for (var i = 0; i < 92; i++) {
      var block = document.createElement("span");
      var title = "日期：" + myDay[i] +"  "+"空气质量：" +myDate[myDay[i]];
      block.setAttribute("title",title);
      wrap.appendChild(block);
      var heightValue = (myDate[myDay[i]]) + "px";
       block.style.height = heightValue;  
       block.className = "day";    
    }
}
/**  
 *创建清空函数
 *防止页面选项发什么变化时 显示错误 
 */
function clearText() {
    var clearText = document.getElementById("chart-wrap");
    for (var i = clearText.childNodes.length - 1; i >= 0; i--) {
        var x = clearText.removeChild(clearText.childNodes[i]);
        x = null;
    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  graTimeDay.onchange = function(){
    if (graTimeDay.checked ) {
        clearText();
        renderChartDay();
    }
  };
  graTimeWeek.onchange = function(){
    if (graTimeWeek.checked ) {
        clearText();
        renderChartWeek();
    }
  };
  graTimeMonth.onchange = function(){
    if (graTimeMonth.checked ) {
        clearText();
        renderChartMonth();
    }
  };
  }
/**
 * 页面加载完场之后 初始化图表需要的数据格式
 */
function initAqiChartData() {
      renderChartDay();
}
/**
 * 初始化函数
 */
function init() {
  initCitySelector();
  initAqiChartData();
  citySelectChange();
  graTimeChange();
}
init();
