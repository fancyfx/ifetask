window.onload = function () {
 addGrid();
 addNodePieces();
};

/**
 * 获取页面元素 控制棋子
 */
var div = document.getElementById('bg');
// 输入框
var input = div.getElementsByTagName('input');
// 按钮
var button = div.getElementsByTagName('button');
// 命令输入框
var codeText = document.getElementById('codeText');
// 代码行数条
var codeLine = document.getElementById('codeLine');
var codeLineVal = codeLine.getElementsByTagName('i');
// 指令执行状态
var codeRunState = true;
var pathVal; // 保存 A satr 算法路径坐标（演示算法时用）
// 保存页面元素二维数组
var wallArray = [];
for (var i = 0; i < 11; i++) {
  wallArray[i] = [];
  for (var j = 0; j < 11; j++) {
    wallArray[i][j] = -1;
  }
}
// A* 寻路算法演示
button[0].onclick = function () {
  var inputVal = input[0].value;
  // 验证 x,y(1~10) 的坐标
  var  pattern =  /^([1-9]|10)\,([1-9]|10)$/;
  if (pattern.test(inputVal)) {  // 验证输入字符串
  if (codeRunState) {            // 验证执行命令是点击
    if (pathVal) {               // 重置时验证是否存在
      for (var j = 0; j < pathVal.length; j++) {
        removeNode(pathVal[j]);
      }
      pathVal = null;
    }
      pathVal = path(pieces.startVal,inputVal);
      for (var i = 0; i < pathVal.length; i++) {
        var startNod = document.getElementById(pathVal[i]);
        var spanNod1 = document.createElement('span');
        startNod.appendChild(spanNod1);
        spanNod1.setAttribute('class', 'path');
      }
  }else {
    alert("指令还未执行完毕，请勿点击！");
  }
}else {
  alert("输入的坐标不正确，请重新输入");
}
};
  // 随机生成墙按钮点击事件
button[1].onclick = function () {
  if (codeRunState) { // 验证执行命令是点击
    for (var j= 0; j < 11; j++) {
      for (var k = 0; k < 11; k++) {
        if (wallArray[j][k] !== -1 && wallArray[j][k] !== 2) wallArray[j][k].removWall();
      }
    }
    var num = 20; //墙生成数量
    for (var i = 0; i < num; i++) {
      var x = randomXandY().x,
          y = randomXandY().y;
      var wall = new Wall(x+','+y);
      if (wallArray[x][y] === -1 && wall.setWall()) {
          wallArray[x][y] = wall;
      }else{
        num ++;
      }
    }
  }else {
    alert("指令还未执行完毕，请勿点击！");
  }

};
// 生成预设指令
button[2].onclick = function () {
  var instruction = "BUILD\nTRA LEF\nGO\nBUILD\nTRA LEF\nBUILD\nTRA LEF\nBUILD\nTUN LEF\nBUILD\nTRA BOT\nBUILD\nTRA BOT\nBUILD" +
  "\nTUN LEF\n\nBUILD\nTRA RIG\nGO\nBUILD\nTRA RIG\nGO\nBUILD\nTRA RIG\nBUILD\nTRA RIG\nBUILD\nTRA RIG\nBUILD\nTUN LEF\nBUILD" +
  "\nTRA TOP\nGO\nBUILD\nTRA TOP\nGO\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nTUN LEF\nBUILD\nTRA LEF\nBUILD\nTRA LEF\nBUILD" +
  "\nTUN LEF\nBUILD\nTRA BOT 2\nGO\nBUILD\nBRU #e74a4a";
  codeText.value = '';
  codeText.value = instruction;
  startCodeLine();
};

  // 执行按钮点击事件
