/**
 * 获取 页面DOM
 */
var tag = document.getElementById("Tag");
var tagValue = document.getElementById("TagValue");
var tagValueSpan = tagValue.getElementsByTagName("span");
var love = document.getElementById("love");
var loveValue = document.getElementById("loveValue");
var loveValueSpan = loveValue.getElementsByTagName("span");
var input = tag.getElementsByTagName("input")
    //  Tag输入框
var tagInput = input[0];
var textarea = love.getElementsByTagName("textarea")
var button = love.getElementsByTagName("button")
    //  爱好 输入框
var loveTextarea = textarea[0];
//  爱好 确认按钮
var loveButton = button[0];

/**         ------ 功能控制组件  ----start          */

/**
 * Tag 添加处理逻辑
 */
// 当输入","或者空格时 添加Tag
tagInput.addEventListener("textInput", function(event) {
    if (event.data == ";" || event.data == " " || event.data == "；") {
        addTag(tagValues,tagInput,tagValueSpan);
    }
}, false);
// 当回车时添加Tag
tagInput.onkeypress = function(event) {
    if (event.keyCode == 13) {
        addTag(tagValue,tagInput,tagValueSpan);
        return false;
    }
};
/**
 * 爱好点击按钮 点击添加事件
 */
loveButton.onclick = function(){
	addLove(loveValue,loveTextarea,loveValueSpan);
};

/**         ------ 功能控制组件  ----end          */



/**         ------ 个性功能组件 ----start            */

/**
 * 添加 Tag 内容
 * add 元素标签为 span
 *  domNode 添加的到元素标签 domInput添加的内容获取来源
 * 只添加最后2个分割符之间的内容
 */
function addTag(domNode,domInput,domValueSpan) {
		// 分割 输入字符串 返回自后2个分割符之间的字符串
    var nodeValue = inputCharF(domInput);
    if (nodeValue != "" && repeatTag(nodeValue,domValueSpan)) {
				addSpan(domNode,nodeValue);
        delSpan(tagValue, tagValueSpan, 10);
    }
}
/**
 * 添加 love
 */
function addLove(domNode,domInput,domValueSpan) {
		var inputChar = domInput.value;
		// 字符串分割 数组
		var charArray = spChar(inputChar,";");
		for (var i = 0; i < charArray.length; i++) {
			var nodeValue = charArray[i];
			if (nodeValue != "" && repeatTag(nodeValue,domValueSpan)) {
			addSpan(domNode,nodeValue);
			delSpan(loveValue, loveValueSpan, 10);
		}
	}
}

/**         ------ 个性功能组件 ----end              */


/**         ------ 功能实现组件 ------ start            */

/**
 * 添加span的处理逻辑
 * domNode 需要添加的元素位置 父元素名称 nodeValue展示的节点数据
 */
function addSpan(domNode,nodeValue) {
	var mySpan = document.createElement("span");
	mySpan.innerHTML = nodeValue;
	mySpan.onmouseover = function() {
			mySpan.innerHTML = "点击删除 " + nodeValue;
			var widthNum = nodeValue.length + 5;
			mySpan.style.width = widthNum + "em";
	};
	mySpan.onmouseout = function() {
			mySpan.innerHTML = nodeValue;
			mySpan.style.width = nodeValue.length + "em";
	};
	mySpan.style.width = nodeValue.length + "em";
	mySpan.setAttribute("onclick", "del(this)");
	domNode.appendChild(mySpan);
}

/**
 * 遇到";" 空格 分割字符串函数
 * 从后向前检索 ; 和 空格 输出最近二个字符之间的字符串
 * domValue 需要获取的input
 * 只会返回最后一个分割父之间的字符串
 */
function inputCharF(domValue) {

    var fChar = domValue.value;
    // 保存检索到的";"和空格
    var charArray = [];
    // charArray 下标
    var numArray = 0;
    for (var i = 0; i < fChar.length; i++) {
        if (fChar[i] == ";" || fChar[i] == " " || fChar[i] == "；" ) {
            charArray[numArray] = i;
            numArray++;
        }
    }
    var len = charArray.length - 1;
    var num = charArray[len] - charArray[len - 1];
    // 当最后一位字符 不为";"和空格 时
    var num2 = (fChar.length - 1) - charArray[len];
    var lastChar = fChar.slice(-num);
    var lastChar2 = fChar.slice(-num2);
    var num3 = charArray[len]
        // 最后一个字符不为;或空格
    if (	 fChar[fChar.length - 1] != " "
				&& fChar[fChar.length - 1] != ";"
				&& fChar[fChar.length - 1] != "；"
			) {
        return lastChar2;
        // 当只有一个;或空格时
    } else if (charArray[len] != 0 && len == 0) {
        var result = lastChar.substring(0, num3)
        return result;
    } else {
        var result2 = lastChar.substring(0, num - 1)
        return result2;
        // 当输入的是只有;或空格时 返回空字符串
    }
}

/**
 * 查找已添加的元素是否有重复的Tag
 * 如果重复 返回 false 不重复 返回 true
 * 这段代码是不是有点蠢？ 现在是2016年07月07日03:33:03 我暂时不想优化了就这样
 */
function repeatTag(value,domSpan) {
    var num = 0;
    // 判断 span 是否有值 如果没有 直接返回 true
    if ( domSpan[0] == 0) {
        return true;
    } else {
        // 循环比较 是否有重复的
        for (var i = 0; i < domSpan.length; i++) {
            if (domSpan[i].innerHTML == value) {
                // 遇到重复则num + 1
                num++;
            }
        }
        // 如果有重复的 则 num > 1 返回false
        if (num > 0) {
            return false
        } else {
            // 如果没有 返回false
            return true;
        }
    }
}

/**
 * 字符串分割函数
 *  根据指点的字符分割字符串
 *  charValue 需要分割的字符串  symbol 分割符（字符串）
 */
function spChar(charValue,symbol) {
			var nChar = charValue.split(symbol);
			return nChar;
}

/**         ------ 功能实现组件 ------ end            */


/**         ------ 公共功能组件 ------ start           */

/**
 * 点击删除函数
 */
function del(obj) {
    var block = obj;
    block.parentNode.removeChild(block);
}

/**
 * 元素删除函数
 * 如果个数大于num 则删除最前的
 * pNode 需要删除的父元素节点 span 需要删除的元素节点
 */
function delSpan(pNode, span, num) {
    if (span.length > num) {
        var varlue = span[0].innerHTML
        pNode.removeChild(span[0]);
    }
}
/**         ------ 公共功能组件 ------ end           */
