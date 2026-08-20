// Classic Windows XP Icons as SVG components
// These replicate the authentic XP icon style

export function WindowsFlag({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      {/* Classic waving Windows flag */}
      <path d="M1 4.5 L10 3 L10 11 L1 11 Z" fill="#F25022"/>
      <path d="M11.5 2.8 L23 1 L23 11 L11.5 11 Z" fill="#7FBA00"/>
      <path d="M1 12.5 L10 12.5 L10 20.5 L1 19 Z" fill="#00A4EF"/>
      <path d="M11.5 12.5 L23 12.5 L23 22.5 L11.5 20.8 Z" fill="#FFB900"/>
    </svg>
  );
}

export function MyComputerIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Monitor body */}
      <rect x="4" y="4" width="40" height="30" rx="2" fill="#c0c7cf" stroke="#5a6a7a" strokeWidth="1.5"/>
      {/* Screen bezel */}
      <rect x="7" y="7" width="34" height="22" rx="1" fill="#1a3a6a"/>
      {/* Screen content */}
      <rect x="9" y="9" width="30" height="18" fill="#3a7ec8"/>
      {/* Windows logo on screen */}
      <rect x="17" y="12" width="5" height="5" fill="#F25022" rx="0.5"/>
      <rect x="23" y="12" width="5" height="5" fill="#7FBA00" rx="0.5"/>
      <rect x="17" y="18" width="5" height="5" fill="#00A4EF" rx="0.5"/>
      <rect x="23" y="18" width="5" height="5" fill="#FFB900" rx="0.5"/>
      {/* Stand */}
      <rect x="18" y="34" width="12" height="3" fill="#a0a8b0" stroke="#5a6a7a" strokeWidth="0.5"/>
      {/* Base */}
      <rect x="14" y="37" width="20" height="4" rx="1.5" fill="#b0b8c0" stroke="#5a6a7a" strokeWidth="0.5"/>
      {/* Power button */}
      <circle cx="24" cy="32" r="1.5" fill="#4a5a6a"/>
    </svg>
  );
}

export function FolderIcon({ size = 48, color = "#f0c040" }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Folder back */}
      <path d="M4 12 L4 40 C4 41.1 4.9 42 6 42 L42 42 C43.1 42 44 41.1 44 40 L44 16 C44 14.9 43.1 14 42 14 L22 14 L18 8 L6 8 C4.9 8 4 8.9 4 10 Z" fill={color} stroke="#c8a020" strokeWidth="1"/>
      {/* Folder front */}
      <path d="M4 18 L44 18 L44 40 C44 41.1 43.1 42 42 42 L6 42 C4.9 42 4 41.1 4 40 Z" fill="#f8d870" stroke="#c8a020" strokeWidth="0.5"/>
      {/* Folder highlight */}
      <path d="M5 18 L43 18 L43 20 L5 20 Z" fill="rgba(255,255,255,0.3)"/>
    </svg>
  );
}

export function GearIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <path d="M24 8 L27 8 L28 12 L31 13 L34 10 L37 13 L34 16 L36 19 L40 18 L40 22 L36 23 L36 26 L40 27 L40 31 L36 30 L34 33 L37 36 L34 39 L31 36 L28 37 L27 41 L24 41 L23 37 L20 36 L17 39 L14 36 L17 33 L15 30 L11 31 L11 27 L15 26 L15 23 L11 22 L11 18 L15 19 L17 16 L14 13 L17 10 L20 13 L23 12 Z" fill="#708090" stroke="#4a5a6a" strokeWidth="1"/>
      <circle cx="25.5" cy="24.5" r="6" fill="#b0b8c0" stroke="#4a5a6a" strokeWidth="1"/>
      <circle cx="25.5" cy="24.5" r="3" fill="#708090"/>
    </svg>
  );
}

