import { NewsItem, ProjectItem, ServiceItem, TestimonialItem, Fixture, TickerEvent } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "athlete-branding",
    title: "Athlete Branding & PR",
    description: "Architecting elite brand identities for next-generation sports icons. Social playbooks, press relations, and visual standards.",
    details: "We build digital-first personal brands for premium athletes across major African and European leagues, managing their legacy beyond the field."
  },
  {
    id: "team-marketing",
    title: "Team & Club Marketing",
    description: "Re-engineering sports club ecosystems with editorial-grade media production, fan acquisition channels, and high-impact digital campaigns.",
    details: "Boosting ticket sales, merchandise runs, and membership programs through narrative-driven club rebranding."
  },
  {
    id: "sponsorship",
    title: "Sponsorship Activation",
    description: "Bridging the gap between corporate fortune and athletic talent. End-to-end activation metrics, experiential design, and commercial partnerships.",
    details: "Maximized ROI for top brands with unforgettable matches, interactive fan engagement, and digital product placement."
  },
  {
    id: "content-creation",
    title: "Sports Content Creation",
    description: "Cinematic, broadcast-quality sports documentation, photo-essays, and high-adrenaline short videos.",
    details: "From local pitches to national arenas, we capture every raw drop of sweat, glory, and emotion."
  },
  {
    id: "social-media",
    title: "Social Media for Athletes",
    description: "24/7 engagement models, customized graphics, real-time match infographics, and cross-platform amplification.",
    details: "Empowering athletes to voice their stories, build massive fanbases, and lock in global endorsement deals."
  },
  {
    id: "event-promotion",
    title: "Event & Tournament Promotion",
    description: "Sold-out arenas and record-breaking broadcast ratings. Stadium branding, ticket mechanics, and mainstream media hype.",
    details: "Turning local tournaments into premium, must-watch national sporting spectacles with digital-first broadcast coverage."
  },
  {
    id: "school-sports",
    title: "School Sports Branding Programs",
    description: "Empowering scholastic leagues with professional-grade media kits, uniforms, and digital networks.",
    details: "Creating the grassroots heroes of tomorrow by elevating university and high-school sports structures to elite status."
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    title: "HOW THE TIGER AWAKENS: SIYA CHIDI'S RISE TO EUROPEAN STARDOM",
    category: "Athlete",
    summary: "Reflecting on Humble Tiger's flagship campaign that transformed a local rugby prospect into a global sports icon with premium sponsorship backing.",
    content: "Siya Chidi's journey through our elite branding suite represents the pinnacle of sports marketing. By building high-production visual campaigns, securing regional television placements, and redefining his signature jersey line, Chidi clinched a historic contract with a top French rugby franchise. Here's a look at the narrative blueprint we used.",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=1200", // rugby match
    date: "2026-05-25",
    isLive: false
  },
  {
    id: "2",
    title: "LIVE EVENT: WEST AFRICA CHAMPIONS CUP FINALS TONIGHT",
    category: "Match",
    summary: "Two elite football academies, fully rebranded by Humble Tiger, battle for continental glory. Catch live coverage, stats, and live streams here.",
    content: "The West Africa Champions Cup Finals features Lagos Tigers FC vs Dakar Stars FC in Accra. Both squads represent our School and Academy Sports branding programs, looking absolute world-class in custom-designed jerseys. Read our tactical review and match analytics below.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800", // football field
    date: "2026-05-26",
    isLive: true
  },
  {
    id: "3",
    title: "REVOLUTIONIZING GRASSROOTS FOOTBALL IN NIGERIA AND KENYA",
    category: "Press",
    summary: "Humble Tiger Ventures announces a massive multi-million sponsorship program leveraging school athletic departments.",
    content: "We are thrilled to launch the School Sports Network Initiative. This comprehensive program secures elite gear, high-performance coaching sponsorships, and broadcast streaming arrays for 35 key high school football and athletic clubs across Nairobi and Lagos.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800", // running track / start block
    date: "2026-05-24"
  },
  {
    id: "4",
    title: "THE ANATOMY OF A NIKE-LEVEL ACTIVATION FOR ATHLETIC ASSOCIATIONS",
    category: "Highlight",
    summary: "Why traditional corporate logos on jerseys are dead, and how story-driven activations build deep emotional loyalty.",
    content: "A logo change isn't a strategy. To drive modern sports commerce, brands must sponsor individual athlete journeys. We explore how Humble Tiger Ventures' multi-sensory campaigns for track icons reached over 12 million organic impressions this season.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800", // athletic running trail
    date: "2026-05-20"
  }
];

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: "p1",
    title: "Lagos Wolves Rebranding Project",
    category: "Club partnership",
    impact: "+240% Attendance & Sold-Out Apparel",
    description: "Developed a bold, modern territorial identity for the elite basketball club. Launched a signature digital series, designed high-concept streetwear merchandise, and negotiated prime broadcast stream agreements.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800" // basketball court
  },
  {
    id: "p2",
    title: "The Chidimma Okoro Campaign",
    category: "Athlete branding",
    impact: "3 Elite Endorsements & Euro Transfer",
    description: "Positioned West Africa's leading sprinting prodigy on global billboards. Managed secure corporate partnerships with premium beverage brands and athletic apparel lines while crafting her digital story.",
    image: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800" // running athlete
  },
  {
    id: "p3",
    title: "East Africa School Rugby Cup",
    category: "School sports",
    impact: "15 Elite High Schools Brocasted Live",
    description: "Erected the most prestigious youth rugby championship in the region. Implemented professional live stream hubs, built identity guidelines for all 15 competing schools, and attracted tier-1 telecommunication brands as headline partners.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800" // rugby soccer turf
  },
  {
    id: "p4",
    title: "Oasis Energy Drink Activation",
    category: "Sponsorship activation",
    impact: "22M TikTok Views & Retail Success",
    description: "Created a viral soccer street-shootout campaign across 5 capital cities. Paired elite influencers with amateur champions in custom arenas designed by Humble Tiger.",
    image: "https://images.unsplash.com/photo-1434596994096-19d4e89a7ec5?auto=format&fit=crop&q=80&w=800" // sporty running high-energy
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    quote: "Humble Tiger didn't just market my performance—they built my legacy. Before them, I was just a fast runner. Today, I'm a global African brand with commercial leverage.",
    name: "Aphiwe Khumalo",
    role: "Continental Champion Sprinter & Gold Medalist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "t2",
    quote: "Our stadium was barely half full. Humble Tiger redesigned our team identity from scratch, brought premium media coverage, and filled the stands with high-octane fan culture.",
    name: "Coach Tariq Diallo",
    role: "Technical Director, Sahel United Football Club",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "t3",
    quote: "Partnering with Humble Tiger for our school sports program elevated our academic institution's brand overnight. Young athletes are coming from across the country to join us.",
    name: "Dr. Evelyn Musoka",
    role: "President, East African Scholastic Association",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  }
];

