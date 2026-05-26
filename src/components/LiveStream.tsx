import { useState, FormEvent } from "react";
import { FIXTURES } from "../data";
import { Fixture } from "../types";
import { Play, Tv, Calendar, Radio, Users, Check, Bell, RefreshCw, Volume2, Shield } from "lucide-react";
import LiveCountdown from "./LiveCountdown";
import MultiPlatformLinks from "./MultiPlatformLinks";
import { useLanguage } from "../LanguageContext";
import StatsAndHighlights from "./StatsAndHighlights";

interface LiveStreamProps {
  onWatchArchive?: (title: string, duration: string, thumbnail: string, views: string) => void;
}

export default function LiveStream({ onWatchArchive }: LiveStreamProps) {
  const { lang, t } = useLanguage();
  const [provider, setProvider] = useState<"tw" | "yt" | "fb">("yt");
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [activeFixture, setActiveFixture] = useState<Fixture>(
    FIXTURES.find((f) => f.status === "live") || FIXTURES[0]
  );

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput("");
      }, 2000);
    }
  };

  // Archive list
  const archives = [
    {
      id: "arc-1",
      title: "Nairobi High School Athletic Drills Semifinals",
      duration: "1h 45m",
      views: "12K views",
      date: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: "arc-2",
      title: "Accra Hoopsters classic final highlights",
      duration: "18m 42s",
      views: "45K views",
      date: "Last week",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: "arc-3",
      title: "Siya Chidi Rugby Academy Camp Promo",
      duration: "4m 15s",
      views: "110K views",
      date: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section className="bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="live-section">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/30 text-red-500 px-3 py-1 rounded-sm text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              {lang === "en" ? "LIVE BROADCAST CENTRE" : "SQUAD LIVE TV"}
            </div>
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
              {t("liveHeader")}
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 mt-4 md:mt-0 font-sans tracking-wide">
            {t("liveSub")}
          </p>
        </div>

        {/* LIVE COUNTDOWN TIMER BLOCK */}
        <div className="mb-10">
          <LiveCountdown />
        </div>

        {/* BROADCAST CONSOLE PLATFORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12" id="stream-platform-grid">
          {/* LEFT 8 COLUMNS: STREAM PLAYER SCREEN */}
          <div className="lg:col-span-8 space-y-4">
            {/* Stream Alert Banner */}
            <div className="bg-gradient-to-r from-red-600 to-brand-orange text-black p-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-sm shadow-lg">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-black animate-pulse" />
                <span className="text-xs font-sans font-black uppercase tracking-wider">
                  STREAMING LIVE NOW: {activeFixture.title} • {activeFixture.sport.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                <Users className="w-3.5 h-3.5" /> 4,120 WATCHING
              </div>
            </div>

            {/* EMBED PLAYER SIMULATOR SCREEN */}
            <div className="relative bg-black aspect-video border border-zinc-900 rounded-sm overflow-hidden group shadow-2xl" id="broadcast-viewer">
              {/* Twitch Embed Simulation */}
              {provider === "tw" && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-purple-400 font-bold tracking-widest uppercase flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-sm">
                      <Tv className="w-4 h-4" /> TWITCH BROADCAST MODALITY
                    </span>
                    <span className="text-zinc-500">twitch.tv/humbletigerventures</span>
                  </div>

                  {/* Main Simulated Overlay */}
                  <div className="text-center space-y-4 py-8">
                    <span className="inline-block bg-purple-600 text-white font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-sm">
                      TWITCH.TV EMBEDDED PLAYER INTEGRATED
                    </span>
                    <div className="font-sports text-3xl sm:text-5xl text-white tracking-widest uppercase max-w-lg mx-auto">
                      {activeFixture.competitors[0]?.name} VS {activeFixture.competitors[1]?.name || "PENDING"}
                    </div>
                    {activeFixture.competitors[0]?.score && (
                      <div className="font-mono text-2xl font-bold tracking-wider text-brand-orange">
                        CURRENT SCORE: {activeFixture.competitors[0].score} - {activeFixture.competitors[1]?.score}
                      </div>
                    )}
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Embedded Twitch streams automatically connect under client iframe variables in production.
                    </p>
                  </div>

                  {/* Audio/Video Simulated Controller */}
                  <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900/60 pt-4 text-zinc-500">
                    <span className="flex items-center gap-2"><Volume2 className="w-4 h-4 text-zinc-400" /> SOURCE AUDIO HIGH-DEF</span>
                    <span>1080P PRO-RES // 60FPS</span>
                  </div>
                </div>
              )}

              {/* YouTube Live Simulation */}
              {provider === "yt" && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-zinc-950">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-red-500 font-bold tracking-widest uppercase flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-sm">
                      <Play className="w-4 h-4" /> YOUTUBE LIVE FEED
                    </span>
                    <span className="text-zinc-500">youtube.com/@Humbletigerventures</span>
                  </div>

                  <div className="text-center space-y-4 py-8">
                    <span className="inline-block bg-red-600 text-white font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-sm">
                      YOUTUBE LIVE PLAYER LOADED
                    </span>
                    <div className="font-sports text-3xl sm:text-5xl text-white tracking-widest uppercase max-w-lg mx-auto">
                      {activeFixture.competitors[0]?.name} VS {activeFixture.competitors[1]?.name || "PENDING"}
                    </div>
                    {activeFixture.competitors[0]?.score && (
                      <div className="font-mono text-2xl font-bold tracking-wider text-brand-orange">
                        LIVE MATCH SCORE: {activeFixture.competitors[0].score} - {activeFixture.competitors[1]?.score}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900/60 pt-4 text-zinc-500">
                    <span className="flex items-center gap-2"><Volume2 className="w-4 h-4 text-zinc-400" /> BROADCAST DELAY: ~2S</span>
                    <span className="text-brand-gold font-bold">HTV HIGH-FIDELITY PROXIES</span>
                  </div>
                </div>
              )}

              {/* Facebook Live Simulation */}
              {provider === "fb" && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-tr from-blue-950 via-zinc-950 to-black">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-blue-500 font-bold tracking-widest uppercase flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-sm">
                      <Tv className="w-4 h-4" /> FACEBOOK LIVE BROADCAST
                    </span>
                    <span className="text-zinc-500">facebook.com/HumbleTigerVentures</span>
                  </div>

                  <div className="text-center space-y-4 py-8">
                    <span className="inline-block bg-blue-600 text-white font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-sm">
                      FACEBOOK AUDIENCE PLAYER READY
                    </span>
                    <div className="font-sports text-3xl sm:text-5xl text-white tracking-widest uppercase max-w-lg mx-auto">
                      {activeFixture.competitors[0]?.name} VS {activeFixture.competitors[1]?.name || "PENDING"}
                    </div>
                    {activeFixture.competitors[0]?.score && (
                      <div className="font-mono text-2xl font-bold tracking-wider text-brand-orange">
                        CURRENT: {activeFixture.competitors[0].score} - {activeFixture.competitors[1]?.score}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900/60 pt-4 text-zinc-500">
                    <span className="flex items-center gap-2">COMMERCIAL CO-ORDINATE ACTIVE</span>
                    <span>1080P HIGH BANDWIDTH</span>
                  </div>
                </div>
              )}
            </div>

            {/* PROVIDER SWITCH PANEL */}
            <div className="bg-black border border-zinc-900 p-4 rounded-sm flex flex-col sm:flex-row justify-between items-center gap-4" id="stream-provider-selectors">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                CHOOSE STREAMING CARRIER SIGNAL:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setProvider("yt")}
                  className={`px-3.5 py-2 font-mono text-[10px] tracking-widest transition-all ${
                    provider === "yt"
                      ? "bg-red-600 text-white font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  YOUTUBE LIVE
                </button>
                <button
                  onClick={() => setProvider("tw")}
                  className={`px-3.5 py-2 font-mono text-[10px] tracking-widest transition-all ${
                    provider === "tw"
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  TWITCH EMBED
                </button>
                <button
                  onClick={() => setProvider("fb")}
                  className={`px-3.5 py-2 font-mono text-[10px] tracking-widest transition-all ${
                    provider === "fb"
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  FACEBOOK LIVE
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: FIXTURE CALENDAR & ALERTS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ALERT SUBSCRIPTION BOARD */}
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-sm">
              <h3 className="font-sports text-xl tracking-wider text-white mb-2 uppercase flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-orange" /> BROADCAST ALERTS
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-sans">
                Never lose access to high-adrenaline match streams. Enter details to join instant email/WhatsApp alarms.
              </p>

              {subscribed ? (
                <div className="bg-brand-orange/10 border border-brand-orange/40 text-brand-orange p-4 rounded-sm text-center">
                  <Check className="w-6 h-6 mx-auto mb-1 text-brand-orange animate-bounce" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider block">
                    ALERT LINK AUTHORIZED!
                  </span>
                  <span className="text-[10px] text-zinc-400 block mt-1 font-sans">
                    You of the Tiger network will receive instant launch flags.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-brand-orange px-3.5 py-2.5 text-xs text-white uppercase placeholder-zinc-600 rounded-none tracking-widest font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-orange hover:bg-white text-black font-extrabold uppercase text-[10px] tracking-widest transition-colors duration-200"
                  >
                    ACTIVATE ALERTS
                  </button>
                </form>
              )}
            </div>

            {/* FIXTURE TRACKS PANEL */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <h3 className="font-sports text-xl tracking-wide text-white uppercase flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-orange" /> FIXTURES SCHEDULE
                </h3>
                <span className="text-[8px] font-mono text-zinc-500 uppercase">
                  SEASON 2026/2027
                </span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1" id="fixture-scroller-panel">
                {FIXTURES.map((fix) => (
                  <div
                    key={fix.id}
                    onClick={() => setActiveFixture(fix)}
                    className={`p-4 border rounded-sm cursor-pointer transition-all ${
                      activeFixture.id === fix.id
                        ? "bg-zinc-900 border-brand-orange shadow-[0_0_15px_rgba(255,106,0,0.1)]"
                        : "bg-black border-zinc-900/60 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[8px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded-sm border border-zinc-900 text-brand-gold">
                        {fix.sport}
                      </span>
                      <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase ${
                        fix.status === "live"
                          ? "bg-red-600 text-white animate-pulse"
                          : fix.status === "upcoming"
                          ? "bg-zinc-800 text-zinc-400"
                          : "bg-zinc-900 text-zinc-500"
                      }`}>
                        {fix.status.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wide text-white mb-2 font-mono">
                      {fix.title}
                    </h4>

                    {/* Competitors and scores row */}
                    <div className="text-xs text-zinc-400 space-y-1 font-mono">
                      {fix.competitors.map((c, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="uppercase text-[11px]">{c.name}</span>
                          {c.score && (
                            <span className="text-brand-orange font-bold font-mono">
                              {c.score}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-[9px] font-mono text-zinc-500 mt-2 text-right">
                      {fix.date} @ {fix.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* MULTI_PLATFORM SYNDICATION LINKS */}
        <div className="mb-12" id="live-syndication-channels">
          <MultiPlatformLinks />
        </div>

        {/* REPLAY ARCHIVE AND HIGHLIGHTS SECTION */}
        <div className="border-t border-zinc-900 pt-12 space-y-6" id="stream-archives">
          <StatsAndHighlights onWatchVideo={onWatchArchive} />
        </div>

      </div>
    </section>
  );
}
