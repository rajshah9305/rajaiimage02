'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold">Raj Image Studio</span>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for creative minds
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Powered by <a href="https://pollinations.ai" className="text-primary hover:underline">Pollinations.ai</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}