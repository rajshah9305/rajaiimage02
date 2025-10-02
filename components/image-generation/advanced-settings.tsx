'use client';

import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ASPECT_RATIOS } from '@/lib/constants';
import { Button } from "@/components/ui/button";
import { Settings, Wand2, Shield, Zap } from 'lucide-react';

interface AdvancedSettingsProps {
  width: number;
  height: number;
  onDimensionsChange: (width: number, height: number) => void;
  seed?: number;
  onSeedChange: (seed?: number) => void;
  enhance: boolean;
  onEnhanceChange: (enhance: boolean) => void;
  nologo: boolean;
  onNologoChange: (nologo: boolean) => void;
}

export function AdvancedSettings({
  width,
  height,
  onDimensionsChange,
  seed,
  onSeedChange,
  enhance,
  onEnhanceChange,
  nologo,
  onNologoChange,
}: AdvancedSettingsProps) {
  const currentRatio = ASPECT_RATIOS.find(
    (ratio) => ratio.width === width && ratio.height === height
  );

  return (
    <div className="space-y-6 pt-4 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-4 h-4" />
        <h4 className="font-medium">Advanced Settings</h4>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        <Label>Image Dimensions</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Width</Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => onDimensionsChange(Number(e.target.value), height)}
              min="256"
              max="2048"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Height</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => onDimensionsChange(width, Number(e.target.value))}
              min="256"
              max="2048"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.label}
              onClick={() => onDimensionsChange(ratio.width, ratio.height)}
              className={`px-3 py-2 text-xs rounded-md border transition-colors ${
                currentRatio?.label === ratio.label
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {ratio.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seed */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          Random Seed
        </Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Leave empty for random"
            value={seed || ''}
            onChange={(e) => onSeedChange(e.target.value ? Number(e.target.value) : undefined)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => onSeedChange(Math.floor(Math.random() * 1000000))}
            className="px-3"
          >
            Random
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enhance"
            checked={enhance}
            onCheckedChange={(checked) => onEnhanceChange(!!checked)}
          />
          <Label
            htmlFor="enhance"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Enhance Prompt
            <span className="text-xs text-muted-foreground">
              Add professional quality terms
            </span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="nologo"
            checked={nologo}
            onCheckedChange={(checked) => onNologoChange(!!checked)}
          />
          <Label
            htmlFor="nologo"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            Remove Watermark
            <span className="text-xs text-muted-foreground">
              Generate without logo
            </span>
          </Label>
        </div>
      </div>
    </div>
  );
}
