import React, { useRef, useState, useEffect } from 'react';

const Sketch = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [eraserSize, setEraserSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 414;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
      }
    }
  }, []);

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault(); // 기본 동작 방지
    setIsDrawing(true);
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      ctx.strokeStyle = isErasing
        ? getComputedStyle(document.documentElement).getPropertyValue('--color-main1')
        : 'black';
      ctx.lineWidth = isErasing ? eraserSize : 5;
    }
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    event.preventDefault(); // 기본 동작 방지
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = isErasing
        ? getComputedStyle(document.documentElement).getPropertyValue('--color-main1')
        : 'black';
      ctx.lineWidth = isErasing ? eraserSize : 5;
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const handleEraserSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEraserSize(Number(event.target.value));
  };

  const getEventCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in event) {
      const touch = event.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      return {
        offsetX: touch.clientX - (rect?.left ?? 0),
        offsetY: touch.clientY - (rect?.top ?? 0),
      };
    } else {
      return {
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
      };
    }
  };

  return (
    <div>
      <button onClick={toggleEraser} style={{ marginBottom: '10px' }}>
        {isErasing ? '연필 모드' : '지우개 모드'}
      </button>
      {isErasing && (
        <div style={{ marginBottom: '10px' }}>
          <label>
            지우개 크기:
            <input
              type="range"
              min="5"
              max="50"
              value={eraserSize}
              onChange={handleEraserSizeChange}
            />
          </label>
        </div>
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ border: '1px solid black', width: '414px' }}
      />
    </div>
  );
};

export default Sketch;