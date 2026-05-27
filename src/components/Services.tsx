import { useState } from "react";
import { SERVICES } from "../data";
import {
  UserCheck,
  ShieldAlert,
  Handshake,
  Video,
  Share2,
  Megaphone,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  X,
  Newspaper,
  Tv,
  Heart,
} from "lucide-react";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Map service IDs to corresponding icons
  const getIcon = (id: string) => {
    switch (id) {
      case "athlete-branding":
        return <UserCheck className="w-6 h-6 text-brand-orange" />;
      case "team-marketing":
        return <ShieldAlert className="w-6 h-6 text-brand-orange" />;
      case "sponsorship":
        return <Handshake className="w-6 h-6 text-brand-orange" />;
      case "content-creation":
        return <Video className="w-6 h-6 text-brand-orange" />;
      case "social-media":
        return <Share2 className="w-6 h-6 text-brand-orange" />;
      case "event-promotion":
        return <Megaphone className="w-6 h-6 text-brand-orange" />;
      case "school-sports":
        return <GraduationCap className="w-6 h-6 text-brand-orange" />;
      case "pr-management":
        return <Newspaper className="w-6 h-6 text-brand-orange" />;
      case "media-rights":
        return <Tv className="w-6 h-6 text-brand-orange" />;
      case "fan-engagement":
        return <Heart className="w-6 h-6 text-brand-orange" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="services-section">
      <div className="max-w-7xl mx-auto">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-2">
              OUR PLAYBOOK
            </span>
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
              ELITE AGENCY SYSTEM
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 mt-4 md:mt-0 font-sans tracking-wide">
            We deliver targeted commercial amplification across ten distinct athletic and scholastic channels. Click any segment to review details.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="services-grid-list">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="group bg-zinc-950 border border-zinc-900 hover:border-brand-orange p-6 sm:p-8 rounded-sm cursor-pointer relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,106,0,0.15)] flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Tiny Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center rounded-sm group-hover:bg-zinc-900 group-hover:border-brand-orange transition-all">
                    {getIcon(service.id)}
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                </div>

                {/* Title */}
                <h3 className="font-sports text-xl tracking-wider uppercase text-white mb-3 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>

                {/* Short Desc */}
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-6">
                  {service.description}
                </p>
              </div>

              {/* Read more CTA line */}
              <div className="text-[10px] font-mono tracking-widest text-brand-gold uppercase flex items-center gap-1">
                Deep Dive <ArrowUpRight className="w-3 h-3 text-brand-orange" />
              </div>
            </div>
          ))}
        </div>

        {/* MODAL / BOTTOM SHEET EXPAND DRAWER FOR SELECTED SERVICE */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-55 flex items-center justify-center p-4 animate-fadeIn" id="service-modal-overlay">
            <div className="bg-zinc-950 border border-zinc-800 rounded-sm max-w-lg w-full p-8 relative overflow-hidden shadow-2xl">
              {/* Highlight Lines */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-orange" />
              <div className="absolute top-0 right-0 w-1/4 h-[3px] bg-brand-gold" />

              {/* Close pin */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Service Details info */}
              {SERVICES.filter((s) => s.id === selectedService).map((service) => (
                <div key={service.id} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center rounded-sm">
                      {getIcon(service.id)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block">
                        SERVICES DEPT
                      </span>
                      <h4 className="font-sports text-2xl tracking-widest text-white uppercase">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="border-t border-zinc-900 pt-5 space-y-3">
                    <h5 className="text-xs font-mono tracking-widest text-brand-gold uppercase">
                      STRATEGIC APPROACH
                    </h5>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {service.details}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2.5 bg-brand-orange text-black font-extrabold uppercase text-xs tracking-widest hover:bg-white transition-colors"
                    >
                      Acknowledge Playbook
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
