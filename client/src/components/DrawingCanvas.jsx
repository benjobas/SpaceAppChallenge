import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext("2d");

        const backgroundImage = new Image();
        backgroundImage.src = "../../TOI-2445-b.png";

        backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
    }
}, [isOpen]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = 'white'; // Color del trazo
    ctx.lineWidth = 2; // Ancho del trazo
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className="drawing-modal">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          style={{ border: "1px solid black", backgroundColor: "transparent" }}
        />
        <button onClick={handleClose}>Cerrar</button>
      </div>
    )
  );
};

export default DrawingCanvas;