export function GraduationCapIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Cap */}
      <polygon points="24,8 44,18 24,28 4,18" fill="#1a3a6a" stroke="#0a2a5a" strokeWidth="1"/>
      {/* Brim shadow */}
      <polygon points="24,28 44,18 44,20 24,30 4,20 4,18" fill="#0f2850"/>
      {/* Tassel string */}
      <line x1="44" y1="18" x2="44" y2="32" stroke="#c8a020" strokeWidth="1.5"/>
      {/* Tassel */}
      <rect x="42" y="32" width="4" height="6" rx="1" fill="#f0c040"/>
      {/* Board bottom */}
      <path d="M14 22 L14 34 C14 38 24 42 24 42 C24 42 34 38 34 34 L34 22" fill="none" stroke="#1a3a6a" strokeWidth="2"/>
      <path d="M14 22 L14 34 C14 38 24 42 24 42 C24 42 34 38 34 34 L34 22" fill="#2a4a7a" opacity="0.5"/>
    </svg>
  );
}

export function EnvelopeIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Envelope body */}
      <rect x="4" y="12" width="40" height="26" rx="2" fill="#e8d8a0" stroke="#b0a060" strokeWidth="1"/>
      {/* Envelope flap */}
      <polygon points="4,12 24,28 44,12" fill="#f0e0b0" stroke="#b0a060" strokeWidth="1"/>
      {/* Envelope bottom fold */}
      <polygon points="4,38 24,26 44,38" fill="#d8c890" stroke="#b0a060" strokeWidth="0.5"/>
      {/* Stamp */}
      <rect x="34" y="14" width="6" height="7" fill="#c85050" stroke="#a04040" strokeWidth="0.5"/>
    </svg>
  );
}

export function NotepadIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Page */}
      <rect x="8" y="4" width="32" height="40" rx="1" fill="#fffff0" stroke="#808080" strokeWidth="1"/>
      {/* Top blue bar */}
      <rect x="8" y="4" width="32" height="6" fill="#0054e3"/>
      {/* Notepad text */}
      <text x="12" y="9" fill="white" fontSize="4" fontFamily="Tahoma" fontWeight="bold">Notepad</text>
      {/* Text lines */}
      <line x1="12" y1="16" x2="36" y2="16" stroke="#c0c0c0" strokeWidth="0.5"/>
      <line x1="12" y1="20" x2="36" y2="20" stroke="#c0c0c0" strokeWidth="0.5"/>
      <line x1="12" y1="24" x2="30" y2="24" stroke="#c0c0c0" strokeWidth="0.5"/>
      <line x1="12" y1="28" x2="34" y2="28" stroke="#c0c0c0" strokeWidth="0.5"/>
      <line x1="12" y1="32" x2="28" y2="32" stroke="#c0c0c0" strokeWidth="0.5"/>
      <line x1="12" y1="36" x2="32" y2="36" stroke="#c0c0c0" strokeWidth="0.5"/>
      {/* Written text placeholder */}
      <line x1="12" y1="16" x2="30" y2="16" stroke="#333" strokeWidth="0.7"/>
      <line x1="12" y1="20" x2="26" y2="20" stroke="#333" strokeWidth="0.7"/>
      <line x1="12" y1="24" x2="22" y2="24" stroke="#333" strokeWidth="0.7"/>
    </svg>
  );
}

export function RecycleBinIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Bin body */}
      <path d="M12 16 L14 42 C14 43 15 44 16 44 L32 44 C33 44 34 43 34 42 L36 16 Z" fill="#c8c8c8" stroke="#808080" strokeWidth="1"/>
      {/* Bin lid */}
      <rect x="10" y="12" width="28" height="4" rx="1" fill="#a8a8a8" stroke="#808080" strokeWidth="1"/>
      {/* Bin handle */}
      <path d="M20 12 L20 8 C20 7 21 6 22 6 L26 6 C27 6 28 7 28 8 L28 12" fill="none" stroke="#808080" strokeWidth="1.5"/>
      {/* Bin lines */}
      <line x1="20" y1="20" x2="19" y2="40" stroke="#909090" strokeWidth="1"/>
      <line x1="24" y1="20" x2="24" y2="40" stroke="#909090" strokeWidth="1"/>
      <line x1="28" y1="20" x2="29" y2="40" stroke="#909090" strokeWidth="1"/>
      {/* Recycle arrows */}
      <path d="M18 28 C16 24 20 20 24 22" fill="none" stroke="#2a8a2a" strokeWidth="1.5"/>
      <path d="M30 28 C32 32 28 36 24 34" fill="none" stroke="#2a8a2a" strokeWidth="1.5"/>
    </svg>
  );
}

