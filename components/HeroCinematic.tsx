"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import * as THREE from "three";
import { GlassesModel } from "@/components/GlassesModel";

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function pinProgress(progress: number) {
  return clamp((progress - 0.25) / 0.5);
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function HeroScene({
  pinProgressValue,
}: {
  pinProgressValue: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      mouseTarget.current.x = event.clientX / window.innerWidth - 0.5;
      mouseTarget.current.y = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const t = pinProgressValue.get();
    const rotatePhase = clamp(t / 0.6);
    const facePhase = smooth(clamp((t - 0.6) / 0.25));
    const zoomPhase = smooth(clamp((t - 0.85) / 0.15));
    const mouseFade = 1 - smooth(clamp((t - 0.75) / 0.15));
    const profileRotation = -0.75;
    const rotationSweep = Math.PI * 3;
    const spunRotation = profileRotation + rotatePhase * rotationSweep;
    const scrollRotationY = THREE.MathUtils.lerp(spunRotation, Math.PI, facePhase);
    const scrollRotationX = Math.sin(t * Math.PI * 2) * 0.05;
    const idleSway = Math.sin(state.clock.elapsedTime * 0.45) * 0.025;

    mouseCurrent.current.x = THREE.MathUtils.damp(
      mouseCurrent.current.x,
      mouseTarget.current.x,
      7,
      delta,
    );
    mouseCurrent.current.y = THREE.MathUtils.damp(
      mouseCurrent.current.y,
      mouseTarget.current.y,
      7,
      delta,
    );

    const mouseRotationX = -mouseCurrent.current.y * 0.2 * mouseFade;
    const mouseRotationY = mouseCurrent.current.x * 0.2 * mouseFade;

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      scrollRotationX + mouseRotationX + idleSway * mouseFade,
      5,
      delta,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      scrollRotationY + mouseRotationY,
      5,
      delta,
    );
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, 0, 5, delta);
    group.position.z = THREE.MathUtils.damp(
      group.position.z,
      THREE.MathUtils.lerp(0, 1.45, zoomPhase),
      4,
      delta,
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      THREE.MathUtils.lerp(0, -0.05, zoomPhase),
      4,
      delta,
    );

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      THREE.MathUtils.lerp(4.5, 3, zoomPhase),
      4,
      delta,
    );
    state.camera.updateProjectionMatrix();

    const scale = THREE.MathUtils.damp(
      group.scale.x,
      THREE.MathUtils.lerp(1.35, 5.2, zoomPhase),
      4,
      delta,
    );
    group.scale.setScalar(scale);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-4, 3, 5]} intensity={1.05} />
      <directionalLight position={[4, 3, 5]} intensity={1.05} />
      <Suspense fallback={null}>
        <group ref={groupRef}>
          <GlassesModel reflectionProgress={pinProgressValue} />
        </group>
        <Environment preset="studio" environmentIntensity={0.9} />
      </Suspense>
      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.28}
        scale={8}
        blur={2.8}
        far={4}
      />
    </>
  );
}

function Caption({
  align,
  eyebrow,
  title,
  muted,
  opacity,
  y,
}: {
  align: "left" | "right" | "bottom";
  eyebrow: string;
  title: string;
  muted?: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const position =
    align === "left"
      ? "inset-x-6 top-[12%] md:inset-x-auto md:left-12 md:right-auto lg:left-20 md:top-1/2 md:-translate-y-1/2"
      : align === "right"
        ? "inset-x-6 top-[12%] md:inset-x-auto md:left-auto md:right-12 lg:right-20 md:top-1/2 md:-translate-y-1/2"
        : "inset-x-6 top-[12%] md:top-auto md:bottom-16 md:left-1/2 md:right-auto md:w-[min(720px,calc(100vw-3rem))] md:-translate-x-1/2";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute z-30 max-w-xl ${position}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
        <div className="h-px max-w-[180px] flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
      <h1 className="font-serif text-5xl italic leading-[0.9] tracking-[-0.05em] text-neutral-950 md:text-7xl lg:text-8xl">
        {title}
        {muted ? <span className="block text-neutral-950/45">{muted}</span> : null}
      </h1>
    </motion.div>
  );
}

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const t = useTransform(scrollYProgress, pinProgress);

  const firstOpacity = useTransform(t, [0, 0.3, 0.35], [1, 1, 0]);
  const firstY = useTransform(t, [0, 0.35], [0, -36]);
  const secondOpacity = useTransform(t, [0.3, 0.38, 0.56, 0.62], [0, 1, 1, 0]);
  const secondY = useTransform(t, [0.3, 0.62], [40, -28]);
  const thirdOpacity = useTransform(t, [0.56, 0.65, 0.96, 1], [0, 1, 1, 0]);
  const thirdY = useTransform(t, [0.56, 1], [36, -24]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#f5f5f5]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f5f5f5]">
        <Canvas
          gl={{ alpha: true, toneMapping: THREE.NoToneMapping }}
          style={{ background: "transparent" }}
          camera={{ position: [0, 0, 4.5], fov: 38 }}
          onCreated={({ gl, scene }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMappingExposure = 1;
            scene.environmentIntensity = 0.9;
          }}
          className="absolute inset-0"
        >
          <HeroScene pinProgressValue={t} />
        </Canvas>

        <Caption
          align="left"
          eyebrow="OPTIKA KOSOVIĆ · NOVI BANOVCI"
          title="Vaš pogled."
          muted="Naša briga."
          opacity={firstOpacity}
          y={firstY}
        />
        <Caption
          align="right"
          eyebrow="01 · Zanat"
          title="Svaki ram."
          muted="Svaka dioptrija."
          opacity={secondOpacity}
          y={secondY}
        />
        <Caption
          align="bottom"
          eyebrow="02 · Trenutak"
          title="Probajte ih."
          opacity={thirdOpacity}
          y={thirdY}
        />

        <div className="absolute bottom-8 left-6 z-30 md:left-12 lg:left-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-950/50">
            SKROLUJTE
          </span>
        </div>
      </div>
    </section>
  );
}
