import { GenerationParams, GeneratedImage } from './types';

const POLLINATIONS_API = 'https://image.pollinations.ai/prompt';

export class PollinationsAPI {
  static async generateImage(params: GenerationParams): Promise<string> {
    const { prompt, model, width, height, seed, nologo, private: isPrivate, enhance, style } = params;
    
    let enhancedPrompt = prompt;
    if (style) {
      enhancedPrompt = `${prompt}, ${style}`;
    }
    
    if (enhance) {
      enhancedPrompt = `professional, high quality, detailed, ${enhancedPrompt}`;
    }
    
    const url = new URL(`${POLLINATIONS_API}/${encodeURIComponent(enhancedPrompt)}`);
    
    const searchParams = new URLSearchParams({
      model,
      width: width.toString(),
      height: height.toString(),
      ...(seed && { seed: seed.toString() }),
      ...(nologo && { nologo: 'true' }),
      ...(isPrivate && { private: 'true' }),
    });
    
    url.search = searchParams.toString();
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }
    
    return url.toString();
  }
  
  static async generateMultipleImages(params: GenerationParams, count: number): Promise<string[]> {
    const promises = Array.from({ length: count }, (_, i) => 
      this.generateImage({
        ...params,
        seed: params.seed ? params.seed + i : undefined,
      })
    );
    
    return Promise.all(promises);
  }
}