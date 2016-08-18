/**
 * 棋子对象 定义棋子的属性和方法
 */
var pieces = {
      startVal :'5,5',            //位置
      borderValue : 'piecesTop',  //方块方向  piecesTop:上  piecesRight:右 piecesBottom:下 piecesLeft:左
      onBloo : true   ,            //命令执行状态 防止重复点击
      // 向上移动的方法
      tarTop : function () {
        var x = charXandY(pieces.startVal).x,
            y = charXandY(pieces.startVal).y;
            x -= 1;
        if (x < 1 || !pieces.onBloo || wallArray[x][y] !== -1) return;
           moveAnimation('move-up');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = x+','+y;
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },500);
      },
      // 向下移动的方法
      tarBottom : function () {
        var x = charXandY(pieces.startVal).x,
            y = charXandY(pieces.startVal).y;
            x += 1;
        if (x > 10 || !pieces.onBloo || wallArray[x][y] !== -1) return;
          moveAnimation('move-down');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = x+','+y;
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },500);
      },
      // 向左移动的方法
      tarLeft : function () {
        var x = charXandY(pieces.startVal).x,
            y = charXandY(pieces.startVal).y;
            y -= 1;
        if ( y < 1 || !pieces.onBloo || wallArray[x][y] !== -1) return;
          moveAnimation('move-left');
          setTimeout(function () {
            removeNode(pieces.startVal);
            pieces.startVal = x+','+y;
            // 更新棋子
            addNodePieces();
            pieces.onBloo = true;
          },500);

      },
      // 向右移动的方法
      tarRight : function () {
        var x = charXandY(pieces.startVal).x,
            y = charXandY(pieces.startVal).y;
            y += 1;
      if ( y > 10 || !pieces.onBloo || wallArray[x][y] !== -1) return;
        moveAnimation('move-right');
        setTimeout(function () {
          removeNode(pieces.startVal);
          pieces.startVal = x+','+y;
          // 更新棋子
          addNodePieces();
          pieces.onBloo = true;
        },500);
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
          if (!pieces.onBloo) return;
          rotateAnimation('rotate-left');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 500);
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
        if (!pieces.onBloo) return;
          rotateAnimation('rotate-right');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 500);

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
        if (!pieces.onBloo) return;
          rotateAnimation('rotate-back');
          setTimeout(function () {
            removeNode(pieces.startVal);
            addNodePieces();
            pieces.onBloo = true;
          }, 500);
      },
      moveTop:function () {
        switch (pieces.borderValue) {
            case 'piecesLeft':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.tarTop();
              },500);
              break;
            case 'piecesBottom':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.tarTop();
              },500);
              break;
            case 'piecesRight':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.tarTop();
              },500);
              break;
              default:
              pieces.tarTop();
          }
      },
      moveLeft:function () {
        switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.tarLeft();
              },500);
              break;
            case 'piecesBottom':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.tarLeft();
              },500);
              break;
            case 'piecesRight':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.tarLeft();
              },500);
              break;
              default:
              pieces.tarLeft();
          }
      },
      moveBottom:function () {
        switch (pieces.borderValue) {
           case 'piecesTop':
             pieces.rotateBack();
             setTimeout(function () {
               pieces.tarBottom();
             },500);
             break;
           case 'piecesLeft':
             pieces.rotateLeft();
             setTimeout(function () {
               pieces.tarBottom();
             },500);
             break;
           case 'piecesRight':
             pieces.rotateRight();
             setTimeout(function () {
               pieces.tarBottom();
             },500);
             break;
             default:
             pieces.tarBottom();
         }

      },
      moveRight:function () {
        switch (pieces.borderValue) {
            case 'piecesTop':
              pieces.rotateRight();
              setTimeout(function () {
                pieces.tarRight();
              },500);
              break;
            case 'piecesBottom':
              pieces.rotateLeft();
              setTimeout(function () {
                pieces.tarRight();
              },500);
              break;
            case 'piecesLeft':
              pieces.rotateBack();
              setTimeout(function () {
                pieces.tarRight();
              },500);
              break;
              default:
              pieces.tarRight();
          }
      }
};
