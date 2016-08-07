/**
 *  页面 控制方法
 */
// 页面加载初始化
$().ready(function () {
    commander.Create();
});

// 页面点击创建飞船和页面dom
function onclickCreate() {
  $(".commander button[name = add]").on("click", function () {
    var value = stareValue();
    if (value.addEnergyVal <= 0 || value.consumeEnergyVal <= 0 || value.speendVal <= 0) {
      messageLog("指挥官,请先选择飞船类型");
    }else {
      //  在指挥官这里 只会创建4个飞船
       if ($(".commander .control span").length < 4) {
        //  如果有回收的ID则使用回收的ID 创建
           if (commander.airshipsNumber.airshipNumArray.length > 0) {
            //  调用中介对象 创建飞船
               mediator.setup(commander.airshipsNumber.airshipNumArray[0],
                                                          value.speendVal,
                                                       value.addEnergyVal,
                                                   value.consumeEnergyVal);
               commander.airshipsNumber.airshipNumArray.arrayRemove(
                               commander.airshipsNumber.airshipNumArray[0]);
           }else {
            //  如果没有回收ID 就使用默认ID创建
             mediator.setup(commander.airshipsNumber.airshipNum,
                                                value.speendVal,
                                             value.addEnergyVal,
                                         value.consumeEnergyVal);
             commander.airshipsNumber.airshipNum++;
           }
          //  保存创建的飞船对象
          var one = mediator.airships[mediator.airships.length - 1];
          // 添加页面控制区 DOM
          if (one.id < 5 ) {
          $(".space").append('<div class="orbit orbit_'+one.id+
          '" id="airship_'+one.id+'"><div class="airship airship_'+one.id+
          '" ><span class="bg"></span><p>'+one.id+'号-'+one.energy+'%</p></div></div>');
        }else {
          $(".space").append('<div class="orbit orbit_4" id="airship_'+
          one.id+'"><div class="airship airship_5"><span class="bg"></span><p>'+
          one.id+'号-'+one.energy+'%</p></div></div>');
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
            $(".commander .control").append('<span class = '+one.id+'>'+one.id + '号飞船控制台：</span>');
            $(".commander .control span."+one.id).append($buttonFly);
            $(".commander .control span."+one.id).append($buttonFlyStop);
            $(".commander .control span."+one.id).append($buttonDestroy);
          }else {
             messageLog("报告指挥官：已达到发射上限,无法发射！");
            }
    }

       });
}

// 更新数据中心页面dom
function dcDom(value) {

  var stateType = value.stateType,
      energy = value.energy,
      id = value.id,
      dlSysName,nySysName;
  // 获取 动力系统和能源系统型号
  for (var i = 0; i < mediator.airships.length; i++) {
    if (mediator.airships[i].id === id ) {
        dlSysName = mediator.airships[i].flyspeed;
        nySysName = mediator.airships[i].addEnergy;
    }
  }
  // 转换dlSysName 为中文字符串
  switch (dlSysName) {
    case 30:
      dlSysName = "前进号";
      break;
    case 50:
      dlSysName = "奔腾号";
      break;
    case 80:
      dlSysName = "超越号";
      break;
  }
  // 转换nySysName 为中文字符串
  switch (nySysName) {
    case 2:
      nySysName = "劲量型";
      break;
    case 3:
      nySysName = "光能型";
      break;
    case 4:
      nySysName = "永久性";
      break;
  }
  // 转换stateType 为中文字符串
  switch (stateType) {
    case "fly":
      stateType = "飞行中";
      break;
    case "stop":
      stateType = "停止飞行";
      break;
    case "destroy":
      stateType = "已摧毁";
      break;

  }
    var avalue = $('.showDc .'+id);
    if (avalue.length > 0) {
      $('.showDc .'+id+' .stateType').contents().replaceWith(stateType);
      $('.showDc .'+id+' .energy').contents().replaceWith(energy +'%');
    }else{
      $('.showDc').append('<tr class='+id+'><td>'+id+
      '号</td><td>'+dlSysName+'</td><td>'+nySysName+'</td><td class= stateType>'+stateType+
      '</td><td class = energy>'+energy+'%</td></tr>');
    }
}

// 获取页面 飞船初始化属性
function stareValue() {
  var dlValue = $(".launch input[name='dl']:checked").val();
  var nyValue = $(".launch input[name='ny']:checked").val();
  var speend = -1,consumeEnergy = -1,addEnergy = -1;
  switch (dlValue) {
    case "dl1":
      speend = 30;
      consumeEnergy = 5;
      break;
      case "dl2":
        speend = 50;
        consumeEnergy = 7;
        break;
      case "dl3":
        speend = 80;
        consumeEnergy = 9;
        break;
      default:
      speend = 0;
      consumeEnergy = 0;
  }
  switch (nyValue) {
    case "ny1":
      addEnergy = 2;
      break;
    case "ny2":
      addEnergy = 3;
      break;
    case "ny3":
      addEnergy = 4;
      break;
    default:
      addEnergy = 0;
  }
  return {
      speendVal:speend,
      consumeEnergyVal:consumeEnergy,
      addEnergyVal:addEnergy
  };
}


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
        onclickCreate();
     },
    //  飞行方法
     fly : function (id) {
         mediator.seedMessage(adapterNum(
           {
             id:id,
             commond:'fly'
           }
         ));
     },
    //  停止方法
     stop : function (id) {
       mediator.seedMessage(adapterNum(
         {
           id:id,
           commond:'stop'
         }
       ));
     },
    //  摧毁方法
     destroy : function (id) {
       mediator.seedMessage(adapterNum(
         {
           id:id,
           commond:'destroy'
         }
       ));
     },
    //  接受消息方法
     dc : function (message) {
       var adapter = adapterJSON(message);
       dcDom(adapter);
     }
 };

