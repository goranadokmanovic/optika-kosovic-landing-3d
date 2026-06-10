"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export const FACE_REFLECTION_INTENSITY = 1.0;
export const LENS_OPACITY = 0.88;
export const LENS_PURPLE_SHEEN = 1;

type GlassesModelProps = ThreeElements["group"] & {
  fit?: boolean;
  reflectionProgress?: MotionValue<number>;
};

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
  background.addColorStop(0, "#efe7ff");
  background.addColorStop(0.5, "#ffffff");
  background.addColorStop(1, "#d8c5f0");

  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const drawSilhouette = (centerRatio: number, scale: number, alpha: number) => {
    const centerX = canvas.width * centerRatio;
    const headTop = canvas.height * 0.06;
    const headWidth = canvas.width * 0.32 * scale;
    const headHeight = canvas.height * 0.76 * scale;
    const shoulderY = canvas.height * 0.74;
    const shoulderWidth = canvas.width * 0.78 * scale;

    context.globalAlpha = alpha;
    context.fillStyle = "#2a1640";
    context.beginPath();
    context.ellipse(
      centerX,
      headTop + headHeight * 0.43,
      headWidth * 0.5,
      headHeight * 0.47,
      0,
      0,
      Math.PI * 2,
    );
    context.moveTo(centerX - headWidth * 0.22, shoulderY - canvas.height * 0.15);
    context.bezierCurveTo(
      centerX - shoulderWidth * 0.38,
      shoulderY - canvas.height * 0.08,
      centerX - shoulderWidth * 0.48,
      shoulderY + canvas.height * 0.1,
      centerX - shoulderWidth * 0.5,
      canvas.height,
    );
    context.lineTo(centerX + shoulderWidth * 0.5, canvas.height);
    context.bezierCurveTo(
      centerX + shoulderWidth * 0.48,
      shoulderY + canvas.height * 0.1,
      centerX + shoulderWidth * 0.38,
      shoulderY - canvas.height * 0.08,
      centerX + headWidth * 0.22,
      shoulderY - canvas.height * 0.15,
    );
    context.closePath();
    context.fill();
    context.globalAlpha = 1;
  };

  const silhouettePositions = [0.12, 0.38, 0.62, 0.88];

  context.filter = "blur(28px)";
  silhouettePositions.forEach((centerRatio) => drawSilhouette(centerRatio, 1.12, 1));
  context.filter = "blur(10px)";
  silhouettePositions.forEach((centerRatio) => drawSilhouette(centerRatio, 1, 0.96));
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
    standardMaterial.envMapIntensity = FACE_REFLECTION_INTENSITY;
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
          lensMaterial.envMapIntensity = FACE_REFLECTION_INTENSITY;
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

    lensMaterialsRef.current.forEach((material) => {
      material.envMapIntensity = FACE_REFLECTION_INTENSITY;
    });
  });

  const model = <primitive object={tunedScene} />;

  return <group {...props}>{fit ? <Center>{model}</Center> : model}</group>;
}

useGLTF.preload("/models/glasses/scene.gltf");
