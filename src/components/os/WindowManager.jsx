import { useStore } from '../../store/useStore';
import { Rnd } from 'react-rnd';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import EducationApp from '../apps/EducationApp';
import ContactApp from '../apps/ContactApp';
import ResumeApp from '../apps/ResumeApp';
import CertificatesApp from '../apps/CertificatesApp';

const APP_COMPONENTS = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  education: EducationApp,
  contact: ContactApp,
  resume: ResumeApp,
  certificates: CertificatesApp,
};

export default function WindowManager() {
  const { windows, focusWindow, closeWindow, activeWindowId, minimizeWindow, maximizeWindow } = useStore();

  return (
    <>
      {windows.map((w) => {
        if (w.isMinimized) return null;
        const isActive = activeWindowId === w.id;
        const AppComponent = APP_COMPONENTS[w.id];
        const appIconClass = w.iconClass || 'bi-app';

        // Maximized window renders full-size without Rnd
        if (w.isMaximized) {
          return (
            <div
              key={w.id}
              onClick={() => focusWindow(w.id)}
              style={{ zIndex: w.zIndex }}
              className="absolute inset-0 flex flex-col bg-[#ece9d8] border-2 border-[#0054e3]"
            >
              <TitleBar
                title={w.title}
                iconClass={appIconClass}
                isActive={isActive}
                onMinimize={() => minimizeWindow(w.id)}
                onMaximize={() => maximizeWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                isMaximized={true}
              />
              <div className="flex-1 bg-white m-[2px] border border-gray-300 overflow-hidden flex flex-col">
                {AppComponent ? <AppComponent /> : <div className="p-4">{w.title}</div>}
              </div>
            </div>
          );
        }

        return (
          <Rnd
            key={w.id}
            default={{
              x: 80 + Math.random() * 100,
              y: 30 + Math.random() * 60,
              width: w.defaultWidth || 600,
              height: w.defaultHeight || 400,
            }}
            minWidth={300}
            minHeight={200}
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

function TitleBar({ title, iconClass, isActive, onMinimize, onMaximize, onClose, isMaximized }) {
  return (
    <div
      className={`xp-titlebar h-[30px] flex items-center justify-between px-1.5 cursor-default select-none flex-shrink-0
        ${isMaximized ? '' : 'rounded-t-md'}
        ${isActive ? 'bg-titlebar-gradient' : 'bg-titlebar-inactive'}
      `}
      onDoubleClick={onMaximize}
    >
      <div className="flex items-center text-white font-bold text-[13px] truncate mr-2" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>
        <i className={`bi ${iconClass} text-[14px] mr-[5px]`}></i>
        {title}
      </div>

      <div className="flex items-center space-x-[2px] flex-shrink-0">
        {/* Minimize */}
        <button
          onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          className="w-[21px] h-[21px] bg-gradient-to-b from-[#3c8cf3] to-[#1361d8] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#5da0f5] hover:to-[#2473e4] active:from-[#1a51b0] active:to-[#0f3985] cursor-pointer"
        >
          <i className="bi bi-dash text-[14px]"></i>
        </button>
        {/* Maximize/Restore */}
        <button
          onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          className="w-[21px] h-[21px] bg-gradient-to-b from-[#3c8cf3] to-[#1361d8] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#5da0f5] hover:to-[#2473e4] active:from-[#1a51b0] active:to-[#0f3985] cursor-pointer"
        >
          <i className={`bi ${isMaximized ? 'bi-back' : 'bi-square'} text-[10px]`}></i>
        </button>
        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-[21px] h-[21px] bg-gradient-to-b from-[#e88a67] to-[#c9422c] rounded-[3px] border border-white/40 text-white flex items-center justify-center hover:from-[#f0a07e] hover:to-[#d4563f] active:from-[#a03020] active:to-[#801810] cursor-pointer"
        >
          <i className="bi bi-x-lg text-[11px] font-bold"></i>
        </button>
      </div>
    </div>
  );
}
