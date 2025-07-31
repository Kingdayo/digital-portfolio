'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, TorusKnot, Environment, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo, FC } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useThemeColors } from '@/hooks/use-theme-colors';

// GLSL code for Perlin noise, to be injected into the shader.
const glsl = (x: TemplateStringsArray) => x[0];
const perlinNoise = glsl`
  // Classic Perlin 3D Noise by Stefan Gustavson
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
`;

function GlassObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  useFrame((state, delta) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.z -= delta * 0.025;
    }
    if (materialRef.current && (materialRef.current.userData.shader as THREE.Shader)) {
      materialRef.current.userData.shader.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  const onBeforeCompile = (shader: THREE.Shader) => {
    shader.uniforms.u_time = { value: 0 };
    shader.uniforms.u_morph_intensity = { value: 0.15 };
    materialRef.current.userData.shader = shader;

    shader.vertexShader = `
      uniform float u_time;
      uniform float u_morph_intensity;
      ${perlinNoise}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        #include <begin_vertex>
        float noise = cnoise(position * 2.0 + u_time * 0.2) * u_morph_intensity;
        transformed += normalize(normal) * noise;
      `
    );
  };

  return (
    <TorusKnot ref={meshRef} args={[2.5, 0.7, 256, 32]} scale={0.5}>
      <meshPhysicalMaterial
        ref={materialRef}
        transmission={1.0}
        roughness={0.05}
        thickness={1.5}
        ior={1.33}
        envMapIntensity={1.5}
        onBeforeCompile={onBeforeCompile}
      />
    </TorusKnot>
  );
}

const Particles: FC<{ count?: number; color: THREE.Color }> = ({ count = 5000, color }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={color} sizeAttenuation />
    </points>
  );
}

const ProgressRing: FC<{ progress: number; color: THREE.Color }> = ({ progress, color }) => {
  const ref = useRef<THREE.Mesh>(null!);
  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position-y={-2.5}>
      <ringGeometry args={[3.5, 3.6, 128, 1, 0, progress * Math.PI * 2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface SceneProps {
  progress: number;
  colors: {
    primary: THREE.Color;
    accent: THREE.Color;
    background: THREE.Color;
  };
}

const Scene: FC<SceneProps> = ({ progress, colors }) => {
  return (
    <>
      <color attach="background" args={[colors.background]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 5, 10]} intensity={2} color={colors.primary} />
      <pointLight position={[-10, 5, -10]} intensity={1.5} color={colors.accent} />
      <Environment preset="night" />

      <Suspense fallback={null}>
        <GlassObject />
        <Particles color={colors.accent} />
        <ProgressRing progress={progress} color={colors.primary} />

        {/* Reflective Floor */}
        <mesh position-y={-3.5} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 50]}
            resolution={1024}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.8}
          />
        </mesh>
      </Suspense>
    </>
  );
};


// Using a simple functional component for the loader
const LoaderComponent = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-foreground">Loading...</div>
    </div>
  );
};

export const Loader: FC<{ progress: number }> = ({ progress }) => {
  const colors = useThemeColors();
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[100]"
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={<LoaderComponent />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 12], fov: 35 }}
          gl={{ preserveDrawingBuffer: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ pointerEvents: 'auto' }}
        >
          <Scene progress={progress} colors={colors} />
          <Preload all />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
              height={1024}
            />
            <DepthOfField
              focusDistance={0.0}
              focalLength={0.025}
              bokehScale={4}
              height={480}
            />
            <ToneMapping
              blendFunction={BlendFunction.ACES_FILMIC}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};
