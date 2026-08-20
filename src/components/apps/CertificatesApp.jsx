import { useState } from 'react';
import { CERTIFICATES_DATA } from '../../data/portfolioData';

export default function CertificatesApp() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Address bar */}
      <div className="flex items-center bg-[#ece9d8] border-b border-gray-400 px-2 py-1 text-xs">
        <span className="text-gray-600 mr-2">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 flex items-center">
        <span className="mr-1"><i className="bi bi-award-fill text-[#ffd700]"></i></span>
          <span>{selectedCert ? `C:\\Certificates\\${selectedCert.title}` : 'C:\\Certificates'}</span>
        </div>
      </div>

      {selectedCert ? (
        /* Certificate detail view */
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-44 flex-shrink-0 bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white overflow-y-auto">
            <div className="text-sm font-bold mb-3">{selectedCert.title}</div>
            <div className="text-xs opacity-80 mb-3">{selectedCert.issuer}</div>
            <div className="border-t border-white/30 pt-2 mt-auto">
              <button 
                onClick={() => setSelectedCert(null)}
                className="text-xs hover:underline cursor-pointer flex items-center mb-2"
              >
                ← Back to list
              </button>
              
              {selectedCert.verificationLink && selectedCert.verificationLink !== "#" ? (
                <a 
                  href={selectedCert.verificationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold px-3 py-1.5 rounded text-xs shadow-md transition-all cursor-pointer mb-1.5"
                >
                  <i className="bi bi-patch-check-fill text-sm"></i>
                  <span>Verify Online</span>
                </a>
              ) : (
                <div className="text-[10px] opacity-75 italic bg-white/10 px-2 py-1 rounded mb-1.5 text-center">
                  Verification URL N/A
                </div>
              )}

              <a 
                href={selectedCert.file} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs hover:underline cursor-pointer block text-blue-100 opacity-90"
              >
                ▶ View Raw File
              </a>
            </div>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-hidden flex flex-col bg-gray-100 p-2">
            <div className="flex items-center justify-between mb-2 px-1 flex-shrink-0">
              <h3 className="text-sm font-bold text-gray-800 truncate mr-2">{selectedCert.title}</h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                {selectedCert.verificationLink && selectedCert.verificationLink !== "#" && (
                  <a
                    href={selectedCert.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded shadow flex items-center gap-1 transition-all"
                  >
                    <i className="bi bi-patch-check-fill"></i> Verify Certificate
                  </a>
                )}
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <i className="bi bi-box-arrow-up-right"></i> Open PDF
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-white border border-gray-300 shadow-inner overflow-hidden rounded flex items-center justify-center relative">
              {selectedCert.file.endsWith('.pdf') ? (
                <iframe 
                  src={`${selectedCert.file}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                  className="w-full h-full border-none overflow-hidden block" 
                  title={selectedCert.title} 
                  scrolling="no"
                />
              ) : (
                <img src={selectedCert.file} alt={selectedCert.title} className="max-w-full max-h-full object-contain" />
              )}
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
            <div className="w-40 text-left">Issuer</div>
            <div className="w-24 text-right">Type</div>
          </div>

          {CERTIFICATES_DATA.map((cert) => (
            <div 
              key={cert.id}
              onDoubleClick={() => setSelectedCert(cert)}
              className="flex items-center px-2 py-1.5 text-sm border-b border-gray-100 hover:bg-[#316ac5] hover:text-white cursor-pointer group"
            >
              <div className="w-8 text-base"><i className="bi bi-file-earmark-pdf text-red-500 group-hover:text-white"></i></div>
              <div className="flex-1 truncate">{cert.title}</div>
              <div className="w-40 text-left text-xs text-gray-500 group-hover:text-blue-100">{cert.issuer}</div>
              <div className="w-24 text-right text-xs text-gray-500 group-hover:text-blue-100">Certificate</div>
            </div>
          ))}

          {/* Status bar */}
          <div className="bg-[#ece9d8] border-t border-gray-400 px-3 py-1 text-xs text-gray-600 sticky bottom-0 mt-auto">
            {CERTIFICATES_DATA.length} objects
          </div>
        </div>
      )}
    </div>
  );
}
