import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Coins, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';


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


function BackGlow({ color, active }: { color: string, active: boolean }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, color);

      gradient.addColorStop(0.2, color); // Reduced core size for tighter glow
      gradient.addColorStop(0.8, 'rgba(0,0,0,0)'); // Fade out completely before edge

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    // Ensure no wrapping artifacts at edges
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [color]);

  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: active ? 1 : 0,
        y: active ? 1 : 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      gsap.to(meshRef.current.material, {
        opacity: active ? 0.3 : 0,
        duration: 0.5
      });
    }
  }, [active]);

  return (
    <mesh ref={meshRef} position={[0, -2, -3]} scale={[0, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

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

// --- 3. FALLING PARTICLES (Gold Squares) ---
function FallingParticles() {
  const [particles, setParticles] = useState<Array<{
    left: string;
    duration: string;
    delay: string;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 5}s`,
      size: Math.random() > 0.6 ? 10 : 6,
      color: Math.random() > 0.5 ? '#FFD700' : '#FDB931',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <style>
        {`
          @keyframes fallDown {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(300px) rotate(180deg); opacity: 0; }
          }
        `}
      </style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `fallDown ${p.duration} infinite linear`,
            animationDelay: p.delay,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}


const CLIP_PATH = 'polygon(0% 20px, 5% 20px, 5% 0px, 10% 0px, 10% 30px, 15% 30px, 15% 10px, 20% 10px, 20% 40px, 25% 40px, 25% 15px, 30% 15px, 30% 35px, 35% 35px, 35% 5px, 40% 5px, 40% 45px, 45% 45px, 45% 20px, 50% 20px, 50% 50px, 55% 50px, 55% 10px, 60% 10px, 60% 35px, 65% 35px, 65% 5px, 70% 5px, 70% 40px, 75% 40px, 75% 15px, 80% 15px, 80% 45px, 85% 45px, 85% 25px, 90% 25px, 90% 55px, 95% 55px, 95% 10px, 100% 10px, 100% 100%, 0% 100%)';

export function PrizeSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative -mt-20 z-20">


      <section
        id="prizes"
        className="relative pb-16 sm:pb-20 md:pb-24 pt-32 sm:pt-40 md:pt-48 overflow-hidden bg-background"
        style={{
          clipPath: CLIP_PATH
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.15),_transparent_45%)]" />

        {/* Falling Gold Particles */}
        <FallingParticles />

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
                <motion.div
                  key={box.id}
                  onClick={() => handleOpen(box.id)}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(box.id); }}
                  className={cn(
                    'group relative h-full text-left cursor-pointer',
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
                      {/* 
                            ACCESSIBILITY & OUTLINE FIX: 
                            Added outline-none to canvas parent and removed default tap highlights 
                        */}
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
                          style={{ pointerEvents: 'auto', outline: 'none' }}
                          className="focus:outline-none touch-none"
                          tabIndex={-1}
                        >
                          <ChestScene isOpen={isOpen} glowColor={box.glowColor} />
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
                            animate={{ rotate: [-6, 6, -3, 3, 0], y: [0, -4, 0] }}
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
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Only one treasure can stay open at a time. Choose wisely.</span>
          </div>
        </div>
      </section>
    </div>
  );
}