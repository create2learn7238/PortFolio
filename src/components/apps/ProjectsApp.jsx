import { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';

export default function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Address bar */}
      <div className="flex items-center bg-[#ece9d8] border-b border-gray-400 px-2 py-1 text-xs">
        <span className="text-gray-600 mr-2">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 flex items-center">
        <span className="mr-1"><i className="bi bi-folder-fill text-[#f0c040]"></i></span>
          <span>{selectedProject ? `C:\\My Projects\\${selectedProject.title}` : 'C:\\My Projects'}</span>
        </div>
      </div>

      {selectedProject ? (
        /* Project detail view */
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Left/Top sidebar */}
          <div className="w-full sm:w-44 flex-shrink-0 bg-gradient-to-r sm:bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white overflow-y-auto">
            <div className="flex items-center justify-between sm:block">
              <div className="text-sm font-bold truncate mr-2">{selectedProject.title}</div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="sm:hidden text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 cursor-pointer flex items-center shrink-0"
              >
                ← Back
              </button>
            </div>
            <div className="text-xs opacity-80 mt-1 sm:mt-0 sm:mb-3 line-clamp-2 sm:line-clamp-none">{selectedProject.description}</div>
            <div className="border-t border-white/30 pt-2 mt-2 sm:mt-auto flex flex-wrap sm:flex-col gap-2">
              <button 
                onClick={() => setSelectedProject(null)}
                className="hidden sm:flex text-xs hover:underline cursor-pointer items-center"
              >
                ← Back to projects
              </button>
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" 
                   className="text-xs hover:underline cursor-pointer block">
                  🌐 GitHub Repo
                </a>
              )}
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer"
                   className="text-xs hover:underline cursor-pointer block">
                  ▶ Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <h3 className="text-base font-bold mb-2 sm:mb-3">{selectedProject.title}</h3>
            
            <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3 shadow-sm rounded">
              <div className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Description</div>
              <div className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed mb-3">{selectedProject.description}</div>
              
              {/* Highlighted Action Buttons */}
              <div className="pt-2 border-t border-gray-300 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2.5">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold px-4 py-2 rounded shadow text-xs sm:text-sm transition-all cursor-pointer active:scale-95 touch-action-manipulation"
                  >
                    <i className="bi bi-rocket-takeoff-fill text-base"></i>
                    <span>🚀 Launch Live Demo</span>
                  </a>
                )}
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded shadow text-xs sm:text-sm transition-all cursor-pointer active:scale-95 touch-action-manipulation"
                  >
                    <i className="bi bi-github text-base"></i>
                    <span>View GitHub Repository</span>
                  </a>
                ) : (
                  <span className="flex items-center justify-center gap-2 bg-gray-400 text-white font-semibold px-3 py-2 rounded text-xs">
                    <i className="bi bi-lock-fill"></i> Private Repository
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3">
              <div className="text-xs font-bold text-gray-600 mb-1 uppercase">Features</div>
              <ul className="text-xs sm:text-sm list-disc list-inside">
                {selectedProject.features.map((f, i) => (
                  <li key={i} className="text-gray-700 mb-0.5">{f}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#f0f0f0] border border-gray-300">
              <div className="text-xs font-bold text-gray-600 mb-1 uppercase">Technologies</div>
              <div className="flex flex-wrap gap-1">
                {selectedProject.technologies.map((t, i) => (
                  <span key={i} className="bg-white border border-gray-400 px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* File list view */
        <div className="flex-1 overflow-y-auto">
          {/* Column headers */}
          <div className="flex items-center bg-[#ece9d8] border-b border-gray-400 px-2 py-1 text-xs font-bold text-gray-700 sticky top-0">
            <div className="w-6 sm:w-8"></div>
            <div className="flex-1">Name</div>
            <div className="w-20 text-right hidden sm:block">Date</div>
            <div className="w-24 text-right hidden sm:block">Type</div>
          </div>

          {PROJECTS_DATA.map((proj) => (
            <div 
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              onDoubleClick={() => setSelectedProject(proj)}
              className="flex items-center px-2 py-2 sm:py-1.5 text-xs sm:text-sm border-b border-gray-100 hover:bg-[#316ac5] hover:text-white cursor-pointer group active:bg-[#316ac5] active:text-white"
            >
              <div className="w-6 sm:w-8 text-base"><i className="bi bi-box text-gray-500 group-hover:text-white"></i></div>
              <div className="flex-1 truncate font-medium sm:font-normal">{proj.title}</div>
              <div className="w-20 text-right text-xs text-gray-500 group-hover:text-blue-100 hidden sm:block">{proj.date}</div>
              <div className="w-24 text-right text-xs text-gray-500 group-hover:text-blue-100 hidden sm:block">File folder</div>
              <div className="sm:hidden text-gray-400 text-xs"><i className="bi bi-chevron-right"></i></div>
            </div>
          ))}

          {/* Status bar */}
          <div className="bg-[#ece9d8] border-t border-gray-400 px-3 py-1 text-xs text-gray-600 sticky bottom-0">
            {PROJECTS_DATA.length} objects
          </div>
        </div>
      )}
    </div>
  );
}
