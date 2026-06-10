"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export const FACE_REFLECTION_INTENSITY = 3.2;
export const LENS_OPACITY = 0.88;
export const LENS_PURPLE_SHEEN = 1;

type GlassesModelProps = ThreeElements["group"] & {
  fit?: boolean;
  reflectionProgress?: MotionValue<number>;
};

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

function isLensMaterial(material: THREE.Material, meshName: string) {
  const name = `${material.name} ${meshName}`.toLowerCase();
  return name.includes("lens");
}

function isNosePadMaterial(material: THREE.Material, meshName: string) {
  const name = `${material.name} ${meshName}`.toLowerCase();
  return (
    name.includes("silicon") ||
    name.includes("silicone") ||
    name.includes("nose") ||
    name.includes("pad")
  );
}

function isGoldMetalMaterial(material: THREE.Material, meshName: string) {
  const name = `${material.name} ${meshName}`.toLowerCase();
  return name.includes("material") || name.includes("object_1");
}

function createFaceReflectionTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const background = context.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, "#f3ecff");
  background.addColorStop(0.45, "#ffffff");
  background.addColorStop(1, "#bfa7dc");

  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const drawFaceReflection = (centerRatio: number, scale: number, alpha: number) => {
    const centerX = canvas.width * centerRatio;
    const centerY = canvas.height * 0.47;
    const headWidth = canvas.width * 0.28 * scale;
    const headHeight = canvas.height * 0.68 * scale;
    const eyeY = centerY - headHeight * 0.08;
    const eyeGap = headWidth * 0.22;
    const eyeWidth = headWidth * 0.16;
    const shoulderY = centerY + headHeight * 0.36;
    const shoulderWidth = canvas.width * 0.52 * scale;

    context.globalAlpha = alpha;

    context.fillStyle = "#eadcf5";
    context.beginPath();
    context.ellipse(centerX, centerY, headWidth * 0.48, headHeight * 0.5, 0, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "#241331";
    context.lineWidth = 9 * scale;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.ellipse(centerX, centerY, headWidth * 0.5, headHeight * 0.52, 0, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX - shoulderWidth * 0.45, canvas.height);
    context.bezierCurveTo(
      centerX - shoulderWidth * 0.36,
      shoulderY,
      centerX - headWidth * 0.18,
      shoulderY - canvas.height * 0.08,
      centerX - headWidth * 0.12,
      shoulderY - canvas.height * 0.13,
    );
    context.moveTo(centerX + headWidth * 0.12, shoulderY - canvas.height * 0.13);
    context.bezierCurveTo(
      centerX + headWidth * 0.18,
      shoulderY - canvas.height * 0.08,
      centerX + shoulderWidth * 0.36,
      shoulderY,
      centerX + shoulderWidth * 0.45,
      canvas.height,
    );
    context.stroke();

    const drawEye = (x: number) => {
      context.beginPath();
      context.ellipse(x, eyeY, eyeWidth, eyeWidth * 0.44, 0, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.arc(x, eyeY, eyeWidth * 0.28, 0, Math.PI * 2);
      context.fillStyle = "#241331";
      context.fill();
    };

    context.lineWidth = 6 * scale;
    drawEye(centerX - eyeGap);
    drawEye(centerX + eyeGap);

    context.beginPath();
    context.moveTo(centerX - eyeGap - eyeWidth * 1.1, eyeY - eyeWidth * 1.1);
    context.quadraticCurveTo(centerX - eyeGap, eyeY - eyeWidth * 1.55, centerX - eyeGap + eyeWidth * 1.1, eyeY - eyeWidth * 1.1);
    context.moveTo(centerX + eyeGap - eyeWidth * 1.1, eyeY - eyeWidth * 1.1);
    context.quadraticCurveTo(centerX + eyeGap, eyeY - eyeWidth * 1.55, centerX + eyeGap + eyeWidth * 1.1, eyeY - eyeWidth * 1.1);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX, eyeY + eyeWidth * 0.5);
    context.quadraticCurveTo(centerX - eyeWidth * 0.4, centerY + headHeight * 0.08, centerX, centerY + headHeight * 0.13);
    context.stroke();

    context.globalAlpha = 1;
  };

  const reflectionPositions = [0.15, 0.38, 0.62, 0.85];

  context.filter = "blur(18px)";
  reflectionPositions.forEach((centerRatio) => drawFaceReflection(centerRatio, 1.12, 0.58));
  context.filter = "blur(1.5px)";
  reflectionPositions.forEach((centerRatio) => drawFaceReflection(centerRatio, 0.95, 0.9));
  context.filter = "none";

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function tuneMaterial(material: THREE.Material, meshName: string) {
  const standardMaterial = material as THREE.MeshStandardMaterial;
  const physicalMaterial = material as THREE.MeshPhysicalMaterial;
  const isLens = isLensMaterial(material, meshName);
  const isNosePad = isNosePadMaterial(material, meshName);

  if (isLens) {
    standardMaterial.color = new THREE.Color("#9fceb6");
    standardMaterial.metalness = 0.05;
    standardMaterial.roughness = 0.15;
    standardMaterial.envMapIntensity = 0.35;
    standardMaterial.opacity = LENS_OPACITY;
    material.depthWrite = true;
    material.depthTest = true;

    if ("transmission" in physicalMaterial) {
      physicalMaterial.transmission = 0;
    }

    if ("sheen" in physicalMaterial) {
      physicalMaterial.sheen = LENS_PURPLE_SHEEN;
      physicalMaterial.sheenColor = new THREE.Color("#7a4bb8");
      physicalMaterial.sheenRoughness = 0.3;
    }

    material.transparent = true;
    material.needsUpdate = true;
    return;
  }

  if (isNosePad) {
    standardMaterial.color?.set("#d8d0c4");
    standardMaterial.envMapIntensity = 0.35;
    material.transparent = false;
    material.depthWrite = true;
    material.depthTest = true;
    standardMaterial.opacity = 1;

    if ("transmission" in physicalMaterial) {
      physicalMaterial.transmission = 0;
    }

    material.needsUpdate = true;
    return;
  }

  if (isGoldMetalMaterial(material, meshName)) {
    standardMaterial.color?.set("#c9971e");
    standardMaterial.metalness = 0.85;
    standardMaterial.roughness = 0.22;
    standardMaterial.envMapIntensity = 1.4;
  } else if (standardMaterial.map) {
    standardMaterial.color?.set("#111111");
    standardMaterial.metalness = 0.12;
    standardMaterial.roughness = 0.34;
    standardMaterial.envMapIntensity = 1.05;
  } else {
    standardMaterial.color?.set("#111111");
  }

  standardMaterial.envMapIntensity = standardMaterial.envMapIntensity || 0.95;
  material.transparent = false;
  material.depthWrite = true;
  material.depthTest = true;
  standardMaterial.opacity = 1;
  material.needsUpdate = true;
}

export function GlassesModel({ fit = true, reflectionProgress, ...props }: GlassesModelProps) {
  const { scene } = useGLTF("/models/glasses/scene.gltf");
  const lensMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const faceReflectionTexture = useMemo(() => createFaceReflectionTexture(), []);
  const tunedScene = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      if (Array.isArray(object.material)) {
        object.material = object.material.map((material) => material.clone());
        return;
      }

      object.material = object.material.clone();
    });

    return clonedScene;
  }, [scene]);

  useEffect(() => {
    lensMaterialsRef.current = [];

    tunedScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.renderOrder = 0;

      const materials = Array.isArray(object.material) ? object.material : [object.material];

      materials.forEach((material) => {
        tuneMaterial(material, object.name);

        if (faceReflectionTexture && reflectionProgress && isLensMaterial(material, object.name)) {
          const lensMaterial = material as THREE.MeshStandardMaterial;
          lensMaterial.envMap = faceReflectionTexture;
          lensMaterial.envMapIntensity = 0.35;
          lensMaterial.needsUpdate = true;
          lensMaterialsRef.current.push(lensMaterial);
        }
      });
    });
  }, [faceReflectionTexture, reflectionProgress, tunedScene]);

  useFrame(() => {
    if (!reflectionProgress || lensMaterialsRef.current.length === 0) {
      return;
    }

    const progress = reflectionProgress.get();
    const faceOnPhase = smoothStep(clamp01((progress - 0.58) / 0.22));
    const zoomPhase = smoothStep(clamp01((progress - 0.82) / 0.14));
    const reflectionStrength = Math.max(faceOnPhase * 0.72, zoomPhase);

    lensMaterialsRef.current.forEach((material) => {
      material.envMapIntensity = THREE.MathUtils.lerp(0.35, FACE_REFLECTION_INTENSITY, reflectionStrength);
      material.roughness = THREE.MathUtils.lerp(0.18, 0.06, reflectionStrength);
      material.opacity = THREE.MathUtils.lerp(0.78, LENS_OPACITY, reflectionStrength);
    });
  });

  const model = <primitive object={tunedScene} />;

  return <group {...props}>{fit ? <Center>{model}</Center> : model}</group>;
}

useGLTF.preload("/models/glasses/scene.gltf");
