import { Shield, Sparkles, Award, Trophy, Target, Dumbbell } from "lucide-react";

export default function Partners() {
  const brands = [
    { name: "SHINNY FC", icon: <Shield className="w-5 h-5" /> },
    { name: "BOGIAKUMU FC", icon: <Target className="w-5 h-5" /> },
    { name: "BOMACHOGE BORABU FC", icon: <Award className="w-5 h-5" /> },
    { name: "LAFONTANA INT SCHOOL", icon: <Sparkles className="w-5 h-5" /> },
    { name: "CAFINA INT SCHOOL", icon: <Trophy className="w-5 h-5" /> },
    { name: "KENYAN SPORTS FEDERATION", icon: <Dumbbell className="w-5 h-5" /> }
  ];

  return (
    <section className="bg-black text-white py-12 overflow-hidden border-b border-zinc-900 select-none" id="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          TRUSTED BY ELITE SPONSORS, LEAGUES & SCHOLASTIC INSTITUTIONS
        </span>
      </div>

      {/* AUTO SCROLLING BANDWAY */}
      <div className="relative flex items-center overflow-hidden h-16 bg-zinc-950 border-y border-zinc-900/60 font-mono">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] h-full items-center">
          {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-2.5 text-zinc-500 hover:text-brand-orange transition-colors duration-200 cursor-pointer"
            >
              <span className="text-zinc-650 hover:text-brand-orange transition-colors shrink-0">
                {brand.icon}
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase font-mono">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
