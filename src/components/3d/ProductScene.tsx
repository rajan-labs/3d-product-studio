import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import { ProductModel } from './ProductModel';
import { ProductType } from '@/types/product';

interface ProductSceneProps {
  productType: ProductType;
  color: string;
}

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color="#06b6d4" wireframe />
  </mesh>
);

export const ProductScene = ({ productType, color }: ProductSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
        color="#06b6d4"
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#8b5cf6" />
      
      <Suspense fallback={<LoadingFallback />}>
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Floating product */}
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <ProductModel type={productType} color={color} />
        </Float>
        
        {/* Sparkle effects */}
        <Sparkles
          count={50}
          scale={8}
          size={2}
          speed={0.4}
          color="#06b6d4"
          opacity={0.5}
        />
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
          color="#06b6d4"
        />
      </Suspense>
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
};
