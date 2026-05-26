import { Youtube, Tv, Play, Radio, Volume2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const CustomPodcastsIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.9V18c0-.55-.45-1-1-1s-1 .45-1 1v.1c-2.83-.48-5-2.94-5-5.9 0-3.31 2.69-6 6-6s6 2.69 6 6c0 2.96-2.17 5.42-5 5.9zM12 8c-2.21 0-4 1.79-4 4 0 1.86 1.28 3.41 3 3.86V12.1a1 1 0 1 1 2 0v3.76c1.72-.45 3-2 3-3.86 0-2.21-1.79-4-4-4z"/>
  </svg>
);

const CustomSpotifyIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.49 14.434c-.2.327-.63.432-.958.232-2.612-1.594-5.9-1.956-9.774-1.072-.37.086-.738-.153-.824-.523-.085-.371.153-.738.523-.824 4.24-.97 7.892-.553 10.8 1.226.33.201.433.63.233.96zm1.465-2.724c-.252.41-.785.542-1.192.292-2.99-1.838-7.545-2.37-11.077-1.3-1.42.433-2.905-.36-3.338-.767-.433-.408-.36-2.905.767-3.338C8.5 7.182 13.562 7.776 17 9.877c.412.251.543.784.293 1.192zm.126-2.82c-3.586-2.129-9.502-2.324-12.924-1.284-.55.166-1.127-.148-1.293-.698-.166-.549.148-1.127.698-1.292 3.931-1.193 10.473-.96 14.6 1.487.494.293.657.928.364 1.422-.293.494-.928.657-1.422.365z"/>
  </svg>
);

const CustomTwitchIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 1.714L1.714 6v15.429h5.143V24l4.286-4.286h3.428L22.286 12V1.714H6zm14.571 9.429l-3.428 3.428h-3.429l-3 3v-3H6.857V3.428h13.714v7.715z"/>
  </svg>
);

export default function MultiPlatformLinks() {
  const { t } = useLanguage();

  const platformChannels = [
    {
      name: "YouTube Live",
      desc: "Championship Matches & Documentaries",
      icon: <Youtube className="w-4 h-4 text-red-500" />,
      url: "https://www.youtube.com/@Humbletigerventures",
      color: "border-red-500/20 hover:border-red-500 shadow-red-500/10",
      pill: "LIVE BROADCAST",
      pillBg: "bg-red-500/10 text-red-500"
    },
    {
      name: "Twitch",
      desc: "Academy Showcase & Esports Streams",
      icon: <CustomTwitchIcon />,
      url: "https://www.twitch.tv",
      color: "border-purple-500/20 hover:border-purple-500 shadow-purple-500/10",
      pill: "LIVE STREAM",
      pillBg: "bg-purple-500/10 text-purple-400"
    },
    {
      name: "TikTok Live",
      desc: "Adrenaline Reels & Athlete Shorts",
      icon: <Radio className="w-4 h-4 text-lime-400" />,
      url: "https://www.tiktok.com/@humbletigerventures27?_r=1&_t=ZS-96gY6TgXIge",
      color: "border-zinc-500/20 hover:border-zinc-300 shadow-zinc-400/10",
      pill: "HIGHLIGHTS",
      pillBg: "bg-zinc-500/10 text-zinc-300"
    },
    {
      name: "Spotify",
      desc: "Tiger Radio Interview Podcasts",
      icon: <CustomSpotifyIcon />,
      url: "https://open.spotify.com",
      color: "border-emerald-500/20 hover:border-emerald-500 shadow-emerald-500/10",
      pill: "AUDIO CHATS",
      pillBg: "bg-emerald-500/10 text-emerald-400"
    },
    {
      name: "Apple Podcasts",
      desc: "Athlete Boardroom Strategy",
      icon: <CustomPodcastsIcon />,
      url: "https://podcasts.apple.com",
      color: "border-indigo-500/20 hover:border-indigo-500 shadow-indigo-500/10",
      pill: "ECOSYSTEM",
      pillBg: "bg-indigo-500/10 text-indigo-400"
    },
    {
      name: "Facebook Premium",
      desc: "Regional Cup Broadcast Carrier",
      icon: <Play className="w-4 h-4 text-blue-500" />,
      url: "https://www.facebook.com/profile.php?id=61554904394245",
      color: "border-blue-500/20 hover:border-blue-500 shadow-blue-500/10",
      pill: "COMMUNITY",
      pillBg: "bg-blue-500/10 text-blue-500"
    }
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-none relative overflow-hidden" id="multi-platform-integration-grid">
      {/* Skeleton border corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-orange/40"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-brand-orange/40"></div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-zinc-900 pb-5">
          <div>
            <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase block mb-1">
              HTV SYNDICATION NETWORK
            </span>
            <h3 className="font-sports text-xl sm:text-2xl text-white tracking-widest uppercase">
              {t("multilinksTitle")}
            </h3>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono bg-black px-3 py-1.5 border border-zinc-900">
            <Volume2 className="w-3.5 h-3.5 text-brand-orange animate-pulse" /> 1080P PRO COAXIAL SIGNAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformChannels.map((plat, idx) => (
            <a
              key={idx}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className={`p-4 bg-black border rounded-none flex flex-col justify-between hover:shadow-[0_0_15px_rgba(255,106,0,0.05)] transition-all duration-300 group ${plat.color}`}
            >
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <div className="p-2 bg-zinc-950 border border-zinc-900 rounded-sm text-white group-hover:bg-brand-orange group-hover:text-black group-hover:border-brand-orange transition-colors duration-300">
                    {plat.icon}
                  </div>
                  <span className={`text-[8px] font-mono px-2 py-0.5 rounded-[1px] font-bold ${plat.pillBg}`}>
                    {plat.pill}
                  </span>
                </div>

                <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest mb-1 group-hover:text-brand-orange transition-colors">
                  {plat.name}
                </h4>
                <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                  {plat.desc}
                </p>
              </div>

              <div className="flex justify-end pt-3 text-[9px] font-mono tracking-wider font-extrabold text-brand-orange uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Connect &rarr;
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
