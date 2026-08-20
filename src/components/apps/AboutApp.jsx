import { PERSONAL_INFO, SKILL_CATEGORIES } from '../../data/portfolioData';

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* XP-style sidebar + content layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - blue gradient like XP system info */}
        <div className="w-48 flex-shrink-0 bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-4 flex flex-col items-center text-white">
          <div className="w-20 h-20 rounded-md bg-white/20 border-2 border-white/40 flex items-center justify-center mb-3">
            <i className="bi bi-pc-display text-4xl"></i>
          </div>
          <div className="text-center text-sm font-bold"><i className="bi bi-info-circle mr-1"></i>System Information</div>
          <div className="mt-4 w-full border-t border-white/30 pt-3">
            <div className="text-xs opacity-80 mb-2">See also:</div>
            <div className="text-xs hover:underline cursor-pointer mb-1">• System Properties</div>
            <div className="text-xs hover:underline cursor-pointer mb-1">• Device Manager</div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* System header */}
          <div className="border-b border-gray-300 pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800">System Properties</h2>
          </div>

          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-500 w-36 align-top">User:</td>
                <td className="py-2 font-semibold">{PERSONAL_INFO.name}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-500 align-top">Role:</td>
                <td className="py-2">{PERSONAL_INFO.role}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-500 align-top">Location:</td>
                <td className="py-2">{PERSONAL_INFO.location}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-500 align-top">Email:</td>
                <td className="py-2">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-600 hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-500 align-top">Phone:</td>
                <td className="py-2">{PERSONAL_INFO.phone}</td>
              </tr>
            </tbody>
          </table>

          {/* About section */}
          <div className="mt-4 p-3 bg-[#f0f0f0] border border-gray-300">
            <div className="text-xs font-bold text-gray-600 mb-2 uppercase">About</div>
            {PERSONAL_INFO.aboutText.map((line, i) => (
              <div key={i} className="text-sm text-gray-700 leading-relaxed">
                {line || <br />}
              </div>
            ))}
          </div>

          {/* Skills overview */}
          <div className="mt-4 p-3 bg-[#f0f0f0] border border-gray-300">
            <div className="text-xs font-bold text-gray-600 mb-2 uppercase"><i className="bi bi-cpu mr-1"></i>Installed Components</div>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="mb-2">
                <div className="text-xs font-bold text-gray-700">{cat.title}</div>
                <div className="text-xs text-gray-600 ml-3">{cat.items.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
