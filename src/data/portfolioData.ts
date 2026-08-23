import {
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ProjectItem,
  SkillCategory,
  LanguageItem,
} from '../types';

export const PORTFOLIO_PHOTOS = {
  headshot: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1725216171602.jpg?alt=media&token=db040920-a3e6-4e2f-9e5d-b11fca65138f',
  portrait: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1766183020815.jpg?alt=media&token=9aba4f5f-4c8f-4dac-a0c0-d8f3b0b5b313',
  event: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1766312020783.jpg?alt=media&token=9ffc717b-4568-4a9a-82a5-4abcd677b5f8',
  academic: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1772440021704.jpg?alt=media&token=101cd67b-6852-4a92-81db-29f0d6eb94cb',
  gallery: [
    {
      id: 'photo-1',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1725216171602.jpg?alt=media&token=db040920-a3e6-4e2f-9e5d-b11fca65138f',
      title: 'Executive Headshot',
      subtitle: 'Finance Analyst & Junior Management Accountant',
      category: 'Profile'
    },
    {
      id: 'photo-2',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1766183020815.jpg?alt=media&token=9aba4f5f-4c8f-4dac-a0c0-d8f3b0b5b313',
      title: 'Professional Advisory & Practice',
      subtitle: 'Financial Statements, VAT Filings & ERP Systems',
      category: 'Practice'
    },
    {
      id: 'photo-3',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1766312020783.jpg?alt=media&token=9ffc717b-4568-4a9a-82a5-4abcd677b5f8',
      title: 'FinTech & Software Architecture',
      subtitle: 'Deploying Finelor.app, SaveMoneyHub & n8n Data Pipelines',
      category: 'FinTech'
    },
    {
      id: 'photo-4',
      url: 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/Portfolio%2F1772440021704.jpg?alt=media&token=101cd67b-6852-4a92-81db-29f0d6eb94cb',
      title: 'Academic & Professional Journey',
      subtitle: 'BSc (Hons) 1st Class Accounting & Finance | ACCA',
      category: 'Academic'
    }
  ]
};

