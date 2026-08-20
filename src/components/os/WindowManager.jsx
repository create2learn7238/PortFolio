import { useStore } from '../../store/useStore';
import { Rnd } from 'react-rnd';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import EducationApp from '../apps/EducationApp';
import ContactApp from '../apps/ContactApp';
import ResumeApp from '../apps/ResumeApp';
import CertificatesApp from '../apps/CertificatesApp';
import MinesweeperApp from '../apps/MinesweeperApp';
import PaintApp from '../apps/PaintApp';
import MediaPlayerApp from '../apps/MediaPlayerApp';
import DisplayPropertiesApp from '../apps/DisplayPropertiesApp';
import CalculatorApp from '../apps/CalculatorApp';
import TaskManagerApp from '../apps/TaskManagerApp';
import { playWindowSound } from '../../utils/audio';

const APP_COMPONENTS = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  education: EducationApp,
  contact: ContactApp,
  resume: ResumeApp,
  certificates: CertificatesApp,
  minesweeper: MinesweeperApp,
  paint: PaintApp,
  mediaplayer: MediaPlayerApp,
  calculator: CalculatorApp,
  taskmanager: TaskManagerApp,
  settings: DisplayPropertiesApp,
};

export default function WindowManager() {
  const { windows, focusWindow, closeWindow, activeWindowId, minimizeWindow, maximizeWindow } = useStore();

  return (
    <>
      {windows.map((w, idx) => {
        if (w.isMinimized) return null;
        const isActive = activeWindowId === w.id;
        const AppComponent = APP_COMPONENTS[w.id];
        const appIconClass = w.iconClass || 'bi-app';

        const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;
        const renderMaximized = w.isMaximized || isMobileScreen;

        // Maximized window (or mobile view) renders full-size without Rnd
        if (renderMaximized) {
          return (
            <div
              key={w.id}
              onClick={() => focusWindow(w.id)}
              style={{ zIndex: w.zIndex }}
              className="absolute inset-0 flex flex-col bg-[#ece9d8] border-0 sm:border-2 border-[#0054e3]"
            >
              <TitleBar
                title={w.title}
                iconClass={appIconClass}
                isActive={isActive}
                onMinimize={() => minimizeWindow(w.id)}
                onMaximize={() => maximizeWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                isMaximized={true}
                isMobile={isMobileScreen}
              />
              <div className="flex-1 bg-white m-0 sm:m-[2px] border-0 sm:border border-gray-300 overflow-hidden flex flex-col">
                {AppComponent ? <AppComponent /> : <div className="p-4">{w.title}</div>}
              </div>
            </div>
          );
        }

        const defaultWidth = Math.min(w.defaultWidth || 600, (typeof window !== 'undefined' ? window.innerWidth - 20 : 600));
        const defaultHeight = Math.min(w.defaultHeight || 400, (typeof window !== 'undefined' ? window.innerHeight - 80 : 400));
        const posX = 30 + (idx * 25) % 150;
        const posY = 25 + (idx * 25) % 100;

        return (
          <Rnd
            key={w.id}
            default={{
              x: posX,
              y: posY,
              width: defaultWidth,
              height: defaultHeight,
            }}
            minWidth={280}
            minHeight={180}
            bounds="parent"
            onDragStart={() => focusWindow(w.id)}
            onResizeStart={() => focusWindow(w.id)}
            onMouseDown={() => focusWindow(w.id)}
            style={{ zIndex: w.zIndex }}
            className={`flex flex-col bg-[#ece9d8] rounded-t-lg border-2 ${isActive ? 'border-[#0054e3]' : 'border-[#6a91c8]'}`}
            dragHandleClassName="xp-titlebar"
          >
            <TitleBar
              title={w.title}
              iconClass={appIconClass}
              isActive={isActive}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => maximizeWindow(w.id)}
              onClose={() => closeWindow(w.id)}
              isMaximized={false}
              isMobile={false}
            />
            <div className="flex-1 bg-white m-[2px] border border-gray-300 overflow-hidden flex flex-col">
              {AppComponent ? <AppComponent /> : <div className="p-4">{w.title}</div>}
            </div>
          </Rnd>
        );
      })}
    </>
  );
}

function TitleBar({ title, iconClass, isActive, onMinimize, onMaximize, onClose, isMaximized, isMobile }) {
  return (
    <div
      className={`xp-titlebar h-[34px] sm:h-[30px] flex items-center justify-between px-2 sm:px-1.5 cursor-default select-none flex-shrink-0
        ${isMaximized ? '' : 'rounded-t-md'}
        ${isActive ? 'bg-titlebar-gradient' : 'bg-titlebar-inactive'}
      `}
      onDoubleClick={onMaximize}
    >
      <div className="flex items-center text-white font-bold text-[13px] sm:text-[13px] truncate mr-2" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>
        <i className={`bi ${iconClass} text-[15px] sm:text-[14px] mr-1.5`}></i>
        <span className="truncate">{title}</span>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-[2px] flex-shrink-0">
        {/* Minimize */}
        <button
          onClick={(e) => { e.stopPropagation(); playWindowSound(); onMinimize(); }}
          className="w-[26px] h-[26px] sm:w-[21px] sm:h-[21px] bg-gradient-to-b from-[#3c8cf3] to-[#1361d8] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#5da0f5] hover:to-[#2473e4] active:from-[#1a51b0] active:to-[#0f3985] cursor-pointer touch-action-manipulation"
          title="Minimize"
        >
          <i className="bi bi-dash text-[16px] sm:text-[14px]"></i>
        </button>
        {/* Maximize/Restore (Hidden or disabled on small mobile screens if full screen) */}
        {!isMobile && (
          <button
            onClick={(e) => { e.stopPropagation(); playWindowSound(); onMaximize(); }}
            className="w-[26px] h-[26px] sm:w-[21px] sm:h-[21px] bg-gradient-to-b from-[#3c8cf3] to-[#1361d8] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#5da0f5] hover:to-[#2473e4] active:from-[#1a51b0] active:to-[#0f3985] cursor-pointer touch-action-manipulation"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <i className={`bi ${isMaximized ? 'bi-back' : 'bi-square'} text-[11px] sm:text-[10px]`}></i>
          </button>
        )}
        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); playWindowSound(); onClose(); }}
          className="w-[26px] h-[26px] sm:w-[21px] sm:h-[21px] bg-gradient-to-b from-[#e88a67] to-[#c9422c] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#f0a07e] hover:to-[#d4563f] active:from-[#a03020] active:to-[#801810] cursor-pointer touch-action-manipulation"
          title="Close"
        >
          <i className="bi bi-x-lg text-[12px] sm:text-[11px] font-bold"></i>
        </button>
      </div>
    </div>
  );
}
