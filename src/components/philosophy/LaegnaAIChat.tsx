'use client';
import React, { useState, useRef, useEffect } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  'Explain the difference between binary and Laegna opposition',
  'What do I, O, A, E mean in Laegna math?',
  'How does trauma create binary thinking?',
  'Explain Y (plus-sum) vs X (zero-sum) in Laegna',
  'What is SpiReason spirituality?',
];

export default function LaegnaAIChat() {
  const { mode, modality, logic } = usePhilosophyStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Greetings, seeker. I am versed in the Laegna symbols and SpiReason logic of Tambet Väli. Ask me about I·O·A·E values, Z·X·Y space zones, binary opposition, Taoist integration, or the philosophical engines behind capitalism, communism, materialism, and spirit. What would you explore?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll within the message list container only — never scrolls the page
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const userText = text ?? input.trim();
    if (!userText || loading) return;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/laegna-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: { mode, modality, logic },
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply ?? data.error ?? 'No response.' }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="phil-card flex flex-col" style={{ height: '520px', maxHeight: '70vh' }}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid var(--border-gold)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 8px var(--teal)' }} />
        <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>
          LAEGNA ORACLE
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Knows Tambet Väli's full ecosystem
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto py-3 flex flex-col gap-3" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 max-w-[85%] ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
              style={{ fontSize: '0.92rem', lineHeight: 1.65 }}>
              {msg.role === 'assistant' && (
                <span style={{ color: 'var(--teal)', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', display: 'block', marginBottom: '4px', letterSpacing: '0.08em' }}>
                  Oracle ◆
                </span>
              )}
              <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai px-4 py-2">
              <DotsLoader />
            </div>
          </div>
        )}
      </div>

      {/* Starters */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {STARTER_PROMPTS.map((p) => (
            <button key={p} onClick={() => sendMessage(p)}
              style={{ fontSize: '0.72rem', padding: '4px 10px', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--text-parchment)', cursor: 'pointer', borderRadius: '2px', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.04em' }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid var(--border-gold)' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask the Oracle about Laegna, logic, opposition…"
          disabled={loading}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,165,0,0.2)',
            color: 'var(--text-parchment)', padding: '8px 12px', fontSize: '0.88rem',
            outline: 'none', borderRadius: '3px', fontFamily: 'var(--font-crimson)',
          }}
        />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
          style={{
            padding: '8px 16px', background: 'var(--gold-dim)', border: '1px solid var(--gold)',
            color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-cinzel)', fontSize: '0.78rem',
            letterSpacing: '0.08em', opacity: loading || !input.trim() ? 0.5 : 1,
          }}>
          ASK
        </button>
      </div>
    </div>
  );
}

function DotsLoader() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)',
          animation: 'pulse-glow 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}
