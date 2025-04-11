"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function IntegerVisualizer({
  initialInteger = 5,
}: {
  initialInteger?: number;
}) {
  const [integer, setInteger] = useState(initialInteger);

  const handleIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      setInteger(value);
    }
  };

  const renderIntegerBlocks = () => {
    const isNegative = integer < 0;
    const absoluteValue = Math.abs(integer);
    const maxBlocks = 10; // Maximum number of blocks to show
    const showBlocks = Math.min(absoluteValue, maxBlocks);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Negative</div>
          <div className="flex-1 h-8 border border-gray-300 rounded-md overflow-hidden">
            {isNegative && (
              <div
                className="h-full bg-black"
                style={{ width: `${(showBlocks / maxBlocks) * 100}%` }}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Positive</div>
          <div className="flex-1 h-8 border border-gray-300 rounded-md overflow-hidden">
            {!isNegative && (
              <div
                className="h-full bg-black"
                style={{ width: `${(showBlocks / maxBlocks) * 100}%` }}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const getIntegerInfo = () => {
    const isNegative = integer < 0;
    const absoluteValue = Math.abs(integer);
    const isEven = integer % 2 === 0;
    const isPrime = isPrimeNumber(absoluteValue);

    return {
      isNegative,
      absoluteValue,
      isEven,
      isPrime,
    };
  };

  const isPrimeNumber = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const integerInfo = getIntegerInfo();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Integer Visualizer</CardTitle>
        <CardDescription>
          Enter an integer to learn about its properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="integer">Integer</Label>
          <Input
            id="integer"
            type="number"
            value={integer}
            onChange={handleIntegerChange}
            step="1"
          />
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="text-4xl font-bold">
            {integer}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Visual Representation</Label>
          {renderIntegerBlocks()}
          <div className="text-sm text-muted-foreground mt-2">
            Shows the magnitude and sign of the number
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number Properties</Label>
          <div className="text-sm space-y-1">
            <div>Absolute Value: {integerInfo.absoluteValue}</div>
            <div>Sign: {integerInfo.isNegative ? "Negative" : "Positive"}</div>
            <div>Even or Odd: {integerInfo.isEven ? "Even" : "Odd"}</div>
            {integerInfo.absoluteValue > 1 && (
              <div>Prime Number: {integerInfo.isPrime ? "Yes" : "No"}</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number Line</Label>
          <Slider
            disabled
            value={[integer]}
            min={-10}
            max={10}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>-10</span>
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

