import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Coins, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMinecraftSound } from '@/hooks/useMinecraftSound';

// --- Configuration ---
const lootBoxes = [
  {
    id: 'grand',
    label: 'Grand Chest',
    amount: 1000,
    accent: 'text-amber-100',
    glowColor: '#fbbf24', // Gold
  },
  {
    id: 'runner',
    label: 'Runner-Up Crate',
    amount: 500,
    accent: 'text-sky-100',
    glowColor: '#38bdf8', // Cyan
  },
  {
    id: 'explorer',
    label: 'Explorer Bundle',
    amount: 250,
    accent: 'text-emerald-100',
    glowColor: '#4ade80', // Green
  },
];

// --- 1. UPDATED BACK GLOW (Wider & Softer) ---
function BackGlow({ color }: { color: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, color);
      // New Stop: Keeps the center bright out to 40% of the radius
      gradient.addColorStop(0.4, color); 
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <mesh position={[0, -2, -3]}> {/* Pushed slightly further back (-3) */}
      {/* Increased Size: 11x11 to spread across the whole container */}
      <planeGeometry args={[8, 8]} /> 
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.3} // Lower opacity for a softer, fog-like spread
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </mesh>
  );
}

// --- 2. LOOT PARTICLES (Minecraft Voxel Style) ---
function LootParticle({ type, color, offset, speed }: { type: 'coin' | 'gem' | 'diamond', color: string, offset: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [randomPos] = useState(() => ({
    x: (Math.random() - 0.5) * 0.5,
    z: (Math.random() - 0.5) * 0.5,
    rotationSpeed: (Math.random() + 0.5) * 2,
  }));

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = (time * speed + offset) % 1;
    
    // Float Up
    meshRef.current.position.y = -1.2 + (cycle * 2.5);
    
    // Scale Logic
    let scale = 1;
    if (cycle < 0.1) scale = cycle * 10;
    else if (cycle > 0.8) scale = (1 - cycle) * 5;
    
    meshRef.current.scale.setScalar(scale * 0.4); 

    // Spread
    meshRef.current.position.x = randomPos.x * (1 + cycle * 0.5);
    meshRef.current.position.z = randomPos.z + (Math.sin(time * 3) * 0.05);

    // Spin
    meshRef.current.rotation.y = time * randomPos.rotationSpeed;
    meshRef.current.rotation.x = Math.sin(time) * 0.2; 
    meshRef.current.rotation.z = Math.cos(time) * 0.2;
  });

  const materialProps = {
    color: color,
    roughness: 0.4,
    metalness: 0.1,
  };

  if (type === 'coin') {
    return (
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.25, 0.1, 0.4]} />
        <meshStandardMaterial {...materialProps} color="#FFD700" metalness={0.6} roughness={0.3} />
      </mesh>
    );
  } else if (type === 'diamond') {
    return (
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial {...materialProps} color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
    );
  } else {
    return (
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.15, 0.25, 0.15]} />
        <meshStandardMaterial {...materialProps} color="#50C878" emissive="#50C878" emissiveIntensity={0.2} />
      </mesh>
    );
  }
}

function LootFountain({ active, color }: { active: boolean, color: string }) {
  if (!active) return null;
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const r = Math.random();
    let type: 'coin' | 'gem' | 'diamond' = 'coin';
    if (r > 0.6) type = 'gem';
    if (r > 0.85) type = 'diamond';
    return (
      <LootParticle 
        key={i} 
        type={type} 
        color={color} 
        offset={Math.random()} 
        speed={0.4 + Math.random() * 0.4} 
      />
    );
  });
  return <group>{particles}</group>;
}

