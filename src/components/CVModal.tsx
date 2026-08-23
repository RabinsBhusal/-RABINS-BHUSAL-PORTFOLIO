import React, { useEffect } from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION_DATA,
  CERTIFICATIONS,
  SKILL_CATEGORIES,
  LANGUAGES,
} from '../data/portfolioData';
import {
  X,
  Printer,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Award,
  BookOpen,
  Briefcase,
  Layers
} from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll and register Escape key listener when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="cv-modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md p-3 sm:p-6 md:p-8 flex justify-center items-start animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Official Curriculum Vitae Preview"
    >
      {/* CV Document Container */}
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 border border-neutral-300">
        {/* Sticky Control Header Bar (Hidden on print) */}
        <div className="print:hidden sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-neutral-900 text-neutral-100 border-b border-neutral-800 shadow-md">
          {/* Back to Portfolio Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>← Back to Portfolio</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-300">
              Official UK Finance CV Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
              title="Print document or save as high-quality PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close CV Preview"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 md:p-14 space-y-8 font-sans text-neutral-900 print:p-0 print:space-y-6">
          {/* Header with Photo */}
          <div className="border-b-2 border-neutral-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-neutral-950 font-sans">
                    {PERSONAL_INFO.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-800 uppercase tracking-wide">
                    BSc (Hons) 1st Class • ACCA Candidate
                  </span>
                </div>

                <p className="text-sm font-medium text-neutral-800">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              {/* CV Profile Photo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-neutral-900 shadow-sm shrink-0">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-700 mt-3.5 font-mono pt-2 border-t border-neutral-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-neutral-400 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-neutral-900 underline hover:text-emerald-700">
                  {PERSONAL_INFO.email}
                </a>
              </span>
              <span className="text-neutral-400 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="text-neutral-900 underline hover:text-sky-700">
                  linkedin.com/in/rabinsbhusal
                </a>
              </span>
            </div>
          </div>

          {/* Professional Profile / Summary */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-2.5 flex items-center gap-2">
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed text-justify">
              {PERSONAL_INFO.cvObjective}
            </p>
          </div>

          {/* Education & Qualifications */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Education & Professional Qualifications
            </h2>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-[13px] bg-neutral-50/70 p-3 rounded-lg border border-neutral-200/60 print:bg-transparent print:p-0 print:border-none">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-neutral-950">
                    <span className="text-sm">{edu.qualification}</span>
                    <span className="font-mono text-neutral-600 font-normal text-xs">{edu.period}</span>
                  </div>
                  <div className="text-neutral-700 font-medium">{edu.institution}</div>
                  {edu.grade && (
                    <div className="font-bold text-emerald-800 text-xs mt-0.5">{edu.grade}</div>
                  )}
                  {edu.details && (
                    <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-neutral-700 text-xs">
                      {edu.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Work Experience */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Professional Work Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs sm:text-[13px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-neutral-950">
                    <span className="text-sm text-neutral-900">{exp.role}</span>
                    <span className="font-mono text-neutral-600 font-normal text-xs">{exp.period}</span>
                  </div>
                  <div className="text-neutral-700 font-semibold text-xs mb-1.5">
                    {exp.company} — <span className="font-normal text-neutral-600">{exp.location}</span>
                  </div>

                  <ul className="list-disc list-inside space-y-1.5 text-neutral-700 text-xs">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-snug">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Software, Systems & Key Accounting Competencies */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-3">
              Accounting Systems, Software & Technical Competencies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 print:bg-transparent print:p-0 print:border-none">
                <span className="font-bold text-neutral-900 block mb-1">Financial Systems & Software:</span>
                <p className="text-neutral-700 leading-relaxed">
                  Unit4 ERPx, Xero (Certified Advisor), QuickBooks Online (Certified), Sage 50 Accounts, Sage One, Sage Payroll, VT Final Accounts, Dext AI, Microsoft Excel (Advanced Modeling, Pivot Tables, Lookups, Macros), Power BI.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 print:bg-transparent print:p-0 print:border-none">
                <span className="font-bold text-neutral-900 block mb-1">Accounting & Tax Competencies:</span>
                <p className="text-neutral-700 leading-relaxed">
                  Statutory Accounts Preparation (FRS 102/105), UK Corporation Tax (CT600 & Marginal Relief), MTD VAT Returns, PAYE & Auto-Enrolment Payroll, 3-Statement Modeling, Variance Analysis, Working Capital Management.
                </p>
              </div>
            </div>
          </div>

          {/* Official Certifications */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-2.5">
              Certifications & Professional Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-900">{cert.title}</strong> — {cert.issuer} ({cert.year})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1.5 mb-2">
              Language Proficiencies
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-700 font-mono">
              {LANGUAGES.map((lang) => (
                <span key={lang.language} className="bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 print:border-none print:p-0">
                  <strong className="text-neutral-900">{lang.language}:</strong> {lang.proficiency}
                </span>
              ))}
            </div>
          </div>

          {/* Footer inside CV */}
          <div className="text-xs text-neutral-500 pt-4 border-t border-neutral-200 text-center font-mono">
            Professional references and academic transcripts available upon request.
          </div>
        </div>

        {/* Bottom Close Bar (Hidden on print) */}
        <div className="print:hidden px-6 py-4 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-600 font-mono">
            Press <kbd className="px-2 py-0.5 rounded bg-white border border-neutral-300 text-neutral-800 text-[11px] font-bold">Esc</kbd> or click outside to return
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors"
            >
              Close CV Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
