"use client";

import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import { Canvas, CanvasProps, ThreeEvent, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,   // client snapshot: always true once hydrated
    () => false   // server snapshot: always false during SSR
  );
}

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg
      className="fixed overflow-hidden"
      width="0"
      height="0"
      style={{ pointerEvents: 'none', zIndex: 9999 }}
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl vertex shader */ `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl fragment shader */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

const identityEase = (x: number) => x;

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  useEffect(() => {
    return () => {
      dotMaterial.dispose();
    };
  }, [dotMaterial]);

  useEffect(() => {
    (dotMaterial.uniforms.pixelColor.value as THREE.Color).set(pixelColor);
  }, [dotMaterial, pixelColor]);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || identityEase
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  useEffect(() => {
    if (!trail) return;
    const t = trail as unknown as Record<string, unknown>;
    // eslint-disable-next-line react-hooks/immutability
    t.minFilter = THREE.NearestFilter;
    t.magFilter = THREE.NearestFilter;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
  }, [trail]);

  // Track mouse globally instead of via onPointerMove,
  // since the canvas has pointer-events: none so clicks pass through to the page.
  const scale = Math.max(viewport.width, viewport.height) / 2;

  useEffect(() => {
    const handleWindowMove = (e: MouseEvent) => {
      const sx = e.clientX / window.innerWidth;
      const sy = e.clientY / window.innerHeight;

      const u = 0.5 + (sx - 0.5) * (viewport.width / (2 * scale));
      const v = 0.5 + (0.5 - sy) * (viewport.height / (2 * scale));

      const uv = new THREE.Vector2(u, v);
      onMove({
        uv,
        intersections: [{ uv }]
      } as unknown as ThreeEvent<PointerEvent>);
    };

    window.addEventListener('mousemove', handleWindowMove);
    return () => window.removeEventListener('mousemove', handleWindowMove);
  }, [onMove, viewport.width, viewport.height, scale]);

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = identityEase,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  const mounted = useMounted();

  const content = (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`fixed inset-0 ${className}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none',
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {})
        }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}

// import PixelTrail from './PixelTrail';

// <div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
//   <PixelTrail
//     gridSize={50}
//     trailSize={0.05}
//     maxAge={300}
//     interpolate={1.5}
//     color="#3aeda6"
//     gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
//     gooeyEnabled
//     gooStrength={2}
// />
// </div>