// --- Chest Model ---
function ChestModel({ isOpen }: { isOpen: boolean }) {
  const { scene } = useGLTF('/minecraft_chest.glb');
  const chest = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    chest.traverse((obj) => {
      obj.castShadow = true;
      obj.receiveShadow = true;
      if (!lidRef.current && obj.name.toLowerCase().includes('lid')) {
        lidRef.current = obj;
        obj.rotation.x = -3.14;
      }
    });
  }, [chest]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, isOpen ? 0.25 : 0, 6, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, isOpen ? -0.25 : -0.15, 5, delta);
    const targetY = isOpen ? -1.1 : -1.3; 
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 6, delta);

    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.damp(lidRef.current.rotation.x, isOpen ? -0.5 : -3.14, 9, delta);
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.5} rotation={[0, -0.2, 0]} position={[0, -1.3, 0]}>
      <primitive object={chest} />
    </group>
  );
}

useGLTF.preload('/minecraft_chest.glb');

// --- Main Section ---
export function PrizeSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { play } = useMinecraftSound(0.45);

  const handleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const PurpleParticles = () => (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-6 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(170,130,255,0.9) 0%, rgba(170,130,255,0) 70%)',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 4 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );

  return (
    <section id="prizes" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 pixel-border-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-retro text-sm text-muted-foreground">Open a chest to reveal the bounty</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-foreground uppercase tracking-wider mb-3">Loot the Vault</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            Three legendary loot boxes. Click to crack one open—only a single chest can be revealed at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {lootBoxes.map((box, index) => {
            const isOpen = openId === box.id;

            return (
              <motion.button
                key={box.id}
                onClick={() => handleOpen(box.id)}
                onMouseEnter={() => play()}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'group relative h-full text-left focus:outline-none rounded-none',
                  'flex flex-col items-center gap-4 transition-all duration-300',
                )}
              >
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-center">
                      <p className="font-retro text-xs text-muted-foreground">Loot Box</p>
                      <p className="font-pixel text-lg text-foreground">{box.label}</p>
                    </div>
                  </div>

                  <div className="relative w-full h-80 sm:h-96 overflow-hidden rounded-lg">
                    <PurpleParticles />
                    <Suspense
                      fallback={
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-retro bg-muted/20">
                          Loading chest...
                        </div>
                      }
                    >
                      <Canvas
                        gl={{ alpha: true, antialias: true }}
                        dpr={[1, 1.6]}
                        camera={{ position: [-0.2, 0.6, 4.2], fov: 45 }}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <ambientLight intensity={0.4} />
                        <pointLight position={[0, 2, 2]} intensity={2} color="#a020f0" />
                        <directionalLight position={[1, 1, 2]} intensity={1} />
                        <spotLight position={[-2, 3, 0]} angle={0.5} intensity={5} />

                        {isOpen && (
                          <>
                            <BackGlow color={box.glowColor} />
                            <LootFountain active={isOpen} color={box.glowColor} />
                          </>
                        )}
                        
                        <group position={[0, -0.05, 0]}>
                          <ChestModel isOpen={isOpen} />
                        </group>
                        
                        <OrbitControls
                          enablePan={false}
                          enableZoom={false}
                          enableRotate={true}
                          autoRotateSpeed={0.6}
                          minPolarAngle={0.6}
                          maxPolarAngle={1.3}
                          target={[0, -0.8, 0]}
                        />
                      </Canvas>
                    </Suspense>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="loot"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: -6, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
                        className="mt-3 flex items-center gap-2 justify-center"
                      >
                        <motion.div
                          initial={{ rotate: [-10, 10, -5, 5, 0], y: [0, -6, 0] }}
                          animate={{ rotate: [ -6, 6, -3, 3, 0 ], y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="flex items-center gap-2 px-3 py-2 bg-black/75 pixel-border-sm"
                        >
                          <Coins className="w-4 h-4 text-gold" />
                          <span className={cn('font-pixel text-lg tracking-wide', box.accent)}>
                            ${box.amount.toLocaleString()}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 text-center text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Only one treasure can stay open at a time. Choose wisely.</span>
        </div>
      </div>
    </section>
  );
}