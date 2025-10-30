const base = process.env.PUBLIC_URL + "/images/";

export const projectsData = [
  {
    title: "Transmission Manager in IDC - ADAS",
    description:
      "ADAS Development: Designed and validated ADAS software modules, building automation frameworks and diagnostic tools, while integrating CAN and Ethernet for scalable system-level validation.",
    image: base + "mercedes-banner.jpg",
    tech: ["C++", "Python", "CAPL", "HIL/SIL"],
  },
  {
    title: "MTTF",
    description:
      "Testbench Infrastructure: Built and currently own a farm of 100+ automated testbenches, enabling CI/CD-driven testing, automated reservations, high reliability, and self-healing workflows.",
    image: base + "canoe-icon.png",
    tech: ["Python", "Ansible", "CI/CD", "AWX", "GenAI"],
  },
  {
    title: "Prostate cancer detection",
    description:
      "Developed segmentation and classification based Deep Learning Algorithms for detection of prostate cancer. Published the findings and research work as a book-chapter.",
    image: base + "canoe-icon.png",
    tech: ["ML/DL", "Image Processing", "MRI scan"],
    visit: "https://iopscience.iop.org/book/edit/978-0-7503-5924-5/chapter/bk978-0-7503-5924-5ch7",
    // source: "https://github.com/yourusername/physoxy",
  },
  {
    title: "Home Automation using IoT",
    description:
      "Built home automating solutions using ESP microcontroller, Embedded C/C++, and AWS.",
    image: base + "canoe-icon.png",
    tech: ["Embedded C/C++", "AWS", "Microcontrollers"],
  },
  {
    title: "Pushkar Patil Resume",
    description:
      "My portfolio built with React. Showcases my skills, projects, and experience.",
    image: base + "canoe-icon.png",
    tech: ["React", "Node.js", "JavaScript", "Tailwind CSS"],
    visit: "https://pushkar20.github.io/pushkarpatil.github.io/",
    source: "https://github.com/Pushkar20/pushkarpatil.github.io",
  },
];
