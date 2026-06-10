"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export const FACE_REFLECTION_INTENSITY = 0.5;
export const LENS_OPACITY = 0.88;
export const LENS_PURPLE_SHEEN = 1;

type GlassesModelProps = ThreeElements["group"] & {
  fit?: boolean;
  reflectionProgress?: MotionValue<number>;
};

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
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

function createFaceReflectionTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f4eff9");
  gradient.addColorStop(0.45, "#e4d8ef");
  gradient.addColorStop(1, "#d2d5d0");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.filter = "blur(18px)";
  context.fillStyle = "rgba(27, 32, 30, 0.34)";
  context.beginPath();
  context.ellipse(258, 91, 39, 51, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(27, 32, 30, 0.25)";
  context.beginPath();
  context.ellipse(258, 174, 100, 48, 0, Math.PI, Math.PI * 2);
  context.fill();

  context.filter = "blur(28px)";
  context.fillStyle = "rgba(122, 75, 184, 0.12)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
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

  if (standardMaterial.map) {
    standardMaterial.color?.set("#ffffff");
  }

  standardMaterial.envMapIntensity = 0.95;
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

    const t = reflectionProgress.get();
    const reflectionFade = 1 - smooth(clamp((t - 0.6) / 0.2));
    const intensity = FACE_REFLECTION_INTENSITY * reflectionFade;

    lensMaterialsRef.current.forEach((material) => {
      material.envMapIntensity = intensity;
    });
  });

  const model = <primitive object={tunedScene} />;

  return <group {...props}>{fit ? <Center>{model}</Center> : model}</group>;
}

useGLTF.preload("/models/glasses/scene.gltf");
