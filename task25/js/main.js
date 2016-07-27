/**
 * 获取页面 domNode
 */
// 获取目录 docnode
var list = document.getElementById('list');
var start = document.getElementById('start');
var startP = start.getElementsByTagName('P');
var startI = startP[0].getElementsByTagName('i');
// 初始化目录添加按钮
var startList = startI[0];
// 初始化文件添加按钮
var startWenjian = startI[1];
// 创建 空数组 保存树 节点
var treeNodeArray = [];
// 防止重复点击
var repeatOn = true;
// 保存选中的元素
var stateBool;

var search = document.getElementById('search');
var searchV = search.getElementsByTagName('input');
var searchB = search.getElementsByTagName('button');
// 查找的内容

// 查找按钮
var searchButton = searchB[0];

/**
 * 页面加载事件
 */
window.onload = function() {
    // 添加一级目录点击事件
    startList.onclick = function () {
        var listName = prompt("请输入要添加的目录或文件名称");
        if (listName != null) {
          addListNode(list,listName,1);
        }else {
          alert("请输入要添加的目录或文件名称");
        }

    }
    searchButton.onclick = function () {
      var searchValue = searchV[0].value;
        if (searchValue) {
            findValue(searchValue,list);
        }else {
          alert("查询内容不能为空");
        }
    }
}

/**
 * 查找匹配 处理逻辑
 * value 需要查找的值  node 匹配的目标元素
 */
function findValue(value,node) {
    // 遍历所有目录节点元素
    treeNodeArray = []; //初始化话数组
    preOrder(node);
    if (treeNodeArray.length > 0) {
        for (var i = 0; i < treeNodeArray.length; i++) {
          var parnode = treeNodeArray[i].childNodes;
          for (var j = 0; j < parnode.length; j++) {
            if (parnode[j].nodeType == 1 ) {
              var nodeSpan = parnode[j].getElementsByTagName("span");
              if (nodeSpan.length > 0) {
                var nodeP = nodeSpan[0].getElementsByTagName("p");
                var nodeValue = nodeP[0].innerHTML;
                if (value == nodeValue) {
                  // 展开子元素
                  onShowChildNode(parnode[j]);
                  // 给找到的节点添加变化
                  findNodeChange(nodeSpan[0]);
                  // 展开父元素
                  fatherNodeChange(parnode[j],node);

                }
              }

            }
          }

        }
    }else {
      alert("目录未添加");
    }

}

// 元素找到之后的 父元素的处理逻辑
function fatherNodeChange(node, rootNode) {
    fatherNode = [];  //初始化数组
    findFatherNode(node, rootNode);
    for (var i = 0; i < fatherNode.length - 1 ; i++) {
       onShowChildNode(fatherNode[i]);

    }
}

// 找到的元素处理
function findNodeChange(node) {
    // 添加背景颜色
    node.style.backgroundColor = "rgba(170, 159, 159, 0.3)"
    // 添加图标
    var i = node.getElementsByTagName('i');
    if (i.length < 5) {
      var mI = document.createElement("i");
      mI.setAttribute("class","iconfont-1-find");
      mI.innerHTML = "&#xe676;";
      node.appendChild(mI);
    }

}

/**
 * 页面元素 处理逻辑
 */


