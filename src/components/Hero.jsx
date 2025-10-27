import React from "react";
import HeroGameCanvas from "./HeroGameCanvas";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen text-center md:text-left overflow-hidden"
    >
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <HeroGameCanvas />
      </div>

      <div className="md:w-1/2 px-6 md:pl-12">
        <h1 className="text-5xl font-bold text-[#8BE0FF] mb-4">
          Pushkar Patil
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Software Developer · Embedded Systems · Automotive Software
        </p>

        {/* --- Download Resume Button --- */}
        <a
            href={`${process.env.PUBLIC_URL}/Resume_Pushkar_Patil.pdf`}
            download="Resume_Pushkar_Patil.pdf"
            className="inline-flex items-center gap-3 px-5 py-3 bg-white text-gray-800 font-semibold rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-105"
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/pdf-icon.gif`}
            alt="PDF"
            className="w-6 h-6 bg-white rounded-md"
          />
          Download PDF Resume
        </a>
      </div>

      {/* --- Optional background subtle gradient or stars --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b17] to-[#071827] opacity-60 -z-10"></div>
    </section>
  );
}