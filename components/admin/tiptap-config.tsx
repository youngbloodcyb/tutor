"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface TiptapConfigProps {
  block: any;
  updateBlock: (id: string, data: any) => void;
}

export function TiptapConfig({ block, updateBlock }: TiptapConfigProps) {
  const handleChange = (key: string, value: any) => {
    updateBlock(block.id, {
      ...block,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Block Title</Label>
        <Input
          id="title"
          value={block.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter a title for this block"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="showToolbar">Show Toolbar</Label>
        <Switch
          id="showToolbar"
          checked={block.showToolbar !== false}
          onCheckedChange={(checked) => handleChange("showToolbar", checked)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="maxHeight">Max Height (px)</Label>
          <span className="text-sm text-muted-foreground">
            {block.maxHeight || 300}
          </span>
        </div>
        <Slider
          id="maxHeight"
          min={100}
          max={800}
          step={10}
          value={[block.maxHeight || 300]}
          onValueChange={(value) => handleChange("maxHeight", value[0])}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="allowImages">Allow Images</Label>
        <Switch
          id="allowImages"
          checked={block.allowImages || false}
          onCheckedChange={(checked) => handleChange("allowImages", checked)}
        />
      </div>
    </div>
  );
}
