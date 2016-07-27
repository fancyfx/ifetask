var myBlock = document.getElementById("block");
var queue = document.getElementById("queue");
// 获取插入的span
var queueSpan = queue.getElementsByTagName("span");
// 获取输入框
var input = myBlock.getElementsByTagName("input");
// 获取 输入框后面的P标签
var inputP = myBlock.getElementsByTagName("p");
// 获取button
var myButton = myBlock.getElementsByTagName("button");

/**
 * 左侧入 点击事件
 */
myButton[0].onclick = function(){
	// 获取输入框输入的值
	var inputValue = input[0].value;
	if (queueSpan.length <= 60) {
		if (check()) {
		var mySpan = document.createElement("span");
		mySpan.innerHTML = inputValue;
		var heigthValu = inputValue * 3  + "px";
		mySpan.style.height = heigthValu;
		mySpan.setAttribute("onclick","del(this)");
		if (queueSpan.length) {
			queue.insertBefore(mySpan,queueSpan[0]);
		} else {
			queue.appendChild(mySpan);
		}
	}
	} else {
		alert("已超过最大添加个数60，无法再增加");
	}
	
	
};

/**
 * 右侧入 点击事件
 */
myButton[1].onclick = function(){
	// 获取输入框输入的值
	var inputValue = input[0].value;
	if (queueSpan.length <= 60) {
	if (check()) {
		var mySpan = document.createElement("span");
		mySpan.innerHTML = inputValue;
		var heigthValu = inputValue * 3 + "px";
		mySpan.style.height = heigthValu ;
		mySpan.setAttribute("onclick","del(this)");
		queue.appendChild(mySpan);
	}
}else{
	alert("已超过最大添加个数60，无法再增加");
}
	
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
 * 冒泡排序 
 * 冒泡排序 快速执行
 */
// myButton[4].onclick = function(){
// 	if (queueSpan.length) {
// 		for (var i = 0; i < queueSpan.length - 1; i++) {
//         		for (var j = 0; j < queueSpan.length -1 - i; j++) {
// 		        	swap(j);
// 	            }
//     }
// 	} 	    
// };

/**
 * 冒泡排序 可视化处理
 * 利用setTimeout 延迟执行函数 循环 间隔执行 冒泡排序的每一步变换
 * 注意：外层循环的间隔时间 一定要大于 内存循环的交换完成的总时间
 */

myButton[4].onclick = function(){
	var max = queueSpan.length - 1;
	var i = 0 ,j = 0;
	// 间隔时间
	var Time = 500;
	// 创建  循环执行 前后交换函数
	function uotEx() {
		// 延时 前后交换函数  循环依次 两两比较 把最大交换到最后面
		inSort(max,i,j,Time);
		// 每交换完成一次 交换的总次数 减少一次
		i++;
		// 每交换完成一次 重置初始化位置 重新从一个位置开始交换
		j = 0;
		if (i < max) {
			// 外层循环间隔时间 随着内层 交换总时间减少而变化 
			setTimeout(uotEx,Time * ( (max + 2 )- i));
		}
	}
	// 延时 循环执行 uotEx()
	setTimeout(uotEx,Time);

};
/** 
 * 循环前后交换函数   间隔执行
 * 循环依次 两两比较 把最大交换到最后面
 */
function inSort(max,i,j,Time) {
	function inEx() {
	swap(j);
	j++;
	// 每交换完成一次 交换的总次数 减少一次
	if (j < max - i) {
		setTimeout(inEx,Time);
	} 
}
setTimeout(inEx,Time);
}
/**
 * 前后交换函数
 * 冒泡排序 核心交换方法
 */
function swap(num) {
	// 获取 矩形的值
		var value1 = parseInt(queueSpan[num].innerHTML);
		var value2 = parseInt(queueSpan[num + 1].innerHTML);
	if (value1 > value2) {
		// 前后交换 矩形 高 和数值
	    var tempHeight  = queueSpan[num].style.height;
	    var tempValue  = queueSpan[num].innerHTML;
	    queueSpan[num].style.height = queueSpan[num + 1].style.height;
	    queueSpan[num].innerHTML = queueSpan[num + 1].innerHTML;
	    queueSpan[num + 1].style.height = tempHeight;
	    queueSpan[num + 1].innerHTML = tempValue;
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
	var checkValue = /^[0-9]*$/;
	var inputValueBool = checkValue.test(input[0].value);
	// 限制输入的数字在10-100 之间
	if (inputValueBool && input[0].value >= 10 && input[0].value <=100 ) {
		inputP[0].innerHTML = "OK";
		return true;
	} else {
		inputP[0].innerHTML = "您输入的有误！请输入10-100的数值";
		return false;
	}
	
}






