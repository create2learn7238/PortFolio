import { PERSONAL_INFO } from '../../data/portfolioData';

export default function ContactApp() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-44 flex-shrink-0 bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white">
          <div className="text-sm font-bold mb-3"><i className="bi bi-envelope-fill mr-1"></i> Contact</div>
          <div className="text-xs opacity-80 mb-3">Get in touch</div>
          <div className="border-t border-white/30 pt-2 text-xs mt-auto">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" 
               className="hover:underline cursor-pointer block mb-1"><i className="bi bi-github mr-1"></i>GitHub</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" 
               className="hover:underline cursor-pointer block"><i className="bi bi-linkedin mr-1"></i>LinkedIn</a>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border-b border-gray-300 pb-2 mb-4">
            <h2 className="text-base font-bold text-gray-800">Contact Information</h2>
          </div>

          <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500 w-28"><i className="bi bi-envelope mr-1"></i>Email:</td>
                  <td className="py-2">
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-600 hover:underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500"><i className="bi bi-telephone mr-1"></i>Phone:</td>
                  <td className="py-2">{PERSONAL_INFO.phone}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500"><i className="bi bi-geo-alt mr-1"></i>Location:</td>
                  <td className="py-2">{PERSONAL_INFO.location}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500"><i className="bi bi-github mr-1"></i>GitHub:</td>
                  <td className="py-2">
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {PERSONAL_INFO.github}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500"><i className="bi bi-linkedin mr-1"></i>LinkedIn:</td>
                  <td className="py-2">
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {PERSONAL_INFO.linkedin}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-[#f0f0f0] border border-gray-300">
            <div className="text-xs font-bold text-gray-600 mb-2 uppercase">Quick Actions</div>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${PERSONAL_INFO.email}`} 
                 className="xp-button cursor-pointer inline-block no-underline text-black">
                <i className="bi bi-envelope mr-1"></i> Send Email
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer"
                 className="xp-button cursor-pointer inline-block no-underline text-black">
                <i className="bi bi-github mr-1"></i> Open GitHub
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer"
                 className="xp-button cursor-pointer inline-block no-underline text-black">
                <i className="bi bi-linkedin mr-1"></i> Open LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
