'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particleRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    time.current += 0.005;
    const t = time.current;

    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.3;
      sphereRef.current.rotation.y = t * 0.5;
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.x = -t * 0.4;
      innerSphereRef.current.rotation.y = -t * 0.3;
      const scale = 1 + Math.sin(t * 2) * 0.05;
      innerSphereRef.current.scale.setScalar(scale);
    }

    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.08;
      glowRef.current.scale.setScalar(scale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t) * 0.05;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6;
      ring3Ref.current.rotation.z = -t * 0.2;
    }

    if (particleRef.current) {
      particleRef.current.rotation.y = t * 0.05;
      particleRef.current.rotation.x = t * 0.03;
    }
  });

  return (
    <>
     

     


      {/* Particle field */}
      <points ref={particleRef} geometry={particleGeo}>
        <pointsMaterial
          color="#B56DFF"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.6}
        />
      </points>

      {/* Lights */}
      <pointLight color="#7A3CFF" intensity={4} distance={10} position={[2, 2, 2]} />
      <pointLight color="#B56DFF" intensity={3} distance={8} position={[-2, -2, -2]} />
      <ambientLight intensity={0.2} />
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
