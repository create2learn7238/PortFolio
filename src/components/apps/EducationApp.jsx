import { PERSONAL_INFO } from '../../data/portfolioData';

export default function EducationApp() {
  const { education } = PERSONAL_INFO;
  
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-full sm:w-44 flex-shrink-0 bg-gradient-to-r sm:bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-row sm:flex-col items-center justify-between sm:justify-start text-white">
          <div>
            <div className="text-xs sm:text-sm font-bold"><i className="bi bi-mortarboard-fill mr-1"></i> Education</div>
            <div className="text-[10px] sm:text-xs opacity-80">Academic background</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="border-b border-gray-300 pb-2 mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-800">Education Details</h2>
          </div>

          {/* Education card */}
          <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3">
            <div className="flex items-start">
              <span className="text-2xl sm:text-3xl mr-3 text-[#4a90d9] flex-shrink-0"><i className="bi bi-building"></i></span>
              <div>
                <div className="font-bold text-sm sm:text-base text-gray-800">{education.institution}</div>
                <div className="text-xs sm:text-sm text-gray-600">{education.degree}</div>
                <div className="text-[11px] sm:text-xs text-gray-500 mt-1">Expected Graduation: {education.graduation}</div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="p-3 bg-[#f0f0f0] border border-gray-300">
            <div className="text-xs font-bold text-gray-600 mb-1 uppercase">Current Status</div>
            <table className="w-full text-xs sm:text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 text-gray-500 w-20 sm:w-32">Status:</td>
                  <td className="py-1.5">Currently Enrolled</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-1.5 text-gray-500">Type:</td>
                  <td className="py-1.5">Full-Time Student</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-gray-500">Focus:</td>
                  <td className="py-1.5">Building practical projects</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
