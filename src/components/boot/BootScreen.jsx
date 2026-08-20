import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function BootScreen() {
  const bootOS = useStore((state) => state.bootOS);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(bootOS, 500); // Wait a tiny bit before switching
          return 100;
        }
        return old + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [bootOS]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-tahoma text-white">
      {/* XP Logo Placeholder */}
      <div className="mb-12 flex flex-col items-center">
        <h1 className="text-6xl font-bold italic tracking-tighter">
          Windows<span className="text-orange-alert font-normal">XP</span>
        </h1>
        <p className="text-lg mt-2 font-light">Professional</p>
      </div>

      {/* Loading Bar */}
      <div className="w-48 h-4 border-2 border-gray-600 rounded-sm p-[2px] flex items-center bg-black overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        {/* Animated scrolling boxes effect */}
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-around">
           <div className="w-1 h-full bg-black opacity-30"></div>
           <div className="w-1 h-full bg-black opacity-30"></div>
           <div className="w-1 h-full bg-black opacity-30"></div>
           <div className="w-1 h-full bg-black opacity-30"></div>
        </div>
      </div>
      
      <div className="mt-24 text-gray-500 text-sm">
        Copyright © Microsoft Corporation
      </div>
    </div>
  );
}
