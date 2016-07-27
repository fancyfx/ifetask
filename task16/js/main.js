/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
// 获取输入DOM
var cityName = document.getElementById("aqi-city-input");
var airValue = document.getElementById("aqi-value-input");
var button = document.getElementById("add-btn");
var yzCity = document.getElementById("aqi-city-verification");
var yzValue = document.getElementById("aqi-value-verification");
var list = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，并验证是否正确
 * 然后aqiData 填充数据
 */
function verification() {
    // 创建中英文输入正则表达式
    var patternCityName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    // 创建正整数输入正则表达式
    var patternAirValue = /^\d+$/;
    // 保存验证输入数据合法性
    var cityNameBool = patternCityName.test(cityName.value);
    var airValueBool = patternAirValue.test(airValue.value);
    // 声明接受城市名称和空气质量数据变量
    var dataAirValue, dataCityName;
    //判读城市信息输入是否正确
    if (cityNameBool) {
        // 接收城市信息数据
        dataCityName = cityName.value;
        yzCity.innerHTML = "";
    } else {
        yzCity.innerHTML = "您的输入有误，请重新输入！请输入正确的城市名称，由中文或者英文字母组成！";
    }
    // 判读空气质量信息输入是否正确
    if (airValueBool) {
        // 接收空气质量信息数据
        dataAirValue = airValue.value;
        yzValue.innerHTML = "";
    } else {
        yzValue.innerHTML = "您的输入有误，请重新输入！请输入正整数！";
    }
    // 存储城市名称和空气质量数据到字符串aqiData
    if (cityNameBool && airValueBool) {
        aqiData = dataCityName + ":" + dataAirValue;
    }
}
/**
 * 数据添加逻辑处理
 * 首先创建样式
 * 然后添加数据项
 */
function addAqiData() {
    // 创建1个tr 3个td 1个button标签
    var myTr = document.createElement("tr");
    var myTd1 = document.createElement("td");
    var myTd2 = document.createElement("td");
    var myTd3 = document.createElement("td");
    var remButton = document.createElement("button");
    // 给第一个td标签赋值 城市名称数据
    myTd1.innerHTML = aqiData.split(":", 2)[0];
    // 给第二个td标签赋值 空气质量数据
    myTd2.innerHTML = aqiData.split(":", 2)[1];
    // 给button标签 添加txt
    remButton.innerHTML = "删除";
    // 给button标签 添加onclick 属性 同时添加 删除函数；这里注意setAttribute 对象第二参数如果不加"" 就直接执行 加"" 就是添加字符串
    remButton.setAttribute("onclick", "delBtnHandle(this);");
    // 添加 tr标签
    var tr1 = list.appendChild(myTr);
    // 给tr标签 添加3个td标签 注意：创建了几个标签 才能添加几个标签
    tr1.appendChild(myTd1);
    tr1.appendChild(myTd2);
    tr1.appendChild(myTd3);
    // 给第三个td标签 添加button
    myTd3.appendChild(remButton);

}

// /**
//  * 渲染aqi-table表格
//  */
// function renderAqiList() {
// 	// list.innerHTML = "<tr><td>北京</td><td>90</td><td><button>删除</button></td></tr>";
// }

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，验证用户输入合法性并保存到aqiData，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    verification();
    addAqiData();
}
/**
 * 点击删除按钮的时候的处理逻辑
 * 删除当前列
 */
function delBtnHandle(obj) {
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
}
/**
 * 点击添加按钮onclick事件
 * 执行数据添加函数addBtnHandle()
 */
button.onclick = function() {
    addBtnHandle();
};
