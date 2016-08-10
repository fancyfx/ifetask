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
    // 按钮点击事件
    button[0].onclick = function () {
      // 输入框的值
      var inputVal = input[0].value;
      switch (inputVal) {
        case "GO":
          switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.moveTop();
              break;
            case 'piecesBottom':
              pieces.moveBottom();
              break;
            case 'piecesLeft':
              pieces.moveLeft();
              break;
            case 'piecesRight':
              pieces.moveRight();
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
          pieces.moveLeft();
          break;
        case "TRA RIG":
          pieces.moveRight();
          break;
        case "TRA BOT":
          pieces.moveBottom();
          break;
        case "TRA TOP":
          pieces.moveTop();
          break;
        case "MOV LEF":
          switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.moveLeft();
              },1000);
              break;
            case 'piecesBottom':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.moveLeft();
              },1000);
              break;
            case 'piecesRight':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.moveLeft();
              },1000);
              break;
          }
          pieces.moveLeft();
          break;
        case "MOV RIG":
          switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.moveRight();
              },1000);
              break;
            case 'piecesBottom':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.moveRight();
              },1000);
              break;
            case 'piecesLeft':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.moveRight();
              },1000);
              break;
          }
          pieces.moveRight();
          break;
        case "MOV BOT":
          switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.moveBottom();
              },1000);
              break;
            case 'piecesLeft':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.moveBottom();
              },1000);
              break;
            case 'piecesRight':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.moveBottom();
              },1000);
              break;
          }
          pieces.moveBottom();
          break;
        case "MOV TOP":
          switch (pieces.borderValue) {
            case 'piecesLeft':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.moveTop();
              },1000);
              break;
            case 'piecesBottom':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.moveTop();
              },1000);
              break;
            case 'piecesRight':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.moveTop();
              },1000);
              break;
          }
          pieces.moveTop();
          break;
      }
    };

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
