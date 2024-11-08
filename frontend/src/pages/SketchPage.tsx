import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { useEffect } from 'react';
import * as THREE from 'three';

function WeddingDress() {
  const { scene } = useGLTF('../assets/dress_merge.glb');

  // 상의에 대한 Leva 컨트롤 정의
  const upperControls = useControls('상의', {
    metalness: { value: 0.05, min: 0, max: 1, step: 0.01, label: '메탈니스' },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01, label: '거칠기' },
    emissiveIntensity: { value: 0.4, min: 0, max: 2, step: 0.1, label: '밝기' },
    sleeveLength: { value: 1, min: 0.5, max: 1.5, step: 0.01, label: '소매 길이' },
    neckHeight: { value: 1, min: 0.8, max: 3, step: 0.01, label: '목 높이' },
    neckWidth: { value: 1, min: 0.8, max: 1.5, step: 0.01, label: '목 넓이' },
    showArms: { value: false, label: 'Arms Visible' },
    showLaceShirt: { value: false, label: 'Lace Shirt Visible' },
    showTop: { value: false, label: 'Top Visible' },
    showShoulder2: { value: false, label: 'Shoulder2 Visible' }
  });

  // 하의에 대한 Leva 컨트롤 정의
  const lowerControls = useControls('하의', {
    dressLength: { value: 0.5, min: 0.5, max: 1, step: 0.01, label: '드레스 넓이' },
    dressWidth: { value: 1, min: 0.5, max: 2, step: 0.01, label: '드레스 폭' },
    showSkirt: { value: false, label: 'Skirt Visible' },
    showSkirt2: { value: false, label: 'Skirt2 Visible' },
    showDress3: { value: false, label: 'Dress3 Visible' },
    showTop3: { value: false, label: 'Top3 Visible' }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = upperControls.metalness;
          material.roughness = upperControls.roughness;
          material.emissive = new THREE.Color(0x888888);
          material.emissiveIntensity = upperControls.emissiveIntensity;
          material.side = THREE.DoubleSide;
        }

        // 상의 속성 조정
        if (['left_arm', 'right_arm'].includes(mesh.name)) {
          mesh.visible = upperControls.showArms;
          mesh.scale.x = upperControls.sleeveLength;
        }
        if (mesh.name === 'lace_shirt') {
          mesh.visible = upperControls.showLaceShirt;
          mesh.scale.y = upperControls.neckHeight;
          mesh.scale.z = upperControls.neckWidth;
        }
        if (mesh.name === 'top2') mesh.visible = upperControls.showTop;
        if (mesh.name === 'shorder_2') mesh.visible = upperControls.showShoulder2;

        // 하의 속성 조정
        if (mesh.name === 'skirt') {
          mesh.visible = lowerControls.showSkirt;
          mesh.scale.z = lowerControls.dressWidth;
          mesh.scale.x = lowerControls.dressLength;
        }
        if (mesh.name === 'skirt2') {
          mesh.visible = lowerControls.showSkirt2;
          mesh.scale.z = lowerControls.dressWidth;
          mesh.scale.x = lowerControls.dressLength;
        }
        if (mesh.name === 'dress_3') mesh.visible = lowerControls.showDress3;
        if (mesh.name === 'top_3') mesh.visible = lowerControls.showTop3;
      }
    });
  }, [scene, upperControls, lowerControls]);

  return <primitive object={scene} />;
}

function CameraSettings() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 1, 0);
    camera.zoom = 1.5;
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

const Sketch: React.FC = () => {
  return (
    <div
      style={{
        width: 414,
        height: '100vh',
        backgroundImage: 'url(../assets/wedding-back2.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Canvas shadows camera={{ fov: 40, position: [0, 1, 5] }}>
        <hemisphereLight groundColor={'#eeeeee'} intensity={1.0} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[5, 15, 10]} angle={0.3} penumbra={1} intensity={1.2} castShadow />

        <WeddingDress />

        <Environment preset="sunset" />
        <CameraSettings />
        <OrbitControls target={[0, 1, 0]} enablePan={false} />
      </Canvas>

      <Leva collapsed={true} oneLineLabels={true} />
      
    </div>
  );
};

export default Sketch;
