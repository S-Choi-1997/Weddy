import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import React, { useEffect, useState } from 'react';
import '../App.css';

// ToggleButton의 Props 타입 정의
interface ToggleButtonProps {
  label: string;
  image: string;
  isVisible: boolean;
  onClick: () => void;
}

// 커스텀 이미지 버튼 컴포넌트
const ToggleButton: React.FC<ToggleButtonProps> = ({ label, image, isVisible, onClick }) => {
  return (
    <div className={`toggle-button ${isVisible ? 'active' : ''}`} onClick={onClick}>
      <img src={image} alt={label} className="toggle-button-image" />
      <div className="toggle-button-label">{label}</div>
    </div>
  );
};

// PartMeshes의 Props 타입 정의
interface PartMeshesProps {
  visibility: Record<string, boolean>;
  scaleAdjustments: { width?: number; depth?: number };
  modelPath: string;
}

// 각 파트별 컴포넌트 (기본 크기를 유지하면서 scale 조절 가능하게 설정)
const PartMeshes: React.FC<PartMeshesProps> = ({ visibility, scaleAdjustments, modelPath }) => {
  const { scene } = useGLTF(modelPath) as any; // useGLTF 타입 문제로 any로 설정
  const [initialScales, setInitialScales] = useState<Record<string, THREE.Vector3>>({});

  useEffect(() => {
    const newInitialScales: Record<string, THREE.Vector3> = { ...initialScales };

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.visible = visibility[child.name];

        // 각 child의 기본 스케일을 저장
        if (!newInitialScales[child.name]) {
          newInitialScales[child.name] = child.scale.clone(); // 기본 스케일을 복사해 저장
        }

        // 각 부위에 대한 scale 적용
        if (newInitialScales[child.name]) {
          const widthScale = scaleAdjustments.width || 1;
          const depthScale = scaleAdjustments.depth || 1;

          // 드레스와 어깨 각각의 축에 맞게 스케일을 설정
          if (modelPath.includes("dress")) {
            child.scale.set(
              newInitialScales[child.name].x * widthScale, // X축 (넓이) 조정
              newInitialScales[child.name].y * depthScale,  // Y축 (폭) 조정
              newInitialScales[child.name].z                // Z축 고정
            );
          }
        }
      }
    });

    setInitialScales(newInitialScales); // 초기 스케일 저장
  }, [scene, visibility, scaleAdjustments]);

  return <primitive object={scene} />;
};

// CameraSettings 컴포넌트
const CameraSettings: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 1, 0);
    camera.zoom = 1.5;
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

// Sketch 컴포넌트
const Sketch: React.FC = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    dress_1: false,
    dress_2: false,
    dress_3: false,
    dress_4: false,
    dress_5: false,
    top_1: false,
    top_2: false,
    top_3: false,
    top_4: false,
    top_5: false,
    shoulder_1: false,
    shoulder_2: false,
    arm_1: false,
    arm_2: false,
    arm_3: false,
  });

  // Leva 슬라이더로 각 축별 스케일 값을 개별적으로 조정
  const { dressWidthScale, dressDepthScale } = useControls({
    dressWidthScale: {
      value: 0.6,
      min: 0.6,
      max: 1,
      step: 0.1,
      label: "Dress Width Scale"
    },
    dressDepthScale: {
      value: 1,
      min: 1,
      max: 1.5,
      step: 0.1,
      label: "Dress Depth Scale"
    }
  });

  const selectVisibility = (name: string, category: string) => {
    setVisibility((prev) => {
      const updatedVisibility = { ...prev };

      // 선택된 항목의 상태를 토글
      updatedVisibility[name] = !prev[name];

      // 동일 카테고리의 다른 항목은 모두 false로 설정
      Object.keys(updatedVisibility).forEach((key) => {
        if (key.startsWith(category) && key !== name) {
          updatedVisibility[key] = false;
        }
      });

      return updatedVisibility;
    });
  };

  return (
    <div className="app-container">
      <Canvas
        shadows
        camera={{ fov: 40, position: [0, 1, 5] }}
        className="canvas"
      >
        <hemisphereLight groundColor={'#eeeeee'} intensity={1.0} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[5, 15, 10]} angle={0.3} penumbra={1} intensity={1.2} castShadow />

        <PartMeshes
          visibility={visibility}
          scaleAdjustments={{ width: dressWidthScale, depth: dressDepthScale }}
          modelPath="../assets/dress.glb"
        />
        <PartMeshes
          visibility={visibility}
          scaleAdjustments={{}}
          modelPath="../assets/shoulder.glb"
        />
        <PartMeshes
          visibility={visibility}
          scaleAdjustments={{}}
          modelPath="../assets/top.glb"
        />
        <PartMeshes
          visibility={visibility}
          scaleAdjustments={{}}
          modelPath="../assets/arm.glb"
        />

        <Environment preset="sunset" />
        <CameraSettings />
        <OrbitControls target={[0, 1, 0]} enablePan={false} />
      </Canvas>

      <div className="toggle-container">
        <h3 className="toggle-title">Toggle Parts Visibility</h3>

        <div className="toggle-group">
          <h4>Dress</h4>
          {[1, 2, 3, 4, 5].map((num) => (
            <ToggleButton
              key={`dress_${num}`}
              label={`Dress ${num}`}
              image="../assets/아기봇지.jfif"
              isVisible={visibility[`dress_${num}`]}
              onClick={() => selectVisibility(`dress_${num}`, 'dress')}
            />
          ))}
        </div>

        <div className="toggle-group">
          <h4>Top</h4>
          {[1, 2, 3, 4, 5].map((num) => (
            <ToggleButton
              key={`top_${num}`}
              label={`Top ${num}`}
              image="../assets/아기봇지.jfif"
              isVisible={visibility[`top_${num}`]}
              onClick={() => selectVisibility(`top_${num}`, 'top')}
            />
          ))}
        </div>

        <div className="toggle-group">
          <h4>Shoulder</h4>
          {[1, 2].map((num) => (
            <ToggleButton
              key={`shoulder_${num}`}
              label={`Shoulder ${num}`}
              image="../assets/아기봇지.jfif"
              isVisible={visibility[`shoulder_${num}`]}
              onClick={() => selectVisibility(`shoulder_${num}`, 'shoulder')}
            />
          ))}
        </div>

        <div className="toggle-group">
          <h4>Arm</h4>
          {[1, 2, 3].map((num) => (
            <ToggleButton
              key={`arm_${num}`}
              label={`Arm ${num}`}
              image="../assets/아기봇지.jfif"
              isVisible={visibility[`arm_${num}`]}
              onClick={() => selectVisibility(`arm_${num}`, 'arm')}
            />
          ))}
        </div>
      </div>

      <Leva collapsed />
    </div>
  );
};

export default Sketch;
