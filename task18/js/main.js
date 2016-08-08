var myBlock = document.getElementById("block");
var queue = document.getElementById("queue");
// 获取插入的span
var queueSpan = queue.getElementsByTagName("span");
// 获取输入框
var input = myBlock.getElementsByTagName("input");
// 获取button
var myButton = myBlock.getElementsByTagName("button");

/**
 * 左侧入 点击事件
 */
myButton[0].onclick = function(){
	// 获取输入框输入的值
	var inputValue = input[0].value;
	var mySpan = document.createElement("span");
	mySpan.innerHTML = inputValue;
	mySpan.setAttribute("onclick","del(this)");
	if (queueSpan.length) {
		queue.insertBefore(mySpan,queueSpan[0]);
	} else {
		queue.appendChild(mySpan);
	}
};

/**
 * 右侧入 点击事件
 */
myButton[1].onclick = function(){
	// 获取输入框输入的值
	var inputValue = input[0].value;
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
		var varlue = queueSpan[0].innerHTML;
		queue.removeChild(queueSpan[0]);
		alert(varlue);
	} else {
		alert("页面没有span");
	}

};
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

};
/**
 * 点击删除函数
 */
function del(obj) {
	var block = obj;
	block.parentNode.removeChild(block);
}
