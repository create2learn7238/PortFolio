import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS_DATA } from '../../data/portfolioData';

export default function ResumeApp() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden font-mono">
      {/* Notepad-style menu bar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 px-1 py-0.5 text-xs flex items-center space-x-3">
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">Format</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Content - styled like plain text notepad */}
      <div className="flex-1 overflow-y-auto p-3 text-xs leading-relaxed whitespace-pre-wrap select-text cursor-text">
{`════════════════════════════════════════
         ${PERSONAL_INFO.name}
         ${PERSONAL_INFO.role}
════════════════════════════════════════

CONTACT
───────
Email:    ${PERSONAL_INFO.email}
Phone:    ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
GitHub:   ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}

EDUCATION
─────────
${PERSONAL_INFO.education.institution}
${PERSONAL_INFO.education.degree}
Expected Graduation: ${PERSONAL_INFO.education.graduation}

TECHNICAL SKILLS
────────────────
${SKILL_CATEGORIES.map(cat => `${cat.title}: ${cat.items.join(', ')}`).join('\n')}

PROJECTS
────────
${PROJECTS_DATA.map((p, i) => `${i + 1}. ${p.title} (${p.date})
   ${p.description}
   Tech: ${p.technologies.join(', ')}
   ${p.github}
`).join('\n')}
════════════════════════════════════════
  Thank you for reviewing my portfolio.
════════════════════════════════════════`}
      </div>
    </div>
  );
}
