import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  ArrowUpRight
} from 'lucide-react';

interface ExperienceTimelineProps {
  onOpenCV?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onOpenCV }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Accounting', 'Financial Systems', 'Education & Management'];

  const filteredExperiences =
    filterCategory === 'All'
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === filterCategory);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER HIGHLIGHTS & EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
            Work Experience
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Executive summary of core accounting practice, management reporting, financial systems, and commercial roles.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count = cat === 'All' ? EXPERIENCES.length : EXPERIENCES.filter((e) => e.category === cat).length;
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1 rounded text-[10px] ${isActive ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience Cards Stack */}
      <div className="space-y-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="reveal rounded-2xl bg-neutral-900/70 border border-neutral-800/90 hover:border-neutral-700/90 p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3 border-b border-neutral-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-100">
                    {exp.role}
                  </h3>
                  {exp.type === 'Current' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Present
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-neutral-300 font-medium flex items-center gap-1.5 flex-wrap">
                  <span className="text-emerald-400 font-semibold">{exp.company}</span>
                  <span className="text-neutral-600">|</span>
                  <span className="text-neutral-400 font-mono text-xs">{exp.period}</span>
                  {exp.location && (
                    <>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-500 text-xs">{exp.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights List (2-3 concise bullets) */}
            <ul className="py-3.5 space-y-2 text-xs sm:text-sm text-neutral-300">
              {exp.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Key Areas Footer (Dot-separated format) */}
            <div className="pt-3 border-t border-neutral-800/60 text-xs text-neutral-400 font-mono flex items-baseline flex-wrap gap-x-2 gap-y-1">
              <span className="text-neutral-500 font-medium">Key areas:</span>
              <span className="text-neutral-200">
                {exp.skillsUsed.join(' · ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CV Callout Banner */}
      {onOpenCV && (
        <div className="reveal mt-10 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-neutral-900/60 to-neutral-900/60 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div>
            <h4 className="text-sm sm:text-base font-display font-bold text-neutral-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Looking for complete chronological CV records?</span>
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              View the complete printable curriculum vitae with full audit trails, academic breakdown, and course modules.
            </p>
          </div>

          <button
            onClick={onOpenCV}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-emerald-500/20"
          >
            <span>View Full CV Document</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};

