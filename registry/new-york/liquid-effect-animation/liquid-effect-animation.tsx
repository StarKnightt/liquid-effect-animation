"use client"

import { useEffect, useRef, useCallback } from "react"

interface LiquidEffectAnimationProps {
  text?: string[]
  subText?: string
  tagline?: string
  backgroundColor?: string
  textColor?: string
}

export function LiquidEffectAnimation({
  text,
  subText,
  tagline,
  backgroundColor = "#fafafa",
  textColor = "#1d1d1f",
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateTextImage = useCallback(() => {
    const dpr = window.devicePixelRatio || 1
    const offscreen = document.createElement("canvas")
    const w = window.innerWidth
    const h = window.innerHeight
    offscreen.width = w * dpr
    offscreen.height = h * dpr
    const ctx = offscreen.getContext("2d")
    if (!ctx) return null

    ctx.scale(dpr, dpr)

    // Background — clean white like Apple
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, w, h)

    // Soft ambient light — very subtle, gives liquid something to reflect
    ctx.globalCompositeOperation = "multiply"

    // Top-center cool wash
    const glow1 = ctx.createRadialGradient(w * 0.5, h * 0.1, 0, w * 0.5, h * 0.1, w * 0.6)
    glow1.addColorStop(0, "rgba(220, 225, 240, 0.6)")
    glow1.addColorStop(1, "rgba(250, 250, 250, 1)")
    ctx.fillStyle = glow1
    ctx.fillRect(0, 0, w, h)

    // Bottom subtle warm tint
    const glow2 = ctx.createRadialGradient(w * 0.5, h * 0.95, 0, w * 0.5, h * 0.95, w * 0.5)
    glow2.addColorStop(0, "rgba(240, 230, 220, 0.4)")
    glow2.addColorStop(1, "rgba(250, 250, 250, 1)")
    ctx.fillStyle = glow2
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = "source-over"

    // Sub text — Apple-style tiny uppercase label
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.35
    const subFontSize = Math.max(11, w * 0.009)
    ctx.font = `600 ${subFontSize}px -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.letterSpacing = "0.25em"
    if (subText) {
      ctx.fillText(subText.toUpperCase(), w / 2, h / 2 - w * 0.095)
    }

    // Main heading — SF Pro style, heavy weight, tight
    ctx.globalAlpha = 1
    ctx.letterSpacing = "-0.04em"
    const fontSize = Math.min(w * 0.13, h * 0.19)
    ctx.font = `700 ${fontSize}px -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const lineHeight = fontSize * 1.08
    const totalHeight = (text?.length || 0) * lineHeight
    const startY = h / 2 - totalHeight / 2 + lineHeight / 2

    text?.forEach((line, i) => {
      ctx.fillStyle = textColor
      ctx.globalAlpha = 1
      ctx.fillText(line, w / 2, startY + i * lineHeight)
    })

    // Thin divider — barely there
    ctx.globalAlpha = 0.12
    ctx.fillStyle = textColor
    const dividerY = startY + (text?.length || 0) * lineHeight + w * 0.018
    ctx.fillRect(w / 2 - 30, dividerY, 60, 0.5)

    // Tagline — light, airy
    if (tagline) {
      ctx.globalAlpha = 0.3
      ctx.letterSpacing = "0.02em"
      const tagFontSize = Math.max(11, w * 0.01)
      ctx.font = `400 ${tagFontSize}px -apple-system, "SF Pro Text", "Helvetica Neue", Arial, sans-serif`
      ctx.fillText(tagline, w / 2, dividerY + w * 0.025)
    }

    return offscreen.toDataURL("image/png")
  }, [text, subText, tagline, backgroundColor, textColor])

  useEffect(() => {
    if (!canvasRef.current) return

    const dataUrl = generateTextImage()
    if (!dataUrl) return

    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${dataUrl}');
        app.liquidPlane.material.metalness = 0.35;
        app.liquidPlane.material.roughness = 0.45;
        app.liquidPlane.uniforms.displacementScale.value = 2;
        app.setRain(false);
        window.__liquidApp = app;
      }
    `
    document.body.appendChild(script)

    return () => {
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [generateTextImage])

  return (
    <div className="fixed inset-0 m-0 w-full h-full touch-none overflow-hidden">
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="fixed inset-0 w-full h-full"
      />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApp?: any
  }
}
