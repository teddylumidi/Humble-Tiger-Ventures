import { useState } from "react";

type SportCategory = "core" | "growing" | "development" | "emerging";

interface Sport {
  name: string;
  emoji: string;
}

const SPORT_CATEGORIES: {
  key: SportCategory;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  dot: string;
  sports: Sport[];
}[] = [
  {
    key: "core",
    label: "CORE SPORTS",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    dot: "bg-emerald-400",
    sports: [
      { name: "Football", emoji: "⚽" },
      { name: "Rugby", emoji: "🏉" },
      { name: "Basketball", emoji: "🏀" },
      { name: "Athletics", emoji: "🏃" },
      { name: "Volleyball", emoji: "🏐" },
      { name: "Tennis", emoji: "🎾" },
      { name: "Chess", emoji: "♟️" },
      { name: "Handball", emoji: "🤾" },
      { name: "Cycling", emoji: "🚴" },
    ],
  },
  {
    key: "growing",
    label: "GROWING SPORTS",
    color: "text-brand-gold",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-brand-gold/30",
    dot: "bg-brand-gold",
    sports: [
      { name: "Netball", emoji: "🤾‍♀️" },
      { name: "Cricket", emoji: "🏏" },
      { name: "Swimming", emoji: "🏊" },
      { name: "Boxing", emoji: "🥊" },
      { name: "Martial Arts", emoji: "🥋" },
    ],
  },
  {
    key: "development",
    label: "DEVELOPMENT SPORTS",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    dot: "bg-sky-400",
    sports: [
      { name: "Hockey", emoji: "🏑" },
      { name: "Table Tennis", emoji: "🏓" },
      { name: "Badminton", emoji: "🏸" },
      { name: "Golf", emoji: "⛳" },
      { name: "Gymnastics", emoji: "🤸" },
    ],
  },
  {
    key: "emerging",
    label: "EMERGING SPORTS",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    dot: "bg-purple-400",
    sports: [
      { name: "Fencing", emoji: "🤺" },
      { name: "Ice Skating", emoji: "⛸️" },
      { name: "Esports", emoji: "🎮" },
      { name: "Rowing / Canoeing", emoji: "🛶" },
    ],
  },
];

export default function SportsFocus() {
  const [activeCategory, setActiveCategory] = useState<SportCategory | "all">("all");

  const filteredCategories =
    activeCategory === "all"
      ? SPORT_CATEGORIES
      : SPORT_CATEGORIES.filter((c) => c.key === activeCategory);

  return (
    <section
      className="bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900"
      id="sports-focus-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-2">
              OUR ARENA
            </span>
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
              SPORTS FOCUS AREAS
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 mt-4 md:mt-0 font-sans tracking-wide">
            We provide elite branding, marketing, and management services across 23+ sports disciplines — from grassroots to global stages.
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2 mb-10" id="sports-filter-tabs">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border rounded-sm ${
              activeCategory === "all"
                ? "bg-brand-orange text-black border-brand-orange font-extrabold"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
            }`}
          >
            ALL SPORTS
          </button>
          {SPORT_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border rounded-sm flex items-center gap-2 ${
                activeCategory === cat.key
                  ? "bg-brand-orange text-black border-brand-orange font-extrabold"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* SPORTS GRIDS */}
        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.key}>
              {/* Category Label */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`w-3 h-3 rounded-full ${category.dot}`} />
                <h3 className={`font-sports text-xl tracking-widest uppercase ${category.color}`}>
                  {category.label}
                </h3>
                <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
                  {category.sports.length} DISCIPLINES
                </span>
              </div>

              {/* Sports Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.sports.map((sport) => (
                  <div
                    key={sport.name}
                    className={`group bg-black border ${category.borderColor} p-4 sm:p-5 rounded-sm cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-orange/40 text-center`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {sport.emoji}
                    </div>
                    <span className="text-xs font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors uppercase">
                      {sport.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* STATS BAR */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "23+", label: "Sports Disciplines" },
            { value: "4", label: "Development Tiers" },
            { value: "9", label: "Core Sports" },
            { value: "Africa+", label: "Global Reach" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-black border border-zinc-900 p-5 text-center rounded-sm hover:border-brand-orange/30 transition-all"
            >
              <div className="font-sports text-3xl sm:text-4xl text-brand-orange">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
