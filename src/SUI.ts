import { CONSTS } from "./index";
import { Road, Heading } from "./Road";
import { Conversions } from "./Common";
class CharMatrix {
  map: string[][];
  constructor() {
    this.map = [];
    for (let i = 0; i < CONSTS.CharMapSize; i++) {
      this.map[i] = [];
      for (let j = 0; j < CONSTS.CharMapSize; j++)
        //this.map[i][j] = parseInt("");
        // changed from space to properly output to HTML.
        this.map[i][j] = "&nbsp;";
      //this.map[i][j] = " ";
    }
  }
}

interface IPrintDriver {
  PrintRoad: (road: Road, o: Object) => void;
}

class ConsolePrint implements IPrintDriver {
  PrintRoad(road: Road, cm: CharMatrix) {
    //var cm: CharMatrix; //I'm not sure how to put "o"
    let x, y;
    let CCx = Conversions.WCpointToCCpoint(road.GetXLocation());
    let CCy = Conversions.WCpointToCCpoint(-road.GetYLocation());
    let distance = 0;
    let CCRoadLength = Conversions.WClengthToCClength(road.GetLength());
    switch (road.GetHeading()) {
      case Heading.North:
        x = Math.floor(CCx);
        if (x >= 0 && x < CONSTS.CharMapSize) {
          while (distance < CCRoadLength) {
            y = Math.floor(CCy - distance);
            if (y >= 0 && y < CONSTS.CharMapSize) {
              cm.map[y][x] = "|";
              cm.map[y][x + 2] = "|";
              cm.map[y][x + 4] = "|";
            }
            distance += 1;
          }
        }
        break;
      case Heading.South:
        break;
      case Heading.East:
        y = Math.floor(CCy);
        if (y >= 0 && y < CONSTS.CharMapSize) {
          while (distance < CCRoadLength) {
            x = Math.floor(CCx + distance);
            if (x >= 0 && x < CONSTS.CharMapSize) {
              cm.map[y][x] = "-";
              cm.map[y + 2][x] = "-";
              cm.map[y + 4][x] = "-";
            }
            distance += 1;
          }
        }
        break;
      case Heading.West:
        break;
      default:
        break;
    }
  }
}
export { CharMatrix, IPrintDriver, ConsolePrint };
