import { CONSTS } from "./index";

class Conversions {
  static WCpointToCCpoint(val: number): number {
    return (
      val * (CONSTS.CharMapSize / CONSTS.WorldSize) + CONSTS.CharMapSize / 2
    );
  }
  static WClengthToCClength(val: number): number {
    return val * (CONSTS.CharMapSize / CONSTS.WorldSize);
  }
}

export { Conversions };
