import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { APP_CONFIGS } from '../../data/portfolioData';
import { playClickSound, playWindowSound } from '../../utils/audio';

const PROMPTS = [
  "👋 Hi! I'm Rover, your Windows XP assistant! Tap me for tips!",
  "💻 Looking for Dixit's top projects? Click 'My Projects' on the desktop!",
  "📜 Check out the 'Certificates' app to verify Coursera degrees!",
  "🎨 Right-click the desktop to change wallpapers in Display Properties!",
  "💣 Want to play Minesweeper or draw in XP Paint?",
  "⚡ Dixit specializes in Python, Django, FastAPI & Web3!",
];

export default function RoverAssistant() {
  const openWindow = useStore((state) => state.openWindow);
  const [promptIdx, setPromptIdx] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIdx((prev) => (prev + 1) % PROMPTS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleNextPrompt = () => {
    playClickSound();
    setPromptIdx((prev) => (prev + 1) % PROMPTS.length);
  };

  const handleQuickLaunchProjects = () => {
    playWindowSound();
    const config = APP_CONFIGS['projects'];
    openWindow({
      id: 'projects',
      title: config.title,
      iconClass: config.iconClass,
      defaultWidth: config.width,
      defaultHeight: config.height,
    });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => { setIsMinimized(false); playClickSound(); }}
        className="fixed bottom-10 right-3 z-40 bg-amber-400 border-2 border-white rounded-full p-2 shadow-lg hover:scale-110 active:scale-95 cursor-pointer transition-all"
        title="Open Rover Assistant"
      >
        <span className="text-xl">🐶</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-10 right-2 sm:right-4 z-40 flex flex-col items-end pointer-events-auto select-none max-w-[260px] sm:max-w-[300px]">
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="bg-amber-50 border-2 border-amber-800 rounded-lg p-2.5 shadow-xl mb-1 text-xs text-amber-950 font-tahoma relative animate-fade-in">
          {/* Close speech bubble button */}
          <button
            onClick={() => setShowSpeech(false)}
            className="absolute top-1 right-1 text-amber-800 hover:text-red-600 font-bold px-1"
          >
            ✕
          </button>
          
          <p className="pr-4 leading-snug">{PROMPTS[promptIdx]}</p>
          
          <div className="mt-2 pt-1 border-t border-amber-200 flex justify-between items-center text-[10px]">
            <button
              onClick={handleQuickLaunchProjects}
              className="text-blue-800 font-bold hover:underline cursor-pointer"
            >
              Open Projects →
            </button>
            <button
              onClick={handleNextPrompt}
              className="text-amber-700 hover:underline cursor-pointer"
            >
              Next Tip ➔
            </button>
          </div>

          {/* Bubble tail */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-amber-50 border-r-2 border-b-2 border-amber-800 transform rotate-45"></div>
        </div>
      )}

      {/* Rover Dog Mascot */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsMinimized(true)}
          className="text-[10px] bg-gray-800/60 text-white px-1.5 py-0.5 rounded hover:bg-gray-800 cursor-pointer"
          title="Minimize Assistant"
        >
          Hide
        </button>
        <div
          onClick={() => { setShowSpeech(true); handleNextPrompt(); }}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full border-2 border-amber-700 shadow-xl flex items-center justify-center text-2xl sm:text-3xl cursor-pointer hover:scale-105 active:scale-95 transition-all relative group"
        >
          🐶
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border border-white"></div>
        </div>
      </div>
    </div>
  );
}
