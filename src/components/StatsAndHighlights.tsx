import { useState, useMemo } from "react";
import { Play, TrendingUp, Award, Zap, Users, Share2, Search, Dumbbell, ShieldCheck, HelpCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface HighlightItem {
  id: string;
  title: string;
  sport: "Football" | "Rugby" | "Athletics" | "Basketball";
  duration: string;
  views: string;
  date: string;
  thumbnail: string;
  videoUrl?: string;
  shares: number;
}

interface TeamStat {
  name: string;
  base: string;
  sport: string;
  played: number;
  winRate: number;
  goalsFor: number;
  cleanSheets: number;
  sponsorsSecured: number;
  logoColor: string;
  lineup: string[];
  form: ("W" | "D" | "L")[];
  goalsLastFive: number[];
}

interface MVPNominee {
  id: string;
  name: string;
  sport: string;
  team: string;
  votes: number;
  highlight: string;
  avatar: string;
}

export default function StatsAndHighlights({ 
  onWatchVideo 
}: { 
  onWatchVideo?: (title: string, duration: string, thumbnail: string, views: string) => void 
}) {
  const { lang, t } = useLanguage();
  const [selectedSport, setSelectedSport] = useState<string>("ALL");
  const [highlightSearch, setHighlightSearch] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("Lagos Tigers FC");
  const [compareTeam, setCompareTeam] = useState<string>("Dakar Stars FC");
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [simloading, setSimLoading] = useState<boolean>(false);

  // Match MVPs Nomination state
  const [mvps, setMvps] = useState<MVPNominee[]>([
    {
      id: "mvp-1",
      name: "Chidimma Okoro",
      sport: "Athletics",
      team: "Nairobi Academy",
      votes: 382,
      highlight: "Shattered East Africa 100m sprint record at 11.02s",
      avatar: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "mvp-2",
      name: "Kunle Olawale",
      sport: "Football",
      team: "Lagos Tigers FC",
      votes: 312,
      highlight: "Scored consecutive perfect hat-tricks in youth tournament finals",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "mvp-3",
      name: "Mamadou Diop",
      sport: "Football",
      team: "Dakar Stars FC",
      votes: 219,
      highlight: "Coordinated 14 critical assists and 8 goals in championship run",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "mvp-4",
      name: "Faith Smit",
      sport: "Rugby",
      team: "Pretoria College",
      votes: 278,
      highlight: "Awarded most prolific tackle records of Pretoria High varsity",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    }
  ]);
  const [votedId, setVotedId] = useState<string | null>(null);

  // Match highlights data structure
  const [highlights, setHighlights] = useState<HighlightItem[]>([
    {
      id: "hl-1",
      title: "Lagos Tigers FC vs Dakar Stars - Insane 90th Min Overhead Match Winner",
      sport: "Football",
      duration: "03:45",
      views: "24.5K views",
      date: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600",
      shares: 142
    },
    {
      id: "hl-2",
      title: "Chidimma Okoro 100m Dash - Record Shattering 11.02s Sprint",
      sport: "Athletics",
      duration: "01:20",
      views: "88.2K views",
      date: "5 days ago",
      thumbnail: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600",
      shares: 419
    },
    {
      id: "hl-3",
      title: "Pretoria College vs Nairobi Academy - Incredible Triple Tackle & Try",
      sport: "Rugby",
      duration: "05:12",
      views: "15.9K views",
      date: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=600",
      shares: 98
    },
    {
      id: "hl-4",
      title: "Lagos Wolves vs Accra Giants - Final Quarter Buzz Beater 3-Pointer Slam",
      sport: "Basketball",
      duration: "02:30",
      views: "42.1K views",
      date: "Last week",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600",
      shares: 231
    },
    {
      id: "hl-5",
      title: "Nairobi Academy Athletic Drill Finals - High Jump Flawless Execution",
      sport: "Athletics",
      duration: "02:15",
      views: "9.2K views",
      date: "2 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
      shares: 55
    },
    {
      id: "hl-6",
      title: "Sahel United tactical build up and quick pass attack routines",
      sport: "Football",
      duration: "04:10",
      views: "18.4K views",
      date: "3 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
      shares: 88
    }
  ]);

  // Dynamic team statistics list
  const teamStats: Record<string, TeamStat> = {
    "Lagos Tigers FC": {
      name: "Lagos Tigers FC",
      base: "Lagos, Nigeria",
      sport: "Football / Academy",
      played: 28,
      winRate: 82,
      goalsFor: 74,
      cleanSheets: 14,
      sponsorsSecured: 5,
      logoColor: "text-brand-orange border-brand-orange/40 bg-brand-orange/10",
      lineup: ["Kunle O.", "Sani Y.", "Tunde A.", "Chidi M.", "Victor E."],
      form: ["W", "W", "D", "W", "W"],
      goalsLastFive: [3, 2, 1, 4, 2]
    },
    "Dakar Stars FC": {
      name: "Dakar Stars FC",
      base: "Dakar, Senegal",
      sport: "Football / Academy",
      played: 26,
      winRate: 76,
      goalsFor: 62,
      cleanSheets: 11,
      sponsorsSecured: 4,
      logoColor: "text-brand-gold border-brand-gold/40 bg-brand-gold/10",
      lineup: ["Mamadou D.", "Omar S.", "Gueye P.", "Idrissa S.", "Diallo C."],
      form: ["L", "W", "W", "D", "W"],
      goalsLastFive: [1, 3, 2, 1, 4]
    },
    "Nairobi Academy": {
      name: "Nairobi Academy",
      base: "Nairobi, Kenya",
      sport: "Athletics & Rugby Club",
      played: 24,
      winRate: 70,
      goalsFor: 44,
      cleanSheets: 8,
      sponsorsSecured: 3,
      logoColor: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
      lineup: ["Faith K.", "Jared O.", "Mwangi J.", "Kipkorir D.", "Amina W."],
      form: ["W", "D", "W", "L", "W"],
      goalsLastFive: [2, 1, 3, 0, 2]
    },
    "Pretoria College": {
      name: "Pretoria College",
      base: "Pretoria, South Africa",
      sport: "Rugby Varsity",
      played: 30,
      winRate: 80,
      goalsFor: 88,
      cleanSheets: 15,
      sponsorsSecured: 6,
      logoColor: "text-blue-500 border-blue-500/40 bg-blue-500/10",
      lineup: ["Smit L.", "Botha J.", "Muller Z.", "Khumalo A.", "Ndlovu S."],
      form: ["W", "W", "W", "W", "D"],
      goalsLastFive: [4, 5, 3, 2, 2]
    },
    "Lagos Wolves": {
      name: "Lagos Wolves",
      base: "Lagos, Nigeria",
      sport: "Basketball Pro",
      played: 32,
      winRate: 88,
      goalsFor: 104,
      cleanSheets: 19,
      sponsorsSecured: 7,
      logoColor: "text-yellow-500 border-yellow-500/40 bg-yellow-500/10",
      lineup: ["Olu W.", "Balogun T.", "Eze F.", "Olatunji K.", "Ibrahim S."],
      form: ["W", "L", "W", "W", "W"],
      goalsLastFive: [5, 3, 4, 4, 3]
    }
  };

  const sportsFilterList = ["ALL", "Football", "Rugby", "Athletics", "Basketball"];

  // Filter highlights list based on select tabs and Search keyword
  const filteredHighlights = useMemo(() => {
    return highlights.filter((hl) => {
      const matchSport = selectedSport === "ALL" || hl.sport === selectedSport;
      const matchSearch = hl.title.toLowerCase().includes(highlightSearch.toLowerCase()) || 
                          hl.sport.toLowerCase().includes(highlightSearch.toLowerCase());
      return matchSport && matchSearch;
    });
  }, [highlights, selectedSport, highlightSearch]);

  // Handle WhatsApp Share Link
  const handleWhatsAppShare = (title: string, id: string) => {
    // Increment local share value for dynamic visual simulation
    setHighlights(prev => 
      prev.map(h => h.id === id ? { ...h, shares: h.shares + 1 } : h)
    );

    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(
      `🔥 HTV MATCH HIGHLIGHTS: "${title}"\nWatch elite youth athletics, tactical reviews and sponsorships live with Humble Tiger Ventures Nairobi!\nCheck out now: ${shareUrl}`
    );

    const fullWaLink = `https://wa.me/?text=${shareText}`;
    window.open(fullWaLink, "_blank", "noopener,noreferrer");
  };

  // Simulate team matchups
  const performMatchSimulation = () => {
    if (selectedTeam === compareTeam) {
      setSimulationResult(lang === "en" ? "Cannot simulate a team against itself!" : "You no fit play game against yourself o!");
      return;
    }

    setSimLoading(true);
    setSimulationResult(null);

    setTimeout(() => {
      const teamA = teamStats[selectedTeam];
      const teamB = teamStats[compareTeam];

      // Calculate relative strength based on winRate + sponsors
      const powerA = teamA.winRate + (teamA.sponsorsSecured * 3) + Math.floor(Math.random() * 20);
      const powerB = teamB.winRate + (teamB.sponsorsSecured * 3) + Math.floor(Math.random() * 20);

      let winner = "";
      let scoreA = 0;
      let scoreB = 0;

      if (powerA > powerB) {
        winner = teamA.name;
        scoreA = Math.floor(Math.random() * 3) + 2;
        scoreB = Math.floor(Math.random() * scoreA);
      } else {
        winner = teamB.name;
        scoreB = Math.floor(Math.random() * 3) + 2;
        scoreA = Math.floor(Math.random() * scoreB);
      }

      const isFootball = teamA.sport.includes("Football") || teamB.sport.includes("Football");
      const unit = isFootball ? "Goals" : "Points";

      const localWinMsg = lang === "en" 
        ? `🔥 SIMULATION COMPLETE: ${winner} defeats the opponent with a score of ${scoreA} - ${scoreB}! Overwhelming technical strength verified under athletic analytics metrics.`
        : `🔥 USIMULIZI UMEKAMILIKA: ${winner} anaibuka mshindi na kurekodisha alama ya ${scoreA} - ${scoreB}! Viwango vyetu vya juu vya uchambuzi wa kimichezo vimethibitishwa.`;

      setSimulationResult(localWinMsg);
      setSimLoading(false);
    }, 1500);
  };

  const activeTeamData = teamStats[selectedTeam] || teamStats["Lagos Tigers FC"];

  return (
    <div className="space-y-16" id="stats-and-highlights-master">
      
      {/* SECTION SECTION 1: MATCH HIGHLIGHT REEL WITH SEARCH BAR */}
      <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-none relative overflow-hidden" id="match-highlights-section">
        {/* Skeleton lines decor */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-orange/40"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-orange/40"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-orange/40"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-orange/40"></div>

        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-zinc-900 pb-6">
            <div>
              <span className="text-[10px] font-mono text-brand-orange font-black tracking-widest uppercase block mb-1">
                ADRENALINE STREAMING
              </span>
              <h3 className="font-sports text-2xl sm:text-3xl text-white tracking-widest uppercase">
                {lang === "en" ? "HOT PLAYBACK HIGHLIGHTS" : "CORRECT MATCH ACTION HIGHLIGHTS"}
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-1 uppercase tracking-wider">
                Watch raw athletics prowess captured under high-production media formats
              </p>
            </div>

            {/* SEACH BAR & FILTERS ROW */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Perfect Search Input */}
              <div className="relative flex-1 sm:w-64 max-w-sm">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  placeholder={lang === "en" ? "SEARCH HIGHLIGHTS..." : "FIND MATCH RUNS..."}
                  value={highlightSearch}
                  onChange={(e) => setHighlightSearch(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-[10px] tracking-widest text-white placeholder-zinc-700 font-mono pl-10 pr-3 py-2.5 rounded-none focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 uppercase"
                />
              </div>

              {/* Mini filters dropdown/tabs */}
              <div className="flex flex-wrap gap-1 bg-black/50 border border-zinc-900 p-1">
                {sportsFilterList.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider font-extrabold ${
                      selectedSport === sport
                        ? "bg-brand-orange text-black"
                        : "text-zinc-500 hover:text-white transition-colors"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Cards Grid */}
          {filteredHighlights.length === 0 ? (
            <div className="text-center py-16 bg-black border border-zinc-900/40">
              <Dumbbell className="w-10 h-10 text-zinc-700 mx-auto mb-3 animate-spin" />
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                No high-adrenaline clip matching current coordinate keys
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHighlights.map((hl) => (
                <div
                  key={hl.id}
                  className="bg-black/80 border border-zinc-900 hover:border-brand-orange/50 transition-all duration-300 rounded-none flex flex-col justify-between group shadow-lg"
                >
                  {/* Photo area with overlays */}
                  <div className="h-44 bg-zinc-950 relative overflow-hidden">
                    <img
                      src={hl.thumbnail}
                      alt={hl.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient blur */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent"></div>

                    {/* Time indicator pill */}
                    <span className="absolute bottom-2.5 right-2.5 bg-black/95 text-white text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-none border border-zinc-900/60 shadow-md">
                      {hl.duration}
                    </span>

                    {/* Category indicator */}
                    <span className="absolute top-2.5 left-2.5 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest leading-none">
                      {hl.sport}
                    </span>

                    {/* Central video play trigger overlay */}
                    <div 
                      onClick={() => onWatchVideo?.(hl.title, hl.duration, hl.thumbnail, hl.views)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-black shadow-lg hover:scale-105 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Highlight core text body */}
                  <div className="p-4 space-y-3">
                    <h4 className="text-[11px] font-mono leading-relaxed text-white group-hover:text-brand-orange uppercase font-bold tracking-wide transition-colors line-clamp-2 min-h-[32px]">
                      {hl.title}
                    </h4>

                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-3">
                      <span>{hl.views}</span>
                      <span>{hl.date}</span>
                    </div>
                  </div>

                  {/* Foot action lines with WhatsApp Sharing */}
                  <div className="px-4 pb-4 pt-2.5 border-t border-zinc-900/40 flex justify-between items-center bg-zinc-950/40">
                    <button
                      onClick={() => onWatchVideo?.(hl.title, hl.duration, hl.thumbnail, hl.views)}
                      className="text-[9px] font-mono font-black text-brand-gold uppercase tracking-wider hover:underline"
                    >
                      [ Watch Clip ]
                    </button>

                    {/* WhatsApp share buttons */}
                    <button
                      onClick={() => handleWhatsAppShare(hl.title, hl.id)}
                      className="inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-wider bg-black px-2.5 py-1.5 border border-zinc-900 hover:border-emerald-500 transition-all duration-300 hover:text-white"
                      title="Share to WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Share ({hl.shares})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION SECTION 1.5: MATCH MVP & PERFORMANCE VOTING HUB */}
      <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-none relative overflow-hidden" id="mvp-voting-hub-section">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-orange/45"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-orange/45"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-orange/45"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-orange/45"></div>

        <div className="space-y-6">
          <div className="border-b border-zinc-900 pb-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <span className="text-[10px] font-mono text-brand-orange font-black tracking-widest uppercase block mb-1">
                {lang === "en" ? "NOMINATE THE BEST PERFORMER" : "PIGIA KURA MCHEZAJI BORA"}
              </span>
              <h3 className="font-sports text-2xl sm:text-3xl text-white tracking-widest uppercase">
                {lang === "en" ? "HTV ACTIVE MVP VOTING HUB" : "KURA ZA MVP MTANDAO WA TIGER"}
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans mt-1 uppercase tracking-wider">
                {lang === "en" ? "Cast your ballot to highlight outstanding youth athletic feats this week" : "Piga kura yako kumwangazia mwanamichezo aliyetupa viwango vya kileleni wiki hii"}
              </p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 font-mono text-[9px] tracking-widest text-[#25D366] font-extrabold uppercase shrink-0">
              ● {lang === "en" ? "AUDITED BY HTV PRESS BOARD" : "IDHINISHWA NA BODI YA TIGER"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mvps.map((nominee) => {
              const totalVotes = mvps.reduce((acc, m) => acc + m.votes, 0);
              const pct = totalVotes ? Math.round((nominee.votes / totalVotes) * 100) : 0;
              const isVoted = votedId === nominee.id;

              return (
                <div 
                  key={nominee.id}
                  className={`bg-black border transition-all duration-300 p-4.5 flex flex-col justify-between group rounded-none ${
                    isVoted 
                      ? "border-brand-orange shadow-[0_0_15px_rgba(255,106,0,0.15)] bg-brand-orange/5" 
                      : "border-zinc-900 hover:border-zinc-700"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Athlete photo & name meta */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-zinc-800 bg-zinc-90 w-11 h-11 shrink-0 relative">
                        <img 
                          src={nominee.avatar} 
                          alt={nominee.name}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wide">
                          {nominee.name}
                        </h4>
                        <span className="text-[8px] font-mono text-brand-gold uppercase tracking-widest font-black leading-none block">
                          {nominee.sport} • {nominee.team.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Highlight text description */}
                    <div className="text-[10px] text-zinc-400 font-sans leading-relaxed min-h-[36px] border-t border-zinc-900 pb-2.5 pt-2.5 bg-zinc-950/40 px-2.5 py-2 uppercase tracking-wide">
                      &ldquo;{nominee.highlight}&rdquo;
                    </div>

                    {/* Community votes progress metrics */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-zinc-500 uppercase">{lang === "en" ? "COMMUNITY VOTE" : "KURA YA JAMII"}</span>
                        <span className="text-white font-extrabold">{nominee.votes} ({pct}%)</span>
                      </div>
                      <div className="h-1 bg-zinc-900 overflow-hidden rounded-none relative">
                        <div 
                          style={{ width: `${pct}%` }}
                          className={`h-full transition-all duration-500 ${isVoted ? "bg-brand-orange" : "bg-zinc-650"}`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Vote button CTA actions */}
                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        if (votedId) return;
                        setMvps(prev => 
                          prev.map(m => m.id === nominee.id ? { ...m, votes: m.votes + 1 } : m)
                        );
                        setVotedId(nominee.id);
                      }}
                      disabled={votedId !== null}
                      className={`flex-1 py-2 text-[9px] font-mono font-black uppercase tracking-widest text-center transition-all ${
                        isVoted 
                          ? "bg-brand-orange text-black font-extrabold cursor-default" 
                          : votedId !== null
                          ? "bg-zinc-950 border border-zinc-900 text-zinc-700 cursor-not-allowed"
                          : "bg-zinc-900 hover:bg-white text-zinc-350 hover:text-black border border-zinc-805"
                      }`}
                    >
                      {isVoted ? "✓ VOTED" : votedId !== null ? "LOCKED" : "VOTE NOW"}
                    </button>

                    {/* WhatsApp dynamic candidate vote state share */}
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(`🔥 EXCITING SPECTACLE: VOTE FOR MVP on HTV!\n\nI nominated ${nominee.name} for the active Match MVP under Humble Tiger Ventures! ${nominee.highlight}.\nGive your support and join our network here: ${window.location.href}`);
                        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
                      }}
                      className="p-2 border border-zinc-800 hover:border-[#25D366] text-zinc-500 hover:text-[#25D366] transition-colors"
                      title="Share Nominee Vote Status"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION SECTION 2: DYNAMIC TEAM STATS ENGINE */}
      <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-none relative" id="team-stats-pane">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 6 COLS: DYNAMIC PERFORMANCE CARD */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-brand-orange font-black tracking-widest uppercase block mb-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-brand-orange animate-bounce" /> SQUAD POWER RANKINGS
              </span>
              <h3 className="font-sports text-2xl sm:text-3xl text-white tracking-widest uppercase">
                {lang === "en" ? "DYNAMIC PERFORMANCE MATRIX" : "INTERACTIVE TEAM METRIC SYSTEM"}
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">
                Select high school & academy teams to fetch verified performance registries instantly
              </p>
            </div>

            {/* TEAM SQUAD GRID PICKER */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="stat-team-selectors">
              {Object.keys(teamStats).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedTeam(name)}
                  className={`px-2 py-3.5 border text-center transition-all ${
                    selectedTeam === name
                      ? "bg-brand-orange/10 border-brand-orange text-white font-mono font-black shadow-md shadow-brand-orange/5"
                      : "bg-black border-zinc-900 text-zinc-500 hover:text-zinc-200 hover:border-zinc-800"
                  }`}
                >
                  <div className="text-[10px] tracking-wider uppercase truncate leading-none mb-1">
                    {name.split(" ")[0]}
                  </div>
                  <div className="text-[7.5px] font-mono tracking-widest text-zinc-600 block leading-none">
                    {teamStats[name].base.split(",")[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* METRICS DASHBOARD CONTAINER */}
            <div className="bg-black border border-zinc-900 p-5 rounded-none space-y-5" id="metric-dynamic-displays">
              {/* Squad Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-900 pb-4">
                <div>
                  <h4 className="text-sm font-mono font-extrabold uppercase tracking-wide text-white">
                    {activeTeamData.name}
                  </h4>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">
                    Affiliation: {activeTeamData.sport} • Based in {activeTeamData.base}
                  </p>
                </div>
                <span className={`inline-block border px-2.5 py-1 text-[8.5px] font-mono uppercase font-black tracking-widest ${activeTeamData.logoColor}`}>
                  ★ TOP LEVEL {activeTeamData.winRate >= 80 ? "SQUAD" : "ACADEMY"}
                </span>
              </div>

              {/* Graphical Bars */}
              <div className="space-y-4">
                {[
                  { label: "Matches Played", val: activeTeamData.played, max: 40, color: "bg-zinc-300" },
                  { label: "Win Ratio Output", val: activeTeamData.winRate, suffix: "%", max: 100, color: "bg-brand-orange" },
                  { label: "Total Season Goals / Pts", val: activeTeamData.goalsFor, max: 120, color: "bg-zinc-100" },
                  { label: "Clean Sheets recorded", val: activeTeamData.cleanSheets, max: 25, color: "bg-brand-gold" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                      <span className="uppercase">{stat.label}</span>
                      <span className="font-extrabold text-white">
                        {stat.val}{stat.suffix || ""} 
                        <span className="text-zinc-700 font-normal"> / {stat.max}</span>
                      </span>
                    </div>
                    {/* Progress Track Animation and Design */}
                    <div className="h-[4px] bg-zinc-900/60 border border-zinc-950 rounded-none relative overflow-hidden">
                      <div 
                        style={{ width: `${(stat.val / stat.max) * 100}%` }}
                        className={`h-full ${stat.color} transition-all duration-700 ease-in-out`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* STAT TRENDS DISCOVERER BLOCK */}
              <div className="border-t border-zinc-900 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black tracking-widest text-zinc-500 uppercase">
                    {lang === "en" ? "STAT TRENDS & STREAK" : "MWELEKEO WA STATS NA FOMU"}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-extrabold flex items-center gap-1 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> +{(activeTeamData.winRate * 1.15).toFixed(1)} INDEX Trend
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Form Streak pill list */}
                  <div className="bg-zinc-950 p-3.5 border border-zinc-900/60 rounded-none space-y-2">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase block font-bold">
                      {lang === "en" ? "RECENT STREAK (FORM)" : "FOMU YA MECHI 5"}
                    </span>
                    <div className="flex gap-1.5 items-center">
                      {activeTeamData.form.map((res, idx) => (
                        <span
                          key={idx}
                          className={`w-5 h-5 flex items-center justify-center font-mono font-black text-[9px] transition-transform duration-300 hover:scale-110 cursor-help ${
                            res === "W"
                              ? "bg-emerald-600/20 border border-emerald-500 text-emerald-400"
                              : res === "D"
                              ? "bg-zinc-800/20 border border-zinc-700 text-zinc-400"
                              : "bg-red-600/20 border border-red-500 text-red-400"
                          }`}
                          title={res === "W" ? "Win" : res === "D" ? "Draw" : "Loss"}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Goals Last Five Spark-Bar representation */}
                  <div className="bg-zinc-950 p-3.5 border border-zinc-900/60 rounded-none space-y-2 flex flex-col justify-between">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase block font-bold leading-none">
                      {lang === "en" ? "SCORING PROGRESSION" : "MWELEKEO WA MABAO"}
                    </span>
                    <div className="flex items-end gap-2 h-7 pt-1">
                      {activeTeamData.goalsLastFive.map((g, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                          <span className="text-[7px] font-mono text-zinc-400 font-bold leading-none">{g}</span>
                          <div
                            style={{ height: `${(g / 5) * 16}px` }}
                            className="w-full bg-brand-orange hover:bg-white transition-all duration-300 hover:scale-x-105 cursor-pointer"
                            title={`Match -${5 - idx}: ${g} goals`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Roster lineup output */}
              <div className="bg-zinc-950 border border-zinc-900/80 p-3.5 rounded-none">
                <span className="text-[8px] font-mono font-semibold tracking-widest text-zinc-500 uppercase block mb-2">
                  HTV REGISTERED ATHLETE SQUAD LINEUP
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTeamData.lineup.map((player, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1"
                    >
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> {player}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: INTERACTIVE TEAM MATCHUP SIMULATOR */}
          <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-900 p-6 rounded-none flex flex-col justify-between" id="matchup-simulator-terminal">
            <div className="space-y-6">
              <div className="border-b border-zinc-900 pb-4">
                <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase block mb-1 font-bold">
                  HTV ANALYTICS TERMINAL
                </span>
                <h4 className="font-sports text-xl tracking-wide text-white uppercase">
                  {lang === "en" ? "TACTICAL MATCH SIMULATOR" : "TACTICAL SIMULATOR SHELL"}
                </h4>
                <p className="text-[10px] text-zinc-500 font-sans mt-1">
                  Cross-reference real team metrics to execute instant simulated match projections.
                </p>
              </div>

              {/* Selector 1 */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase font-bold block">
                    HOME FIELD REPRESENTATIVE
                  </label>
                  <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-brand-orange px-3.5 py-2.5 text-xs text-brand-orange font-mono rounded-none uppercase tracking-widest"
                  >
                    {Object.keys(teamStats).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className="text-center font-mono text-zinc-800 font-extrabold text-xs tracking-widest my-1 uppercase">
                  ─ VS ─
                </div>

                {/* Selector 2 */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase font-bold block">
                    OPPOSING VISITING CHALLENGER
                  </label>
                  <select
                    value={compareTeam}
                    onChange={(e) => setCompareTeam(e.target.value)}
                    className="w-full bg-black border border-zinc-800 focus:border-brand-gold px-3.5 py-2.5 text-xs text-brand-gold font-mono rounded-none uppercase tracking-widest"
                  >
                    {Object.keys(teamStats).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Simulate Button */}
              <button
                onClick={performMatchSimulation}
                disabled={simloading}
                className="w-full py-3 bg-brand-orange hover:bg-white text-black font-extrabold uppercase text-[10px] sm:text-xs tracking-widest transition-colors duration-200"
              >
                {simloading ? "[ CONSULTING TIGER CORE DATABASE... ]" : "EXECUTE ANALYTIC SIMULATION"}
              </button>
            </div>

            {/* Results Console */}
            <div className="bg-black border border-zinc-900 p-4 rounded-none min-h-24 flex items-center justify-center font-mono mt-4 relative">
              <span className="absolute top-2 left-2 text-[7px] text-zinc-700 tracking-widest uppercase font-bold">
                CONSOLE OUTPUT TERMINAL
              </span>
              {simloading ? (
                <div className="space-y-2 text-center">
                  <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[9px] text-zinc-500 tracking-wider">LOADING MATRICES...</p>
                </div>
              ) : simulationResult ? (
                <div className="space-y-4 w-full text-center">
                  <p className="text-[10px] text-emerald-400 leading-relaxed font-mono">
                    {simulationResult}
                  </p>
                  <div className="border-t border-zinc-900/85 pt-3 flex justify-center">
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(`🐯 HTV MATCH SIMULATOR REPORT:\n\n${simulationResult}\n\nExecute live analytics matching at: ${window.location.href}`);
                        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-white border border-[#25D366] text-black hover:text-black font-extrabold text-[9px] tracking-widest uppercase transition-all duration-300"
                    >
                      <Share2 className="w-3 h-3 text-black" /> {lang === "en" ? "SHARE MATCH RESULT ON WHATSAPP" : "SHIRIKI MATOKEO WHATSAPP"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-500 leading-relaxed text-center font-mono uppercase italic">
                  Select challengers to run tactical matchup algorithm.
                </p>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
