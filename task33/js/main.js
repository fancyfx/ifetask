window.onload = function () {
 addGrid();
 addPieces();
};
var startVal = '7,7', //位置
    directionVal = "⬇️";  //方向
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
          switch (directionVal) {
            case "⬆️":
              directionVal = "⬅️";
              break;
            case "⬇️":
              directionVal = "➡️";
              break;
            case "⬅️":
              directionVal = "⬇️";
              break;
            case "➡️":
              directionVal = "⬆️";
              break;
          }
          removeNode(startVal);
          addNodePieces(startVal,directionVal);
          break;
        case "TUN RIG":
        switch (directionVal) {
          case "⬆️":
            directionVal = "➡️";
            break;
          case "⬇️":
            directionVal = "⬅️";
            break;
          case "⬅️":
            directionVal = "⬆️";
            break;
          case "➡️":
            directionVal = "⬇️";
            break;
        }
          removeNode(startVal);
          addNodePieces(startVal,directionVal);
          break;
        case "TUN BAC":
            switch (directionVal) {
              case "⬆️":
                directionVal = "⬇️";
                break;
              case "⬇️":
                directionVal = "⬆️";
                break;
              case "⬅️":
                directionVal = "➡️";
                break;
              case "➡️":
                directionVal = "⬅️";
                break;
            }
            removeNode(startVal);
            addNodePieces(startVal,directionVal);
          break;
      }
    };

/**
 * 添加棋子页面元素
 */
function addNodePieces(startVal,directionVal) {
  var startNod = document.getElementById(startVal);
  var backNod = startNod.getElementsByTagName('span');
  if (backNod.length < 1) {
    var spanNod = document.createElement('span');
    startNod.appendChild(spanNod);
    spanNod.innerHTML = directionVal;
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

function addPieces() {

    // 初始化棋子位置
    addNodePieces(startVal,directionVal);

}

/**
 * 棋子前进 处理逻辑
 */
function controlPieces() {
    var val,sp;
    switch (directionVal) {
      case "⬆️":
        sp = startVal.split(",");
        val = parseFloat(sp[0]) - 1;
        if (val > 0) {
          removeNode(startVal);
          startVal = val + "," + sp[1];
          // 更新棋子
          addNodePieces(startVal,directionVal);
        }
        break;
      case "⬇️":
        sp = startVal.split(",");
        val = parseFloat(sp[0]) + 1;
        if (val < 11 ) {
          removeNode(startVal);
          startVal = val + "," + sp[1];
          // 更新棋子
          addNodePieces(startVal,directionVal);
        }
        break;
      case "⬅️":
        sp = startVal.split(",");
        val = parseFloat(sp[1]) - 1;
        if ( val > 0 ) {
          removeNode(startVal);
          startVal = sp[0] + "," + val;
          // 更新棋子
          addNodePieces(startVal,directionVal);
        }
        break;
      case "➡️":
          sp = startVal.split(",");
          val = parseFloat(sp[1]) + 1;
        if ( val < 11 ) {
          removeNode(startVal);
          startVal = sp[0] + "," + val;
          // 更新棋子
          addNodePieces(startVal,directionVal);
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
