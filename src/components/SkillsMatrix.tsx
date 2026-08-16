import React, { useState } from 'react';
import { SKILL_CATEGORIES, LANGUAGES, HOBBIES_AND_INTERESTS } from '../data/portfolioData';
import {
  Layers,
  Calculator,
  Laptop,
  TrendingUp,
  Globe2,
  Heart,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const icons = [Calculator, Laptop, TrendingUp];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="reveal mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>TECHNICAL & PROFESSIONAL CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
          Accounting, ERP & Software Arsenal
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
          End-to-end expertise spanning statutory financial compliance, cloud accounting systems, enterprise ERPs, and multilingual communication.
        </p>
      </div>

      {/* 3 Major Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {SKILL_CATEGORIES.map((category, catIdx) => {
          const Icon = icons[catIdx] || Calculator;
          return (
            <div
              key={category.title}
              className="reveal rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-neutral-100">
                      {category.title}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {category.skills.length} core competencies
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-neutral-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                        {skill.description}
                      </p>
                      {skill.tags && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Languages and Interests Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Languages (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Globe2 className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-display font-bold text-neutral-100">
                Languages & Multilingual Fluency
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">7 Languages</span>
          </div>

          <div className="space-y-3.5">
            {LANGUAGES.map((lang) => (
              <div key={lang.language} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-200 font-medium">{lang.language}</span>
                  <span className="text-neutral-400">{lang.proficiency}</span>
                </div>
                <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-sky-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${lang.fluencyScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies & Interests (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-display font-bold text-neutral-100">
                Interests & Initiatives
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {HOBBIES_AND_INTERESTS.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1"
              >
                <div className="text-xs font-mono font-bold text-emerald-400">
                  {item.title}
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
