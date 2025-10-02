'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, ExternalLink, RefreshCw, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GeneratedImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ImageGalleryProps {
  images: GeneratedImage[];
  isGenerating: boolean;
}

export function ImageGallery({ images, isGenerating }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const downloadImage = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `raj-studio-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Image Downloaded',
        description: 'Your AI artwork has been saved',
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const shareImage = async (image: GeneratedImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Artwork',
          text: `Check out this AI generated image: ${image.prompt}`,
          url: image.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(image.url);
      toast({
        title: 'Link Copied',
        description: 'Image URL copied to clipboard',
      });
    }
  };

  if (images.length === 0 && !isGenerating) {
    return (
      <Card className="p-12 text-center glass-effect">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
            <Grid className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Your Creative Canvas Awaits</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start by describing your vision in the prompt box. Your generated images will appear here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Controls */}
      {images.length > 0 && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Generated Artwork ({images.length})
          </h3>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
          : 'space-y-4'
      }>
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => (
            <motion.div
              key={image.timestamp}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              layout
            >
              <Card className="overflow-hidden group relative glass-effect">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadImage(image)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => shareImage(image)}
                      className="gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedImage(image)}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                  </div>
                </div>
                
                {viewMode === 'list' && (
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {image.model}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(image.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white mb-4">{selectedImage.prompt}</p>
                <div className="flex gap-2">
                  <Button onClick={() => downloadImage(selectedImage)} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedImage(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}