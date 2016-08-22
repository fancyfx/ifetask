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
 *  date.setAndGetDate().getDate();      // yyyy-mm-dd
 *  // 获取用户选择状态
 * date.setAndGetDate().getIsSelectDate()   // false or true
 *
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

      this.isSelectDate = false;                                 // 用户现在状态
      this.isTimeBucket = options.isTimeBucket || false;         // 是否启用时间段
      this.minTimeBucket = options.minTimeBucket || 2;           //  时间段最小跨度
      this.maxTimeBucket = options.maxTimeBucket || 90;          //  时间段最大跨度
      this.selectDate ={                        //保存当前选择 日期(时间选择时 第一次选择时间)
          year:new Date().getFullYear(),
          month:new Date().getMonth() + 1,
          day:new Date().getDate()
      };
      this.selectDate2 ={                        //时间选择时 保存第二次选择时间
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
           this.bindEvents();
           this.render();
        },
        createDom:function(){
           // 创建dom对象或者创建html片段或者创建template
          //  添加 年和月
          //  添加日历输入框
          $(this.nodeid).append("<div class='date-input'><i class='date-iconfont'>&#xe600;</i>"+
          "<input type='text' name='date-input'></div>");
          //  添加日历dom
          $(this.nodeid).append("<div class='date'></div>");
          // 初始化时隐藏日历组件
           $(this.nodeid + ' .date').css({"display":"none"});
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
        var isStateClick = true;   // 点击状态 (二次点击)
        $(this.nodeid + ' .date table td').click(function () {
              if (!this.firstChild) return;
              if (this.firstChild.getAttribute('class') === 'clickable') {
                //  判断是否启动时间段
                if (that.isTimeBucket) {
                  var tempChar = that.year+'/'+that.month+'/'+this.firstChild.innerHTML;
                  var selectDateChar = that.selectDate.year+'/'+that.selectDate.month+'/'+that.selectDate.day;
                  var selectDateChar2 = that.selectDate2.year+'/'+that.selectDate2.month+'/'+that.selectDate2.day;
                    if (isStateClick) {    // 第一次选择
                      if (tempChar !== selectDateChar && tempChar !== selectDateChar2) {
                          that.selectDate2.year = that.year;
                          that.selectDate2.month = that.month;
                          that.selectDate2.day = parseInt(this.firstChild.innerHTML);
                          that.render();
                          // 用户已经选择
                          that.isSelectDate = true;
                      }
                      isStateClick = !isStateClick;
                    }else {                // 第二次选择
                        if (tempChar !== selectDateChar && tempChar !== selectDateChar2) {
                          that.selectDate.year = that.year;
                          that.selectDate.month = that.month;
                          that.selectDate.day = parseInt(this.firstChild.innerHTML);
                          that.render();
                          // 用户已经选择
                          that.isSelectDate = true;
                        }
                        isStateClick = !isStateClick;
                    }
                    var minVal = compareDate(that.selectDate,that.selectDate2).minDateChar;
                    var maxVal = compareDate(that.selectDate,that.selectDate2).maxDateChar;
                    $(that.nodeid + ' .date-input input').get(0).value = minVal + '~'+maxVal;
                }else{
                  that.selectDate.year = that.year;
                  that.selectDate.month = that.month;
                  that.selectDate.day = parseInt(this.firstChild.innerHTML);
                  that.render();
                  // 隐藏日历
                  $(that.nodeid + ' .date').css({"display":"none"});
                  // 设置 输入框的值
                  $(that.nodeid + ' .date-input input').get(0).value = that.setAndGetDate().getDate();
                  // 用户已经选择
                  this.isSelectDate = true;
                }

              }else if(this.firstChild.getAttribute('class') === 'unclickable'){
                alert('该日期不可选');
              }

        });
      // 日历图标 点击显示日历
      // var stateClick = true;   // 点击状态 用于隐藏切换
      $(this.nodeid + ' .date-input .date-iconfont').click(function () {
            $(that.nodeid + ' .date').css({"display":"block"});

      });
      // 点击输入框 显示日历
      $(this.nodeid + ' .date-input input').click(function () {
          $(that.nodeid + ' .date').css({"display":"block"});
      });
      // 点击页面 获取页面元素
      document.onclick = function(event) {
          var tar = event.srcElement || event.target;
          // 查找获取的页面元素的祖先元素
          var parNode = $(tar).parentsUntil(that.nodeid);
          // 没有祖先元素 说明是点击空白处
          if (tar.className === 'clickable') return;
          if (!parNode.length)  $(that.nodeid + ' .date').css({"display":"none"});
          for (var i = 0; i < parNode.length; i++) {
            // 祖先元素 是body 证明 不是 当前日历组件
            if (parNode[i] === document.body) $(that.nodeid + ' .date').css({"display":"none"});
          }

      };

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
            this.td[j].style.color = '';
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
          if (this.year === this.selectDate.year && this.month === this.selectDate.month)
            if (this.selectDate.day) {
              var selectDate = calculate(this.selectDate.year,this.selectDate.month,this.selectDate.day);
              this.td[selectDate.whichDay + this.selectDate.day - 1].style.backgroundColor = 'rgb(240, 93, 89)';
              this.td[selectDate.whichDay + this.selectDate.day - 1].style.color = 'rgb(226, 231, 250)';
            }
          // 启用时间段是 渲染第二次选择
          if (this.isTimeBucket) {
            if (this.year === this.selectDate2.year && this.month === this.selectDate2.month)
              if (this.selectDate2.day) {
                var selectDate2 = calculate(this.selectDate2.year,this.selectDate2.month,this.selectDate2.day);
                this.td[selectDate2.whichDay + this.selectDate2.day - 1].style.backgroundColor = 'rgb(240, 93, 89)';
                this.td[selectDate2.whichDay + this.selectDate2.day - 1].style.color = 'rgb(226, 231, 250)';
              }
              this.addTimeBucketCss();
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
                var dateVal = that.selectDate.year + '-' + that.selectDate.month + '-'+ that.selectDate.day;
                return dateVal;
            },
            getIsSelectDate:function () {    // 获取用户选择状态
                return that.isSelectDate;
            }
          };
        },
        addTimeBucketCss:function () {
            var min = compareDate(this.selectDate,this.selectDate2).minDate;
            var max = compareDate(this.selectDate,this.selectDate2).maxDate;
            var tdNode = $(this.nodeid + ' .date table .clickable');
            for (var i = 0; i < tdNode.length; i++) {
               var tdNodeDate = new Date(this.year,this.month,parseInt(tdNode[i].innerHTML));
              if (tdNodeDate > min && tdNodeDate < max) {
                tdNode[i].style.backgroundColor = 'rgba(71, 166, 227, 0.61)';
                tdNode[i].style.color = 'rgb(226, 231, 250)';
              }
            }
        },
        setTimeBucket:function () {
          // 设置时间段 接口
          return {
              setIsTimeBucket:function (newIsTimeBucket) {
                  this.isTimeBucket = newIsTimeBucket || false;         // 设置是否启用时间段
              },
              setMinTimeBucket:function (newMinTimeBucket) {
                  this.minTimeBucket = newMinTimeBucket || 2;           //  设置时间段最小跨度
              },
              setMaxTimeBucket:function (newMaxTimeBucket) {
                  this.maxTimeBucket = newMaxTimeBucket || 90;          //  设置时间段最大跨度
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


/**
 * 时间对象比较函数
 */
function compareDate(d1,d2) {
  var temp1 = new Date(d1.year,d1.month,d1.day);
  var temp2 = new Date(d2.year,d2.month,d2.day);
  var max,min;
  if (temp1 > temp2) {
      max = temp1;
      min = temp2;
  }else {
      max = temp2;
      min = temp1;
  }
  return {
    minDate:min,
    maxDate:max,
    minDateChar:min.getFullYear()+'-'+min.getMonth()+'-'+min.getDate(),
    maxDateChar:max.getFullYear()+'-'+max.getMonth()+'-'+max.getDate()
  };
}
