"use client";

import { useEffect, useState, useRef } from "react";
import { insforge } from "@/lib/insforge";
import { sendFanMessage } from "@/actions/chat";

export interface FanMessage {
  id: number;
  user_id: string;
  username: string;
  message: string;
  created_at: string;
}

export default function MuroAficion({ initialMessages, currentUserEmail }: { initialMessages: FanMessage[], currentUserEmail: string }) {
  const [messages, setMessages] = useState<FanMessage[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Auto-scroll al recibir o enviar un nuevo mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // 1. Conectar a Realtime
    insforge.realtime.connect().then(() => {
      // 2. Suscribirse al canal
      insforge.realtime.subscribe("chat:fan_muro").then(({ ok, error }) => {
        if (!ok) console.error("Error al suscribirse al canal:", error);
      });
    });

    // 3. Escuchar los eventos del Trigger que creamos en la Base de Datos
    insforge.realtime.on("INSERT_message", (payload: FanMessage) => {
      setMessages(prev => {
        // Evitamos renderizar un mensaje duplicado
        if (prev.some(m => m.id === payload.id)) return prev;
        return [...prev, payload];
      });
    });

    // Limpieza al desmontar el componente
    return () => {
      insforge.realtime.unsubscribe("chat:fan_muro");
      insforge.realtime.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-slate-900/50 border border-primary/10 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300 backdrop-blur-sm">
      
      {/* Header del Chat */}
      <div className="bg-primary px-4 py-3 border-b border-primary/20 flex items-center gap-2">
        <span className="material-symbols-outlined text-on-primary">forum</span>
        <h3 className="font-lexend font-bold text-on-primary text-sm uppercase tracking-wide">Sala de Debate Live</h3>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-on-primary text-xs opacity-70 font-label-md">En línea</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
        </div>
      </div>
      
      {/* Área de Mensajes */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest/80 dark:bg-slate-950/80 transition-colors duration-300"
      >
        {messages.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-10 font-body-md">Sé el primero en escribir en el muro...</p>
        ) : (
          messages.map((msg) => {
            const isMe = currentUserEmail.startsWith(msg.username);
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 px-1 font-lexend font-semibold uppercase">
                  {msg.username}
                </span>
                <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm font-body-md shadow-sm ${
                  isMe 
                    ? "bg-primary text-on-primary rounded-br-sm" 
                    : "bg-surface-container-high dark:bg-slate-800 text-on-surface dark:text-slate-100 rounded-bl-sm"
                }`}>
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Área de Input (Sticky inferior) */}
      <form 
        ref={formRef}
        action={async (formData) => {
          await sendFanMessage(formData);
          formRef.current?.reset();
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-primary/10 dark:border-slate-800 flex gap-2 transition-colors duration-300"
      >
        <input 
          type="text" 
          name="message"
          placeholder="Escribe un mensaje de apoyo..."
          required
          autoComplete="off"
          className="flex-1 bg-surface-container dark:bg-slate-950 border border-surface-variant dark:border-slate-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-fixed-dim dark:text-slate-100 transition-colors duration-300"
        />
        <button 
          type="submit"
          className="bg-primary hover:bg-primary-container text-on-primary rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-md hover:shadow-lg shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </form>
    </div>
  );
}
