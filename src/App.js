import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <Navbar />

      <main className="flex flex-col items-center">
        <section id="hero">
          <Hero />
        </section>

        <section id="about" className="w-full">
          <About />
        </section>

        <section id="skills" className="w-full">
          <Skills />
        </section>

        <section id="projects" className="w-full">
          <Projects />
        </section>

        <section id="contact" className="w-full">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
