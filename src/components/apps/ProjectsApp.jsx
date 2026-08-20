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
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-44 flex-shrink-0 bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white overflow-y-auto">
            <div className="text-sm font-bold mb-3">{selectedProject.title}</div>
            <div className="text-xs opacity-80 mb-3">{selectedProject.description}</div>
            <div className="border-t border-white/30 pt-2 mt-auto">
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-xs hover:underline cursor-pointer flex items-center"
              >
                ← Back to projects
              </button>
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" 
                   className="text-xs hover:underline cursor-pointer mt-2 block">
                  🌐 View on GitHub
                </a>
              )}
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer"
                   className="text-xs hover:underline cursor-pointer mt-1 block">
                  ▶ Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-base font-bold mb-3">{selectedProject.title}</h3>
            
            <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3 shadow-sm rounded">
              <div className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Description</div>
              <div className="text-sm font-medium text-gray-800 leading-relaxed mb-3">{selectedProject.description}</div>
              
              {/* Highlighted Action Buttons */}
              <div className="pt-2 border-t border-gray-300 flex flex-wrap gap-2.5">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold px-4 py-2 rounded shadow text-sm transition-all transform hover:scale-[1.02] cursor-pointer"
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
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded shadow text-sm transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    <i className="bi bi-github text-base"></i>
                    <span>View GitHub Repository</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 bg-gray-400 text-white font-semibold px-3 py-2 rounded text-xs">
                    <i className="bi bi-lock-fill"></i> Private Repository
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-[#f0f0f0] border border-gray-300 mb-3">
              <div className="text-xs font-bold text-gray-600 mb-1 uppercase">Features</div>
              <ul className="text-sm list-disc list-inside">
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
            <div className="w-8"></div>
            <div className="flex-1">Name</div>
            <div className="w-20 text-right">Date</div>
            <div className="w-24 text-right">Type</div>
          </div>

          {PROJECTS_DATA.map((proj) => (
            <div 
              key={proj.id}
              onDoubleClick={() => setSelectedProject(proj)}
              className="flex items-center px-2 py-1.5 text-sm border-b border-gray-100 hover:bg-[#316ac5] hover:text-white cursor-pointer group"
            >
              <div className="w-8 text-base"><i className="bi bi-box text-gray-500 group-hover:text-white"></i></div>
              <div className="flex-1 truncate">{proj.title}</div>
              <div className="w-20 text-right text-xs text-gray-500 group-hover:text-blue-100">{proj.date}</div>
              <div className="w-24 text-right text-xs text-gray-500 group-hover:text-blue-100">File folder</div>
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
