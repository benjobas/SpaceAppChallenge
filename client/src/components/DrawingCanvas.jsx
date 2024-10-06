import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const backgroundImage = new Image();
      backgroundImage.src = "../../TOI-2445-b.png";

      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      };

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.strokeStyle = 'white'; 
    ctx.lineWidth = 2;
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleClose = () => {
    onClose();
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;

    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click()
  }
  return (
    isOpen && (
      <div className="drawing-modal" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          style={{ 
            border: "1px solid black", 
            backgroundColor: "transparent", 
            display: "block" 
          }}
        />
        <button onClick={exportAsImage} style={{ position: "absolute", top: 10, left: 10 }}>Export as Image</button>
        <button onClick={handleClose} style={{ position: "absolute", top: 10, right: 10 }}>Close</button>
      </div>
    )
  );
};

export default DrawingCanvas;
