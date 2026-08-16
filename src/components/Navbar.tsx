import React from 'react';
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
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCV: () => void;
  onOpenScriptModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV, onOpenScriptModal }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm group-hover:border-emerald-400 transition-colors">
            RB
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base text-neutral-100 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[11px] text-neutral-400 font-mono tracking-tight hidden sm:block">
              Finance Analyst & Management Accountant
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono text-neutral-300">
          <a
            href="#linkedin-profile"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            Profile
          </a>
          <a
            href="#experience"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            Experience
          </a>
          <a
            href="#projects"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Platforms
          </a>
          <a
            href="#toolkit"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Financial Models
          </a>
          <a
            href="#skills"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            Skills & ERP
          </a>
          <a
            href="#education"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            ACCA & Degrees
          </a>
          <a
            href="#contact"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans transition-all shadow-sm shadow-emerald-500/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV Document</span>
          </button>

          <button
            onClick={onOpenScriptModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/70 text-neutral-300 transition-all hover:border-emerald-500/50"
            title="Inspect JavaScript animations"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>JS Engine</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-neutral-900 hover:bg-sky-600/20 border border-neutral-800 text-sky-400 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