export function GitHubIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Globe-like background */}
      <circle cx="24" cy="24" r="20" fill="#2b3137"/>
      {/* GitHub octocat silhouette simplified */}
      <path d="M24 8 C15.2 8 8 15.2 8 24 C8 31.1 12.5 37.1 18.7 39.3 C19.5 39.4 19.8 39 19.8 38.6 L19.8 35.8 C15 36.8 14 33.4 14 33.4 C13.3 31.5 12.2 31 12.2 31 C10.7 30 12.3 30 12.3 30 C14 30.1 14.8 31.7 14.8 31.7 C16.3 34.2 18.8 33.4 19.9 33 C20 31.9 20.5 31.2 21 30.8 C17.2 30.3 13.2 28.8 13.2 22.4 C13.2 20.6 13.8 19.2 14.8 18 C14.6 17.6 14 16 15 13.8 C15 13.8 16.4 13.3 19.8 15.4 C21.2 15 22.6 14.8 24 14.8 C25.4 14.8 26.8 15 28.2 15.4 C31.6 13.3 33 13.8 33 13.8 C34 16 33.4 17.6 33.2 18 C34.2 19.2 34.8 20.6 34.8 22.4 C34.8 28.8 30.8 30.3 27 30.7 C27.6 31.3 28.2 32.3 28.2 33.8 L28.2 38.6 C28.2 39 28.5 39.5 29.3 39.3 C35.5 37.1 40 31.1 40 24 C40 15.2 32.8 8 24 8 Z" fill="white"/>
    </svg>
  );
}

export function LinkedInIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#0077B5"/>
      <path d="M14 20 L14 36 L19 36 L19 20 Z" fill="white"/>
      <circle cx="16.5" cy="14.5" r="3" fill="white"/>
      <path d="M22 20 L27 20 L27 22.5 C28 21 30 19.5 33 19.5 C37 19.5 38 22 38 26 L38 36 L33 36 L33 27 C33 25 32.5 23.5 30.5 23.5 C28.5 23.5 27 25 27 27 L27 36 L22 36 Z" fill="white"/>
    </svg>
  );
}

export function InternetExplorerIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <circle cx="12" cy="12" r="10" fill="#0078D7"/>
      <path d="M5 10 Q8 4 14 4 Q20 4 20 10" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M4 14 Q8 20 14 20 Q20 20 20 14" fill="none" stroke="white" strokeWidth="1.5"/>
      <text x="8" y="16" fill="white" fontSize="10" fontFamily="serif" fontStyle="italic" fontWeight="bold">e</text>
    </svg>
  );
}

export function OutlookIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <rect x="2" y="4" width="20" height="16" rx="1.5" fill="#2a6496"/>
      <polygon points="2,4 12,13 22,4" fill="#3a84c6" stroke="#2a6496" strokeWidth="0.5"/>
      <polygon points="2,20 12,13 22,20" fill="#1a5486" stroke="#2a6496" strokeWidth="0.3"/>
    </svg>
  );
}

export function CertificateIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Document page */}
      <rect x="8" y="4" width="32" height="40" rx="2" fill="#fffdf0" stroke="#b09040" strokeWidth="1.5"/>
      {/* Decorative inner border */}
      <rect x="11" y="7" width="26" height="34" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 1"/>
      {/* Ribbon lines */}
      <line x1="15" y1="13" x2="33" y2="13" stroke="#c09030" strokeWidth="1.5"/>
      <line x1="15" y1="17" x2="33" y2="17" stroke="#d0a040" strokeWidth="1"/>
      <line x1="15" y1="21" x2="28" y2="21" stroke="#d0a040" strokeWidth="1"/>
      {/* Gold Seal at bottom right */}
      <circle cx="28" cy="30" r="7" fill="#ffd700" stroke="#b8860b" strokeWidth="1"/>
      <circle cx="28" cy="30" r="5" fill="#f0c000" stroke="#daa520" strokeWidth="0.5"/>
      {/* Star/ribbon tail */}
      <path d="M25 36 L23 43 L27 40 L31 43 L29 36 Z" fill="#dc2626"/>
      <path d="M27 36 L26 43 L28 40 L30 43 L29 36 Z" fill="#b91c1c"/>
    </svg>
  );
}

