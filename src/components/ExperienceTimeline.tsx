import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Filter,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'exp-uel-jma': true,
    'exp-uel-fsa': true,
    'exp-taxcare-aa': true,
  });

  const categories = ['All', 'Accounting', 'Financial Systems', 'Education & Management'];

  const filteredExperiences =
    filterCategory === 'All'
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === filterCategory);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY & EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
            Work Experience & Accounting Practice
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Over a year of dedicated UK accounting firm practice, higher education management accounting, financial systems administration, and accounting education.
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
                    ? 'bg-emerald-500 text-neutral-950 font-bold'
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

      {/* Timeline Tree */}
      <div className="relative border-l border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
        {filteredExperiences.map((exp) => {
          const isExpanded = expandedItems[exp.id] ?? true;

          return (
            <div key={exp.id} className="reveal is-visible relative group">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                  exp.type === 'Current'
                    ? 'bg-emerald-500 border-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/30'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-400 group-hover:border-emerald-400 group-hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700/80 p-6 transition-all duration-300">
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xl font-display font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                        {exp.role}
                      </span>
                      {exp.type === 'Current' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Current Role
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="text-neutral-600">•</span>
                          <span className="text-neutral-400 text-xs flex items-center gap-1 font-mono">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.duration && (
                      <div className="text-[11px] font-mono text-neutral-500 mt-1">
                        {exp.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="py-4 space-y-2.5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags footer */}
                <div className="pt-4 border-t border-neutral-800/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-neutral-400 mr-2">Key Skills:</span>
                  {exp.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-950 border border-neutral-800/80 text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
