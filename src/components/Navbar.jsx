import React from "react";

function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-40 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#hero" className="text-lg font-heading accent">Pushkar Patil</a>
        <div className="flex items-center gap-3">
          <a href="#about" className="text-sm text-muted hover:accent transition">About</a>
          <a href="#skills" className="text-sm text-muted hover:accent transition">Skills</a>
          <a href="#projects" className="text-sm text-muted hover:accent transition">Projects</a>
          <a href="#contact" className="text-sm text-muted hover:accent transition">Contact</a>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
