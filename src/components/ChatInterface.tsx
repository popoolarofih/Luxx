'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Paperclip, Mic, Heart, ShoppingBag } from 'lucide-react';
import { processChat } from '@/app/actions/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export function ChatInterface() {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: "Hello! I'm your LUXE personal shopping assistant. I can help you find anything from everyday essentials to luxury gifts. \n\nWhat style are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await processChat(input, messages.map(m => ({ role: m.role, content: m.content })));

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.response,
        toolResults: result.toolResults
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-2 ml-1">
                <div className={`size-6 rounded-full flex items-center justify-center ${msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-slate-200'}`}>
                  {msg.role === 'assistant' ? <Bot className="size-3.5" /> : <User className="size-3.5" />}
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                  {msg.role === 'assistant' ? 'Assistant' : 'You'}
                </span>
              </div>
              <div className={`px-6 py-4 rounded-xl max-w-[85%] shadow-sm border ${
                msg.role === 'user'
                  ? 'bg-primary text-white border-transparent rounded-tr-none'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-100 dark:border-slate-800 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>

              {msg.toolResults && msg.toolResults.map((tr: any, j: number) => (
                tr.tool === 'search_products' && tr.results && tr.results.length > 0 && (
                  <div key={j} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
                    {tr.results.map((p: any) => (
                      <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-primary/50 transition-all cursor-pointer relative">
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                           <Link href={`/product/${p.id}`} className="absolute inset-0 z-0" />
                           <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Product Preview</span>
                           <button
                              onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                              className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${wishlist.includes(p.id) ? 'text-red-500 fill-current' : ''}`}
                            >
                              <Heart className="size-3" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                              className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-10 shadow-lg"
                            >
                              <ShoppingBag className="size-3" />
                            </button>
                        </div>
                        <Link href={`/product/${p.id}`}>
                          <div className="px-1">
                            <h4 className="text-sm font-semibold truncate mb-1">{p.name}</h4>
                            <p className="text-primary font-bold text-xs">${p.price}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex items-center gap-2 ml-1">
             <div className="size-2 bg-primary/40 rounded-full animate-bounce" />
             <div className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-.3s]" />
             <div className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-.5s]" />
          </div>
        )}
      </div>

      <div className="p-6 bg-transparent">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-full p-2 shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <button
            onClick={() => alert("Upload feature coming soon!")}
            className="flex items-center justify-center size-10 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="size-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your request here..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 dark:placeholder-slate-500"
          />
          <button
            onClick={() => alert("Voice feature coming soon!")}
            className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors"
          >
            <Mic className="size-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="flex items-center justify-center size-10 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <Send className="size-4" />
          </button>
        </div>
        <div className="flex justify-center mt-3">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Calm Assistant Powered by AI</p>
        </div>
      </div>
    </div>
  );
}
