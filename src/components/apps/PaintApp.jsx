import { useRef, useState, useEffect } from 'react';
import { playClickSound } from '../../utils/audio';

const PALETTE = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#34495e',
];

export default function PaintApp() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('pencil'); // pencil, brush, eraser
  const [size, setSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const isDrawingRef = useRef(false);

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineWidth = tool === 'eraser' ? size * 4 : tool === 'brush' ? size * 2 : size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineWidth = tool === 'eraser' ? size * 4 : tool === 'brush' ? size * 2 : size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col bg-[#ece9d8] overflow-hidden select-none">
      {/* Menu bar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 px-2 py-0.5 text-xs flex items-center gap-3">
        <span className="cursor-pointer hover:bg-[#316ac5] hover:text-white px-1">File</span>
        <span className="cursor-pointer hover:bg-[#316ac5] hover:text-white px-1">Edit</span>
        <span className="cursor-pointer hover:bg-[#316ac5] hover:text-white px-1">View</span>
        <span className="cursor-pointer hover:bg-[#316ac5] hover:text-white px-1">Image</span>
        <span className="cursor-pointer hover:bg-[#316ac5] hover:text-white px-1" onClick={clearCanvas}>Clear Canvas</span>
      </div>

      <div className="flex-1 flex overflow-hidden p-1 gap-1">
        {/* Left Toolbar */}
        <div className="w-12 bg-[#ece9d8] border border-gray-400 p-1 flex flex-col items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => { setTool('pencil'); playClickSound(); }}
            className={`w-9 h-9 border border-gray-400 flex items-center justify-center rounded cursor-pointer ${
              tool === 'pencil' ? 'bg-[#c0c0c0] shadow-inner font-bold border-blue-600' : 'bg-white hover:bg-gray-100'
            }`}
            title="Pencil"
          >
            ✏️
          </button>
          <button
            onClick={() => { setTool('brush'); playClickSound(); }}
            className={`w-9 h-9 border border-gray-400 flex items-center justify-center rounded cursor-pointer ${
              tool === 'brush' ? 'bg-[#c0c0c0] shadow-inner font-bold border-blue-600' : 'bg-white hover:bg-gray-100'
            }`}
            title="Brush"
          >
            🖌️
          </button>
          <button
            onClick={() => { setTool('eraser'); playClickSound(); }}
            className={`w-9 h-9 border border-gray-400 flex items-center justify-center rounded cursor-pointer ${
              tool === 'eraser' ? 'bg-[#c0c0c0] shadow-inner font-bold border-blue-600' : 'bg-white hover:bg-gray-100'
            }`}
            title="Eraser"
          >
            🧹
          </button>
          
          <div className="w-full h-px bg-gray-400 my-1"></div>

          {/* Size picker */}
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-[9px] text-gray-600">Size</span>
            {[2, 5, 8].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-7 h-5 flex items-center justify-center rounded border ${size === s ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}
              >
                <div className="rounded-full bg-black" style={{ width: `${s * 1.8}px`, height: `${s * 1.8}px` }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-500 overflow-auto p-2 flex items-center justify-center border border-gray-400">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="bg-white border border-black shadow-lg cursor-crosshair max-w-full touch-none"
          />
        </div>
      </div>

      {/* Palette Footer */}
      <div className="bg-[#ece9d8] border-t border-gray-400 p-1.5 flex items-center gap-2 flex-shrink-0">
        {/* Selected color indicator */}
        <div className="w-6 h-6 border-2 border-black rounded shadow" style={{ backgroundColor: tool === 'eraser' ? '#ffffff' : color }}></div>

        {/* Colors grid */}
        <div className="flex flex-wrap gap-1 flex-1">
          {PALETTE.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); if (tool === 'eraser') setTool('pencil'); playClickSound(); }}
              className={`w-5 h-5 rounded-sm border ${color === c ? 'border-black scale-110 shadow' : 'border-gray-400'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
