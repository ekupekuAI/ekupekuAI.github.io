import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";

// The hero object. `progress` is a Motion value (0..1 through the hero) read
// inside useFrame — no React re-renders per frame.
function Knot({ progress, reduced }) {
  const mesh = useRef();

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const p = progress.get();
    if (!reduced) mesh.current.rotation.y += dt * 0.18;
    // Scroll tilts the object away and sinks it as you leave the hero.
    mesh.current.rotation.x = p * Math.PI * 0.9;
    mesh.current.position.y = -p * 2.2;
    mesh.current.scale.setScalar(1 - p * 0.35);
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.6} floatIntensity={reduced ? 0 : 1.2}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.05, 0.34, 240, 40]} />
        <MeshDistortMaterial
          color="#22c55e"
          emissive="#16a34a"
          emissiveIntensity={0.28}
          roughness={0.22}
          metalness={0.7}
          distort={reduced ? 0 : 0.32}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D({ progress, reduced }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#070b14", 6, 12]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.8} color="#e2fbe8" />
      <pointLight position={[-4, -3, 2]} intensity={2.2} color="#22c55e" />
      <Stars radius={60} depth={30} count={reduced ? 250 : 650} factor={3} saturation={0} fade speed={reduced ? 0 : 0.6} />
      <Knot progress={progress} reduced={reduced} />
    </Canvas>
  );
}
