import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Cpu,
  Workflow,
  Globe,
  PieChart,
  Target,
  FolderKanban,
  FolderOpen,
  BarChart3
} from 'lucide-react';

export const FinanceProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMediaTab, setActiveMediaTab] = useState<Record<string, number>>({
    'proj-finelor': 0,
    'proj-savemoneyhub': 0,
    'proj-indigenously': 0,
    'proj-n8n-automation': 0,
    'proj-focoflo': 0,
    'proj-portuguese-hub': 0,
  });

  const categories = ['All', 'Finance Platform', 'Personal Finance', 'Consultancy', 'Automation / EdTech'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleTabChange = (projectId: string, tabIndex: number) => {
    setActiveMediaTab((prev) => ({ ...prev, [projectId]: tabIndex }));
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === cat).length;
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="reveal is-visible mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>LINKEDIN FEATURED PROJECTS & PLATFORMS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
          Accounting, FinTech & Strategic Projects
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
          Practical corporate finance engines, personal financial statement builders, startup break-even advisory, and automated data pipelines created and deployed by Rabins Bhusal.
        </p>
      </div>

      {/* Category Pills styled as Excel tabs with live counts */}
      <div className="reveal is-visible flex items-end overflow-x-auto border-b border-[#30363d] mb-8 gap-1.5 px-1 pb-px scrollbar-none">
        {categories.map((cat, idx) => {
          const isActive = selectedCategory === cat;
          const count = getCategoryCount(cat);

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`excel-tab flex items-center gap-2 whitespace-nowrap cursor-pointer select-none ${
                isActive ? 'excel-tab-active' : ''
              }`}
            >
              {idx === 0 ? (
                <FolderOpen className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
              ) : (
                <BarChart3 className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
              )}
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects List with Rich Media & Architecture Breakdown */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30 p-12 text-center">
          <FolderKanban className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 font-mono text-sm">No projects found in this category.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-neutral-950 text-xs font-semibold hover:bg-emerald-400 transition-colors"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredProjects.map((project) => {
            const currentTabIdx = activeMediaTab[project.id] || 0;
            const currentMedia = project.mediaTabs?.[currentTabIdx] || project.mediaTabs?.[0];

            return (
              <div
                key={project.id}
                className="reveal is-visible rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700/80 transition-all p-6 sm:p-8 overflow-hidden shadow-xl"
              >
                {/* Project Card Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {project.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-100">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-emerald-400/90 mt-1 font-mono">
                      {project.tagline}
                    </p>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-3 shrink-0">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold font-sans transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Platform</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono transition-colors border border-neutral-700 cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description & Skill Tags */}
                <div className="py-6 space-y-4">
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-4xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-950/70 border border-neutral-800 text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Media Tabs & Feature Breakdown */}
                {project.mediaTabs && project.mediaTabs.length > 0 && currentMedia && (
                  <div className="pt-4 border-t border-neutral-800/80">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                        Featured Modules & Architecture:
                      </span>

                      {/* Tab Selectors */}
                      {project.mediaTabs.length > 1 && (
                        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                          {project.mediaTabs.map((media, idx) => (
                            <button
                              key={media.label}
                              onClick={() => handleTabChange(project.id, idx)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                                currentTabIdx === idx
                                  ? 'bg-neutral-800 text-emerald-400 font-semibold border border-emerald-500/30'
                                  : 'text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {media.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Active Media Container */}
                    <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-base font-display font-bold text-neutral-100 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            {currentMedia.label}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1 font-sans">
                            {currentMedia.description}
                          </p>
                        </div>

                        {/* Quick Metric Pills */}
                        {currentMedia.metrics && currentMedia.metrics.length > 0 && (
                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            {currentMedia.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center"
                              >
                                <div className="text-[10px] font-mono text-neutral-500">{m.label}</div>
                                <div className="text-xs font-mono font-bold text-emerald-300">{m.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Detailed Highlights list */}
                      {currentMedia.details && currentMedia.details.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          {currentMedia.details.map((detail, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60 flex items-start gap-2.5 text-xs text-neutral-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
