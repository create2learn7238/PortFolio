import { SKILL_CATEGORIES } from '../../data/portfolioData';

export default function SkillsApp() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 px-3 py-1 text-xs flex items-center">
        <span className="mr-4 text-gray-500">Category View</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-44 flex-shrink-0 bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white">
          <div className="text-sm font-bold mb-3"><i className="bi bi-gear-fill mr-1"></i> Skills</div>
          <div className="text-xs opacity-80 mb-3">Technical skills and technologies</div>
          <div className="border-t border-white/30 pt-2 text-xs">
            <div className="opacity-60">Categories: {SKILL_CATEGORIES.length}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="mb-4">
              {/* Category header */}
              <div className="bg-gradient-to-r from-[#ece9d8] to-white border border-gray-300 px-3 py-1.5 mb-1">
                <span className="text-sm font-bold text-gray-700">{cat.title}</span>
              </div>
              
              {/* Skills list */}
              <div className="border border-gray-200 border-t-0">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex items-center px-3 py-1.5 border-b border-gray-100 last:border-b-0 text-sm hover:bg-[#316ac5] hover:text-white cursor-default">
                    <span className="mr-2"><i className="bi bi-box-fill text-blue-400 text-[13px]"></i></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
