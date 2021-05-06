//import { Map } from "./Map.js";
import { IPrintDriver, ConsolePrint } from "./SUI";

enum Heading {
  North = "North",
  South = "South",
  East = "East",
  West = "West"
}
class Road {
  private name: string;
  private length: number;
  private xlocation: number;
  private ylocation: number;
  private heading: Heading;
  private roadItems: Object[];
  public NumOfRoads: number = 0;
  constructor(
    streetName: string,
    locX: number,
    locY: number,
    len: number,
    hdg: Heading,
    roadItems: Object[]
  ) {
    this.name = streetName;
    this.length = len;
    this.heading = hdg;
    this.xlocation = locX;
    this.ylocation = locY;
    this.roadItems = roadItems;
    this.NumOfRoads++;
  }

  public GetLength() {
    return this.length;
  }

  public GetXLocation() {
    return this.xlocation;
  }

  public GetYLocation() {
    return this.ylocation;
  }

  public GetHeading() {
    return this.heading;
  }

  public GetRoadName() {
    return this.name;
  }

  public GetRoadItems() {
    return this.roadItems;
  }

  public AddRoadItem(type: String, mileMarker: Number, speedLimit: Number = 0) {
    let item = {};
    item["Type"] = type;
    item["MileMarker"] = mileMarker;
    if (type === "SpeedLimit") {
      item["SpeedLimit"] = speedLimit;
    }
    console.log("added road item");
    this.roadItems.push(item);
  }

  public Print(print: IPrintDriver, o: Object) {
    print.PrintRoad(this, o);
  }
}

export { Heading, Road };
