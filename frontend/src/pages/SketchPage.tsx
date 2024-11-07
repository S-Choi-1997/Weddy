import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { useEffect } from 'react';
import * as THREE from 'three';

function WeddingDress() {
  const { scene } = useGLTF('../assets/dress_merge.glb');

  // Leva UI 컨트롤 정의
  const {
    metalness, roughness, emissiveIntensity,
    sleeveLength, dressLength, dressWidth, neckHeight, neckWidth,
    showArms, showSkirt, showLaceShirt, showTop, showSkirt2,
    showDress3, showTop3, showShoulder2
  } = useControls({
    metalness: { value: 0.05, min: 0, max: 1, step: 0.01, label: '메탈니스' },
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01, label: '거칠기' },
    emissiveIntensity: { value: 0.4, min: 0, max: 2, step: 0.1, label: '밝기' },
    sleeveLength: { value: 1, min: 0.5, max: 1.5, step: 0.01, label: '소매 길이' },
    dressLength: { value: 0.5, min: 0.5, max: 1, step: 0.01, label: '드레스 넓이' },
    dressWidth: { value: 1, min: 0.5, max: 2, step: 0.01, label: '드레스 폭' },
    neckHeight: { value: 1, min: 0.8, max: 3, step: 0.01, label: '목 높이' },
    neckWidth: { value: 1, min: 0.8, max: 1.5, step: 0.01, label: '목 넓이' },
    showArms: { value: false, label: 'Arms Visible' },
    showSkirt: { value: false, label: 'Skirt Visible' },
    showLaceShirt: { value: false, label: 'Lace Shirt Visible' },
    showTop: { value: false, label: 'Top Visible' },
    showSkirt2: { value: false, label: 'Skirt2 Visible' },
    showDress3: { value: false, label: 'Dress3 Visible' },
    showTop3: { value: false, label: 'Top3 Visible' },
    showShoulder2: { value: false, label: 'Shoulder2 Visible' }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).metalness = metalness;
          (mesh.material as THREE.MeshStandardMaterial).roughness = roughness;
          (mesh.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(0x888888);
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = emissiveIntensity;
          (mesh.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
        }

        switch (mesh.name) {
          case 'left_arm':
          case 'right_arm':
            mesh.visible = showArms;
            mesh.scale.x = sleeveLength;
            break;
          case 'skirt':
            mesh.visible = showSkirt;
            mesh.scale.z = dressWidth;
            mesh.scale.x = dressLength;
            break;
          case 'skirt2':
            mesh.visible = showSkirt2;
            mesh.scale.z = dressWidth;
            mesh.scale.x = dressLength;
            break;
          case 'lace_shirt':
            mesh.visible = showLaceShirt;
            mesh.scale.y = neckHeight;
            mesh.scale.z = neckWidth;
            break;
          case 'top2':
            mesh.visible = showTop;
            break;
          case 'dress_3':
            mesh.visible = showDress3;
            break;
          case 'top_3':
            mesh.visible = showTop3;
            break;
          case 'shorder_2':
            mesh.visible = showShoulder2;
            break;
        }
      }
    });
  }, [
    scene, metalness, roughness, emissiveIntensity,
    sleeveLength, dressLength, dressWidth, neckHeight, neckWidth,
    showArms, showSkirt, showLaceShirt, showTop, showSkirt2,
    showDress3, showTop3, showShoulder2
  ]);

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
      <Leva collapsed={false} />
    </div>
  );
};

export default Sketch;
