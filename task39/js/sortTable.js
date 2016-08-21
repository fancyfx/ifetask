/**
 * [UI组件之排序表格]
 * @param {[string]} id             [需要插入表格的dom id]
 * @param {[type]} colVal           [表格行数]
 * @param {[type]} rowVal           [表格列数]
 * @param {[type]} compareApiUp     [up 按钮排序接口]
 * @param {[type]} compareApiDown   [down 按钮排序接口]
 */
function SortTable(id,colVal,rowVal,compareApiUp,compareApiDown) {
    this.nodeId = id;                    // 需要插入表格的dom id
    this.column = colVal;                // 表格行数
    this.row = rowVal;                   // 表格列数
    this.td = [];                        // 保存表格元素 td 二维数组
    this.tbData = [];                    // 保存表格数据 二维数组
    this.compareUp = compareApiUp;       // up 按钮排序接口
    this.compareDown = compareApiDown;   // down 按钮排序接口

}
// 绘制表格
SortTable.prototype.setUI = function () {
    if ( typeof(this.column) === 'number' && typeof(this.row) === 'number') {
      var node = document.getElementById(this.nodeId);
      var nodeTable = document.createElement('table');
      node.appendChild(nodeTable);
      for (var i = 0; i < this.column; i++) {
        var nodeTr1= document.createElement('tr');
        nodeTable.appendChild(nodeTr1);
        this.td[i] = [];
        this.tbData[i] = [];
        for (var j = 0; j < this.row; j++) {
          var nodeTd= document.createElement('td');
          nodeTr1.appendChild(nodeTd);
          this.td[i][j] = nodeTd;
          this.tbData[i][j] = '';
        }
      }
    }
    // 给第一行加上排序按钮
    for (var k = 0; k < this.row; k++) {
      // 添加图标元素
      var up = document.createElement('i');
      up.setAttribute('class','iconfont1');
      up.innerHTML = '&#xe600;';
      var down = document.createElement('i');
      down.setAttribute('class','iconfont2');
      down.innerHTML = '&#xe601;';
      this.td[0][k].appendChild(up);
      this.td[0][k].appendChild(down);
      // 隐藏图标
      up.style.display = 'none';
      down.style.display = 'none';
      var that = this;
      // 给图标添加点击事件
      (function (k) {
        up.onclick = function () {
          if (!this.compareUp) {
            that.sortUp(k);
          }

        };
      })(k);
      (function (k) {
        down.onclick = function () {
          if (!this.compareDown) {
            that.sortDown(k);
          }
        };
      })(k);

    }
};

/**
 * [填充数据]
 * @param {[number]} num1 [行]
 * @param {[number]} num2 [列]
 * @param {[type]} val  [内容]
 */
SortTable.prototype.setData = function (num1,num2,val) {
  if ( typeof(num1) === 'number' && typeof(num2) === 'number') {
    if (this.td[num1][num2]) {
      // 删除之前的内容
        for (var i = 0; i < this.td[num1][num2].childNodes.length; i++) {
          if (this.td[num1][num2].childNodes[i].nodeName === '#text') {
              this.td[num1][num2].removeChild(this.td[num1][num2].childNodes[i]);
          }
        }
      // 覆盖新内容
        var text = document.createTextNode(val);
        this.td[num1][num2].appendChild(text);
        this.tbData[num1][num2] = val;
    }
  }
};


/**
 * [显示排序按钮]
 * @param  {[type]} val [要显示的那一列 从 1 开始]
 */
SortTable.prototype.showSortButton = function (val) {
  if ( typeof(val) === 'number' && val <= this.row){
    var that = this;
    for (var i = 0; i < this.td[0][val - 1].childNodes.length; i++) {
      if (this.td[0][val - 1].childNodes[i].nodeName === 'I') {
          this.td[0][val - 1].childNodes[i].style.display = 'block';
      }
    }
  }
};

// 排序处理逻辑
// 数字从大到小
SortTable.prototype.sortDown = function (val) {
    var newTbData = this.tbData.slice(1);
    newTbData.sort(function (v1,v2) {
        return v1[val] -  v2[val];
    });
    for (var i = 1; i < this.column; i++) {
      for (var j = 0; j < this.row; j++) {
        this.td[i][j].innerHTML = newTbData[i - 1][j];
      }
    }
};
// 数字从小到大
SortTable.prototype.sortUp = function (val) {
  var newTbData = this.tbData.slice(1);
  newTbData.sort(function (v1,v2) {
      return v2[val] -  v1[val];
  });
  for (var i = 1; i < this.column; i++) {
    for (var j = 0; j < this.row; j++) {
      this.td[i][j].innerHTML = newTbData[i - 1][j];
    }
  }
};

// 表格超出屏幕 冻结首行
SortTable.prototype.freezeFirstLineForPc = function () {
  var id = '#' + this.nodeId;
  $(window).scroll(function() {
    var topNum = $(id).get(0).offsetTop - $(window).scrollTop();
    var tableH = $(id).height();
    if (topNum < 0 && topNum > (-tableH)) {
      $(id +' tr:first-child').css({"position":"fixed","top":"0"});
    }else {
      $(id +' tr:first-child').css({"position":"","top":"0"});
    }
  });
};


//  超出父div 冻结首行
SortTable.prototype.freezeFirstLineForParNode = function () {
    var id = '#' + this.nodeId;
  $(id).scroll(function() {
    var topNum =  $(id).scrollTop();
    if (topNum > 0 ) {
      $(id).css({"position":"relative"});
      $(id +' tr:first-child').css({"position":"absolute","top":topNum + 'px'});
    }else {
      $(id +' tr:first-child').css({"position":"","top":"0"});
    }
  });
};
