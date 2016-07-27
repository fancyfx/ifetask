/**
 *  创建飞船的 的构造函数
 *
 * 飞船的属性: 名称 ID , 飞行速度 flyspeed(20px), 能量 energy
 *           状态 state (fly stop)
 * 	飞船的方法：飞行(fly)，停止(flyStop)， 自毁系统(destroySys)
 */

function SetAirship(id,time) {
    this.flyspeed = "20px";
    this.energy = 98;
    this.id = id;
    this.stateType =  "stop";
}
SetAirship.prototype.fly = function () {
    if (this.stateType === "fly") return;
    this.stateType = "fly";
    // 能量 每秒 增加 2
    increaseEnergy(this.energy);
}
SetAirship.prototype.flyStop = function () {
    if (this.stateType === "stop") return;
    this.stateType = "stop";
    if(this.energy !== 100) increaseEnergy(this.energy);
}

// 飞船 能量增长方法 ， 每秒 增加 2 ;
function increaseEnergy(numEnergy) {
    function incrementNumber() {
      numEnergy += 2;
      if (numEnergy < 100) {
        setTimeout(incrementNumber, 1000);
      }
    }
    setTimeout(incrementNumber, 1000);
}
// 飞船 飞行时 能量减少方法 ， 每秒 减少 5 ;
function reduceEnergy(numEnergy) {
    function incrementNumber() {
      numEnergy -= 5;
      if (numEnergy > 0) {
        setTimeout(incrementNumber, 1000);
      }
    }
    setTimeout(incrementNumber, 1000);
}
var airship1 = new SetAirship();
airship1.flyspeed = "50px";
alert(airship1.stateType);
