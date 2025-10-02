# Raj Image Studio 🎨

A professional AI-powered image generation web application powered by Pollinations.ai, designed to make users feel like artists collaborating with an AI.

## Features ✨

- **Multiple AI Models**: FLUX, Turbo, NanoBanana, SeeDream
- **Artistic Styles**: Realistic, Anime, Digital Art, Oil Painting, Watercolor, Cyberpunk, Fantasy, Minimalist
- **Advanced Prompting**: Smart prompt enhancement and suggestions
- **Real-time Generation**: Live progress tracking and fast inference
- **Responsive Design**: Optimized for all devices
- **Enterprise Ready**: Generate up to 4 images simultaneously
- **Creative Cockpit**: Intuitive, futuristic interface

## Tech Stack 🚀

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Custom components
- **State Management**: Zustand, React Hook Form
- **API**: Pollinations.ai
- **Deployment**: Vercel-ready

## Quick Start 🚀

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/raj-image-studio.git 
cd raj-image-studio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Usage 🎨

1. **Enter a Prompt**: Describe your creative vision
2. **Choose Model**: Select from available AI models
3. **Pick Style**: Apply artistic styles (optional)
4. **Advanced Settings**: Customize dimensions, seed, etc.
5. **Generate**: Click "Generate Images" or press Ctrl+Enter
6. **Download/Share**: Save or share your creations

## API Integration 🔌

The application uses Pollinations.ai API for image generation:

```typescript
// Generate single image
const imageUrl = await PollinationsAPI.generateImage({
  prompt: "A beautiful sunset over mountains",
  model: "flux",
  width: 1024,
  height: 1024
});

// Generate multiple images
const imageUrls = await PollinationsAPI.generateMultipleImages(params, 4);
```

## Configuration ⚙️

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

- **Models**: Edit `lib/constants.ts` to add/remove models
- **Styles**: Customize artistic styles in `lib/constants.ts`
- **Theme**: Modify `app/globals.css` for theming
- **Components**: Extend components in `components/` directory

## Deployment 🚀

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Deploy with default settings

### Other Platforms

```bash
npm run build
npm start
```

## Performance Optimizations 🚀

- Image lazy loading
- Progressive enhancement
- Optimized re-renders with React.memo
- Efficient state management
- CSS-in-JS optimization

## Contributing 🤝

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

MIT License - see [LICENSE](LICENSE) file for details.

## Support 💬

- Create an issue for bugs
- Start a discussion for features
- Check documentation in `/docs`

## Acknowledgments 🙏

- Pollinations.ai for the amazing API
- Next.js team for the framework
- Tailwind CSS for styling
- Radix UI for accessible components

---

**Made with ❤️ by Raj Image Studio Team**