"use client";

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

export function PythagoreanVisualizer({
  initialA = 3,
  initialB = 4,
}: {
  initialA?: number;
  initialB?: number;
}) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setA(value);
    }
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setB(value);
    }
  };

  const calculateHypotenuse = () => {
    return Math.sqrt(a * a + b * b);
  };

  const renderTriangle = () => {
    const hypotenuse = calculateHypotenuse();
    const scale = 20; // pixels per unit
    const maxSize = 200; // maximum size in pixels

    // Calculate scaling factor to fit within maxSize
    const scaleFactor = Math.min(maxSize / (a * scale), maxSize / (b * scale));
    const scaledA = a * scale * scaleFactor;
    const scaledB = b * scale * scaleFactor;

    return (
      <div className="relative w-[200px] h-[200px] border border-gray-300 bg-white">
        {/* Triangle */}
        <div
          className="absolute border-2 border-primary"
          style={{
            width: `${scaledA}px`,
            height: `${scaledB}px`,
            borderRight: 'none',
            borderBottom: 'none',
          }}
        />
        {/* Hypotenuse */}
        <div
          className="absolute border-2 border-primary"
          style={{
            width: `${Math.sqrt(scaledA * scaledA + scaledB * scaledB)}px`,
            transform: `rotate(${Math.atan2(scaledB, scaledA) * (180 / Math.PI)}deg)`,
            transformOrigin: '0 0',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        />
        {/* Labels */}
        <div className="absolute" style={{ top: `${scaledB/2}px`, left: '-20px' }}>
          a = {a}
        </div>
        <div className="absolute" style={{ left: `${scaledA/2}px`, top: `${scaledB + 5}px` }}>
          b = {b}
        </div>
        <div className="absolute" style={{ 
          left: `${scaledA/2 + 10}px`, 
          top: `${scaledB/2 - 10}px`,
          transform: `rotate(${Math.atan2(scaledB, scaledA) * (180 / Math.PI)}deg)`
        }}>
          c = {hypotenuse.toFixed(2)}
        </div>
      </div>
    );
  };

  const hypotenuse = calculateHypotenuse();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pythagorean Theorem Visualizer</CardTitle>
        <CardDescription>
          Enter the lengths of two sides to calculate the hypotenuse
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sideA">Side A</Label>
            <Input
              id="sideA"
              type="number"
              value={a}
              onChange={handleAChange}
              step="0.1"
              min="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sideB">Side B</Label>
            <Input
              id="sideB"
              type="number"
              value={b}
              onChange={handleBChange}
              step="0.1"
              min="0.1"
            />
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="text-2xl">
            a² + b² = c²
            <br />
            {a}² + {b}² = {hypotenuse.toFixed(2)}²
            <br />
            {a * a} + {b * b} = {(hypotenuse * hypotenuse).toFixed(2)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Triangle Visualization</Label>
          <div className="flex justify-center">
            {renderTriangle()}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Calculations</Label>
          <div className="text-sm space-y-1">
            <div>Side A (a): {a}</div>
            <div>Side B (b): {b}</div>
            <div>Hypotenuse (c): {hypotenuse.toFixed(2)}</div>
            <div className="mt-2">
              <div>a² = {a * a}</div>
              <div>b² = {b * b}</div>
              <div>a² + b² = {(a * a + b * b).toFixed(2)}</div>
              <div>√(a² + b²) = {hypotenuse.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

