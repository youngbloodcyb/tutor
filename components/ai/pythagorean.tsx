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
    const scale = 20;
    const maxSize = 200;
    const padding = 20;

    // Find the maximum side length to determine scaling
    const maxSide = Math.max(a, b);
    const scaleFactor = (maxSize - padding * 2) / (maxSide * scale);

    const scaledA = a * scale * scaleFactor;
    const scaledB = b * scale * scaleFactor;

    return (
      <div className="relative w-[200px] h-[200px] border border-gray-300 bg-white">
        {/* Side A (horizontal) */}
        <div
          className="absolute bg-blue-500"
          style={{
            width: `${scaledA}px`,
            height: "6px",
            top: `${padding + scaledB}px`,
            left: `${padding}px`,
          }}
        />
        {/* Side B (vertical) */}
        <div
          className="absolute bg-blue-500"
          style={{
            width: "6px",
            height: `${scaledB}px`,
            top: `${padding}px`,
            left: `${padding}px`,
          }}
        />
        {/* Hypotenuse */}
        <div
          className="absolute bg-blue-500"
          style={{
            width: `${Math.sqrt(scaledA * scaledA + scaledB * scaledB)}px`,
            height: "6px",
            transform: `rotate(${
              Math.atan2(scaledB, scaledA) * (180 / Math.PI)
            }deg)`,
            transformOrigin: "0 0",
            top: `${padding}px`,
            left: `${padding}px`,
          }}
        />
        {/* Labels */}
        <div
          className="absolute font-bold"
          style={{ top: `${padding + scaledB / 2}px`, left: "-30px" }}
        >
          a = {a.toFixed(2)}
        </div>
        <div
          className="absolute font-bold"
          style={{
            left: `${padding + scaledA / 2}px`,
            top: `${padding + scaledB + 20}px`,
          }}
        >
          b = {b.toFixed(2)}
        </div>
        <div
          className="absolute font-bold"
          style={{
            left: `${padding + scaledA / 2 + 20}px`,
            top: `${padding + scaledB / 2 - 10}px`,
            transform: `rotate(${
              Math.atan2(scaledB, scaledA) * (180 / Math.PI)
            }deg)`,
          }}
        >
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
            {a.toFixed(2)}² + {b.toFixed(2)}² = {hypotenuse.toFixed(2)}²
            <br />
            {(a * a).toFixed(2)} + {(b * b).toFixed(2)} ={" "}
            {(hypotenuse * hypotenuse).toFixed(2)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Triangle Visualization</Label>
          <div className="flex justify-center">{renderTriangle()}</div>
        </div>

        <div className="space-y-2">
          <Label>Calculations</Label>
          <div className="text-sm space-y-1">
            <div>Side A (a): {a.toFixed(2)}</div>
            <div>Side B (b): {b.toFixed(2)}</div>
            <div>Hypotenuse (c): {hypotenuse.toFixed(2)}</div>
            <div className="mt-2">
              <div>a² = {(a * a).toFixed(2)}</div>
              <div>b² = {(b * b).toFixed(2)}</div>
              <div>a² + b² = {(a * a + b * b).toFixed(2)}</div>
              <div>√(a² + b²) = {hypotenuse.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
