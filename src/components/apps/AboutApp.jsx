import { PERSONAL_INFO } from '../../data/portfolioData';

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col bg-[#ece9d8] overflow-y-auto select-none font-tahoma text-xs p-3">
      {/* XP Dialog Header Tabs */}
      <div className="flex border-b border-gray-400 mb-3 gap-1 flex-shrink-0">
        <div className="bg-white border-t-2 border-l border-r border-blue-600 px-3 py-1 font-bold text-gray-800 rounded-t shadow-sm">
          General System Info
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 bg-white border border-gray-400 p-3 sm:p-4 rounded shadow-inner">
        {/* Left Side: XP Logo / Badge */}
        <div className="flex flex-col items-center sm:w-44 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-4">
          <div className="w-full bg-gradient-to-b from-[#0058e6] via-[#0048cd] to-[#003dbb] rounded-lg shadow-md flex flex-col items-center justify-center text-white mb-2 px-3 py-3 border border-blue-400">
            {/* Windows 4-color flag SVG */}
            <div className="flex gap-1 mb-1.5 shadow-sm">
              <div className="w-3.5 h-3.5 bg-[#f25022] rounded-xs"></div>
              <div className="w-3.5 h-3.5 bg-[#7fba00] rounded-xs"></div>
              <div className="w-3.5 h-3.5 bg-[#00a4ef] rounded-xs"></div>
              <div className="w-3.5 h-3.5 bg-[#ffb900] rounded-xs"></div>
            </div>
            <div className="text-base sm:text-lg font-bold italic tracking-tight whitespace-nowrap" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
              Windows<span className="text-[#ff9900] font-normal not-italic ml-0.5">XP</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-100 mt-0.5">Professional</span>
          </div>
          <div className="text-[11px] font-bold text-gray-700 text-center">System Properties</div>
          <div className="text-[10px] text-gray-500 text-center">Service Pack 3</div>
        </div>

        {/* Right Side: Detailed Hardware & User Spec List */}
        <div className="flex-1 space-y-3">
          {/* System Info Section */}
          <div className="border-b border-gray-200 pb-2">
            <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5 text-sm">
              <i className="bi bi-display text-blue-600"></i> System:
            </div>
            <div className="pl-5 text-gray-700 space-y-0.5 text-xs">
              <div>Microsoft Windows XP Professional</div>
              <div>Version 2002, Service Pack 3</div>
            </div>
          </div>

          {/* Registered To Section */}
          <div className="border-b border-gray-200 pb-2">
            <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5 text-sm">
              <i className="bi bi-person-badge text-blue-600"></i> Registered to:
            </div>
            <div className="pl-5 text-gray-700 space-y-0.5 text-xs">
              <div className="font-semibold text-gray-900">{PERSONAL_INFO.name}</div>
              <div className="text-gray-500">Computer: Dixit-PC</div>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1 mt-0.5"
                title="Send direct email via Gmail"
              >
                <i className="bi bi-envelope-at-fill text-red-500"></i>
                <span>{PERSONAL_INFO.email}</span>
                <span className="text-[10px] text-gray-400 font-normal">(Compose Gmail)</span>
              </a>
            </div>
          </div>

          {/* Computer Specifications Section */}
          <div>
            <div className="font-bold text-blue-900 mb-1.5 flex items-center gap-1.5 text-sm">
              <i className="bi bi-cpu-fill text-blue-600"></i> Computer Specs:
            </div>
            
            <div className="pl-5 space-y-2 text-xs">
              {/* Processor Spec */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                <span className="font-bold text-gray-700 flex items-center gap-1">
                  <i className="bi bi-cpu text-amber-600"></i> Processor:
                </span>
                <span className="font-mono text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mt-1 sm:mt-0">
                  Python, MERN Stack
                </span>
              </div>

              {/* Storage Spec with GitHub Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                <span className="font-bold text-gray-700 flex items-center gap-1">
                  <i className="bi bi-hdd-fill text-gray-600"></i> Storage:
                </span>
                <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
                  <span className="font-mono text-gray-800">512 GB SSD</span>
                  <span className="text-gray-400">(GitHub:</span>
                  <a
                    href="https://github.com/create2learn7238"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-600 hover:underline flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200"
                  >
                    <i className="bi bi-github"></i> Create2Learn
                  </a>
                  <span className="text-gray-400">)</span>
                </div>
              </div>

              {/* RAM Specifications */}
              <div className="bg-gray-50 p-2 rounded border border-gray-200 space-y-1">
                <div className="font-bold text-gray-700 flex items-center gap-1 mb-1">
                  <i className="bi bi-memory text-green-600"></i> Installed RAM (Memory):
                </div>
                <div className="pl-4 space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200">
                    <span className="text-gray-700">• Frontend Memory:</span>
                    <span className="font-bold text-green-700">8 GB DDR4 RAM (React)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200">
                    <span className="text-gray-700">• Data Science Memory:</span>
                    <span className="font-bold text-green-700">8 GB DDR4 RAM (NumPy + Pandas)</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-50 px-2 py-1 rounded border border-green-300 font-bold text-green-900 mt-1">
                    <span>Total System RAM:</span>
                    <span>16 GB DDR4 RAM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer OK Button */}
      <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
        <button className="xp-button font-bold text-blue-900 px-4">
          OK
        </button>
      </div>
    </div>
  );
}
