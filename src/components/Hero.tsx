import React from 'react';
import {
  ArrowDown,
  Calculator,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  ShieldCheck,
  Building2,
  TrendingUp,
  Layers,
  Sparkles,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  return (
    <section
      id="top"
      data-scroll-bg="0.04"
      className="relative min-h-[90vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Gradients & Professional Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] sheet-grid-backdrop" />
      </div>

      {/* Floating Interactive Hero Marks */}
      {/* Mark 1: Top Left Accounting Equation */}
      <div
        className="hero-mark parallax absolute top-28 left-[6%] hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-emerald-400 shadow-xl shadow-black/40"
        data-mouse-depth="0.06"
        data-parallax="0.08"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Assets = Liabilities + Equity</span>
      </div>

      {/* Mark 2: Top Right Corporation Tax */}
      <div
        className="hero-mark parallax absolute top-32 right-[8%] hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-sky-300 shadow-xl shadow-black/40"
        data-mouse-depth="-0.05"
        data-parallax="-0.06"
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span>HMRC MTD & CT600 Marginal Relief</span>
      </div>

      {/* Mark 3: Mid Left Systems */}
      <div
        className="hero-mark parallax absolute top-2/3 left-[5%] hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs font-mono text-purple-300 shadow-xl"
        data-mouse-depth="0.09"
        data-parallax="0.12"
      >
        <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
        <span>Unit4 ERPx • Xero • QuickBooks • Sage 50</span>
      </div>

      {/* Mark 4: Bottom Right DCF */}
      <div
        className="hero-mark parallax absolute bottom-24 right-[6%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80 text-xs font-mono text-amber-300 shadow-xl"
        data-mouse-depth="-0.08"
        data-parallax="-0.10"
      >
        <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
        <span>Finelor.app & SaveMoneyHub.app</span>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Status Pill */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-emerald-400 font-bold">{PERSONAL_INFO.name}</span>
          <span className="text-neutral-600">•</span>
          <span>Junior Management Accountant</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">London, UK</span>
        </div>

        {/* Big Display Headline */}
        <h1 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-100 tracking-tight leading-[1.1] mb-6">
          Rigorous management accounting,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
            financial modeling & systems.
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="reveal reveal-delay-2 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          First-Class Honours BSc Accounting & Finance graduate and ACCA candidate with extensive UK accountancy firm experience. Certified in Xero, QuickBooks, Sage 50, and Unit4 ERPx, specializing in statutory financial statements, MTD VAT compliance, management reporting, and dynamic 3-statement models.
        </p>

        {/* Action Buttons */}
        <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-3.5">
          <button
            id="hero-view-cv-btn"
            onClick={onOpenCV}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>View & Print Official CV</span>
          </button>

          <a
            id="hero-explore-projects-btn"
            href="#projects"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700/80 font-medium text-sm transition-all hover:border-emerald-500/50 hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Featured Finance Platforms</span>
          </a>

          <a
            id="hero-explore-toolkit-btn"
            href="#toolkit"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-all hover:text-emerald-300"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Financial Models</span>
          </a>
        </div>

        {/* Live Metrics Strip */}
        <div className="reveal reveal-delay-3 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto pt-8 border-t border-neutral-800/60">
          <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm text-center">
            <div className="font-mono text-2xl font-bold text-emerald-400">1st Class</div>
            <div className="text-xs text-neutral-400 font-sans mt-0.5">BSc Accounting & Finance</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm text-center">
            <div className="font-mono text-2xl font-bold text-sky-400">ACCA</div>
            <div className="text-xs text-neutral-400 font-sans mt-0.5">Active Candidate (2027)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm text-center">
            <div className="font-mono text-2xl font-bold text-teal-400">20+ SMEs</div>
            <div className="text-xs text-neutral-400 font-sans mt-0.5">UK Statutory & VAT Files</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm text-center">
            <div className="font-mono text-2xl font-bold text-purple-400">100%</div>
            <div className="text-xs text-neutral-400 font-sans mt-0.5">On-Time HMRC Filings</div>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-12 text-neutral-500 animate-bounce">
        <a href="#linkedin-profile" aria-label="Scroll down">
          <ArrowDown className="w-5 h-5 text-neutral-500 hover:text-emerald-400 transition-colors" />
        </a>
      </div>
    </section>
  );
};
