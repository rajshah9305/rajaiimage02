import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { PollinationsAPI } from '@/lib/api';
import { GenerationParams, GeneratedImage, GenerationStatus } from '@/lib/types';

export function useImageGeneration() {
  const [status, setStatus] = useState<GenerationStatus>({
    isGenerating: false,
    progress: 0,
  });
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const { toast } = useToast();

  const generateImages = useCallback(async (params: GenerationParams, count: number = 1) => {
    setStatus({ isGenerating: true, progress: 0 });

    let progressInterval: NodeJS.Timeout;   // ← OUTSIDE try/catch

    try {
      const startTime = Date.now();

      progressInterval = setInterval(() => {
        setStatus(prev => ({ ...prev, progress: Math.min(prev.progress + 10, 90) }));
      }, 200);

      const imageUrls = await PollinationsAPI.generateMultipleImages(params, count);

      clearInterval(progressInterval);
      setStatus({ isGenerating: false, progress: 100 });

      const newImages: GeneratedImage[] = imageUrls.map(url => ({
        url,
        prompt: params.prompt,
        model: params.model,
        timestamp: Date.now(),
        metadata: params,
      }));

      setGeneratedImages(prev => [...newImages, ...prev]);

      const generationTime = ((Date.now() - startTime) / 1000).toFixed(1);
      toast({ title: 'Images Generated Successfully! 🎨', description: `${count} image${count > 1 ? 's' : ''} generated in ${generationTime}s` });
      return newImages;
    } catch (error) {
      clearInterval(progressInterval);        // ← now valid
      setStatus({ isGenerating: false, progress: 0, error: error instanceof Error ? error.message : 'Generation failed' });
      toast({ title: 'Generation Failed', description: error instanceof Error ? error.message : 'Please try again', variant: 'destructive' });
      throw error;
    }
  }, [toast]);

  const clearImages = useCallback(() => {
    setGeneratedImages([]);
    setStatus({ isGenerating: false, progress: 0 });
  }, []);

  return { generateImages, clearImages, generatedImages, status };
}
