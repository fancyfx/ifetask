window.onload = function () {
 addGrid();
 addNodePieces();
};
var startVal = '7,7', //位置
    borderValue = 'piecesTop',  //方块方向  piecesTop:上  piecesRight:右 piecesBottom:下 piecesLeft:左
    moveVal = 'move-up',  //动画移动方向
    onBloo = true; //命令执行状态 防止重复点击
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
          controlPieces();
          break;
        case "TUN LEF":
          switch (borderValue) {
            case 'piecesTop':
              borderValue = 'piecesLeft';
              break;
            case 'piecesBottom':
              borderValue = 'piecesRight';
              break;
            case 'piecesLeft':
              borderValue = 'piecesBottom';
              break;
            case 'piecesRight':
              borderValue = 'piecesTop';
              break;
          }
          if (onBloo) {
            rotateAnimation('rotate-left');
            setTimeout(function () {
              removeNode(startVal);
              addNodePieces();
              onBloo = true;
            }, 1000);
          }
          break;
        case "TUN RIG":
        switch (borderValue) {
          case 'piecesTop':
            borderValue = 'piecesRight';
            break;
          case 'piecesBottom':
            borderValue = 'piecesLeft';
            break;
          case 'piecesLeft':
            borderValue = 'piecesTop';
            break;
          case 'piecesRight':
            borderValue = 'piecesBottom';
            break;
        }
        if (onBloo) {
          rotateAnimation('rotate-right');
          setTimeout(function () {
            removeNode(startVal);
            addNodePieces();
            onBloo = true;
          }, 1000);
        }
          break;
        case "TUN BAC":
            switch (borderValue) {
              case 'piecesTop':
                borderValue = 'piecesBottom';
                break;
              case 'piecesBottom':
                borderValue = 'piecesTop';
                break;
              case 'piecesLeft':
                borderValue = 'piecesRight';
                break;
              case 'piecesRight':
                borderValue = 'piecesLeft';
                break;
            }
            if (onBloo) {
              rotateAnimation('rotate-back');
              setTimeout(function () {
                removeNode(startVal);
                addNodePieces();
                onBloo = true;
              }, 1000);
            }
          break;
      }
    };

/**
 * 添加棋子页面元素
 */
function addNodePieces() {
  var startNod = document.getElementById(startVal);
  var backNod = startNod.getElementsByTagName('span');
  if (backNod.length < 1) {
    var spanNod1 = document.createElement('span');
    startNod.appendChild(spanNod1);
    spanNod1.setAttribute('class', 'pieces '+ borderValue);
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
 * 保存棋子位置和方向方法
 * 初始化添加位置
 */
//
// function addPieces() {
//
//     // 初始化棋子位置
//     addNodePieces(startVal);
//
// }

/**
 * 棋子前进 处理逻辑
 */
function controlPieces() {
    var val,sp;
    switch (borderValue) {
      case 'piecesTop':
        sp = startVal.split(",");
        val = parseFloat(sp[0]) - 1;
        if (val > 0 && onBloo) {
          moveVal = 'move-up';
           moveAnimation();
          setTimeout(function () {
            removeNode(startVal);
            startVal = val + "," + sp[1];
            // 更新棋子
            addNodePieces();
            onBloo = true;
          },1000);
        }
        break;
      case 'piecesBottom':
        sp = startVal.split(",");
        val = parseFloat(sp[0]) + 1;
        if (val < 11 && onBloo) {
          moveVal = 'move-down';
          moveAnimation();
          setTimeout(function () {
            removeNode(startVal);
            startVal = val + "," + sp[1];
            // 更新棋子
            addNodePieces();
            onBloo = true;
          },1000);
        }
        break;
      case 'piecesLeft':
        sp = startVal.split(",");
        val = parseFloat(sp[1]) - 1;
        if ( val > 0 && onBloo) {
          moveVal = 'move-left';
          moveAnimation();
          setTimeout(function () {
            removeNode(startVal);
            startVal = sp[0] + "," + val;
            // 更新棋子
            addNodePieces();
            onBloo = true;
          },1000);

        }
        break;
      case 'piecesRight':
          sp = startVal.split(",");
          val = parseFloat(sp[1]) + 1;
        if ( val < 11 && onBloo) {
          moveVal = 'move-right';
          moveAnimation();
          setTimeout(function () {
            removeNode(startVal);
            startVal = sp[0] + "," + val;
            // 更新棋子
            addNodePieces();
            onBloo = true;
          },1000);
        }
        break;
    }
}

/**
 * 删除原来位置上的棋子
 */
function removeNode(startVal) {
   var parNode = document.getElementById(startVal);
   var oldNode = parNode.getElementsByTagName('span');
    parNode.removeChild(oldNode[0]);
}

/**
 * 运行棋子移动动画
 */
function moveAnimation() {
    var parNode = document.getElementById(startVal);
    var spanNode = parNode.getElementsByTagName('span');
    spanNode[0].style.animation = moveVal+' 1s 1 linear forwards';
    onBloo = false;
}

/**
 * 运行旋转动画
 */
 function rotateAnimation(rotateVal) {
     var parNode = document.getElementById(startVal);
     var spanNode = parNode.getElementsByTagName('span');
     spanNode[0].style.animation = rotateVal+' 1s 1 linear forwards';
     onBloo = false;
 }
