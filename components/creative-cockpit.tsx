'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Download, Share2, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PromptInput } from './image-generation/prompt-input';
import { ModelSelector } from './image-generation/model-selector';
import { StyleSelector } from './image-generation/style-selector';
import { AdvancedSettings } from './image-generation/advanced-settings';
import { ImageGallery } from './image-generation/image-gallery';
import { GenerationProgress } from './image-generation/generation-progress';
import { useImageGeneration } from '@/hooks/use-image-generation';
import { GenerationParams } from '@/lib/types';
import { IMAGE_MODELS, ART_STYLES, ASPECT_RATIOS, MAX_IMAGES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

export function CreativeCockpit() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(IMAGE_MODELS[0].id);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [seed, setSeed] = useState<number | undefined>();
  const [enhance, setEnhance] = useState(false);
  const [nologo, setNologo] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const { generateImages, generatedImages, status } = useImageGeneration();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Please enter a prompt',
        description: 'Describe what you want to create',
        variant: 'destructive',
      });
      return;
    }

    const style = selectedStyle ? ART_STYLES.find(s => s.id === selectedStyle)?.prompt : undefined;
    
    const params: GenerationParams = {
      prompt: prompt.trim(),
      model: selectedModel,
      width,
      height,
      seed,
      enhance,
      nologo,
      style,
    };

    await generateImages(params, imageCount);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Creative Cockpit
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your ideas into stunning AI-generated artwork. Collaborate with artificial intelligence to bring your creative vision to life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <Card className="p-6 glass-effect">
            <div className="space-y-6">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onKeyPress={handleKeyPress}
                placeholder="Describe your creative vision... (Ctrl+Enter to generate)"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <ModelSelector
                  value={selectedModel}
                  onChange={setSelectedModel}
                  models={IMAGE_MODELS}
                />
                
                <StyleSelector
                  value={selectedStyle}
                  onChange={setSelectedStyle}
                  styles={ART_STYLES}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Images to generate</label>
                <select
                  value={imageCount}
                  onChange={(e) => setImageCount(Number(e.target.value))}
                  className="px-3 py-1 rounded-md border bg-background"
                >
                  {Array.from({ length: MAX_IMAGES }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={status.isGenerating || !prompt.trim()}
                className="w-full creative-gradient text-white font-semibold py-6"
                size="lg"
              >
                {status.isGenerating ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Creating Magic...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Images
                  </div>
                )}
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Advanced Settings
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  Ctrl+Enter to generate
                </div>
              </div>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AdvancedSettings
                      width={width}
                      height={height}
                      onDimensionsChange={(w, h) => {
                        setWidth(w);
                        setHeight(h);
                      }}
                      seed={seed}
                      onSeedChange={setSeed}
                      enhance={enhance}
                      onEnhanceChange={setEnhance}
                      nologo={nologo}
                      onNologoChange={setNologo}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Results Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          {status.isGenerating && <GenerationProgress progress={status.progress} />}
          
          <ImageGallery
            images={generatedImages}
            isGenerating={status.isGenerating}
          />
        </motion.div>
      </div>
    </div>
  );
}