export interface NewsItem {
  id: string;
  title: string;
  category: "Match" | "Athlete" | "Press" | "Highlight";
  summary: string;
  content: string;
  image: string;
  date: string;
  isLive?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Athlete branding" | "Club partnership" | "School sports" | "Sponsorship activation";
  impact: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
}

export interface Registration {
  id: string;
  fullName: string;
  organization?: string;
  category: "Athlete" | "Team / Club" | "School" | "Sponsor / Brand";
  sport: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  description: string;
  createdAt: string;
}

export interface Fixture {
  id: string;
  title: string;
  sport: string;
  time: string;
  date: string;
  status: "upcoming" | "live" | "completed";
  competitors: { name: string; score?: string }[];
}

export interface TickerEvent {
  id: string;
  title: string;
  category: string;
  isHot?: boolean;
}
