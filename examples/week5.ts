// ----CONSTANTS-----
class Constants {
  static AccRate = 3.5;
  static AccRateEmpty = 2.5;
  static AccRateFull = 1.0;
  static DecRate = 7.0;
  static DecRateEmpty = 5.0;
  static DecRateFull = 2.0;
  static MpsToMph = 2.237;
  static MpsToKph = 3.6;
}

//------INTERFACES-----
interface ISimOutput {
  GetSpeed: (v: Vehicle) => number;
}
interface ISimInput {
  SetSpeedLimit: (v: Vehicle, mph: number) => void;
}

//------GUI ABSTRACT CLASS------
abstract class GUI implements ISimInput, ISimOutput {
  abstract GetSpeed: (v: Vehicle) => number;
  abstract SetSpeedLimit: (v: Vehicle, mph: number) => void;
}

////----IMPERIAL GUI
class ImperialGUI extends GUI {
  GetSpeed = (v: Vehicle) => {
    return v.GetCurrentSpeed * Constants.MpsToMph;
  };
  SetSpeedLimit = (v: Vehicle, mph: number) => {
    v.SetDesiredSpeed(mph / Constants.MpsToMph);
  };
}

////----METRIC GUI
class MetricGUI extends GUI {
  GetSpeed = (v: Vehicle) => {
    return v.GetCurrentSpeed * Constants.MpsToKph;
  };
  SetSpeedLimit = (v: Vehicle, mph) => {
    console.log("SetSpeedLimit from MetricGUI");
    v.SetDesiredSpeed(mph / Constants.MpsToKph);
  };
}

abstract class Vehicle {
  currentSpeed = 0.0;
  desiredSpeed = 0.0;
  //above 2 lines because ts throws errors over "risky js code"
  constructor() {
    this.currentSpeed = 0.0;
    this.desiredSpeed = 0.0;
  }

  abstract Accelerate: (secondsDelta) => void;
  abstract Decelerate: (secondsDelta) => void;

  get GetCurrentSpeed() {
    return this.currentSpeed;
  }

  SetDesiredSpeed = (mph) => {
    this.desiredSpeed = mph;
  };

  SetCurrentSpeed = (speed) => {
    if (this.currentSpeed <= speed) {
      if (speed > this.desiredSpeed) {
        this.currentSpeed = this.desiredSpeed;
      } else {
        this.currentSpeed = speed;
      }
    } else {
      if (speed < this.desiredSpeed) {
        this.currentSpeed = this.desiredSpeed;
      } else {
        this.currentSpeed = speed;
      }
    }
  };

  UpdateSpeed = (secondsDelta) => {
    if (this.currentSpeed > this.desiredSpeed) {
      this.Decelerate(secondsDelta);
    } else if (this.currentSpeed < this.desiredSpeed) {
      this.Accelerate(secondsDelta);
    }
  };
}

class Car extends Vehicle {
  constructor() {
    super();
  }

  Accelerate = (secondsDelta) => {
    //super.Accelerate(secondsDelta);
    this.SetCurrentSpeed(this.currentSpeed + Constants.AccRate * secondsDelta);
  };

  Decelerate = (secondsDelta) => {
    this.SetCurrentSpeed(this.currentSpeed - Constants.DecRate * secondsDelta);
  };
}

class Truck extends Vehicle {
  loadWeight = 0;
  constructor(loadWeight) {
    super();
    this.loadWeight = loadWeight;
  }
  Accelerate = (secondsDelta) => {
    if (this.loadWeight <= 5)
      this.currentSpeed =
        this.currentSpeed + Constants.AccRateEmpty * secondsDelta;
    else
      this.currentSpeed =
        this.currentSpeed + Constants.AccRateFull * secondsDelta;
    //console.log("Accelerate() from Truck");
  };
  Decelerate = (secondsDelta) => {
    if (this.loadWeight <= 5)
      this.currentSpeed =
        this.currentSpeed - Constants.DecRateEmpty * secondsDelta;
    else
      this.currentSpeed =
        this.currentSpeed - Constants.DecRateFull * secondsDelta;
    //console.log("Decelerate() from Truck");
  };
}

//const choice = prompt("Enter 'M' for Metric or 'I' for Imperial: ");
//const speed_limit = prompt("Enter speed limit: ");
var choice = "M";
const speed_limit = 80;
var gui = new MetricGUI();
if (choice === "I") {
  gui = new ImperialGUI();
}
if (choice === "M") {
  gui = new MetricGUI();
}

var car = new Car();
var truck1 = new Truck(4);
var truck2 = new Truck(8);
gui.SetSpeedLimit(car, speed_limit);
gui.SetSpeedLimit(truck1, speed_limit);
gui.SetSpeedLimit(truck2, speed_limit);
var vehicles = [car, truck1, truck2];

for (let i = 0; i < 11; i++) {
  for (let v of vehicles) {
    v.UpdateSpeed(1);
    //let s = v.constructor.name;
    let s = "Vehicle";
    console.log(`${s} speed = ${Math.floor(gui.GetSpeed(v) * 100) / 100}`);
  }
}
