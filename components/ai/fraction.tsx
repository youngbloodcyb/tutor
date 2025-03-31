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

export function FractionVisualizer({
  initialNumerator = 1,
  initialDenominator = 4,
}: {
  initialNumerator?: number;
  initialDenominator?: number;
}) {
  const [numerator, setNumerator] = useState(initialNumerator);
  const [denominator, setDenominator] = useState(initialDenominator);

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      setNumerator(value);
    }
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value !== 0) {
      setDenominator(value);
    }
  };

  const renderFractionBlocks = () => {
    if (denominator <= 0) return null;

    const blocks = [];
    const totalBlocks = Math.abs(denominator);
    const filledBlocks =
      Math.abs(numerator) > totalBlocks ? totalBlocks : Math.abs(numerator);
    const isNegative =
      (numerator < 0 && denominator > 0) || (numerator > 0 && denominator < 0);

    for (let i = 0; i < totalBlocks; i++) {
      blocks.push(
        <div
          key={i}
          className={`h-full ${
            i < filledBlocks
              ? isNegative
                ? "bg-destructive"
                : "bg-black"
              : "bg-muted border-border border-2"
          }`}
          style={{ width: `${100 / totalBlocks}%` }}
        />
      );
    }

    return (
      <div className="flex h-16 w-full gap-1 overflow-hidden rounded-md">
        {blocks}
      </div>
    );
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = () => {
    if (numerator === 0) return "0";
    if (denominator === 0) return "Undefined";

    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    const simplifiedNumerator = Math.abs(numerator) / divisor;
    const simplifiedDenominator = Math.abs(denominator) / divisor;

    const isNegative =
      (numerator < 0 && denominator > 0) || (numerator > 0 && denominator < 0);

    if (simplifiedDenominator === 1) {
      return `${isNegative ? "-" : ""}${simplifiedNumerator}`;
    }

    return `${
      isNegative ? "-" : ""
    }${simplifiedNumerator}/${simplifiedDenominator}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Fraction Visualizer</CardTitle>
        <CardDescription>
          Enter a numerator and denominator to visualize the fraction
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numerator">Numerator</Label>
            <Input
              id="numerator"
              type="number"
              value={numerator}
              onChange={handleNumeratorChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="denominator">Denominator</Label>
            <Input
              id="denominator"
              type="number"
              value={denominator}
              onChange={handleDenominatorChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="text-4xl font-bold">
            {numerator}
            <div className="border-t border-current my-1"></div>
            {denominator}
          </div>
          <div className="mx-4 text-2xl">=</div>
          <div className="text-4xl font-bold">{simplifyFraction()}</div>
        </div>

        <div className="space-y-2">
          <Label>Visual Representation</Label>
          {renderFractionBlocks()}
        </div>

        <div className="space-y-2">
          <Label>
            Decimal Value:{" "}
            {denominator !== 0
              ? (numerator / denominator).toFixed(4)
              : "Undefined"}
          </Label>
          <Slider
            disabled
            value={[denominator !== 0 ? (numerator / denominator) * 100 : 0]}
            max={100}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
