/**
 * 获取页面 domNode
 */
var tree = document.getElementById('BinaryTree');
var kz = document.getElementById('kzButton');
var button = kz.getElementsByTagName('button');
var input = kz.getElementsByTagName('input');
// 前序遍历按钮
var prebutton = button[0];

var queryButton = button[4];
// 创建 空数组 保存树 节点
var treeNodeArray = [];
// 防止重复点击
var repeatOn = true;


/**
 *  按钮控制 函数
 */

// 前序遍历 控制按钮 处理函数
prebutton.onclick = function() {
    //   注意：在 遍历之前 初始化数组
    if (repeatOn) {
        reset();
        preOrder(tree);
        addColor();
    } else {
        alert("遍历还未完成请勿重复点击！");
    }

};
// 中序遍历 控制按钮 处理函数
button[1].onclick = function() {
    //   注意：在 遍历之前 初始化数组
    if (repeatOn) {
        reset();
        inOrder(tree);
        addColor();
    } else {
        alert("遍历还未完成请勿重复点击！");
    }

};

// 后序遍历 控制按钮 处理函数
button[2].onclick = function() {
    //   注意：在 遍历之前 初始化数组
    if (repeatOn) {
        reset();
        postOrder(tree);
        addColor();
    } else {
        alert("遍历还未完成请勿重复点击！");
    }

};

// 广度优先遍历 点击函数
button[3].onclick = function(){
      if (repeatOn) {
        reset();
        levelOrder(tree);
        addColor();
      } else {
          alert("遍历还未完成请勿重复点击！");
      }
};

// 内容查找按钮 点击事件
queryButton.onclick = function() {
    if (repeatOn) {
        reset();
    }
    var valueArray = queryValue(tree);
    var valueArrayLen = valueArray.length;
    if (valueArrayLen == 0 && repeatOn) {

        addValueColor(valueArray);
        findChildNodeOver();
    } else if (repeatOn) {
        addValueColor(valueArray);
    } else {
        alert("遍历还未完成请勿重复点击！");
    }

};

/**
 * 前序遍历 算法
 */
function preOrder(node) {
    if (!(node == null)) {
        treeNodeArray.push(node);
        for (var i = 0; i < findChildNode(node).length; i++) {
          preOrder(findChildNode(node)[i]);
        }
    }

}
// /**
//  * 后序遍历 算法
//  */
// function inOrder(node) {
//     if (!(node == null)) {
//         inOrder(findChildNode(node)[0]);
//         inOrder(findChildNode(node)[1]);
//         treeNodeArray.push(node);
//         inOrder(findChildNode(node)[2]);
//         inOrder(findChildNode(node)[3]);
//
//     }
//
// }
/**
 * 后序遍历 算法
 */
function postOrder(node) {
    if (!(node == null)) {
      for (var i = 0; i < findChildNode(node).length; i++) {
        postOrder(findChildNode(node)[i]);
      }
        treeNodeArray.push(node);
    }

}

/**
 * 广度优先遍历 算法
 */
function levelOrder(node) {
  if (!(node == null)) {
      var que = [];
      var num = 0;
      que.push(node);

      while (que.length != 0 ) {
        treeNodeArray[num] = que[0];
        node = que.shift();
        num++;
        for (var i = 0; i < findChildNode(node).length; i++) {
          if(findChildNode(node)[i])  que.push(findChildNode(node)[i]);
        }

      }
  }
}

/**
 *  内容查询函数
 */
function queryValue(node) {
    preOrder(node);
    var value = input[0].value;
    var len = treeNodeArray.length;
    var queryResult = []
    for (var i = 0; i < len; i++) {
        var value2 = findTextChildNode(treeNodeArray[i]);
        if (value2[0] == value) {
            queryResult.push(i);
        }
    }
    return queryResult;
}

/**
 * 查找子元素为 div 的节点
 *
 */
function findChildNode(node) {
    var nodeChildArray = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType == 1 &&
            node.childNodes[i].nodeName == "DIV") {

            nodeChildArray.push(node.childNodes[i]);
        }
    }
    return nodeChildArray;
}

/**
 * 查找文本节点的值
 */
function findTextChildNode(node) {
    var nodeChildText = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType == 3) {
            var trValue = node.childNodes[i].nodeValue.trim();
            nodeChildText.push(trValue);
        }
    }
    return nodeChildText;
}

/**
 * 给每一个 🌲 节点添加 颜色变换
 * setTimeout 延时调用函数 实现 二叉树遍历 的可视化变化
 */
// 设定延时的带调用的初始次数
function addColor() {
    var num = 0;
    var max = treeNodeArray.length;

    function incrementNumber() {
        repeatOn = false;
        if (num != 0) {
            treeNodeArray[num - 1].style.backgroundColor = "#fff";
        }
        treeNodeArray[num].style.backgroundColor = "#db3a5c";
        num++;

        if (num < max) {
            setTimeout(incrementNumber, 500);
            //
        } else {
            setTimeout(function() {
                treeNodeArray[num - 1].style.backgroundColor = "#fff";
            }, 500);
            repeatOn = true;
        }
    }
    setTimeout(incrementNumber, 500);

}

/**
 * 内容查找 颜色变化 处理函数
 *
 */

function addValueColor(valueArray) {
    var num = 0;
    var max = treeNodeArray.length;
    var resutArray = valueArray;

    function incrementNumber() {
        repeatOn = false;
        if (num != 0) {
            var color = treeNodeArray[num - 1].style.backgroundColor;
        }
        if (num != 0 && color != "rgb(153, 153, 153)") {
            treeNodeArray[num - 1].style.backgroundColor = "#fff";
        }

        treeNodeArray[num].style.backgroundColor = "#db3a5c";
        for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] == num) {
                treeNodeArray[num].style.backgroundColor = "#999";
            }
        }
        num++;

        if (num < max) {
            setTimeout(incrementNumber, 500);
            //
        } else {
            repeatOn = true;
        }
    }
    setTimeout(incrementNumber, 500);

}

/**
 * 搜索未找到时的处理逻辑
 */
function findChildNodeOver() {
    var time = (treeNodeArray.length + 1) * 500;
    setTimeout(function() {
        alert("没找到");
    }, time);
}


// 重置样式
function reset() {
    if (treeNodeArray.length > 0) {
        for (var i = 0; i < treeNodeArray.length; i++) {
            treeNodeArray[i].style.backgroundColor = "#fff";
        }
    }
    treeNodeArray = [];
}
