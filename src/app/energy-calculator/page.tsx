"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function EnergyCalculator() {
  // Simple states for calculator
  const [homeType, setHomeType] = useState("medium");
  const [occupants, setOccupants] = useState("2");
  const [applianceUsage, setApplianceUsage] = useState("medium");

  // State for results
  const [showResults, setShowResults] = useState(false);
  const [monthlyUsage, setMonthlyUsage] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  const calculateEnergy = () => {
    // Very simple calculation based on home type, occupants and usage
    let baseUsage = 0;

    // Base usage by home type
    if (homeType === "small") baseUsage = 200;
    else if (homeType === "medium") baseUsage = 300;
    else if (homeType === "large") baseUsage = 450;

    // Adjust for occupants
    const numOccupants = parseInt(occupants);
    const withOccupants = baseUsage + (numOccupants - 1) * 75;

    // Adjust for usage habits
    let finalUsage = withOccupants;
    if (applianceUsage === "low") finalUsage *= 0.8;
    if (applianceUsage === "high") finalUsage *= 1.25;

    // Set results
    setMonthlyUsage(Math.round(finalUsage));
    setMonthlyCost(Math.round(finalUsage * 0.27));
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Zap className="h-10 w-10 text-green-500 mx-auto mb-2" />
        <h1 className="text-2xl font-bold mb-2">Energy Calculator</h1>
        <p className="text-gray-500">Quick estimate of your energy usage</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Answer 3 Simple Questions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Home Size */}
            <div>
              <Label className="mb-2 block">
                1. What type of home do you live in?
              </Label>
              <RadioGroup
                value={homeType}
                onValueChange={setHomeType}
                className="grid grid-cols-3 gap-2"
              >
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    homeType === "small" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem
                    value="small"
                    id="small"
                    className="sr-only"
                  />
                  <Label htmlFor="small" className="cursor-pointer font-normal">
                    Flat
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    homeType === "medium" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem
                    value="medium"
                    id="medium"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="medium"
                    className="cursor-pointer font-normal"
                  >
                    Small House
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    homeType === "large" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem
                    value="large"
                    id="large"
                    className="sr-only"
                  />
                  <Label htmlFor="large" className="cursor-pointer font-normal">
                    Large House
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Number of people */}
            <div>
              <Label className="mb-2 block">
                2. How many people live in your home?
              </Label>
              <RadioGroup
                value={occupants}
                onValueChange={setOccupants}
                className="grid grid-cols-3 gap-2"
              >
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    occupants === "1" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem value="1" id="one" className="sr-only" />
                  <Label htmlFor="one" className="cursor-pointer font-normal">
                    1
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    occupants === "2" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem value="2" id="two" className="sr-only" />
                  <Label htmlFor="two" className="cursor-pointer font-normal">
                    2-3
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    occupants === "4" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem value="4" id="four" className="sr-only" />
                  <Label htmlFor="four" className="cursor-pointer font-normal">
                    4+
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Energy usage habits */}
            <div>
              <Label className="mb-2 block">
                3. How would you describe your energy use?
              </Label>
              <RadioGroup
                value={applianceUsage}
                onValueChange={setApplianceUsage}
                className="grid grid-cols-3 gap-2"
              >
                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    applianceUsage === "low" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem value="low" id="low" className="sr-only" />
                  <Label htmlFor="low" className="cursor-pointer font-normal">
                    Careful
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    applianceUsage === "medium"
                      ? "border-green-500 bg-black"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value="medium"
                    id="medium2"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="medium2"
                    className="cursor-pointer font-normal"
                  >
                    Average
                  </Label>
                </div>

                <div
                  className={`border rounded-md p-3 text-center cursor-pointer ${
                    applianceUsage === "high" ? "border-green-500 bg-black" : ""
                  }`}
                >
                  <RadioGroupItem value="high" id="high" className="sr-only" />
                  <Label htmlFor="high" className="cursor-pointer font-normal">
                    Heavy
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
              onClick={calculateEnergy}
            >
              Calculate
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-center">
                Your Energy Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3">
                  <p className="text-sm text-gray-500">Monthly Usage</p>
                  <p className="text-2xl font-bold text-green-600">
                    {monthlyUsage} kWh
                  </p>
                </div>

                <div className="p-3 border-l">
                  <p className="text-sm text-gray-500">Monthly Cost</p>
                  <p className="text-2xl font-bold text-green-600">
                    £{monthlyCost}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-black p-3 rounded-md text-sm">
                <p>
                  Installing solar panels could save you up to £
                  {Math.round(monthlyCost * 0.7)} per month!
                </p>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
