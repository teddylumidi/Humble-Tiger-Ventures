import { Award, Zap, TrendingUp, Sparkles, BookOpen } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-brand-orange" />,
      title: "SPORTS BRANDING",
      desc: "Architecting prestige and authority. We formulate team logos, apparel style standards, and stadium design matrices built on deep regional stories."
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-orange" />,
      title: "ATHLETE MARKETING",
      desc: "Maximizing voice and value. We elevate individual performance metrics into premium brand portfolios, unlocking critical commercial endorsement deals."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
      title: "SPONSORSHIP ACTIVATION",
      desc: "Delivering real engagement. No lazy static banner ads. We design physical activations, street tournaments, and bespoke viral video content."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-brand-orange" />,
      title: "SPORTS STORYTELLING",
      desc: "Capturing absolute raw motion. We document grassroots talent and continental champions with modern Nike-level cinematic drama."
    }
  ];

  return (
    <section className="bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="about-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* COLUMN 1: INTENTIONAL NARRATIVE */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs tracking-widest text-brand-orange font-mono uppercase rounded-sm">
              <Sparkles className="w-3.5 h-3.5" /> WE ARE THE TIGER
            </div>
            
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white leading-none uppercase">
              ELITE KENYAN SPORTS<br />
              <span className="text-brand-orange\">START HERE.</span>
            </h2>

            <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base tracking-wide max-w-lg leading-relaxed">
              <p className="font-bold text-white border-l-4 border-brand-orange pl-4\">
                Kenya's sports talent deserves world-class branding and professional excellence.
              </p>
              <p>
                Humble Tiger Ventures is built for Kenyan athletes, schools, and clubs who refuse to settle for mediocre representation.
              </p>
              <p>
                From grassroots football academies to elite championship tournaments, we deliver cinematic documentation, strategic branding, and corporate-grade sponsorship activation across East Africa.
              </p>
              <p>
                15 athletes branded. 30 clubs and schools impacted. 1.2M+ media reach. This is Kenyan excellence amplified.
              </p>
            </div>
          </div>

          {/* COLUMN 2: BRAND PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="about-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-black border border-zinc-900 p-6 rounded-sm relative group hover:border-brand-orange/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,106,0,0.1)]"
              >
                <div className="absolute top-0 left-0 w-1.5 h-0 bg-brand-orange group-hover:h-full transition-all duration-350" />
                <div className="w-10 h-10 bg-zinc-950 rounded-sm flex items-center justify-center border border-zinc-800 mb-4 group-hover:border-brand-orange transition-all">
                  {pillar.icon}
                </div>
                <h3 className="font-sports text-xl tracking-wider text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NARRATIVE TAG BANNER */}
        <div className="mt-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-900 p-8 text-center" id="about-manifesto-banner">
          <p className="font-sports text-2xl sm:text-3xl tracking-wide uppercase italic text-zinc-200">
            "FORGET THE LOGO. OWN THE CULTURAL MOMENT."
          </p>
          <p className="text-[10px] font-mono tracking-widest text-brand-orange uppercase mt-2">
            — HUMBLE TIGER MANIFESTO
          </p>
        </div>
      </div>
    </section>
  );
}
