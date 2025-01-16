"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[-2, 2, -2]} scale={1.5}>
          <torusGeometry args={[0.5, 0.2, 128, 32]} />
          <MeshDistortMaterial
            color="#60A5FA"
            speed={2}
            distort={0.3}
            radius={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[2, -1, -1]} scale={1.2}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial
            color="#3E5879"
            speed={2}
            distort={0.2}
            radius={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, -3]} scale={1.8}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color="#1a2a43"
            speed={3}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Background3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
        <AnimatedShapes />
      </Canvas>
    </div>
  );
}
