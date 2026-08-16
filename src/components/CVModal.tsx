import React from 'react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION_DATA,
  CERTIFICATIONS,
  SKILL_CATEGORIES,
  LANGUAGES,
  HOBBIES_AND_INTERESTS,
} from '../data/portfolioData';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-neutral-200">
        {/* Top Control Bar (Hidden on print) */}
        <div className="print:hidden sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-neutral-900 text-neutral-100 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">
              Official CV / Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Content (Clean High-Contrast UK Finance CV Standard) */}
        <div className="p-8 sm:p-12 space-y-8 font-sans print:p-0 print:space-y-6">
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-4 text-center sm:text-left">
            <h1 className="text-3xl font-bold uppercase tracking-tight text-neutral-900">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-semibold text-emerald-800 mt-1 uppercase tracking-wide">
              {PERSONAL_INFO.title}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-neutral-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-800" />
                {PERSONAL_INFO.address}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-800" />
                {PERSONAL_INFO.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-neutral-800" />
                {PERSONAL_INFO.email}
              </span>
            </div>
          </div>

          {/* Professional Objective */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify">
              {PERSONAL_INFO.cvObjective}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Education & Qualifications
            </h2>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-neutral-900">
                    <span>{edu.qualification}</span>
                    <span className="font-mono text-neutral-600 font-normal">{edu.period}</span>
                  </div>
                  <div className="text-neutral-700 italic">{edu.institution}</div>
                  {edu.grade && (
                    <div className="font-semibold text-emerald-900 mt-0.5">{edu.grade}</div>
                  )}
                  {edu.details && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-700">
                      {edu.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Professional Work Experience
            </h2>

            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-neutral-900">
                    <span className="text-sm">{exp.role}</span>
                    <span className="font-mono text-neutral-600 font-normal">{exp.period}</span>
                  </div>
                  <div className="text-neutral-700 font-medium">{exp.company} — {exp.location}</div>

                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-neutral-700">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-snug">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills & Software */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Key Accounting Software & Competencies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-neutral-900 block mb-1">Financial Software:</span>
                <p className="text-neutral-700">
                  Xero (Certified), QuickBooks (Certified), Sage 50, Sage One, Sage Payroll, Unit4 ERPx, VT Final Accounts, Dext AI, Advanced Microsoft Excel (Pivot Tables, Lookups, Modeling), Power BI.
                </p>
              </div>

              <div>
                <span className="font-bold text-neutral-900 block mb-1">Technical Skills:</span>
                <p className="text-neutral-700">
                  Statutory Financial Statements, UK Corporation Tax, MTD VAT Returns, Double-entry Bookkeeping, Bank Reconciliations, PAYE Payroll, Variance Analysis, Forecasting.
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700 font-mono">
              {LANGUAGES.map((lang) => (
                <span key={lang.language}>
                  <strong>{lang.language}:</strong> {lang.proficiency}
                </span>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="text-xs text-neutral-600 pt-2 border-t border-neutral-200 text-center">
            Professional references available upon request.
          </div>
        </div>
      </div>
    </div>
  );
};
