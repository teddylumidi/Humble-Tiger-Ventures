import { useState } from "react";
import Ticker from "./components/Ticker";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import LiveStream from "./components/LiveStream";
import RegistrationForm from "./components/RegistrationForm";
import NewsFeed from "./components/NewsFeed";
import Footer from "./components/Footer";
import VideoLightbox from "./components/VideoLightbox";
import WhatsAppChat from "./components/WhatsAppChat";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({
    title: "",
    duration: "",
    thumbnail: "",
    views: "",
  });

  const triggerVideoLightbox = (title: string, duration: string, thumbnail: string, views: string) => {
    setLightboxData({ title, duration, thumbnail, views });
    setLightboxOpen(true);
  };

  // Helper to scroll to specific elements on Home page
  const scrollToElement = (id: string) => {
    // If we're not on home, switch to home first, then scroll
    if (activeTab !== "home") {
      setActiveTab("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-orange selection:text-black flex flex-col justify-between" id="applet-viewport">
      
      {/* GLOBAL TICKER BAR */}
      <Ticker />

      {/* HEADER NAVIGATION */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN LAYOUT CANVAS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* HEROS EPIC ZONE */}
              <Hero onNavigate={setActiveTab} onScrollToElement={scrollToElement} />
              
              {/* PARTNERS TICKER */}
              <Partners />

              {/* POWER NARRATIVE STORY */}
              <About />

              {/* CORE SERVICES GRID */}
              <Services />

              {/* RESULTS CASE PORTFOLIO */}
              <Portfolio />

              {/* PREMIUM CLIENTS TESTIMONIALS */}
              <Testimonials />
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <NewsFeed />
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Portfolio />
            </motion.div>
          )}

          {activeTab === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <LiveStream onWatchArchive={triggerVideoLightbox} />
            </motion.div>
          )}

          {activeTab === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <RegistrationForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* GLOBAL WHATSAPP HELPDESK OPERATIONAL BALLPOINT */}
      <WhatsAppChat />

      {/* FOOTER DIRECTORY */}
      <Footer onNavigate={setActiveTab} />

      {/* GLOBAL CINEMATIC VIDEO LIGHTBOX PLATFORM */}
      <VideoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        videoTitle={lightboxData.title}
        videoDuration={lightboxData.duration}
        videoThumbnail={lightboxData.thumbnail}
        videoViews={lightboxData.views}
      />
    </div>
  );
}
