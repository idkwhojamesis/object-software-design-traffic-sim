import { IPrintDriver } from "./sui";

enum Heading {
  North,
  South,
  East,
  West
}
class Road {
  //_head: RoadItem
  _name: string;
  _length: number;
  _heading: Heading;
  _xLocation: number;
  _yLocation: number;

  static NumOfRoads: number = 0;
  constructor(
    streetName: string,
    locX: number,
    locY: number,
    len: number,
    hdg: Heading
  ) {
    this._name = streetName;
    this._length = len;
    this._heading = hdg;
    this._xLocation = locX;
    this._yLocation = locY;
    Road.NumOfRoads++;
  }
  getLength() {
    return this._length;
  }
  getXLocation() {
    return this._xLocation;
  }
  getYLocation() {
    return this._yLocation;
  }
  getHeading() {
    return this._heading;
  }
  getRoadName() {
    return this._name;
  }
  /* 
  public void AddRoadItem(RoadItem roadItem)
  {
    roadItem.SetCurrentRoad(this);
    RoadItem currentItem = head;
    while (currentItem.GetNext() != null)
    {
      currentItem = currentItem.GetNext();
      if (currentItem.GetMileMarker() > roadItem.GetMileMarker())
      {
        InsertNewItemBefore(currentItem, roadItem);
        return;
      }
    }
    InsertNewItemAfter(currentItem, roadItem);
  }
  */
  print(print: IPrintDriver, o: object): void {
    print.printRoad(this, o);
  }
  /*
  private void InsertNewItemBefore(RoadItem current, RoadItem newItem)
  {
    newItem.SetPrevious(current.GetPrevious());
    newItem.SetNext(current);
    current.SetPrevious(newItem);
    newItem.GetPrevious().SetNext(newItem);
  }

  private void InsertNewItemAfter(RoadItem current, RoadItem newItem)
  {
    newItem.SetNext(current.GetNext());
    current.SetNext(newItem);
    newItem.SetPrevious(current);
    if (newItem.GetNext() != null) newItem.GetNext().SetPrevious(newItem);
  }
  */
}

export { Heading, Road };
