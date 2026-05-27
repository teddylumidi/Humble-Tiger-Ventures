import { useState } from "react";
import {
  Crown,
  Star,
  Gem,
  Check,
  ChevronDown,
  ChevronUp,
  Users,
  GraduationCap,
  Shield,
  Trophy,
} from "lucide-react";

type CategoryKey = "athlete" | "coach" | "school" | "team";

interface PackageTier {
  name: string;
  color: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  priceKES: string;
  priceUSD: string;
  duration: string;
  features: string[];
  agencyServices?: string[];
  highlighted?: boolean;
}

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
  { key: "athlete", label: "ATHLETES", icon: <Trophy className="w-4 h-4" /> },
  { key: "coach", label: "COACHES", icon: <Users className="w-4 h-4" /> },
  { key: "school", label: "SCHOOLS", icon: <GraduationCap className="w-4 h-4" /> },
  { key: "team", label: "TEAMS", icon: <Shield className="w-4 h-4" /> },
];

const PACKAGES: Record<CategoryKey, PackageTier[]> = {
  athlete: [
    {
      name: "BASIC",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      icon: <Star className="w-5 h-5 text-emerald-400" />,
      priceKES: "31,500",
      priceUSD: "240",
      duration: "12 Months",
      features: [
        "Professional athlete profile",
        "Sports CV & portfolio",
        "24 branded posters yearly",
        "Feature article / interview",
        "Visibility & exposure support",
      ],
    },
    {
      name: "STANDARD",
      color: "text-brand-gold",
      borderColor: "border-brand-gold/30",
      glowColor: "shadow-[0_0_30px_rgba(212,175,55,0.12)]",
      icon: <Crown className="w-5 h-5 text-brand-gold" />,
      priceKES: "81,000",
      priceUSD: "620",
      duration: "12 Months",
      features: [
        "Full athlete branding",
        "Professional portfolio",
        "Social media management",
        "6 yearly video shoots",
        "Highlight reels production",
        "Sponsorship proposal creation",
      ],
      agencyServices: [
        "Scout & talent exposure",
        "Sponsorship connections",
        "Career planning support",
      ],
      highlighted: true,
    },
    {
      name: "PREMIUM",
      color: "text-sky-400",
      borderColor: "border-sky-500/30",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
      icon: <Gem className="w-5 h-5 text-sky-400" />,
      priceKES: "140,000",
      priceUSD: "1,075",
      duration: "12 Months",
      features: [
        "Full personal branding strategy",
        "Unlimited campaign posters",
        "Daily social media management",
        "10+ yearly productions",
        "Dedicated athlete webpage",
        "Media campaigns & PR",
      ],
      agencyServices: [
        "Full representation",
        "Contract & negotiation support",
        "International opportunities",
        "Scholarship support",
        "Brand deal sourcing",
      ],
    },
  ],
  coach: [
    {
      name: "BASIC",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      icon: <Star className="w-5 h-5 text-emerald-400" />,
      priceKES: "15,000",
      priceUSD: "120",
      duration: "6 Months",
      features: [
        "Coach profile & biography",
        "Professional CV creation",
        "12 branded posters",
        "Social media visibility",
        "Feature interview",
      ],
    },
    {
      name: "STANDARD",
      color: "text-brand-gold",
      borderColor: "border-brand-gold/30",
      glowColor: "shadow-[0_0_30px_rgba(212,175,55,0.12)]",
      icon: <Crown className="w-5 h-5 text-brand-gold" />,
      priceKES: "35,000",
      priceUSD: "270",
      duration: "6 Months",
      features: [
        "Full coaching brand identity",
        "Social media management",
        "3 video productions",
        "Media coverage & PR",
        "Sponsorship proposal",
      ],
      agencyServices: [
        "Career advancement support",
        "Networking & connections",
      ],
      highlighted: true,
    },
    {
      name: "PREMIUM",
      color: "text-sky-400",
      borderColor: "border-sky-500/30",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
      icon: <Gem className="w-5 h-5 text-sky-400" />,
      priceKES: "75,000",
      priceUSD: "580",
      duration: "6 Months",
      features: [
        "Complete personal branding",
        "Daily social management",
        "6+ video productions",
        "Dedicated coach webpage",
        "Full media campaigns",
        "International exposure",
      ],
      agencyServices: [
        "Full representation",
        "Contract negotiations",
        "Placement & opportunity sourcing",
      ],
    },
  ],
  school: [
    {
      name: "BASIC",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      icon: <Star className="w-5 h-5 text-emerald-400" />,
      priceKES: "35,000",
      priceUSD: "270",
      duration: "6 Months",
      features: [
        "School sports branding",
        "12 event posters",
        "Social media setup",
        "Tournament promotion",
        "Sports photography",
      ],
    },
    {
      name: "STANDARD",
      color: "text-brand-gold",
      borderColor: "border-brand-gold/30",
      glowColor: "shadow-[0_0_30px_rgba(212,175,55,0.12)]",
      icon: <Crown className="w-5 h-5 text-brand-gold" />,
      priceKES: "60,000",
      priceUSD: "460",
      duration: "6 Months",
      features: [
        "Full school sports branding",
        "Social media management",
        "Media coverage per term",
        "Tournament promotion & coverage",
        "Highlight reels per team",
        "Athlete development program",
      ],
      agencyServices: [
        "Sponsorship connections",
        "Student athlete exposure",
      ],
      highlighted: true,
    },
    {
      name: "PREMIUM",
      color: "text-sky-400",
      borderColor: "border-sky-500/30",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
      icon: <Gem className="w-5 h-5 text-sky-400" />,
      priceKES: "150,000",
      priceUSD: "1,150",
      duration: "6 Months",
      features: [
        "Elite school sports identity",
        "Daily social management",
        "Full media production suite",
        "All tournament coverage",
        "Dedicated school sports page",
        "Complete athlete profiling",
      ],
      agencyServices: [
        "Corporate sponsorship acquisition",
        "Inter-school league support",
        "Full agency representation",
      ],
    },
  ],
  team: [
    {
      name: "BASIC",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      icon: <Star className="w-5 h-5 text-emerald-400" />,
      priceKES: "40,000",
      priceUSD: "310",
      duration: "6 Months",
      features: [
        "Club branding & identity",
        "12 match-day posters",
        "Social media setup",
        "Match coverage (6 matches)",
        "Highlight video per month",
      ],
    },
    {
      name: "STANDARD",
      color: "text-brand-gold",
      borderColor: "border-brand-gold/30",
      glowColor: "shadow-[0_0_30px_rgba(212,175,55,0.12)]",
      icon: <Crown className="w-5 h-5 text-brand-gold" />,
      priceKES: "90,000",
      priceUSD: "690",
      duration: "6 Months",
      features: [
        "Full club rebranding",
        "Social media management",
        "Match coverage (all home games)",
        "Highlight reels & recap videos",
        "Sponsorship proposals",
        "Recruitment exposure",
      ],
      agencyServices: [
        "Sponsorship acquisition",
        "Player transfer exposure",
        "Media partnerships",
      ],
      highlighted: true,
    },
    {
      name: "PREMIUM",
      color: "text-sky-400",
      borderColor: "border-sky-500/30",
      glowColor: "shadow-[0_0_30px_rgba(56,189,248,0.12)]",
      icon: <Gem className="w-5 h-5 text-sky-400" />,
      priceKES: "200,000",
      priceUSD: "1,540",
      duration: "6 Months",
      features: [
        "Elite club brand system",
        "Daily social management",
        "Full season match coverage",
        "Documentary-style content",
        "Dedicated team webpage",
        "Merchandise design support",
      ],
      agencyServices: [
        "Full agency representation",
        "Commercial deal negotiation",
        "International club exposure",
        "Player management support",
      ],
    },
  ],
};

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("athlete");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const packages = PACKAGES[activeCategory];

  return (
    <section
      className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900"
      id="pricing-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-2">
            INVESTMENT TIERS
          </span>
          <h2 className="font-sports text-4xl sm:text-6xl lg:text-7xl tracking-widest text-white uppercase leading-none font-bold">
            PACKAGES & PRICING
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-zinc-400 mt-4 font-sans tracking-wide">
            Premium sports branding, media production, and agency representation packages tailored for athletes, coaches, schools, and teams across Africa.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12" id="pricing-category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setExpandedCard(null);
              }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 border rounded-sm ${
                activeCategory === cat.key
                  ? "bg-brand-orange text-black border-brand-orange font-extrabold"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="pricing-cards-grid">
          {packages.map((pkg) => {
            const cardKey = `${activeCategory}-${pkg.name}`;
            const isExpanded = expandedCard === cardKey;

            return (
              <div
                key={cardKey}
                className={`relative bg-zinc-950 border rounded-sm p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col ${pkg.borderColor} ${
                  pkg.highlighted
                    ? `${pkg.glowColor} ring-1 ring-brand-gold/20`
                    : "hover:shadow-[0_0_20px_rgba(255,106,0,0.1)]"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold text-black text-[10px] font-mono font-extrabold tracking-widest uppercase rounded-sm">
                    MOST POPULAR
                  </div>
                )}

                {/* TIER HEADER */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 bg-black border border-zinc-800 flex items-center justify-center rounded-sm`}>
                    {pkg.icon}
                  </div>
                  <div>
                    <h3 className={`font-sports text-2xl tracking-wider uppercase ${pkg.color}`}>
                      {pkg.name}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* PRICING */}
                <div className="mb-6 pb-6 border-b border-zinc-900">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sports text-4xl sm:text-5xl text-white">
                      KES {pkg.priceKES}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 tracking-wider">
                    ≈ ${pkg.priceUSD} USD
                  </span>
                </div>

                {/* FEATURES */}
                <div className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.color}`} />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* AGENCY SERVICES (expandable) */}
                {pkg.agencyServices && (
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
                      className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-brand-gold uppercase hover:text-brand-orange transition-colors w-full"
                    >
                      AGENCY SERVICES
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="mt-3 space-y-2 animate-fadeIn">
                        {pkg.agencyServices.map((service, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-orange" />
                            <span className="text-xs text-zinc-400">{service}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                <button
                  className={`w-full py-3 font-extrabold uppercase text-xs tracking-widest transition-all duration-300 ${
                    pkg.highlighted
                      ? "bg-brand-orange text-black hover:bg-white"
                      : "bg-zinc-900 text-white border border-zinc-800 hover:border-brand-orange hover:text-brand-orange"
                  }`}
                >
                  GET STARTED
                </button>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 text-center bg-zinc-950 border border-zinc-900 p-8 sm:p-12 rounded-sm">
          <h3 className="font-sports text-2xl sm:text-3xl tracking-widest text-white uppercase mb-3">
            NEED A CUSTOM PACKAGE?
          </h3>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            We build bespoke sports branding and management solutions for federations, tournaments, and large-scale organizations. Let's talk.
          </p>
          <a
            href="https://wa.me/254729542982?text=Hi%20Humble%20Tiger%2C%20I%27d%20like%20to%20discuss%20a%20custom%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-brand-orange text-black font-extrabold uppercase text-xs tracking-widest hover:bg-white transition-colors duration-300"
          >
            CONTACT US ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
