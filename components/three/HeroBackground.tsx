"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for consistent results
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Generate particle positions once at module level
const generateParticlePositions = () => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    let seed = 1;

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (seededRandom(seed++) - 0.5) * 10;
        positions[i * 3 + 1] = (seededRandom(seed++) - 0.5) * 6;
        positions[i * 3 + 2] = (seededRandom(seed++) - 0.5) * 10;
    }

    return positions;
};

// Subtle floating particles (adds depth)
function Particles() {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        return generateParticlePositions();
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#ff007f" transparent opacity={0.4} />
        </points>
    );
}

// Smaller, subtle blob (not center stage)
// function AccentBlob() {
//     const meshRef = useRef<THREE.Mesh>(null);

//     useFrame((state) => {
//         if (meshRef.current) {
//             meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
//             meshRef.current.position.y =
//                 Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
//         }
//     });

//     return (
//         <mesh ref={meshRef} position={[2.5, 0, -2]}>
//             <icosahedronGeometry args={[1.2, 32]} />
//             <meshStandardMaterial
//                 color="#6366f1"
//                 emissive="#4f46e5"
//                 emissiveIntensity={0.5}
//                 roughness={0.3}
//                 metalness={0.6}
//                 transparent
//                 opacity={0.4}
//             />
//         </mesh>
//     );
// }

// Fallback (important for performance)
function Fallback() {
    return (
        <div className="absolute inset-0 bg-linear-to-br from-[#ff007f]/10 via-[#ff3399]/10 to-transparent blur-2xl" />
    );
}

export default function HeroBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <Suspense fallback={<Fallback />}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    className="absolute! inset-0!"
                >
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[3, 3, 5]} intensity={1} />

                    <Particles />
                    {/* <AccentBlob /> */}
                </Canvas>
            </Suspense>
        </div>
    );
}
