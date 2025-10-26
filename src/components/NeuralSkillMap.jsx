import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html, Line, useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import constellations from "../data/constellationsData";
import extraSkills from "../data/extraSkills";

/* ---------- FLOATING POINT (constellation small dots) ---------- */
function FloatingPoint({ pos, color, hovered, onPointerOver, onPointerOut }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.position.y = pos[1] + Math.sin(t * 0.6 + offset) * 0.07;
  });

  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      castShadow={false}
      receiveShadow={false}
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

/* ---------- CONSTELLATION CLUSTER ---------- */
function Constellation({ data }) {
  const group = useRef();
  const icon = useTexture(data.icon);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [hovered, setHovered] = useState(false);

  const absPoints = useMemo(
    () =>
      data.points.map((p) => [
        p[0] + data.position[0],
        p[1] + data.position[1],
        p[2] + data.position[2],
      ]),
    [data]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.05 + data.position[0]) * 0.02;
      group.current.rotation.x = Math.sin(t * 0.04 + data.position[1]) * 0.015;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[data.position[0], data.position[1], data.position[2] - 1.2]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial map={icon} transparent opacity={hovered ? 0.30 : 0.22} toneMapped={false} />
      </mesh>

      {data.connections.map((c, i) => {
        const p0 = absPoints[c[0]];
        const p1 = absPoints[c[1]];
        return <Line key={i} points={[p0, p1]} color={"#ffffff"} lineWidth={0.6} opacity={hovered ? 0.45 : 0.22} />;
      })}

      {absPoints.map((p, i) => (
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

      <Html position={[data.position[0], data.position[1] - 1.6, data.position[2]]} center>
        <div style={{ color: data.color, textAlign: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, textShadow: "0 0 12px rgba(0,0,0,0.5)" }}>
          {data.name}
        </div>
      </Html>
    </group>
  );
}

/* ---------- DRAGGABLE BIG STAR (robust, no jitter) ---------- */
function FloatingSkillStar({ skill, onUpdatePosition, controlsRef }) {
  const ref = useRef();
  const { camera } = useThree();
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  // stable start Z and lerp target
  const startZ = useMemo(() => skill.position[2], [skill.position]);
  const lerpTarget = useRef(new THREE.Vector3(...skill.position));
  // offset between pointer intersection and object center in world coords
  const worldOffset = useRef(new THREE.Vector3(0, 0, 0));
  // raycaster reused
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const idleOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  // load glowing star texture (place in public/textures/star-glow.png)
  const texture = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/star-glow.png"
  );

  // ensure mesh initially sits at skill.position (keeps sync)
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(skill.position[0], skill.position[1], skill.position[2]);
      lerpTarget.current.set(skill.position[0], skill.position[1], skill.position[2]);
    }
  }, [skill.position]);

  // smooth lerp each frame
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const baseY = skill.position[1] + Math.sin(t * 0.5 + idleOffset) * 0.06;

    // subtle pulse shimmer
    const pulse = 0.8 + Math.sin(t * 2 + idleOffset) * 0.12;
    if (ref.current?.children?.[0]) {
      ref.current.children[0].material.opacity = hovered ? 1.0 : 0.75 * pulse;
      ref.current.children[0].scale.setScalar(1.0 + 0.1 * Math.sin(t * 2 + idleOffset));
    }

    if (!dragging) {
      // when not dragging keep lerpTarget near skill position+idle
      lerpTarget.current.x = skill.position[0];
      lerpTarget.current.y = baseY;
      lerpTarget.current.z = startZ;
    }

    if (ref.current) {
      // lerp with smoothing factor
      ref.current.position.lerp(lerpTarget.current, 0.22);
    }
  });

  // pointer down: compute stable offset and start dragging
  const handlePointerDown = (e) => {
    e.stopPropagation();
    // disable orbit controls while dragging
    if (controlsRef?.current) controlsRef.current.enabled = false;

    setDragging(true);
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (err) {}

    // intersection point (world)
    const p = e.point.clone ? e.point.clone() : new THREE.Vector3().copy(e.point);
    // store offset = objectPos - intersection
    if (ref.current) {
      worldOffset.current.subVectors(ref.current.position, p);
    } else {
      worldOffset.current.set(0, 0, 0);
    }
  };

  // pointer move: raycast and compute new world pos constrained to same Z
  const handlePointerMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();

    // Use e.ray / e.point where available. e.point is reliable for intersection with our mesh.
    // But to be extra robust we compute a ray from camera through screen coords and intersect with a Z-plane at startZ.
    const pointer = e.pointer; // { x, y } in normalized device coords provided by drei
    // set ray from camera through pointer
    raycaster.setFromCamera(pointer, camera);
    // create plane z = startZ
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -startZ);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    if (intersection) {
      // apply offset so object doesn't jump
      intersection.add(worldOffset.current);
      // lock z to startZ
      intersection.z = startZ;
      lerpTarget.current.copy(intersection);
      // do NOT spam parent state continuously — we only call update at release to persist final position.
      // If you want live updates, you can uncomment the next line, but it may cause more re-renders:
      // onUpdatePosition(skill.id, [intersection.x, intersection.y, intersection.z]);
    }
  };

  // pointer up: end dragging; persist final position
  const handlePointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (err) {}
    // re-enable orbit controls
    if (controlsRef?.current) controlsRef.current.enabled = true;
    // persist final position to parent
    if (lerpTarget.current) {
      onUpdatePosition(skill.id, [lerpTarget.current.x, lerpTarget.current.y, lerpTarget.current.z]);
    }
  };

  return (
    <group
      ref={ref}
      position={skill.position}
      onPointerOver={(evt) => { evt.stopPropagation(); setHovered(true); }}
      onPointerOut={(evt) => { evt.stopPropagation(); setHovered(false); }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* --- Glowing sprite star replaces sphere mesh --- */}
      <sprite scale={[0.9, 0.9, 0.9]}>
        <spriteMaterial
          map={texture}
          color={skill.color}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* --- Floating label below star --- */}
      <Html distanceFactor={10} position={[0, -0.6, 0]}>
        <div style={{
          color: "white",
          background: "rgba(0,0,0,0.55)",
          padding: "6px 10px",
          borderRadius: 8,
          fontSize: 14,
          textAlign: "center",
          pointerEvents: "none",
          transform: `scale(${hovered ? 1.08 : 1})`,
          transition: "transform 0.16s"
        }}>
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

