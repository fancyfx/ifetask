/**
 * [日历组件]
 * 调用示例(配置说明)：
 * // 创建 日历
 * var date = new DatePicker({
 *        id:"date",                   // 日历组件 dom class（必须否则无法 创建 由于用的是jQuery选择器 id请+ # class + .）
 *        maxDate:'2016/8/31',         // 可选 时间段最大时间（非必选，注意格式一定要相同）
 *         minDate:'2016/8/1'          // 可选 时间段最小时间（非必选，注意格式一定要相同）
 *    });
 *  // 设置日历时间 （注意：设置参数一定要和下面一样）
 *  date.setAndGetDate().setDate(
 *      {
 *        year:2016,
 *        month:8,
 *        day:1
 *      }
 *    );
 *  // 获取日历时间
 *  date.setAndGetDate().getDate();
 */


(function(window,document){
   function DatePicker(options){
      // 创建日历组件的 页面元素 id
      if (!options.id) return;
      this.nodeid = options.id ;
      this.td = [];               // 存储 dom 的td 对象
      // 初始化时日历当前时间
      this.year = new Date().getFullYear();    // 当前时间 年
      this.month = new Date().getMonth() + 1;   // 当前时间 月
      this.day = new Date().getDate();          // 当前时间 日
      this.selectDate ={                        //保存当前选择 日期
          year:new Date().getFullYear(),
          month:new Date().getMonth() + 1,
          day:new Date().getDate()
      };

      // 可选日期范围  最大日期
      if (options.maxDate ) {
        this.maxDate = new Date(options.maxDate);
      }else {
        // 默认 为空
        this.maxDate = null;
      }
      // 可选日期范围  最大日期
      if (options.minDate ) {
        this.minDate = new Date(options.minDate);
      }else {
        // 默认 为空
        this.minDate = null;
      }

      this.init();
   }
   DatePicker.prototype={
        init:function(){
           this.createDom();
           this.loadCss();
           this.bindEvents();
           this.render();
           this.setAndGetDate();
        },
        loadCss:function(){
           // 把组件所需的样式表动态加载进来

        },
        createDom:function(){
           // 创建dom对象或者创建html片段或者创建template
          //  添加 年和月
          $(this.nodeid).append("<div class='date'></div>");
           $(this.nodeid + ' .date').append("<div class='head'>"+
            "<div class='year'><i class='year-left'><</i><span class='year-data'>年</span><i class='year-right'>></i></div> "+
             "<div class='month'><i class='month-left'><</i><span class='month-data'>月</span><i class='month-right'>></i></div></div>");
           $(this.nodeid+ ' .date').append("<table></table>");
          //  添加星期
           $(this.nodeid + ' .date table').append("<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>");
          // 添加 天的包裹元素 td
           for (var i = 0; i < 6; i++) {
             var tr = document.createElement('tr');
             $(this.nodeid + ' .date table').append($(tr));
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
         $(this.nodeid + ' .date .head .year-left').click(function () {
             if (that.year > 0 ) {
                 that.year--;
                 that.render();
             }
         });
        //  年增加
        $(this.nodeid + ' .date .head .year-right').click(function () {
            that.year++;
            that.render();
      });
        //  月减少
         $(this.nodeid + ' .date .head .month-left').click(function () {
             if (that.month > 1) {
               that.month--;
             }else {
               that.year--;
               that.month = 12;
             }
              that.render();
         });
        //  月增加
        $(this.nodeid+ ' .date .head .month-right').click(function () {
            if (that.month < 12) {
              that.month++;
            }else {
              that.year++;
              that.month = 1;
            }
             that.render();
        });
        //  点击 td 选择 日期
        $(this.nodeid + ' .date table td').click(function () {
              if (!this.firstChild) return;
              if (this.firstChild.getAttribute('class') === 'clickable') {
                that.selectDate.year = that.year;
                that.selectDate.month = that.month;
                  that.selectDate.day = parseInt(this.firstChild.innerHTML);
                that.render();
              }else if(this.firstChild.getAttribute('class') === 'unclickable'){
                alert('该日期不可选');
              }

        });
        },
        render:function(){
          //渲染函数，更新数据或样式
          var nowDate = calculate(this.year,this.month,this.day);
          // 添加 年
          $(this.nodeid + ' .date .head .year-data').get(0).innerHTML= this.year+'年';
          // 添加 月
          $(this.nodeid + ' .date .head .month-data').get(0).innerHTML= this.month+'月';

          // 重置 td
          for (var j = 0; j < this.td.length; j++) {
            this.td[j].innerHTML = '';
            this.td[j].style.backgroundColor = '';
          }
          // 添加 这个月 天数
          for (var i = 0; i < nowDate.monthLen; i++) {
            // maxDate 为空
            if (this.minDate && !this.maxDate) {
              if( new Date(this.year,this.month -1,i+1) >= this.minDate){
                 this.td[i + nowDate.whichDay].innerHTML = "<span class='clickable'>"+(i+1)+"</span>";
              }else {
                // 不可选时间样式
                  this.td[i + nowDate.whichDay].innerHTML = "<span class='unclickable'>"+(i+1)+"</span>";
              }
            }
            // minDate 为空
            if (!this.minDate && this.maxDate) {
              if( new Date(this.year,this.month - 1,i+1) <= this.maxDate){
                 this.td[i + nowDate.whichDay].innerHTML = "<span class='clickable'>"+(i+1)+"</span>";
              }else {
                // 不可选时间样式
                  this.td[i + nowDate.whichDay].innerHTML = "<span class='unclickable'>"+(i+1)+"</span>";
              }
            }
            // minDate和maxDate 都不为空
            if (this.minDate && this.maxDate) {
              if (new Date(this.year,this.month - 1,i+1) <= this.maxDate && new Date(this.year,this.month -1,i+1) >= this.minDate) {
                  this.td[i + nowDate.whichDay].innerHTML = "<span class='clickable'>"+(i+1)+"</span>";
                }else {
                  this.td[i + nowDate.whichDay].innerHTML = "<span class='unclickable'>"+(i+1)+"</span>";
                }
            }
            // minDate和maxDate 都为空
            if (!this.minDate && !this.maxDate) {
                this.td[i + nowDate.whichDay].innerHTML = "<span class='clickable'>"+(i+1)+"</span>";
            }
          }
          // 添加上个月 天数
          for (var k = 0; k < nowDate.whichDay; k++) {
              this.td[nowDate.whichDay- k - 1].innerHTML = "<span class='elseMonth'>"+(nowDate.lastMonthLen - k)+"</span>";
          }
          // 添加下个月 天数
          for (var g = nowDate.whichDay + nowDate.monthLen,num = 1 ; g < this.td.length; g++) {
              this.td[g].innerHTML = "<span class='elseMonth'>"+(num++)+"</span>";
          }
           // 添加 选择的天 显示效果
          if (this.year === this.selectDate.year && this.month === this.selectDate.month) {
            if (this.selectDate.day) {
              var selectDate = calculate(this.selectDate.year,this.selectDate.month,this.selectDate.day);
              this.td[selectDate.whichDay + this.selectDate.day - 1].style.backgroundColor = 'rgb(212, 240, 77)';
            }

          }
        },
        setAndGetDate:function () {
          // 设置 和获取 日期接口
          var that = this;
          return {
            setDate:function (dateVal) {   // 设置日期
              // maxDate 为空
              if (that.minDate && !that.maxDate) {
                if( new Date(dateVal.year,dateVal.month -1,dateVal.day) >= that.minDate){
                  that.selectDate.year = dateVal.year;
                  that.selectDate.month = dateVal.month;
                  that.selectDate.day = dateVal.day;
                  that.year = dateVal.year;
                  that.month = dateVal.month;
                  that.render();
                }else {
                  alert('超过时间范围，无法设置');
                }
              }
              // minDate 为空
              if (!that.minDate && that.maxDate) {
                if( new Date(dateVal.year,dateVal.month -1,dateVal.day) <= that.maxDate){
                  that.selectDate.year = dateVal.year;
                  that.selectDate.month = dateVal.month;
                  that.selectDate.day = dateVal.day;
                  that.year = dateVal.year;
                  that.month = dateVal.month;
                  that.render();
                }else {
                  alert('超过时间范围，无法设置');
                }
              }
              // minDate和maxDate 都不为空
              if (that.minDate && that.maxDate) {
                if (new Date(dateVal.year,dateVal.month -1,dateVal.day) <= that.maxDate &&
                new Date(dateVal.year,dateVal.month -1,dateVal.day) >= that.minDate) {
                  that.selectDate.year = dateVal.year;
                  that.selectDate.month = dateVal.month;
                  that.selectDate.day = dateVal.day;
                  that.year = dateVal.year;
                  that.month = dateVal.month;
                  that.render();
                  }else {
                  alert('超过时间范围，无法设置');
                  }
              }
              // minDate和maxDate 都为空
              if (!that.minDate && !that.maxDate) {
                that.selectDate.year = dateVal.year;
                that.selectDate.month = dateVal.month;
                that.selectDate.day = dateVal.day;
                that.year = dateVal.year;
                that.month = dateVal.month;
                that.render();
              }
            },
            getDate:function () {   // 获取日期
                return that.selectDate;
            },
          };

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
 * lastMonthLen   // 上个月有几天
 * monthLen       // 这个月有几天
 * nextMonthLen   // 下个月有几天
 * whichDay       // 1号是周几
 * }
 */
function calculate(year,month,day){
   var date=year+'/'+month+'/'+'1';
   var whichDay=new Date(date).getDay();
    var message={
          lastMonthLen:new Date(year,month - 1,0).getDate(),
          monthLen:new Date(year,month,0).getDate(),
          nextMonthLen:new Date(year,month + 1,0).getDate(),
          whichDay:whichDay,
    };
    return message;
}
