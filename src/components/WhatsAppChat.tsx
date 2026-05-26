import React, { useState } from "react";
import { MessageSquare, X, MapPin, Send, MessageCircle } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const phoneNumber = "254729542982";
  const defaultText = encodeURIComponent(
    "Hello Humble Tiger Ventures Kenya! I'm interested in sports branding, athlete development, and partnership opportunities!"
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMsg = encodeURIComponent(userMsg.trim() || "Hello Humble Tiger Ventures!");
    const href = `https://wa.me/${phoneNumber}?text=${cleanMsg}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setUserMsg("");
    setIsOpen(false);
  };

  const handleQuickLink = () => {
    const href = `https://wa.me/${phoneNumber}?text=${defaultText}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans" id="whatsapp-ambient-chat-widget">
      {/* 1. FLOATING MINI DIALOG WINDOW */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-zinc-950 border-2 border-brand-orange text-white rounded-none shadow-[0_10px_30px_rgba(255,106,0,0.2)] overflow-hidden animate-fadeIn relative">
          
          {/* Top Panel Decor Lines */}
          <div className="h-[2px] bg-gradient-to-r from-brand-orange via-brand-gold to-emerald-500"></div>

          {/* Support Desk Header */}
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Green status circle */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold font-mono text-sm shadow-[0_0_10px_rgba(255,106,0,0.1)]">
                  HTV
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest leading-none">
                  HTV KENYA SUPPORT
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono tracking-wider mt-1">
                  <MapPin className="w-3 h-3 text-brand-orange" /> Nairobi, Kenya
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-200"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble Body Area */}
          <div className="p-5 space-y-4 max-h-72 overflow-y-auto bg-black/80">
            <div className="bg-zinc-900 p-3.5 border-l-4 border-emerald-500 rounded-sm relative">
              <span className="block text-[8px] font-mono tracking-widest text-[#25D366] font-extrabold uppercase mb-1">
                HTV KENYA HOTLINE • +254729542982
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Habari! Welcome to Humble Tiger Ventures Kenya. Connect with our team based in Nairobi. Branding. Athlete development. Club partnerships. Let's elevate Kenyan sports excellence.
              </p>
              <p className="text-[9px] text-zinc-400 mt-2 font-mono">
                📧 humbletigerventures27@gmail.com
              </p>
              <span className="block text-[8px] font-mono text-zinc-500 text-right mt-1.5 uppercase font-bold">
                100% Secure Direct Encryption
              </span>
            </div>

            <div className="text-center">
              <button
                onClick={handleQuickLink}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold text-[10px] tracking-widest uppercase transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5" /> Open Instant WhatsApp
              </button>
            </div>
          </div>

          {/* Quick Input Form Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="TYPE YOUR MESSAGE FOR WHATSAPP..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 px-3 py-2 rounded-none focus:outline-none focus:border-brand-orange font-mono tracking-wide"
            />
            <button
              type="submit"
              className="p-2 bg-brand-orange text-black hover:bg-white hover:text-black transition-colors"
              aria-label="Send direct message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. MAIN WHATSAPP FLOATING BUBBLE REVELATOR ELEMENT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white hover:text-white rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 select-none animate-bounce-subtle font-bold"
        id="whatsapp-trigger-bubble"
        title="Chat with us on WhatsApp"
      >
        {/* Animated pulsing outer boundary */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-pulse opacity-40 pointer-events-none group-hover:hidden"></span>

        <WhatsAppIcon className="w-8 h-8 drop-shadow-lg" />

        {/* Small Notification Indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-[8px] text-white font-mono font-bold">
          1
        </span>

        {/* Floating tooltip message */}
        <span className="absolute right-16 bg-black text-[#25D366] border border-[#25D366]/30 text-[9px] font-mono tracking-widest font-black uppercase px-2.5 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          Chat With Us (Nairobi) &rarr;
        </span>
      </button>
    </div>
  );
}