/**
 * 新增信号发射模块 adapterNum 把JSON 数据转换为二进制代码
 */
function adapterNum(value) {
      var idNum, commondNum,messageNum;
      switch (value.commond) {
        case 'fly':
          commondNum = '0001';
          break;
        case 'stop':
          commondNum = '0010';
          break;
        case 'destroy':
          commondNum = '1100';
          break;
      }

      // 补齐二进制编码为8位
      switch (value.id.toString().length) {
        case 1:
          idNum = "000" + value.id;
          break;
        case 2:
          idNum = "00" + value.id;
          break;
        case 3:
          idNum = "0" + value.id;
          break;
      }
      if (value.energy) {
        var energyNum ;
        switch (value.energy.toString().length) {
          case 1:
            energyNum = "0000000" + value.energy;
            break;
          case 2:
            energyNum = "000000" + value.energy;
            break;
          case 3:
            energyNum = "00000" + value.energy;
            break;
        }
        messageNum = idNum +commondNum +energyNum;
      }else {
        messageNum = idNum +commondNum;
      }
      return messageNum;

}

/**
 * 新增信号发射模块 adapterJSON 把二进制字符串 数据转换为JSON
 */
function adapterJSON(value) {
    var stateTypeV,energyV,idV;
    idV = parseFloat(value.slice(0, 4));
    if (value.length === 16) {
      energyV = parseFloat(value.slice(-8));
    }
    switch (value.slice(4,8)) {
      case "0001":
        stateTypeV = "fly";
        break;
      case "0010":
        stateTypeV = "stop";
        break;
      case "1100":
        stateTypeV = "destroy";
        break;
    }
    return {
        stateType:stateTypeV,
        energy:energyV,
        id:idV
    };
}
 /**
  *
  *  运用中介者模式 模拟信号发射模式 Mediator
  */
 var mediator = {
     // 飞船对象数组
     airships : [],
     // 添加飞船对象
     setup : function (id,speend,addEnergy ,consumeEnergy) {
           this.airships.push(new SetAirship(id,speend,addEnergy ,consumeEnergy));
     },
    //  给所有飞船广播消息
     seedMessage : function (Message) {
       bus(Message,mediator.airships);
     }
 };

/**
 * 消息发送介质 bus
 */
function bus(Message,obj) {
  setTimeout(function (){
    if ( Math.ceil(Math.random()*10) >= 1 ) {
      if (obj) {
        for (var i = 0; i < obj.length; i++) {
          obj[i].message(Message);
        }
      }else {
         commander.dc(Message);
      }

    }else {
      messageLog("消息发送失败!");
      messageLog("重新发送！");
      bus();
    }
  }, 1000);
}
 /**
  *  创建飞船的 的构造函数
  *
  * 飞船的属性: 名称 ID , 飞行速度 flyspeed(20px), 能量 energy
  *           状态 state (fly stop), onAndOff 太阳能系统 控制开关
  * 	飞船的方法：飞行(fly)，停止(flyStop)， 自毁(destroy), energySys飞船能量消耗系统
  * 	          sunEnergySys 飞船太阳能充电系统
  */
