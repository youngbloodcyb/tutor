"use client";

import React from "react";

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

export function LineVisualizer({
  initialSlope = 1,
  initialYIntercept = 0,
}: {
  initialSlope?: number;
  initialYIntercept?: number;
}) {
  const [slope, setSlope] = useState(initialSlope);
  const [yIntercept, setYIntercept] = useState(initialYIntercept);

  const handleSlopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSlope(value);
    }
  };

  const handleYInterceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      setYIntercept(value);
    }
  };

  const renderLineGraph = () => {
    // Create a 400x400 pixel canvas for the graph
    const canvasSize = 400;
    const center = canvasSize / 2;
    const scale = 20; // pixels per unit

    return (
      <div className="relative w-[400px] h-[400px] border border-gray-300 bg-white">
        {/* X and Y axes */}
        <div className="absolute w-full h-px bg-gray-300 top-1/2" />
        <div className="absolute h-full w-px bg-gray-300 left-1/2" />
        
        {/* Line */}
        <div
          className="absolute w-full h-px bg-blue-500"
          style={{
            transform: `rotate(${Math.atan(slope) * (180 / Math.PI)}deg)`,
            top: `${center - yIntercept * scale}px`,
          }}
        />
        
        {/* Grid lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="absolute w-full h-px bg-gray-100" style={{ top: `${i * 20}px` }} />
            <div className="absolute h-full w-px bg-gray-100" style={{ left: `${i * 20}px` }} />
          </React.Fragment>
        ))}
      </div>
    );
  };

  const getEquation = () => {
    let equation = "y = ";
    
    // Handle slope
    if (slope === 0) {
      equation += "0";
    } else if (slope === 1) {
      equation += "x";
    } else if (slope === -1) {
      equation += "-x";
    } else {
      equation += `${slope}x`;
    }
    
    // Handle y-intercept
    if (yIntercept > 0) {
      equation += ` + ${yIntercept}`;
    } else if (yIntercept < 0) {
      equation += ` - ${Math.abs(yIntercept)}`;
    }
    
    return equation;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Line Equation Visualizer</CardTitle>
        <CardDescription>
          Enter a slope (m) and y-intercept (b) to visualize the line equation y = mx + b
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slope">Slope (m)</Label>
            <Input
              id="slope"
              type="number"
              value={slope}
              onChange={handleSlopeChange}
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yIntercept">Y-Intercept (b)</Label>
            <Input
              id="yIntercept"
              type="number"
              value={yIntercept}
              onChange={handleYInterceptChange}
              step="0.1"
            />
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="text-4xl font-bold">
            y = {slope}x {yIntercept >= 0 ? "+" : "-"} {Math.abs(yIntercept)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Graph</Label>
          {renderLineGraph()}
        </div>

        <div className="space-y-2">
          <Label>Equation: {getEquation()}</Label>
          <div className="text-sm text-gray-500">
            • Slope (m): {slope} (rise/run)
            <br />
            • Y-Intercept (b): {yIntercept} (where the line crosses the y-axis)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
