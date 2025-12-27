
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your SportDev AI Coach. How can I help you reach your goals today?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatWithGemini(inputValue, messages.map(m => ({ role: m.role, text: m.text })));
      setMessages(prev => [...prev, { role: 'model', text: response || 'No response', timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to my brain right now.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-slate-950 hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] max-w-[calc(100vw-3rem)] bg-slate-900 border border-border-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-4 bg-primary text-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined font-black">bolt</span>
              <span className="font-black text-sm uppercase tracking-wider">SportDev AI Coach</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-primary text-slate-900 rounded-tr-none' 
                    : 'bg-slate-800 text-slate-300 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950 border-t border-border-dark flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-900 border-none rounded-xl text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-primary text-slate-950 rounded-xl flex items-center justify-center disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
