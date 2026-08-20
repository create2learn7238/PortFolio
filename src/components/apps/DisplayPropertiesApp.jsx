import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { playClickSound, toggleMute, getMuteState } from '../../utils/audio';

const WALLPAPERS = [
  { id: 'bliss', name: 'Bliss (Default XP)', url: '/assets/bliss.jpg', bgColor: '#3a6ea5' },
  { id: 'royale', name: 'Royale Energy Blue', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80', bgColor: '#1d3557' },
  { id: 'zune', name: 'Zune Dark Mode', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', bgColor: '#111111' },
  { id: 'silver', name: 'Lunar Silver / Aurora', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', bgColor: '#4a5568' },
];

export default function DisplayPropertiesApp() {
  const { currentWallpaper, setWallpaper } = useStore();
  const [selectedWp, setSelectedWp] = useState(currentWallpaper || WALLPAPERS[0]);
  const [isMuted, setIsMuted] = useState(getMuteState());

  const handleApply = () => {
    playClickSound();
    setWallpaper(selectedWp);
  };

  const handleMuteToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="h-full flex flex-col bg-[#ece9d8] p-3 text-xs select-none font-tahoma overflow-y-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-400 mb-3 gap-1">
        <div className="bg-white border-t-2 border-l border-r border-blue-600 px-3 py-1 font-bold rounded-t text-gray-800 shadow-sm">
          Themes & Desktop
        </div>
      </div>

      {/* Monitor Preview Frame */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-56 h-36 bg-gray-900 border-4 border-gray-400 rounded-t-lg p-1.5 shadow-md relative overflow-hidden flex flex-col justify-end">
          {/* Wallpaper background preview */}
          <div
            className="w-full h-full rounded-sm overflow-hidden flex flex-col justify-between p-1 transition-all duration-300"
            style={{
              background: `url('${selectedWp.url}') center/cover no-repeat`,
              backgroundColor: selectedWp.bgColor,
            }}
          >
            <div className="w-6 h-4 bg-white/70 rounded border border-blue-600 text-[6px] p-0.5 font-bold">XP</div>
            <div className="w-full h-2 bg-blue-700/80 rounded-t"></div>
          </div>
        </div>
        {/* Monitor stand */}
        <div className="w-16 h-3 bg-gray-400 border-b border-gray-600"></div>
        <div className="w-28 h-2 bg-gray-500 rounded-full shadow-sm"></div>
      </div>

      {/* Controls Container */}
      <div className="bg-white border border-gray-400 p-3 rounded mb-3">
        <div className="font-bold text-gray-700 mb-2">Background Wallpaper</div>
        <div className="space-y-1 max-h-28 overflow-y-auto mb-3 border border-gray-300 p-1 bg-gray-50">
          {WALLPAPERS.map((wp) => (
            <div
              key={wp.id}
              onClick={() => { setSelectedWp(wp); playClickSound(); }}
              className={`p-1.5 rounded cursor-pointer flex items-center justify-between ${
                selectedWp.id === wp.id ? 'bg-[#316ac5] text-white font-bold' : 'hover:bg-blue-100 text-gray-800'
              }`}
            >
              <span>{wp.name}</span>
              {selectedWp.id === wp.id && <span>✓ Active</span>}
            </div>
          ))}
        </div>

        {/* Audio Sound Settings */}
        <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-700">Windows Audio Effects</div>
            <div className="text-[10px] text-gray-500">Synthesized XP chimes and click sounds</div>
          </div>
          <button
            onClick={handleMuteToggle}
            className={`xp-button flex items-center gap-1 ${isMuted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            <i className={`bi ${isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
            <span>{isMuted ? 'Muted' : 'Sound Enabled'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end gap-2 mt-auto">
        <button onClick={handleApply} className="xp-button font-bold text-blue-800">
          Apply Theme
        </button>
        <button onClick={handleApply} className="xp-button">
          OK
        </button>
      </div>
    </div>
  );
}
