/**
 * 获取页面 domNode
 */
var tree = document.getElementById('BinaryTree');
var kz = document.getElementById('kzButton');
var button = kz.getElementsByTagName('button');
// 前序遍历按钮
var prebutton = button[0];
// 中序遍历按钮
var inbutton = button[1];
// 后序遍历按钮
var postbutton = button[2];
// 创建 空数组 保存树 节点
var treeNodeArray = [];

/**
 *  按钮控制 函数
 */
prebutton.onclick = function (){
  //   注意：在 遍历之前 初始化数组
    treeNodeArray = [];
    preOrder(tree);
    addColor();
};
inbutton.onclick = function (){
  //   注意：在 遍历之前 初始化数组
    treeNodeArray = [];
    inOrder(tree);
    addColor();
};
postbutton.onclick = function (){
  //   注意：在 遍历之前 初始化数组
   treeNodeArray = [];
    postOrder(tree);
    addColor();
};

/**
 * 前序遍历 算法
 */
function preOrder(node) {
    if (!(node == null)) {
      treeNodeArray.push(node);
      preOrder(node.firstElementChild);
      preOrder(node.lastElementChild);
    }
}

/**
 * 中序遍历 算法
 */
function inOrder(node) {
    if (!(node == null)) {
      inOrder(node.firstElementChild);
      treeNodeArray.push(node);
      inOrder(node.lastElementChild);
    }
}

/**
 * 后序遍历 算法
 */
function postOrder(node) {
    if (!(node == null)) {
      postOrder(node.firstElementChild);
      postOrder(node.lastElementChild);
      treeNodeArray.push(node);
    }
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
      if (num != 0) {
        treeNodeArray[num -1].style.backgroundColor = "#fff";
      }
      treeNodeArray[num].style.backgroundColor = "#db3a5c";
      num++;

      if (num < max) {
          setTimeout(incrementNumber,500);
          //
      }else {
        setTimeout(function () {
          treeNodeArray[num - 1].style.backgroundColor = "#fff";
        },500);
      }
  }
  setTimeout(incrementNumber,500);

}
