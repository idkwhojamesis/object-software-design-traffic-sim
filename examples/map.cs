using System;
using System.Collections.Generic;

namespace HW5_2021_OOP
{
    class Map
    {
        private List<Road> roads;

        public Map()
        {
            roads = new List<Road>();
        }

        public void AddRoad(Road road)
        {
            roads.Add(road);
        }

        public void Print(IPrintDriver pd, Object o)
        {
            foreach (Road road in roads)
            {
                road.Print(pd, o);
            }
        }
    }
}