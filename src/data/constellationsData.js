const base = process.env.PUBLIC_URL + "/icons/";

const constellations = [
  {
    id: "python",
    name: "Python",
    color: "#61dafb",
    icon: base + "python-icon.png",
    position: [-4, 0.5, 0],
    size: 3,
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
    icon: base + "ai-icon.png",
    position: [0, -3, -1],
    size: 3.5,
    points: [
      [0, 0.0, 0],
      [1.1, -0.2, 0.4],
      [0.5, 0.8, -0.2],
      [-0.8, 0.6, 0.2]
    ],
    connections: [[0,1],[0,2],[2,3]]
  },
  {
    id: "cpp",
    name: "C++",
    color: "#86efac",
    icon: base + "cpp-icon.png",
    position: [4, 1, -0.5],
    size: 3.2,
    points: [
      [0, 0, 0],
      [0.7, 0.9, 0.2],
      [0.8, -0.6, 0],
      [-0.5, 0.5, -0.2]
    ],
    connections: [[0,1],[0,2],[2,3]]
  },
  {
    id: "ansible",
    name: "Ansible",
    color: "#ffd166",
    icon: base + "ansible-icon.png",
    position: [0, 3.2, 0.5],
    size: 3.0,
    points: [
      [0, 0, 0],
      [0.6, 0.5, 0.1],
      [-0.7, 0.4, -0.2]
    ],
    connections: [[0,1],[0,2]]
  },
  {
    id: "automation",
    name: "Automation",
    color: "#7dd3fc",
    icon: base + "automation-icon.png",
    position: [-3.8, -2.6, 0.3],
    size: 3.5,
    points: [
      [0,0,0],
      [0.4,0.8,0.2],
      [-0.5,0.6,-0.1]
    ],
    connections: [[0,1],[0,2]]
  }
];

export default constellations;
