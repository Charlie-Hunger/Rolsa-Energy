"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CarbonCalculatorPage() {
  // Basic form states
  const [electricityUsage, setElectricityUsage] = useState<number>(0);
  const [transportMethod, setTransportMethod] = useState<string>("car");
  const [dietType, setDietType] = useState<string>("mixed");

  const [results, setResults] = useState<null | {
    totalEmissions: number;
  }>(null);

  const calculateFootprint = () => {
    // Simple calculations
    const electricityEmission = electricityUsage * 0.0005;

    let transportEmission = 1.0;
    if (transportMethod === "public") transportEmission = 0.5;
    else if (transportMethod === "bike") transportEmission = 0.1;

    let dietEmission = 1.5;
    if (dietType === "vegetarian") dietEmission = 0.8;
    else if (dietType === "vegan") dietEmission = 0.5;

    const totalEmissions = parseFloat(
      (electricityEmission + transportEmission + dietEmission).toFixed(1)
    );

    setResults({ totalEmissions });
  };

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carbon Footprint Calculator</h1>

      {!results ? (
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="electricity">
                Monthly Electricity Usage (kWh)
              </Label>
              <Input
                id="electricity"
                type="number"
                placeholder="e.g. 500"
                value={electricityUsage || ""}
                onChange={(e) => setElectricityUsage(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Transportation</Label>
              <RadioGroup
                value={transportMethod}
                onValueChange={setTransportMethod}
                defaultValue="car"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="car" id="car" />
                  <Label htmlFor="car">Car</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public Transport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bike" id="bike" />
                  <Label htmlFor="bike">Bicycle/Walking</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Diet Type</Label>
              <RadioGroup
                value={dietType}
                onValueChange={setDietType}
                defaultValue="mixed"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed-diet" />
                  <Label htmlFor="mixed-diet">Mixed Diet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={calculateFootprint}>Calculate</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Carbon Footprint Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4 rounded-lg">
              <div className="text-3xl font-bold">
                {results.totalEmissions} tons CO₂e per year
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setResults(null)}>Calculate Again</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