function SetAirship(id,speend,addEnergy ,consumeEnergy) {
    this.flyspeed = speend; //飞行速度
    this.energy = 100;  //初始能量
    this.id = id;  //飞船id
    this.stateType =  "stop"; //初始 飞行状态
    this.onAndOff = "off"; // 太阳能系统 控制开关
    this.addEnergy = addEnergy; //能量消耗速度
    this.consumeEnergy = consumeEnergy; //能量增加速度
    this.flyState();
}
// 飞船 飞行方法
SetAirship.prototype.fly = function () {
    if (this.stateType === "fly") return;
    if (this.energy > 0 ) {
      // 设置飞行状态
      this.stateType = "fly";
      var speedVal = (360 / this.flyspeed) + "s"  ;
      // 设定页面元素动画速度
      // 打开页面元素动画
      $("#airship_"+this.id).attr('style', 'animation-play-state:running;animation-duration:'+ speedVal);
      messageLog(this.id+"号飞船收到起飞命令");
      // 打开 太阳能充电系统
      if (this.onAndOff === "off") {
         this.onAndOff = "on";
         this.sunEnergySys();
      }
      // 飞船能量消耗系统
      this.energySys();

    }else {
      messageLog("飞船需要充能无法起飞 当前能量：" + this.energy);
    }

};
// 飞船停止方法
SetAirship.prototype.flyStop = function () {
    if (this.stateType === "stop") return;
    this.stateType = "stop";
    $("#airship_"+this.id).attr('style', 'animation-play-state:paused');
    messageLog(this.id+"号飞船收到停机命令");
};
// 飞船能量消耗系统
SetAirship.prototype.energySys = function () {
    if (this.energy >= this.consumeEnergy ) {
      this.energy -= this.consumeEnergy;
    }else {
      this.stateType = "stop";
        $("#airship_"+this.id).attr('style', 'animation-play-state:paused');
        messageLog(this.id+"号飞船能源不足，已停机");
    }

    if (this.energy > 0 && this.stateType ===  "fly") {
     setTimeout(this.energySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
    }else {
      this.stateType = "stop";
      $("#airship_"+this.id).attr('style', 'animation-play-state:paused');
    }
};
//  飞船太阳能充电系统
SetAirship.prototype.sunEnergySys = function () {
    if ( (this.energy + this.addEnergy) > 100 ) {
      this.energy = 100;
      $("#airship_"+this.id+" p" ).contents().replaceWith(this.id+"号-"+this.energy+"%");
      $("#airship_"+this.id+" span" ).attr('style', 'width:'+this.energy+'%');
    }else if(this.energy <= (100 - this.addEnergy)  ) {
      this.energy += this.addEnergy;
      $("#airship_"+this.id+" p" ).contents().replaceWith(this.id+"号-"+this.energy+"%");
      $("#airship_"+this.id+" span" ).attr('style', 'width:'+this.energy+'%');
    }
    if (this.onAndOff === "on") {
    setTimeout(this.sunEnergySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
  }
};

// 飞船摧毁方法
SetAirship.prototype.destroy = function () {
    this.stateType = "stop"; //停止飞行状态
    this.onAndOff = "off"; // 关闭太阳能系统
    this.stateType = "destroy";
    messageLog("飞船：" + this.id + "已启动自毁装置");
    commander.airshipsNumber.airshipNumArray.push(this.id); // 收回Id
    $("div").remove("#airship_"+this.id); //删除页面DOM
    // 删除飞船对象
    for (var i = 0; i < mediator.airships.length; i++) {
      if (mediator.airships[i].id === this.id)
      mediator.airships.arrayRemove(mediator.airships[i]);
    }
};

// 消息识别方法
SetAirship.prototype.message = function (message) {
    // 二进制数据解析模块
    var adapter = adapterJSON(message);
    if (adapter.id === this.id) {
      switch (adapter.stateType) {
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

// 定时广播飞行状态
SetAirship.prototype.flyState = function () {
    var flyState = {
      energy:this.energy,
      id:this.id ,
      commond:this.stateType
    };
    bus(adapterNum(flyState));
    if (this.stateType !== "destroy") {
      setTimeout(this.flyState.bind(this), 1000);
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

/**
 * 添加系统消息日志函数 messageLog
 *
 */
function messageLog(log) {
    var  now = new Date();
    var nowDate = now.getFullYear()+"-"+(now.getMonth() + 1)+"-"+now.getDate()+
                  " "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    var messageLog = log;
   $(".console .log").append("<span>"+nowDate+" ："+messageLog+"</span>");
}
