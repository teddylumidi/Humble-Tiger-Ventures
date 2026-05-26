import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, X, Volume2, VolumeX, RotateCcw, Maximize, Minimize2, RefreshCw, Layers, Radio, Sparkles, Check, Flame, MessageSquare, Smile, Send } from "lucide-react";

const SUBTITLES = [
  { start: 0, end: 5, text: "[Stadium Ambience] Lagos Ultra 99 drums echo through Lagos Arena!" },
  { start: 5, end: 15, text: "Broadcaster: 'Welcome everyone! Lagos Tigers are in control from kick-off.'" },
  { start: 15, end: 28, text: "Broadcaster: 'Siya takes the wing. Absolute pace! Look at that acceleration!'" },
  { start: 28, end: 42, text: "Broadcaster: 'Okoro Runners in defensive alignment on the counter track.'" },
  { start: 42, end: 55, text: "Broadcaster: 'Coach Tariq signals a 4-3-3 high-press stance to seal the midfield.'" },
  { start: 55, end: 70, text: "[Crowd Cheers] 'T-I-G-E-R-S! Elite squad standard on absolute show!'" },
  { start: 70, end: 85, text: "Broadcaster: 'Telemetry results read 58% control footprint. Total domination.'" },
  { start: 85, end: 100, text: "Broadcaster: 'Referee signals clean offside layout. Setting up for the restart.'" },
  { start: 100, end: 115, text: "Broadcaster: 'East Rugby Academy squad watches from the VIP hospitality lounge!'" },
  { start: 115, end: 135, text: "[Rhythm Drums] Nigerian traditional beats supporting the athletic spirit!" },
  { start: 135, end: 155, text: "Broadcaster: 'Stunning commercial activation. Beautiful grassroots visual representation.'" },
  { start: 155, end: 175, text: "Broadcaster: 'Wolves basketball team delegation enters. Dual-sport solidarity!'" },
  { start: 175, end: 195, text: "Broadcaster: 'Speed sensor logs top dash at 34 km/h by the Lagos captain!'" },
  { start: 195, end: 215, text: "Broadcaster: 'Amazing sequence! Lagos Tigers lock down three crucial championship points.'" },
  { start: 215, end: 230, text: "Broadcaster: 'What a game! Lagos sports roster has proven their dominance once again.'" },
  { start: 230, end: 240, text: "[Outro Theme] Thank you for tuning in to HTV Cinematic Media. Over and out!" }
];

const REACTION_EMOJIS = ["🔥", "👑", "👏", "💯", "😮", "🐆"];

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  videoViews: string;
}

