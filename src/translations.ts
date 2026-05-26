export interface TranslationSet {
  navHome: string;
  navNews: string;
  navCampaigns: string;
  navLive: string;
  navJoin: string;
  heroSub: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  registrationTitle: string;
  registrationSub: string;
  formName: string;
  formOrganization: string;
  formSport: string;
  formLocation: string;
  formEmail: string;
  formPhone: string;
  formWhatsApp: string;
  formGoals: string;
  formSubmitBtn: string;
  countdownNextMatch: string;
  multilinksTitle: string;
  liveHeader: string;
  liveSub: string;
  watchLiveBadge: string;
}

export const TRANSLATIONS: Record<string, TranslationSet> = {
  en: {
    navHome: "Home",
    navNews: "Sports Hub",
    navCampaigns: "Campaigns",
    navLive: "Live Broadcast",
    navJoin: "Join HTV Network",
    heroSub: "THE FRANCHISE ARCHITECT",
    heroTitle1: "BUILDING ELITE",
    heroTitle2: "SPORTS LEGACIES",
    heroDesc: "Humble Tiger Ventures is a high-octane sports branding agency, media catalog hub, and sponsorship activation powerhouse across African and European markets.",
    registrationTitle: "JOIN THE TIGER ARCHITECTURE",
    registrationSub: "Apply below to register as an athlete, club, school, or brand partner. Our commercial board reviews allocations weekly.",
    formName: "Name / Contact Party *",
    formOrganization: "Nominal Organization / Institution *",
    formSport: "Discipline Sport Archetype *",
    formLocation: "Geographic Base or Country *",
    formEmail: "Email Address *",
    formPhone: "Mobile Telephone *",
    formWhatsApp: "WhatsApp Connect",
    formGoals: "Core Brand Goals & Current Accomplishments *",
    formSubmitBtn: "Submit To Humble Tiger Network",
    countdownNextMatch: "Lagos Grand Derby: Tigers vs Wolves",
    multilinksTitle: "Stream & Broadcast Across Multi-Platforms",
    liveHeader: "HTV PRESS STREAM",
    liveSub: "Access elite high school matchups, athlete showcases, and championship tournaments live. Toggle stream sources below.",
    watchLiveBadge: "WATCH ACTIVE CHANNELS"
  },
  sw: {
    navHome: "Nyumbani",
    navNews: "Habari za Michezo",
    navCampaigns: "Kampeni Zetu",
    navLive: "Matangazo Live",
    navJoin: "Jiunge nasi leo",
    heroSub: "MISINGI WA MICHEZO ELITE",
    heroTitle1: "KUENDA KILELENI",
    heroTitle2: "URITHI WA MICHEZO AHADI",
    heroDesc: "Humble Tiger Ventures ni shirika la kisasa la kukuza chapa za michezo, ushirikiano wa wadhamini, na usambazaji wa habari za michezo katika masoko ya Afrika na Ulaya.",
    registrationTitle: "JIUNGE NA FAMILIA YA TIGER",
    registrationSub: "Tuma maombi yako hapa chini ili kujisajili kama mwanamichezo, klabu, shule, au mdhamini. Bodi yetu hukagua maombi kila wiki.",
    formName: "Jina Kamili la Mwasiliani *",
    formOrganization: "Jina la Taasisi / Shule / Klabu *",
    formSport: "Aina ya Michezo Unayocheza *",
    formLocation: "Eneo au Nchi Unamoishi *",
    formEmail: "Barua Pepe *",
    formPhone: "Nambari ya Simu *",
    formWhatsApp: "Unganisho la WhatsApp",
    formGoals: "Malengo Kuu ya Chapa na Mafanikio yako ya Sasa *",
    formSubmitBtn: "Tuma Maombi kwa Mtandao wa Tiger",
    countdownNextMatch: "Dabi Kuu ya Lagos: Tigers vs Wolves",
    multilinksTitle: "Tiririsha na Utazame kwenye Majukwaa Yote",
    liveHeader: "SEKTA YA MATANGAZO YA LIVE YA HTV",
    liveSub: "Tazama mabeki hodari shuleni, wanariadha chipukizi, na michezo yote ya ubingwa wa shule moja kwa moja.",
    watchLiveBadge: "ANGALIA VITUO LIVE"
  }
};
