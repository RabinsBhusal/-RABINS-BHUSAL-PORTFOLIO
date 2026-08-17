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
  Scale,
  Settings,
  HelpCircle
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

  // Active cell/formula context for the formula bar
  const [activeFormula, setActiveFormula] = useState<string>('B1 (Revenue - User Parameter input)');
  const [activeCellCoord, setActiveCellCoord] = useState<string>('B2');

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

  const handleCellSelect = (cellCoord: string, formulaString: string) => {
    setActiveCellCoord(cellCoord);
    setActiveFormula(formulaString);
  };

  return (
    <section id="toolkit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="reveal mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>LEDGER ENGINE V3.4_LIVE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100 tracking-tight">
          Financial Modeling Workbooks
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-3xl">
          A fully interactive, client-side financial model simulated inside an Excel-styled grid layout. Click on different data cells to inspect active mathematical formulas (`fx`) inside the real-time formula engine.
        </p>
      </div>

      {/* Spreadsheet Formula Bar Interface (Dynamic based on selected row/cell) */}
      <div className="reveal reveal-delay-1 bg-neutral-900 border border-neutral-800 rounded-xl p-3 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800/80 shrink-0">
            <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider">CELL</span>
            <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25">{activeCellCoord}</span>
          </div>

          <div className="flex-1 formula-bar-container bg-neutral-950 border border-neutral-800 rounded-lg p-1 flex items-center overflow-hidden">
            <span className="formula-bar-fx font-mono text-xs font-black italic text-emerald-500 bg-neutral-900/80 border-r border-neutral-800 px-3 py-1 mr-2 select-none">fx</span>
            <input
              type="text"
              readOnly
              value={activeFormula}
              className="bg-transparent text-neutral-200 font-mono text-xs w-full focus:outline-none select-all px-2"
              title="Formula definition bar"
            />
          </div>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-500 shrink-0 select-none">
            <Settings className="w-3 h-3" />
            <span>CALC: AUTO</span>
          </div>
        </div>
      </div>

      {/* Excel Sheet Workbook Tabs Navigation */}
      <div className="reveal reveal-delay-1 flex items-end overflow-x-auto scrollbar-none border-b border-neutral-800 mb-6 gap-1 px-1">
        <button
          onClick={() => {
            setActiveTab('statements');
            handleCellSelect('B2', 'B1 (Revenue - User Parameter input)');
          }}
          className={`excel-tab ${activeTab === 'statements' ? 'excel-tab-active' : ''}`}
        >
          📄 Sheet1: 3-Statement Model
        </button>

        <button
          onClick={() => {
            setActiveTab('uktax');
            handleCellSelect('C3', 'Math.max(0, GrossRevenue - AllowableExpenses)');
          }}
          className={`excel-tab ${activeTab === 'uktax' ? 'excel-tab-active' : ''}`}
        >
          📄 Sheet2: UK Tax & VAT
        </button>

        <button
          onClick={() => {
            setActiveTab('ratios');
            handleCellSelect('D1', '(CurrentAssets / CurrentLiabilities)');
          }}
          className={`excel-tab ${activeTab === 'ratios' ? 'excel-tab-active' : ''}`}
        >
          📄 Sheet3: Liquidity & Solvency Ratios
        </button>
      </div>

      {/* TAB 1: 3-STATEMENT MODEL */}
      {activeTab === 'statements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Workbook Controllers (Dynamic parameters styled as an Input Table) */}
          <div className="lg:col-span-4 rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
            <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Workbook Controller Variables
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE</span>
            </div>

            <div className="p-5 space-y-4 font-mono text-xs text-neutral-300">
              {/* Revenue Slider Input */}
              <div className="space-y-1.5 p-2 rounded hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell A1: Annual Revenue</span>
                  <span className="text-emerald-400 font-bold">£{revenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="25000"
                  value={revenue}
                  onChange={(e) => {
                    setRevenue(Number(e.target.value));
                    handleCellSelect('B2', `Annual Sales Parameter: £${Number(e.target.value).toLocaleString()}`);
                  }}
                  className="w-full accent-emerald-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* COGS % Slider Input */}
              <div className="space-y-1.5 p-2 rounded hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell A2: COGS Percentage</span>
                  <span className="text-sky-400 font-bold">{cogsPercent}% (£{cogs.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  step="1"
                  value={cogsPercent}
                  onChange={(e) => {
                    setCogsPercent(Number(e.target.value));
                    handleCellSelect('B3', `Cost of Goods Sold: ${e.target.value}% of Sales (Cell B2)`);
                  }}
                  className="w-full accent-sky-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* OpEx % Slider Input */}
              <div className="space-y-1.5 p-2 rounded hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell A3: OpEx Percentage</span>
                  <span className="text-amber-400 font-bold">{opexPercent}% (£{opex.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={opexPercent}
                  onChange={(e) => {
                    setOpexPercent(Number(e.target.value));
                    handleCellSelect('B5', `Operating Expenses: ${e.target.value}% of Sales (Cell B2)`);
                  }}
                  className="w-full accent-amber-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* CapEx Input */}
              <div className="space-y-1.5 p-2 rounded hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell A4: CapEx Reinvestment</span>
                  <span className="text-purple-400 font-bold">£{capex.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={capex}
                  onChange={(e) => {
                    setCapex(Number(e.target.value));
                    handleCellSelect('B12', `Capital Expenditures parameter for Fixed Assets: £${Number(e.target.value).toLocaleString()}`);
                  }}
                  className="w-full accent-purple-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* Depreciation Input */}
              <div className="space-y-1.5 p-2 rounded hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell A5: Depreciation Fee</span>
                  <span className="text-neutral-400 font-bold">£{depreciation.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="2500"
                  value={depreciation}
                  onChange={(e) => {
                    setDepreciation(Number(e.target.value));
                    handleCellSelect('B8', `Non-cash Depreciation charges parameter: £${Number(e.target.value).toLocaleString()}`);
                  }}
                  className="w-full accent-neutral-400 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[10px] font-sans text-neutral-400 bg-neutral-950 p-3 rounded-lg border border-[#30363d] flex items-start gap-2 select-none leading-relaxed">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Formulas match GAAP ledger systems. Drag ranges to verify absolute matching between Profit & Loss and Balance sheet cells.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Financial Grid Sheet with Column A, B, C... Headers */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Income Statement (Profit & Loss) Sheet Segment */}
            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
              
              {/* Spreadsheet Grid Headers */}
              <div className="grid grid-cols-12 bg-[#161b22] border-b border-[#30363d] font-mono text-[10px] font-bold text-neutral-400 text-center select-none">
                <div className="col-span-1 border-r border-[#30363d] py-1.5 bg-neutral-950">ID</div>
                <div className="col-span-6 border-r border-[#30363d] py-1.5 text-left pl-3">Column A: Line Item</div>
                <div className="col-span-3 border-r border-[#30363d] py-1.5">Column B: Amount</div>
                <div className="col-span-2 py-1.5">Formula Applied</div>
              </div>

              <div className="divide-y divide-[#21262d] font-mono text-xs text-neutral-200">
                {/* Revenue Row */}
                <div
                  onClick={() => handleCellSelect('B2', 'B2 = (User-Input Variable cell A1)')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-1 spreadsheet-row-index">1</div>
                  <div className="col-span-6 px-3 py-2.5 font-medium border-r border-[#21262d] flex items-center">Revenue</div>
                  <div className="col-span-3 px-3 py-2.5 text-right font-bold text-neutral-100 border-r border-[#21262d]">£{revenue.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-neutral-500 text-[10px] text-center flex items-center justify-center font-bold">A1</div>
                </div>

                {/* COGS Row */}
                <div
                  onClick={() => handleCellSelect('B3', 'B3 = B2 * (COGS_Percent / 100) | Sales cost allocation')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-1 spreadsheet-row-index">2</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-400 border-r border-[#21262d] pl-6 flex items-center">- Cost of Goods Sold (COGS)</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-sky-400 border-r border-[#21262d]">-£{cogs.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-sky-500 text-[10px] text-center flex items-center justify-center font-semibold">B2 * A2%</div>
                </div>

                {/* Gross Profit Row */}
                <div
                  onClick={() => handleCellSelect('B4', 'B4 = B2 - B3 | Total gross product yield')}
                  className="grid grid-cols-12 bg-emerald-500/5 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold"
                >
                  <div className="col-span-1 spreadsheet-row-index">3</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-200 border-r border-[#21262d] flex items-center">Gross Profit</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-emerald-400 border-r border-[#21262d]">£{grossProfit.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-emerald-500/70 text-[10px] text-center flex items-center justify-center">B2 - B3</div>
                </div>

                {/* OpEx Row */}
                <div
                  onClick={() => handleCellSelect('B5', 'B5 = B2 * (OpEx_Percent / 100) | Fixed overhead limits')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-1 spreadsheet-row-index">4</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-400 border-r border-[#21262d] pl-6 flex items-center">- Operating Expenses (OpEx)</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-amber-400 border-r border-[#21262d]">-£{opex.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-amber-500/70 text-[10px] text-center flex items-center justify-center font-semibold">B2 * A3%</div>
                </div>

                {/* EBITDA Row */}
                <div
                  onClick={() => handleCellSelect('B6', 'B6 = B4 - B5 | Gross profit minus fixed operations')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold"
                >
                  <div className="col-span-1 spreadsheet-row-index">5</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-300 border-r border-[#21262d] flex items-center">EBITDA</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-neutral-100 border-r border-[#21262d]">£{ebitda.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-neutral-500 text-[10px] text-center flex items-center justify-center">B4 - B5</div>
                </div>

                {/* Depreciation Row */}
                <div
                  onClick={() => handleCellSelect('B7', 'B7 = (User-Input depreciation variable Cell A5)')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-1 spreadsheet-row-index">6</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-400 border-r border-[#21262d] pl-6 flex items-center">- Depreciation & Amortization</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-neutral-400 border-r border-[#21262d]">-£{depreciation.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-neutral-500 text-[10px] text-center flex items-center justify-center">A5</div>
                </div>

                {/* Net EBIT Row */}
                <div
                  onClick={() => handleCellSelect('B8', 'B8 = B6 - B7 | Earnings before corporation taxes')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold"
                >
                  <div className="col-span-1 spreadsheet-row-index">7</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-300 border-r border-[#21262d] flex items-center">Operating Profit (EBIT)</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-sky-400 border-r border-[#21262d]">£{ebit.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-sky-500/70 text-[10px] text-center flex items-center justify-center">B6 - B7</div>
                </div>

                {/* Tax Expense Row */}
                <div
                  onClick={() => handleCellSelect('B9', 'B9 = IF(B8 > 0, B8 * TaxRate_25%, 0) | UK HMRC Corp Tax rates')}
                  className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors"
                >
                  <div className="col-span-1 spreadsheet-row-index">8</div>
                  <div className="col-span-6 px-3 py-2.5 text-neutral-400 border-r border-[#21262d] pl-6 flex items-center">- Corporation Tax (25% main rate)</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-rose-400 border-r border-[#21262d]">-£{Math.round(taxExpense).toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-rose-500/70 text-[10px] text-center flex items-center justify-center">B8 * 25%</div>
                </div>

                {/* Net Income Row */}
                <div
                  onClick={() => handleCellSelect('B10', 'B10 = B8 - B9 | Final Retained Earnings (Profit After Tax PAT)')}
                  className="grid grid-cols-12 bg-emerald-500/10 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-black text-emerald-400"
                >
                  <div className="col-span-1 spreadsheet-row-index">9</div>
                  <div className="col-span-6 px-3 py-2.5 border-r border-[#21262d] flex items-center text-emerald-300">Net Profit (PAT)</div>
                  <div className="col-span-3 px-3 py-2.5 text-right border-r border-[#21262d]">£{Math.round(netIncome).toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-emerald-400 text-[10px] text-center flex items-center justify-center">B8 - B9</div>
                </div>
              </div>
            </div>

            {/* 2. Cash Flow Segment Sheet */}
            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
              <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>📊 Cash Flow reconciliation Segment</span>
                <span className="text-[10px] bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/25">
                  CF Net: {netCashFlow >= 0 ? `+£${netCashFlow.toLocaleString()}` : `-£${Math.abs(netCashFlow).toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-12 bg-[#161b22] border-b border-[#30363d] font-mono text-[10px] font-bold text-neutral-400 text-center select-none">
                <div className="col-span-1 border-r border-[#30363d] py-1">ID</div>
                <div className="col-span-6 border-r border-[#30363d] py-1 text-left pl-3">Line Item</div>
                <div className="col-span-3 border-r border-[#30363d] py-1">Amount</div>
                <div className="col-span-2 py-1">Reference</div>
              </div>

              <div className="divide-y divide-[#21262d] font-mono text-xs text-neutral-200">
                <div onClick={() => handleCellSelect('C1', 'C1 = NetProfit + Depreciation (Non-cash allocation)')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">10</div>
                  <div className="col-span-6 px-3 py-2 border-r border-[#21262d] flex items-center">Operating Cash Flow</div>
                  <div className="col-span-3 px-3 py-2 text-right text-emerald-400 border-r border-[#21262d]">£{operatingCashFlow.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2 text-center text-neutral-500 text-[10px] flex items-center justify-center">B10 + A5</div>
                </div>

                <div onClick={() => handleCellSelect('C2', 'C2 = CapEx (Investing outflow cell A4)')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">11</div>
                  <div className="col-span-6 px-3 py-2 border-r border-[#21262d] flex items-center">Investing Cash Flow (CapEx)</div>
                  <div className="col-span-3 px-3 py-2 text-right text-rose-400 border-r border-[#21262d]">-£{capex.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2 text-center text-neutral-500 text-[10px] flex items-center justify-center">-A4</div>
                </div>

                <div onClick={() => handleCellSelect('C3', 'C3 = Debt Repayment parameter')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">12</div>
                  <div className="col-span-6 px-3 py-2 border-r border-[#21262d] flex items-center">Financing Cash Flow (Debt)</div>
                  <div className="col-span-3 px-3 py-2 text-right text-amber-400 border-r border-[#21262d]">-£{debtRepayment.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2 text-center text-neutral-500 text-[10px] flex items-center justify-center">Constant</div>
                </div>

                <div onClick={() => handleCellSelect('C4', 'C4 = C1 + C2 + C3 | Net Cash flow movement')} className="grid grid-cols-12 bg-sky-500/5 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold">
                  <div className="col-span-1 spreadsheet-row-index">13</div>
                  <div className="col-span-6 px-3 py-2 border-r border-[#21262d] flex items-center">Net Cash Flow Delta</div>
                  <div className="col-span-3 px-3 py-2 text-right text-sky-400 border-r border-[#21262d]">£{netCashFlow.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2 text-center text-sky-500 text-[10px] flex items-center justify-center">SUM(C1:C3)</div>
                </div>
              </div>
            </div>

            {/* 3. Balance Sheet Verification Segment Sheet */}
            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
              <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-xs font-mono font-bold text-purple-400">
                <span>📊 Balance Sheet Position Statement (Double-Entry Verification)</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Balanced
                </span>
              </div>

              <div className="grid grid-cols-12 bg-[#161b22] border-b border-[#30363d] font-mono text-[10px] font-bold text-neutral-400 text-center select-none">
                <div className="col-span-1 border-r border-[#30363d] py-1">ID</div>
                <div className="col-span-6 border-r border-[#30363d] py-1 text-left pl-3">Asset & Liability Columns</div>
                <div className="col-span-3 border-r border-[#30363d] py-1">Calculated Ledger</div>
                <div className="col-span-2 py-1">Status</div>
              </div>

              <div className="divide-y divide-[#21262d] font-mono text-xs text-neutral-200">
                <div onClick={() => handleCellSelect('D1', 'D1 = CashEnd + AccountsReceivable + Inventory | Liquidity buffer')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">14</div>
                  <div className="col-span-6 px-3 py-2.5 border-r border-[#21262d] flex items-center pl-3">Total Cumulative Assets</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-emerald-400 border-r border-[#21262d] font-bold">£{totalAssets.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-center text-[9px] text-emerald-400 font-bold flex items-center justify-center">Active Rec</div>
                </div>

                <div onClick={() => handleCellSelect('D2', 'D2 = TotalLiabilities + Equity | Matching capital base')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">15</div>
                  <div className="col-span-6 px-3 py-2.5 border-r border-[#21262d] flex items-center pl-3">Total Liabilities & Equity</div>
                  <div className="col-span-3 px-3 py-2.5 text-right text-emerald-400 border-r border-[#21262d] font-bold">£{totalAssets.toLocaleString()}</div>
                  <div className="col-span-2 px-2 py-2.5 text-center text-[9px] text-emerald-400 font-bold flex items-center justify-center">100% Equal</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: UK TAX & VAT ENGINE */}
      {activeTab === 'uktax' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
            <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                HMRC Corporate Tax Parameters
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">HMRC VAT MTD</span>
            </div>

            <div className="p-5 space-y-4 font-mono text-xs text-neutral-300">
              {/* Turnover input */}
              <div className="space-y-1.5 p-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell C1: Taxable Sales</span>
                  <span className="text-emerald-400 font-bold">£{ukGrossRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="600000"
                  step="10000"
                  value={ukGrossRevenue}
                  onChange={(e) => {
                    setUkGrossRevenue(Number(e.target.value));
                    handleCellSelect('C1', `Turnover: £${Number(e.target.value).toLocaleString()} (Standard Rated Sales)`);
                  }}
                  className="w-full accent-emerald-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* Expenses input */}
              <div className="space-y-1.5 p-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-neutral-400">Cell C2: Allowable Expenses</span>
                  <span className="text-sky-400 font-bold">£{ukAllowableExpenses.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="300000"
                  step="5000"
                  value={ukAllowableExpenses}
                  onChange={(e) => {
                    setUkAllowableExpenses(Number(e.target.value));
                    handleCellSelect('C2', `Business Expenses allowable under HMRC rules: £${Number(e.target.value).toLocaleString()}`);
                  }}
                  className="w-full accent-sky-500 h-1.5 bg-neutral-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* VAT Registration toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs mt-2">
                <span className="text-neutral-400">HMRC MTD VAT Registered</span>
                <button
                  onClick={() => {
                    setUkHasVatExemption(!ukHasVatExemption);
                    handleCellSelect('C4', !ukHasVatExemption ? 'VAT Deregistered (Output liability set to zero)' : 'Output VAT Standard rated at 20%');
                  }}
                  className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
                    !ukHasVatExemption
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                  }`}
                >
                  {!ukHasVatExemption ? 'Registered (20%)' : 'Exempt / Dereg'}
                </button>
              </div>

              {/* Rates references box */}
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850 space-y-2 text-[11px]">
                <span className="font-bold text-neutral-400 block uppercase tracking-wider text-[10px]">UK Tax Rate Bands:</span>
                <div className="flex justify-between text-neutral-300">
                  <span>Small Profits Rate (≤£50k Profit)</span>
                  <span className="text-emerald-400 font-bold">19%</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Marginal Relief (£50k to £250k)</span>
                  <span className="text-amber-400 font-bold">Tapered 3/200th</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Main Corporation Tax (≥£250k)</span>
                  <span className="text-rose-400 font-bold">25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Tax calculations formatted as UK CT600 Form worksheet */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CT600 Workbook Card */}
            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
              <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs font-mono font-bold text-neutral-300">
                <span>📄 CT600 Corporation Tax Worksheet</span>
                <span className="text-[10px] text-emerald-400">Effective Rate: {corpTaxEffectiveRate}%</span>
              </div>

              {/* Spreadsheet Grid Headers */}
              <div className="grid grid-cols-12 bg-[#161b22] border-b border-[#30363d] font-mono text-[10px] font-bold text-neutral-400 text-center select-none">
                <div className="col-span-1 border-r border-[#30363d] py-1.5 bg-neutral-950">ID</div>
                <div className="col-span-7 border-r border-[#30363d] py-1.5 text-left pl-3">UK Corporation Tax lines</div>
                <div className="col-span-4 py-1.5">Calculated Net</div>
              </div>

              <div className="divide-y divide-[#21262d] font-mono text-xs text-neutral-200">
                {/* Gross profit */}
                <div onClick={() => handleCellSelect('C3', 'C3 = C1 - C2 | Total profit liable for tax computation')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">16</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d]">Net Taxable Profit before relief</div>
                  <div className="col-span-4 px-3 py-2.5 text-right text-neutral-100 font-bold">£{taxableProfit.toLocaleString()}</div>
                </div>

                {/* Marginal Relief calculation line if between 50k and 250k */}
                {taxableProfit > 50000 && taxableProfit < 250000 && (
                  <div onClick={() => handleCellSelect('C4', 'C4 = (3/200) * (250000 - C3) | HMRC Small/Main marginal relief formula')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors bg-amber-500/5">
                    <div className="col-span-1 spreadsheet-row-index">17</div>
                    <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d] text-amber-300 font-semibold">Less: HMRC Marginal Relief Deduction</div>
                    <div className="col-span-4 px-3 py-2.5 text-right text-amber-400 font-bold">-£{Math.round((3/200) * (250000 - taxableProfit)).toLocaleString()}</div>
                  </div>
                )}

                {/* Tax Liability */}
                <div onClick={() => handleCellSelect('C5', 'C5 = (C3 * 25%) - Marginal_Relief_C4')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors bg-emerald-500/5 font-bold">
                  <div className="col-span-1 spreadsheet-row-index">18</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d] text-emerald-300">Estimated Corporation Tax Liability</div>
                  <div className="col-span-4 px-3 py-2.5 text-right text-emerald-400">£{Math.round(corpTax).toLocaleString()}</div>
                </div>

                {/* Post tax earnings */}
                <div onClick={() => handleCellSelect('C6', 'C6 = C3 - C5 | Net Retained Profit available for dividends')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold text-neutral-300">
                  <div className="col-span-1 spreadsheet-row-index">19</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d] pl-6">Post-Tax Retained Profits</div>
                  <div className="col-span-4 px-3 py-2.5 text-right text-sky-400">£{Math.round(taxableProfit - corpTax).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* VAT Compliance Workbook Card */}
            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-xl">
              <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>📄 HMRC Quarterly VAT 100 return Worksheet (MTD)</span>
                <span>Net Payable: £{Math.round(vatNetPayableToHmrc).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-12 bg-[#161b22] border-b border-[#30363d] font-mono text-[10px] font-bold text-neutral-400 text-center select-none">
                <div className="col-span-1 border-r border-[#30363d] py-1.5 bg-neutral-950">ID</div>
                <div className="col-span-7 border-r border-[#30363d] py-1.5 text-left pl-3">VAT Box Descriptions</div>
                <div className="col-span-4 py-1.5">MTD Calculated Value</div>
              </div>

              <div className="divide-y divide-[#21262d] font-mono text-xs text-neutral-200">
                <div onClick={() => handleCellSelect('C7', 'C7 = C1 * 20% | Box 1 Output tax on sales')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">20</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d]">Box 1: Output VAT on standard sales</div>
                  <div className="col-span-4 px-3 py-2.5 text-right text-neutral-100 font-bold">£{Math.round(vatOutput).toLocaleString()}</div>
                </div>

                <div onClick={() => handleCellSelect('C8', 'C8 = C2 * 15% Standard-rated VAT average input credit')} className="grid grid-cols-12 hover:bg-[#161b22]/50 cursor-pointer transition-colors">
                  <div className="col-span-1 spreadsheet-row-index">21</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d]">Box 4: Input VAT reclaimed on purchases</div>
                  <div className="col-span-4 px-3 py-2.5 text-right text-emerald-400 font-bold">£{Math.round(vatInput).toLocaleString()}</div>
                </div>

                <div onClick={() => handleCellSelect('C9', 'C9 = Box 1 (C7) - Box 4 (C8) | Net cash owed to HMRC')} className="grid grid-cols-12 bg-sky-500/5 hover:bg-[#161b22]/50 cursor-pointer transition-colors font-bold text-sky-400">
                  <div className="col-span-1 spreadsheet-row-index">22</div>
                  <div className="col-span-7 px-3 py-2.5 border-r border-[#21262d]">Box 5: Net VAT Payable to HMRC</div>
                  <div className="col-span-4 px-3 py-2.5 text-right">£{Math.round(vatNetPayableToHmrc).toLocaleString()}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: KEY RATIOS */}
      {activeTab === 'ratios' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Liquidity */}
          <div
            onClick={() => handleCellSelect('D1', `D1 = Current Assets (£${currentAssets.toLocaleString()}) / Current Liabilities (£${currentLiabilities.toLocaleString()})`)}
            className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 font-mono text-xs text-neutral-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Cell D1: LIQUIDITY</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                {(currentAssets / currentLiabilities).toFixed(2)}x
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100 font-sans">Current Ratio</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Checks working capital safety. Standard threshold of &gt;1.5x is satisfied.
            </p>
            <div className="pt-2 text-[10px] border-t border-[#21262d] text-neutral-500">
              Formula: Current Assets / Current Liab
            </div>
          </div>

          {/* Profitability */}
          <div
            onClick={() => handleCellSelect('D2', `D2 = Net income (£${Math.round(netIncome).toLocaleString()}) / Total Sales (£${revenue.toLocaleString()})`)}
            className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-sky-500/40 transition-all cursor-pointer shadow-lg space-y-4 font-mono text-xs text-neutral-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Cell D2: PROFITABILITY</span>
              <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20 font-bold">
                {netMargin}%
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100 font-sans">Net Profit Margin</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Measures corporate cost control. PAT output dividend yield proportion.
            </p>
            <div className="pt-2 text-[10px] border-t border-[#21262d] text-neutral-500">
              Formula: Net Profit / Revenue
            </div>
          </div>

          {/* Solvency */}
          <div
            onClick={() => handleCellSelect('D3', `D3 = Long-Term Debt (£${longTermDebt.toLocaleString()}) / Equity (£${equity.toLocaleString()})`)}
            className="p-5 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-purple-500/40 transition-all cursor-pointer shadow-lg space-y-4 font-mono text-xs text-neutral-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Cell D3: SOLVENCY</span>
              <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                {(longTermDebt / equity).toFixed(2)}x
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-neutral-100 font-sans">Debt-to-Equity (D/E)</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Measures balance sheet financial leverage relative to capital reserves.
            </p>
            <div className="pt-2 text-[10px] border-t border-[#21262d] text-neutral-500">
              Formula: Long-Term Debt / Equity
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
