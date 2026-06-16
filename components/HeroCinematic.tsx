"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { motion, type MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { GlassesModel } from "@/components/GlassesModel";
import { useHeroPinProgress } from "@/components/hooks/useHeroPinProgress";

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

const HERO_SHADOW_OPACITY = 0.28;
const DRAG_SENSITIVITY = 0.005;
const DRAG_LERP = 0.05;
const DRAG_RETURN_LERP = 0.06;
const DRAG_RETURN_EPSILON = 0.002;
const DRAG_THRESHOLD = 6;

function disableCanvasEvents() {
  return {
    priority: 0,
    enabled: false,
    connect: () => {},
    disconnect: () => {},
  };
}

function FadingHeroShadow({ progressRef }: { progressRef: React.RefObject<number> }) {
  const shadowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const zoomFade = 1 - smooth(clamp((progressRef.current - 0.8) / 0.14));
    const opacity = HERO_SHADOW_OPACITY * zoomFade;

    shadowRef.current?.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      const materials = Array.isArray(object.material) ? object.material : [object.material];

      materials.forEach((material) => {
        material.transparent = true;
        material.opacity = opacity;
      });
    });
  });

  return (
    <group ref={shadowRef}>
      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={HERO_SHADOW_OPACITY}
        scale={8}
        blur={2.8}
        far={4}
      />
    </group>
  );
}

