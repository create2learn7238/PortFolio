import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function BootScreen() {
  const bootOS = useStore((state) => state.bootOS);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          return 100;
        }
        return old + Math.random() * 15;
      });
    }, 250);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeoutId = setTimeout(bootOS, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [progress, bootOS]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-tahoma text-white p-4 select-none">
      {/* XP Logo Placeholder */}
      <div className="mb-8 sm:mb-12 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-bold italic tracking-tighter">
          Windows<span className="text-orange-alert font-normal">XP</span>
        </h1>
        <p className="text-base sm:text-lg mt-2 font-light">Professional</p>
      </div>

      {/* Loading Bar */}
      <div className="w-44 sm:w-48 h-4 border-2 border-gray-600 rounded-sm p-[2px] flex items-center bg-black overflow-hidden relative">
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
      
      <div className="mt-16 sm:mt-24 text-gray-500 text-xs sm:text-sm text-center">
        Copyright © Microsoft Corporation
      </div>
    </div>
  );
}
