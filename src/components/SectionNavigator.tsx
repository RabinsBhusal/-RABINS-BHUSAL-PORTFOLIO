import React, { useState, useEffect } from 'react';
import {
  ChevronUp,
  ChevronDown,
  User,
  Linkedin,
  Briefcase,
  Layers,
  Calculator,
  Wrench,
  GraduationCap,
  Mail
} from 'lucide-react';

interface Section {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: Section[] = [
  { id: 'top', label: 'Executive Summary', shortLabel: 'Overview' },
  { id: 'linkedin-profile', label: 'LinkedIn Profile & Endorsements', shortLabel: 'Profile' },
  { id: 'experience', label: 'Work Experience & Timeline', shortLabel: 'Experience' },
  { id: 'projects', label: 'FinTech & Accounting Projects', shortLabel: 'Projects' },
  { id: 'toolkit', label: 'Financial Modeling Workbooks', shortLabel: 'Toolkit' },
  { id: 'skills', label: 'Accounting & Tech Competencies', shortLabel: 'Skills' },
  { id: 'education', label: 'Education & ACCA Track', shortLabel: 'Education' },
  { id: 'contact', label: 'Recruitment Inquiry & Contact', shortLabel: 'Contact' },
];

export const SectionNavigator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollToSection(SECTIONS[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = Math.min(SECTIONS.length - 1, currentIndex + 1);
    scrollToSection(SECTIONS[nextIdx].id);
  };

  return (
    <nav
      aria-label="Section Quick Navigation"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 p-1.5 rounded-full bg-[#0d1117]/20 hover:bg-[#0d1117]/90 backdrop-blur-[2px] hover:backdrop-blur-md border border-[#30363d]/30 hover:border-[#30363d] shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-black/80 opacity-25 hover:opacity-100 transition-all duration-300 group/nav"
    >
      {/* Up Arrow Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        aria-label="Scroll to previous section"
        title="Previous Section"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/20 active:scale-90 transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>

      {/* Section Indicator Dots */}
      <div className="flex flex-col items-center gap-2 my-1 px-1">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;

          return (
            <div
              key={section.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Floating Tooltip with Section Name on hover */}
              <div
                className={`absolute right-9 px-2.5 py-1 rounded-lg bg-neutral-900/95 backdrop-blur-md border border-[#30363d] text-neutral-200 text-xs font-mono whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-neutral-100">{section.shortLabel}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">({idx + 1}/{SECTIONS.length})</span>
                </div>
              </div>

              {/* Dot / Pill Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                aria-label={`Jump to ${section.label}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-6 bg-emerald-400 shadow-sm shadow-emerald-400/50'
                    : 'w-2 h-2 bg-neutral-500/60 hover:bg-neutral-200 hover:scale-125'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Down Arrow Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= SECTIONS.length - 1}
        aria-label="Scroll to next section"
        title="Next Section"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/20 active:scale-90 transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>
    </nav>
  );
};
