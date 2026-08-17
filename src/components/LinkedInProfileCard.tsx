import React, { useState } from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION_DATA,
  CERTIFICATIONS,
  SKILL_CATEGORIES
} from '../data/portfolioData';
import {
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Share2,
  ThumbsUp,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface LinkedInProfileCardProps {
  onOpenCV: () => void;
}

export const LinkedInProfileCard: React.FC<LinkedInProfileCardProps> = ({ onOpenCV }) => {
  const [copied, setCopied] = useState(false);
  const [endorsedSkills, setEndorsedSkills] = useState<Record<string, number>>({
    'Xero Accounting': 42,
    'Statutory Financial Statements': 38,
    'UK VAT Returns & HMRC Compliance': 35,
    'Unit4 ERPx Financials': 29,
    'Advanced Excel & Financial Modeling': 47,
  });

  const handleEndorse = (skillName: string) => {
    setEndorsedSkills((prev) => ({
      ...prev,
      [skillName]: (prev[skillName] || 25) + 1,
    }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="linkedin-profile" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-neutral-950 border-4 border-neutral-900 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-600 to-sky-700 flex items-center justify-center text-3xl sm:text-4xl font-bold font-display text-white shadow-inner">
                  RB
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center text-neutral-950">
                <ShieldCheck className="w-3.5 h-3.5" />
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

          {/* Top Endorsed Skills */}
          <div>
            <h3 className="text-base font-display font-bold text-neutral-100 mb-4 pb-2 border-b border-neutral-800 flex items-center justify-between">
              <span>Skills & Endorsements</span>
              <span className="text-xs font-mono text-neutral-500 font-normal">Click to endorse</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(endorsedSkills).map(([skill, count]) => (
                <div
                  key={skill}
                  onClick={() => handleEndorse(skill)}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 group-hover:text-emerald-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-bold">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
