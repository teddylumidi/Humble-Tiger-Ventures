import React, { useState } from "react";
import { Play, Shield, Award, Sparkles, Flame, Users, ArrowRight } from "lucide-react";

interface HeroProps {
  onNavigate: (tabId: string) => void;
  onScrollToElement: (elementId: string) => void;
}

export default function Hero({ onNavigate, onScrollToElement }: HeroProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates so center is (0,0), ranging from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setCoords({ x, y });
  };

  const rotateX = isHovered ? coords.y * -20 : 0; // Rotate opposite up/down
  const rotateY = isHovered ? coords.x * 20 : 0;  // Rotate directly left/right
  const parallaxBgX = isHovered ? coords.x * -12 : 0; // Background moves subtly in opposite direction
  const parallaxBgY = isHovered ? coords.y * -12 : 0;

  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black text-white py-12 md:py-24 cursor-default select-none" 
      id="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
    >
      {/* BACKGROUND GRAPHIC OR MEDIA */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        
        {/* Cinematic static image representing physical peak / football overlay with motion feeling */}
        <img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1920"
          alt="Sports Stadium Ambient Background"
          className="w-full h-full object-cover object-center select-none opacity-45 grayscale contrast-125"
          style={{
            transform: `translate(${parallaxBgX}px, ${parallaxBgY}px) scale(1.05)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)"
          }}
          referrerPolicy="no-referrer"
        />

        {/* Scanlines / Dark Digital Overlay representing ESPN Energy */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(255,106,0,0.06)_50%,transparent_51%)] bg-[length:100%_4px] opacity-30 pointer-events-none z-10"></div>
      </div>

      {/* DYNAMIC AMBIENT GLOW LINES */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-10 transition-transform duration-500"
        style={{
          transform: `translate(${parallaxBgX * 1.5}px, ${parallaxBgY * 1.5}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-1/8 right-10 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none z-10 transition-transform duration-500"
        style={{
          transform: `translate(${parallaxBgX * -1}px, ${parallaxBgY * -1}px)`
        }}
      ></div>

      {/* COMPONENT LAYER */}
      <div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-25 text-center flex flex-col items-center"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)"
        }}
      >
        
        {/* LIVE BADGE ALERT */}
        <button
          onClick={() => onNavigate("live")}
          className="inline-flex items-center gap-2 bg-zinc-950/90 border border-brand-orange/40 hover:border-brand-orange px-4 py-1.5 rounded-full mb-8 cursor-pointer select-none group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,106,0,0.2)]"
          id="hero-live-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
            LIVE BROADCAST ACTIVE • <span className="text-brand-orange group-hover:underline">CHAMPIONS CUP FINALS CONTENDER</span>
          </span>
          <ArrowRight className="w-3 h-3 text-brand-orange group-hover:translate-x-1 transition-transform" />
        </button>

        {/* MAIN DISPLAY HEADLINES */}
        <h1 className="max-w-5xl leading-none tracking-tight mb-6 flex flex-col items-center text-center">
          <span className="text-xs sm:text-sm font-mono tracking-[0.4em] text-brand-orange font-extrabold uppercase mb-2 block">
            HUMBLE TIGER VENTURES // SPORTS ELITE
          </span>
          <span className="font-sports text-5xl sm:text-7xl md:text-8xl mt-1 tracking-wider text-white uppercase block leading-none font-bold">
            BUILDING SPORTS BRANDS. <br />
            <span className="bg-gradient-to-r from-brand-orange via-white to-brand-gold bg-clip-text text-transparent italic select-none">
              ELEVATING ATHLETES.
            </span> <br />GROWING AFRICAN SPORTS.
          </span>
        </h1>

        {/* EDITORIAL SUBTEXT */}
        <p className="max-w-2xl text-zinc-400 text-sm sm:text-base font-normal mb-10 tracking-wide">
          Humble Tiger Ventures is a sports branding, media, marketing, PR, and athlete management agency helping athletes, teams, schools, and coaches grow visibility, attract sponsorships, and unlock global opportunities.
        </p>

        {/* PRIMARY AND SECONDARY ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center w-full max-w-2xl mb-16" id="hero-actions">
          <button
            onClick={() => onNavigate("register")}
            className="px-8 py-4 bg-brand-orange hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-lg shadow-brand-orange/20 [clip-path:polygon(0_0,95%_0,100%_100%,5%_100%)]"
          >
            WORK WITH US
          </button>

          <button
            onClick={() => onScrollToElement("pricing-section")}
            className="px-8 py-4 bg-zinc-950 border border-brand-gold/40 hover:border-brand-gold text-brand-gold hover:text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-300 [clip-path:polygon(0_0,95%_0,100%_100%,5%_100%)]"
          >
            VIEW PACKAGES
          </button>

          <button
            onClick={() => onNavigate("portfolio")}
            className="px-8 py-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-300 text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-300 [clip-path:polygon(0_0,95%_0,100%_100%,5%_100%)]"
          >
            BECOME A PARTNER
          </button>
        </div>

        {/* PERFORMANCE STATS STATISTICAL DISPLAY */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 w-full max-w-5xl pt-10 border-t border-zinc-900 text-center" id="hero-counters">
          <div className="group cursor-default">
            <div className="font-sports text-4xl sm:text-5xl text-brand-orange font-bold">
              500+
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 group-hover:text-white transition-colors">
              ATHLETES PROMOTED
            </div>
          </div>
          <div className="group cursor-default">
            <div className="font-sports text-4xl sm:text-5xl text-brand-gold font-bold">
              100+
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 group-hover:text-white transition-colors">
              SPORTS CAMPAIGNS
            </div>
          </div>
          <div className="group cursor-default">
            <div className="font-sports text-4xl sm:text-5xl text-white font-bold group-hover:text-brand-orange transition-colors">
              50+
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 group-hover:text-white transition-colors">
              TEAMS & SCHOOLS SUPPORTED
            </div>
          </div>
          <div className="group cursor-default">
            <div className="font-sports text-4xl sm:text-5xl text-emerald-400 font-bold group-hover:text-brand-orange transition-colors">
              M+
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 group-hover:text-white transition-colors">
              DIGITAL REACH
            </div>
          </div>
        </div>

      </div>

      {/* SCROLL ANCHOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden sm:block">
        <button
          onClick={() => onScrollToElement("about-section")}
          className="text-zinc-500 hover:text-white transition-colors"
          title="Scroll down"
        >
          <span className="text-[9px] font-mono tracking-widest block uppercase mb-1">SCROLL</span>
          <div className="w-[1px] h-8 bg-zinc-800 mx-auto"></div>
        </button>
      </div>
    </section>
  );
}
