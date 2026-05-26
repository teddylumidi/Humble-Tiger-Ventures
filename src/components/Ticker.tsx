import { useEffect, useState } from "react";
import { TICKER_EVENTS } from "../data";
import { Zap } from "lucide-react";

export default function Ticker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TICKER_EVENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-[11px] font-mono border-b border-zinc-900 overflow-hidden h-9 flex items-center select-none" id="ticker-root">
      {/* Editorial Tag */}
      <div className="bg-brand-orange text-black font-extrabold h-full flex items-center px-4 tracking-wider shrink-0 uppercase font-sports text-sm pr-6 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
        HTV TICKER
      </div>

      {/* Roller Frame */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        {/* We can do a sliding animation or elegant cross-fades */}
        <div className="flex items-center gap-10 whitespace-nowrap animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] h-full">
          {/* Loop twice to make seamless ticker */}
          {[...TICKER_EVENTS, ...TICKER_EVENTS, ...TICKER_EVENTS].map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="flex items-center gap-2 hover:text-brand-orange cursor-pointer transition-colors duration-200"
            >
              <span className={`text-[10px] uppercase px-1.5 py-0.5 font-bold rounded-sm ${
                event.isHot ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300"
              }`}>
                {event.category}
              </span>
              <span className="text-zinc-100 uppercase tracking-widest font-semibold">
                {event.title}
              </span>
              {index % 2 === 0 && <Zap className="w-3 h-3 text-brand-gold fill-brand-gold ml-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center h-full text-zinc-400 gap-4 px-4 bg-zinc-950/90 border-l border-zinc-900 text-[10px]" id="ticker-time">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          LIVE SCORES
        </span>
      </div>
      
      {/* CSS marquee support since keyframe is nested or we can append with styling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