button[3].onclick = function () {
  removeError();

  if (addErrorCodeLine() === 404) {
    alert("指令有误，请修改后重新执行！");
  }else {
    if (codeRunState) {
      codeRun();
    }else {
      alert("指令还未执行完毕，请勿点击！");
    }
  }
};
// 重置输入框按钮点击事件
button[4].onclick = function () {
  codeText.value = '';
  codeLine.innerHTML = '<i>1</i>';
};
// 重置页面元素按钮点击事件
button[5].onclick = function () {
  if (codeRunState) {
    // 重置‘墙’
    for (var j= 0; j < 11; j++) {
      for (var k = 0; k < 11; k++) {
        if (wallArray[j][k] !== -1 && wallArray[j][k] !== 2 ) wallArray[j][k].removWall();
      }
    }
    // 重置算法路径
    if (pathVal) {
      for (var m = 0; m < pathVal.length; m++) {
        removeNode(pathVal[m]);
      }
      pathVal = null;
    }
    // 重置 '小方块'
    removeNode(pieces.startVal);
    addNodePieces();
  }else {
    alert("指令还未执行完毕，请勿点击！");
  }

};

/**
 * 指令执行处理逻辑
 */
// 依次执行指令
function codeRun() {
    if (!codeText.value) return;
    var codeVal = codeText.value.split('\n');
    // 指令集合数组
    var codeRunVal = [];
    // 字符串首尾去空格 并删除空白行
    for (var i = 0; i < codeVal.length; i++) {
      if (codeVal[i].trim() !== '') {
        codeRunVal.push(codeVal[i].trim());
      }
    }
    // 把带指令的参数转换为字符串指令
    for (var m = 0; m < codeRunVal.length; m++) {
      // 判断指令值什么类型
      switch (codeRunVal[m].length) {
        case 4:   //'GO'
          var val1 = codeRunVal[m].substr(0,2);
          var num1 = parseFloat(codeRunVal[m].substr(2));
          codeRunVal.splice(m,1,val1);
          for (var k = num1 - 1; k > 0; k--) {
            codeRunVal.splice(++m,0,val1);
          }
          break;
        case 9:   //TAR MOV 不带参数
          var val = codeRunVal[m].substr(0,7);
          var num = parseFloat(codeRunVal[m].substr(7));
          codeRunVal.splice(m,1,val);
          for (var j = num - 1; j > 0; j--) {
            codeRunVal.splice(++m,0,val);
          }
          break;
          default:
          //  解析 MOV TO x,y指令
          if (codeRunVal[m].length > 9 && codeRunVal[m].length < 13 && codeRunVal[m].substr(0,6) === 'MOV TO') {
              analyseMovTo(m + 1,codeRunVal[m],codeRunVal);
              codeRunVal.splice(m,1);
          }

      }
    }
    // 指令集 间隔执行
    var intervalNum = 0;
    function interval() {
        codeRunState = false;
        codeSelect(codeRunVal[intervalNum]);
        intervalNum++;
        if (intervalNum < codeRunVal.length) {
          setTimeout(interval,1500);
        }else {
          codeRunState = true;
        }
    }
    setTimeout(interval,500);
}


// 判断执行内容执行相应的操作
function codeSelect(inputVal) {
    switch (inputVal) {
        case "GO":
          switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.tarTop();
              break;
            case 'piecesBottom':
              pieces.tarBottom();
              break;
            case 'piecesLeft':
              pieces.tarLeft();
              break;
            case 'piecesRight':
              pieces.tarRight();
              break;
          }
          break;
        case "TUN LEF":
          pieces.rotateLeft();
          break;
        case "TUN RIG":
          pieces.rotateRight();
          break;
        case "TUN BAC":
          pieces.rotateBack();
          break;
        case "TRA LEF":
          pieces.tarLeft();
          break;
        case "TRA RIG":
          pieces.tarRight();
          break;
        case "TRA BOT":
          pieces.tarBottom();
          break;
        case "TRA TOP":
          pieces.tarTop();
          break;
        case "MOV LEF":
          pieces.moveLeft();
          break;
        case "MOV RIG":
          pieces.moveRight();
          break;
        case "MOV BOT":
          pieces.moveBottom();
          break;
        case "MOV TOP":
          pieces.moveTop();
          break;
        case "BUILD":
          buiid();
          break;
        default:
          if (inputVal.slice(0, 3) === 'BRU') {
           bruColor(inputVal);
       }
      }
}

/**
 * 解析 MOV TO指令
 */
