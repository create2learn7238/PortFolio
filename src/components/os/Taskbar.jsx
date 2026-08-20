import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';
import { playClickSound, playWindowSound, toggleMute, getMuteState } from '../../utils/audio';

export default function Taskbar() {
  const { toggleStartMenu, isStartMenuOpen, windows, activeWindowId, focusWindow, minimizeWindow, openWindow } = useStore();
  const [time, setTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(getMuteState());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleStartToggle = () => {
    playClickSound();
    toggleStartMenu();
  };

  const handleTaskClick = (w) => {
    playWindowSound();
    if (activeWindowId === w.id && !w.isMinimized) {
      minimizeWindow(w.id);
    } else {
      focusWindow(w.id);
    }
  };

  const handleVolumeToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="h-[36px] sm:h-[30px] w-full flex items-stretch select-none relative flex-shrink-0" style={{ zIndex: 9999, background: 'linear-gradient(180deg, #1f5fc7 0%, #3a81ee 3%, #2f6fe0 5%, #2660ce 50%, #2255c2 95%, #1941a5 100%)' }}>
      
      {/* ═══ START BUTTON ═══ */}
      <button 
        onClick={handleStartToggle}
        className="h-full flex items-center cursor-pointer border-0 outline-none px-1.5 sm:px-1 relative overflow-hidden active:brightness-90 transition-all touch-action-manipulation flex-shrink-0"
        style={{
          background: isStartMenuOpen
            ? 'linear-gradient(180deg, #1a6e18 0%, #2d8a2a 8%, #287d25 50%, #1e6b1c 92%, #155613 100%)'
            : 'linear-gradient(180deg, #3c9a2f 0%, #5cb84e 8%, #3e9c30 50%, #2d8a2a 92%, #1e7a1b 100%)',
          borderRadius: '0 8px 8px 0',
          minWidth: '85px',
          boxShadow: isStartMenuOpen ? 'inset 0 2px 4px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Windows flag icon */}
        <span className="ml-0.5 sm:ml-1 mr-[4px] sm:mr-[6px] relative flex items-center justify-center flex-shrink-0" style={{ width: '18px', height: '18px' }}>
          <svg viewBox="0 0 20 20" width="18" height="18">
            <rect x="1" y="1" width="8" height="8" rx="0.5" fill="#FF0000" opacity="0.95"/>
            <rect x="11" y="1" width="8" height="8" rx="0.5" fill="#00A651" opacity="0.95"/>
            <rect x="1" y="11" width="8" height="8" rx="0.5" fill="#0078D7" opacity="0.95"/>
            <rect x="11" y="11" width="8" height="8" rx="0.5" fill="#FFB900" opacity="0.95"/>
          </svg>
        </span>
        <span className="text-white font-bold italic text-[13px] sm:text-[13px] pr-1 sm:pr-2" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.4)', letterSpacing: '0.5px' }}>start</span>
      </button>

      {/* ═══ QUICK LAUNCH ═══ */}
      <div className="hidden sm:flex items-center px-1 gap-[2px] border-l border-[#1a50b6]/50 ml-[2px]" style={{ borderRight: '1px solid rgba(255,255,255,0.15)' }}>
        <QuickLaunchIcon icon="bi-pc-display" title="Show Desktop" onClick={() => openWindow({ id: 'about', title: 'My Computer', width: 620, height: 480 })} />
        <QuickLaunchIcon icon="bi-sliders2" title="Display Properties" onClick={() => openWindow({ id: 'settings', title: 'Display Properties', width: 500, height: 440 })} />
        <QuickLaunchIcon icon="bi-play-btn-fill" title="Media Player" onClick={() => openWindow({ id: 'mediaplayer', title: 'Windows Media Player', width: 520, height: 400 })} />
      </div>

      {/* ═══ TASK TABS ═══ */}
      <div className="flex flex-1 items-center px-1 gap-[3px] overflow-x-auto no-scrollbar">
        {windows.map((w) => {
          const isActive = activeWindowId === w.id && !w.isMinimized;
          return (
            <button 
              key={w.id}
              onClick={() => handleTaskClick(w)}
              className="h-[26px] sm:h-[22px] max-w-[130px] sm:max-w-[160px] min-w-[70px] sm:min-w-[110px] flex items-center px-[6px] cursor-pointer truncate text-[11px] text-white border-0 outline-none flex-shrink-0 rounded-[2px] active:scale-95 transition-transform touch-action-manipulation"
              style={{
                background: isActive
                  ? 'linear-gradient(180deg, #1c5fbd 0%, #2d77d8 50%, #1c5fbd 100%)'
                  : 'linear-gradient(180deg, #3a7fef 0%, #4a90f5 50%, #3a7fef 100%)',
                boxShadow: isActive
                  ? 'inset 0 1px 3px rgba(0,0,0,0.4)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
              title={w.title}
            >
              {w.iconClass && <i className={`bi ${w.iconClass} mr-[4px] sm:mr-[5px] text-[12px]`}></i>}
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ SYSTEM TRAY / NOTIFICATION AREA ═══ */}
      <div 
        className="flex items-center px-1.5 sm:px-2 gap-1.5 sm:gap-[6px] text-white text-[11px] border-l border-[#1a50b6]/50 flex-shrink-0"
        style={{ 
          background: 'linear-gradient(180deg, #0f87e9 0%, #1290ea 5%, #0c6ec0 95%, #0a5da6 100%)',
          minWidth: '60px',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Tray icons */}
        <i
          className={`bi ${isMuted ? 'bi-volume-mute-fill text-red-300' : 'bi-volume-up-fill text-white'} text-[12px] sm:text-[13px] opacity-90 hover:opacity-100 cursor-pointer active:scale-95`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          onClick={handleVolumeToggle}
        ></i>
        <i className="bi bi-shield-fill-check text-[11px] sm:text-[12px] opacity-70 hover:opacity-100 cursor-pointer hidden sm:inline-block" title="Security"></i>
        <i className="bi bi-wifi text-[11px] sm:text-[12px] opacity-70 hover:opacity-100 cursor-pointer hidden sm:inline-block" title="Network"></i>
        
        {/* Separator */}
        <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
        
        {/* Clock */}
        <span className="font-normal tracking-wide whitespace-nowrap text-[10px] sm:text-[11px]">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

function QuickLaunchIcon({ icon, title, onClick }) {
  const handleClick = () => {
    playClickSound();
    if (onClick) onClick();
  };

  return (
    <div 
      onClick={handleClick}
      className="w-[22px] h-[22px] flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-[2px]" 
      title={title}
    >
      <i className={`bi ${icon} text-white text-[14px] opacity-80 hover:opacity-100`}></i>
    </div>
  );
}
