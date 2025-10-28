const base = process.env.PUBLIC_URL + "/icons/";

const skillsData = [
  {
    category: "PROGRAMMING",
    skills: [
      { id: "python", name: "Python", color: "#61dafb", icon: base + "python-icon.png", isConstellation: true },
      { id: "cpp", name: "C/C++", color: "#86efac", icon: base + "cpp-icon.png", isConstellation: true },
      { id: "capl", name: "CAPL", color: "#ffd166", icon: base + "capl-icon.png", isConstellation: false },
      { id: "js", name: "JavaScript (Basics)", color: "#facc15", icon: base + "js-icon.png", isConstellation: false },
      { id: "ansible", name: "Ansible", color: "#ffbb55", icon: base + "ansible-icon.png", isConstellation: true },
      { id: "shell", name: "Shell Scripting", color: "#c084fc", icon: base + "shell-icon.png", isConstellation: false },
    ],
  },
  {
    category: "TOOLS & FRAMEWORKS",
    skills: [
      { id: "canoe", name: "CANoe", color: "#60a5fa", icon: base + "canoe-icon.png", isConstellation: false },
      { id: "pytest", name: "PyTest", color: "#f472b6", icon: base + "pytest-icon.png", isConstellation: false },
      { id: "git", name: "Git", color: "#f1502f", icon: base + "git-icon.png", isConstellation: false },
      { id: "agile", name: "Agile", color: "#9ca3af", icon: base + "agile-icon.png", isConstellation: false },
      { id: "vsdlc", name: "V-SDLC", color: "#67e8f9", icon: base + "v-model-icon.png", isConstellation: false },
      { id: "jenkins", name: "Jenkins / GitLab CI (Pipeline Automation)", color: "#ef4444", icon: base + "jenkins-icon.png", isConstellation: false },
    ],
  },
  {
    category: "SYSTEMS & PLATFORMS",
    skills: [
      { id: "adas", name: "ADAS", color: "#a78bfa", icon: base + "adas-icon.png", isConstellation: false },
      { id: "iot", name: "IoT Development", color: "#4ade80", icon: base + "iot-icon.png", isConstellation: false },
      { id: "esp", name: "ESP Microcontrollers", color: "#f59e0b", icon: base + "esp-icon.png", isConstellation: false },
      { id: "aws", name: "AWS", color: "#f97316", icon: base + "aws-icon.png", isConstellation: false },
      { id: "silhil", name: "SIL/HIL", color: "#38bdf8", icon: base + "silhil-icon.png", isConstellation: false },
      { id: "automation", name: "Testbench Infrastructure Automation", color: "#e879f9", icon: base + "automation-icon.png", isConstellation: false },
    ],
  },
  {
    category: "AI/ML TOOLS",
    skills: [
      { id: "tensorflow", name: "TensorFlow", color: "#ff6f00", icon: base + "tensorflow-icon.png", isConstellation: false },
      { id: "pytorch", name: "PyTorch", color: "#ef4444", icon: base + "pytorch-icon.png", isConstellation: false },
      { id: "opencv", name: "OpenCV", color: "#22d3ee", icon: base + "opencv-icon.png", isConstellation: false },
      { id: "pandas", name: "Pandas", color: "#3b82f6", icon: base + "pandas-icon.png", isConstellation: false },
      { id: "numpy", name: "NumPy", color: "#60a5fa", icon: base + "numpy-icon.png", isConstellation: false },
    ],
  },
  {
    category: "TESTING & VERIFICATION",
    skills: [
      { id: "frameworkdev", name: "Automation Framework Development", color: "#84cc16", icon: base + "framework-icon.png", isConstellation: false },
      { id: "systemvalidation", name: "System Validation", color: "#22c55e", icon: base + "validation-icon.png", isConstellation: false },
      { id: "monitoring", name: "Infrastructure Monitoring & Self-Healing Systems", color: "#eab308", icon: base + "monitoring-icon.png", isConstellation: false },
    ],
  },
];

export default skillsData;
