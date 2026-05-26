import { useState } from "react";
import { TESTIMONIALS } from "../data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[index];

  return (
    <section className="bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900" id="testimonials-section">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header decoration */}
        <div className="flex justify-center items-center gap-1.5 text-brand-gold">
          <Star className="w-4 h-4 fill-brand-gold" />
          <Star className="w-4 h-4 fill-brand-gold" />
          <Star className="w-4 h-4 fill-brand-gold" />
          <Star className="w-4 h-4 fill-brand-gold" />
          <Star className="w-4 h-4 fill-brand-gold" />
        </div>

        {/* Large quotes representation */}
        <div className="relative px-6 sm:px-12 py-4">
          <Quote className="absolute -top-6 left-0 w-16 h-16 text-zinc-900 pointer-events-none select-none" />
          
          <div className="transition-all duration-300 min-h-36 flex items-center justify-center">
            <p className="text-lg sm:text-2xl font-sans tracking-wide leading-relaxed font-light italic text-zinc-200">
              "{active.quote}"
            </p>
          </div>
        </div>

        {/* User identity info card */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <img
            src={active.avatar}
            alt={active.name}
            className="w-14 h-14 rounded-full object-cover border border-brand-orange grayscale scale-98"
            referrerPolicy="no-referrer"
          />
          <div className="text-center sm:text-left">
            <h4 className="font-sports text-xl tracking-widest text-white uppercase leading-none">
              {active.name}
            </h4>
            <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase">
              {active.role}
            </span>
          </div>
        </div>

        {/* Sliding controls */}
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-zinc-700 rounded-sm transition-all"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators bullet and numbers */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((temp, val) => (
              <button
                key={temp.id}
                onClick={() => setIndex(val)}
                className={`w-6 h-1 transition-all ${
                  index === val ? "bg-brand-orange" : "bg-zinc-900 hover:bg-zinc-805"
                }`}
                aria-label={`Go to slide ${val + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 border border-zinc-900 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-zinc-700 rounded-sm transition-all"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
