using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW5_2021_OOP
{
    static class Conversions
    {
        public static int WCpointToCCpoint(double val)
        {
            return (int)(val * (Constants.CharMapSize / Constants.WorldSize) + (Constants.CharMapSize / 2));
        }

        public static int WClengthToCClength(double val)
        {
            return (int)(val * (Constants.CharMapSize / Constants.WorldSize));
        }
    }
}