function HeroScene({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const dragTarget = useRef({ x: 0, y: 0 });
  const dragCurrent = useRef({ x: 0, y: 0 });
  const dragReturning = useRef(false);
  const dragState = useRef({
    pending: false,
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const startDragReturn = () => {
      dragReturning.current = true;
      dragTarget.current.x = 0;
      dragTarget.current.y = 0;
    };

    const resetDrag = () => {
      const { pointerId } = dragState.current;

      dragState.current.pending = false;
      dragState.current.active = false;
      dragState.current.pointerId = -1;
      canvas.classList.remove("is-dragging");
      canvas.style.removeProperty("touch-action");

      if (pointerId !== -1 && canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || event.pointerType !== "mouse") {
        return;
      }

      dragState.current.pending = true;
      dragState.current.active = false;
      dragState.current.pointerId = event.pointerId;
      dragState.current.startX = event.clientX;
      dragState.current.startY = event.clientY;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;
      dragTarget.current.x = dragCurrent.current.x;
      dragTarget.current.y = dragCurrent.current.y;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== dragState.current.pointerId) {
        return;
      }

      if (!dragState.current.pending && !dragState.current.active) {
        return;
      }

      if (dragState.current.pending && !dragState.current.active) {
        const deltaX = event.clientX - dragState.current.startX;
        const deltaY = event.clientY - dragState.current.startY;

        if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
          return;
        }

        dragState.current.pending = false;
        dragState.current.active = true;
        dragReturning.current = false;
        canvas.setPointerCapture(event.pointerId);
        canvas.classList.add("is-dragging");
        canvas.style.touchAction = "none";
      }

      if (!dragState.current.active) {
        return;
      }

      event.preventDefault();

      const moveDeltaX = event.clientX - dragState.current.lastX;
      const moveDeltaY = event.clientY - dragState.current.lastY;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;

      dragTarget.current.y += moveDeltaX * DRAG_SENSITIVITY;
      dragTarget.current.x += moveDeltaY * DRAG_SENSITIVITY;
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (
        dragState.current.pointerId !== -1 &&
        event.pointerId !== dragState.current.pointerId
      ) {
        return;
      }

      const wasDragging = dragState.current.active;
      resetDrag();

      if (wasDragging) {
        startDragReturn();
      }
    };

    const onLostPointerCapture = () => {
      if (dragState.current.active) {
        startDragReturn();
      }

      resetDrag();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerEnd);
    canvas.addEventListener("pointercancel", onPointerEnd);
    canvas.addEventListener("lostpointercapture", onLostPointerCapture);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerEnd);
      canvas.removeEventListener("pointercancel", onPointerEnd);
      canvas.removeEventListener("lostpointercapture", onLostPointerCapture);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      resetDrag();
    };
  }, [gl]);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (dragState.current.pending || dragState.current.active) {
        return;
      }

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

    const t = progressRef.current;
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

    if (dragState.current.active) {
      dragCurrent.current.x = THREE.MathUtils.lerp(
        dragCurrent.current.x,
        dragTarget.current.x,
        DRAG_LERP,
      );
      dragCurrent.current.y = THREE.MathUtils.lerp(
        dragCurrent.current.y,
        dragTarget.current.y,
        DRAG_LERP,
      );
    } else if (dragReturning.current) {
      dragCurrent.current.x = THREE.MathUtils.lerp(dragCurrent.current.x, 0, DRAG_RETURN_LERP);
      dragCurrent.current.y = THREE.MathUtils.lerp(dragCurrent.current.y, 0, DRAG_RETURN_LERP);

      if (Math.hypot(dragCurrent.current.x, dragCurrent.current.y) < DRAG_RETURN_EPSILON) {
        dragCurrent.current.x = 0;
        dragCurrent.current.y = 0;
        dragReturning.current = false;
      }
    }

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      scrollRotationX + mouseRotationX + idleSway * mouseFade + dragCurrent.current.x,
      5,
      delta,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      scrollRotationY + mouseRotationY + dragCurrent.current.y,
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
          <GlassesModel />
        </group>
        <Environment preset="studio" environmentIntensity={0.9} />
      </Suspense>
      <FadingHeroShadow progressRef={progressRef} />
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
  positionClass,
  titleClassName,
}: {
  align: "left" | "right" | "bottom";
  eyebrow: string;
  title: string;
  muted?: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  positionClass?: string;
  titleClassName?: string;
}) {
  const position =
    positionClass ??
    (align === "left"
      ? "inset-x-6 top-[12%] md:inset-x-auto md:left-12 md:right-auto lg:left-20 md:top-1/2 md:-translate-y-1/2"
      : align === "right"
        ? "inset-x-6 top-[12%] md:inset-x-auto md:left-auto md:right-12 lg:right-20 md:top-1/2 md:-translate-y-1/2"
        : "inset-x-6 bottom-24 md:top-auto md:bottom-16 md:left-1/2 md:right-auto md:w-[min(720px,calc(100vw-3rem))] md:-translate-x-1/2");

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute z-40 max-w-xl ${position}`}
    >
      <div className={`mb-3 flex items-center gap-3 md:mb-4 ${align === "bottom" ? "justify-center" : ""}`}>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold md:text-[10px]">
          {eyebrow}
        </span>
        <div className="h-px max-w-[180px] flex-1 bg-gradient-to-r from-[#c9a84c]/60 to-transparent" />
      </div>
      <h1
        className={
          titleClassName ??
          `font-serif text-4xl italic leading-[0.9] tracking-[-0.05em] text-neutral-950 sm:text-5xl md:text-7xl lg:text-8xl ${
            align === "bottom" ? "text-center" : ""
          }`
        }
      >
        {title}
        {muted ? <span className="block text-neutral-950/45">{muted}</span> : null}
      </h1>
    </motion.div>
  );
}

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progressRef, progress: t } = useHeroPinProgress(sectionRef);

  const firstOpacity = useTransform(t, [0, 0.32, 0.55], [1, 1, 0]);
  const firstY = useTransform(t, [0, 0.55], [0, -30]);
  const secondOpacity = useTransform(t, [0.28, 0.4, 0.72, 0.86], [0, 1, 1, 0]);
  const secondY = useTransform(t, [0.28, 0.86], [36, -24]);
  const thirdOpacity = useTransform(t, [0.56, 0.65, 1], [0, 1, 1]);
  const thirdY = useTransform(t, [0.56, 1], [36, -24]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(232,224,240,0.4),transparent_400px)]" />
        <Canvas
          events={disableCanvasEvents}
          gl={{ alpha: true, toneMapping: THREE.NoToneMapping }}
          style={{ background: "transparent" }}
          camera={{ position: [0, 0, 4.5], fov: 38 }}
          onCreated={({ gl, scene }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMappingExposure = 1;
            scene.environmentIntensity = 0.9;
          }}
          className="hero-glasses-canvas absolute left-1/2 top-[48%] z-10 h-[60vw] max-h-[320px] w-[60vw] max-w-[60vw] -translate-x-1/2 md:inset-0 md:h-auto md:max-h-none md:w-auto md:max-w-none md:translate-x-0"
        >
          <HeroScene progressRef={progressRef} />
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
          align="left"
          eyebrow="01 · Zanat"
          title="Svaki ram."
          muted="Svaka dioptrija."
          opacity={secondOpacity}
          y={secondY}
          positionClass="inset-x-6 top-[12%] md:inset-x-auto md:left-auto md:right-8 lg:right-16 md:top-[9%] lg:top-[10%] md:max-w-[420px] lg:max-w-[520px] xl:max-w-[620px] md:translate-y-0"
          titleClassName="font-serif text-4xl italic leading-[0.9] tracking-[-0.05em] text-neutral-950 sm:text-5xl md:text-right md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
        />
        <Caption
          align="bottom"
          eyebrow="02 · Trenutak"
          title="Probajte ih."
          opacity={thirdOpacity}
          y={thirdY}
        />

        <div className="absolute bottom-8 left-6 z-30 md:left-12 lg:left-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            SKROLUJTE
          </span>
        </div>
      </div>
    </section>
  );
}
