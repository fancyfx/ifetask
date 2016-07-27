/**
 * 获取页面 domNode
 */
var tree = document.getElementById('BinaryTree');
var kz = document.getElementById('kzButton');
var button = kz.getElementsByTagName('button');
// 添加按钮
var addButton = button[0];
// 删除按钮
var delButton = button[1];
var input = kz.getElementsByTagName('input');
// 前序遍历按钮
var prebutton = button[0];
// 创建 空数组 保存树 节点
var treeNodeArray = [];
// 防止重复点击
var repeatOn = true;
// 保存选中的元素
var stateBool;

/**
 * 页面加载处理函数
 */
window.onload = function () {
    // 点击选择
    addOn(tree);
    // 点击按钮删除
    delButton.onclick = function () {
        delNode();
    }
    addButton.onclick = function () {
        var value = input[0].value;
        if (value) {
           if (stateBool) {
              addNode(stateBool,value);
           }else {
             alert("我不知道添加到哪里？请选择");
           }
        }else {
          alert("添加的内容不能为空");
        }

    }
}

/**
 *  点击 添加颜色变化处理逻辑
 */


function addOn(node) {
  // 遍历有元素节点
   preOrder(node);
   for (var i = 0; i < treeNodeArray.length; i++) {
      treeNodeArray[i].onclick = function (event) {

            if (stateBool == this) {
              // 二次点击取消选择
              stateBool.style.backgroundColor = "#fff";
              event.stopPropagation();
              stateBool = null;
            }else if(stateBool){
              // 删除上一次的选择的状态
              stateBool.style.backgroundColor = "#fff";
              this.style.backgroundColor = "#eee858";
              event.stopPropagation();
              stateBool = this;
            }else {
              // 给当前选择添加状态
              this.style.backgroundColor = "#eee858";
              event.stopPropagation();
              stateBool = this;
            }
    }
   }
}

/**
 * 点击删除 元素处理逻辑
 */
function delNode() {
  if (stateBool) {
    var par = stateBool.parentNode;
    par.removeChild(stateBool);
    stateBool = null;
  }else {
    alert("请先选择！");
  }
}

/**
 * 点击 添加元素处理逻辑
 */

function addNode(node,value) {
    var myDiv = document.createElement("div");
    var text = document.createTextNode(value);
    node.appendChild(myDiv);
    myDiv.appendChild(text);
}


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

/**
 * 后序遍历 算法
 */
function postOrder(node) {
    if (!(node == null)) {
      for (var i = 0; i < findChildNode(node).length; i++) {
        preOrder(findChildNode(node)[i]);
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
