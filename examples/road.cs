using System;


namespace HW5_2021_OOP
{
    public enum Heading { North, South, East, West }
    class Road
    {
        //private RoadItem head;
        private string name;
        private double length;
        private double xlocation;
        private double ylocation;
        private Heading heading;
        public static int NumOfRoads = 0;

        public Road(string streetName, double locX, double locY, double len, Heading hdg)
        {
            //head = new RoadItem();
            //head.SetPrevious(null);
            //head.SetNext(null);
            name = streetName;
            length = len;
            heading = hdg;
            xlocation = locX;
            ylocation = locY;
            NumOfRoads++;
        }

        public double GetLength() { return length; }

        public double GetXLocation() { return xlocation; }

        public double GetYLocation() { return ylocation; }

        public Heading GetHeading() { return heading; }

        public string GetRoadName() { return name; }

        //public void AddRoadItem(RoadItem roadItem)
        //{
        //    roadItem.SetCurrentRoad(this);
        //    RoadItem currentItem = head;
        //    while (currentItem.GetNext() != null)
        //    {
        //        currentItem = currentItem.GetNext();
        //        if (currentItem.GetMileMarker() > roadItem.GetMileMarker())
        //        {
        //            InsertNewItemBefore(currentItem, roadItem);
        //            return;
        //        }
        //    }
        //    InsertNewItemAfter(currentItem, roadItem);
        //}

        public void Print(IPrintDriver print, Object o)
        {
            print.PrintRoad(this, o);
        }

        //    private void InsertNewItemBefore(RoadItem current, RoadItem newItem)
        //    {
        //        newItem.SetPrevious(current.GetPrevious());
        //        newItem.SetNext(current);
        //        current.SetPrevious(newItem);
        //        newItem.GetPrevious().SetNext(newItem);
        //    }

        //    private void InsertNewItemAfter(RoadItem current, RoadItem newItem)
        //    {
        //        newItem.SetNext(current.GetNext());
        //        current.SetNext(newItem);
        //        newItem.SetPrevious(current);
        //        if (newItem.GetNext() != null) newItem.GetNext().SetPrevious(newItem);
        //    }
        //}
    }
}
