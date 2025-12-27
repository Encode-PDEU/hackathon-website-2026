import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import villagerGlb from "../../assets/minecraft-villager.glb";

interface VillagerModelProps {
    isHovered?: boolean;
    mousePos?: { x: number; y: number };
}

export function VillagerModel({ isHovered = false, mousePos = { x: 0, y: 0 } }: VillagerModelProps) {
    const { scene } = useGLTF(villagerGlb);
    const headBoneRef = useRef<THREE.Object3D | null>(null);
    const bodyRef = useRef<THREE.Group>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }

            if (child.type === "Bone") {
                if (child.name.toLowerCase().includes("head") || child.name === "Head") {
                    headBoneRef.current = child;
                }
            }
        });
    }, [scene]);

    useFrame(() => {
        const mouseX = mousePos.x;
        const mouseY = mousePos.y;

        // Determine targets based on hover state
        // mousePos is already normalized to -1 to 1 at the section level.
        // Rotation around X axis: negative is looking UP, positive is looking DOWN.
        const headTargetX = isHovered ? -mouseY * 1.5 : 0;
        const headTargetY = isHovered ? mouseX * 1.2 : 0;
        const bodyTargetY = isHovered ? mouseX * 0.4 : 0;
        const bodyTargetX = isHovered ? -mouseY * 0.3 : 0;

        // Rotate Head
        if (headBoneRef.current) {
            headBoneRef.current.rotation.x = THREE.MathUtils.lerp(headBoneRef.current.rotation.x, headTargetX, 0.1);
            headBoneRef.current.rotation.y = THREE.MathUtils.lerp(headBoneRef.current.rotation.y, headTargetY, 0.1);
        }

        // Rotate Body
        if (bodyRef.current) {
            bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, bodyTargetY, 0.05);
            bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyTargetX, 0.05);
        }
    });

    return (
        <group ref={bodyRef}>
            <primitive object={scene} scale={1} />
        </group>
    );
}

useGLTF.preload(villagerGlb);
