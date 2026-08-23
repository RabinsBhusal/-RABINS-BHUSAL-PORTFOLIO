import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  Sparkles,
  Loader2,
  Trash2,
  Save,
  History,
  TrendingUp,
  User,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';

interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: ChatPart[];
}

interface SavedSession {
  id: string;
  title: string;
  history: ChatMessage[];
  createdAt: string;
}

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: 'Hello! I am **Rabins AI**, your expert corporate finance and HMRC tax advisor. Ask me to analyze your current workbook, explain HMRC marginal tax reliefs, or review Rabins\' accounting credentials!' }]
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Firestore Saved Sessions State
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSavedSessions(currentUser.uid);
      } else {
        setSavedSessions([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auto-scroll to the bottom of the chat log when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // --- Firestore: Fetch Saved Chat Sessions ---
  const fetchSavedSessions = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'chat_sessions'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const sessions: SavedSession[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        sessions.push({
          id: docSnap.id,
          title: data.title,
          history: data.history,
          createdAt: data.createdAt
        });
      });
      setSavedSessions(sessions);
    } catch (err) {
      console.error('Error fetching saved chat sessions:', err);
    }
  };

  // --- Firestore: Save Current Chat Session ---
  const handleSaveSession = async () => {
    if (!user) {
      setChatError('Please sign in using the Workspace controller above to save your session.');
      return;
    }
    if (messages.length <= 1) {
      setChatError('Cannot save an empty chat conversation.');
      return;
    }

    setIsSaving(true);
    setChatError(null);
    try {
      // Create a descriptive title based on the first user query or active timestamp
      const firstUserMsg = messages.find(m => m.role === 'user');
      const title = firstUserMsg 
        ? `Chat: "${firstUserMsg.parts[0].text.substring(0, 30)}..."`
        : `Chat Session (${new Date().toLocaleDateString()})`;

      const payload = {
        uid: user.uid,
        title,
        history: messages,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'chat_sessions'), payload);
      await fetchSavedSessions(user.uid);
      setChatError(null);
    } catch (err: any) {
      console.error(err);
      setChatError(`Failed to save chat: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Firestore: Delete Saved Chat Session ---
  const handleDeleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, 'chat_sessions', id));
      if (user) {
        await fetchSavedSessions(user.uid);
      }
    } catch (err: any) {
      console.error('Failed to delete chat:', err);
    }
  };

  // --- Firestore: Load Saved Chat Session ---
  const handleLoadSession = (session: SavedSession) => {
    setMessages(session.history);
    setShowHistory(false);
    setChatError(null);
  };

  // Helper to extract active financial context
  const getActiveFinancialContext = () => {
    const globalState = (window as any).currentFinancialState;
    if (globalState) {
      return globalState;
    }
    // Return safe fallback values if DOM context is not loaded yet
    return {
      revenue: 500000,
      cogsPercent: 40,
      opexPercent: 30,
      capex: 30000,
      depreciation: 25000,
      taxRate: 25
    };
  };

  // Send a message to Gemini via server proxy
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setChatError(null);
    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: textToSend }]
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const activeContext = getActiveFinancialContext();

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages, // Excludes the newest user message, which will be processed by sendMessage on server
          context: activeContext
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error calling Gemini');
      }

      const data = await response.json();
      
      setMessages([
        ...newMessages,
        {
          role: 'model',
          parts: [{ text: data.text }]
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setChatError(err.message || 'Failed to generate response. Ensure API keys are active.');
      // Keep user experience smooth, revert to safe message or allow retry
    } finally {
      setIsLoading(false);
    }
  };

  // Renders simple inline markdown elements (bold, italic, code lists) safely
  const renderMessageContent = (content: string) => {
    // Escape standard tags first
    let formatted = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Markdown Bold (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Markdown Bullet Points (- text)
    formatted = formatted.split('\n').map(line => {
      if (line.trim().startsWith('- ')) {
        return `<li class="ml-4 list-disc text-neutral-300 mt-1">${line.trim().substring(2)}</li>`;
      }
      if (line.trim().startsWith('* ')) {
        return `<li class="ml-4 list-disc text-neutral-300 mt-1">${line.trim().substring(2)}</li>`;
      }
      return line;
    }).join('\n');

    // Paragraph Breaks
    formatted = formatted.replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: formatted }} className="text-xs leading-relaxed space-y-1 select-text" />;
  };

  // Preset query chips
  const SUGGESTION_CHIPS = [
    { label: 'Analyze Active Workbook 📊', query: 'Can you analyze the health, margins, and UK GAAP parameters of my current active financial workbook state?' },
    { label: 'HMRC Relief Schemes 🇬🇧', query: 'Explain how UK Corporation tax marginal relief bands (£50k to £250k) apply to business profits and how HMRC structures relief.' },
    { label: 'Candidate Credentials 🎓', query: 'What are Rabins Bhusal\'s educational qualifications, ACCA candidacy status, and analytical accounting background?' },
  ];

  return (
    <div id="gemini-chatbot-root" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-2xl hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-emerald-400/20"
          id="chatbot-trigger-btn"
          aria-label="Open Rabins AI Chatbot"
        >
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white border-2 border-[#090a0f] animate-pulse">
            1
          </span>
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12" />
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="flex flex-col w-[360px] sm:w-[400px] h-[550px] bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-neutral-950 border-b border-[#30363d]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-neutral-950 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-neutral-100 flex items-center gap-1">
                  <span>Rabins AI Advisor</span>
                  <Sparkles className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
                </div>
                <span className="text-[9px] text-emerald-400/80 font-mono tracking-wider font-semibold uppercase">Context-Aware V1.0</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* History Toggle Button */}
              {user && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${showHistory ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'border-transparent hover:bg-neutral-900 text-neutral-400'}`}
                  title="View Saved Sessions"
                >
                  <History className="w-4 h-4" />
                </button>
              )}
              {/* Save Session Button */}
              <button
                onClick={handleSaveSession}
                disabled={isSaving}
                className="p-1.5 rounded-lg border border-transparent hover:bg-neutral-900 text-neutral-400 transition-colors cursor-pointer disabled:opacity-50"
                title="Save Session to Firestore"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : <Save className="w-4 h-4" />}
              </button>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 border border-transparent text-neutral-400 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat error notice */}
          {chatError && (
            <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 flex items-center gap-2 text-[10px] text-rose-400 animate-fade-in font-sans shrink-0">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 text-left line-clamp-2">{chatError}</span>
              <button onClick={() => setChatError(null)} className="text-neutral-400 hover:text-neutral-200">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* MAIN CONTAINER: Switch between conversation history and current chat */}
          {showHistory ? (
            /* SAVED HISTORIES SECTION */
            <div className="flex-1 p-4 bg-[#0a0d14] overflow-y-auto space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Saved Chat Logs ({savedSessions.length})</span>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-[10px] font-sans font-bold text-emerald-400 hover:underline"
                >
                  Return to Active Chat
                </button>
              </div>

              {savedSessions.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-500 font-sans italic border border-dashed border-neutral-800 rounded-xl">
                  No saved conversations. Create one using the floppy disk icon above when signed in!
                </div>
              ) : (
                <div className="space-y-2">
                  {savedSessions.map((sess) => (
                    <div
                      key={sess.id}
                      onClick={() => handleLoadSession(sess)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-[#30363d] hover:border-neutral-700 cursor-pointer transition-all"
                    >
                      <div className="text-left min-w-0 flex-1 pr-2">
                        <span className="text-xs font-semibold text-neutral-200 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                          {sess.title}
                        </span>
                        <span className="text-[9px] text-neutral-500 font-mono mt-0.5 block">
                          {new Date(sess.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(sess.id, e)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/15 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE CHAT LOG SECTION */
            <div className="flex-1 flex flex-col min-h-0 bg-[#0a0d14]">
              {/* Conversation Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg, index) => {
                  const isModel = msg.role === 'model';
                  return (
                    <div
                      key={index}
                      className={`flex gap-2.5 max-w-[85%] ${isModel ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'}`}
                    >
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold ${
                        isModel 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      }`}>
                        {isModel ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      </div>

                      {/* Chat text wrapper */}
                      <div className={`p-3 rounded-2xl text-left shadow-md ${
                        isModel 
                          ? 'bg-[#161b22] border border-[#30363d] text-neutral-100 rounded-tl-none' 
                          : 'bg-emerald-500 text-neutral-950 rounded-tr-none font-medium'
                      }`}>
                        {isModel ? (
                          renderMessageContent(msg.parts[0].text)
                        ) : (
                          <div className="text-xs leading-relaxed select-text font-sans">{msg.parts[0].text}</div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 max-w-[85%] mr-auto items-start">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span className="text-[10px] font-mono text-neutral-400">Analyzing workbook cells...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions chips panel - show when thread is short to prompt interaction */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 pb-2 border-t border-[#30363d]/40 pt-2 shrink-0 bg-[#0d1117]/30 text-left">
                  <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider font-black block mb-1.5 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-neutral-500" />
                    <span>Advisory Inquiry Suggestions</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTION_CHIPS.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(chip.query)}
                        className="text-[10px] font-sans font-medium px-2 py-1 rounded-lg bg-[#161b22] hover:bg-[#30363d] border border-[#30363d] text-neutral-300 hover:text-neutral-100 transition-all text-left cursor-pointer active:scale-95"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Entry Area */}
              <div className="p-3.5 bg-neutral-950 border-t border-[#30363d] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ask about HMRC tax relief or qualifications..."
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-sans transition-colors disabled:opacity-50"
                    title="Inquiry message input"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-8 w-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shrink-0 transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
