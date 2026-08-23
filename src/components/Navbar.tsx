import React, { useState } from 'react';
import {
  FileText,
  Linkedin,
  Github,
  Calculator,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Mail
} from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_PHOTOS } from '../data/portfolioData';

interface NavbarProps {
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <a href="#top" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-500/40 group-hover:border-emerald-400 transition-colors shadow-sm shrink-0">
            <img
              src={PORTFOLIO_PHOTOS.headshot}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base text-neutral-100 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
              {PERSONAL_INFO.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[11px] text-neutral-400 font-mono tracking-tight hidden sm:block whitespace-nowrap">
              Finance Analyst & Management Accountant
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono text-neutral-300">
          <a
            href="#linkedin-profile"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            Profile
          </a>
          <a
            href="#experience"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            Platforms
          </a>
          <a
            href="#toolkit"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            Financial Models
          </a>
          <a
            href="#skills"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            Skills & ERP
          </a>
          <a
            href="#education"
            className="hover:text-emerald-400 transition-colors py-1 whitespace-nowrap"
          >
            ACCA & Degrees
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contact</span>
          </a>

          <button
            id="nav-open-cv-btn"
            onClick={onOpenCV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV Document</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 hover:bg-sky-600/20 border border-neutral-800 text-sky-400 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-2 pb-4 bg-neutral-950/95 border-b border-neutral-800 flex flex-col gap-2 font-mono text-xs text-neutral-300">
          <a
            href="#linkedin-profile"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            LinkedIn Profile
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            Work Experience
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            Featured Platforms
          </a>
          <a
            href="#toolkit"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            Financial Models & Tools
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            Skills & Software Matrix
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400"
          >
            Education & ACCA
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-emerald-400 flex items-center justify-between"
          >
            <span>Contact & Inquiries</span>
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        </div>
      )}
    </header>
  );
};
