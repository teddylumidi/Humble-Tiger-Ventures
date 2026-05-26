import { useState, useEffect } from "react";
import { Flame, Menu, X, Youtube, Award, Video, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import logoImg from "../assets/images/logo.png";

const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.6 4.17 1.12 1.25 2.7 2.02 4.37 2.18v3.86c-1.78-.02-3.53-.55-4.99-1.58-.29-.2-.56-.43-.81-.67v7.53c.02 2.15-.65 4.29-1.95 5.92-1.7 2.05-4.38 3.19-7.05 3.02-2.73-.13-5.26-1.57-6.73-3.89-1.54-2.31-1.74-5.3-.53-7.8s3.68-4.22 6.44-4.5v3.9c-1.56.12-3.03.96-3.83 2.3-.87 1.4-.9 3.23-.07 4.67.82 1.38 2.39 2.19 3.98 2.08 1.63-.07 3.05-1.2 3.48-2.78.11-.41.16-.83.16-1.25V.02z" />
  </svg>
);

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: t("navHome") },
    { id: "news", label: t("navNews") },
    { id: "portfolio", label: t("navCampaigns") },
    { id: "live", label: t("navLive"), highlight: true },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 border-b border-zinc-900 shadow-lg py-3"
          : "bg-black/80 backdrop-blur-md border-b border-zinc-900/40 py-5"
      }`}
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* BRAND IDENTITY LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick("home")}
          id="brand-logo-container"
        >
          {/* Custom Stylized Tiger logo/emblem from user attachment representation */}
          <div className="relative w-11 h-11 flex items-center justify-center bg-zinc-950 border-2 border-brand-orange rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,106,0,0.15)]">
            {!logoError ? (
              <img
                src={logoImg}
                alt="Humble Tiger Logo"
                className="w-full h-full object-cover scale-105"
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent flex items-center justify-center">
                {/* Fallback lines */}
                <div className="flex gap-1 items-end h-6 pb-1">
                  <span className="w-1 h-3 bg-brand-orange rounded-full animate-pulse"></span>
                  <span className="w-1 h-5 bg-white rounded-full"></span>
                  <span className="w-1 h-6 bg-brand-orange rounded-full"></span>
                </div>
              </div>
            )}
            {/* Active signal dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-sports tracking-widest text-white leading-none">
              HUMBLE<span className="text-brand-orange">TIGER</span>
            </div>
            <div className="text-[9px] font-mono tracking-widest text-zinc-400 group-hover:text-brand-gold transition-colors duration-200">
              VENTURES // SPORTS CENTRE
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-1 py-2 text-sm uppercase tracking-widest font-semibold transition-colors duration-250 ${
                activeTab === item.id
                  ? "text-brand-orange font-bold"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {item.id === "live" && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                )}
                {item.label}
              </span>

              {/* ACTIVE UNDERLINE EFFECT */}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-orange" />
              )}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE CTAs, SOCIALS & LANG TOGGLE */}
        <div className="hidden lg:flex items-center gap-5" id="header-social-group">
          {/* LANGAUGE switcher button group */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-sm p-0.5" id="header-lang-switcher" title="Toggle Language / Gist Locale">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 text-[9px] font-mono font-black tracking-widest transition-all rounded-[1px] ${
                lang === "en" ? "bg-brand-orange text-black font-extrabold" : "text-zinc-500 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("sw")}
              className={`px-2.5 py-1 text-[9px] font-mono font-black tracking-widest transition-all rounded-[1px] ${
                lang === "sw" ? "bg-brand-orange text-black font-extrabold" : "text-zinc-500 hover:text-white"
              }`}
            >
              SW
            </button>
          </div>

          <div className="flex items-center gap-3.5 text-zinc-500 border-r border-zinc-900 pr-5 pl-1.5">
            <a
              href="https://www.tiktok.com/@humbletigerventures27?_r=1&_t=ZS-96gY6TgXIge"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-brand-orange transition-colors"
              title="TikTok"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61554904394245"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-brand-orange transition-colors"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-brand-orange transition-colors"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.youtube.com/@Humbletigerventures"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-brand-orange transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => handleNavClick("register")}
            className={`px-5 py-2.5 bg-brand-orange text-black font-extrabold uppercase text-xs tracking-widest relative overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] active:scale-95 [clip-path:polygon(0_0,92%_0,100%_100%,8%_100%)] ${
              activeTab === "register" ? "bg-white font-black" : ""
            }`}
            id="header-cta-register"
          >
            {t("navJoin")}
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-sm p-0.5 mr-1" id="mobile-lang-switcher">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 text-[9px] font-mono font-bold ${
                lang === "en" ? "bg-brand-orange text-black" : "text-zinc-500"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("sw")}
              className={`px-2 py-0.5 text-[9px] font-mono font-bold ${
                lang === "sw" ? "bg-brand-orange text-black" : "text-zinc-500"
              }`}
            >
              SW
            </button>
          </div>

          {activeTab !== "register" && (
            <button
              onClick={() => handleNavClick("register")}
              className="px-3 py-1.5 bg-brand-orange text-black font-extrabold uppercase text-[10px] tracking-widest"
            >
              JOIN
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1 hover:text-brand-orange transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-900 animate-fadeIn" id="mobile-nav-panel">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 px-4 rounded-sm uppercase tracking-widest text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? "bg-zinc-900 text-brand-orange border-l-4 border-brand-orange"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.id === "live" && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>}
                  {item.label}
                </span>
              </button>
            ))}
            
            <button
              onClick={() => handleNavClick("register")}
              className="w-full text-center py-3 bg-gradient-to-r from-brand-orange to-red-600 text-black font-extrabold uppercase tracking-widest text-xs"
            >
              {t("navJoin")}
            </button>

            {/* Socials Link Drawer */}
            <div className="flex justify-center gap-5 pt-4 border-t border-zinc-900 text-zinc-400">
              <a
                href="https://www.tiktok.com/@humbletigerventures27?_r=1&_t=ZS-96gY6TgXIge"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="hover:text-brand-orange p-2 transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61554904394245"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="hover:text-brand-orange p-2 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="hover:text-brand-orange p-2 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Humbletigerventures"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="hover:text-brand-orange p-2 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