function analyseMovTo(m,val,array) {
  var movToVal = val.slice(7);
  var movToPath = path(pieces.startVal,movToVal);
  // 初始化坐标为启动
  var x = charXandY(pieces.startVal).x,
      y = charXandY(pieces.startVal).y;
  for (var i = 0; i < movToPath.length; i++) {
      switch (pathVal[i]) {
        case (x - 1) + ',' + y : //上
          array.splice(m + i,0,'TRA TOP');
          break;
        case (x + 1) + ',' + y : //下
          array.splice(m + i,0,'TRA BOT');
          break;
        case x + ',' + (y - 1) : //左
          pathInstruction.push('TRA LEF');
          array.splice(m + i,0,'TRA LEF');
          break;
        case x + ',' + (y + 1) : //右
          array.splice(m + i,0,'TRA RIG');
          break;
      }
      // 每移动一次 坐标变为上一次的位置的坐标
      x = charXandY(pathVal[i]).x;
      y = charXandY(pathVal[i]).y;
  }
}
/**
 * 添加棋子页面元素
 */
function addNodePieces() {
  var startNod = document.getElementById(pieces.startVal);
  var backNod = startNod.getElementsByTagName('span');
  if (backNod.length < 1) {
    var spanNod1 = document.createElement('span');
    startNod.appendChild(spanNod1);
    spanNod1.setAttribute('class', 'pieces '+ pieces.borderValue);
    var x = charXandY(pieces.startVal).x,
        y = charXandY(pieces.startVal).y;
      //  保存棋子到棋盘
       wallArray[x][y] = 2;
  }
}
/**
 * 添加棋盘
 */
function addGrid() {
    var gameTable = document.getElementById('game');
    for (var i = 0; i < 11; i++) {
      var tr = document.createElement('tr');
      gameTable.appendChild(tr);
      for (var j = 0; j < 11; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
        var val =  i +","+ j;
        td.setAttribute('id',val);
        td.setAttribute('onclick',"tdOn(this)");
        if (i === 0) {
           td.innerHTML = j;
        }
        if (j === 0) {
          td.innerHTML = i ;
        }

      }
    }
}

/**
 * 删除原来位置上的棋子
 */
function removeNode(val) {
   var parNode = document.getElementById(val);
   var oldNode = parNode.getElementsByTagName('span');
    parNode.removeChild(oldNode[0]);
}

/**
 * 运行棋子移动动画
 */
function moveAnimation(val) {
    var parNode = document.getElementById(pieces.startVal);
    var spanNode = parNode.getElementsByTagName('span');
    spanNode[0].style.animation = val+' 0.5s 1 linear forwards';
    pieces.onBloo = false;
}

/**
 * 运行旋转动画
 */
 function rotateAnimation(val) {
     var parNode = document.getElementById(pieces.startVal);
     var spanNode = parNode.getElementsByTagName('span');
     spanNode[0].style.animation = val+' 0.5s 1 linear forwards';
     pieces.onBloo = false;
 }

/**
 * 转换字符串为坐标
 */
function charXandY(val) {
  var sp = val.split(",");
  var xVal = parseFloat(sp[0]),
      yVal = parseFloat(sp[1]);
  return {
     x :xVal ,
     y :yVal
  };
}

/**
 * 随机坐标生成函数
 */
function randomXandY() {
  var xVal = Math.ceil(Math.random()*10),
      yVal = Math.ceil(Math.random()*10);
  return {
     x :xVal ,
     y :yVal
  };
}

/**
 * 初始化代码行（自用）
 */
function startCodeLine() {
    for (var i = 2; i < 54; i++) {
      var iNode = document.createElement('i');
      iNode.innerHTML = i;
      codeLine.appendChild(iNode);
    }
}

// 页面方块点击事件处理逻辑
function tdOn(obj) {
   var val = obj.getAttribute('id');
   var wall = new Wall(val);
   var x = charXandY(val).x,
       y = charXandY(val).y;
   if (wallArray[x][y] === -1 && wall.setWall()) {
       wallArray[x][y] = wall;
   }
}
