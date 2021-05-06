import { CONSTS } from "./index";

abstract class Conversions {
  public static WCpointToCCpoint(val: number): number {
    return (
      val * (CONSTS.CharMapSize / CONSTS.WorldSize) + CONSTS.CharMapSize / 2
    );
  }
  public static WClengthToCClength(val: number): number {
    return val * (CONSTS.CharMapSize / CONSTS.WorldSize);
  }
}

export { Conversions };
