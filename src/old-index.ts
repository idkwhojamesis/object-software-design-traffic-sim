import "./styles.css";
import { Heading, Road } from "./Road";
import { CharMatrix, ConsolePrint, IPrintDriver } from "./SUI";
import { Conversions } from "./Common";
import { RoadMap } from "./Map";

const CONSTS = {
  AccRate: 3.5, // Acceleration rate for cars in m/s
  AccRateEmpty: 2.5, // Acceleration rate for light trucks in m/s
  AccRateFull: 1.0, // Acceleration rate for heavy trucks in m/sf
  DecRate: 7.0, // Braking rate for cars in m/s
  DecRateEmpty: 5.0, // Braking rate for light trucks in m/s
  DecRateFull: 2.0, // Braking rate for light trucks in m/ss
  MpsToMph: 2.237,
  MpsToKph: 3.6,
  MetersToMiles: 0.000621371,
  MetersToKm: 0.001,
  CharMapSize: 40,
  WorldSize: 200.0
};

abstract class Vehicle {
  _currentSpeed = 0.0;
  _desiredSpeed = 0.0;
  constructor() {
    this._currentSpeed = 0.0;
    this._desiredSpeed = 0.0;
  }
  abstract Accelerate(secondsDelta): void;
  abstract Decelerate(secondsDelta): void;
  getCurrentSpeed() {
    return this._currentSpeed;
  }
  setCurrentSpeed(speed) {
    if (this._currentSpeed <= speed) {
      // accelerating
      if (speed > this._desiredSpeed) this._currentSpeed = this._desiredSpeed;
      else this._currentSpeed = speed;
    } else {
      // braking
      if (speed < this._desiredSpeed) this._currentSpeed = this._desiredSpeed;
      else this._currentSpeed = speed;
    }
  }
  setDesiredSpeed(mph) {
    this._desiredSpeed = mph;
  }
  UpdateSpeed(seconds) {
    if (this._currentSpeed > this._desiredSpeed) this.Decelerate(seconds);
    else if (this._currentSpeed < this._desiredSpeed) this.Accelerate(seconds);
  }
}

class Car extends Vehicle {
  Accelerate(secondsDelta) {
    //super.Accelerate(secondsDelta);
    this.setCurrentSpeed(
      this.getCurrentSpeed() + CONSTS.AccRate * secondsDelta * CONSTS.MpsToMph
    );
    //console.log("Accelerate from Car");
  }
  Decelerate(secondsDelta) {
    this.setCurrentSpeed(
      this.getCurrentSpeed() - CONSTS.AccRate * secondsDelta * CONSTS.MpsToMph
    );
    //console.log("Decelerate from Car");
  }
}

class Truck extends Vehicle {
  _loadWeight = 0.0;
  constructor(weight) {
    super();
    this._loadWeight = weight;
    //console.log("truck created");
  }
  // add a set loadWeight if needed
  Accelerate(secondsDelta) {
    if (this._loadWeight <= 5)
      this.setCurrentSpeed(
        this.getCurrentSpeed() +
          CONSTS.AccRateEmpty * secondsDelta * CONSTS.MpsToMph
      );
    else
      this.setCurrentSpeed(
        this.getCurrentSpeed() +
          CONSTS.AccRateFull * secondsDelta * CONSTS.MpsToMph
      );
    //console.log("Accelerate() from Truck");
  }
  Decelerate(secondsDelta) {
    if (this._loadWeight <= 5)
      this.setCurrentSpeed(
        this.getCurrentSpeed() -
          CONSTS.DecRateEmpty * secondsDelta * CONSTS.MpsToMph
      );
    else
      this.setCurrentSpeed(
        this.getCurrentSpeed() -
          CONSTS.DecRateFull * secondsDelta * CONSTS.MpsToMph
      );
    //console.log("Decelerate() from Truck");
  }
}

