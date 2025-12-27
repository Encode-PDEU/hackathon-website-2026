import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import villagerGlb from "../../assets/minecraft-villager.glb";

export function VillagerModel() {
    const { scene } = useGLTF(villagerGlb);
    const headBoneRef = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }

            if (child.type === "Bone") {
                console.log("Bone found:", child.name);
                if (child.name.toLowerCase().includes("head") || child.name === "Head") {
                    headBoneRef.current = child;
                }
            }
        });
    }, [scene]);

    useFrame((state) => {
        if (!headBoneRef.current) return;

        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;

        const targetX = -mouseY * 0.8;
        const targetY = mouseX * 0.8;

        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(headBoneRef.current.rotation.x, targetX, 0.1);
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(headBoneRef.current.rotation.y, targetY, 0.1);
    });

    return <primitive object={scene} scale={1} />;
}

useGLTF.preload(villagerGlb);
