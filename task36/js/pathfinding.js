/**
 * A star 寻路算法的实现
 */


function path(startVal,endVAL) {

      var x = charXandY(endVAL).x,
          y = charXandY(endVAL).y;
      if (wallArray[x][y] === -1) {
        var aStarResult = aStar(startVal,endVAL);
        if (aStarResult) {
          var path = [];
          var parNodeVal = aStarResult.parNode;
          path.push(aStarResult);
          path.push(parNodeVal);
          (function findPath() {
            if (parNodeVal.G !== 0) {
               parNodeVal = parNodeVal.parNode;
               path.push(parNodeVal);
                findPath();
            }
          })();
          var pathXandY = [];
          // 把路径坐标转换为字符串
          for (var i = path.length - 2; i > -1; i--) {
              pathXandY.push(path[i].x +','+path[i].y);
          }
          return pathXandY;
        }else {
          alert("无法到达终点");
          return [];
        }
      }else {
        alert('该位置不可用，请重新选择');
        return [];

      }


}

function aStar(startVal,endVal) {
    var start = {
      x:charXandY(startVal).x,
      y:charXandY(startVal).y,
      G:0
    };
    var end = {
      x:charXandY(endVal).x,
      y:charXandY(endVal).y
    };
    var openList = [];               // 待检查节点列表
    var closedList = [];             // 已检查节点列表
    openList.push(start);            // 把起点加入待检查节点
    canMoveGrid(start,end,openList,closedList); //把所有已经找到的邻居加入 openList
    openList.splice(0,1);            // 取出已经完成检查的节点
    closedList.push(start);          // 加入已检查节点列表

    if (openList.length > 0) {
      while (openList.length) {
        var current =  openList.sort(compare).pop();
        if (current.H === 0) {
          return current;
        }else{
          closedList.push(current);
          canMoveGrid(current,end,openList,closedList);

        }
      }
      return null;
    }else {
       console.log('起点无法移动');
    }

}
/**
 * [找出周围可移动的格子]
 */
function canMoveGrid(parNodeVal,endVal,openListArry,closedListArray) {
    // 相邻方块
    var topGrid = {
        x:parNodeVal.x - 1,
        y:parNodeVal.y,
        G:null,
        H:null,
        F:null,
        parNode:null
    };
      // 判断该位置是否合法（是否超出边界或者有墙）
    topGrid.bl = isTrue(topGrid.x,topGrid.y);
    var lefGrid = {
        x:parNodeVal.x,
        y:parNodeVal.y - 1,
        G:null,
        H:null,
        F:null,
        parNode:null
    };
    lefGrid.bl = isTrue(lefGrid.x,lefGrid.y);
    var rigGrid = {
        x:parNodeVal.x,
        y:parNodeVal.y + 1,
        G:null,
        H:null,
        F:null,
        parNode:null
    };
    rigGrid.bl = isTrue(rigGrid.x,rigGrid.y);
    var botGrid = {
        x:parNodeVal.x + 1,
        y:parNodeVal.y,
        G:null,
        H:null,
        F:null,
        parNode:null
    };
    botGrid.bl = isTrue(botGrid.x,botGrid.y);
    // 找出相邻的格子
    gridGHG(topGrid,parNodeVal,endVal,openListArry,closedListArray); //上
    gridGHG(rigGrid,parNodeVal,endVal,openListArry,closedListArray); // 右
    gridGHG(lefGrid,parNodeVal,endVal,openListArry,closedListArray); // 左
    gridGHG(botGrid,parNodeVal,endVal,openListArry,closedListArray); // 下
}


/**
 * [计算有效的方块的GHG 值 并设置父节点 ]
 * @param {[type]} val        [当前位置的坐标]
 * @param {[type]} parNodeVal [父节点的坐标和G值]
 * @param {[type]} endVal     [终点坐标]
 */
function gridGHG(val,parNodeVal,endVal,openListArry,closedListArray){
  if (isClosedList(val,closedListArray)) return;
  if (!val.G) {
    if (val.bl ) {
      val.G = parNodeVal.G + 1;
      val.H = Math.abs(val.x- endVal.x) +
              Math.abs(val.y - endVal.y);
      val.F = val.G + val.H;
      val.parNode = parNodeVal;
      openListArry.push(val);
    }
  }else if (val.G > parNodeVal.G + 1) {
    val.G = parNodeVal.G + 1;
    val.F = val.G + val.H;
    val.parNode = parNodeVal;
  }
}

  // 判断该位置是否合法（是否超出边界或者有墙,是否在openListVal里面）
function isTrue(xVal,yVal,openListVal) {
  if (xVal > 0 && xVal < 11 && yVal > 0 && yVal < 11 &&
      wallArray[xVal][yVal] === -1) {
        return true;
      }else {
        return false;
      }

}
// 判断该位置是否已在已检查列表
function isClosedList(val,closedListArray) {
    for (var i = 0; i < closedListArray.length; i++) {
      if (closedListArray[i].x === val.x && closedListArray[i].y === val.y) {
          return true;
      }
    }
    return false;
}
/**
 * openList 数组 比较函数
 */
function compare(v1,v2) {
   return v2.F - v1.F;
}
