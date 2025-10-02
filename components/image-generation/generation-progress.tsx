'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Zap, Brain } from 'lucide-react';

interface GenerationProgressProps {
  progress: number;
}

const progressMessages = [
  'Initializing AI models...',
  'Analyzing your prompt...',
  'Creating artistic vision...',
  'Generating masterpiece...',
  'Adding creative touches...',
  'Finalizing details...',
  'Polishing artwork...',
  'Almost ready...',
  'Completing generation...',
];

export function GenerationProgress({ progress }: GenerationProgressProps) {
  const messageIndex = Math.min(Math.floor((progress / 100) * progressMessages.length), progressMessages.length - 1);
  const currentMessage = progressMessages[messageIndex] || 'Creating magic...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 p-6 glass-effect rounded-lg border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          Creating Your Artwork
        </h3>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      
      <Progress value={progress} className="mb-4" />
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{currentMessage}</p>
        <div className="flex gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            <Brain className="w-4 h-4 text-blue-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}