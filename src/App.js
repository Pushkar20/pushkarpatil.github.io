import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StarryBackground from "./components/StarryBackground";
import NeuralSkillMap from "./components/NeuralSkillMap";

function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'OstrichSansFont';
        src: url(${process.env.PUBLIC_URL}/fonts/OstrichSansInline-Regular.otf) format('opentype');
      }
      @font-face {
        font-family: 'SoriaFont';
        src: url(${process.env.PUBLIC_URL}/fonts/soria-font.ttf) format('truetype');
      }
      @font-face {
        font-family: 'SkyscrapersFont';
        src: url(${process.env.PUBLIC_URL}/fonts/Skyscapers.ttf) format('truetype');
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="relative bg-gray-950 text-gray-100 min-h-screen overflow-hidden">
      <StarryBackground /> {/* 🌌 Global animated background */}
      <div className="relative z-10">
        {/* Foreground Content */}
        <Navbar />
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience" className="section section-blend">
          <h2 className="h-section-title">Experience</h2>
          <div className="glass p-6">
            {/* your scrollable Experience card area */}
            <Experience />
          </div>
        </section>

        <section id="skills" className="section section-blend">
          <h2 className="h-section-title">Skills</h2>
          <div className="flex items-center justify-end gap-3">
            <span className="text-sm text-muted mr-2">Play mode</span>
            <input type="checkbox" id="play" className="toggle-checkbox" />
          </div>

          <div className="glass p-6">
            {/* insert your 3D canvas component or skill orbs here */}
            <NeuralSkillMap styleHeight="420px" />
          </div>
        </section>

        <section id="projects" className="section section-blend">
          <h2 className="h-section-title">Projects</h2>
          <div>
            {/* your project cards - make each card .glass and smaller padding */}
            <Projects />
          </div>
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
