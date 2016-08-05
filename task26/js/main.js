/**
 *  页面 控制方法
 */
var airshipNum = 1; //飞船编号初始值
var airshipNumArray = []; //飞船编号回收
$().ready(function () {
    commander.Create();
});



/**
 *  创建飞船的 的构造函数
 *
 * 飞船的属性: 名称 ID , 飞行速度 flyspeed(20px), 能量 energy
 *           状态 state (fly stop), onAndOff 太阳能系统 控制开关
 * 	飞船的方法：飞行(fly)，停止(flyStop)， 自毁(destroy), energySys飞船能量消耗系统
 * 	          sunEnergySys 飞船太阳能充电系统
 */

 /**
  * commander 对象
  */
 var commander = {
     airshipsNumber: {
         airshipNum : 1, //飞船编号初始值
         airshipNumArray : [] //飞船编号回收
     },
     // 创建飞船对象
     Create : function () {
       $(".commander button[name = add]").on("click", function () {
        //  在指挥官这里 只会创建4个飞船
         if ($(".commander span").length < 4) {
          //  如果有回收的ID则使用回收的ID 创建
             if (commander.airshipsNumber.airshipNumArray.length > 0) {
              //  调用中介对象 创建飞船
                 mediator.setup(commander.airshipsNumber.airshipNumArray[0]);
                 commander.airshipsNumber.airshipNumArray.arrayRemove(commander.airshipsNumber.airshipNumArray[0]);
             }else {
              //  如果没有回收ID 就使用默认ID创建
               mediator.setup(commander.airshipsNumber.airshipNum);
               commander.airshipsNumber.airshipNum++;
             }
            //  保存创建的飞船对象
            var one = mediator.airships[mediator.airships.length - 1];
            // 添加页面控制区 DOM
            if (one ) {
            $(".space").append('<span id= '+ one.id +'>'+ one.id
            + '号飞船 <br>状态：' + '<i class=stateType>'+one.stateType+'</i>'
            + '<br>能量：' + '<i class=energy>'+one.energy+'</i>'
            + ' %<br>太阳能系统：' + '<i class=onAndOff>'+one.onAndOff + '</i></span>');
            }
            var $buttonFly = $("<button>飞行</button>");
            $buttonFly.on('click', function(event) {
              event.preventDefault();
              commander.fly(one.id);
            });
            var $buttonFlyStop = $("<button>停止</button>");
            $buttonFlyStop.on('click', function(event) {
              event.preventDefault();
              commander.stop(one.id);
            });
            var $buttonDestroy = $("<button>摧毁</button>");
            $buttonDestroy.on('click', function(event) {
              event.preventDefault();
              commander.destroy(one.id);
              $(this).parent("span").remove();
            });
              $(".commander button[name = add]").before('<span class = '+one.id+'>'+one.id + '号飞船控制台：</span>');
              $(".commander span."+one.id).append($buttonFly);
              $(".commander span."+one.id).append($buttonFlyStop);
              $(".commander span."+one.id).append($buttonDestroy);
            }else {
                alert("报告指挥官：已达到发射上限,无法发射！");
              }
            });
     },
    //  飞行方法
     fly : function (id) {
         mediator.seedMessage(
           {
             id:id,
             commond:'fly'
           }
         );
     },
    //  停止方法
     stop : function (id) {
       mediator.seedMessage(
         {
           id:id,
           commond:'stop'
         }
       );
     },
    //  摧毁方法
     destroy : function (id) {
       mediator.seedMessage(
         {
           id:id,
           commond:'destroy'
         }
       );
     }
 };

 /**
  *
  *  运用中介者模式 模拟信号发射模式 Mediator
  */
 var mediator = {
     // 飞船对象数组
     airships : [],
     // 添加飞船对象
     setup : function (id) {
           this.airships.push(new SetAirship(id));
     },
    //  给所有飞船广播消息
     seedMessage : function (Message) {
       setTimeout(function () {
         if ( Math.ceil(Math.random()*10) >= 3 ) {
           for (var i = 0; i < mediator.airships.length; i++) {
             mediator.airships[i].message(Message);
           }
         }else {
           alert("消息发送失败");
         }
       }, 1000);
     }
 };

function SetAirship(id) {
    this.flyspeed = "20px"; //飞行速度
    this.energy = 100;  //初始能量
    this.id = id;  //飞船id
    this.stateType =  "stop"; //初始 飞行状态
    this.onAndOff = "off"; // 太阳能系统 控制开关
}
// 飞船 飞行方法
SetAirship.prototype.fly = function () {
    if (this.stateType === "fly") return;
    if (this.energy > 0 ) {
      // 设置飞行状态
      this.stateType = "fly";
      $("#"+this.id+" .stateType").contents().replaceWith(this.stateType);
      // 打开 太阳能充电系统
      if (this.onAndOff === "off") {
         this.onAndOff = "on";
         $("#"+this.id+" .onAndOff").contents().replaceWith(this.onAndOff);
         this.sunEnergySys();
      }
      // 飞船能量消耗系统
      this.energySys();
    }else {
      console.log("飞船需要充能无法起飞 当前能量：" + this.energy);
    }

};
// 飞船停止方法
SetAirship.prototype.flyStop = function () {
    if (this.stateType === "stop") return;
    this.stateType = "stop";
    $("#"+this.id+" .stateType").contents().replaceWith(this.stateType);
};
// 飞船能量消耗系统 每秒 -5
SetAirship.prototype.energySys = function () {
    if (this.energy >= 5 ) {
      this.energy -= 5;
    }else {
      this.stateType = "stop";
      $("#"+this.id+" .stateType").contents().replaceWith(this.stateType);
    }

    if (this.energy > 0 && this.stateType ===  "fly") {
     setTimeout(this.energySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
    }else {
      this.stateType = "stop";
      $("#"+this.id+" .stateType").contents().replaceWith(this.stateType);
    }
};
//  飞船太阳能充电系统 每秒 +2
SetAirship.prototype.sunEnergySys = function () {
    if (this.energy <= 98) {
      this.energy += 2;
      $("#"+this.id+" .energy").contents().replaceWith(this.energy);
    }else if(this.energy === 99) {
      this.energy += 1;
      $("#"+this.id+" .energy").contents().replaceWith(this.energy);
    }
    if (this.onAndOff === "on") {
    setTimeout(this.sunEnergySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
  }
};

// 飞船摧毁方法
SetAirship.prototype.destroy = function () {
    this.stateType = "stop"; //停止飞行状态
    this.onAndOff = "off"; // 关闭太阳能系统
    console.log("飞船：" + this.id + "已启动自毁装置");
    commander.airshipsNumber.airshipNumArray.push(this.id); // 收回Id
    $("span").remove("#"+this.id); //删除页面DOM
    // 删除飞船对象
    for (var i = 0; i < mediator.airships.length; i++) {
      if (mediator.airships[i].id === this.id)
      mediator.airships.arrayRemove(mediator.airships[i]);
    }
};

// 消息识别方法
SetAirship.prototype.message = function (message) {
    if (message.id === this.id) {
      switch (message.commond) {
        case 'fly':
          this.fly();
          break;
        case 'stop':
          this.flyStop();
          break;
        case 'destroy':
          this.destroy();
          break;
      }
    }
};



/**
 * remove 自定义数组删除函数
 */
 Array.prototype.indexOf = function(val) {
   for (var i = 0; i < this.length; i++) {
     if (this[i] == val) return i;
   }
   return -1;
 };
 Array.prototype.arrayRemove = function(val) {
   var index = this.indexOf(val);
   if (index > -1) {
     this.splice(index, 1);
   }
 };
