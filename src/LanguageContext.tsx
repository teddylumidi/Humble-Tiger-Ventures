import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TRANSLATIONS, TranslationSet } from "./translations";

interface LanguageContextType {
  lang: "en" | "sw";
  setLang: (lang: "en" | "sw") => void;
  t: (key: keyof TranslationSet) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"en" | "sw">(() => {
    const saved = localStorage.getItem("htv_lang");
    return (saved === "en" || saved === "sw") ? saved : "en";
  });

  const setLang = (newLang: "en" | "sw") => {
    setLangState(newLang);
    localStorage.setItem("htv_lang", newLang);
  };

  const t = (key: keyof TranslationSet): string => {
    const set = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return set[key] || TRANSLATIONS.en[key] || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
