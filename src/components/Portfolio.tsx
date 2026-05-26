import { useState, useMemo } from "react";
import { PROJECT_ITEMS } from "../data";
import { ProjectItem } from "../types";
import { ArrowUpRight, Award, Flame, Trophy, TrendingUp, X } from "lucide-react";

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [selectedTeam, setSelectedTeam] = useState<string>("ALL");
  const [visibleCount, setVisibleCount] = useState<number>(2);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filters = [
    { value: "ALL", label: "ALL CAMPAIGNS" },
    { value: "Athlete branding", label: "ATHLETE BRANDING" },
    { value: "Club partnership", label: "CLUB PARTNERSHIPS" },
    { value: "School sports", label: "SCHOOL SPORTS" },
    { value: "Sponsorship activation", label: "SPONSORSHIPS" }
  ];

  const teamTabs = [
    { value: "ALL", label: "ALL SQUADS", color: "border-zinc-800 text-zinc-400" },
    { value: "TIGERS", label: "LAGOS TIGERS (SOCCER)", color: "border-red-900 text-red-400" },
    { value: "WOLVES", label: "LAGOS WOLVES (HOOPS)", color: "border-brand-gold/60 text-brand-gold" },
    { value: "RUGBY", label: "EAST RUGBY ACADEMY", color: "border-emerald-990 text-emerald-400" },
    { value: "SPRINTERS", label: "OKORO RUNNERS", color: "border-purple-900 text-purple-400" }
  ];

  // Reset page limit on filter changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setVisibleCount(2);
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    setVisibleCount(2);
  };

  const filteredProjects = useMemo(() => {
    let result = PROJECT_ITEMS;

    // 1. Genre filter
    if (selectedFilter !== "ALL") {
      result = result.filter(
        (proj) => proj.category.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // 2. Team filter tabs
    if (selectedTeam !== "ALL") {
      if (selectedTeam === "TIGERS") {
        result = result.filter(p => p.title.toLowerCase().includes("wolves") === false && (p.title.toLowerCase().includes("cup") || p.title.toLowerCase().includes("activation") || p.title.toLowerCase().includes("tigers") || p.title.toLowerCase().includes("oasis")));
      } else if (selectedTeam === "WOLVES") {
        result = result.filter(p => p.title.toLowerCase().includes("wolves"));
      } else if (selectedTeam === "RUGBY") {
        result = result.filter(p => p.title.toLowerCase().includes("rugby") || p.description.toLowerCase().includes("rugby"));
      } else if (selectedTeam === "SPRINTERS") {
        result = result.filter(p => p.title.toLowerCase().includes("okoro") || p.description.toLowerCase().includes("sprint"));
      }
    }

    return result;
  }, [selectedFilter, selectedTeam]);

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="portfolio-section">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BLOCK */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 border-b border-zinc-900">
            <div>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-1">
                FIELD OF WORKS
              </span>
              <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
                THE COMMERCIAL LEGACY
              </h2>
            </div>

            {/* PORTFOLIO NAV LINKS */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0" id="portfolio-filters">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilterChange(f.value)}
                  className={`px-4 py-1.5 uppercase font-mono text-[9px] tracking-widest border transition-all duration-200 ${
                    selectedFilter === f.value
                      ? "bg-white border-white text-black font-black shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                      : "bg-black border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* TEAM FILTER TABS */}
          <div className="bg-zinc-950/80 border border-zinc-900/60 p-4 rounded-sm" id="team-filter-tabs-container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-[10px] font-mono tracking-wider text-brand-orange uppercase font-black">
                FRANCHISE TEAMS & ATHLETIC SQUADS:
              </span>
              <div className="flex flex-wrap gap-2">
                {teamTabs.map((team) => (
                  <button
                    key={team.value}
                    onClick={() => handleTeamChange(team.value)}
                    className={`px-3 py-1 font-mono text-[10px] uppercase border tracking-widest transition-all ${
                      selectedTeam === team.value
                        ? "bg-brand-orange border-brand-orange text-black font-extrabold shadow-[0_0_12px_rgba(255,106,0,0.25)]"
                        : "bg-black text-zinc-400 hover:text-white border-zinc-900 hover:border-zinc-800"
                    }`}
                  >
                    {team.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS MASONRY/GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-works-grid">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer relative hover:border-brand-orange/60 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 z-10 bg-black/90 border border-brand-orange/40 text-brand-orange font-mono text-[9px] font-bold tracking-widest px-3 py-1 rounded-sm">
                {project.category.toUpperCase()}
              </div>

              {/* Cinematic Top Image */}
              <div className="h-72 w-full bg-zinc-900 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Result Tag Banner */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-10">
                  <div className="inline-flex items-center gap-1.5 bg-brand-orange/95 text-black font-extrabold text-[10px] tracking-widest px-3 py-1 uppercase rounded-sm font-sans shadow-md">
                    <TrendingUp className="w-3.5 h-3.5 stroke-[3px]" /> RESULT: {project.impact}
                  </div>
                </div>
              </div>

              {/* Narrative Panel */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-sports text-2xl sm:text-3xl tracking-wide text-white group-hover:text-brand-orange transition-colors uppercase leading-none">
                  {project.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="border-t border-zinc-900/50 pt-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-brand-gold font-bold tracking-widest uppercase flex items-center gap-1.5 group-hover:underline">
                    VIEW CASE RESULTS <ArrowUpRight className="w-3.5 h-3.5 text-brand-orange" />
                  </span>
                  <span className="text-zinc-600">
                    ID: {project.id.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE STORIES PANEL */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-12 text-center" id="portfolio-load-more">
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="px-8 py-3.5 bg-brand-orange hover:bg-white text-black font-mono font-black text-xs tracking-widest uppercase transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-brand-orange/25"
            >
              LOAD MORE CAMPAIGNS ({filteredProjects.length - visibleCount} REMAINING)
            </button>
          </div>
        )}

        {/* CASE STUDY EXPAND MODAL */}
        {activeProject && (
          <div className="fixed inset-0 bg-black/92 backdrop-blur-sm z-55 flex items-center justify-center p-4 animate-fadeIn" id="portfolio-modal-overlay">
            <div className="bg-zinc-950 border border-zinc-800 rounded-sm max-w-xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-10 shadow-2xl">
              {/* Highlight Lines */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-orange" />
              <div className="absolute top-0 right-0 w-1/4 h-[4px] bg-brand-gold" />

              {/* Close pin */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block mb-1">
                    CAMPAIGN TYPE // {activeProject.category.toUpperCase()}
                  </span>
                  <h3 className="font-sports text-3xl tracking-wide text-white uppercase leading-none">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="h-64 sm:h-72 w-full bg-zinc-900 rounded-sm overflow-hidden">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Performance stats summary */}
                <div className="grid grid-cols-2 gap-4 bg-black border border-zinc-900 p-4 rounded-sm">
                  <div>
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">
                      AUDITED CAMPAIGN IMPACT
                    </span>
                    <span className="text-sm font-bold text-brand-orange font-mono">
                      {activeProject.impact}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-zinc-500 uppercase">
                      PLATFORM STATUS
                    </span>
                    <span className="text-sm font-bold text-brand-gold font-mono uppercase flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-brand-gold" /> ELITE CAMPAIGN
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-xs font-mono tracking-widest text-white uppercase">
                    CAMPAIGN OVERVIEW & LOGISTICS
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {activeProject.description}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed bg-zinc-900/40 p-3 rounded-sm">
                    HTV is dedicated to constructing these authentic story narratives. By aligning the athlete identity cleanly with regional fan cultures and commercial sponsor metrics, we generate long-term residual value.
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-6 py-2.5 bg-brand-orange text-black font-extrabold uppercase text-xs tracking-widest hover:bg-white transition-colors"
                  >
                    Acknowledge Achievements
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
