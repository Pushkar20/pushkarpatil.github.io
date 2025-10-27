import React from "react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full glass z-50 px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide text-cyan-400">Pushkar Patil</h1>
      <ul className="flex space-x-6">
        {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
