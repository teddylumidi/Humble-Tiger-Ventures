import { useState, useEffect } from "react";
import { Timer, ArrowUpRight, Zap } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LiveCountdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 2,
    minutes: 14,
    seconds: 45,
  });

  useEffect(() => {
    // Set static event time in the future (e.g., 2 hours and 30 minutes from now)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);
    targetDate.setMinutes(targetDate.getMinutes() + 45);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (n: number) => String(n).padStart(2, "0");

  return (
    <div 
      className="bg-black/80 backdrop-blur border-2 border-dashed border-brand-orange/60 p-5 rounded-none relative overflow-hidden shadow-[0_0_20px_rgba(255,106,0,0.1)] hover:border-brand-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 animate-pulse-border"
      id="live-broadcasting-countdown"
    >
      {/* Skeleton border effect lines */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange animate-pulse"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-orange animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-orange animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange animate-pulse"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-brand-orange font-black tracking-widest uppercase bg-brand-orange/10 border border-brand-orange/30 px-2.5 py-1 rounded-[1px] mb-2 leading-none">
            <Zap className="w-3.5 h-3.5 text-brand-orange animate-bounce" /> {t("watchLiveBadge")}
          </span>
          <h3 className="font-sports text-xl sm:text-2xl text-white tracking-widest uppercase mr-3">
            {t("countdownNextMatch")}
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">
            Sponsorship Activation Match • Lagos High Schools Championship
          </p>
        </div>

        {/* Real Countdown ticker widgets */}
        <div className="flex gap-2 sm:gap-3" id="clock-metric-counters">
          {[
            { label: "HRS", val: timeLeft.hours },
            { label: "MIN", val: timeLeft.minutes },
            { label: "SEC", val: timeLeft.seconds },
          ].map((item, id) => (
            <div 
              key={id} 
              className="flex flex-col items-center bg-zinc-950/90 border border-zinc-900 w-14 sm:w-16 py-2.5 relative group hover:border-brand-orange transition-all duration-300 shadow-md"
            >
              <div className="text-2xl sm:text-3xl font-mono font-black text-brand-orange tracking-widest leading-none">
                {formatNum(item.val)}
              </div>
              <div className="text-[8px] font-mono tracking-widest text-zinc-500 font-bold mt-1.5 group-hover:text-white transition-colors duration-200">
                {item.label}
              </div>
              {/* Dynamic bottom strip indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-orange group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
