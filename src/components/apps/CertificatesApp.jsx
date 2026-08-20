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
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Left/Top sidebar */}
          <div className="w-full sm:w-44 flex-shrink-0 bg-gradient-to-r sm:bg-gradient-to-b from-[#4f7fc7] to-[#285baa] p-3 flex flex-col text-white overflow-y-auto">
            <div className="flex items-center justify-between sm:block">
              <div className="text-xs sm:text-sm font-bold truncate mr-2">{selectedCert.title}</div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="sm:hidden text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 cursor-pointer flex items-center shrink-0"
              >
                ← Back
              </button>
            </div>
            <div className="mt-1 sm:mt-0 sm:mb-3">
              <IssuerBadge issuer={selectedCert.issuer} />
            </div>
            <div className="border-t border-white/30 pt-2 mt-2 sm:mt-auto flex flex-wrap sm:flex-col gap-2">
              <button 
                onClick={() => setSelectedCert(null)}
                className="hidden sm:flex text-xs hover:underline cursor-pointer items-center mb-2"
              >
                ← Back to list
              </button>
              
              {selectedCert.verificationLink && selectedCert.verificationLink !== "#" ? (
                <a 
                  href={selectedCert.verificationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold px-3 py-1.5 rounded text-xs shadow-md transition-all cursor-pointer"
                >
                  <i className="bi bi-patch-check-fill text-sm"></i>
                  <span>Verify Online</span>
                </a>
              ) : (
                <div className="text-[10px] opacity-75 italic bg-white/10 px-2 py-1 rounded text-center hidden sm:block">
                  Verification N/A
                </div>
              )}

              <a 
                href={selectedCert.file} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs hover:underline cursor-pointer block text-blue-100 opacity-90"
              >
                ▶ View File
              </a>
            </div>
          </div>

          {/* Detail content */}
          <div className="flex-1 overflow-hidden flex flex-col bg-gray-100 p-2 min-h-0">
            <div className="flex flex-wrap items-center justify-between mb-2 px-1 gap-2 flex-shrink-0">
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{selectedCert.title}</h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                {selectedCert.verificationLink && selectedCert.verificationLink !== "#" && (
                  <a
                    href={selectedCert.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded shadow flex items-center gap-1 transition-all"
                  >
                    <i className="bi bi-patch-check-fill"></i> Verify
                  </a>
                )}
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <i className="bi bi-box-arrow-up-right"></i> PDF
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-white border border-gray-300 shadow-inner overflow-hidden rounded flex items-center justify-center relative min-h-[250px]">
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
            <div className="w-6 sm:w-8"></div>
            <div className="flex-1">Name</div>
            <div className="w-40 text-left hidden sm:block">Issuer</div>
            <div className="w-24 text-right hidden sm:block">Type</div>
          </div>

          {CERTIFICATES_DATA.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              onDoubleClick={() => setSelectedCert(cert)}
              className="flex items-center px-2 py-2 sm:py-1.5 text-xs sm:text-sm border-b border-gray-100 hover:bg-[#316ac5] hover:text-white cursor-pointer group active:bg-[#316ac5] active:text-white"
            >
              <div className="w-6 sm:w-8 text-base"><i className="bi bi-file-earmark-pdf text-red-500 group-hover:text-white"></i></div>
              <div className="flex-1 truncate font-medium sm:font-normal pr-2">{cert.title}</div>
              <div className="w-40 text-left text-xs hidden sm:block">
                <IssuerBadge issuer={cert.issuer} />
              </div>
              <div className="w-24 text-right text-xs text-gray-500 group-hover:text-blue-100 hidden sm:block">Certificate</div>
              <div className="sm:hidden text-gray-400 text-xs"><i className="bi bi-chevron-right"></i></div>
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

function IssuerBadge({ issuer }) {
  if (issuer === 'Google') {
    return <span className="font-bold text-gray-900 group-hover:text-white">Google</span>;
  }
  return <span className="font-normal text-gray-600 group-hover:text-blue-100">{issuer}</span>;
}
