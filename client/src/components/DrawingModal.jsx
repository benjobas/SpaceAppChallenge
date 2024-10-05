import React, { useState } from "react";

const DrawingModal = ({ isOpen, onClose }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = React.useRef(null);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
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

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Arma tu constelación</h2>
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            style={{ border: "1px solid black" }}
          />
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
}

export default DrawingModal;