
  var div = document.getElementById('test');
  var mybutton = div.getElementsByTagName('button');

var airship1 = new SetAirship();

mybutton[0].onclick = function () {
    airship1.fly();
}
mybutton[1].onclick = function () {
    airship1.stateType = "stop";
}
mybutton[2].onclick = function () {
    airship1.onAndOff = "off";
    airship1.stateType = "stop";
}
mybutton[3].onclick = function () {
    alert("飞行状态："+airship1.stateType +"\n" +
          "能量："+ airship1.energy +"\n" +
          "能源状态："+airship1.onAndOff);
}


/**
 *  创建飞船的 的构造函数
 *
 * 飞船的属性: 名称 ID , 飞行速度 flyspeed(20px), 能量 energy
 *           状态 state (fly stop)
 * 	飞船的方法：飞行(fly)，停止(flyStop)， 自毁系统(destroySys)
 */

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
      // 打开 太阳能充电系统
      if (this.onAndOff === "off") {
         this.onAndOff = "on";
         this.sunEnergySys();
      }
      // 飞船能量消耗系统
      this.energySys();

    }else {
      console.log("飞船需要充能无法起飞 当前能量：" + this.energy);
    }

}
// 飞船停止方法
SetAirship.prototype.flyStop = function () {
    if (this.stateType === "stop") return;
    this.stateType = "stop";
}
// 飞船能量消耗系统 每秒 -5
SetAirship.prototype.energySys = function () {
    if (this.energy >= 5 ) {
      this.energy -= 5;
      console.log("当前能量正在减少，剩余：" + this.energy);
    }else {
      this.stateType = "stop";
    }

    if (this.energy > 0 && this.stateType ===  "fly") {
      setTimeout(this.energySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
    }else {
      this.stateType = "stop";
    }
}
//  飞船太阳能充电系统 每秒 +2
SetAirship.prototype.sunEnergySys = function () {
    if (this.energy !== 100) {
      this.energy += 2;
      console.log("当前能量正在增加，剩余：" + this.energy);
    }
    if (this.onAndOff === "on") {
      setTimeout(this.sunEnergySys.bind(this), 1000);  // setTimeout的执行函数里面的this 指向windows 这里用bind() 解决这个问题
    }
}
