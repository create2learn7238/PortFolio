import { useState } from 'react';
import { playClickSound } from '../../utils/audio';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [prevVal, setPrevVal] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newInput, setNewInput] = useState(true);

  const handleDigit = (digit) => {
    playClickSound();
    if (newInput || display === '0') {
      setDisplay(String(digit));
      setNewInput(false);
    } else {
      setDisplay((prev) => (prev.length < 12 ? prev + digit : prev));
    }
  };

  const handleDecimal = () => {
    playClickSound();
    if (newInput) {
      setDisplay('0.');
      setNewInput(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleOp = (op) => {
    playClickSound();
    const current = parseFloat(display);
    if (prevVal !== null && operation && !newInput) {
      const result = calculate(prevVal, current, operation);
      setDisplay(String(result));
      setPrevVal(result);
    } else {
      setPrevVal(current);
    }
    setOperation(op);
    setNewInput(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    playClickSound();
    if (prevVal !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(prevVal, current, operation);
      setDisplay(String(result));
      setPrevVal(null);
      setOperation(null);
      setNewInput(true);
    }
  };

  const handleClear = () => {
    playClickSound();
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setNewInput(true);
  };

  const handleBackspace = () => {
    playClickSound();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewInput(true);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#ece9d8] p-2 select-none font-mono text-xs overflow-y-auto">
      {/* Menu bar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 px-1 py-0.5 text-xs flex gap-3 font-tahoma mb-2">
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Main Display Box */}
      <div className="bg-white border-2 border-gray-500 shadow-inner p-2 text-right text-xl font-bold font-mono tracking-wider mb-3 text-black overflow-x-auto">
        {display}
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-5 gap-1.5 flex-1">
        {/* Memory Column */}
        <button onClick={() => { setMemory(0); playClickSound(); }} className="calc-btn text-red-700">MC</button>
        <button onClick={handleBackspace} className="calc-btn text-blue-700">Back</button>
        <button onClick={handleClear} className="calc-btn text-red-700">CE</button>
        <button onClick={handleClear} className="calc-btn text-red-700">C</button>
        <button onClick={() => handleOp('/')} className="calc-btn text-blue-700 font-bold">/</button>

        <button onClick={() => { setDisplay(String(memory)); playClickSound(); }} className="calc-btn text-red-700">MR</button>
        <button onClick={() => handleDigit(7)} className="calc-btn text-black font-bold">7</button>
        <button onClick={() => handleDigit(8)} className="calc-btn text-black font-bold">8</button>
        <button onClick={() => handleDigit(9)} className="calc-btn text-black font-bold">9</button>
        <button onClick={() => handleOp('*')} className="calc-btn text-blue-700 font-bold">*</button>

        <button onClick={() => { setMemory(parseFloat(display)); playClickSound(); }} className="calc-btn text-red-700">MS</button>
        <button onClick={() => handleDigit(4)} className="calc-btn text-black font-bold">4</button>
        <button onClick={() => handleDigit(5)} className="calc-btn text-black font-bold">5</button>
        <button onClick={() => handleDigit(6)} className="calc-btn text-black font-bold">6</button>
        <button onClick={() => handleOp('-')} className="calc-btn text-blue-700 font-bold">-</button>

        <button onClick={() => { setMemory((m) => m + parseFloat(display)); playClickSound(); }} className="calc-btn text-red-700">M+</button>
        <button onClick={() => handleDigit(1)} className="calc-btn text-black font-bold">1</button>
        <button onClick={() => handleDigit(2)} className="calc-btn text-black font-bold">2</button>
        <button onClick={() => handleDigit(3)} className="calc-btn text-black font-bold">3</button>
        <button onClick={() => handleOp('+')} className="calc-btn text-blue-700 font-bold">+</button>

        <button onClick={() => { setDisplay(String(Math.sqrt(parseFloat(display)))); playClickSound(); }} className="calc-btn text-blue-700">sqrt</button>
        <button onClick={() => handleDigit(0)} className="calc-btn text-black font-bold">0</button>
        <button onClick={() => { setDisplay(String(-parseFloat(display))); playClickSound(); }} className="calc-btn text-black">+/-</button>
        <button onClick={handleDecimal} className="calc-btn text-black font-bold">.</button>
        <button onClick={handleEquals} className="calc-btn bg-blue-600 text-white font-bold hover:bg-blue-700">=</button>
      </div>

      <style>{`
        .calc-btn {
          border: 1px solid #707070;
          background: linear-gradient(180deg, #ffffff 0%, #ece9d8 100%);
          padding: 6px 4px;
          border-radius: 3px;
          cursor: pointer;
          user-select: none;
          box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #999;
          touch-action: manipulation;
        }
        .calc-btn:active {
          box-shadow: inset 1px 1px 0 #888, inset -1px -1px 0 #fff;
          background: #d8d4c4;
        }
      `}</style>
    </div>
  );
}
