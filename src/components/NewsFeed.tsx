import { useState, useMemo } from "react";
import { NEWS_ITEMS } from "../data";
import { NewsItem } from "../types";
import { Calendar, Play, Tag, Radio, BookOpen, ChevronRight, X, Search } from "lucide-react";

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedStory, setSelectedStory] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Divide into Featured (top) vs Feed (standard)
  const featuredStory = useMemo(() => {
    return NEWS_ITEMS.find((item) => item.isLive) || NEWS_ITEMS[0];
  }, []);

  // Filter based on selected pills and search word
  const filteredStories = useMemo(() => {
    const defaultList = NEWS_ITEMS.filter((item) => item.id !== featuredStory.id);
    let list = defaultList;
    if (activeCategory !== "ALL") {
      list = NEWS_ITEMS.filter(
        (item) => item.category.toUpperCase() === activeCategory.toUpperCase()
      );
    }
    if (searchTerm.trim()) {
      list = list.filter((item) => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  }, [activeCategory, featuredStory, searchTerm]);

  const categories = ["ALL", "MATCH", "ATHLETE", "PRESS", "HIGHLIGHT"];

  return (
    <section className="bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="media-section">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-1">
              EDITORIAL DESK
            </span>
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
              THE DAILY RAPID / SPORTS MEDIA
            </h2>
          </div>

          {/* SEARCH BAR & CATEGORY SELECTOR TABS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 md:mt-0" id="editorial-controls">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder="SEARCH ARTICLES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-zinc-900 focus:border-brand-orange text-[10px] tracking-widest text-white placeholder-zinc-700 font-mono pl-9 pr-3 py-2 rounded-none focus:outline-none uppercase"
              />
            </div>

            <div className="flex flex-wrap gap-1 bg-black/50 border border-zinc-900 p-1" id="category-selectors">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 uppercase font-mono text-[9px] tracking-wider transition-all ${
                    (activeCategory === cat)
                      ? "bg-brand-orange text-black font-extrabold"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. FEATURED STORY TILES - LARGE EPIC ROW */}
        <div className="mb-12" id="featured-story-block">
          <div
            onClick={() => setSelectedStory(featuredStory)}
            className="group relative bg-black border border-zinc-900 p-1 rounded-sm overflow-hidden cursor-pointer hover:border-brand-orange transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Featured Image */}
              <div className="lg:col-span-7 h-80 sm:h-96 w-full relative overflow-hidden bg-zinc-900">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Live indicators */}
                {featuredStory.isLive && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-sm shadow-md animate-pulse">
                    <Radio className="w-3.5 h-3.5" /> LIVE EVENT COVERAGE
                  </span>
                )}
                
                {!featuredStory.isLive && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-black/80 text-brand-gold text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-sm border border-brand-gold/20">
                    <BookOpen className="w-3.5 h-3.5" /> FEATURED COVERAGE
                  </span>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              </div>

              {/* Featured Text content */}
              <div className="lg:col-span-5 p-6 space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                  <span className="text-brand-orange uppercase font-bold tracking-widest">
                    {featuredStory.category}
                  </span>
                  <span>•</span>
                  <span>{featuredStory.date}</span>
                </div>

                <h3 className="font-sports text-3xl sm:text-4xl tracking-wide text-white group-hover:text-brand-orange leading-tight transition-colors">
                  {featuredStory.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {featuredStory.summary}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5 group-hover:underline">
                    Read Coverage Blueprint <ChevronRight className="w-4 h-4 text-brand-orange" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600">
                    BY HTV PRESS TEAM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STANDARD STORY TILES GRID */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-12 border border-zinc-900 bg-zinc-950 rounded-sm">
            <p className="text-sm font-mono text-zinc-500">
              No bulletin entries recorded under category: "{activeCategory}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="standard-stories-grid">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="group bg-black border border-zinc-900 rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-brand-orange transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,106,0,0.1)]"
              >
                <div>
                  {/* Photo row */}
                  <div className="h-52 w-full bg-zinc-900 relative overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {story.isLive && (
                      <span className="absolute top-3 left-3 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 bg-zinc-950/90 border border-zinc-900 px-2 py-0.5 rounded-sm text-[8px] font-mono font-semibold tracking-widest text-brand-orange uppercase">
                      {story.category}
                    </span>
                  </div>

                  {/* Body Text */}
                  <div className="p-5 space-y-3">
                    <span className="block text-[9px] font-mono text-zinc-500">
                      {story.date}
                    </span>
                    <h4 className="font-sports text-xl tracking-wider uppercase text-white group-hover:text-brand-orange transition-all line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                      {story.summary}
                    </p>
                  </div>
                </div>

                {/* Foot Line */}
                <div className="px-5 pb-5 pt-3 border-t border-zinc-900/50 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-brand-gold group-hover:underline">
                    VIEW COVERAGE
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-orange transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STORY READ PREVIEW MODAL */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-55 flex items-center justify-center p-4" id="news-modal-overlay">
            <div className="bg-zinc-950 border border-zinc-800 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 shadow-2xl">
              {/* Close pin */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-brand-orange">
                  <span>{selectedStory.category.toUpperCase()}</span>
                  <span>•</span>
                  <span className="text-zinc-500">{selectedStory.date}</span>
                </div>

                <h3 className="font-sports text-3xl tracking-wide text-white uppercase leading-none">
                  {selectedStory.title}
                </h3>

                <div className="w-full h-64 bg-zinc-900 rounded-sm overflow-hidden">
                  <img
                    src={selectedStory.image}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="prose prose-invert max-w-none text-zinc-300 font-sans text-sm sm:text-base leading-relaxed space-y-4">
                  <p className="font-semibold text-white border-l-4 border-brand-orange pl-4 text-sm sm:text-base">
                    {selectedStory.summary}
                  </p>
                  <p className="whitespace-pre-line text-zinc-400 text-xs sm:text-sm">
                    {selectedStory.content}
                  </p>
                  <p className="text-xs text-zinc-500 border-t border-zinc-900 pt-4">
                    Author: Humble Tiger Ventures Editorial Team. All campaign data protected under media registration guidelines.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-t border-zinc-900">
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(`🔥 HTV READ: "${selectedStory.title}"\n${selectedStory.summary}\nRead more: ${window.location.href}`);
                      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] tracking-widest uppercase transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Share On WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-6 py-2.5 bg-brand-orange text-black font-extrabold uppercase text-[10px] tracking-widest hover:bg-white transition-colors"
                  >
                    Close Article
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