export const FIXTURES: Fixture[] = [
  {
    id: "fix-1",
    title: "West Africa Champions Cup Finals",
    sport: "Football",
    time: "20:00 GMT",
    date: "Tonight",
    status: "live",
    competitors: [
      { name: "Lagos Tigers FC", score: "2" },
      { name: "Dakar Stars FC", score: "1" }
    ]
  },
  {
    id: "fix-2",
    title: "Inter-Scholastic Rugby Classic",
    sport: "Rugby",
    time: "14:30 SAST",
    date: "Wednesday",
    status: "upcoming",
    competitors: [
      { name: "Pretoria College" },
      { name: "Nairobi Academy" }
    ]
  },
  {
    id: "fix-3",
    title: "Elite Athlete Showcase Run",
    sport: "Athletics",
    time: "10:00 EAT",
    date: "Saturday",
    status: "upcoming",
    competitors: [
      { name: "Chidimma Okoro (Nigeria)" },
      { name: "Faith Kipkorir (Kenya)" }
    ]
  },
  {
    id: "fix-4",
    title: "African Youth Hoops Showdown",
    sport: "Basketball",
    time: "18:00 WAT",
    date: "Last Saturday",
    status: "completed",
    competitors: [
      { name: "Lagos Wolves", score: "88" },
      { name: "Accra Giants", score: "81" }
    ]
  }
];

export const TICKER_EVENTS: TickerEvent[] = [
  { id: "tk-1", title: "HTV CAMPAIGN: +150% SPONSOR VALUE FOR APWE KHUMALO", category: "AGENCY" },
  { id: "tk-2", title: "LAGOS TIGERS 2 - 1 DAKAR STARS (LIVE)", category: "FOOTBALL", isHot: true },
  { id: "tk-3", title: "CHIDIMMA OKORO SIGNS MULTI-YEAR GERMAN TEAM TRANSFER", category: "ATHLETE" },
  { id: "tk-4", title: "HTV NETWORK APPLICANTS SURPASS 2,500 SCHOLARS ACROSS SAFRICA", category: "GROWTH" },
  { id: "tk-5", title: "UPCOMING: EAST AFRICA RUGBY CUP FINALS LIVE STREAMING ON JUNE 1ST", category: "MEDIA", isHot: true },
  { id: "tk-6", title: "SAHEL UNITED FC SECURES MILLION-DOLLAR ACTIVATION WITH OASIS DRINK", category: "SPONSOR" }
];
