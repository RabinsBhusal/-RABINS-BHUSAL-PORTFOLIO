import React, { useState } from 'react';
import { PERSONAL_INFO, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [service, setService] = useState('Management Accounts & Reporting');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LET'S CONNECT</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-100 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2">
              Available for full-time finance analyst, junior management accountant roles, ERP implementations, and UK accountancy consulting.
            </p>
          </div>

          {/* Profile Card with Photo */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900/60 to-neutral-900/60 border border-emerald-500/20 flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-500/40 shrink-0">
              <img
                src={PORTFOLIO_PHOTOS.portrait}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-neutral-100">
                {PERSONAL_INFO.name}
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                Junior Management Accountant & Finance Analyst
              </p>
              <div className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for UK permanent & contract positions
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 block">Email Address</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-bold text-neutral-200 hover:text-emerald-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-500 block">Direct Phone / WhatsApp</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-bold text-neutral-200 hover:text-emerald-400 transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-500 block">Base Location</span>
                <span className="text-sm font-bold text-neutral-200">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="reveal rounded-3xl bg-neutral-900/80 border border-neutral-800 p-8">
            <h3 className="text-xl font-display font-bold text-neutral-100 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs font-mono text-neutral-400 mb-6">
              Recruitment inquiries, financial modeling consulting, or accounting advisory.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-display font-bold text-neutral-100">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you for reaching out. Rabins will respond directly to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Engagement Category
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                  >
                    <option>Permanent Finance / Accounting Opportunity</option>
                    <option>Management Accounts & Reporting</option>
                    <option>Statutory Accounts & UK Tax Advisory</option>
                    <option>ERP / Financial Systems Implementation (Unit4/Xero)</option>
                    <option>Financial Modeling / Finelor & SaveMoneyHub Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding the role, organisation, or project requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
