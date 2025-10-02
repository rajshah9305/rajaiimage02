import { useState, useEffect } from 'react';
import { ImageModel } from '@/lib/types';
import { IMAGE_MODELS } from '@/lib/constants';

export function useModels() {
  const [models, setModels] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch models
    const fetchModels = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch('/api/models');
        // const data = await response.json();
        
        // For now, use the predefined models
        setTimeout(() => {
          setModels(IMAGE_MODELS);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load models');
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return {
    models,
    loading,
    error,
  };
}