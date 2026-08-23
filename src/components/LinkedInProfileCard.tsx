import React, { useState } from 'react';
import {
  PERSONAL_INFO,
  PORTFOLIO_PHOTOS,
  EXPERIENCES,
  EDUCATION_DATA,
  CERTIFICATIONS,
  SKILL_CATEGORIES
} from '../data/portfolioData';
import {
  Linkedin,
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Image as ImageIcon,
  ZoomIn,
  X,
  Sparkles,
  Camera
} from 'lucide-react';

interface LinkedInProfileCardProps {
  onOpenCV: () => void;
}

export const LinkedInProfileCard: React.FC<LinkedInProfileCardProps> = ({ onOpenCV }) => {
  const [copied, setCopied] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const coreCompetencies = [
    'Xero Accounting & Ledger Integrity',
    'Statutory Financial Statements (FRS 102)',
    'UK VAT Returns & HMRC Compliance',
    'Unit4 ERPx Financials',
    'Advanced Excel & Financial Modeling',
    'Corporation Tax Computations'
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="linkedin-profile" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* LinkedIn Profile Card Container */}
      <div className="reveal rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Profile Banner */}
        <div className="h-44 sm:h-56 w-full bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-950 border-b border-[#30363d] relative overflow-hidden">
          {/* Subtle spreadsheet grid pattern */}
          <div className="absolute inset-0 opacity-30 sheet-grid-backdrop" />
          
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Open to Opportunities
            </span>
          </div>
        </div>

        {/* Profile Details Area */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          {/* Avatar & Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            {/* Avatar */}
            <div className="relative group cursor-pointer" onClick={() => setActivePhotoIdx(0)}>
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-neutral-950 border-4 border-neutral-900 p-1 shadow-2xl overflow-hidden">
                <img
                  src={PORTFOLIO_PHOTOS.headshot}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center text-neutral-950 shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* LinkedIn Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={onOpenCV}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>View Full CV / Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors border border-neutral-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Name & Headline */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-neutral-100">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1st Class Honours • ACCA
              </span>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-medium">
              {PERSONAL_INFO.title}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 flex-wrap pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">500+ connections</span>
              <span>•</span>
              <span className="text-neutral-300">{PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Open To Work Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                Open to Work
              </div>
              <div className="text-xs text-neutral-200 font-medium">
                Finance Analyst, Junior Management Accountant, and Accounting Specialist roles.
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 shrink-0">
              London & Hybrid
            </span>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="text-base font-display font-bold text-neutral-100 mb-3 pb-2 border-b border-neutral-800">
              About
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Core Skills & Specializations */}
          <div>
            <h3 className="text-base font-display font-bold text-neutral-100 mb-4 pb-2 border-b border-neutral-800">
              Key Skills & Specializations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coreCompetencies.map((skill) => (
                <div
                  key={skill}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center gap-2.5 text-xs font-mono text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Photo Gallery & Milestones */}
      <div className="reveal rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>PROFESSIONAL PORTFOLIO GALLERY</span>
            </div>
            <h3 className="text-xl font-display font-bold text-neutral-100">
              Moments, Leadership & Academic Journey
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Click any photo to view in high resolution
          </span>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTFOLIO_PHOTOS.gallery.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIdx(idx)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                    {photo.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="p-2.5 rounded-full bg-emerald-500/90 text-neutral-950 shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-3.5 bg-neutral-950 border-t border-neutral-800/80 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-display font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 font-sans line-clamp-2 leading-relaxed">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High Resolution Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          onClick={() => setActivePhotoIdx(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-700"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative max-h-[70vh] flex items-center justify-center bg-neutral-950 overflow-hidden">
              <img
                src={PORTFOLIO_PHOTOS.gallery[activePhotoIdx].url}
                alt={PORTFOLIO_PHOTOS.gallery[activePhotoIdx].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Caption Info & Controls */}
            <div className="p-5 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  {PORTFOLIO_PHOTOS.gallery[activePhotoIdx].category} • Photo {activePhotoIdx + 1} of {PORTFOLIO_PHOTOS.gallery.length}
                </span>
                <h4 className="text-lg font-display font-bold text-neutral-100">
                  {PORTFOLIO_PHOTOS.gallery[activePhotoIdx].title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  {PORTFOLIO_PHOTOS.gallery[activePhotoIdx].subtitle}
                </p>
              </div>

              {/* Prev / Next Nav Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    setActivePhotoIdx((prev) =>
                      prev === null || prev === 0 ? PORTFOLIO_PHOTOS.gallery.length - 1 : prev - 1
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-colors"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIdx((prev) =>
                      prev === null || prev === PORTFOLIO_PHOTOS.gallery.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

