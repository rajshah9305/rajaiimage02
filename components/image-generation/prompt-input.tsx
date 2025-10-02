'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Palette, Camera } from 'lucide-react';

const PROMPT_SUGGESTIONS = [
  'A majestic dragon soaring through clouds at sunset',
  'Cyberpunk cityscape with neon lights reflecting on wet streets',
  'Ancient temple hidden in a mystical forest',
  'Portrait of an astronaut painted in Renaissance style',
  'Underwater city with bioluminescent coral reefs',
  'Steampunk mechanical butterfly with intricate gears',
  'Minimalist Japanese garden with cherry blossoms',
  'Futuristic space station orbiting a distant planet',
];

export function PromptInput({ 
  value, 
  onChange, 
  onKeyPress,
  placeholder 
}: { 
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const enhancePrompt = () => {
    const enhancements = [
      'professional photography',
      'highly detailed',
      '8K resolution',
      'masterpiece',
      'award-winning',
    ];
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    onChange(value ? `${value}, ${randomEnhancement}` : randomEnhancement);
  };

  return (
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Creative Prompt</label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={enhancePrompt}
            className="h-7 px-2 text-xs"
          >
            <Zap className="w-3 h-3 mr-1" />
            Enhance
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="h-7 px-2 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Ideas
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder || "Describe your creative vision..."}
          className="min-h-[100px] resize-none pr-12"
        />
        <div className="absolute right-3 top-3">
          <Palette className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <p className="text-xs text-muted-foreground">Click to use a suggestion:</p>
            <div className="grid gap-2">
              {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => insertSuggestion(suggestion)}
                  className="text-left p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}