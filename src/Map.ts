import { Road } from "./Road";
import { IPrintDriver } from "./SUI";
class RoadMap {
  public roads = Array<Road>();

  public Map = () => {
    this.roads = new Array<Road>();
  };
  public AddRoad = (road: Road) => {
    this.roads.push(road);
  };
  public Print = (pd: IPrintDriver, o: Object) => {
    for (let road of this.roads) {
      //console.log(road, pd, o); // I dont know how to do print.road(pd, o)
      road.Print(pd, o);
    }
  };
}
export { RoadMap };
// var test = new Map<TestSub>

// var example = test.Map();
