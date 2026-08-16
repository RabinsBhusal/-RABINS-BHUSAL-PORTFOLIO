/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LinkedInProfileCard } from './components/LinkedInProfileCard';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FinanceProjects } from './components/FinanceProjects';
import { FinancialToolkit } from './components/FinancialToolkit';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CertificationsAndEducation } from './components/CertificationsAndEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { useParallaxAndReveals } from './hooks/useParallaxAndReveals';

export default function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  // Initialize IntersectionObserver reveals, scroll parallax, and pointermove tracking
  useParallaxAndReveals();

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col font-sans">
      {/* Top Executive Navigation */}
      <Navbar
        onOpenCV={() => setIsCVModalOpen(true)}
      />

      {/* Main Interactive Sections */}
      <main className="flex-1">
        {/* Executive Hero */}
        <Hero
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* LinkedIn Profile & Endorsements Card */}
        <LinkedInProfileCard
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* Work Experience & Accounting Practice Timeline */}
        <ExperienceTimeline />

        {/* LinkedIn Featured Projects (Finelor, SaveMoneyHub, Indigenously Infused, etc.) */}
        <FinanceProjects />

        {/* Interactive Accounting Engine & 3-Statement Model Simulation */}
        <FinancialToolkit />

        {/* Accounting Competencies, Software & Multilingual Matrix */}
        <SkillsMatrix />

        {/* Education, ACCA Track & Official Certifications */}
        <CertificationsAndEducation />

        {/* Contact & Recruitment Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer with dynamic #year synchronization */}
      <Footer
        onOpenCV={() => setIsCVModalOpen(true)}
      />

      {/* Full Print/Export Ready Official CV Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </div>
  );
}
