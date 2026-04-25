'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, ShieldAlert, Cpu, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai' | 'operator';
  text: string;
  timestamp: Date;
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hello! I am your ATM Optimization Assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOperatorAlerted, setIsOperatorAlerted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic Simulation
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let response = "";
      let needsOperator = false;

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Greetings! I can help you with ATM status, refill predictions, and route optimization. What would you like to know?";
      } else if (lowerInput.includes('how to refill') || lowerInput.includes('refill process')) {
        response = "The refill process is managed through the 'Global HQ' tab. Select a route and dispatch the team. For specific terminal keys, you might need an operator.";
      } else if (lowerInput.includes('bug') || lowerInput.includes('error') || lowerInput.includes('broken') || lowerInput.includes('security breach') || lowerInput.includes('stolen')) {
        response = "I have detected a complex issue that requires immediate human intervention. I am alerting the on-call operator right now. Please wait...";
        needsOperator = true;
      } else if (lowerInput.includes('duration')) {
        response = "I predict cash durations based on historical withdrawal patterns, day types (like Salary Day), and simulated noise. You can see the depletion curve in the 'Unit Analysis' tab.";
      } else {
        response = "That's an interesting question. Let me check my knowledge base... Actually, this seems a bit technical. Would you like me to connect you with an operator?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (needsOperator) {
        setIsOperatorAlerted(true);
        setTimeout(() => {
          const operatorMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'operator',
            text: "Hello, I am Operator #104. I've been alerted to your issue regarding '" + userMessage.text + "'. How can I resolve this for you manually?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, operatorMessage]);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white shadow-2xl shadow-accent/40 z-[100]"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] glass-card rounded-[32px] flex flex-col z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-accent/5 backdrop-blur-md">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                        <Cpu size={20} />
                     </div>
                     <div>
                        <div className="text-sm font-black tracking-tight">AI Assistant</div>
                        <div className="flex items-center text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
                           Always Online
                        </div>
                     </div>
                  </div>
                  {isOperatorAlerted && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full animate-bounce">
                       <ShieldAlert size={12} className="text-red-500" />
                       <span className="text-[10px] font-black text-red-500 uppercase">Operator Alerted</span>
                    </div>
                  )}
               </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-600' : 
                      msg.role === 'operator' ? 'bg-red-600' : 'bg-slate-800'
                    }`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : 
                       msg.role === 'operator' ? <ShieldAlert size={14} className="text-white" /> : 
                       <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.role === 'user' ? 'bg-accent text-white rounded-tr-none' : 
                      msg.role === 'operator' ? 'bg-red-500/10 border border-red-500/20 text-red-200 rounded-tl-none' : 
                      'bg-muted border border-border text-foreground rounded-tl-none'
                    }`}>
                      {msg.text}
                      <div className="mt-2 opacity-50 text-[10px] font-bold">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-muted p-4 rounded-2xl rounded-tl-none border border-border flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border bg-background/50">
               <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your issue..."
                    className="w-full glass-input rounded-2xl pl-4 pr-12 py-4 text-xs font-bold focus:outline-none"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent text-white rounded-xl shadow-lg shadow-accent/20 hover:scale-110 transition-all"
                  >
                    <Send size={16} />
                  </button>
               </div>
               <div className="mt-4 flex items-center justify-center space-x-4 opacity-30">
                  <div className="flex items-center text-[10px] font-black uppercase">
                     <Sparkles size={10} className="mr-1" /> Powered by AI Core
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
