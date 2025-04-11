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

export function DecimalVisualizer({
  initialDecimal = 0.5,
}: {
  initialDecimal?: number;
}) {
  const [decimal, setDecimal] = useState(initialDecimal);

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDecimal(value);
    }
  };

  const renderDecimalBlocks = () => {
    const totalBlocks = 10;
    const filledBlocks = Math.min(Math.abs(decimal) * totalBlocks, totalBlocks);
    const isNegative = decimal < 0;

    return (
      <div className="flex h-16 w-full gap-1 overflow-hidden rounded-md">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className={`h-full ${
              i < filledBlocks
                ? isNegative
                  ? "bg-destructive"
                  : "bg-primary"
                : "bg-muted border-border border-2"
            }`}
            style={{ width: `${100 / totalBlocks}%` }}
          />
        ))}
      </div>
    );
  };

  const getDecimalInfo = () => {
    const decimalStr = decimal.toFixed(2);
    const [whole, decimalPart] = decimalStr.split(".");
    const decimalPlaces = decimalPart.split("").map((digit, index) => ({
      digit,
      place: `1/${Math.pow(10, index + 1)}`,
    }));

    return {
      decimalStr,
      whole,
      decimalPart,
      decimalPlaces,
    };
  };

  const decimalInfo = getDecimalInfo();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Decimal Visualizer</CardTitle>
        <CardDescription>
          Enter a decimal number to visualize and understand its parts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="decimal">Decimal Number</Label>
          <Input
            id="decimal"
            type="number"
            value={decimal}
            onChange={handleDecimalChange}
            step="0.1"
          />
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="text-4xl font-bold">
            {decimalInfo.decimalStr}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Visual Representation</Label>
          {renderDecimalBlocks()}
          <div className="text-sm text-muted-foreground mt-2">
            Each block represents 0.1 (1/10)
          </div>
        </div>

        <div className="space-y-2">
          <Label>Decimal Breakdown</Label>
          <div className="text-sm space-y-1">
            <div>Whole number part: {decimalInfo.whole}</div>
            <div>Decimal part: 0.{decimalInfo.decimalPart}</div>
            <div className="mt-2">
              Each digit in the decimal represents:
              <ul className="list-disc pl-5 mt-1">
                {decimalInfo.decimalPlaces.map(({ digit, place }, index) => (
                  <li key={index}>
                    {digit} × {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Percentage: {(decimal * 100).toFixed(0)}%</Label>
          <Slider
            disabled
            value={[Math.abs(decimal) * 100]}
            max={100}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
