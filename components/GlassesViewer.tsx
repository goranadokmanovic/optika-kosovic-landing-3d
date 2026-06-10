"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { GlassesModel } from "@/components/GlassesModel";

export default function GlassesViewer() {
  return (
    <div className="h-full w-full">
      <Canvas
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        camera={{ position: [0, 0, 4], fov: 40 }}
        onCreated={({ gl, scene }) => {
          gl.toneMappingExposure = 0.9;
          scene.environmentIntensity = 0.9;
        }}
      >
        <Suspense fallback={null}>
          <GlassesModel />
          <Environment preset="studio" environmentIntensity={0.9} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
        <ContactShadows
          position={[0, -0.75, 0]}
          opacity={0.45}
          scale={8}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </div>
  );
}
