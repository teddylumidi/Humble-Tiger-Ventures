import { useState, FormEvent } from "react";
import { Youtube, Mail, Zap, Check, ArrowUpRight, Award, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import logoImg from "../assets/images/logo.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.13V9.5a6.21 6.21 0 0 0-1.84-.28A6.34 6.34 0 0 0 2 15.56a6.34 6.34 0 0 0 10.9 4.47 6.27 6.27 0 0 0 1.87-4.47v-8.9a8.22 8.22 0 0 0 4.82 1.55V6.69z"/>
  </svg>
);

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { lang, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSigned, setNewsSigned] = useState(false);
  const [logoErr, setLogoErr] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsSigned(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 2000);
    }
  };

  return (
    <footer className="bg-black text-white relative border-t border-zinc-900" id="main-footer">
      
      {/* 1. FINAL HERO-CTA BANNER BLOCK */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900 overflow-hidden text-center" id="final-cta-banner">
        {/* Abstract background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/80 to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200"
          alt="Athlete jogging at dawn"
          className="absolute inset-0 w-full h-full object-cover opacity-10 select-none grayscale"
          referrerPolicy="no-referrer"
        />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block">
            THE CHRONICLES OF CHAMPIONSHIP
          </span>
          <h2 className="font-sports text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wider leading-none">
            LET'S BUILD YOUR <br />
            <span className="bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent italic select-none">
              SPORTS LEGACY
            </span> TOGETHER
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm font-sans tracking-wide">
            Whether representing a high-caliber professional athlete, an ambitious regional soccer club, or a secondary educational league.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
            <button
              onClick={() => {
                onNavigate("register");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-brand-orange hover:bg-white text-black font-extrabold uppercase text-xs tracking-widest transition-colors duration-250 [clip-path:polygon(0_0,95%_0,100%_100%,5%_100%)] cursor-pointer"
            >
              REGISTER AGENCY ACCOUNT
            </button>
            <button
              onClick={() => {
                onNavigate("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-zinc-950 border border-zinc-900 hover:border-zinc-300 text-white font-extrabold uppercase text-xs tracking-widest transition-colors duration-250 [clip-path:polygon(0_0,95%_0,100%_100%,5%_100%)] cursor-pointer"
            >
              OUR PORTFOLIO
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT STRUCTURE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12" id="footer-directory">
        {/* Left Column: Brand Bio */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            {!logoErr ? (
              <img
                src={logoImg}
                alt="Humble Tiger Ventures Logo"
                onError={() => setLogoErr(true)}
                className="h-10 w-auto object-contain border border-brand-orange/10 p-0.5 bg-black"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-xl font-sports tracking-widest text-white">
                HUMBLE<span className="text-brand-orange">TIGER</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs font-mono font-black text-white tracking-widest leading-none">HUMBLE TIGER</span>
              <span className="text-[9px] font-mono text-brand-orange uppercase font-black tracking-widest mt-1">VENTURES</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
            {lang === "en" 
              ? "Humble Tiger Ventures Kenya - Elite sports branding agency partnering with Kenyan athletes, clubs, and schools to build championship legacies across East Africa."
              : "Humble Tiger Ventures Kenya - Sports branding powerhouse supporting Kenyan athletic excellence with professional media, sponsorship activation, and world-class athlete development."}
          </p>

          <div className="flex flex-col gap-3 pt-2 text-zinc-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-brand-orange font-bold">📞</span>
              <a href="tel:+254729542982" className="hover:text-brand-orange transition-colors uppercase font-bold">
                +254729542982
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-orange font-bold">📧</span>
              <a href="mailto:humbletigerventures27@gmail.com" className="hover:text-brand-orange transition-colors">
                humbletigerventures27@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-orange font-bold">📍</span>
              <span className="uppercase">Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Quick Nav Links */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-6" id="footer-links-columns">
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase mb-4">
              CHANNELS
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-zinc-400">
              <button onClick={() => onNavigate("home")} className="hover:text-brand-orange hover:translate-x-1 transition-all text-left">
                // {t("navHome").toUpperCase()}
              </button>
              <button onClick={() => onNavigate("news")} className="hover:text-brand-orange hover:translate-x-1 transition-all text-left">
                // {t("navNews").toUpperCase()}
              </button>
              <button onClick={() => onNavigate("portfolio")} className="hover:text-brand-orange hover:translate-x-1 transition-all text-left">
                // {t("navCampaigns").toUpperCase()}
              </button>
              <button onClick={() => onNavigate("live")} className="hover:text-brand-orange hover:translate-x-1 transition-all text-left">
                // {t("navLive").toUpperCase()}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase mb-4">
              ECOSYSTEMS
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-zinc-400">
              <button onClick={() => onNavigate("register")} className="hover:text-brand-orange text-left hover:translate-x-1 transition-all">
                // ATHLETE JOIN
              </button>
              <button onClick={() => onNavigate("register")} className="hover:text-brand-orange text-left hover:translate-x-1 transition-all">
                // CLUB ONBOARD
              </button>
              <button onClick={() => onNavigate("register")} className="hover:text-brand-orange text-left hover:translate-x-1 transition-all">
                // SCHOOL SPORTS
              </button>
              <button onClick={() => onNavigate("register")} className="hover:text-brand-orange text-left hover:translate-x-1 transition-all">
                // SPONSOR DECK
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Newsletter Email Capture */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
            HTV NEWS BULLETIN ALARM
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Subscribe to our weekly editorial reviews, global transfer announcements, and elite tactical case breakdowns.
          </p>

          {newsSigned ? (
            <div className="bg-brand-orange/10 border border-brand-orange/30 p-4 text-brand-orange text-xs font-mono uppercase flex items-center gap-2.5 rounded-sm">
              <Check className="w-4 h-4 text-brand-orange shrink-0 animate-bounce" /> SIGNED UP ON TIGER RADAR!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2" id="footer-news-form">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-brand-orange px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 tracking-wider font-mono rounded-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-orange text-black font-extrabold uppercase text-xs tracking-wider font-mono"
              >
                SUB
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. LEGAL AND RIGHTS COPYRIGHT FOOT BAND */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-zinc-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-650" id="footer-copyright-band">
        <span className="text-zinc-600 uppercase">
          © {new Date().getFullYear()} HUMBLE TIGER VENTURES. ALL MEDIA INTENTIONS RESERVED.
        </span>
        <div className="flex gap-4 text-zinc-600">
          <a href="#" className="hover:text-brand-orange uppercase">PRIVACY SYSTEM CODE</a>
          <span>•</span>
          <a href="#" className="hover:text-brand-orange uppercase">TERMS OF ATHLETICS RELATION</a>
        </div>
      </div>

      {/* 4. WHATSAPP WIDGET IS HANDLED BY WHATSAPPCHAT COMPONENT */}

    </footer>
  );
}
