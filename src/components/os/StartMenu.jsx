import { useStore } from '../../store/useStore';
import { APP_CONFIGS, PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound, playWindowSound, playShutdownSound } from '../../utils/audio';

export default function StartMenu() {
  const { isStartMenuOpen, closeStartMenu, openWindow, logoutUser, turnOffOS } = useStore();

  if (!isStartMenuOpen) return null;

  const handleOpenApp = (id) => {
    playWindowSound();
    const config = APP_CONFIGS[id];
    if (config) {
      openWindow({
        id,
        title: config.title,
        iconClass: config.iconClass,
        defaultWidth: config.width,
        defaultHeight: config.height,
      });
    }
  };

  const handleOpenLink = (url) => {
    playClickSound();
    window.open(url, '_blank');
    closeStartMenu();
  };

  const handleLogOff = () => {
    playShutdownSound();
    logoutUser();
  };

  const handleTurnOff = () => {
    playShutdownSound();
    turnOffOS();
  };

  return (
    <>
      {/* Invisible backdrop */}
      <div className="absolute inset-0 z-40" onClick={closeStartMenu}></div>
      
      <div className="absolute bottom-[36px] sm:bottom-[30px] left-1.5 sm:left-0 w-[calc(100vw-12px)] max-w-[380px] sm:w-[380px] bg-white border-2 border-[#0054e3] rounded-t-lg shadow-2xl z-50 flex flex-col overflow-hidden max-h-[calc(100vh-50px)]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        
        {/* ═══ TOP HEADER — User info ═══ */}
        <div className="p-[8px] sm:p-[10px] flex items-center rounded-t-md flex-shrink-0" style={{ background: 'linear-gradient(180deg, #1d68d1 0%, #3385e8 100%)' }}>
          <div className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] rounded-[4px] border-2 border-white/50 bg-[#e68a3c] flex items-center justify-center text-white text-[18px] sm:text-[22px] font-bold shadow-md flex-shrink-0">
            D
          </div>
          <span className="ml-2.5 sm:ml-3 text-white font-bold text-[13px] sm:text-[14px]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Dixit Patel</span>
        </div>

        {/* ═══ MAIN CONTENT — Two Columns ═══ */}
        <div className="flex flex-1 overflow-y-auto min-h-0" style={{ maxHeight: '340px' }}>
          
          {/* Left Column — Programs */}
          <div className="flex-1 bg-white flex flex-col py-1 overflow-y-auto">
            <MenuItem iconClass="bi-folder-fill" iconColor="#f0c040" title="My Projects" sub="Portfolio Projects" onClick={() => handleOpenApp('projects')} />
            <MenuItem iconClass="bi-pc-display" iconColor="#1a7dc4" title="My Computer" sub="About Me" onClick={() => handleOpenApp('about')} />
            <MenuItem iconClass="bi-calculator-fill" iconColor="#27ae60" title="Calculator" sub="Math Utilities" onClick={() => handleOpenApp('calculator')} />
            <MenuItem iconClass="bi-activity" iconColor="#e67e22" title="Task Manager" sub="Process Manager" onClick={() => handleOpenApp('taskmanager')} />
            <MenuItem iconClass="bi-grid-3x3-gap-fill" iconColor="#e74c3c" title="Minesweeper" sub="Classic Game" onClick={() => handleOpenApp('minesweeper')} />
            <MenuItem iconClass="bi-palette-fill" iconColor="#9b59b6" title="Paint" sub="Drawing Canvas" onClick={() => handleOpenApp('paint')} />
            <MenuItem iconClass="bi-play-btn-fill" iconColor="#3498db" title="Media Player" sub="Audio Beats" onClick={() => handleOpenApp('mediaplayer')} />
            <div className="h-px bg-gray-200 my-[3px] mx-3"></div>
            <MenuItem iconClass="bi-gear-fill" iconColor="#6c757d" title="Skills" sub="Technical abilities" onClick={() => handleOpenApp('skills')} />
            <MenuItem iconClass="bi-mortarboard-fill" iconColor="#4a90d9" title="Education" sub="Academic info" onClick={() => handleOpenApp('education')} />
            <MenuItem iconClass="bi-envelope-fill" iconColor="#d4a843" title="Contact" sub="Get in touch" onClick={() => handleOpenApp('contact')} />
            <MenuItem iconClass="bi-file-earmark-text-fill" iconColor="#5a9fd4" title="Resume" sub="View as Notepad" onClick={() => handleOpenApp('resume')} />
            
            <div className="flex-1"></div>
            <div className="h-px bg-gray-200 my-[3px] mx-3"></div>
            <div className="px-3 py-[6px] flex items-center justify-center hover:bg-[#316ac5] hover:text-white cursor-pointer text-[11px] font-bold text-gray-600">
              All Programs <i className="bi bi-chevron-right ml-1 text-[9px]"></i>
            </div>
          </div>

          {/* Right Column — System links */}
          <div className="w-[130px] sm:w-[155px] bg-[#d3e5fa] border-l border-[#8eb8e7] flex flex-col py-1 text-[#00145c] overflow-y-auto flex-shrink-0">
            <RightMenuItem iconClass="bi-folder-fill" title="My Projects" bold onClick={() => handleOpenApp('projects')} />
            <RightMenuItem iconClass="bi-award-fill" title="Certificates" bold onClick={() => handleOpenApp('certificates')} />
            <RightMenuItem iconClass="bi-pc-display" title="My Computer" bold onClick={() => handleOpenApp('about')} />
            <div className="h-px bg-[#8eb8e7] my-[3px] mx-2"></div>
            <RightMenuItem iconClass="bi-sliders2" title="Control Panel" onClick={() => handleOpenApp('settings')} />
            <RightMenuItem iconClass="bi-play-btn-fill" title="Media Player" onClick={() => handleOpenApp('mediaplayer')} />
            <div className="h-px bg-[#8eb8e7] my-[3px] mx-2"></div>
            <RightMenuItem iconClass="bi-github" title="GitHub" onClick={() => handleOpenLink(PERSONAL_INFO.github)} />
            <RightMenuItem iconClass="bi-linkedin" title="LinkedIn" onClick={() => handleOpenLink(PERSONAL_INFO.linkedin)} />
            <div className="h-px bg-[#8eb8e7] my-[3px] mx-2"></div>
            <RightMenuItem iconClass="bi-question-circle-fill" title="Help & Support" />
            <RightMenuItem iconClass="bi-search" title="Search" />
          </div>
        </div>

        {/* ═══ BOTTOM FOOTER ═══ */}
        <div className="px-3 py-[6px] flex justify-end items-center border-t border-[#003dbb] flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2264d1 0%, #3587f0 100%)' }}>
          <button className="flex items-center text-white text-[11px] hover:brightness-110 mx-1 cursor-pointer border-0 bg-transparent active:scale-95 transition-transform" onClick={handleLogOff}>
            <i className="bi bi-box-arrow-right mr-[5px] text-[13px]"></i>
            Log Off
          </button>
          <span className="text-white/30 mx-1">|</span>
          <button className="flex items-center text-white text-[11px] hover:brightness-110 mx-1 cursor-pointer border-0 bg-transparent active:scale-95 transition-transform" onClick={handleTurnOff}>
            <i className="bi bi-power mr-[5px] text-[13px] text-red-300"></i>
            Turn Off
          </button>
        </div>
      </div>
    </>
  );
}

function MenuItem({ iconClass, iconColor, title, sub, onClick }) {
  return (
    <div className="flex items-center px-3 py-[5px] hover:bg-[#316ac5] hover:text-white cursor-pointer group" onClick={onClick}>
      <i className={`bi ${iconClass} text-[20px] mr-[8px] w-[24px] text-center group-hover:text-white`} style={{ color: iconColor }}></i>
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] font-bold group-hover:text-white truncate">{title}</span>
        {sub && <span className="text-[10px] text-gray-400 group-hover:text-blue-100 truncate">{sub}</span>}
      </div>
    </div>
  );
}

function RightMenuItem({ iconClass, title, bold, onClick }) {
  return (
    <div 
      className={`flex items-center px-2 py-[4px] hover:bg-[#316ac5] hover:text-white cursor-pointer group ${bold ? 'font-bold' : ''}`}
      onClick={onClick}
    >
      <i className={`bi ${iconClass} text-[14px] mr-[6px] text-[#3a6ea5] group-hover:text-white`}></i>
      <span className="text-[11px] truncate">{title}</span>
    </div>
  );
}
