# Liquid Effect Animation

An interactive liquid distortion effect component for React. Built on top of the [`threejs-components`](https://github.com/klevron/threejs-components) library by [Kevin Levron](https://codepen.io/soju22), designed for the shadcn/ui ecosystem.

Hover or touch the canvas and watch the text ripple like liquid chrome.

## Preview

Run the project locally and visit `/demo` to see it in action.

## Tech Stack

- **Three.js** — 3D liquid simulation via [threejs-components](https://github.com/klevron/threejs-components)
- **React 19** — Client component with hooks
- **Next.js 16** — App Router
- **Tailwind CSS v4** — Styling
- **TypeScript** — Fully typed props
- **shadcn/ui** — Project structure and conventions

## Installation

### Prerequisites

A React project with the shadcn/ui structure. If you don't have one:

```bash
npx shadcn@latest init
```

### Copy the component

Copy `liquid-effect-animation.tsx` into your project:

```
src/components/ui/liquid-effect-animation.tsx
```

> **Why `/components/ui`?** This is the shadcn convention. All reusable UI primitives live here so they're co-located, easy to find, and consistent with other shadcn components you may add.

No additional npm dependencies are required. The Three.js liquid renderer is loaded from a CDN at runtime.

## Usage

```tsx
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export default function Page() {
  return (
    <LiquidEffectAnimation
      text={["Liquid", "Effect"]}
      subText="Interactive UI Component"
      tagline="Built with Three.js  •  React  •  Tailwind CSS"
      backgroundColor="#fafafa"
      textColor="#1d1d1f"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string[]` | `["Liquid", "Effect"]` | Main heading lines. Each string renders on its own line. |
| `subText` | `string` | `"Interactive UI Component"` | Small uppercase label above the heading. |
| `tagline` | `string` | `"Built with Three.js • React • Tailwind CSS"` | Caption below the heading. |
| `backgroundColor` | `string` | `"#fafafa"` | Canvas background color. |
| `textColor` | `string` | `"#1d1d1f"` | Text color for all type elements. |

## Examples

### Dark mode

```tsx
<LiquidEffectAnimation
  text={["Hello", "World"]}
  subText="Dark Theme"
  tagline="Sleek and minimal"
  backgroundColor="#0a0a0a"
  textColor="#ffffff"
/>
```

### Single line heading

```tsx
<LiquidEffectAnimation
  text={["Portfolio"]}
  subText="John Doe"
  tagline="Design  •  Code  •  Create"
/>
```

### Custom colors

```tsx
<LiquidEffectAnimation
  text={["Launch", "Soon"]}
  subText="Coming 2026"
  tagline=""
  backgroundColor="#0f172a"
  textColor="#e2e8f0"
/>
```

## How It Works

1. Text is rendered onto an offscreen `<canvas>` at the device's native pixel ratio (HiDPI-ready)
2. Soft ambient lighting gradients are painted into the background to give the liquid surface something to reflect
3. The rendered image is passed to `threejs-components/liquid1` which creates a Three.js scene with a liquid plane mesh
4. Mouse/touch interaction displaces the liquid surface in real time, creating the ripple distortion effect

## Customization

### Liquid parameters

You can tweak the liquid behavior by modifying these values inside the component:

```ts
app.liquidPlane.material.metalness = 0.35;  // 0-1, higher = more reflective
app.liquidPlane.material.roughness = 0.45;  // 0-1, lower = sharper reflections
app.liquidPlane.uniforms.displacementScale.value = 2;  // ripple intensity
app.setRain(false);  // set true for auto-ripple rain effect
```

### Using a background image instead of text

Replace the `generateTextImage()` call with a direct image URL:

```ts
app.loadImage('/your-image.jpg');
```

Place the image in your `/public` folder.

## Browser Support

Works in all modern browsers that support WebGL:

- Chrome / Edge 80+
- Firefox 80+
- Safari 15+
- Mobile Safari / Chrome on iOS and Android

## Credits

The liquid distortion effect is powered by [`threejs-components`](https://github.com/klevron/threejs-components), created by [Kevin Levron (@soju22)](https://codepen.io/soju22). The original liquid shader and Three.js implementation are entirely his work. This project wraps it into a React component with text rendering, customizable props, and shadcn/ui integration.

- Original CodePen: [codepen.io/soju22/pen/myVWBGa](https://codepen.io/soju22/pen/myVWBGa)
- Library: [threejs-components on npm](https://www.npmjs.com/package/threejs-components)
- Author: [Kevin Levron on Framer](https://www.framer.com/@kevin-levron/)

## License

MIT
