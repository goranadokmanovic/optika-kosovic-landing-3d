"use client";

import { Center, useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export const LENS_OPACITY = 0.88;
export const LENS_PURPLE_SHEEN = 0.55;

type GlassesModelProps = ThreeElements["group"] & {
  fit?: boolean;
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

function tuneMaterial(material: THREE.Material, meshName: string) {
  const standardMaterial = material as THREE.MeshStandardMaterial;
  const physicalMaterial = material as THREE.MeshPhysicalMaterial;
  const isLens = isLensMaterial(material, meshName);
  const isNosePad = isNosePadMaterial(material, meshName);

  if (isLens) {
    standardMaterial.roughnessMap = null;
    standardMaterial.color = new THREE.Color("#9fceb6");
    standardMaterial.metalness = 0;
    standardMaterial.roughness = 0.34;
    standardMaterial.envMapIntensity = 0.12;
    standardMaterial.opacity = LENS_OPACITY;
    material.depthWrite = true;
    material.depthTest = true;

    if ("transmission" in physicalMaterial) {
      physicalMaterial.transmission = 0;
    }

    if ("sheen" in physicalMaterial) {
      physicalMaterial.sheen = LENS_PURPLE_SHEEN;
      physicalMaterial.sheenColor = new THREE.Color("#7a4bb8");
      physicalMaterial.sheenRoughness = 0.45;
    }

    if ("specularIntensity" in physicalMaterial) {
      physicalMaterial.specularIntensity = 0;
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

export function GlassesModel({ fit = true, ...props }: GlassesModelProps) {
  const { scene } = useGLTF("/models/glasses/scene.gltf");
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
    tunedScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.renderOrder = 0;

      const materials = Array.isArray(object.material) ? object.material : [object.material];

      materials.forEach((material) => {
        tuneMaterial(material, object.name);
      });
    });
  }, [tunedScene]);

  const model = <primitive object={tunedScene} />;

  return <group {...props}>{fit ? <Center>{model}</Center> : model}</group>;
}

useGLTF.preload("/models/glasses/scene.gltf");
