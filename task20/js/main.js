var myInput = document.getElementById("input");
var queue = document.getElementById("queue");
var control = document.getElementById("control");
var search = document.getElementById("search");
// 获取插入的span
var queueSpan = queue.getElementsByTagName("span");
// 获取输入框
var textarea = myInput.getElementsByTagName("textarea");
var inputP = myInput.getElementsByTagName("p");
// 获取button
var myButton = control.getElementsByTagName("button");
// 查询输入框
var searchInput = search.getElementsByTagName("input");
// 查询按钮
var searchButton = search.getElementsByTagName("button");


/**
 * 查询匹配字符串 处理逻辑
 * 模糊匹配 每一个字符
 * 并突出显示 匹配内容
 *
 */
function searchChar() {
	// 获取查询输入的值
	var searchChar = searchInput[0].value;
	// 保存span找到的次数
	var searchNum = 0;
	// 保存span字符串的每一个字符找到的次数
	var searchSpanNum = 0;
	// 保存查询结果为数组spanValue
	var spanValue = [];
	// 获取显示区域的字符串 并依次和 查询字符串匹配
	for (var i = 0; i < queueSpan.length; i++) {
		// 获取 每一个 span
		var showChar = queueSpan[i].innerHTML;
		for (var j = 0; j < showChar.length; j++) {
			// 获取 span 里面的每一个字符
			var char = showChar[j];
			for (var n = 0; n < searchChar.length; n++) {
				// 匹配 查询字符串 和 显示区域的每一个 字符
				if (char == searchChar[n]) {
					// 如果找到字符 存储到spanValue
					spanValue[searchNum] = i;
					// 每找到一次searchNum + 1
					searchNum++;
				}
			}
		}
	}
	// 返回 结果数组spanValue 数值的值为匹配到的span 元素下标 如果没找到 数组长度为0
	return spanValue;
}

/**
 * 数组去重
 */
function unique(array) {
	var n = [];
	for (var i = 0; i < array.length; i++) {
		if (n.indexOf(array[i]) == -1) n.push(array[i]);
	}
	return n;
}
/**
 * 查询 按钮点击事件
 */
searchButton[0].onclick = function(){
	var array = searchChar();
	var oneArray = unique(array);
	for (var i = 0; i < oneArray.length; i++) {
		var num = oneArray[i];
		queueSpan[num].style.backgroundColor = "#999" ;
		queueSpan[num].style.boxShadow = "0 0 8px rgba(255,0,0,0.5)" ;
	}
};
/**
 * 左侧入 点击事件
 */
myButton[0].onclick = function(){
	// 获取输入框输入的值
	if (check()) {
		var char = textarea[0].value;
		var inputValue = char.split(",");
		for (var i = 0; i < inputValue.length; i++) {
			var mySpan = document.createElement("span");
			mySpan.innerHTML = inputValue[i];
			mySpan.setAttribute("onclick","del(this)");
			if (queueSpan.length) {
				queue.insertBefore(mySpan,queueSpan[0]);
			} else {
				queue.appendChild(mySpan);
			}
		}

	}

};

/**
 * 右侧入 点击事件
 */
myButton[1].onclick = function(){
	// 获取输入框输入的值
	var inputValue = textarea[0].value;
	var mySpan = document.createElement("span");
	mySpan.innerHTML = inputValue;
	mySpan.setAttribute("onclick","del(this)");
	queue.appendChild(mySpan);
};
/**
 * 左侧出 点击事件
 */
myButton[2].onclick = function(){
	if (queueSpan.length) {
		var varlue = queueSpan[0].innerHTML
		queue.removeChild(queueSpan[0]);
		alert(varlue);
	} else {
		alert("页面没有span");
	}

}
/**
 * 右侧出 点击事件
 */
myButton[3].onclick = function(){
	if (queueSpan.length) {
		var varlue = queueSpan[queueSpan.length - 1].innerHTML;
		queue.removeChild(queueSpan[queueSpan.length - 1]);
		alert(varlue);
	} else {
		alert("页面没有span");
	}

}
/**
 * 点击删除函数
 */
function del(obj) {
	var block = obj;
	block.parentNode.removeChild(block);
}
/**
 * input 限制输入函数
 * 限制输入的数字在10-100
 */
function check() {
	// 创建 数字0-9 的正则表达式
	var checkValue = /^[0-9a-zA-Z,\u4e00-\u9fa5]*$/;
	var char = textarea[0].value;
	var inputValueBool = checkValue.test(char.trim());
	// 限制输入的数字在10-100 之间
	if (inputValueBool  ) {
		inputP[0].innerHTML = "OK";
		return true;
	} else {
		inputP[0].innerHTML = "您输入的有误！您输入的有误！请输入中英文或者数字以,分割";
		return false;
	}
}
