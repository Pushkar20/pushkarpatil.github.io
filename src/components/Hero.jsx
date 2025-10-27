import React from "react";
import { motion } from "framer-motion";
import HeroGameCanvas from "./HeroGameCanvas"; // if you use the mini-game on left

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen text-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #071021 0%, rgba(7, 16, 33, 0) 85%)",
      }}
    >
      {/* left side (game or visual) */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        {/* put your mini-game / decorative canvas here */}
        <HeroGameCanvas />
      </div>

      {/* right side - text */}
      <div className="w-full md:w-1/2 flex flex-col items-start md:items-start text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Pushkar Patil
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mt-4 text-lg text-gray-300 max-w-xl"
        >
          Software Developer • Embedded Systems • Automotive Software
        </motion.p>

        <div className="mt-8">
          <a
            href={process.env.PUBLIC_URL + "/Resume_Pushkar_Patil.pdf"}
            download
            className="inline-flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-full shadow-lg hover:scale-[1.01] transition"
            style={{ minWidth: 220 }}
          >
            <img src={process.env.PUBLIC_URL + "/icons/pdf-icon.gif"} alt="pdf" style={{ width: 20, height: 20 }} />
            <span className="font-semibold">Download PDF Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
