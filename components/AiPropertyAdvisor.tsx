'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Property } from '@/types/property';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Building2
} from 'lucide-react';

interface AiPropertyAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  currentProperty: Property | null;
  onSelectPropertyId?: (id: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'What is 1 Town Lot in square feet & meters?',
  'Recommend beach villas with solar power',
  'How does diaspora remote verification work?',
  'What are land prices in Hamilton vs Sussex?',
];

export const AiPropertyAdvisor: React.FC<AiPropertyAdvisorProps> = ({
  isOpen,
  onClose,
  currentProperty,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am your Kam Property AI Advisor for Sierra Leone. How can I help you explore luxury villas, executive rentals, or titled town lots across the Hamilton Peninsula, Sussex, Lakka, and Freetown?',
      timestamp: 'Online',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${prev.length + 1}`,
        sender: 'user',
        text: textToSend,
        timestamp: 'Just now',
      },
    ]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          propertyContext: currentProperty
            ? {
                title: currentProperty.title,
                area: currentProperty.location.area,
                priceUSD: currentProperty.priceUSD,
                status: currentProperty.status,
                power: currentProperty.utilities.power,
                water: currentProperty.utilities.water,
              }
            : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${prev.length + 1}`,
          sender: 'ai',
          text: data.answer || 'Thank you for your question. How else may I assist your Sierra Leone property search?',
          timestamp: 'Just now',
        },
      ]);
    } catch (error) {
      console.error('Error contacting AI Advisor:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${prev.length + 1}`,
          sender: 'ai',
          text: 'Kam Buy & Rent Property Sierra Leone is located at Hamilton Peninsula. Our team is available 24/7 on WhatsApp at +232 78 889 450 to answer specific inquiries or arrange live video tours.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold">Kam Property AI Advisor</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              </div>
              <p className="text-[11px] text-slate-300">Sierra Leone & Peninsula Real Estate Expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Property Context Pill (if active) */}
        {currentProperty && (
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
            <div className="truncate">
              <span className="text-emerald-700 font-bold">Focusing on:</span>{' '}
              <span className="text-slate-800 font-medium truncate">{currentProperty.title}</span>
            </div>
            <span className="text-xs font-black text-emerald-800 shrink-0 ml-2">
              ${currentProperty.priceUSD.toLocaleString()}
            </span>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[9px] mt-1 ${
                    msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center">
              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">Consulting Peninsula registry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-white border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Quick Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200/80 rounded-lg text-[11px] text-slate-700 transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about town lots, solar, titles, or prices..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputQuery.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
