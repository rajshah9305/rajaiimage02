'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Zap, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-75"></div>
            <div className="relative bg-background rounded-lg p-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Raj Image Studio
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Creativity</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#generate" className="text-sm font-medium hover:text-primary transition-colors">
            Generate
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Gallery
          </a>
          <a href="#models" className="text-sm font-medium hover:text-primary transition-colors">
            Models
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="gap-2"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}