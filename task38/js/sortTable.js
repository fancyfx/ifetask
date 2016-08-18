/**
 * [UI组件之排序表格]
 * @param {[string]} id     [需要插入表格的dom id]
 * @param {[type]} colVal [表格行数]
 * @param {[type]} rowVal [表格列数]
 */
function SortTable(id,colVal,rowVal) {
    this.nodeId = id;       // 需要插入表格的dom id
    this.column = colVal;   // 表格行数
    this.row = rowVal;      // 表格列数
    this.td = [];           // 保存表格元素 td 二维数组
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
        for (var j = 0; j < this.row; j++) {
          var nodeTd= document.createElement('td');
          nodeTr1.appendChild(nodeTd);
          this.td[i][j] = nodeTd;
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
          that.sortUp(k);
        };
      })(k);
      (function (k) {
        down.onclick = function () {
          that.sortDown(k);
        };
      })(k);

    }
};

// 填充数据
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
    }
  }
};

// 显示排序按钮
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
// 数字重大到小
SortTable.prototype.sortDown = function (val) {
     var num = [];
     for (var i = 1; i < this.column; i++) {
       if (parseFloat(this.td[i][val].innerHTML)) {
         num.push(parseFloat(this.td[i][val].innerHTML));
       }else {
         num.push(this.td[i][val].innerHTML);
       }
     }
      num.sort();
      for (var k = 1; k < this.column; k++) {
           this.td[k][val].innerHTML = num[k - 1];
      }
};
// 数字重小到大
SortTable.prototype.sortUp = function (val) {
     var num = [];
     for (var i = 1; i < this.column; i++) {
          if (parseFloat(this.td[i][val].innerHTML)) {
            num.push(parseFloat(this.td[i][val].innerHTML));
          }else {
            num.push(this.td[i][val].innerHTML);
          }
     }
      num.sort(function (v1,v2) {
          return v2 - v1;
      });
      for (var k = 1; k < this.column; k++) {
           this.td[k][val].innerHTML = num[k - 1];
      }
};
