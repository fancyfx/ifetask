window.onload = function () {
  var table = new SortTable('scor-table',5,4);
  table.setUI();
  table.setData(0,0,"姓名");
  table.setData(0,1,"数学");
  table.setData(0,2,"物理");
  table.showSortButton(2);
  table.showSortButton(10);
  table.setData(1,1,'h');
  table.setData(2,1,1820);
  table.setData(3,1,'啊哈哈');
  table.setData(4,1,-1);
  table.setData(1,2,3);
  table.setData(2,2,4);
  table.setData(3,2,3);
  table.setData(4,2,4);
};