export default function VideoLightbox({
  isOpen,
  onClose,
  videoTitle,
  videoDuration,
  videoThumbnail,
  videoViews,
}: VideoLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(12); // start standard minutes/seconds
  const [resolution, setResolution] = useState<"Auto" | "1080p" | "2K" | "4K">("1080p");
  const [liveChat, setLiveChat] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: "TigerFans_254", text: "What a crazy sprint by Siya! 🐆", time: "10m ago" },
    { user: "Coach_Tariq", text: "Elite counter-attack layout. Excellent tactical footprint", time: "8m ago" },
    { user: "LagosUltra99", text: "HTV media standard is literally broadcast-grade", time: "5m ago" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<Array<{ id: number; emoji: string; left: number; size: number; rotate: number }>>([]);
  const [autoScroll, setAutoScroll] = useState(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const durationInSeconds = 240; // 4 minutes simulated

  // Progress Timer Simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationInSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  // Chat Auto-scroll implementation
  useEffect(() => {
    if (autoScroll && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [liveChat, autoScroll]);

  // Simulated live commentators adding to chatter to show auto-scroller working live
  useEffect(() => {
    if (!isPlaying || !isOpen) return;
    const simulatedComments = [
      { user: "HypeForce", text: "THAT DEFENSIVE SHIELD WAS MAJESTIC! 🤯" },
      { user: "Tunde_Webb", text: "Are you guys checking the live telemetry readings? ⚡" },
      { user: "Abuja_Legend", text: "OKORO ACADEMY NEVER COMPROMISES ON SPEED!" },
      { user: "Naija_Booster", text: "Incredible broadcast stability. HTV is king. 👑" },
      { user: "ChiChi_Russo", text: "Wait, isn't that Siya's signature counter strategy?" },
      { user: "Zack_Attack", text: "Simply top classic sport content!" },
    ];

    const commentInterval = setInterval(() => {
      const randomComment = simulatedComments[Math.floor(Math.random() * simulatedComments.length)];
      setLiveChat(prev => [
        ...prev,
        {
          user: randomComment.user,
          text: randomComment.text,
          time: "Just now"
        }
      ]);
    }, 7000);

    return () => clearInterval(commentInterval);
  }, [isPlaying, isOpen]);

  // Manage reaction cleanup timer
  useEffect(() => {
    if (floatingReactions.length > 0) {
      const timer = setTimeout(() => {
        setFloatingReactions(prev => {
          const cutoff = Date.now() - 2500;
          return prev.filter(r => r.id > cutoff);
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [floatingReactions]);

  if (!isOpen) return null;

  const progressPercent = (currentTime / durationInSeconds) * 100;

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const activeSubtitle = subtitlesEnabled 
    ? SUBTITLES.find(sub => currentTime >= sub.start && currentTime < sub.end)?.text 
    : null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setLiveChat((prev) => [
        ...prev,
        { user: "YOU (TIGER)", text: newComment.trim(), time: "Just now" },
      ]);
      setNewComment("");
    }
  };

  const triggerReaction = (emoji: string) => {
    const timestamp = Date.now();
    // generate 3 bubbling particles
    const newParticles = Array.from({ length: 3 }).map((_, i) => ({
      id: timestamp + Math.random() + i,
      emoji,
      left: 15 + Math.random() * 70, // percent width bounds
      size: 16 + Math.random() * 16, // px size multiplier
      rotate: -35 + Math.random() * 70 // degrees
    }));

    setFloatingReactions(prev => [...prev, ...newParticles]);

    // Send reaction event to stream chat
    setLiveChat(prev => [
      ...prev,
      { user: "YOU (TIGER)", text: `reacted with ${emoji}`, time: "Just now" }
    ]);
  };

  return (
    <div 
      className={
        isPip 
          ? "fixed bottom-4 right-4 w-[340px] xs:w-[380px] sm:w-[500px] z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.9)] border-2 border-brand-orange rounded-sm bg-zinc-950 flex flex-col justify-between overflow-hidden animate-scaleUp"
          : "fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
      } 
      id="video-lightbox-overlay"
    >
      {/* CSS KEYFRAMES FOR THE CHAT FLOATING REACTIONS */}
      <style>{`
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2) rotate(var(--rot));
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-180px) scale(0.9) rotate(calc(var(--rot) * 2));
            opacity: 0;
          }
        }
        .reaction-bubble {
          animation: bubbleFloat 2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>

      {/* GLOW ATMOSPHERE */}
      {!isPip && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      )}

      <div className={
        isPip 
          ? "w-full h-full flex flex-col justify-between relative"
          : "bg-zinc-950 border border-zinc-900 rounded-sm w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col justify-between relative shadow-2xl"
      }>
        {/* TOP SIGNAL STATUS */}
        <div className="bg-black/90 px-4 py-3 border-b border-zinc-900 flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
            </span>
            <span className="text-zinc-300 font-bold uppercase tracking-widest flex items-center gap-1">
              HTV {isPip ? "PICTURE-IN-PICTURE" : "CINEMATIC PLAYER"} <span className="text-[10px] text-zinc-500 font-normal">v4.2</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            {!isPip && (
              <span className="hidden sm:inline bg-zinc-900/80 px-2 py-0.5 rounded-sm border border-zinc-800 text-brand-gold font-bold">
                {resolution} STREAM
              </span>
            )}
            
            {/* IN-APP PICTURE-IN-PICTURE TOGGLER */}
            <button
              onClick={() => setIsPip(!isPip)}
              className="text-zinc-400 hover:text-brand-orange transition-colors p-1 flex items-center gap-1"
              title={isPip ? "Restore to Full Screen" : "Minimize to Corner Picture-in-Picture"}
              id="lightbox-toggle-pip"
            >
              {isPip ? <Maximize className="w-4 h-4 text-white" /> : <Layers className="w-4 h-4 text-white" />}
            </button>

            <button
              onClick={onClose}
              className="text-white hover:text-brand-orange transition-colors p-1"
              id="lightbox-close-header"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTAINER WORKPLACE: PLAYER + LIVE CHAT FEED */}
        <div className={`grid ${isPip ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"} gap-0 flex-grow overflow-y-auto`}>
          {/* PLAYER LEFT SIDE */}
          <div className={`${isPip ? "w-full" : "lg:col-span-8"} bg-black flex flex-col justify-between relative aspect-video ${isPip ? "" : "lg:aspect-auto lg:h-[65vh]"} overflow-hidden`}>
            {/* SCREEN CANVAS WORKPLACE */}
            <div className="relative flex-grow flex items-center justify-center bg-zinc-950">
              {/* Thumbnail / Ambient */}
              <img
                src={videoThumbnail}
                alt="Simulated Stream"
                className={`absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs selection:bg-transparent ${isPlaying ? "animate-pulse" : ""}`}
                referrerPolicy="no-referrer"
              />

              {/* Holographic Signal Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none" />

              {/* Dynamic Subtitles Overlay */}
              {activeSubtitle && (
                <div className="absolute bottom-6 left-4 right-4 z-[25] text-center pointer-events-none select-none">
                  <span className="inline-block bg-black/90 text-white border border-zinc-800 px-3.5 py-1.5 rounded-sm font-sans text-[10px] sm:text-xs tracking-wide leading-snug max-w-[85%] shadow-2xl">
                    {activeSubtitle}
                  </span>
                </div>
              )}

              {/* Floating Chat Reactions Interactive Layer */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
                {floatingReactions.map((reac) => (
                  <div
                    key={reac.id}
                    className="absolute bottom-4 reaction-bubble text-center flex flex-col items-center"
                    style={{
                      left: `${reac.left}%`,
                      fontSize: `${reac.size}px`,
                      "--rot": `${reac.rotate}deg`,
                    } as React.CSSProperties}
                  >
                    {reac.emoji}
                  </div>
                ))}
              </div>

              {/* Main Dynamic Graphic Center */}
              <div className="relative z-20 text-center px-4 space-y-4">
                {isPlaying ? (
                  <div className="inline-flex flex-col items-center">
                    {/* Visualizer Sound Waves */}
                    <div className="flex items-end gap-1.5 h-12 mb-3">
                      <div className="w-1.5 h-6 bg-brand-orange animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-10 bg-brand-gold animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                      <div className="w-1.5 h-8 bg-white animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1.5 h-11 bg-brand-orange animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      <div className="w-1.5 h-5 bg-brand-gold animate-bounce" style={{ animationDelay: "0.5s" }}></div>
                    </div>
                    {!isPip && (
                      <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase bg-black/80 px-4 py-1.5 border border-brand-gold/30 rounded-sm">
                        CI-FEED SIMULATOR PLAYING ACTIVE
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-orange hover:bg-white text-black flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1.5" />
                  </button>
                )}

                {!isPip && (
                  <div className="max-w-md mx-auto">
                    <h4 className="font-sports text-xl sm:text-2xl tracking-widest text-white uppercase leading-tight line-clamp-2">
                      {videoTitle}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-1 font-mono uppercase">
                      VIEWS: {videoViews} • STAGE TIME: {formatTime(currentTime)} / {formatTime(durationInSeconds)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* LOWER INTERACTIVE PLAYER CONTROL PANEL */}
            <div className="bg-zinc-950/95 border-t border-zinc-900 px-4 py-3 z-20">
              {/* TIMELINE SCRUBBER */}
              <div className="relative w-full h-1 bg-zinc-800 rounded-full mb-3 cursor-pointer group">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progressPercent}%`, transform: `translate(-50%, -50%)` }}
                />
              </div>

              {/* TIMELINE LABELS */}
              <div className="flex justify-between items-center">
                {/* Play Buttons / Action Line */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 px-1.5 border border-zinc-800 rounded-sm bg-black/40 hover:text-brand-orange hover:border-brand-orange transition-all"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-1 px-1.5 border border-zinc-800 rounded-sm bg-black/40 hover:text-brand-orange hover:border-brand-orange text-zinc-400 hover:text-white transition-all"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>

                  <div className="text-[10px] font-mono text-zinc-400">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span> / <span>{formatTime(durationInSeconds)}</span>
                  </div>
                </div>

                {/* Sound Controls / Track resolution */}
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* CLOSED CAPTION CC TOGGLE */}
                  <button
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                    className={`p-1 flex items-center gap-1 text-[9px] font-mono border rounded-sm px-1.5 transition-colors ${
                      subtitlesEnabled 
                        ? "border-brand-orange bg-brand-orange/15 text-brand-orange" 
                        : "border-zinc-850 bg-black/40 text-zinc-500 hover:text-zinc-300"
                    }`}
                    title={subtitlesEnabled ? "Disable Captions" : "Enable Captions"}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>CC</span>
                  </button>

                  {/* Resolution Selector - hide under Pip */}
                  {!isPip && (
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Res:</span>
                      <select
                        value={resolution}
                        onChange={(e: any) => setResolution(e.target.value)}
                        className="bg-black text-[9px] font-mono text-zinc-300 border border-zinc-800 px-1 py-0.5 rounded-sm outline-none focus:border-brand-orange"
                      >
                        <option value="Auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="2K">2K</option>
                        <option value="4K">4K</option>
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {!isPip && (
                    <span className="text-[9px] font-mono text-brand-gold/80 flex items-center gap-1 bg-brand-gold/5 px-2 py-0.5 rounded-sm border border-brand-gold/10">
                      <Radio className="w-3 h-3" /> HQ AUDIO
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CHAT/LOG PANEL ENVELOPE (RIGHT SIDE) - HIDE UNDER PIP */}
          {!isPip && (
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-zinc-900 flex flex-col justify-between bg-zinc-950/40">
              {/* PANEL HEAD */}
              <div className="bg-black/40 p-3 px-4 border-b border-zinc-900 flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase font-black">
                  FAN CHAT & PRESS BULLETIN
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.5 border border-zinc-800 flex items-center gap-1">
                    <input 
                      type="checkbox" 
                      id="lightbox-autoscroll-toggle" 
                      checked={autoScroll} 
                      onChange={(e) => setAutoScroll(e.target.checked)}
                      className="accent-brand-orange w-2.5 h-2.5 cursor-pointer"
                    />
                    <label htmlFor="lightbox-autoscroll-toggle" className="cursor-pointer">SCROLL</label>
                  </span>
                  <span className="text-[8px] font-mono bg-brand-orange/15 text-brand-orange px-2 py-0.5 rounded-sm border border-brand-orange/20">
                    124 ONLINE
                  </span>
                </div>
              </div>

              {/* MESSAGE CHATTER BOX */}
              <div 
                ref={chatContainerRef}
                className="p-4 space-y-3.5 flex-grow overflow-y-auto max-h-[30vh] lg:max-h-[50vh] scrollbar-thin scrollbar-thumb-zinc-800"
              >
                {liveChat.map((msg, i) => (
                  <div key={i} className="space-y-1 text-xs border-b border-zinc-900/40 pb-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className={`font-bold uppercase tracking-wide ${msg.user.startsWith("YOU") ? "text-brand-orange" : "text-brand-gold"}`}>
                        {msg.user}
                      </span>
                      <span className="text-zinc-650 text-[8px]">{msg.time}</span>
                    </div>
                    <p className="text-zinc-300 font-sans tracking-wide leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* QUICK INSTANT CHAT REACTION HOTROW */}
              <div className="bg-zinc-900/40 p-2.5 border-t border-zinc-900/80 flex items-center justify-between gap-1">
                <span className="text-[8px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                  <Smile className="w-3 h-3 text-brand-orange" /> INTENT:
                </span>
                <div className="flex gap-1.5">
                  {REACTION_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => triggerReaction(emoji)}
                      className="text-xs hover:scale-130 transition-transform px-1.5 py-1 bg-black/60 hover:bg-zinc-850 border border-zinc-850 rounded-sm hover:border-zinc-700/80"
                      title={`Shoot ${emoji} reaction`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEND BULLETIN SECTOR */}
              <form onSubmit={handleSendComment} className="p-3 border-t border-zinc-900 bg-black/60 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="CONVERT TO CHAT..."
                  className="flex-grow bg-zinc-950 border border-zinc-850 px-3 py-2 text-xs text-white rounded-none placeholder-zinc-700 outline-none focus:border-brand-orange font-sans animate-fadeIn"
                />
                <button
                  type="submit"
                  className="bg-brand-orange text-black font-extrabold uppercase px-3 py-2 text-[10px] tracking-widest hover:bg-white transition-colors flex items-center gap-1"
                  id="lightbox-submit-comment"
                >
                  <Send className="w-3 h-3" />
                  <span>SEND</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* BOTTOM METADATA BAR */}
        {!isPip && (
          <div className="border-t border-zinc-900 bg-black/95 p-3.5 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-zinc-500 font-sans gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2026 HUMBLE TIGER VENTURES INTERACTIVE SYSTEMS</span>
              <span>•</span>
              <span className="text-zinc-400">HIGH FIDELITY BROADCAST ENGINES</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1 border border-zinc-800 hover:border-brand-orange text-zinc-300 hover:text-white uppercase font-mono text-[9px] tracking-widest transition-colors"
              id="lightbox-close-footer"
            >
              DISCONNECT SCREEN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
