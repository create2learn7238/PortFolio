import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';

export default function Taskbar() {
  const { toggleStartMenu, isStartMenuOpen, windows, activeWindowId, focusWindow, minimizeWindow } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (w) => {
    if (activeWindowId === w.id && !w.isMinimized) {
      minimizeWindow(w.id);
    } else {
      focusWindow(w.id);
    }
  };

  return (
    <div className="h-[30px] w-full flex items-stretch select-none relative flex-shrink-0" style={{ zIndex: 9999, background: 'linear-gradient(180deg, #1f5fc7 0%, #3a81ee 3%, #2f6fe0 5%, #2660ce 50%, #2255c2 95%, #1941a5 100%)' }}>
      
      {/* ═══ START BUTTON ═══ */}
      <button 
        onClick={toggleStartMenu}
        className="h-full flex items-center cursor-pointer border-0 outline-none px-1 relative overflow-hidden"
        style={{
          background: isStartMenuOpen
            ? 'linear-gradient(180deg, #1a6e18 0%, #2d8a2a 8%, #287d25 50%, #1e6b1c 92%, #155613 100%)'
            : 'linear-gradient(180deg, #3c9a2f 0%, #5cb84e 8%, #3e9c30 50%, #2d8a2a 92%, #1e7a1b 100%)',
          borderRadius: '0 8px 8px 0',
          minWidth: '100px',
          boxShadow: isStartMenuOpen ? 'inset 0 2px 4px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Windows flag icon */}
        <span className="ml-1 mr-[6px] relative flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
          <svg viewBox="0 0 20 20" width="20" height="20">
            <rect x="1" y="1" width="8" height="8" rx="0.5" fill="#FF0000" opacity="0.95"/>
            <rect x="11" y="1" width="8" height="8" rx="0.5" fill="#00A651" opacity="0.95"/>
            <rect x="1" y="11" width="8" height="8" rx="0.5" fill="#0078D7" opacity="0.95"/>
            <rect x="11" y="11" width="8" height="8" rx="0.5" fill="#FFB900" opacity="0.95"/>
          </svg>
        </span>
        <span className="text-white font-bold italic text-[13px] pr-2" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.4)', letterSpacing: '0.5px' }}>start</span>
      </button>

      {/* ═══ QUICK LAUNCH ═══ */}
      <div className="flex items-center px-1 gap-[2px] border-l border-[#1a50b6]/50 ml-[2px]" style={{ borderRight: '1px solid rgba(255,255,255,0.15)' }}>
        <QuickLaunchIcon icon="bi-pc-display" title="Show Desktop" />
        <QuickLaunchIcon icon="bi-globe" title="Internet Explorer" />
        <QuickLaunchIcon icon="bi-envelope" title="Outlook Express" />
      </div>

      {/* ═══ TASK TABS ═══ */}
      <div className="flex flex-1 items-center px-1 gap-[3px] overflow-x-auto">
        {windows.map((w) => {
          const isActive = activeWindowId === w.id && !w.isMinimized;
          return (
            <button 
              key={w.id}
              onClick={() => handleTaskClick(w)}
              className="h-[22px] max-w-[160px] min-w-[110px] flex items-center px-[6px] cursor-pointer truncate text-[11px] text-white border-0 outline-none flex-shrink-0 rounded-[2px]"
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
              {w.iconClass && <i className={`bi ${w.iconClass} mr-[5px] text-[12px]`}></i>}
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* ═══ SYSTEM TRAY / NOTIFICATION AREA ═══ */}
      <div 
        className="flex items-center px-2 gap-[6px] text-white text-[11px] border-l border-[#1a50b6]/50"
        style={{ 
          background: 'linear-gradient(180deg, #0f87e9 0%, #1290ea 5%, #0c6ec0 95%, #0a5da6 100%)',
          minWidth: '90px',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Tray icons */}
        <i className="bi bi-volume-up-fill text-[13px] opacity-80 hover:opacity-100 cursor-pointer" title="Volume"></i>
        <i className="bi bi-shield-fill-check text-[12px] opacity-70 hover:opacity-100 cursor-pointer" title="Security"></i>
        <i className="bi bi-wifi text-[12px] opacity-70 hover:opacity-100 cursor-pointer" title="Network"></i>
        
        {/* Separator */}
        <div className="w-px h-3 bg-white/20"></div>
        
        {/* Clock */}
        <span className="font-normal tracking-wide whitespace-nowrap">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

function QuickLaunchIcon({ icon, title }) {
  return (
    <div 
      className="w-[22px] h-[22px] flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-[2px]" 
      title={title}
    >
      <i className={`bi ${icon} text-white text-[14px] opacity-80 hover:opacity-100`}></i>
    </div>
  );
}