export const PERSONAL_INFO = {
  name: 'Rabins Bhusal',
  avatarUrl: PORTFOLIO_PHOTOS.headshot,
  title: 'Finance Analyst & Junior Management Accountant',
  degrees: 'First-Class BSc (Hons) Accounting and Finance | ACCA Candidate',
  email: 'rabinsbhusal25@gmail.com',
  phone: '+44 (0) 7700 900845',
  location: 'London, England, United Kingdom',
  address: '71 Mascalls Court, Victoria Way, London',
  linkedinUrl: 'https://www.linkedin.com/in/rabinsbhusal',
  githubUrl: 'https://github.com/RabinsBhusal',
  summary:
    'Motivated finance professional with extensive experience in UK accounting firms and higher education financial management. Confident in utilizing Xero (Certified), QuickBooks (Certified), Sage 50, Sage Payroll, Unit4 ERPx, VT Final Accounts, Dext, Power BI, and advanced Excel. Proven record in preparing period-end statutory accounts, quarterly VAT returns with 100% on-time compliance, multi-entity bank reconciliations, payroll, in-year budgeting, and long-term financial forecasting. Holding a First-Class Honours degree in Accounting and Finance and actively completing the ACCA qualification.',
  cvObjective:
    'Highly skilled finance professional proficient in Xero, QuickBooks, Excel, Sage 50, Sage One, and Sage Payroll with a First Class Honours degree in BSc Accounting and Finance. Seeking to leverage UK accounting practice and financial systems experience into high-impact management accounting and analytical roles.',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-uel-jma',
    role: 'Junior Management Accountant',
    company: 'University of East London',
    period: 'May 2026 – Present',
    duration: 'Current',
    location: 'London, United Kingdom',
    type: 'Current',
    category: 'Accounting',
    highlights: [
      'Conduct monthly income and expenditure reporting and financial variance analysis across major university faculties and corporate divisions.',
      'Provide continuous advisory, strategic support, and financial guidance for university budget holders and department heads.',
      'Lead in-year income and expenditure budgeting, multi-year forecasting models, and financial performance tracking.',
      'Prepare statutory regulatory returns and compliance submissions in accordance with UK higher education standards.',
      'Deliver commercial financial support for budget holders and senior executive leadership, including comprehensive costing models for new business cases.',
    ],
    skillsUsed: [
      'Management Accounting',
      'Budgeting & Forecasting',
      'Financial Reporting',
      'Unit4 ERPx',
      'Variance Analysis',
      'Excel Modeling',
    ],
  },
  {
    id: 'exp-uel-fsa',
    role: 'Financial Systems Analyst',
    company: 'University of East London',
    period: 'September 2025 – April 2026',
    duration: '8 months',
    location: 'University Way, London',
    type: 'Past',
    category: 'Financial Systems',
    highlights: [
      'Provided comprehensive 1st and 2nd line technical and operational support for core finance systems, including Unit4 ERPx and integrated applications (Flywire WPM, SITS-SAM, Proactis).',
      'Investigated and resolved complex accounting system discrepancies related to journal postings, bank reconciliations, automated workflows, and user permissions.',
      'Collaborated closely with IT engineering teams and external ERP vendors to troubleshoot and resolve system performance bottlenecks.',
      'Configured critical financial system elements including the Chart of Accounts, VAT rules, and automated BACS/bank file formats.',
      'Supported period-end close routines, assisted external and internal audit teams, and maintained strict internal financial controls documentation.',
      'Managed SharePoint infrastructure for secure document storage, audit trails, and version-controlled financial records.',
    ],
    skillsUsed: [
      'Unit4 ERPx',
      'Chart of Accounts Configuration',
      'VAT Systems',
      'Workflow Automation',
      'Proactis',
      'SharePoint',
      'Audit Support',
    ],
  },
  {
    id: 'exp-eixo',
    role: 'Co-Founder',
    company: 'Eixo Learning',
    period: 'January 2026 – July 2026',
    duration: '7 months',
    location: 'London, United Kingdom',
    type: 'Past',
    category: 'Education & Management',
    highlights: [
      'Co-founded Eixolearning.co.uk, an innovative online accounting education platform, guiding the venture from initial market research to live platform launch.',
      'Designed the comprehensive accounting learning structure and practical curriculum while directing external subject matter experts.',
      'Built and deployed the digital learning environment, overseeing user experience, registration workflows, and financial module exercises.',
      'Collected learner feedback and implemented iterative improvements to accelerate student comprehension of UK tax and bookkeeping.',
    ],
    skillsUsed: [
      'Educational Strategy',
      'Accounting Curriculum',
      'EdTech Management',
      'Financial Pedagogy',
      'User Research',
    ],
  },
  {
    id: 'exp-brighthub-bm',
    role: 'Business Manager',
    company: 'Brighthub Training & Recruitment',
    period: 'July 2025 – January 2026',
    duration: '7 months',
    location: 'London, United Kingdom',
    type: 'Past',
    category: 'Education & Management',
    highlights: [
      'Supervised day-to-day operations of professional accounting and bookkeeping training programs.',
      'Planned, developed, and delivered accredited accounting courses, aligning training materials with HMRC legislation and accounting software updates.',
      'Cultivated and maintained robust corporate relationships with accountancy practice clients, academic partners, and contractors.',
      'Monitored financial budgets, training unit profitability, and commercial growth initiatives.',
      'Led, mentored, and evaluated a multidisciplinary team of finance trainers and administrative staff.',
    ],
    skillsUsed: [
      'Operations Management',
      'Budget Monitoring',
      'Curriculum Development',
      'Stakeholder Management',
      'Staff Leadership',
    ],
  },
  {
    id: 'exp-brighthub-sales',
    role: 'Sales Specialist & Accounting Training Coordinator',
    company: 'Brighthub Training & Recruitment',
    period: 'October 2024 – June 2025',
    duration: '9 months',
    location: 'London, United Kingdom',
    type: 'Past',
    category: 'Education & Management',
    highlights: [
      'Delivered hands-on practical software training in Xero, QuickBooks, and Excel to aspiring accountants and industry professionals.',
      'Assisted students with professional CV writing, technical portfolio construction, and LinkedIn profile optimization.',
      'Demystified the UK tax system (VAT, Self-Assessment, Corporation Tax) through intuitive, real-world case studies.',
      'Enhanced instructional workflows using AI tools to modernize course delivery for statutory payments, pension submissions, and live payroll scenarios.',
    ],
    skillsUsed: [
      'Xero Training',
      'QuickBooks Training',
      'Payroll Modules',
      'UK Tax Instruction',
      'AI-Enhanced Training',
    ],
  },
  {
    id: 'exp-taxcare-aa',
    role: 'Accounts Assistant & Trainee Bookkeeper',
    company: 'Taxcare Accountancy Ltd',
    period: 'January 2024 – October 2025',
    duration: '1 year 10 months',
    location: 'Ilford, London, United Kingdom',
    type: 'Past',
    category: 'Accounting',
    highlights: [
      'Prepared complete statutory financial statements and quarterly VAT returns for 20+ small and medium-sized enterprise (SME) clients.',
      'Processed multi-company payroll runs, ensuring strict compliance with PAYE, National Insurance, pension auto-enrolment, and statutory deadlines.',
      'Streamlined manual receipt and invoice data entry using AI tools (such as Dext), boosting operational efficiency by 30%.',
      'Managed end-to-end bank reconciliations for 1,000+ monthly transactions, petty cash, supplier payments, and new company registrations with Companies House.',
      'Supported year-end statutory accounts preparation for entities with annual turnover up to £1m+ using VT Final Accounts.',
      'Liaised directly with client directors and HM Revenue & Customs (HMRC) to swiftly resolve technical tax and VAT queries.',
    ],
    skillsUsed: [
      'Statutory Financial Statements',
      'VAT Returns',
      'Payroll (PAYE / Pensions)',
      'VT Final Accounts',
      'Dext AI Automation',
      'HMRC Liaison',
      'Bank Reconciliations',
    ],
  },
  {
    id: 'exp-uktaxpoint',
    role: 'Trainee Bookkeeper',
    company: 'UK Tax Point',
    period: 'July 2023 – October 2023',
    duration: '4 months',
    location: 'Wood Green, London, United Kingdom',
    type: 'Past',
    category: 'Accounting',
    highlights: [
      'Configured and maintained sales and purchase ledgers across Sage 50, QuickBooks, and Xero.',
      'Processed supplier invoices, scheduled payment runs, and recorded customer receipts with complete accuracy.',
      'Prepared, reconciled, and submitted quarterly VAT returns in compliance with Making Tax Digital (MTD) standards.',
      'Assisted senior practice accountants with monthly balance sheet and trial balance reconciliations.',
    ],
    skillsUsed: [
      'Sage 50',
      'QuickBooks',
      'Xero',
      'Sales & Purchase Ledgers',
      'VAT Submissions',
    ],
  },
  {
    id: 'exp-kbm',
    role: 'Trainee Bookkeeper & Payroll Assistant',
    company: 'KBM Chartered Certified Accountants & Registered Auditors',
    period: 'January 2023 – June 2023',
    duration: '6 months',
    location: 'Park Royal, London, United Kingdom',
    type: 'Past',
    category: 'Accounting',
    highlights: [
      'Managed double-entry bookkeeping across customer sales ledgers and supplier purchase ledgers.',
      'Issued and matched sales invoices, credit notes, supplier remittances, and bank payment journals.',
      'Executed full bank and petty cash reconciliations for diverse SME and sole trader clients.',
      'Assisted in preparing and submitting VAT returns to HMRC.',
      'Generated compliant employee payslips, year-end P60s, and leaver P45 documentation.',
    ],
    skillsUsed: [
      'Double-Entry Bookkeeping',
      'Payroll (P45/P60)',
      'VAT Returns',
      'Sage 50',
      'Bank Reconciliation',
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-acca',
    institution: 'Association of Chartered Certified Accountants (ACCA)',
    qualification: 'ACCA Professional Qualification',
    period: 'October 2024 – 2027 (In Progress)',
    grade: 'Active Candidate',
    status: 'In Progress',
    details: [
      'Studying advanced Financial Accounting, Management Accounting, UK Taxation, and Strategic Business Reporting.',
      'Applying practical UK accounting practice experience directly toward ACCA Performance Objectives (PER).',
    ],
  },
  {
    id: 'edu-uel',
    institution: 'University of East London',
    qualification: 'Bachelor of Science (BSc Hons) in Accounting and Finance',
    period: 'September 2021 – June 2024',
    grade: 'First Class Honours (1st)',
    status: 'Graduated with Highest Honors',
    details: [
      'Conducted in-depth financial analysis and econometric valuation of company annual reports.',
      'Constructed dynamic Profit & Loss, Balance Sheet, and Statement of Cash Flows models in Excel.',
      'Mastered advanced financial modeling functions including complex nested formulas, Pivot Tables, What-If analyses, and data validation.',
      'Achieved top academic distinction across Corporate Financial Management, Auditing, and UK Tax Modules.',
    ],
  },
  {
    id: 'edu-oxford',
    institution: 'Oxford School of Business',
    qualification: 'Level 3 Diploma in Business Management',
    period: 'December 2020 – September 2021',
    grade: 'Merit / Distinction',
    status: 'Completed',
    details: [
      'Foundational principles of commercial business structures, financial record-keeping, and strategic operations.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-xero',
    title: 'Xero Certified Advisor',
    issuer: 'Xero',
    year: '2024',
    verified: true,
    category: 'Accounting Software',
    badgeCode: 'XERO-ADV-CERT',
  },
  {
    id: 'cert-qb',
    title: 'QuickBooks Certified User',
    issuer: 'Intuit QuickBooks',
    year: '2024',
    verified: true,
    category: 'Accounting Software',
    badgeCode: 'INTUIT-QB-CERT',
  },
  {
    id: 'cert-qb-payroll',
    title: 'QuickBooks Payroll Essential Training',
    issuer: 'Intuit QuickBooks',
    year: '2024',
    verified: true,
    category: 'Finance & Payroll',
    badgeCode: 'QB-PAYROLL-PRO',
  },
  {
    id: 'cert-digital-bookkeeping',
    title: 'Digital Bookkeeping and Payroll Certification',
    issuer: 'CPD / UK Training Standards',
    year: '2023',
    verified: true,
    category: 'Finance & Payroll',
    badgeCode: 'CPD-UK-BKP',
  },
  {
    id: 'cert-unit4',
    title: 'Unit4 erpX Purchase Requisition & Financial Controls',
    issuer: 'Unit4',
    year: '2025',
    verified: true,
    category: 'Enterprise ERP',
    badgeCode: 'UNIT4-ERPX-FIN',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-finelor',
    title: 'Finelor.app',
    tagline: 'Practical Corporate Finance & Financial Modelling Platform',
    period: 'August 2026 – Present',
    status: 'Active / Live Platform',
    category: 'Finance Platform',
    url: 'https://finelor.app',
    githubUrl: 'https://github.com/RabinsBhusal',
    description:
      'Finelor is a practical finance platform engineered for learning financial modelling, accounting, valuation, corporate finance, and financial analysis through interactive real-world exercises and comprehensive business cases.',
    skills: [
      'Financial Modelling',
      'Corporate Finance',
      'Valuation (DCF / Comps)',
      'Accounting Simulations',
      'Financial Statement Analysis',
      'React & TypeScript',
    ],
    mediaTabs: [
      {
        label: 'Dashboard',
        description:
          'Executive learner cockpit showcasing financial modelling modules, accounting progress tracks, and real-time valuation performance metrics.',
        details: [
          'Dynamic visual tracker for 3-statement modeling progress.',
          'Custom exercises simulating corporate balance sheets and debt schedules.',
          'Interactive scenario modeling with variable revenue and EBITDA assumptions.',
        ],
        metrics: [
          { label: 'Active Modules', value: '18+ Courses' },
          { label: 'Case Studies', value: '50+ Models' },
          { label: 'Core Focus', value: 'DCF & M&A' },
        ],
      },
      {
        label: 'Practice Page',
        description:
          'Interactive spreadsheet-like environment where users build dynamic discounted cash flow (DCF), LBO, and working capital schedules in real-time.',
        details: [
          'Real-time formula validation and balance sheet matching checks.',
          'Automated error detection on circular interest expense and depreciation loops.',
          'Benchmarking outputs against actual historical corporate SEC / Companies House filings.',
        ],
        metrics: [
          { label: 'Formula Engine', value: 'Instant Check' },
          { label: 'Format', value: 'Excel Parity' },
        ],
      },
      {
        label: 'Assessment Page',
        description:
          'Rigorous financial testing suite assessing accounting compliance, IFRS/UK GAAP standards, and complex ratio analysis under time constraints.',
        details: [
          'Timed scenario assessments simulating investment banking & corporate accounting interviews.',
          'Instant grading with detailed breakdown of journal entries and adjustments.',
          'Personalized feedback highlighting variance calculations and cash cycle metrics.',
        ],
        metrics: [
          { label: 'Question Bank', value: '500+ Items' },
          { label: 'Standards', value: 'UK GAAP / IFRS' },
        ],
      },
    ],
  },
  {
    id: 'proj-savemoneyhub',
    title: 'SaveMoneyHub.app',
    tagline: 'Comprehensive Personal Financial Statements & Wealth Tracker',
    period: 'August 2026 – Present',
    status: 'Active / Live Platform',
    category: 'Personal Finance',
    url: 'https://savemoneyhub.app',
    githubUrl: 'https://github.com/RabinsBhusal',
    description:
      'SaveMoneyHub brings institutional accounting rigor into personal finances. Manage budgets, track income & expenditure, analyze savings & investments, plan for retirement, and gain an audit-ready view of overall net worth.',
    skills: [
      'Personal Balance Sheet',
      'Personal P&L Statement',
      'Cash Flow Tracking',
      'Budgeting & Variance',
      'Retirement Forecasting',
      'Net Worth Analytics',
    ],
    mediaTabs: [
      {
        label: 'Personal Balance Sheet',
        description:
          'Institutional-grade personal asset and liability balance sheet calculating liquid capital, property equity, retirement portfolios, and debt obligations.',
        details: [
          'Categorizes current assets (cash, savings) vs. non-current assets (real estate, pensions, ISA accounts).',
          'Tracks current liabilities (credit cards, short-term loans) against long-term mortgages.',
          'Computes real-time personal net worth with solvency and liquidity ratios.',
        ],
        metrics: [
          { label: 'Accounting Base', value: 'Double-Entry' },
          { label: 'Metric', value: 'Net Worth & Solvency' },
        ],
      },
      {
        label: 'Personal Profit & Loss',
        description:
          'Granular income statement comparing monthly earned salary, dividends, capital gains, operating living expenses, and discretionary spending.',
        details: [
          'Identifies gross savings rate before and after taxes.',
          'Automated categorisation of fixed vs. variable personal expenses.',
          'Monthly variance analysis highlighting budget overruns in real-time.',
        ],
        metrics: [
          { label: 'P&L Granularity', value: 'Monthly / YTD' },
          { label: 'Analysis', value: 'Savings Margin' },
        ],
      },
      {
        label: 'Personal Cashflow Statement',
        description:
          'Three-tier cashflow statement breaking down Operating Cash Flow, Investing Activities (Stocks, Crypto, Real Estate), and Financing Activities (Mortgage Principal, Loan Repayments).',
        details: [
          'Direct mapping of net cash delta to bank balance adjustments.',
          'Eliminates non-cash distortions like asset depreciation.',
          'Includes retirement forecasting engine with compound interest calculations.',
        ],
        metrics: [
          { label: 'Structure', value: 'Operating/Invest/Finance' },
          { label: 'Forecast', value: '10–40 Year Horizon' },
        ],
      },
    ],
  },
  {
    id: 'proj-indigenously',
    title: 'Business Planning & Financial Advisory for Indigenously Infused',
    tagline: 'Strategic Financial Consultancy & Break-Even Analysis',
    period: 'February 2024 – April 2024',
    status: 'Completed Consultancy Project',
    category: 'Consultancy',
    description:
      'Led an executive consultancy project supporting Indigenously Infused, a natural candle brand startup. Acted as primary liaison between the founder and consultancy team, establishing robust bookkeeping, budgeting models, and regional sales analytics.',
    skills: [
      'Financial Projections',
      'Break-Even Analysis',
      'Cash Flow Forecasting',
      'Shopify E-Commerce Analytics',
      'Bookkeeping Setup',
      'Commercial Strategy',
    ],
    mediaTabs: [
      {
        label: 'Financial Projections & Break-Even',
        description:
          'Engineered comprehensive 3-year revenue projections and unit-level contribution margin break-even models to guide product pricing strategy.',
        details: [
          'Calculated exact unit economics factoring raw materials, fragrance oils, packaging, and shipping freight.',
          'Simulated break-even volume under diverse retail vs. direct-to-consumer (DTC) pricing tiers.',
          'Built 12-month rolling cash flow forecast to prevent inventory working capital shortages.',
        ],
        metrics: [
          { label: 'Time Horizon', value: '3-Year Model' },
          { label: 'Analysis', value: 'Unit Contribution' },
        ],
      },
      {
        label: 'Shopify Regional Sales Optimization',
        description:
          'Analyzed historical Shopify sales data across Canadian provinces to pinpoint high-margin geographic regions and optimize digital marketing spend.',
        details: [
          'Identified top 3 highest-margin provinces with lowest logistics friction.',
          'Recommended targeted inventory distribution centers to reduce order turnaround time.',
          'Delivered final presentation to the founder on commercial scalability.',
        ],
        metrics: [
          { label: 'Dataset', value: 'Provincial Sales' },
          { label: 'Outcome', value: 'Expanded Presence' },
        ],
      },
    ],
  },
  {
    id: 'proj-n8n-automation',
    title: 'Automated Job & Finance Tracking Pipeline (N8N)',
    tagline: 'Automated Multi-Channel Application & Data Pipeline',
    period: 'July 2026',
    status: 'Production Workflow',
    category: 'Automation / EdTech',
    description:
      'Engineered an enterprise-grade automation workflow using N8N, Google Sheets, and custom API webhooks to monitor opportunities, parse data, eliminate duplicates, and dispatch real-time status updates.',
    skills: [
      'N8N Automation',
      'Google Sheets API',
      'Data Pipelines',
      'Webhook Architecture',
      'Process Efficiency',
    ],
    mediaTabs: [
      {
        label: 'N8N Workflow Architecture',
        description:
          'Automated data pipeline capturing job and business leads, parsing requirements with regex and AI models, and logging statuses in a centralized dashboard.',
        details: [
          'Syncs data between spreadsheets, email alerts, and centralized tables.',
          'Prevents duplicate submissions via cryptographic hash matching.',
          'Zero-latency email triggers keeping records up-to-date automatically.',
        ],
      },
    ],
  },
  {
    id: 'proj-focoflo',
    title: 'FocoFlo Productivity & Exam Tracker',
    tagline: 'Deep Work & Syllabus Manager for University & Professional Exam Takers',
    period: 'July 2026 – Present',
    status: 'Live Platform',
    category: 'Automation / EdTech',
    description:
      'A specialized digital workspace designed for university students and professional exam candidates (such as ACCA, ACA, and CFA). Organize syllabi, track deep work hours, set multi-day review milestones, and monitor weekly progress.',
    skills: [
      'Syllabus Structuring',
      'ACCA Study Workflows',
      'Time Analytics',
      'Goal Tracking',
    ],
    mediaTabs: [
      {
        label: 'Exam Syllabus Workspace',
        description:
          'Structured tracker allowing learners to map entire multi-module professional accounting syllabi with milestone alerts.',
        details: [
          'Tracks revision hours across financial accounting, audit, and tax modules.',
          'Visual progress rings measuring percentage mastery of curriculum topics.',
        ],
      },
    ],
  },
  {
    id: 'proj-portuguese-hub',
    title: 'Learn Portuguese Hub',
    tagline: 'Language & Relocation Financial Guide',
    period: 'June 2026 – Present',
    status: 'Live Platform',
    category: 'Automation / EdTech',
    description:
      'Structured educational platform for Portuguese learners (A1-A2 CIPLE exam) featuring pre-scripted real-life dialogues and practical financial guides covering Portuguese NIF (Tax Number), banking, housing, and healthcare systems.',
    skills: [
      'Portuguese Tax (NIF) Guides',
      'Cross-Border Finance',
      'Curriculum Design',
      'Interactive Learning Games',
    ],
    mediaTabs: [
      {
        label: 'NIF & Relocation Finance',
        description:
          'Step-by-step guides explaining how to navigate the Portuguese tax authority (Finanças), obtain a NIF, open local bank accounts, and understand tax residency.',
        details: [
          'Clear explanations of Portuguese tax brackets and fiscal representative rules.',
          'Interactive vocabulary games for daily banking transactions.',
        ],
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Accounting & Financial Reporting',
    iconName: 'Calculator',
    skills: [
      {
        name: 'Statutory Financial Statements',
        level: 'Expert',
        description:
          'Preparation of Year-End Accounts, Balance Sheets, Profit & Loss Statements, and Trial Balance reconciliations for SMEs under UK GAAP / FRS 102/105.',
        tags: ['P&L', 'Balance Sheet', 'FRS 102', 'Trial Balance'],
      },
      {
        name: 'UK Taxation & HMRC Compliance',
        level: 'Expert',
        description:
          'Corporation Tax (CT600), Partnership Tax, Self-Assessment Personal Tax Returns, and Making Tax Digital (MTD) VAT returns with 100% on-time record.',
        tags: ['VAT Returns', 'CT600', 'Self-Assessment', 'HMRC MTD'],
      },
      {
        name: 'Management Accounting & Forecasting',
        level: 'Advanced',
        description:
          'Monthly income and expenditure reporting, departmental budget variance analysis, rolling cash flow forecasts, and commercial business case costings.',
        tags: ['Budgeting', 'Variance Analysis', 'Forecasting', 'Costings'],
      },
      {
        name: 'Bookkeeping & Double-Entry Ledgers',
        level: 'Expert',
        description:
          'End-to-end sales and purchase ledger maintenance, accounts payable/receivable (AP/AR), credit card and multi-currency bank reconciliations.',
        tags: ['Sales Ledger', 'Purchase Ledger', 'AP/AR', 'Bank Recs'],
      },
      {
        name: 'Payroll Processing & PAYE',
        level: 'Expert',
        description:
          'Full-cycle payroll processing, statutory deductions, National Insurance, auto-enrolment pensions, RTI submissions, payslips, P45, and P60 generation.',
        tags: ['PAYE', 'P45 / P60', 'Pensions', 'RTI Submissions'],
      },
    ],
  },
  {
    title: 'Financial Software & ERP Systems',
    iconName: 'Laptop',
    skills: [
      {
        name: 'Xero Accounting (Certified)',
        level: 'Expert',
        description:
          'Certified Xero Advisor: Chart of Accounts setup, bank feeds, recurring invoices, automated rules, fixed asset registers, and VAT return filing.',
        tags: ['Xero Certified', 'Bank Feeds', 'Fixed Assets'],
      },
      {
        name: 'Intuit QuickBooks (Certified)',
        level: 'Expert',
        description:
          'QuickBooks Online & Desktop: Ledger management, multi-entity accounting, automated journal entries, and payroll management.',
        tags: ['QB Certified', 'Payroll Essentials', 'Reconciliations'],
      },
      {
        name: 'Sage 50 / Sage One / Sage Payroll',
        level: 'Advanced',
        description:
          'Comprehensive experience across Sage 50 Accounts and Sage Payroll: posting journals, ledger setups, VAT reconciliations, and payroll processing.',
        tags: ['Sage 50 Accounts', 'Sage Payroll', 'Journal Entries'],
      },
      {
        name: 'Unit4 ERPx & Enterprise Systems',
        level: 'Advanced',
        description:
          'Higher education enterprise ERP administration, purchase requisitions, workflow routing, Chart of Accounts configuration, and audit control trails.',
        tags: ['Unit4 ERPx', 'Proactis', 'Flywire WPM', 'SITS-SAM'],
      },
      {
        name: 'VT Final Accounts & Dext AI',
        level: 'Advanced',
        description:
          'Statutory accounts assembly in VT Software for £1m+ turnover entities; automated optical character recognition (OCR) invoice ingestion in Dext.',
        tags: ['VT Software', 'Dext AI (+30% speed)', 'OCR Bookkeeping'],
      },
      {
        name: 'Advanced Microsoft Excel & Power BI',
        level: 'Expert',
        description:
          'Advanced modeling (XLOOKUP, INDEX/MATCH, nested logic, Pivot Tables, Power Query, Data Validation, dynamic charts) and Power BI dashboards.',
        tags: ['Pivot Tables', 'Power Query', 'Power BI', 'Financial Models'],
      },
    ],
  },
  {
    title: 'Financial Analysis & Systems Architecture',
    iconName: 'TrendingUp',
    skills: [
      {
        name: 'Financial Modeling & Valuation',
        level: 'Advanced',
        description:
          'Construction of dynamic 3-statement financial models, discounted cash flow (DCF) valuations, scenario sensitivity analysis, and break-even models.',
        tags: ['3-Statement Models', 'DCF Valuation', 'Break-Even'],
      },
      {
        name: 'ERP Data Governance & Audit Support',
        level: 'Advanced',
        description:
          'Assisting internal/external audits, establishing internal financial controls, maintaining segregation of duties, and SharePoint document management.',
        tags: ['Audit Trails', 'Internal Controls', 'SharePoint'],
      },
      {
        name: 'FinTech & Workflow Automation',
        level: 'Advanced',
        description:
          'Building custom automated workflows with N8N, webhooks, and AI-assisted bookkeeping to eliminate repetitive ledger data entry.',
        tags: ['N8N Automation', 'AI Bookkeeping', 'Process Streamlining'],
      },
    ],
  },
];

export const LANGUAGES: LanguageItem[] = [
  { language: 'English', proficiency: 'Native / Bilingual', fluencyScore: 100 },
  { language: 'Nepali', proficiency: 'Native / Bilingual', fluencyScore: 100 },
  { language: 'Portuguese', proficiency: 'Professional Working Proficiency', fluencyScore: 85 },
  { language: 'Hindi', proficiency: 'Native / Bilingual', fluencyScore: 95 },
  { language: 'Spanish', proficiency: 'Professional Working Proficiency', fluencyScore: 80 },
  { language: 'Urdu', proficiency: 'Working Knowledge', fluencyScore: 75 },
  { language: 'Galician', proficiency: 'Elementary / Conversational', fluencyScore: 65 },
];

export const HOBBIES_AND_INTERESTS = [
  {
    title: 'Financial Technology & AI Workflow Research',
    description:
      'Exploring how machine learning and automation tools transform bookkeeping accuracy, tax filing speed, and corporate cash flow forecasting.',
  },
  {
    title: 'Educational Video Production & Content Creation',
    description:
      'Researched, scripted, and edited finance and learning videos for YouTube, Rumble, and Twitch to demystify complex tax concepts.',
  },
  {
    title: 'E-Commerce Sourcing & Operations',
    description:
      'Managed end-to-end product sourcing and online merchant selling on eBay, managing inventory costs, shipping logistics, and profit margins.',
  },
];
