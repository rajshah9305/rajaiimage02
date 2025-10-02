import { ArtStyle, ImageModel } from './types';

export const IMAGE_MODELS: ImageModel[] = [
  {
    id: 'flux',
    name: 'FLUX',
    description: 'Advanced AI model for high-quality image generation',
    tier: 'anonymous',
    features: ['High Quality', 'Fast', 'Versatile']
  },
  {
    id: 'turbo',
    name: 'Turbo',
    description: 'Lightning-fast image generation',
    tier: 'anonymous',
    features: ['Ultra Fast', 'Efficient', 'Real-time']
  },
  {
    id: 'nanobanana',
    name: 'NanoBanana',
    description: 'Compact model for quick results',
    tier: 'anonymous',
    features: ['Lightweight', 'Speed', 'Mobile-friendly']
  },
  {
    id: 'seedream',
    name: 'SeeDream',
    description: 'Dream-like artistic generation',
    tier: 'anonymous',
    features: ['Artistic', 'Creative', 'Surreal']
  }
];

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic images',
    prompt: 'photorealistic, high quality, detailed, professional photography',
    icon: '📸'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style',
    prompt: 'anime style, manga, japanese animation, vibrant colors',
    icon: '🎌'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Modern digital artwork',
    prompt: 'digital art, modern, vibrant, computer generated',
    icon: '🎨'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classic oil painting style',
    prompt: 'oil painting, classical art, textured brushstrokes, masterpiece',
    icon: '🖼️'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting',
    prompt: 'watercolor painting, soft edges, artistic, flowing',
    icon: '💧'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic cyberpunk aesthetic',
    prompt: 'cyberpunk, neon lights, futuristic, dystopian, high tech',
    icon: '🤖'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical fantasy world',
    prompt: 'fantasy, magical, ethereal, mystical, enchanted',
    icon: '🧙‍♂️'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean minimalist design',
    prompt: 'minimalist, clean, simple, elegant, modern',
    icon: '⚪'
  }
];

export const ASPECT_RATIOS = [
  { label: 'Square (1:1)', width: 1024, height: 1024 },
  { label: 'Portrait (3:4)', width: 768, height: 1024 },
  { label: 'Landscape (4:3)', width: 1024, height: 768 },
  { label: 'Widescreen (16:9)', width: 1280, height: 720 },
  { label: 'Mobile (9:16)', width: 720, height: 1280 },
];

export const MAX_IMAGES = 4;