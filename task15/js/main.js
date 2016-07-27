//获取 resort 节点
var myUl = document.getElementById("resort");
//获取 sort-btn 节点
var sortbtn = document.getElementById("sort-btn");
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    var source = document.getElementById("source");
    var sourceLi = source.getElementsByTagName("li")
        //创建二维数组
        // 首先创建一个一维数组
    var data = new Array();
    // 在一维数组的基础上 循环创建二维数组
    for (var i = 0, len = sourceLi.length; i < len; i++) {
        data[i] = new Array();
    }
    // 给data填充数据
    for (var i = 0, len = sourceLi.length; i < len; i++) {
        //获取数据
        var mySource = sourceLi[i].innerHTML;
        // 截取城市数据
        var myCity = mySource.substr(0, 2);
        // 截取空气质量数据
        var myValue = mySource.substr(-6, 2);
        data[i][0] = myCity;
        data[i][1] = myValue;
    }
    return data;

}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    //1.对数组进行排序
    //1.1创建2维数组比较函数
    function compare(v1, v2) {
        return v2[1] - v1[1];
    }
    // 1.2 对数据进行降序排序
    var myAqiData = data.sort(compare);
    return myAqiData;

}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {

    for (var i = 0, len = data.length; i < len; i++) {
        //2.1 创建li标签
        var myLi = document.createElement("li");
        myUl.appendChild(myLi);
        //2.2 填充数据
        myLi.innerHTML = "第" + (i + 1) + "名是：" + data[i][0] + "，" + data[i][1];
    }
}
/**
 *创建节点删除函数 防止排序重复
 */
function clearText() {
    for (var i = myUl.childNodes.length - 1; i >= 0; i--) {
        var x = myUl.removeChild(myUl.childNodes[i]);
        x = null;
    }

}


function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

/**
 *button 点击函数
 */
sortbtn.onclick = function() {
    // 首先判断是否已排序防止内容重复
    if (myUl.childNodes.length != 0) {
        // 如果已排序先清空
        clearText();
        btnHandle();
    }

}
