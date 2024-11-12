import { capturedImageState } from "@/store/imageState";
import { useRecoilState } from "recoil";

const Test = () => {
  const [capturedImage] = useRecoilState(capturedImageState);
  console.log(capturedImage);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {capturedImage && (
        <>
          <img src={URL.createObjectURL(capturedImage)} alt="Captured" style={{ width: '100%' }} />
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            스튜디오명
          </div>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            드레스명
          </div>
        </>
      )}
    </div>
  );
}

export default Test;
