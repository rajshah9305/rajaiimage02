'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageModel } from '@/lib/types';
import { Zap, Brain, Rocket } from 'lucide-react';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  models: ImageModel[];
}

export function ModelSelector({ value, onChange, models }: ModelSelectorProps) {
  const getModelIcon = (modelId: string) => {
    switch (modelId) {
      case 'flux':
        return <Brain className="w-4 h-4" />;
      case 'turbo':
        return <Rocket className="w-4 h-4" />;
      case 'nanobanana':
        return <Zap className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">AI Model</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center gap-2">
                {getModelIcon(model.id)}
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}