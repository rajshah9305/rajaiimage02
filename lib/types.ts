export interface ImageModel {
  id: string;
  name: string;
  description: string;
  tier: 'anonymous' | 'seed' | 'flower';
  features: string[];
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface GenerationParams {
  prompt: string;
  model: string;
  width: number;
  height: number;
  seed?: number;
  nologo?: boolean;
  private?: boolean;
  enhance?: boolean;
  style?: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  model: string;
  timestamp: number;
  metadata?: GenerationParams;
}

export interface GenerationStatus {
  isGenerating: boolean;
  progress: number;
  error?: string;
}