export function MinesweeperIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <rect x="4" y="4" width="40" height="40" rx="3" fill="#c0c0c0" stroke="#808080" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="10" fill="#111111"/>
      <line x1="24" y1="8" x2="24" y2="40" stroke="#111111" strokeWidth="2.5"/>
      <line x1="8" y1="24" x2="40" y2="24" stroke="#111111" strokeWidth="2.5"/>
      <line x1="12" y1="12" x2="36" y2="36" stroke="#111111" strokeWidth="2.5"/>
      <line x1="36" y1="12" x2="12" y2="36" stroke="#111111" strokeWidth="2.5"/>
      <circle cx="21" cy="21" r="3" fill="white"/>
    </svg>
  );
}

export function PaintIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <path d="M24 6 C12 6 4 14 4 24 C4 34 12 42 24 42 C27 42 29 40 29 37 C29 35.5 28 34.5 28 33 C28 31.5 29 30.5 31.5 30.5 L34 30.5 C39.5 30.5 44 26 44 20.5 C44 12.5 35 6 24 6 Z" fill="#fffdf0" stroke="#808080" strokeWidth="1.5"/>
      <circle cx="14" cy="18" r="3.5" fill="#e74c3c"/>
      <circle cx="23" cy="14" r="3.5" fill="#f1c40f"/>
      <circle cx="32" cy="18" r="3.5" fill="#2ecc71"/>
      <circle cx="14" cy="28" r="3.5" fill="#3498db"/>
      <circle cx="34" cy="26" r="3.5" fill="#9b59b6"/>
    </svg>
  );
}

export function MediaPlayerIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <circle cx="24" cy="24" r="20" fill="#0054e3" stroke="#0038a8" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="14" fill="#112244"/>
      <polygon points="20,15 32,24 20,33" fill="#ffb900"/>
    </svg>
  );
}

export function DisplayPropertiesIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <rect x="6" y="8" width="36" height="26" rx="2" fill="#3a7ec8" stroke="#0038a8" strokeWidth="1.5"/>
      <rect x="9" y="11" width="30" height="20" fill="#f0c040"/>
      <rect x="18" y="34" width="12" height="4" fill="#a0a8b0"/>
      <rect x="14" y="38" width="20" height="4" rx="1" fill="#708090"/>
    </svg>
  );
}

export function CalculatorIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <rect x="8" y="4" width="32" height="40" rx="3" fill="#27ae60" stroke="#1e8449" strokeWidth="1.5"/>
      <rect x="12" y="8" width="24" height="8" rx="1" fill="#d4efdf" stroke="#17202a" strokeWidth="1"/>
      <rect x="12" y="20" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="21" y="20" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="30" y="20" width="6" height="5" rx="0.5" fill="#f39c12"/>
      <rect x="12" y="27" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="21" y="27" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="30" y="27" width="6" height="5" rx="0.5" fill="#f39c12"/>
      <rect x="12" y="34" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="21" y="34" width="6" height="5" rx="0.5" fill="#ffffff"/>
      <rect x="30" y="34" width="6" height="5" rx="0.5" fill="#e74c3c"/>
    </svg>
  );
}

export function TaskManagerIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <rect x="6" y="6" width="36" height="36" rx="2" fill="#111" stroke="#e67e22" strokeWidth="1.5"/>
      <path d="M10 24 L18 24 L21 14 L26 34 L30 20 L33 24 L38 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Map icon IDs to components
const ICON_MAP = {
  about: MyComputerIcon,
  projects: FolderIcon,
  certificates: CertificateIcon,
  skills: GearIcon,
  education: GraduationCapIcon,
  contact: EnvelopeIcon,
  resume: NotepadIcon,
  minesweeper: MinesweeperIcon,
  paint: PaintIcon,
  mediaplayer: MediaPlayerIcon,
  calculator: CalculatorIcon,
  taskmanager: TaskManagerIcon,
  settings: DisplayPropertiesIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  recycle: RecycleBinIcon,
};

export function getDesktopIcon(id, size = 48) {
  const IconComponent = ICON_MAP[id];
  if (IconComponent) return <IconComponent size={size} />;
  return <i className="bi bi-app" style={{ fontSize: `${size}px` }}></i>;
}

// Small icon for titlebars/taskbar (16px)
export function getTitlebarIcon(id, size = 16) {
  const IconComponent = ICON_MAP[id];
  if (IconComponent) return <IconComponent size={size} />;
  return <i className="bi bi-app text-sm"></i>;
}
