// src/data/constellationsData.js
// Positions are in 3D space (x,y,z). Tune positions to taste.
// Icons should be placed in public/icons/ (PNG or SVG). Use lowercase filenames.

const base = process.env.PUBLIC_URL + "/icons/";

const constellations = [
  {
    id: "programming",
    name: "Programming",
    color: "#61dafb",
    icon: base + "python-icon.png",          // faint background image (replace per skill)
    position: [-4, 0.5, 0],
    points: [
      [0.0, 0.0, 0.0],
      [0.9, 0.1, 0.2],
      [0.45, -0.5, -0.1],
      [-0.6, -0.3, 0.1],
      [-1.2, 0.2, -0.2],
    ],
    connections: [[0,1],[1,2],[2,3],[3,4]]
  },
  {
    id: "ai",
    name: "AI / ML",
    color: "#c084fc",
    icon: base + "brain-icon.png",
    position: [0, -3, -1],
    points: [
      [0, 0.0, 0],
      [1.1, -0.2, 0.4],
      [0.5, 0.8, -0.2],
      [-0.8, 0.6, 0.2]
    ],
    connections: [[0,1],[0,2],[2,3]]
  },
  {
    id: "systems",
    name: "Systems",
    color: "#86efac",
    icon: base + "circuit-icon.png",
    position: [4, 1, -0.5],
    points: [
      [0, 0, 0],
      [0.7, 0.9, 0.2],
      [0.8, -0.6, 0],
      [-0.5, 0.5, -0.2]
    ],
    connections: [[0,1],[0,2],[2,3]]
  },
  {
    id: "tools",
    name: "Tools",
    color: "#ffd166",
    icon: base + "tools-icon.png",
    position: [0, 3.2, 0.5],
    points: [
      [0, 0, 0],
      [0.6, 0.5, 0.1],
      [-0.7, 0.4, -0.2]
    ],
    connections: [[0,1],[0,2]]
  },
  {
    id: "testing",
    name: "Testing",
    color: "#7dd3fc",
    icon: base + "test-icon.png",
    position: [-3.8, -2.6, 0.3],
    points: [
      [0,0,0],
      [0.4,0.8,0.2],
      [-0.5,0.6,-0.1]
    ],
    connections: [[0,1],[0,2]]
  }
];

export default constellations;
