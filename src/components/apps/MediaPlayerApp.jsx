import { useState, useEffect, useRef } from 'react';
import { playClickSound } from '../../utils/audio';

const PLAYLIST = [
  { id: 1, title: "Windows XP Welcome Tune (Synthwave Remix)", duration: "2:45", genre: "Lo-Fi / Ambient" },
  { id: 2, title: "Dixit Patel - Backend Code Beats", duration: "3:12", genre: "Chillhop" },
  { id: 3, title: "Bliss Meadow Sunset Theme", duration: "2:18", genre: "Ambient Synth" },
];

export default function MediaPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(25);
  const canvasRef = useRef(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Animated visualizer
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let bars = Array(24).fill(10);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bars.length;

      bars.forEach((b, i) => {
        const height = isPlaying
          ? Math.min(canvas.height - 10, Math.max(5, b + (Math.random() - 0.5) * 20))
          : 6;
        bars[i] = height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#00ffcc');
        gradient.addColorStop(0.5, '#0099ff');
        gradient.addColorStop(1, '#ff00aa');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 1, canvas.height - height, barWidth - 2, height);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const togglePlay = () => {
    playClickSound();
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    playClickSound();
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = () => {
    playClickSound();
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  return (
    <div className="h-full flex flex-col bg-[#111927] text-white font-tahoma overflow-hidden select-none">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#1c2c4c] to-[#0c1628] p-2 border-b border-blue-900 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-bold text-blue-300">
          <i className="bi bi-play-btn-fill text-base text-blue-400"></i>
          <span>Windows Media Player 10</span>
        </div>
        <div className="text-[10px] text-gray-400">Now Playing</div>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 p-3 flex flex-col items-center justify-between bg-gradient-to-b from-[#0b121e] to-[#1a273e]">
        {/* Visualizer Display Box */}
        <div className="w-full h-36 bg-black rounded border-2 border-blue-800/60 p-2 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex justify-between items-center text-xs text-blue-300 z-10">
            <span className="font-semibold truncate">{currentTrack.title}</span>
            <span className="text-[10px] bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-200">{currentTrack.genre}</span>
          </div>

          <canvas ref={canvasRef} width={400} height={70} className="w-full h-full my-1" />

          {/* Progress bar */}
          <div className="w-full bg-gray-800 h-1.5 rounded overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            setProgress(Math.round((clickX / rect.width) * 100));
          }}>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Playlist Selector */}
        <div className="w-full bg-[#121c2e] border border-blue-900/40 rounded p-1.5 my-2">
          <div className="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Playlist</div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {PLAYLIST.map((track, idx) => (
              <div
                key={track.id}
                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); playClickSound(); }}
                className={`p-1.5 rounded text-xs flex justify-between items-center cursor-pointer ${
                  currentTrackIndex === idx ? 'bg-blue-600 text-white font-bold' : 'hover:bg-blue-950/60 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <i className={`bi ${currentTrackIndex === idx && isPlaying ? 'bi-soundwave text-green-400' : 'bi-music-note-beamed'}`}></i>
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="text-[10px] opacity-75">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="w-full bg-gradient-to-r from-[#17253d] via-[#23385a] to-[#17253d] border border-blue-800/80 rounded-lg p-2 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-300 text-white flex items-center justify-center hover:from-blue-500 hover:to-blue-700 active:scale-95 cursor-pointer shadow"
            >
              <i className="bi bi-skip-start-fill text-sm"></i>
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-b from-cyan-500 to-blue-700 border-2 border-white text-white flex items-center justify-center hover:from-cyan-400 hover:to-blue-600 active:scale-95 cursor-pointer shadow-md"
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-xl`}></i>
            </button>
            <button
              onClick={nextTrack}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-300 text-white flex items-center justify-center hover:from-blue-500 hover:to-blue-700 active:scale-95 cursor-pointer shadow"
            >
              <i className="bi bi-skip-end-fill text-sm"></i>
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <i className={`bi ${volume === 0 ? 'bi-volume-mute-fill text-red-400' : 'bi-volume-up-fill text-blue-300'} text-base`}></i>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer h-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