interface ISimOutput {
  GetSpeed(v: Vehicle): number;
}
interface ISimInput {
  SetSpeedLimit(v: Vehicle, speed: number): void;
}
// https://stackoverflow.com/questions/46075181/how-do-i-implement-multiple-interfaces-in-a-class
abstract class GUI implements ISimOutput, ISimInput {
  abstract CreateRoad(
    name: string,
    locx: number,
    locy: number,
    len: number,
    hdg: Heading
  ): Road;
  abstract GetSpeed(v: Vehicle): number;
  abstract SetSpeedLimit(v: Vehicle, speed: number): void;
}
class MetricGUI extends GUI {
  CreateRoad(
    name: string,
    locx: number,
    locy: number,
    len: number,
    hdg: Heading
  ): Road {
    return new Road(
      name,
      locx / CONSTS.MetersToKm,
      locy / CONSTS.MetersToKm,
      len / CONSTS.MetersToKm,
      hdg
    );
  }
  GetSpeed(v: Vehicle) {
    //console.log("GetSpeed from MetricGUI");
    return v.getCurrentSpeed() * CONSTS.MpsToKph;
  }
  SetSpeedLimit(v: Vehicle, speed: number) {
    v.setDesiredSpeed(speed / CONSTS.MpsToKph); // if measurement unit is made clear no need to convert later
    //console.log("SetSpeedLimit from MetricGUI");
  }
}
class ImperialGUI extends GUI {
  CreateRoad(
    name: string,
    locx: number,
    locy: number,
    len: number,
    hdg: Heading
  ): Road {
    return new Road(
      name,
      locx / CONSTS.MetersToMiles,
      locy / CONSTS.MetersToMiles,
      len / CONSTS.MetersToMiles,
      hdg
    );
  }
  GetSpeed(v: Vehicle) {
    //console.log("GetSpeed from ImperialGUI");
    return v.getCurrentSpeed() * CONSTS.MpsToMph;
  }
  SetSpeedLimit(v: Vehicle, speed: number) {
    v.setDesiredSpeed(speed / CONSTS.MpsToMph);
    //console.log("SetSpeedLimit from ImperialGUI");
  }
}

function makeSim(chooseGUI: boolean) {
  let gui = chooseGUI ? new MetricGUI() : new ImperialGUI();
  let results = "";
  let map: RoadMap = new RoadMap();
  let cp: IPrintDriver = new ConsolePrint();

  /*
  let car = new Car();
  let truck1 = new Truck(4);
  let truck2 = new Truck(8);
  let vehicles = [car, truck1, truck2];
  

  for (let i = 0; i < 11; i++) {
    for (let v of vehicles) {
      gui.SetSpeedLimit(v, 100);
      v.UpdateSpeed(1);
      results = results.concat(
        `<p>${v.constructor.name} speed = ${gui.GetSpeed(v)} ${
          chooseGUI ? "km/h" : "mph"
        }</p>`
      );
    }
  }
  */
  gui = new MetricGUI();
  let Uptown: Road = gui.CreateRoad("Uptown", 0.0, -0.09, 0.18, Heading.North);
  map.addRoad(Uptown);
  let Crosstown: Road = gui.CreateRoad(
    "Crosstown",
    -0.09,
    0.0,
    0.18,
    Heading.East
  );
  map.addRoad(Crosstown);

  let cm: CharMatrix = new CharMatrix();
  map.print(cp, cm);
  for (let i = 0; i < CONSTS.CharMapSize; i++) {
    let s: string = cm.map[i];
    console.log(s);
    results = results.concat("<p>" + s + "<p>");
  }
  return results;
}

document.getElementById("app").innerHTML = `
<h1>results</h1>
<div>
  ${makeSim(true)}
</div>
`;

/*
  web rendering example from somewhere
  const heroPlaceholder = document.querySelector('.hero-list');
  const progressEl = document.createElement('progress');
  progressEl.classList.add('hero-list', 'progress', 'is-medium', 'is-info');
  const maxAttr = document.createAttribute('max');
  maxAttr.value = '100';
  progressEl.setAttributeNode(maxAttr);
  heroPlaceholder.replaceWith(progressEl);
*/

export { CONSTS };
