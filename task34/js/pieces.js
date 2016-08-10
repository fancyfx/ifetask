/**
 * 棋子对象 定义棋子的属性和方法
 */
var pieces = {
      startVal :'7,7',            //位置
      borderValue : 'piecesTop',  //方块方向  piecesTop:上  piecesRight:右 piecesBottom:下 piecesLeft:左
      onBloo : true   ,            //命令执行状态 防止重复点击
      // 向上移动的方法
      moveTop : function () {
        var val,sp;
        sp = pieces.startVal.split(",");
        val = parseFloat(sp[0]) - 1;
        if (val > 0 && pieces.onBloo) {
           moveAnimation('move-up');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = val + "," + sp[1];
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },1000);
        }
      },
      // 向下移动的方法
      moveBottom : function () {
        var val,sp;
        sp = pieces.startVal.split(",");
        val = parseFloat(sp[0]) + 1;
        if (val < 11 && pieces.onBloo) {
          moveAnimation('move-down');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = val + "," + sp[1];
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },1000);
        }
      },
      // 向左移动的方法
      moveLeft : function () {
        var val,sp;
        sp = pieces.startVal.split(",");
        val = parseFloat(sp[1]) - 1;
        if ( val > 0 && pieces.onBloo) {
          moveAnimation('move-left');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = sp[0] + "," + val;
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },1000);

        }
      },
      // 向右移动的方法
      moveRight : function () {
        var val,sp;
        sp = pieces.startVal.split(",");
        val = parseFloat(sp[1]) + 1;
      if ( val < 11 && pieces.onBloo) {
        moveAnimation('move-right');
        setTimeout(function () {
          removeNode(pieces.startVal);
          pieces.startVal = sp[0] + "," + val;
          // 更新棋子
          addNodePieces();
          pieces.onBloo = true;
        },1000);
      }
      },
      // 向左旋转
      rotateLeft : function () {
        switch (pieces.borderValue) {
          case 'piecesTop':
            pieces.borderValue = 'piecesLeft';
            break;
          case 'piecesBottom':
            pieces.borderValue = 'piecesRight';
            break;
          case 'piecesLeft':
            pieces.borderValue = 'piecesBottom';
            break;
          case 'piecesRight':
            pieces.borderValue = 'piecesTop';
            break;
        }
        if (pieces.onBloo) {
          rotateAnimation('rotate-left');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 1000);
        }
      },
      // 向右旋转
      rotateRight : function () {
        switch (pieces.borderValue) {
          case 'piecesTop':
            pieces.borderValue = 'piecesRight';
            break;
          case 'piecesBottom':
            pieces.borderValue = 'piecesLeft';
            break;
          case 'piecesLeft':
            pieces.borderValue = 'piecesTop';
            break;
          case 'piecesRight':
            pieces.borderValue = 'piecesBottom';
            break;
        }
        if (pieces.onBloo) {
          rotateAnimation('rotate-right');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 1000);
        }
      },
      // 旋转180
      rotateBack : function () {
        switch (pieces.borderValue) {
          case 'piecesTop':
            pieces.borderValue = 'piecesBottom';
            break;
          case 'piecesBottom':
            pieces.borderValue = 'piecesTop';
            break;
          case 'piecesLeft':
            pieces.borderValue = 'piecesRight';
            break;
          case 'piecesRight':
            pieces.borderValue = 'piecesLeft';
            break;
        }
        if (pieces.onBloo) {
          rotateAnimation('rotate-back');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 1000);
        }
      }
};