// 添加目录 处理逻辑
function addListNode(obj,value,num) {
  // 如果num = 1 就是添加的一级目录
    if (num != 1) {
      var par = obj.parentNode.parentNode;
    }else {
      var par = obj;
    }
    var mdiv = document.createElement("div");
    mdiv.setAttribute("class","towList");
    mdiv.style.display = "block";
    mdiv.onclick = function (event) {
      onShow(this);
      // 防止点击的时间的穿透
      event.stopPropagation();
    }
    var mspan = document.createElement("span");
    var mp = document.createElement("p");
    mp.innerHTML = value;
    var mi1 = document.createElement("i");
    mi1.setAttribute("class","iconfont-jt");
    mi1.innerHTML = "&#xe71c;";
    var mi2 = document.createElement("i");
    mi2.setAttribute("class","iconfont-ml");
    mi2.innerHTML = "&#xe62e;";
    var mi3 = document.createElement("i");
    mi3.setAttribute("class","iconfont-del");
    mi3.setAttribute("title","删除");
    mi3.innerHTML = "&#xe654;";
    // 点击 删除元素
    mi3.onclick = function(event) {
        delNode(this);
        event.stopPropagation();
    }
    var mi4 = document.createElement("i");
    mi4.setAttribute("class","iconfont-add");
    mi4.setAttribute("title","添加");
    mi4.innerHTML = "&#xe748;";
    // 点击添加目录
    mi4.onclick = function(event) {
      var listName = prompt("请输入要添加的目录或文件名称");
      if (listName != null) {
        addListNode(this,listName);
      }else {
        alert("请输入要添加的目录或文件名称");
      }

        event.stopPropagation();
    }
    par.appendChild(mdiv);
    mdiv.appendChild(mspan);
    mspan.appendChild(mi1);
    mspan.appendChild(mi2);
    mspan.appendChild(mp);
    mspan.appendChild(mi3);
    mspan.appendChild(mi4);
}

// 点击 显示子元素 和改变图标 处理逻辑
function onShow(obj) {
  var span = obj.getElementsByTagName('span');
  var icon = span[0].getElementsByTagName('i');
  var parNode = obj.childNodes;
  // 点击 展开子元素
  for (var i = 0; i < parNode.length; i++) {
      if (parNode[i].nodeName != "span" && parNode[i].nodeType == 1) {
            if ( parNode[i].style.display == "none" || parNode[i].style.display == "") {
              // 点击显示 子元素
                parNode[i].style.display = "block";
                // 点击改变箭头方向 ⬇️
                icon[0].innerHTML = "&#xe6a3;";
                // 点击显示 操作按钮
                  icon[2].style.display = "inline";
                  icon[3].style.display = "inline";
            }else {
              // 点击 隐藏子元素
              parNode[i].style.display = "";
              // 点击改变箭头方向  >
              icon[0].innerHTML = "&#xe71c;";
              // 点击隐藏 操作按钮
              icon[2].style.display = "none";
              icon[3].style.display = "none";
            }
      }
    }

}

// 显示展开显示子元素
function onShowChildNode(obj) {
  var span = obj.getElementsByTagName('span');

  var icon = span[0].getElementsByTagName('i');
  var parNode = obj.childNodes;
  // 点击 展开子元素
  for (var i = 0; i < parNode.length; i++) {
      if (parNode[i].nodeName != "span" && parNode[i].nodeType == 1) {
            if ( parNode[i].style.display == "none" || parNode[i].style.display == "") {
              // 点击显示 子元素
                parNode[i].style.display = "block";
                // 点击改变箭头方向 ⬇️
                icon[0].innerHTML = "&#xe6a3;";
                // 点击显示 操作按钮
                  icon[2].style.display = "inline";
                  icon[3].style.display = "inline";
            }
}
}
}
// 删除元素处理逻辑
function delNode(obj) {
        var par = obj.parentNode.parentNode;
        var tmp = par.parentNode.removeChild(par);
        tmp = null;
}

/**
 * 页面元素 查找逻辑
 */
// 查找父节点 返回节点数组fatherNode
// node 需要查找根节点 rootNode最终的父节点
var fatherNode = [];
function findFatherNode(node, rootNode) {
    if (node != rootNode) {
      var parNode = node.parentNode;
      fatherNode.push(parNode);
      findFatherNode(parNode ,rootNode);
    }
}

// 广度优先遍历 算法 遍历目录节点元素 保存为treeNodeArray 数组
function levelOrder(node) {
    if (!(node == null)) {
        var que = [];
        var num = 0;
        que.push(node);
        while (que.length != 0) {
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

// 查找 目录元素 去除空元素和文本元素
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