/* ---------- MAIN SCENE ---------- */
export default function NeuralConstellation({ styleHeight = "80vh" }) {
  const [skillPositions, setSkillPositions] = useState([]);
  const controlsRef = useRef();

  // initial non-overlapping placement (runs once)
  useEffect(() => {
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
        valid = constellations.every((c) => Math.hypot(pos[0] - c.position[0], pos[1] - c.position[1]) > 2.5);
        attempts++;
      }
      if (!pos) pos = [0, 0, 0];
      return { ...skill, position: pos };
    });
    setSkillPositions(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePosition = (id, newPos) => {
    setSkillPositions((prev) => prev.map((s) => (s.id === id ? { ...s, position: newPos } : s)));
  };

  const resetPositions = () => window.location.reload();

  return (
    <div style={{ width: "100%", height: styleHeight, position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />

        {/* constellations */}
        {constellations.map((c) => <Constellation key={c.id} data={c} />)}

        {/* draggable extra stars */}
        {skillPositions.map((skill) => (
          <FloatingSkillStar key={skill.id} skill={skill} onUpdatePosition={updatePosition} controlsRef={controlsRef} />
        ))}

        <Stars count={80} />

        <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} rotateSpeed={0.4} enableDamping dampingFactor={0.05} />
      </Canvas>

      <div style={{ position: "absolute", top: 16, width: "100%", textAlign: "center", color: "rgba(120,230,255,0.95)", fontSize: 28, fontWeight: 800 }}>
        Skill Tree 🎄
      </div>

      <button onClick={resetPositions} style={{ position: "absolute", bottom: 20, right: 20, background: "rgba(30,30,30,0.72)", color: "white", border: "1px solid rgba(255,255,255,0.18)", padding: "8px 12px", borderRadius: 8, cursor: "pointer", backdropFilter: "blur(4px)", fontWeight: 600 }}>
        Reset
      </button>
    </div>
  );
}

/* ---------- BACKGROUND STARS ---------- */
function Stars({ count = 80 }) {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) arr.push([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, -5 - Math.random() * 10]);
    return arr;
  }, [count]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.02 + Math.random() * 0.03, 6, 6]} />
          <meshBasicMaterial color={"#ffffff"} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
