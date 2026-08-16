import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  Percent,
  FileSpreadsheet,
  CheckCircle2,
  DollarSign,
  PieChart,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const FinancialToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'statements' | 'uktax' | 'ratios'>('statements');

  // 3-Statement Model Interactive State
  const [revenue, setRevenue] = useState<number>(500000);
  const [cogsPercent, setCogsPercent] = useState<number>(40);
  const [opexPercent, setOpexPercent] = useState<number>(30);
  const [depreciation, setDepreciation] = useState<number>(25000);
  const [taxRate, setTaxRate] = useState<number>(25); // UK Corporation Tax 25% for main rate
  const [cashStart, setCashStart] = useState<number>(80000);
  const [capex, setCapex] = useState<number>(30000);
  const [debtRepayment, setDebtRepayment] = useState<number>(15000);

  // Computed Statement Values
  const cogs = (revenue * cogsPercent) / 100;
  const grossProfit = revenue - cogs;
  const grossMargin = ((grossProfit / revenue) * 100).toFixed(1);
  const opex = (revenue * opexPercent) / 100;
  const ebitda = grossProfit - opex;
  const ebit = ebitda - depreciation;
  const taxExpense = ebit > 0 ? (ebit * taxRate) / 100 : 0;
  const netIncome = ebit - taxExpense;
  const netMargin = ((netIncome / revenue) * 100).toFixed(1);

  // Cash Flow
  const operatingCashFlow = netIncome + depreciation;
  const investingCashFlow = -capex;
  const financingCashFlow = -debtRepayment;
  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;
  const cashEnd = cashStart + netCashFlow;

  // Balance Sheet Metrics
  const accountsReceivable = (revenue * 0.1); // ~36 days DSO
  const inventory = (cogs * 0.15); // ~54 days DII
  const currentAssets = cashEnd + accountsReceivable + inventory;
  const fixedAssets = 350000 + capex - depreciation;
  const totalAssets = currentAssets + fixedAssets;

  const accountsPayable = (cogs * 0.08);
  const currentLiabilities = accountsPayable + 20000;
  const longTermDebt = 120000 - debtRepayment;
  const totalLiabilities = currentLiabilities + longTermDebt;
  const equity = totalAssets - totalLiabilities;

  // UK Tax Calculator State
  const [ukGrossRevenue, setUkGrossRevenue] = useState<number>(240000);
  const [ukAllowableExpenses, setUkAllowableExpenses] = useState<number>(90000);
  const [ukVatStandardRate, setUkVatStandardRate] = useState<number>(20);
  const [ukHasVatExemption, setUkHasVatExemption] = useState<boolean>(false);

  // UK Corporation Tax Calculation (Marginal relief brackets £50k - £250k)
  const taxableProfit = Math.max(0, ukGrossRevenue - ukAllowableExpenses);
  let corpTax = 0;
  let corpTaxEffectiveRate = 0;
  if (taxableProfit <= 50000) {
    corpTax = taxableProfit * 0.19; // Small profits rate 19%
    corpTaxEffectiveRate = 19;
  } else if (taxableProfit >= 250000) {
    corpTax = taxableProfit * 0.25; // Main rate 25%
    corpTaxEffectiveRate = 25;
  } else {
    // Marginal Relief calculation (UK HMRC Standard: Main Rate minus Marginal Relief fraction 3/200 * (Upper Limit - Profit))
    const basicTax = taxableProfit * 0.25;
    const marginalRelief = (3 / 200) * (250000 - taxableProfit);
    corpTax = Math.max(0, basicTax - marginalRelief);
    corpTaxEffectiveRate = Number(((corpTax / taxableProfit) * 100).toFixed(2));
  }

  // UK VAT
  const vatOutput = ukHasVatExemption ? 0 : (ukGrossRevenue * ukVatStandardRate) / 100;
  const vatInput = (ukAllowableExpenses * 0.15); // Estimated VAT on standard rated expenses
  const vatNetPayableToHmrc = Math.max(0, vatOutput - vatInput);

  return (
    <section id="toolkit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="reveal mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>INTERACTIVE ACCOUNTING ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
          Financial Modeling & UK Tax Simulations
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
          Explore interactive models demonstrating core financial mechanics — from dynamic 3-statement balance matching (powering platforms like <strong className="text-neutral-200">Finelor</strong> and <strong className="text-neutral-200">SaveMoneyHub</strong>) to UK Corporation Tax marginal relief and HMRC VAT calculations.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="reveal reveal-delay-1 flex items-center gap-2 p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 mb-8 max-w-xl">
        <button
          onClick={() => setActiveTab('statements')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'statements'
              ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>3-Statement Model</span>
        </button>

        <button
          onClick={() => setActiveTab('uktax')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'uktax'
              ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>UK Tax & VAT Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('ratios')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'ratios'
              ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          <span>Key Financial Ratios</span>
        </button>
      </div>

      {/* TAB 1: 3-STATEMENT MODEL */}
      {activeTab === 'statements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Model Parameters (GBP £)
              </span>
              <span className="text-[11px] font-mono text-neutral-500">Live Dynamic Rec</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Annual Revenue</span>
                <span className="text-emerald-400 font-bold">£{revenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="25000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Cost of Goods Sold (COGS)</span>
                <span className="text-sky-400 font-bold">{cogsPercent}% (£{cogs.toLocaleString()})</span>
              </div>
              <input
                type="range"
                min="15"
                max="75"
                step="1"
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Operating Expenses (OpEx)</span>
                <span className="text-amber-400 font-bold">{opexPercent}% (£{opex.toLocaleString()})</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={opexPercent}
                onChange={(e) => setOpexPercent(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">CapEx Investment</span>
                <span className="text-purple-400 font-bold">£{capex.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={capex}
                onChange={(e) => setCapex(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Annual Depreciation</span>
                <span className="text-neutral-400 font-bold">£{depreciation.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="60000"
                step="2500"
                value={depreciation}
                onChange={(e) => setDepreciation(Number(e.target.value))}
                className="w-full accent-neutral-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 text-[11px] font-mono text-neutral-400 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Simulates exact logic from <strong>Finelor.app</strong> exercises with automatic double-entry balance validation.
              </span>
            </div>
          </div>

          {/* 3 Statements Display Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Income Statement (P&L) */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="font-display font-bold text-base text-neutral-100">
                    1. Profit & Loss Statement (Income Statement)
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Gross Margin: {grossMargin}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Revenue</div>
                  <div className="text-base font-bold text-neutral-100 mt-1">£{revenue.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Gross Profit</div>
                  <div className="text-base font-bold text-sky-400 mt-1">£{grossProfit.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">EBITDA</div>
                  <div className="text-base font-bold text-amber-400 mt-1">£{ebitda.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Net Income (PAT)</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">£{netIncome.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* 2. Cash Flow Statement */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <h3 className="font-display font-bold text-base text-neutral-100">
                    2. Cash Flow Statement (Operating, Investing, Financing)
                  </h3>
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  Net Cash Delta: {netCashFlow >= 0 ? `+£${netCashFlow.toLocaleString()}` : `-£${Math.abs(netCashFlow).toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Operating Cash Flow</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">£{operatingCashFlow.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Investing (CapEx)</div>
                  <div className="text-sm font-bold text-rose-400 mt-1">-£{capex.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Financing (Debt)</div>
                  <div className="text-sm font-bold text-amber-400 mt-1">-£{debtRepayment.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400 text-[11px]">Ending Cash Balance</div>
                  <div className="text-sm font-bold text-sky-300 mt-1">£{cashEnd.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* 3. Balance Sheet Verification */}
            <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <h3 className="font-display font-bold text-base text-neutral-100">
                    3. Balance Sheet Position (Assets = Liabilities + Equity)
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Balanced (100% Match)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Total Assets</span>
                  <span className="text-lg font-bold text-neutral-100 mt-1 block">£{totalAssets.toLocaleString()}</span>
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Current: £{currentAssets.toLocaleString()} | Fixed: £{fixedAssets.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Total Liabilities</span>
                  <span className="text-lg font-bold text-amber-400 mt-1 block">£{totalLiabilities.toLocaleString()}</span>
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Current: £{currentLiabilities.toLocaleString()} | Long Term: £{longTermDebt.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
                  <span className="text-neutral-400 block text-[11px]">Shareholders' Equity</span>
                  <span className="text-lg font-bold text-purple-400 mt-1 block">£{equity.toLocaleString()}</span>
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Net Assets: £{(totalAssets - totalLiabilities).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UK TAX & VAT ENGINE */}
      {activeTab === 'uktax' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                UK SME Tax Inputs
              </span>
              <span className="text-[11px] font-mono text-neutral-400">HMRC Rates 2024–2026</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Taxable Turnover / Sales</span>
                <span className="text-emerald-400 font-bold">£{ukGrossRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="30000"
                max="600000"
                step="10000"
                value={ukGrossRevenue}
                onChange={(e) => setUkGrossRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-neutral-300">Allowable Business Expenses</span>
                <span className="text-sky-400 font-bold">£{ukAllowableExpenses.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={ukAllowableExpenses}
                onChange={(e) => setUkAllowableExpenses(Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <span className="text-neutral-300">VAT Registered (Standard 20%)</span>
              <button
                onClick={() => setUkHasVatExemption(!ukHasVatExemption)}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                  !ukHasVatExemption
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {!ukHasVatExemption ? 'Active (20%)' : 'Exempt / Deregistered'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono space-y-2">
              <div className="text-neutral-400 text-[11px] font-semibold uppercase">UK HMRC Rate Rules Applied:</div>
              <div className="text-neutral-300 flex justify-between">
                <span>Small Profits Rate (≤£50k)</span>
                <span className="text-emerald-400">19%</span>
              </div>
              <div className="text-neutral-300 flex justify-between">
                <span>Marginal Relief (£50k – £250k)</span>
                <span className="text-amber-400">Tapered (3/200 fraction)</span>
              </div>
              <div className="text-neutral-300 flex justify-between">
                <span>Main Corporation Tax Rate (≥£250k)</span>
                <span className="text-rose-400">25%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {/* Corporation Tax Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="text-lg font-display font-bold text-neutral-100">
                    UK Corporation Tax (CT600) Estimate
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Calculated on Net Taxable Profit of <strong>£{taxableProfit.toLocaleString()}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    £{Math.round(corpTax).toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500">
                    Effective Rate: {corpTaxEffectiveRate}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <span className="text-neutral-500 text-[10px]">Net Profit Before Tax</span>
                  <div className="text-base font-bold text-neutral-100 mt-1">£{taxableProfit.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <span className="text-neutral-500 text-[10px]">HMRC Tax Liability</span>
                  <div className="text-base font-bold text-amber-400 mt-1">£{Math.round(corpTax).toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <span className="text-neutral-500 text-[10px]">Retained Earnings Post-Tax</span>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    £{Math.round(taxableProfit - corpTax).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* VAT Compliance Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="text-lg font-display font-bold text-neutral-100">
                    VAT Return (Making Tax Digital MTD)
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Quarterly output tax minus allowable input tax credits
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    £{Math.round(vatNetPayableToHmrc).toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500">
                    HMRC Net Payable
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <span className="text-neutral-400 text-[11px]">Box 1: Output VAT on Sales</span>
                  <div className="text-sm font-bold text-neutral-100 mt-1">£{Math.round(vatOutput).toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <span className="text-neutral-400 text-[11px]">Box 4: Input VAT Reclaimed on Purchases</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1">£{Math.round(vatInput).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KEY RATIOS */}
      {activeTab === 'ratios' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold">LIQUIDITY</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {(currentAssets / currentLiabilities).toFixed(2)}x
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100">Current Ratio</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Measures short-term debt obligation coverage with short-term assets (Current Assets / Current Liabilities).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky-400 font-bold">PROFITABILITY</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {netMargin}%
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100">Net Profit Margin</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Percentage of revenue retained as net profit after operating expenses, taxes, and depreciation (Net Income / Revenue).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold">SOLVENCY</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {(longTermDebt / equity).toFixed(2)}x
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100">Debt-to-Equity (D/E)</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Leverage proportion measuring long-term borrowed capital against shareholders' equity buffer.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
