import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { DESKTOP_ICONS, APP_CONFIGS } from '../../data/portfolioData';
import { getDesktopIcon } from '../icons/XPIcons';
import { playClickSound, playWindowSound, playShutdownSound } from '../../utils/audio';

export default function Desktop() {
  const { openWindow, closeStartMenu, logoutUser } = useStore();
  const [contextMenu, setContextMenu] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);

  const handleOpenIcon = (icon) => {
    playWindowSound();
    if (icon.type === 'link') {
      window.open(icon.url, '_blank');
      return;
    }
    if (icon.type === 'system') return;

    const config = APP_CONFIGS[icon.id];
    if (config) {
      openWindow({
        id: icon.id,
        title: config.title,
        iconClass: config.iconClass,
        defaultWidth: config.width,
        defaultHeight: config.height,
      });
    }
  };

  const handleSingleClick = (icon, e) => {
    e.stopPropagation();
    playClickSound();
    // On mobile devices / screen widths < 768px, single tap opens app!
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      handleOpenIcon(icon);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    playClickSound();
    const x = Math.min(e.clientX, window.innerWidth - 180);
    const y = Math.min(e.clientY, window.innerHeight - 180);
    setContextMenu({ x, y });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Primary click only
    setDragStart({ x: e.clientX, y: e.clientY });
    setSelectionBox(null);
    if (contextMenu) setContextMenu(null);
    closeStartMenu();
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const left = Math.min(dragStart.x, currentX);
    const top = Math.min(dragStart.y, currentY);
    const width = Math.abs(currentX - dragStart.x);
    const height = Math.abs(currentY - dragStart.y);

    if (width > 5 || height > 5) {
      setSelectionBox({ left, top, width, height });
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setSelectionBox(null);
  };

  return (
    <div 
      className="absolute inset-0 z-0 p-2 sm:p-3 flex flex-col flex-wrap content-start gap-1 sm:gap-2 overflow-y-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Selection Box Marquee */}
      {selectionBox && (
        <div
          className="fixed border border-[#316ac5] bg-[#316ac5]/25 z-10 pointer-events-none"
          style={{
            left: `${selectionBox.left}px`,
            top: `${selectionBox.top}px`,
            width: `${selectionBox.width}px`,
            height: `${selectionBox.height}px`,
          }}
        />
      )}
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className="w-[78px] sm:w-[76px] min-h-[86px] flex flex-col items-center justify-start group cursor-pointer p-1 active:scale-95 transition-transform select-none"
          onClick={(e) => handleSingleClick(icon, e)}
          onDoubleClick={() => handleOpenIcon(icon)}
        >
          {/* Classic XP SVG Icon */}
          <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] flex items-center justify-center mb-[2px] group-hover:brightness-125 transition-all" style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.4))' }}>
            {getDesktopIcon(icon.id, 48)}
          </div>
          {/* Label */}
          <div 
            className="text-white text-[11px] text-center leading-[13px] px-[3px] py-[2px] group-hover:bg-[#316ac5]/70 rounded-[2px] max-w-full break-words"
            style={{ textShadow: '1px 1px 2px #000, -1px -1px 2px #000, 0 0 4px #000' }}
          >
            {icon.title}
          </div>
        </div>
      ))}

      {/* Desktop Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-[#f9f9f9] border border-gray-500 shadow-xl rounded-[2px] py-1 w-44 z-50 text-xs font-tahoma text-black select-none"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2"
            onClick={() => { setContextMenu(null); handleOpenIcon({ id: 'settings', type: 'app' }); }}
          >
            <i className="bi bi-sliders2"></i> Display Properties
          </div>
          <div
            className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2"
            onClick={() => { setContextMenu(null); handleOpenIcon({ id: 'projects', type: 'app' }); }}
          >
            <i className="bi bi-folder-fill text-yellow-500"></i> My Projects
          </div>
          <div
            className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2"
            onClick={() => { setContextMenu(null); handleOpenIcon({ id: 'minesweeper', type: 'app' }); }}
          >
            <i className="bi bi-grid-3x3-gap-fill text-red-500"></i> Play Minesweeper
          </div>
          <div className="h-px bg-gray-300 my-1"></div>
          <div
            className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2"
            onClick={() => { setContextMenu(null); playClickSound(); }}
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh Desktop
          </div>
          <div className="h-px bg-gray-300 my-1"></div>
          <div
            className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center gap-2 text-red-600 hover:text-white"
            onClick={() => { setContextMenu(null); playShutdownSound(); logoutUser(); }}
          >
            <i className="bi bi-box-arrow-right"></i> Log Off...
          </div>
        </div>
      )}
    </div>
  );
}
