import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ProductType } from '@/types/product';

interface ProductModelProps {
  type: ProductType;
  color: string;
}

export const ProductModel = ({ type, color }: ProductModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const materialProps = {
    color: color,
    metalness: 0.6,
    roughness: 0.2,
    envMapIntensity: 1,
  };

  const renderProduct = () => {
    switch (type) {
      case 'mobile':
        return <MobileModel {...materialProps} />;
      case 'laptop':
        return <LaptopModel {...materialProps} />;
      case 'pc':
        return <PCModel {...materialProps} />;
      case 'tablet':
        return <TabletModel {...materialProps} />;
      case 'watch':
        return <WatchModel {...materialProps} />;
      case 'tv':
        return <TVModel {...materialProps} />;
      case 'camera':
        return <CameraModel {...materialProps} />;
      default:
        return <MobileModel {...materialProps} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderProduct()}
    </group>
  );
};

interface ModelMaterialProps {
  color: string;
  metalness: number;
  roughness: number;
  envMapIntensity: number;
}

const MobileModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group>
    {/* Phone body */}
    <RoundedBox args={[1, 2, 0.1]} radius={0.05} smoothness={4}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Screen */}
    <RoundedBox args={[0.9, 1.85, 0.01]} radius={0.03} position={[0, 0, 0.055]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
    </RoundedBox>
    {/* Camera bump */}
    <group position={[-0.3, 0.75, -0.06]}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.03, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  </group>
);

const LaptopModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group rotation={[0.3, 0, 0]}>
    {/* Base */}
    <RoundedBox args={[2.5, 0.08, 1.7]} radius={0.02} position={[0, -0.5, 0]}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Keyboard area */}
    <RoundedBox args={[2.3, 0.01, 1.2]} radius={0.01} position={[0, -0.44, -0.15]}>
      <meshStandardMaterial color="#1f2937" metalness={0.3} roughness={0.8} />
    </RoundedBox>
    {/* Trackpad */}
    <RoundedBox args={[0.8, 0.01, 0.5]} radius={0.01} position={[0, -0.43, 0.4]}>
      <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.3} />
    </RoundedBox>
    {/* Screen lid */}
    <group position={[0, 0.3, -0.85]} rotation={[-0.4, 0, 0]}>
      <RoundedBox args={[2.5, 1.6, 0.06]} radius={0.02}>
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </RoundedBox>
      {/* Screen */}
      <RoundedBox args={[2.3, 1.45, 0.01]} radius={0.01} position={[0, 0, 0.035]}>
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </group>
  </group>
);

const PCModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group>
    {/* Tower case */}
    <RoundedBox args={[1.2, 2.2, 2]} radius={0.05}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Front panel */}
    <RoundedBox args={[1.15, 2.1, 0.05]} radius={0.03} position={[0, 0, 1.01]}>
      <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
    </RoundedBox>
    {/* Side glass panel */}
    <RoundedBox args={[0.05, 1.8, 1.6]} radius={0.02} position={[0.58, 0.1, 0]}>
      <meshStandardMaterial color="#1e3a5f" metalness={0.1} roughness={0.1} transparent opacity={0.3} />
    </RoundedBox>
    {/* RGB strip */}
    <mesh position={[0, -1, 1.01]}>
      <boxGeometry args={[1, 0.05, 0.02]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
    </mesh>
    {/* Power button */}
    <mesh position={[0.4, 0.9, 1.02]}>
      <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
      <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
    </mesh>
  </group>
);

const TabletModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group>
    {/* Tablet body */}
    <RoundedBox args={[1.8, 2.4, 0.08]} radius={0.04} smoothness={4}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Screen */}
    <RoundedBox args={[1.7, 2.3, 0.01]} radius={0.03} position={[0, 0, 0.045]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
    </RoundedBox>
    {/* Camera */}
    <mesh position={[0, 1.1, -0.045]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
    </mesh>
  </group>
);

const WatchModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group rotation={[0.3, 0, 0]}>
    {/* Watch case */}
    <mesh>
      <cylinderGeometry args={[0.6, 0.6, 0.2, 64]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    {/* Screen bezel */}
    <mesh position={[0, 0.11, 0]}>
      <cylinderGeometry args={[0.55, 0.55, 0.02, 64]} />
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
    </mesh>
    {/* Watch screen */}
    <mesh position={[0, 0.12, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.01, 64]} />
      <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
    </mesh>
    {/* Digital crown */}
    <mesh position={[0.65, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.08, 0.08, 0.1, 32]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    {/* Top strap */}
    <RoundedBox args={[0.4, 1.2, 0.1]} radius={0.05} position={[0, 0.9, 0]}>
      <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.8} />
    </RoundedBox>
    {/* Bottom strap */}
    <RoundedBox args={[0.4, 1.2, 0.1]} radius={0.05} position={[0, -0.9, 0]}>
      <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.8} />
    </RoundedBox>
  </group>
);

const TVModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group>
    {/* Screen */}
    <RoundedBox args={[3.5, 2, 0.08]} radius={0.02}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Display */}
    <RoundedBox args={[3.4, 1.9, 0.01]} radius={0.01} position={[0, 0, 0.045]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.05} />
    </RoundedBox>
    {/* Stand base */}
    <mesh position={[0, -1.15, 0.3]}>
      <boxGeometry args={[1.5, 0.05, 0.6]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    {/* Stand neck */}
    <mesh position={[0, -1.05, 0.1]}>
      <boxGeometry args={[0.15, 0.15, 0.3]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  </group>
);

const CameraModel = ({ color, metalness, roughness }: ModelMaterialProps) => (
  <group rotation={[0.1, 0.3, 0]}>
    {/* Camera body */}
    <RoundedBox args={[1.6, 1, 0.9]} radius={0.08}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Viewfinder bump */}
    <RoundedBox args={[0.5, 0.35, 0.3]} radius={0.05} position={[-0.35, 0.65, -0.1]}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </RoundedBox>
    {/* Viewfinder eye piece */}
    <mesh position={[-0.35, 0.65, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 0.15, 32]} />
      <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
    </mesh>
    {/* Lens mount */}
    <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.15, 64]} />
      <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Main lens barrel */}
    <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.45, 0.48, 0.6, 64]} />
      <meshStandardMaterial color="#1f1f2f" metalness={0.7} roughness={0.4} />
    </mesh>
    {/* Lens ring (focus) */}
    <mesh position={[0, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.47, 0.47, 0.15, 64]} />
      <meshStandardMaterial color="#3a3a4e" metalness={0.5} roughness={0.6} />
    </mesh>
    {/* Front element */}
    <mesh position={[0, 0, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.35, 0.4, 0.1, 64]} />
      <meshStandardMaterial color="#0a0a15" metalness={0.95} roughness={0.05} />
    </mesh>
    {/* Glass element */}
    <mesh position={[0, 0, 1.21]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.02, 64]} />
      <meshStandardMaterial color="#1e3a5f" metalness={0.1} roughness={0.05} transparent opacity={0.4} />
    </mesh>
    {/* Mode dial */}
    <mesh position={[0.55, 0.55, -0.2]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.15, 0.15, 0.15, 32]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
    {/* Shutter button */}
    <mesh position={[0.4, 0.55, 0.15]}>
      <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
      <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Hot shoe */}
    <RoundedBox args={[0.3, 0.05, 0.25]} radius={0.01} position={[0, 0.53, -0.15]}>
      <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
    </RoundedBox>
    {/* Grip texture */}
    <RoundedBox args={[0.25, 0.8, 0.85]} radius={0.05} position={[0.7, -0.05, 0]}>
      <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
    </RoundedBox>
    {/* Screen on back */}
    <RoundedBox args={[1.2, 0.75, 0.02]} radius={0.02} position={[0, -0.05, -0.46]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
    </RoundedBox>
  </group>
);
