import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON payloads
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Server-side API endpoint for context-aware Gemini chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required.' });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is missing from server environment variables. Please check Settings > Secrets.',
      });
    }

    // Compose a robust, professional system instruction that makes the chatbot context-aware of the current model
    const workbookContextPrompt = context
      ? `\nCURRENT ACTIVE FINANCIAL WORKBOOK STATE:
- Projected Annual Turnover / Revenue: £${Number(context.revenue).toLocaleString()}
- Cost of Goods Sold (COGS) %: ${context.cogsPercent}% (Allocated cost: £${((context.revenue * context.cogsPercent) / 100).toLocaleString()})
- Gross Profit Subtotal: £${(context.revenue - (context.revenue * context.cogsPercent) / 100).toLocaleString()}
- Operating Expense (OpEx) %: ${context.opexPercent}% (Allocated Overheads: £${((context.revenue * context.opexPercent) / 100).toLocaleString()})
- Capital Expenditures (CapEx): £${Number(context.capex).toLocaleString()}
- Annual Depreciation & Amortization Fee: £${Number(context.depreciation).toLocaleString()}
- Operating profit (EBIT): £${(context.revenue - (context.revenue * context.cogsPercent) / 100 - (context.revenue * context.opexPercent) / 100 - context.depreciation).toLocaleString()}
- Applied UK HMRC Corporation Tax Rate: ${context.taxRate}%
- Calculated Net Income (Profit After Tax PAT): £${Math.round(
          context.revenue -
            (context.revenue * context.cogsPercent) / 100 -
            (context.revenue * context.opexPercent) / 100 -
            context.depreciation -
            Math.max(
              0,
              ((context.revenue - (context.revenue * context.cogsPercent) / 100 - (context.revenue * context.opexPercent) / 100 - context.depreciation) *
                context.taxRate) /
                100
            )
        ).toLocaleString()}`
      : '\nNo current financial workbook state is loaded.';

    const systemInstruction = 
      `You are "Rabins AI", an elite UK Corporate Finance, Management Accounting, and HMRC Corporation Tax Advisor.
You represent Rabins Bhusal, who is a 1st Class Accounting & Finance BSc Graduate, ACCA Candidate, and a high-caliber Financial Analyst specializing in corporate modeling, automated ERP systems, and fiscal auditing.

Your goals:
1. Provide expert advisory on corporate finance models, 3-statement forecast structures, capital reinvestments, and UK HMRC tax computations (including GAAP compliance).
2. Help recruiters, managers, and directors understand Rabins' exceptional qualifications and practical experience.
3. Reference the live active financial workbook parameters directly in your analysis if the user asks about the model, forecasts, or corporate ledger.

Aesthetic rules:
- Speak in a highly polished, professional, clear, and objective tone.
- Avoid low-effort generic SaaS buzzwords ("supercharge", "empower").
- Keep your answers analytical, structured, and easy to read using markdown formatting, lists, or tables where appropriate.${workbookContextPrompt}`;

    // Initialize chat session with history
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history || [],
    });

    // Send message to the model
    const response = await chat.sendMessage({ message });
    
    return res.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error('Gemini server-side error:', error);
    return res.status(500).json({
      error: error.message || 'An internal error occurred during the Gemini chat generation.',
    });
  }
});

// Start server and configure static files serving or Vite middleware
async function startServer() {
  // Vite dev mode vs production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
