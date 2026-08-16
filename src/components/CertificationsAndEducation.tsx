import React from 'react';
import { EDUCATION_DATA, CERTIFICATIONS } from '../data/portfolioData';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Sparkles,
  FileCheck2
} from 'lucide-react';

export const CertificationsAndEducation: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Education Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMIC & PROFESSIONAL CREDENTIALS</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-100 tracking-tight">
              Education & ACCA Track
            </h2>
          </div>

          <div className="space-y-6">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="reveal rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-neutral-800/80">
                  <div>
                    <span className="text-lg font-display font-bold text-neutral-100 block">
                      {edu.qualification}
                    </span>
                    <span className="text-sm font-medium text-emerald-400">
                      {edu.institution}
                    </span>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs font-mono text-neutral-400 block bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="text-xs font-mono font-bold text-emerald-400 mt-1 inline-block">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>

                {edu.details && (
                  <div className="pt-4 space-y-2 text-xs sm:text-sm text-neutral-300">
                    {edu.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-sans">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL VERIFIED BADGES</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-100 tracking-tight">
              Certifications
            </h2>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="reveal p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/30 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-display font-bold text-neutral-100 truncate">
                      {cert.title}
                    </h3>
                    {cert.verified && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mt-1">
                    <span>{cert.issuer}</span>
                    {cert.year && <span>{cert.year}</span>}
                  </div>

                  <div className="mt-2 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                    <span>{cert.category}</span>
                    {cert.badgeCode && (
                      <span className="text-[10px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                        {cert.badgeCode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
