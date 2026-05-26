import { useState, useEffect, FormEvent } from "react";
import { Registration } from "../types";
import { User, Shield, School, Award, Sparkles, CheckCircle, Database, Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function RegistrationForm() {
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState<"Athlete" | "Team / Club" | "School" | "Sponsor / Brand">("Athlete");
  
  // States for input elements
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");

  const [submissions, setSubmissions] = useState<Registration[]>([]);
  const [successReceipt, setSuccessReceipt] = useState<Registration | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("htv_registrations");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse previous registrations: ", err);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      tempErrors.fullName = lang === "en" ? "Name or Business Contact is required." : "Enter your names make we know you.";
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = lang === "en" ? "Name must be at least 3 characters." : "Name too short, e must reach 3 letters.";
    }

    if (category !== "Athlete" && !organization.trim()) {
      tempErrors.organization = lang === "en" ? "Organization / Institution name is required." : "Provide brand/school name.";
    }

    if (!sport.trim()) {
      tempErrors.sport = lang === "en" ? "Sport category or core discipline is required." : "Type which sport game you dey play.";
    }

    if (!location.trim()) {
      tempErrors.location = lang === "en" ? "Geographic base country is required." : "Tell us your current location country.";
    }

    if (!email.trim()) {
      tempErrors.email = lang === "en" ? "Direct email is required." : "Email necessity form.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = lang === "en" ? "Enter a valid email address." : "This email format correct? Check well.";
    }

    if (!phone.trim()) {
      tempErrors.phone = lang === "en" ? "Mobile telephone number is required." : "Phone line dey required.";
    } else if (phone.trim().length < 8) {
      tempErrors.phone = lang === "en" ? "Phone must be at least 8 digits." : "Phone list too short under 8 digits.";
    }

    if (!description.trim()) {
      tempErrors.description = lang === "en" ? "Description of current achievements is required." : "Give small notes concerning your accomplishments.";
    } else if (description.trim().length < 15) {
      tempErrors.description = lang === "en" ? "Provide at least 15 characters of details." : "Goals brief too short! Min 15 letters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newReg: Registration = {
      id: "HTV-" + Math.floor(1000 + Math.random() * 9000),
      fullName,
      organization: category !== "Athlete" ? organization : undefined,
      category,
      sport,
      location,
      email,
      phone,
      whatsapp,
      description,
      createdAt: new Date().toISOString().split("T")[0]
    };

    const updated = [newReg, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("htv_registrations", JSON.stringify(updated));

    // Display receipt card
    setSuccessReceipt(newReg);
    setErrors({});

    // Reset input fields
    setFullName("");
    setOrganization("");
    setSport("");
    setLocation("");
    setEmail("");
    setPhone("");
    setWhatsapp("");
    setDescription("");
  };

  const handleClearHistory = () => {
    localStorage.removeItem("htv_registrations");
    setSubmissions([]);
  };

  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 relative" id="registration-section">
      {/* Skeleton border decor block */}
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-brand-orange/10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-brand-orange/10 pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-orange uppercase block mb-1">
              ECOSYSTEM PIPELINE
            </span>
            <h2 className="font-sports text-4xl sm:text-6xl tracking-widest text-white uppercase leading-none font-bold">
              {t("registrationTitle")}
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 mt-4 md:mt-0 font-sans tracking-wide">
            {t("registrationSub")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="registration-grid">
          {/* COLUMN 1: FORM WIZARD (7 COLS) */}
          <div className="lg:col-span-12 xl:col-span-8">
            {successReceipt ? (
              <div className="bg-zinc-950 border border-brand-orange p-8 rounded-sm relative overflow-hidden text-center space-y-6" id="success-view">
                {/* Visual elements */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-orange" />
                <div className="absolute top-0 right-0 w-1/4 h-[3px] bg-brand-gold" />
                
                <CheckCircle className="w-16 h-16 text-brand-orange mx-auto animate-pulse" />

                <div className="space-y-2">
                  <h3 className="font-sports text-4xl text-white tracking-widest uppercase">
                    REGISTRATION SUCCESSFUL
                  </h3>
                  <p className="text-sm font-mono text-brand-gold uppercase tracking-widest">
                    SYSTEM ID ID: {successReceipt.id}
                  </p>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Your application has been stored in local database state. A senior member of the Humble Tiger board will review your goals.
                  </p>
                </div>

                {/* Draft details receipt summary */}
                <div className="max-w-md mx-auto bg-black border border-zinc-900 p-6 text-left rounded-sm space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">APPLICANT CATEGORY:</span>
                    <span className="text-white font-bold uppercase">{successReceipt.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">FULL NOMINAL IDENTITY:</span>
                    <span className="text-white font-bold">{successReceipt.fullName}</span>
                  </div>
                  {successReceipt.organization && (
                    <div className="flex justify-between border-b border-zinc-900 pb-2">
                      <span className="text-zinc-500">ORGANIZATION:</span>
                      <span className="text-white font-bold">{successReceipt.organization}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">DISCIPLINE SPORT:</span>
                    <span className="text-white font-bold uppercase">{successReceipt.sport}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">LOCATION CO-ORDINATES:</span>
                    <span className="text-white font-bold uppercase">{successReceipt.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">DIRECT EMAIL ADDR:</span>
                    <span className="text-white font-bold">{successReceipt.email}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => setSuccessReceipt(null)}
                    className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-350 text-white font-extrabold uppercase text-xs tracking-widest"
                  >
                    Draft Another Form
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-10 rounded-sm relative">
                {/* Category Button Toggle Row */}
                <div className="space-y-4 mb-8">
                  <label className="block text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                    SOCIALLY SELECT APPLICANT FIELD:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => setCategory("Athlete")}
                      className={`py-3 px-4 border rounded-sm flex flex-col items-center gap-2 text-center transition-all ${
                        category === "Athlete"
                          ? "bg-zinc-900 border-brand-orange text-brand-orange"
                          : "bg-black border-zinc-900/40 text-zinc-400 hover:border-zinc-800 hover:text-white"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold">ATHLETE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategory("Team / Club")}
                      className={`py-3 px-4 border rounded-sm flex flex-col items-center gap-2 text-center transition-all ${
                        category === "Team / Club"
                          ? "bg-zinc-900 border-brand-orange text-brand-orange"
                          : "bg-black border-zinc-900/40 text-zinc-400 hover:border-zinc-800 hover:text-white"
                      }`}
                    >
                      <Shield className="w-5 h-5" />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold">CLUB / TEAM</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategory("School")}
                      className={`py-3 px-4 border rounded-sm flex flex-col items-center gap-2 text-center transition-all ${
                        category === "School"
                          ? "bg-zinc-900 border-brand-orange text-brand-orange"
                          : "bg-black border-zinc-900/40 text-zinc-400 hover:border-zinc-800 hover:text-white"
                      }`}
                    >
                      <School className="w-5 h-5" />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold">SCHOOL</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategory("Sponsor / Brand")}
                      className={`py-3 px-4 border rounded-sm flex flex-col items-center gap-2 text-center transition-all ${
                        category === "Sponsor / Brand"
                          ? "bg-zinc-900 border-brand-orange text-brand-orange"
                          : "bg-black border-zinc-900/40 text-zinc-400 hover:border-zinc-800 hover:text-white"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-[10px] font-mono tracking-widest uppercase font-bold">SPONSOR</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" id="onboarding-input-block" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full identity */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                        NAME / CONTACT PARTY *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: "" }));
                        }}
                        placeholder="E.G. CHIDIMMA OKORO"
                        className={`w-full bg-black border ${
                          errors.fullName ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                        } px-4 py-3 text-xs uppercase text-white placeholder-zinc-800 tracking-wider font-mono rounded-none`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                          ⚠ {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Organization conditionally rendered */}
                    {category !== "Athlete" ? (
                      <div>
                        <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                          NOMINAL ORGANIZATION / INSTITUTION *
                        </label>
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => {
                            setOrganization(e.target.value);
                            if (errors.organization) setErrors(prev => ({ ...prev, organization: "" }));
                          }}
                          placeholder="E.G. PRETORIA RUGBY SEVENS"
                          className={`w-full bg-black border ${
                            errors.organization ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                          } px-4 py-3 text-xs uppercase text-white placeholder-zinc-800 tracking-wider font-mono rounded-none`}
                        />
                        {errors.organization && (
                          <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                            ⚠ {errors.organization}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                          DISCIPLINE SPORT ARCHETYPE *
                        </label>
                        <input
                          type="text"
                          value={sport}
                          onChange={(e) => {
                            setSport(e.target.value);
                            if (errors.sport) setErrors(prev => ({ ...prev, sport: "" }));
                          }}
                          placeholder="E.G. ATHLETICS / SPRINTS"
                          className={`w-full bg-black border ${
                            errors.sport ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                          } px-4 py-3 text-xs uppercase text-white placeholder-zinc-800 tracking-wider font-mono rounded-none`}
                        />
                        {errors.sport && (
                          <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                            ⚠ {errors.sport}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sport field render if non-athlete */}
                    {category !== "Athlete" && (
                      <div>
                        <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                          DOMINANT ATHLETIC SPORT *
                        </label>
                        <input
                          type="text"
                          value={sport}
                          onChange={(e) => {
                            setSport(e.target.value);
                            if (errors.sport) setErrors(prev => ({ ...prev, sport: "" }));
                          }}
                          placeholder="E.G. FOOTBALL ACADEMY"
                          className={`w-full bg-black border ${
                            errors.sport ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                          } px-4 py-3 text-xs uppercase text-white placeholder-zinc-800 tracking-wider font-mono rounded-none`}
                        />
                        {errors.sport && (
                          <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                            ⚠ {errors.sport}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Geographic parameters */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                        GEOGRAPHIC BASE OR COUNTRY *
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (errors.location) setErrors(prev => ({ ...prev, location: "" }));
                        }}
                        placeholder="E.G. NAIROBI, KENYA"
                        className={`w-full bg-black border ${
                          errors.location ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                        } px-4 py-3 text-xs uppercase text-white placeholder-zinc-800 tracking-wider font-mono rounded-none`}
                      />
                      {errors.location && (
                        <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                          ⚠ {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CONTACT GROUP TRIO - EMAIL / PHONE / WHATSAPP */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-brand-orange" /> EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        placeholder="SIYA@ATHLETICS.ORG"
                        className={`w-full bg-black border ${
                          errors.email ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                        } px-4 py-3 text-xs text-white placeholder-zinc-800 font-mono rounded-none`}
                      />
                      {errors.email && (
                        <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                          ⚠ {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-orange" /> MOBILE TELEPHONE *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                        }}
                        placeholder="+254 712 345678"
                        className={`w-full bg-black border ${
                          errors.phone ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                        } px-4 py-3 text-xs text-white placeholder-zinc-800 font-mono rounded-none`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                          ⚠ {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-lime-500" /> WHATSAPP CONNECT
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+254 712 345678"
                        className="w-full bg-black border border-zinc-900 focus:border-brand-orange px-4 py-3 text-xs text-white placeholder-zinc-800 font-mono rounded-none"
                      />
                    </div>
                  </div>

                  {/* LONG TEXT DESCRIPTIVE */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                      CORE BRAND GOALS & CURRENT STANDBY ACCOMPLISHMENTS *
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                      }}
                      placeholder="DESCRIBE YOUR TEAM OR PERSONAL TRAJECTORY, CHAMPIONSHIPS WON, AND SPONSORSHIP REQUIREMENTS..."
                      className={`w-full bg-black border ${
                        errors.description ? "border-red-600 focus:border-red-500 text-red-100" : "border-zinc-900 focus:border-brand-orange"
                      } px-4 py-3 text-xs text-white placeholder-zinc-800 font-mono rounded-none resize-none uppercase`}
                    />
                    {errors.description && (
                      <p className="text-red-500 font-mono text-[9px] mt-1.5 uppercase tracking-wider">
                        ⚠ {errors.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-orange hover:bg-white text-black font-extrabold uppercase text-xs tracking-widest transition-colors duration-200"
                  >
                    SUBMIT TO HUMBLE TIGER NETWORK
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* COLUMN 2: REGISTRATION HISTORY / DASHBOARD SIMULATOR (4 COLS) */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 sm:p-8 rounded-sm">
              <h3 className="font-sports text-2xl tracking-widest text-white mb-2 uppercase flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-orange" /> LOCAL PIPELINE
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-6">
                HTV saves submitted profiles straight to your browser standard local session. Use this registry to audit your registered assets locally.
              </p>

              {submissions.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-zinc-800 text-zinc-600 font-mono text-[10px] uppercase">
                  No registered profiles found in storage.
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {submissions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="bg-black border border-zinc-900 p-4 rounded-sm tracking-wide font-mono text-[11px] relative group hover:border-brand-gold/40"
                    >
                      <div className="flex justify-between items-start mb-2 border-b border-zinc-950 pb-2">
                        <span className="text-brand-orange font-bold font-mono">
                          {sub.id}
                        </span>
                        <span className="text-[9px] bg-zinc-900 px-1.5 py-0.5 rounded-sm text-zinc-400 capitalize">
                          {sub.category}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-white font-bold text-xs uppercase">
                          {sub.fullName}
                        </div>
                        {sub.organization && (
                          <div className="text-zinc-500">
                            ORG: {sub.organization.toUpperCase()}
                          </div>
                        )}
                        <div className="text-zinc-400">
                          SPORT: {sub.sport.toUpperCase()}
                        </div>
                        <div className="text-zinc-500">
                          LOC: {sub.location.toUpperCase()}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-2 border-t border-zinc-900/60 pt-2">
                          SUBMITTED: {sub.createdAt}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleClearHistory}
                    className="w-full py-2 bg-zinc-950 border border-zinc-900 hover:border-red-650 hover:text-red-500 text-zinc-500 font-mono text-[9px] tracking-widest uppercase"
                  >
                    RESET APPLICATIONS
                  </button>
                </div>
              )}
            </div>

            {/* BRANDING STRATEGIC NOTES */}
            <div className="bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-900 p-6 rounded-sm space-y-4">
              <span className="inline-block bg-brand-gold/25 text-brand-gold font-bold px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase rounded-sm">
                ELITE MEMORANDUM
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                By entering this system, schools, clubs, and athlete identities unlock premium advisory reviews. All data profiles remain protected under global encryption rules.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
