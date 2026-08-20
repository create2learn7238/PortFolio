import { useStore } from '../../store/useStore';
import { DESKTOP_ICONS, APP_CONFIGS } from '../../data/portfolioData';
import { getDesktopIcon } from '../icons/XPIcons';

export default function Desktop() {
  const openWindow = useStore((state) => state.openWindow);
  const closeStartMenu = useStore((state) => state.closeStartMenu);

  const handleIconDoubleClick = (icon) => {
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
        defaultWidth: config.width,
        defaultHeight: config.height,
      });
    }
  };

  return (
    <div 
      className="absolute inset-0 z-0 p-2 flex flex-col flex-wrap content-start gap-0"
      onClick={closeStartMenu}
    >
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className="w-[76px] h-[86px] flex flex-col items-center justify-start group cursor-pointer p-1"
          onDoubleClick={() => handleIconDoubleClick(icon)}
        >
          {/* Classic XP SVG Icon */}
          <div className="w-[48px] h-[48px] flex items-center justify-center mb-[2px] group-hover:brightness-125 transition-all" style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.4))' }}>
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
    </div>
  );
}
