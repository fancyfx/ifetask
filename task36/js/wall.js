/**
 * 墙对象的属性和方法
 */

function Wall(placeVal) {
    this.palce = placeVal;        //位置坐标
    this.wallColor = '#999';    //墙的颜色
    // 定义一个二维数组 并初始化为0 保证当前位置的墙的信息
    var palceArray = [];
    for (var i = 0; i < 11; i++) {
      palceArray[i] = [];
      for (var j = 0; j < 11; j++) {
        palceArray[i][j] = 0;
      }
    }
    this.palceState = palceArray;
}
// 新建墙方法
Wall.prototype.setWall = function () {
  var x = charXandY(this.palce).x,
      y = charXandY(this.palce).y;
   var startNod = document.getElementById(this.palce);
   var backNod = startNod.getElementsByTagName('span');
   if (this.palceState[x][y] !== -1 && x > 0 && y > 0 && x < 11 && y < 11 && backNod.length< 1) {
       var spanNod1 = document.createElement('span');
       startNod.appendChild(spanNod1);
       spanNod1.setAttribute('class', 'wall');
       spanNod1.style.backgroundColor = this.wallColor;
       this.palceState[x][y] = 1;
       return true;
   }else {
     console.log('修建失败，该位置已有元素或者越界？');
     return false;

   }
};
// 给墙添加颜色方法
Wall.prototype.setWallColor = function (colorVal) {
  var sp = this.palce.split(",");
  var x = parseFloat(sp[0]),
      y = parseFloat(sp[1]);
  var startNod = document.getElementById(this.palce);
  var backNod = startNod.getElementsByTagName('span');
  if (this.palceState[x][y] === 1) {
      backNod[0].style.backgroundColor = colorVal;
  }else {
    console.log('粉刷错误，该位置没有墙');
  }
};
// 删除墙方法
Wall.prototype.removWall = function () {
  removeNode(this.palce);
  var x = charXandY(this.palce).x,
      y = charXandY(this.palce).y;
  wallArray[x][y] = -1;
};
// 建墙 BUILD 处理逻辑
function buiid() {
    var x = charXandY(pieces.startVal).x,
        y = charXandY(pieces.startVal).y;
    switch (pieces.borderValue) {
      case 'piecesTop':
        x -= 1;
        break;
      case 'piecesRight':
        y += 1;
        break;
      case 'piecesBottom':
        x += 1;
        break;
      case 'piecesLeft':
        y -= 1;
        break;
    }
    var wall = new Wall(x+','+y);
    if (wallArray[x][y] === -1 && wall.setWall()) {
        wallArray[x][y] = wall;
        return true;
    }else {
        return false;
    }
}

// 粉刷墙 BRU color 指令处理逻辑
function bruColor(val) {
  var x = charXandY(pieces.startVal).x,
      y = charXandY(pieces.startVal).y;
  switch (pieces.borderValue) {
    case 'piecesTop':
      x -= 1;
      break;
    case 'piecesRight':
      y += 1;
      break;
    case 'piecesBottom':
      x += 1;
      break;
    case 'piecesLeft':
      y -= 1;
      break;
  }
  if (wallArray[x][y] !== -1) {
    wallArray[x][y].setWallColor(val.substr(4));
  }else {
    console.log('刷墙失败，该位置没有墙');
  }

}
