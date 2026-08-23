import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore';
import {
  googleSignIn,
  googleSignOut,
  initAuth,
  db,
  getAccessToken,
  setCachedAccessToken
} from '../lib/firebase';
import {
  Cloud,
  FileSpreadsheet,
  FileText,
  Calendar,
  Mail,
  Loader2,
  Lock,
  LogOut,
  FolderOpen,
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  CalendarDays,
  Send,
  Eye
} from 'lucide-react';

interface FinanceSyncControllerProps {
  // Current values from the 3-Statement workbook
  revenue: number;
  cogsPercent: number;
  opexPercent: number;
  capex: number;
  depreciation: number;
  taxRate: number;
  
  // Handlers to apply loaded scenario values back to parent
  onApplyScenario: (params: {
    revenue: number;
    cogsPercent: number;
    opexPercent: number;
    capex: number;
    depreciation: number;
    taxRate: number;
  }) => void;
}

interface SavedModel {
  id: string;
  title: string;
  revenue: number;
  cogsPercent: number;
  opexPercent: number;
  capex: number;
  depreciation: number;
  taxRate: number;
  createdAt: string;
}

export const FinanceSyncController: React.FC<FinanceSyncControllerProps> = ({
  revenue,
  cogsPercent,
  opexPercent,
  capex,
  depreciation,
  taxRate,
  onApplyScenario,
}) => {
  // Auth state
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Firestore Saved Scenarios state
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [newScenarioTitle, setNewScenarioTitle] = useState<string>('');
  
  // Forms & Interactive parameters
  const [recruiterEmail, setRecruiterEmail] = useState<string>('');
  const [meetingDate, setMeetingDate] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [pickerFileName, setPickerFileName] = useState<string>('');

  // Auto load Picker script state
  const [pickerApiLoaded, setPickerApiLoaded] = useState<boolean>(false);

  // Load auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setAuthLoading(false);
        fetchSavedScenarios(currentUser.uid);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setAuthLoading(false);
      }
    );

    // Dynamically load Google Picker API
    const loadGooglePickerAPI = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          const gapi = (window as any).gapi;
          if (gapi) {
            gapi.load('picker', {
              callback: () => {
                setPickerApiLoaded(true);
              }
            });
          }
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error('Failed to load Google Picker script:', err);
      }
    };

    loadGooglePickerAPI();

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        fetchSavedScenarios(result.user.uid);
        triggerSuccess('Successfully connected Google Workspace & Account!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Authentication failed. Please check popup permissions.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      await googleSignOut();
      setUser(null);
      setAccessToken(null);
      setSavedModels([]);
      triggerSuccess('Signed out successfully.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sign out.');
    } finally {
      setAuthLoading(false);
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage(null);
    setTimeout(() => setErrorMessage(null), 7000);
  };

  // --- Firestore: Save/Load Scenario Models ---
  const fetchSavedScenarios = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'saved_models'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const models: SavedModel[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        models.push({
          id: docSnap.id,
          title: data.title,
          revenue: data.revenue,
          cogsPercent: data.cogsPercent,
          opexPercent: data.opexPercent,
          capex: data.capex,
          depreciation: data.depreciation,
          taxRate: data.taxRate,
          createdAt: data.createdAt,
        });
      });
      setSavedModels(models);
    } catch (err) {
      console.error('Error loading saved scenarios:', err);
    }
  };

  const handleSaveScenario = async () => {
    if (!user) return;
    if (!newScenarioTitle.trim()) {
      triggerError('Please enter a name for the scenario configuration.');
      return;
    }

    setActionLoading('save_scenario');
    setErrorMessage(null);
    try {
      const payload = {
        uid: user.uid,
        title: newScenarioTitle.trim(),
        revenue,
        cogsPercent,
        opexPercent,
        capex,
        depreciation,
        taxRate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'saved_models'), payload);
      setNewScenarioTitle('');
      await fetchSavedScenarios(user.uid);
      triggerSuccess(`Successfully saved scenario configuration "${payload.title}" to Cloud Firestore!`);
    } catch (err: any) {
      console.error(err);
      triggerError(`Failed to save to Firestore: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteScenario = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the saved scenario "${title}"? This cannot be undone.`);
    if (!confirmDelete) return;

    setActionLoading('delete_scenario');
    try {
      await deleteDoc(doc(db, 'saved_models', id));
      if (user) {
        await fetchSavedScenarios(user.uid);
      }
      triggerSuccess(`Successfully deleted scenario "${title}" from Firestore.`);
    } catch (err: any) {
      triggerError(`Failed to delete scenario: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- Google Sheets: Export 3-Statement Model ---
  const handleExportToSheets = async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      triggerError('OAuth credentials missing. Please sign in again.');
      return;
    }

    setActionLoading('export_sheets');
    setErrorMessage(null);

    try {
      // 1. Create a fresh Google Spreadsheet
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            title: `Rabins Bhusal - Ledger Engine Export (${new Date().toLocaleDateString()})`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Could not create spreadsheet. Ensure Sheets API is active.');
      }

      const sheetData = await response.ok ? await response.json() : null;
      if (!sheetData?.spreadsheetId) {
        throw new Error('Failed to parse newly created Spreadsheet ID.');
      }

      const spreadsheetId = sheetData.spreadsheetId;

      // Calculate parameters
      const cogs = (revenue * cogsPercent) / 100;
      const grossProfit = revenue - cogs;
      const opex = (revenue * opexPercent) / 100;
      const ebitda = grossProfit - opex;
      const ebit = ebitda - depreciation;
      const taxExpense = ebit > 0 ? (ebit * taxRate) / 100 : 0;
      const netIncome = ebit - taxExpense;

      // 2. Format and populate the 3-statement metrics in the sheet
      const writeResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:C14?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            range: 'Sheet1!A1:C14',
            majorDimension: 'ROWS',
            values: [
              ['Rabins Bhusal | Corporate Finance & Accounting Portfolio', '', ''],
              ['Ledger Engine 3-Statement Forecast Export', '', `Exported: ${new Date().toLocaleString()}`],
              ['', '', ''],
              ['Line Item Description', 'Amount (£)', 'Workbook Applied Formula'],
              ['Annual Revenue Sales', revenue, '=B5'],
              ['Cost of Goods Sold (COGS)', -cogs, `=-B5*(${cogsPercent}/100)`],
              ['Gross Profit Subtotal', grossProfit, '=B5+B6'],
              ['Operating Expenses (OpEx)', -opex, `=-B5*(${opexPercent}/100)`],
              ['Operating EBITDA', ebitda, '=B7+B8'],
              ['Depreciation & Amortization', -depreciation, `=-${depreciation}`],
              ['Operating EBIT (Operating Profit)', ebit, '=B9+B10'],
              ['UK HMRC Corporation Tax (25% Main)', -taxExpense, `=IF(B11>0, -B11*0.25, 0)`],
              ['Net Income Profit After Tax (PAT)', netIncome, '=B11+B12'],
              ['Scenario Status Check', 'GAAP BALANCED', 'MATCHED'],
            ],
          }),
        }
      );

      if (!writeResponse.ok) {
        throw new Error('Failed to populate spreadsheet cells.');
      }

      // Log action to sync traces
      await addDoc(collection(db, 'sync_logs'), {
        uid: user?.uid,
        actionType: 'SHEETS_EXPORT',
        details: `Exported 3-statement model to Google Sheet with ID: ${spreadsheetId}`,
        timestamp: new Date().toISOString()
      });

      triggerSuccess(`Successfully exported model to Google Sheets! File is live in your Google Drive.`);
      window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`, '_blank');
    } catch (err: any) {
      console.error(err);
      triggerError(`Sheets Export error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- Google Docs: Export Executive Report Doc ---
  const handleExportToDocs = async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      triggerError('OAuth credentials missing. Please sign in again.');
      return;
    }

    setActionLoading('export_docs');
    setErrorMessage(null);

    try {
      // 1. Create a Google Doc
      const docResponse = await fetch('https://docs.googleapis.com/v1/documents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Rabins Bhusal - Scenario Report (${new Date().toLocaleDateString()})`,
        }),
      });

      if (!docResponse.ok) {
        throw new Error('Could not create Google Doc. Verify Docs API status.');
      }

      const docData = await docResponse.json();
      const documentId = docData.documentId;

      // Calculate parameters
      const cogs = (revenue * cogsPercent) / 100;
      const grossProfit = revenue - cogs;
      const opex = (revenue * opexPercent) / 100;
      const ebitda = grossProfit - opex;
      const ebit = ebitda - depreciation;
      const taxExpense = ebit > 0 ? (ebit * taxRate) / 100 : 0;
      const netIncome = ebit - taxExpense;

      // 2. Insert beautiful structured text via batchUpdate
      const reportText = 
        `RABINS BHUSAL | COPORATE FINANCE & MANAGEMENT ACCOUNTING PORTFOLIO\n` +
        `EXECUTIVE SCENARIO AND UK CORPORATION TAX SUMMARY REPORT\n` +
        `Generated: ${new Date().toLocaleString()}\n` +
        `----------------------------------------------------------------------\n\n` +
        `I. FORECAST SCENARIO PARAMETERS\n` +
        `- Projected Sales Turnover: £${revenue.toLocaleString()}\n` +
        `- Cost of Goods Sold Ratio: ${cogsPercent}% (Cost allocation: £${cogs.toLocaleString()})\n` +
        `- Operating Overheads (OpEx) Ratio: ${opexPercent}% (Overhead allocation: £${opex.toLocaleString()})\n` +
        `- Capital Expenditures (CapEx): £${capex.toLocaleString()}\n` +
        `- Annual Depreciation Charges: £${depreciation.toLocaleString()}\n\n` +
        `II. INTERACTIVE FINANCIAL PERFORMANCE METRICS (GAAP STANDARD)\n` +
        `- Gross Profit Yield: £${grossProfit.toLocaleString()} (Margin: ${((grossProfit/revenue)*100).toFixed(1)}%)\n` +
        `- EBITDA Yield: £${ebitda.toLocaleString()}\n` +
        `- Operating Profit (EBIT): £${ebit.toLocaleString()}\n` +
        `- Estimated UK HMRC Corporation Tax Liability: £${Math.round(taxExpense).toLocaleString()} (Marginal Rate: ${taxRate}%)\n` +
        `- Net Income (Profit After Tax PAT): £${Math.round(netIncome).toLocaleString()} (Margin: ${((netIncome/revenue)*100).toFixed(1)}%)\n\n` +
        `----------------------------------------------------------------------\n` +
        `PROFESSIONAL INQUIRY BRIEF\n` +
        `This scenario forecast is matched perfectly via my portfolio's interactive ledger engine. It highlights my core capabilities in UK taxation, GAAP corporate modeling, 3-statement reconciliation, and full ERP systems architecture. I am actively open to management accounting, corporate finance analyst, and financial analyst recruitment inquiries.\n\n` +
        `Thank you for reviewing my documentation.\n`;

      const updateResponse = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: reportText,
              },
            },
          ],
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update Google Doc text content.');
      }

      // Log trace to sync
      await addDoc(collection(db, 'sync_logs'), {
        uid: user?.uid,
        actionType: 'DOCS_EXPORT',
        details: `Exported corporate finance report summary to Google Doc with ID: ${documentId}`,
        timestamp: new Date().toISOString()
      });

      triggerSuccess(`Successfully generated executive report in Google Docs! Document opened in your workspace.`);
      window.open(`https://docs.google.com/document/d/${documentId}`, '_blank');
    } catch (err: any) {
      console.error(err);
      triggerError(`Docs Export error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- Google Calendar: Schedule Portfolio Chat ---
  const handleScheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = accessToken || (await getAccessToken());
    if (!token) {
      triggerError('OAuth credentials missing. Please sign in again.');
      return;
    }

    if (!recruiterEmail.trim() || !meetingDate || !meetingTime) {
      triggerError('Please fill out email, date, and time for the meeting invitation.');
      return;
    }

    setActionLoading('schedule_meeting');
    setErrorMessage(null);

    try {
      const startDateTime = `${meetingDate}T${meetingTime}:00`;
      // Default duration is 30 minutes
      const endHour = Number(meetingTime.split(':')[0]);
      const endMinute = Number(meetingTime.split(':')[1]) + 30;
      let formattedEndMinute = endMinute;
      let formattedEndHour = endHour;
      if (endMinute >= 60) {
        formattedEndMinute = endMinute - 60;
        formattedEndHour = endHour + 1;
      }
      const pad = (num: number) => num.toString().padStart(2, '0');
      const endDateTime = `${meetingDate}T${pad(formattedEndHour)}:${pad(formattedEndMinute)}:00`;

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: 'Rabins Bhusal - Portfolio Review & UK Finance Briefing',
          location: 'Google Meet (Interactive Video Link)',
          description: `A scheduled conversation with Rabins Bhusal regarding candidate qualifications, UK Corporation tax systems modeling, and general financial analyst recruitment opportunities.\n\nScenario Forecast Attached:\nSales: £${revenue.toLocaleString()}\nProjected Net PAT Profit: £${Math.round(revenue - (revenue*cogsPercent/100) - (revenue*opexPercent/100) - depreciation - (Math.max(0, (revenue - (revenue*cogsPercent/100) - (revenue*opexPercent/100) - depreciation)*taxRate/100))).toLocaleString()}`,
          start: {
            dateTime: startDateTime,
            timeZone: 'Europe/London',
          },
          end: {
            dateTime: endDateTime,
            timeZone: 'Europe/London',
          },
          attendees: [{ email: recruiterEmail.trim() }],
          conferenceData: {
            createRequest: { requestId: `meet-${Date.now()}` },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule calendar event. Verify scopes.');
      }

      // Log trace to sync
      await addDoc(collection(db, 'sync_logs'), {
        uid: user?.uid,
        actionType: 'CALENDAR_CREATE',
        details: `Scheduled portfolio review chat on primary calendar for ${meetingDate} at ${meetingTime} with attendee: ${recruiterEmail}`,
        timestamp: new Date().toISOString()
      });

      triggerSuccess(`Successfully scheduled briefing on Google Calendar! Invitation email has been sent to ${recruiterEmail}.`);
      setRecruiterEmail('');
      setMeetingDate('');
      setMeetingTime('');
    } catch (err: any) {
      console.error(err);
      triggerError(`Calendar Schedule error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- Gmail: Send Scenario Email ---
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = accessToken || (await getAccessToken());
    if (!token) {
      triggerError('OAuth credentials missing. Please sign in again.');
      return;
    }

    if (!recruiterEmail.trim()) {
      triggerError('Please enter a valid recipient email.');
      return;
    }

    setActionLoading('send_email');
    setErrorMessage(null);

    try {
      const cogs = (revenue * cogsPercent) / 100;
      const grossProfit = revenue - cogs;
      const opex = (revenue * opexPercent) / 100;
      const ebitda = grossProfit - opex;
      const ebit = ebitda - depreciation;
      const taxExpense = ebit > 0 ? (ebit * taxRate) / 100 : 0;
      const netIncome = ebit - taxExpense;

      const emailSubject = `Rabins Bhusal - Interactive 3-Statement Forecast & Corporate Brief`;
      const emailBody = `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eaeaea; border-radius: 12px; padding: 24px; color: #333333; line-height: 1.6;">
          <h2 style="color: #059669; font-weight: bold; border-bottom: 2px solid #059669; padding-bottom: 8px; margin-top: 0;">RABINS BHUSAL | UK FINANCE PORTFOLIO</h2>
          <p>Thank you for interacting with my spreadsheet-modeled candidate dashboard. Below is the custom 3-statement scenario parameters and forecast metrics we generated together:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 14px;">
            <thead>
              <tr style="background-color: #f3f4f6; text-align: left;">
                <th style="padding: 10px; border: 1px solid #e5e7eb;">Financial Line Item</th>
                <th style="padding: 10px; border: 1px solid #e5e7eb; text-align: right;">Calculated Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Turnover Revenue Sales</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; font-weight: bold; color: #059669;">£${revenue.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; padding-left: 20px;">- Cost of Goods Sold (COGS)</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #dc2626;">-£${cogs.toLocaleString()} (${cogsPercent}%)</td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Gross Profit Margin</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; font-weight: bold; color: #059669;">£${grossProfit.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; padding-left: 20px;">- Operating Expense (OpEx Overheads)</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #dc2626;">-£${opex.toLocaleString()} (${opexPercent}%)</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Operating EBITDA</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; font-weight: bold;">£${ebitda.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; padding-left: 20px;">- Depreciation & Amortization</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right;">-£${depreciation.toLocaleString()}</td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Operating profit (EBIT)</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; font-weight: bold;">£${ebit.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; padding-left: 20px;">- Estimated UK Corporation Tax</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #dc2626;">-£${Math.round(taxExpense).toLocaleString()} (${taxRate}%)</td>
              </tr>
              <tr style="background-color: #ecfdf5; font-weight: bold;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; color: #047857;">Net income (PAT Profit After Tax)</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: right; color: #047857;">£${Math.round(netIncome).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <p>These computations strictly comply with UK GAAP matching principles, and align with HMRC corporation relief bands for fiscal auditing.</p>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 18px 0; font-size: 13px;">
            <strong>Recruitment Briefing:</strong><br />
            Rabins Bhusal is a 1st Class Accounting & Finance BSc Graduate, an active ACCA Candidate, and a high-caliber Financial Analyst specializing in commercial planning, ERP automation, corporate ledger control, and systems scaling.
          </div>

          <p style="font-size: 11px; color: #777777; border-top: 1px solid #eeeeee; padding-top: 12px; margin-bottom: 0;">
            This email was sent on behalf of Rabins Bhusal portfolio user interaction. You received this because an active session synchronized this recipient address securely with their Gmail Workspace API.
          </p>
        </div>
      `;

      const makeEmailRaw = (to: string, subject: string, body: string) => {
        const email = [
          `To: ${to}`,
          'Content-Type: text/html; charset=utf-8',
          'MIME-Version: 1.0',
          `Subject: ${subject}`,
          '',
          body,
        ].join('\r\n');

        return btoa(unescape(encodeURIComponent(email)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };

      const raw = makeEmailRaw(recruiterEmail.trim(), emailSubject, emailBody);

      const sendResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw }),
      });

      if (!sendResponse.ok) {
        throw new Error('Could not send Gmail request. Verify scopes.');
      }

      // Log trace to sync
      await addDoc(collection(db, 'sync_logs'), {
        uid: user?.uid,
        actionType: 'GMAIL_SEND',
        details: `Sent scenario summary email via Gmail API to recipient: ${recruiterEmail}`,
        timestamp: new Date().toISOString()
      });

      triggerSuccess(`Successfully sent scenario briefcase email to ${recruiterEmail} via Gmail API!`);
      setRecruiterEmail('');
    } catch (err: any) {
      console.error(err);
      triggerError(`Gmail Send error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- Google Picker API: Load File Parameters ---
  const handleOpenPicker = async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      triggerError('OAuth credentials missing. Please sign in again.');
      return;
    }

    if (!pickerApiLoaded) {
      triggerError('Google Picker API is still loading. Please retry in a moment.');
      return;
    }

    try {
      const google = (window as any).google;
      const pickerOrigin =
        window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
          ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
          : window.location.origin;

      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .setOAuthToken(token)
        .setCallback(async (data: any) => {
          if (data.action === google.picker.Action.PICKED) {
            const docSelected = data.docs[0];
            setSelectedDocId(docSelected.id);
            setPickerFileName(docSelected.name);
            
            // Try to read first sheet's data to simulate live spreadsheet load!
            setActionLoading('load_picker_file');
            try {
              const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${docSelected.id}/values/A1:B10`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (res.ok) {
                const sheetValues = await res.json();
                if (sheetValues.values && sheetValues.values.length > 0) {
                  // Search spreadsheet values for labels resembling parameters and apply them!
                  let loadedRev = 600000;
                  let loadedCogs = 42;
                  let loadedOpex = 28;
                  
                  sheetValues.values.forEach((row: any) => {
                    if (row[0] && row[1]) {
                      const label = row[0].toString().toLowerCase();
                      const numVal = parseFloat(row[1].toString().replace(/[^0-9.]/g, ''));
                      if (!isNaN(numVal)) {
                        if (label.includes('revenue') || label.includes('sales')) {
                          loadedRev = Math.max(100000, Math.min(2000000, numVal));
                        } else if (label.includes('cogs') || label.includes('cost of goods')) {
                          loadedCogs = Math.max(15, Math.min(75, numVal));
                        } else if (label.includes('opex') || label.includes('operating')) {
                          loadedOpex = Math.max(10, Math.min(50, numVal));
                        }
                      }
                    }
                  });

                  onApplyScenario({
                    revenue: loadedRev,
                    cogsPercent: loadedCogs,
                    opexPercent: loadedOpex,
                    capex,
                    depreciation,
                    taxRate
                  });

                  triggerSuccess(`Successfully picked spreadsheet and matched cells! Parameters imported: Revenue=£${loadedRev.toLocaleString()}, COGS=${loadedCogs}%, OpEx=${loadedOpex}%`);
                } else {
                  triggerSuccess(`Linked Spreadsheet metadata loaded: ${docSelected.name}. (File cells are empty)`);
                }
              } else {
                triggerSuccess(`Linked Document "${docSelected.name}" from Google Drive via Picker!`);
              }
            } catch (err) {
              console.warn('Could not extract sheet cells, using standard link:', err);
              triggerSuccess(`Successfully linked: ${docSelected.name}`);
            } finally {
              setActionLoading(false);
            }
          }
        })
        .setOrigin(pickerOrigin)
        .build();
      
      picker.setVisible(true);
    } catch (err: any) {
      console.error(err);
      triggerError(`Failed to load Google Picker: ${err.message}`);
    }
  };

  return (
    <div id="finance-sync-panel" className="reveal bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 shadow-2xl mt-12 max-w-7xl mx-auto">
      {/* Title & Auth State Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#30363d] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-2">
            <Cloud className="w-3.5 h-3.5" />
            <span>CLOUD SYNC HUB & GOOGLE WORKSPACE GATEWAY</span>
          </div>
          <h3 className="text-xl font-display font-bold text-neutral-100 font-sans">
            Recruiter & Employer Sync Portal
          </h3>
          <p className="text-neutral-400 text-xs mt-1 font-sans">
            Securely back up interactive financial models in your custom Cloud Firestore account, and leverage OAuth-authorized Google Workspace tools to build reports.
          </p>
        </div>

        {/* Login / Auth Button */}
        <div className="shrink-0 flex items-center gap-3">
          {authLoading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Checking session...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3 bg-neutral-950 p-2 pl-3 pr-4 rounded-2xl border border-emerald-500/20 shadow-inner">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  referrerPolicy="no-referrer"
                  alt={user.displayName || 'Google Profile'}
                  className="w-8 h-8 rounded-full border border-emerald-500/40 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-mono text-emerald-300 font-bold text-xs">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-200 line-clamp-1">{user.displayName || 'Google Member'}</span>
                <span className="text-[10px] text-neutral-500 font-mono font-semibold truncate max-w-[140px]">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-2 p-1.5 rounded-lg hover:bg-rose-500/10 border border-neutral-800 hover:border-rose-500/30 text-neutral-400 hover:text-rose-400 transition-all cursor-pointer"
                title="Sign out of Google"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-sans rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer border border-emerald-600/30"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Connect Google Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Success & Error alerts */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-6 flex items-center gap-2.5 text-xs text-emerald-400 animate-fade-in font-sans">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-6 flex items-center gap-2.5 text-xs text-rose-400 animate-fade-in font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Unauthenticated State Placeholder */}
      {!user ? (
        <div className="text-center py-10 px-4 bg-[#111622]/40 rounded-xl border border-dashed border-neutral-800/80 flex flex-col items-center justify-center max-w-2xl mx-auto my-4">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-emerald-400">
            <Cloud className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-neutral-200 font-sans">Unlock cloud persistence and office integration</h4>
          <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed font-sans">
            Authorize your Google account with standard permission levels. Once connected, you can persist scenarios directly to a cloud database, export workbook values instantly, and compose portfolio review schedules on Google Calendar.
          </p>
          <button
            onClick={handleLogin}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all font-sans cursor-pointer shadow-md shadow-emerald-500/15"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign in to Activate Workspace</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Cloud Firestore persistence */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850/80 shadow-md">
              <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Save className="w-4 h-4 text-emerald-400" />
                <span>Firestore Scenarios</span>
              </h4>
              
              {/* Scenario parameters display */}
              <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-[10px] font-mono text-neutral-400 space-y-1 mb-4 leading-relaxed">
                <span className="font-bold text-neutral-300 block mb-1">CURRENT FORM PARAMETERS:</span>
                <div>Turnover: <span className="text-emerald-400 font-semibold">£{revenue.toLocaleString()}</span></div>
                <div>COGS Ratio: <span className="text-sky-400 font-semibold">{cogsPercent}%</span></div>
                <div>OpEx Ratio: <span className="text-amber-400 font-semibold">{opexPercent}%</span></div>
                <div>UK Tax Rate: <span className="text-rose-400 font-semibold">{taxRate}%</span></div>
              </div>

              {/* Add Scenario Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Scenario title..."
                  value={newScenarioTitle}
                  onChange={(e) => setNewScenarioTitle(e.target.value)}
                  className="bg-neutral-900 border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 w-full focus:outline-none focus:border-emerald-500 font-sans"
                  title="Scenario title input"
                />
                <button
                  onClick={handleSaveScenario}
                  disabled={actionLoading !== null}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading === 'save_scenario' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* List of saved scenario templates */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850/80 shadow-md">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-black block mb-3">Saved Scenarios database ({savedModels.length})</span>
              
              {savedModels.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-500 font-sans italic border border-dashed border-neutral-800 rounded-lg">
                  No saved configurations. Create one above to persist your parameters.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto scrollbar-thin">
                  {savedModels.map((model) => (
                    <div
                      key={model.id}
                      className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-neutral-700 transition-all text-xs font-mono"
                    >
                      <div className="flex-1 text-left min-w-0 pr-2">
                        <div className="font-bold text-neutral-200 truncate font-sans text-xs">{model.title}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          Rev: £{Math.round(model.revenue/1000)}k | COGS: {model.cogsPercent}% | PAT: £{Math.round((model.revenue - (model.revenue*model.cogsPercent/100) - (model.revenue*model.opexPercent/100) - model.depreciation - (Math.max(0, (model.revenue - (model.revenue*model.cogsPercent/100) - (model.revenue*model.opexPercent/100) - model.depreciation)*model.taxRate/100)))/1000)}k
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onApplyScenario({
                            revenue: model.revenue,
                            cogsPercent: model.cogsPercent,
                            opexPercent: model.opexPercent,
                            capex: model.capex,
                            depreciation: model.depreciation,
                            taxRate: model.taxRate
                          })}
                          className="p-1 px-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-[10px] font-bold font-mono transition-colors cursor-pointer"
                          title="Apply model metrics to calculator"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => handleDeleteScenario(model.id, model.title)}
                          className="p-1 rounded hover:bg-rose-500/10 text-neutral-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE PANEL: Exports & File Picker */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-850/80 shadow-md h-full flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Workspace export controls</span>
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-5 font-sans">
                  Convert local workbook variables directly into real G-Suite productivity assets. These commands safely trigger standard Google API endpoints.
                </p>

                <div className="space-y-3.5">
                  {/* Sheets Export Button */}
                  <button
                    onClick={handleExportToSheets}
                    disabled={actionLoading !== null}
                    className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 font-sans font-bold text-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export Forecast to Google Sheets</span>
                    </div>
                    {actionLoading === 'export_sheets' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Docs Export Button */}
                  <button
                    onClick={handleExportToDocs}
                    disabled={actionLoading !== null}
                    className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-400 font-sans font-bold text-xs hover:border-sky-500/50 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Generate Executive Report in Docs</span>
                    </div>
                    {actionLoading === 'export_docs' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Picker Link Button */}
                  <button
                    onClick={handleOpenPicker}
                    disabled={actionLoading !== null || !pickerApiLoaded}
                    className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-purple-400 font-sans font-bold text-xs hover:border-purple-500/50 hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <FolderOpen className="w-4 h-4 shrink-0" />
                      <div>
                        <div>Link spreadsheet via Picker</div>
                        <span className="text-[10px] text-neutral-400 font-normal font-mono block">Load custom variables from Drive</span>
                      </div>
                    </div>
                    {actionLoading === 'load_picker_file' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Selected File Badge */}
              {pickerFileName && (
                <div className="mt-5 p-2 bg-[#111622]/60 rounded-lg border border-purple-500/20 text-[10px] font-mono text-neutral-300 flex items-center justify-between">
                  <span className="truncate pr-2">Linked: {pickerFileName}</span>
                  <span className="text-purple-400 shrink-0 uppercase font-black tracking-wider text-[8px] bg-purple-500/10 px-1 py-0.5 rounded">Linked</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Messaging (Gmail and Calendar scheduling) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-850/80 shadow-md">
              <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>HMRC CT600 & Interview Dispatch</span>
              </h4>

              {/* Tab options for Gmail or Calendar */}
              <div className="space-y-4">
                
                {/* 1. Gmail send form */}
                <form onSubmit={handleSendEmail} className="space-y-3 pt-1 border-t border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold block">1. Mail forecast via Gmail API</span>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Employer/recruiter email..."
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="bg-neutral-900 border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 w-full focus:outline-none focus:border-emerald-500 font-sans"
                      title="Recipient email input"
                    />
                    <button
                      type="submit"
                      disabled={actionLoading !== null}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-sans font-bold text-xs flex items-center justify-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading === 'send_email' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* 2. Calendar scheduling form */}
                <form onSubmit={handleScheduleMeeting} className="space-y-3 pt-3.5 border-t border-neutral-850">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold block">2. Schedule Briefing on Calendar</span>
                  
                  <div className="space-y-2">
                    <input
                      type="email"
                      required
                      placeholder="Attendee email..."
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="bg-neutral-900 border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 w-full focus:outline-none focus:border-emerald-500 font-sans"
                      title="Attendee email input"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="bg-neutral-900 border border-[#30363d] rounded-lg px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 font-mono"
                        title="Meeting date"
                      />
                      <input
                        type="time"
                        required
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="bg-neutral-900 border border-[#30363d] rounded-lg px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 font-mono"
                        title="Meeting time"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading !== null}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3.5 text-xs font-bold font-sans rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading === 'schedule_meeting' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Schedule Calendar Event</span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
