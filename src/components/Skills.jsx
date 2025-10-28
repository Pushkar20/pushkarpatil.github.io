import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import skillsData from "../data/skillsData";

/* ---------- FLOATING POINT ---------- */
function FloatingPoint({ pos, color, hovered, onPointerOver, onPointerOut }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current)
      ref.current.position.y = pos[1] + Math.sin(t * 0.6 + offset) * 0.07;
  });
  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <sphereGeometry args={[hovered ? 0.18 : 0.12, 16, 16]} />
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={hovered ? 2 : 0.9}
        color={hovered ? "#ffffff" : color}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

/* ---------- CONSTELLATION ---------- */
function Constellation({ data }) {
  const group = useRef();
  const icon = useLoader(TextureLoader, data.icon);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [hovered, setHovered] = useState(false);

  const points = useMemo(
    () =>
      Array.from({ length: 6 }, () => [
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
      ]),
    [data.id]
  );

  const connections = useMemo(() => {
    const arr = [];
    for (let i = 0; i < points.length - 1; i++) arr.push([i, i + 1]);
    return arr;
  }, [points]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.05) * 0.02;
      group.current.rotation.x = Math.sin(t * 0.04) * 0.015;
    }
  });

  return (
    <group ref={group} position={data.position}>
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={icon}
          transparent
          opacity={hovered ? 0.3 : 0.22}
          toneMapped={false}
        />
      </mesh>

      {connections.map((c, i) => (
        <Line
          key={i}
          points={[points[c[0]], points[c[1]]]}
          color="#ffffff"
          lineWidth={0.6}
          opacity={hovered ? 0.45 : 0.22}
        />
      ))}

      {points.map((p, i) => (
        <FloatingPoint
          key={i}
          pos={p}
          color={data.color}
          hovered={hoverIndex === i}
          onPointerOver={() => {
            setHoverIndex(i);
            setHovered(true);
          }}
          onPointerOut={() => {
            setHoverIndex(-1);
            setHovered(false);
          }}
        />
      ))}

      <Html position={[0, -1.6, 0]} center>
        <div
          style={{
            color: data.color,
            fontWeight: 700,
            textAlign: "center",
            textShadow: "0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          {data.name}
        </div>
      </Html>
    </group>
  );
}

/* ---------- DRAGGABLE STAR ---------- */
function FloatingSkillStar({ skill, onUpdatePosition, controlsRef }) {
  const ref = useRef();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const texture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/star-glow.png");
  const startZ = skill.position[2];
  const lerpTarget = useRef(new THREE.Vector3(...skill.position));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const idleOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useEffect(() => {
    if (ref.current) ref.current.position.set(...skill.position);
  }, [skill.position]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const baseY = skill.position[1] + Math.sin(t * 0.5 + idleOffset) * 0.06;
    const pulse = 0.8 + Math.sin(t * 2 + idleOffset) * 0.12;

    if (ref.current?.children?.[0]) {
      ref.current.children[0].material.opacity = hovered ? 1 : 0.75 * pulse;
    }

    if (!dragging) {
      lerpTarget.current.y = baseY;
    }
    if (ref.current) ref.current.position.lerp(lerpTarget.current, 0.22);
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    controlsRef.current.enabled = false;
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    raycaster.setFromCamera(e.pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -startZ);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);
    if (intersection) {
      intersection.z = startZ;
      lerpTarget.current.copy(intersection);
      onUpdatePosition(skill.id, [intersection.x, intersection.y, intersection.z]);
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    controlsRef.current.enabled = true;
  };

  return (
    <group
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <sprite scale={[1, 1, 1]}>
        <spriteMaterial
          map={texture}
          color={skill.color}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <Html distanceFactor={10} position={[0, -0.6, 0]}>
        <div
          style={{
            color: "white",
            background: "rgba(0,0,0,0.55)",
            padding: "6px 10px",
            borderRadius: 8,
            fontSize: 14,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

/* ---------- BACKGROUND STARS ---------- */
function Stars({ count = 80 }) {
  const points = useMemo(
    () =>
      Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        -5 - Math.random() * 10,
      ]),
    [count]
  );
  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.02 + Math.random() * 0.03, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- STATIC VIEW ---------- */
function StaticSkillsView() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-10 text-gray-300">
        {skillsData.map((cat, i) => (
          <div key={i} className="mb-8 text-left">
            <h3 className="text-lg font-semibold mb-2 tracking-wide text-cyan-400">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 bg-gray-800/40 px-2 py-2 rounded-lg"
                >
                  <img src={s.icon} alt={s.name} className="w-5 h-5 object-contain opacity-90" />
                  <span className="text-gray-300 text-sm">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function Skills() {
  const [playMode, setPlayMode] = useState(false);
  const controlsRef = useRef();

  const constellations = useMemo(
    () =>
      skillsData.flatMap((cat, i) =>
        cat.skills.filter((s) => s.isConstellation).map((s, idx) => ({
          ...s,
          position: [(idx - 2) * 3.5, (i - 2) * 0.5, 0],
        }))
      ),
    []
  );

  const extraSkills = useMemo(
    () =>
      skillsData.flatMap((cat) => cat.skills.filter((s) => !s.isConstellation)),
    []
  );

  const [skillPositions, setSkillPositions] = useState([]);

  useEffect(() => {
    // Randomly position non-constellation skills avoiding collisions
    const positions = extraSkills.map((skill) => {
      let pos;
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 200) {
        pos = [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 2,
        ];
        valid = constellations.every(
          (c) =>
            Math.hypot(pos[0] - c.position[0], pos[1] - c.position[1]) > 2.5
        );
        attempts++;
      }
      if (!pos) pos = [0, 0, 0];
      return { ...skill, position: pos };
    });
    setSkillPositions(positions);
  }, []);

  const updatePosition = (id, newPos) => {
    setSkillPositions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, position: newPos } : s))
    );
  };

  return (
    <section className="relative min-h-[90vh] py-12 flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-6xl px-8 mb-6">
        <h2 className="text-3xl font-bold text-cyan-400">Skills</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Play mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={playMode}
              onChange={() => setPlayMode(!playMode)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></span>
          </label>
        </div>
      </div>

      {playMode ? (
        <div style={{ width: "100%", height: "85vh", position: "relative" }}>
          <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.6} />

            {constellations.map((c) => (
              <Constellation key={c.id} data={c} />
            ))}
            {skillPositions.map((skill) => (
              <FloatingSkillStar
                key={skill.id}
                skill={skill}
                onUpdatePosition={updatePosition}
                controlsRef={controlsRef}
              />
            ))}
            <Stars count={80} />
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </div>
      ) : (
        <StaticSkillsView />
      )}
    </section>
  );
}
