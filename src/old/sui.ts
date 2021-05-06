import { Heading, Road } from "./road";
import { Conversions } from "./common";
import { CONSTS } from "./index";

class CharMatrix {
  map: string[][];
  constructor() {
    this.map = new Array(CONSTS.CharMapSize);
    for (let i = 0; i < CONSTS.CharMapSize; i++) {
      this.map[i] = new Array(CONSTS.CharMapSize);
      for (let j = 0; j < CONSTS.CharMapSize; j++) {
        this.map[i][j] = " ";
      }
    }
  }
}

interface IPrintDriver {
  printRoad(road: Road, o: Object): void;
  printCar(car: Car, o: Object): void;
}

class ConsolePrint implements IPrintDriver {
  printRoad(road: Road, o: any): void {
    let cm: CharMatrix = o;
    let x: number, y: number;
    let CCx: number = Conversions.WCpointToCCpoint(road.getXLocation());
    let CCy: number = Conversions.WCpointToCCpoint(-road.getYLocation());
    let distance: number = 0;
    let CCRoadLength: number = Conversions.WClengthToCClength(road.getLength());
    switch (road.getHeading) {
      case Heading.North:
        x = CCx;
        if (x >= 0 && x < CONSTS.CharMapSize) {
          while (distance < CCRoadLength) {
            y = CCy - distance;
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
        y = CCy;
        if (y >= 0 && y < CONSTS.CharMapSize) {
          while (distance < CCRoadLength) {
            x = CCx + distance;
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
  printCar(car: Car, o: Object) {}
}

export { CharMatrix, ConsolePrint, IPrintDriver };
