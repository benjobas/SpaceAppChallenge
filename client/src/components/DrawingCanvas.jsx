import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false)
  const [constellationName, setConstellationName] = useState('constellation'); 

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
    setHasDrawn(true)
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
    link.download = `${constellationName}.png`;
    link.click();
  };

  return (
    isOpen && (
      <div className="drawing-modal" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1000 }}>
        {!hasDrawn && (
            <h1 style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", color: "white", backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "10px", borderRadius: "5px", border: "2px solid white" }}>
  Empieza a dibujar
</h1>

        )}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          style={{ 
            border: "1px solid black", 
            backgroundColor: "transparent", 
            display: "block",
            cursor:`url('../../rocketCursor.png'), auto`
          }}
        />
        <label style={{ position: "absolute", top: 10, left: 300 }}>
          Nombra tu constelación
          <input
            type="text"
            value={constellationName}
            onChange={(e) => setConstellationName(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
        <button className="button-29" onClick={exportAsImage} style={{ position: "absolute", top: 10, left: 10 }}>Descargar</button>
        <button className="button-29" onClick={handleClose} style={{ position: "absolute", top: 10, right: 10 }}>Cerrar</button>
      </div>
    )
  );
};

export default DrawingCanvas;
