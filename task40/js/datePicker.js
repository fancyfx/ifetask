(function(window,document){
   function DatePicker(options){
      //传入配置的中的参数
      this.nodeId = options.id;   // 创建日历组件的 页面元素 id
      this.td = [];               // 存储 dom 的td 对象
      this.year = new Date().getFullYear();     // 当前系统时间 年
      this.month = new Date().getMonth() + 1;   // 当前系统时间 月
      this.day = new Date().getDate();          // 当前系统时间 日
      this.init();
   }
   DatePicker.prototype={
        init:function(){
           this.createDom();
           this.loadCss();
           this.bindEvents();
           this.render();
        },
        loadCss:function(){
           // 把组件所需的样式表动态加载进来

        },
        createDom:function(){
           // 创建dom对象或者创建html片段或者创建template
           var node = '.' +  this.nodeId;
          //  添加 年和月
           $(node).append("<div class='head'>"+
            "<div class='year'><i class='year-left'><</i><span class='year-data'>年</span><i class='year-right'>></i></div> "+
             "<div class='month'><i class='month-left'><</i><span class='month-data'>月</span><i class='month-right'>></i></div></div>");
           $(node).append("<table></table>");
          //  添加星期
           $(node + ' table').append("<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>");
          // 添加 天的包裹元素 td
           for (var i = 0; i < 6; i++) {
             var tr = document.createElement('tr');
             $(node + ' table').append($(tr));
            for (var j = 0; j < 7; j++) {
              var td = document.createElement('td');
              tr.appendChild(td);
              this.td.push(td);
            }
           }
        },
        bindEvents:function(){
           //事件绑定
           var that = this;
        //  年减少
         $('.' + that.nodeId + ' .head .year-left').click(function () {
            that.year--;
            that.render();
         });
        //  年增加
        $('.' + that.nodeId + ' .head .year-right').click(function () {
           that.year++;
           that.render();
        });
        //  月减少
         $('.' + that.nodeId + ' .head .month-left').click(function () {
            that.month--;
            that.render();
         });
        //  月增加
        $('.' + that.nodeId + ' .head .month-right').click(function () {
           that.month++;
           that.render();
        });
        //  点击 td 选择 日期
        $('.' + that.nodeId + ' table td').click(function () {
             that.day = parseInt(this.firstChild.innerHTML);
             that.render();
        });
        },
        render:function(){
          //渲染函数，更新数据或样式
          var node = '.' +  this.nodeId;
          var nowYear = this.year,
              nowMonth = this.month,
              nowDay = this.day;
          var nowDate = calculate(nowYear,nowMonth,nowDay);
          // 添加 年
          $(node + ' .head .year-data').get(0).innerHTML= nowYear+'年';
          // 添加 月
          $(node + ' .head .month-data').get(0).innerHTML= nowMonth+'月';

          // 重置 td
          for (var j = 0; j < this.td.length; j++) {
            this.td[j].innerHTML = '';
            this.td[j].style.backgroundColor = '';
          }
          // 添加 天 显示效果
          this.td[nowDate.whichDay + nowDay - 1].style.backgroundColor = 'rgb(237, 244, 121)';
          // 添加 天
          for (var i = 0; i < nowDate.monthLen; i++) {
            this.td[i + nowDate.whichDay].innerHTML = "<span>"+(i+1)+"</span>";
          }
        }
   };
   window.DatePicker = DatePicker;//把组件对象绑定到全局
}(window,document));

/**
 * [日期计算]
 * @param  {[string]} year  [年]
 * @param  {[string]} month [月]
 * @param  {[string]} day   [日]
 * @return {[object]}       [message]
 * message={
 * year          // 年
 * month         // 月
 * monthLen      // 这个月有几天
 * whichDay      // 1号是周几
 * day           // 天
 * }
 */
function calculate(year,month,day){
   var date=year+'/'+month+'/'+'1';
   var whichDay=new Date(date).getDay();
    var message={
          year:year,
          month:month,
          monthLen:new Date(year,month,0).getDate(),
          whichDay:whichDay,
          day:day
    };
    return message;
}
