// ----CONSTANTS-----
// run commands : npx tsc interface.ts --target ES6
// then node traffic.js
import { Road, Heading } from "./Road";
import { RoadMap } from "./Map";
import { ConsolePrint, CharMatrix, IPrintDriver } from "./SUI";

export class CONSTS {
  static AccRate = 3.5;
  static AccRateEmpty = 2.5;
  static AccRateFull = 1.0;
  static DecRate = 7.0;
  static DecRateEmpty = 5.0;
  static DecRateFull = 2.0;
  static MpsToMph = 2.237;
  static MpsToKph = 3.6;
  static MetersToKm = 0.001;
  static MetersToMiles = 0.000621371;
  static CharMapSize = 40;
  static WorldSize = 200.0;
}
/*
//------GUI ABSTRACT CLASS------
abstract class GUI {
  public abstract CreateRoad: (
    name: string,
    locx: number,
    locy: number,
    len: number,
    heading: Heading
  ) => Road;
}

////----IMPERIAL GUI
class ImperialGUI extends GUI {
  CreateRoad = (
    name: string,
    locx: number,
    locy: number,
    len: number,
    heading: Heading
  ) => {
    return new Road(
      name,
      locx / CONSTS.MetersToMiles,
      locy / CONSTS.MetersToMiles,
      len / CONSTS.MetersToMiles,
      heading
    );
  };
}

////----METRIC GUI
class MetricGUI extends GUI {
  CreateRoad = (
    name: string,
    locx: number,
    locy: number,
    len: number,
    heading: Heading
  ) => {
    return new Road(
      name,
      locx / CONSTS.MetersToKm,
      locy / CONSTS.MetersToKm,
      len / CONSTS.MetersToKm,
      heading
    );
  };
}
*/
//New Main
let map = new RoadMap();
let cp = new ConsolePrint();
console.log("sim start");
//let simInput = new MetricGUI();
// Create the roads
let roads = require("./map.json");
let jsonHeadings = [Heading.North, Heading.South, Heading.East, Heading.West];
for (let road of roads.Roads) {
  let r = new Road(
    road.Name,
    road.XLocation,
    road.YLocation,
    road.Length, // add * CONSTS.MetersToKm to see something,
    jsonHeadings[road.Heading],
    road.RoadItems
  );
  // programmatically add roaditem
  r.AddRoadItem("customItem", 123);
  map.AddRoad(r);
  let printRoadItems = "";
  for (let roadItem of r.GetRoadItems()) {
    printRoadItems = printRoadItems.concat(roadItem["Type"], ", ");
  }
  console.log(
    "      name: " + r.GetRoadName() + "\nroad items: " + printRoadItems
  );
}

// Save new JSON.
let updatedJSON = { Roads: [map.roads] };
console.log(JSON.stringify(updatedJSON));

let cm = new CharMatrix();
map.Print(cp, cm);
//let s: string;
let sDisplay: string = "";
for (let i = 0; i < CONSTS.CharMapSize; i++) {
  //s = cm.map[i].join("");
  sDisplay = sDisplay.concat("<p>", cm.map[i].join(""), "</p>");
  //console.log(s); // note that i have replaced spaces with "&nbsp" for rendering in HTML.
}

document.getElementById("app").innerHTML = `
<h1>results</h1>
<div>
  ${sDisplay}
</div>`;

/* 
notes:
errors in map were from
- using simInput.CreateRoad instead of constructor as explained in class
- put parameters in the wrong order when creating roads from the .json
*/
