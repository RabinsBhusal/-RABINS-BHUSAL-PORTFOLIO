import React, { useEffect, useState } from 'react';
import { Github, Linkedin, ArrowUp, Mail, FileText, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const yearElem = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    if (yearElem) {
      yearElem.textContent = currentYear.toString();
    }
    setYear(currentYear);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950/90 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Dynamic Year */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-display font-bold text-base text-neutral-100">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-neutral-500 font-mono text-xs">• Finance & Accounting Portfolio</span>
          </div>
          <p className="text-xs text-neutral-400 font-mono">
            © <span id="year">{year}</span> {PERSONAL_INFO.name}. First-Class BSc Accounting & Finance • ACCA Candidate.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
          <button
            onClick={onOpenCV}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official CV</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
