window.onload = function () {
  var table = new SortTable('scor-table',15,4);
  table.setUI();
  table.setData(0,0,"姓名");
  table.setData(0,1,"数学");
  table.setData(0,2,"物理");
  table.setData(0,3,"总分");
  table.showSortButton(2);
  table.showSortButton(3);
  table.showSortButton(4);
  for (var i = 1; i < 15; i++) {
    for (var j = 0; j < 4; j++) {
      table.setData(i,j,11);
    }
  }
table.freezeFirstLineForPc();
};
