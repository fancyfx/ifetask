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
    // 指令执行状态
    var codeRunState = true;
    // 执行按钮点击事件
    button[0].onclick = function () {
      removeError();
      if (addErrorCodeLine() === 404) {
        alert("指令有误，请修改后重新执行！");
      }else {
        if (codeRunState) {
          codeRun();
        }else {
          alert("指令还未执行完毕，请勿重复点击！");
        }
      }


    };
  // 重置按钮点击事件
  button[1].onclick = function () {
      codeText.value = '';
      codeLine.innerHTML = '<i>1</i>';
  };

/**
 * 指令执行处理逻辑
 */
// 依次执行指令
function codeRun() {
    if (!codeText.value) return;
    var codeVal = codeText.value.split('\n');
    var codeRunVal = [];
    // 字符串首尾去空格 并删除空白行
    for (var i = 0; i < codeVal.length; i++) {
      if (codeVal[i].trim() !== '') {
        codeRunVal.push(codeVal[i].trim());
      }
    }
    var num = 0;
    function interval() {
        codeRunState = false;
        codeSelect(codeRunVal[num]);
        num++;
        if (num < codeRunVal.length) {
          setTimeout(interval,3000);
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
    spanNode[0].style.animation = val+' 1s 1 linear forwards';
    pieces.onBloo = false;
}

/**
 * 运行旋转动画
 */
 function rotateAnimation(val) {
     var parNode = document.getElementById(pieces.startVal);
     var spanNode = parNode.getElementsByTagName('span');
     spanNode[0].style.animation = val+' 1s 1 linear forwards';
     pieces.onBloo = false;
 }
