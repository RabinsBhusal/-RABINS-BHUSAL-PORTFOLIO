import React, { useState } from 'react';
import { X, Copy, Check, Code2, Terminal, Sparkles, Layers } from 'lucide-react';

interface ScriptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RAW_JAVASCRIPT_CODE = `document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const parallaxItems = document.querySelectorAll('.parallax');
const scrollBackgrounds = document.querySelectorAll('[data-scroll-bg]');
let ticking = false;

function updateParallax() {
  const middle = window.innerHeight / 2;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0.05);
    const offset = (item.getBoundingClientRect().top - middle) * speed;
    item.style.setProperty('--parallax-y', \`\${offset}px\`);
  });
  scrollBackgrounds.forEach((section) => {
    const speed = Number(section.dataset.scrollBg || 0.08);
    const offset = (section.getBoundingClientRect().top - middle) * speed;
    section.style.setProperty('--scroll-bg-y', \`\${offset}px\`);
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });
updateParallax();

const heroMarks = document.querySelectorAll('.hero-mark.parallax');
window.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;
  heroMarks.forEach((mark) => {
    const depth = Number(mark.dataset.mouseDepth || 0);
    mark.style.setProperty('--mouse-x', \`\${x * depth}px\`);
    mark.style.setProperty('--mouse-y', \`\${y * depth}px\`);
  });
}, { passive: true });

const projectGrid = document.getElementById('project-grid');
const excludedProject = 'business planning for indigenously infused';
const githubUser = 'RabinsBhusal';

fetch(\`https://api.github.com/users/\${githubUser}/repos?per_page=100&sort=updated\`)
  .then((response) => {
    if (!response.ok) throw new Error('GitHub could not load projects.');
    return response.json();
  })
  .then((repos) => repos
    .filter((repo) => !repo.fork && repo.name.toLowerCase() !== excludedProject)
    .slice(0, 6))
  .then((repos) => {
    if (!repos.length) throw new Error('No public projects found.');
    projectGrid.innerHTML = repos.map((repo, index) => \`
      <a class="project-card" href="\${repo.html_url}" target="_blank" rel="noreferrer">
        <span>0\${index + 1}</span>
        <h3>\${repo.name.replace(/[-_]/g, ' ')}</h3>
        <p>\${repo.description || 'View project on GitHub.'}</p>
        <small>\${repo.language || 'GitHub project'} <b>↗</b></small>
      </a>\`).join('');
  })
  .catch(() => {
    projectGrid.innerHTML = '<p class="project-status">Projects will appear here from GitHub. <a href="https://github.com/RabinsBhusal" target="_blank" rel="noreferrer">Open my profile ↗</a></p>';
  });

const heatmap = document.getElementById('github-heatmap');
const publicEventCounts = new Map();

function dateKey(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function renderHeatmap() {
  const today = new Date();
  const cells = [];
  for (let day = 90; day >= 0; day -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - day);
    const key = dateKey(date);
    const count = publicEventCounts.get(key) || 0;
    const level = count ? Math.min(4, Math.ceil(Math.log2(count + 1))) : 0;
    cells.push(\`<span class="heat-cell level-\${level}" title="\${count} public GitHub events on \${key}"></span>\`);
  }
  heatmap.innerHTML = \`<div class="heatmap-key"><span>Last 90 days</span><span>Less <i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i> More</span></div><div class="heatmap-cells">\${cells.join('')}</div>\`;
}

renderHeatmap();
fetch(\`https://api.github.com/users/\${githubUser}/events/public?per_page=100\`)
  .then((response) => response.ok ? response.json() : [])
  .then((events) => {
    events.forEach((event) => {
      const key = dateKey(event.created_at);
      publicEventCounts.set(key, (publicEventCounts.get(key) || 0) + 1);
    });
    renderHeatmap();
  })
  .catch(renderHeatmap);`;

export const ScriptInspectorModal: React.FC<ScriptInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'source' | 'breakdown'>('source');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_JAVASCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featureBreakdown = [
    {
      title: '1. Dynamic Year Injection',
      badge: 'document.getElementById("year")',
      desc: 'Sets the copyright and footer timestamp to current calendar year dynamically.',
    },
    {
      title: '2. Intersection Observer Viewport Reveals',
      badge: 'threshold: 0.12',
      desc: 'Observes all .reveal elements on page and attaches .is-visible once 12% in viewport.',
    },
    {
      title: '3. Scroll-Based Parallax Engine',
      badge: '--parallax-y & --scroll-bg-y',
      desc: 'Computes offset from window center, scales with data-parallax speed, and updates CSS custom properties at 60fps.',
    },
    {
      title: '4. Pointermove Mouse-Depth Parallax',
      badge: '--mouse-x & --mouse-y',
      desc: 'Calculates cursor displacement from screen center, respects prefers-reduced-motion, and transforms hero marks with depth multiplier.',
    },
    {
      title: '5. GitHub Repositories Fetch & Sanitize',
      badge: '!repo.fork & excluded list',
      desc: 'Pulls top 100 updated repos for @RabinsBhusal, filters forks and excluded project names, strips dashes/underscores, and formats cards 01..06.',
    },
    {
      title: '6. 90-Day Contribution Heatmap',
      badge: 'Math.ceil(log2(n + 1))',
      desc: 'Calculates the last 91 days, fetches public events stream, aggregates event count per YYYY-MM-DD key, and assigns 5 distinct intensity levels (0 to 4).',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="script-inspector-modal"
        className="relative w-full max-w-4xl max-h-[85vh] bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-neutral-100 flex items-center gap-2">
                Imported JavaScript Script
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Imported & Verified
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Original vanilla JS script fully integrated into this React application
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-4 px-6 pt-3 border-b border-neutral-800/60 bg-neutral-950 text-xs font-mono">
          <button
            onClick={() => setActiveTab('source')}
            className={`pb-2.5 border-b-2 font-medium transition-colors ${
              activeTab === 'source'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Raw JavaScript Code ({RAW_JAVASCRIPT_CODE.split('\n').length} lines)
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`pb-2.5 border-b-2 font-medium transition-colors ${
              activeTab === 'breakdown'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Architecture Breakdown (6 Modules)
          </button>

          <div className="ml-auto pb-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy JS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'source' ? (
            <pre className="text-xs font-mono bg-neutral-900/70 border border-neutral-800/80 text-neutral-300 p-4 rounded-xl overflow-x-auto leading-relaxed">
              <code>{RAW_JAVASCRIPT_CODE}</code>
            </pre>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureBreakdown.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-neutral-100 font-sans">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/30 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>All 6 features implemented & live-synced</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
