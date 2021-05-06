import { Road } from "./road";
import { IPrintDriver } from "./sui";

class RoadMap {
  // "Map" is a thing in js
  _roads: Road[];

  constructor() {
    this._roads = [];
  }
  addRoad(road: Road): void {
    this._roads.push(road);
  }
  print(pd: IPrintDriver, o: object): void {
    for (let road of this._roads) {
      road.print(pd, o);
    }
  }
}

export { RoadMap };
