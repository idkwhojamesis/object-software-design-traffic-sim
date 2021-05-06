using System;
using System.Collections.Generic;

namespace HW5_2021_OOP
{
    static class Constants
    {
        public const double AccRate = 3.5;          // Acceleration rate for cars in m/s
        public const double AccRateEmpty = 2.5;     // Acceleration rate for light trucks in m/s
        public const double AccRateFull = 1.0;      // Acceleration rate for heavy trucks in m/s
        public const double DecRate = 7.0;          // Braking rate for cars in m/s
        public const double DecRateEmpty = 5.0;     // Braking rate for light trucks in m/s
        public const double DecRateFull = 2.0;      // Braking rate for light trucks in m/s
        public const double MpsToMph = 2.237;
        public const double MpsToKph = 3.6;
        public const double MetersToMiles = 0.000621371;
        public const double MetersToKm = 0.001;
        public const int CharMapSize = 40;
        public const double WorldSize = 200.0;
    }

    class Program : ISimInput, ISimOutput
    {
        static void Main(string[] args)
        {
            GUI simInput;
            Map map = new Map();
            IPrintDriver cp = new ConsolePrint();
            //Console.Write("Enter 'M' for metric or 'I' for Imperial: ");
            //string units = Console.ReadLine();
            //Console.Write("Enter speed limit: ");
            //double speedLimit = Convert.ToDouble(Console.ReadLine());
            //if (units == "I") gui = new ImperialGUI();
            //else gui = new MetricGUI();
            //Car car = new Car(); gui.SetSpeedLimit(car, speedLimit);
            //Truck truck1 = new Truck(4); gui.SetSpeedLimit(truck1, speedLimit);
            //Truck truck2 = new Truck(8); gui.SetSpeedLimit(truck2, speedLimit);
            //List<Vehicle> vehicles = new List<Vehicle>();
            //vehicles.Add(car); vehicles.Add(truck1); vehicles.Add(truck2);
            //for (int i = 0; i < 11; i++)
            //{
            //    foreach (Vehicle v in vehicles)
            //    {
            //        v.UpdateSpeed(1);
            //        string s = v.GetType().ToString();
            //        Console.WriteLine("{0} speed: {1:F}", s, gui.GetSpeed(v));
            //    }
            //}
            simInput = new MetricGUI();
            Road Uptown = simInput.CreateRoad("Uptown", 0.0, -0.09, .180, Heading.North);
            map.AddRoad(Uptown);
            Road Crosstown = simInput.CreateRoad("Crosstown", -0.09, 0.0, .180, Heading.East);
            map.AddRoad(Crosstown);

            CharMatrix cm = new CharMatrix();
            map.Print(cp, cm);
            for (int i = 0; i < Constants.CharMapSize; i++)
            {
                string s = new string(cm.map[i]);
                Console.WriteLine(s);
            }
        }

        public double GetSpeed(Vehicle v)
        {
            return v.GetCurrentSpeed() * Constants.MpsToMph;
        }

        public void SetSpeedLimit(Vehicle v, double speed)
        {
            v.SetDesiredSpeed(speed / Constants.MpsToMph);
        }
    }

    interface ISimInput
    {
        void SetSpeedLimit(Vehicle v, double speed);
    }

    interface ISimOutput
    {
        double GetSpeed(Vehicle v);
    }
    
    abstract class GUI : ISimInput, ISimOutput
    {
        public abstract Road CreateRoad(string name, double locx, double locy, double len, Heading hdg);
        public abstract double GetSpeed(Vehicle v);
        public abstract void SetSpeedLimit(Vehicle v, double speed);
    }

    class MetricGUI : GUI
    {
        public override Road CreateRoad(string name, double locx, double locy, double len, Heading hdg)
        {
            return new Road(name, locx / Constants.MetersToKm, locy / Constants.MetersToKm, len / Constants.MetersToKm, hdg);
        }

        public override double  GetSpeed(Vehicle v)
        {
            return v.GetCurrentSpeed() * Constants.MpsToKph;
        }

        public override void SetSpeedLimit(Vehicle v, double speed)
        {
            v.SetDesiredSpeed(speed / Constants.MpsToKph);
        }
    }

    class ImperialGUI : GUI
    {
        public override Road CreateRoad(string name, double locx, double locy, double len, Heading hdg)
        {
            return new Road(name, locx / Constants.MetersToMiles, locy / Constants.MetersToMiles, len / Constants.MetersToMiles, hdg);
        }
        public override double GetSpeed(Vehicle v)
        {
            return v.GetCurrentSpeed() * Constants.MpsToMph;
        }

        public override void SetSpeedLimit(Vehicle v, double speed)
        {
            v.SetDesiredSpeed(speed / Constants.MpsToMph);
        }
    }

    abstract class Vehicle
    {
        private double currentSpeed = 0.0;
        private double desiredSpeed;

        protected abstract void Accelerate(int secondsDelta);
        protected abstract void Decelerate(int secondsDelta);

        public double GetCurrentSpeed()
        {
            return currentSpeed;
        }

        public void SetDesiredSpeed(double speed)
        {
            desiredSpeed = speed;
        }

        protected void SetCurrentSpeed(double speed)
        {
            if (currentSpeed <= speed) // accelerating
            {
                if (speed > desiredSpeed) currentSpeed = desiredSpeed;
                else currentSpeed = speed;
            }
            else // braking
            {
                if (speed < desiredSpeed) currentSpeed = desiredSpeed;
                else currentSpeed = speed;
            }
        }

        public void UpdateSpeed(int seconds)
        {
            if (currentSpeed > desiredSpeed) Decelerate(seconds);
            else if (currentSpeed < desiredSpeed) Accelerate(seconds);
        }
    }

    class Car : Vehicle
    {
        protected override void Accelerate(int secondsDelta)
        {
            SetCurrentSpeed(GetCurrentSpeed() + Constants.AccRate * secondsDelta);
        }

        protected override void Decelerate(int secondsDelta)
        {
            SetCurrentSpeed(GetCurrentSpeed() - Constants.DecRate * secondsDelta);
        }
    }

    class Truck : Vehicle
    {
        private int loadWeight;      // in tons

        public Truck(int weight)
        {
            loadWeight = weight;
        }

        protected override void Accelerate(int secondsDelta)
        {
            if (loadWeight <= 5)
                SetCurrentSpeed(GetCurrentSpeed() + Constants.AccRateEmpty * secondsDelta);
            else
                SetCurrentSpeed(GetCurrentSpeed() + Constants.AccRateFull * secondsDelta);
        }

        protected override void Decelerate(int secondsDelta)
        {
            if (loadWeight <= 5)
                SetCurrentSpeed(GetCurrentSpeed() - Constants.DecRateEmpty * secondsDelta);
            else
                SetCurrentSpeed(GetCurrentSpeed() - Constants.DecRateFull * secondsDelta);
        }
    }

}