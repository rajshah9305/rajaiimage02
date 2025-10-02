'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArtStyle } from '@/lib/types';

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  styles: ArtStyle[];
}

export function StyleSelector({ value, onChange, styles }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Art Style</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a style (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <div>
                <div className="font-medium">No Style</div>
                <div className="text-xs text-muted-foreground">Use default style</div>
              </div>
            </div>
          </SelectItem>
          {styles.map((style) => (
            <SelectItem key={style.id} value={style.id}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{style.icon}</span>
                <div>
                  <div className="font-medium">{style.name}</div>
                  <div className="text-xs text-muted-foreground">{style.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}