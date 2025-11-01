import React, { useRef, useEffect, useState } from "react";
import { triggerShootingStars } from "./StarryBackground"; // 👈 Add this import

/**
 * HeroGameCanvas.jsx
 * Small Space-Invaders mini-game for the hero left side.
 *
 * - Starts paused by default (user must press Play)
 * - Reset button reinitializes enemy positions
 * - Enemies are initialized centered so they don't immediately hit edges
 * - update() only runs when `running` is true
 * - Shooting disabled while paused
 */

export default function HeroGameCanvas() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false); // start paused
  const [gameKey, setGameKey] = useState(0); // reset key to re-create the scene
  const [showTitle, setShowTitle] = useState(true); // 👈 controls the title display

  useEffect(() => {
    // local per-effect game state (re-created when gameKey changes)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = null;
    let keys = {};

    // --- Config (tweakable) ---
    const CANVAS_W = canvas.width;
    const CANVAS_H = canvas.height;
    const ENEMY_W = 20;
    const ENEMY_H = 15;
    const ENEMY_ROWS = 4;
    const ENEMY_COLS = 8;
    const ENEMY_HSPACE = 14; // horizontal gap between enemies
    const ENEMY_VSPACE = 28; // vertical gap between rows
    const ENEMY_SPEED = 0.6;
    const SHIP_SPEED = 4;
    const SHIP_W = 30;
    const SHIP_H = 15;

    // --- Dynamic state ---
    let ship = { x: CANVAS_W / 2 - SHIP_W / 2, y: CANVAS_H - 30, width: SHIP_W, height: SHIP_H, speed: SHIP_SPEED };
    let bullets = [];
    let enemies = [];
    let direction = 1; // 1 => right, -1 => left
    let gameWon = false;

    // --- Initialize enemies centered horizontally ---
    const initEnemies = () => {
      enemies = [];
      const totalEnemyWidth = ENEMY_COLS * ENEMY_W + (ENEMY_COLS - 1) * ENEMY_HSPACE;
      const startX = Math.max(16, (CANVAS_W - totalEnemyWidth) / 2); // left margin
      const startY = 30;

      for (let r = 0; r < ENEMY_ROWS; r++) {
        for (let c = 0; c < ENEMY_COLS; c++) {
          enemies.push({ x: startX + c * (ENEMY_W + ENEMY_HSPACE), y: startY + r * ENEMY_VSPACE });
        }
      }

      // reset direction and bullets
      direction = 1;
      bullets = [];
      gameWon = false;
    };
    initEnemies();

    // --- Drawing helpers ---
    const drawBackground = () => {
      // Soft radial gradient background (fade to transparent)
      const gradient = ctx.createRadialGradient(
        CANVAS_W / 2, CANVAS_H / 2, 20,
        CANVAS_W / 2, CANVAS_H / 2,
        Math.max(CANVAS_W, CANVAS_H) * 0.8
      );
      gradient.addColorStop(0, "rgba(10,20,40,0.92)");
      gradient.addColorStop(1, "rgba(10,20,40,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    };

    const drawShip = () => {
      ctx.fillStyle = "#8BE0FF";
      ctx.beginPath();
      ctx.moveTo(ship.x, ship.y);
      ctx.lineTo(ship.x + ship.width / 2, ship.y - ship.height);
      ctx.lineTo(ship.x + ship.width, ship.y);
      ctx.closePath();
      ctx.fill();
    };

    const drawBullets = () => {
      ctx.fillStyle = "#FFD166";
      bullets.forEach((b) => ctx.fillRect(b.x - 1, b.y, 2, 8));
    };

    const drawEnemies = () => {
      ctx.fillStyle = "#FF66CC";
      enemies.forEach((e) => ctx.fillRect(e.x, e.y, ENEMY_W, ENEMY_H));
    };

    // --- Game logic update (ONLY run when `running === true`) ---
    const update = () => {
      if (gameWon) return;

      if (keys["ArrowLeft"]) ship.x -= ship.speed;
      if (keys["ArrowRight"]) ship.x += ship.speed;
      // clamp ship
      if (ship.x < 0) ship.x = 0;
      if (ship.x > CANVAS_W - ship.width) ship.x = CANVAS_W - ship.width;

      // bullets move
      bullets.forEach((b) => (b.y -= 6));
      bullets = bullets.filter((b) => b.y > -10);

      // enemies move horizontally; check edges using proper margin
      let hitEdge = false;
      const rightLimit = CANVAS_W - 10 - ENEMY_W; // keep a small margin
      const leftLimit = 10;
      enemies.forEach((e) => {
        e.x += ENEMY_SPEED * direction;
        if (e.x > rightLimit || e.x < leftLimit) hitEdge = true;
      });
      if (hitEdge) {
        direction *= -1;
        enemies.forEach((e) => (e.y += 12)); // move down a bit
      }

      // bullet-enemy collision
      bullets.forEach((b) => {
        for (let ei = enemies.length - 1; ei >= 0; ei--) {
          const e = enemies[ei];
          if (b.x > e.x && b.x < e.x + ENEMY_W && b.y < e.y + ENEMY_H && b.y > e.y) {
            enemies.splice(ei, 1);
            b.y = -200; // remove bullet
            break;
          }
        }
      });

      // ✅ Check if all enemies are gone
      if (!gameWon && enemies.length === 0) {
        gameWon = true;
        triggerShootingStars(); // 🎉 reward animation in background
      }
    };

    // --- Draw frame ---
    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawBackground();
      drawShip();
      drawBullets();
      drawEnemies();

      // subtle glow/shadow to blend with page
      ctx.save();
      ctx.shadowColor = "rgba(139,224,255,0.06)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "rgba(255,255,255,0.0)";
      ctx.fillRect(0, 0, 0, 0); // just to keep shadow active if needed
      ctx.restore();
    };

    // --- Main loop ---
    const loop = () => {
      // Only run update when running === true
      if (running) {
        update();
        draw();
      } else {
        // paused: still draw background & static pieces, but do NOT call update
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        drawBackground();
        drawShip();
        drawEnemies();
        // subtle overlay to indicate paused state
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }
      raf = requestAnimationFrame(loop);
    };

    // --- Input handlers ---
    const handleKeyDown = (e) => {
      // allow movement key capture even if paused (so pressing arrow doesn't feel blocked),
      // but only allow shooting when running === true
      keys[e.key] = true;
      if ((e.key === " " || e.key === "ArrowUp") && running)
        bullets.push({ x: ship.x + ship.width / 2, y: ship.y - 10 });
    };
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // pause when tab hidden to save CPU
    const handleVisibility = () => {
      if (document.hidden) {
        // pause silently on tab switch
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // start loop
    loop();

    // cleanup effect
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, gameKey]); // re-create when running toggles or reset pressed

  // --- Controls used by UI ---
  const handleReset = () => {
    // re-create the whole effect by bumping key
    setGameKey((k) => k + 1);
    // keep in paused state after reset (good UX)
    setRunning(false);
  };

  const togglePlay = () => {
    setRunning((r) => {
      const next = !r;
      setShowTitle(!next); // hide when playing, show when paused
      return next;
    });
  };

  return (
    <div className="relative" style={{ width: 420, height: 350 }}>
      {/* Canvas */}
      <canvas
        key={gameKey}
        ref={canvasRef}
        width={420}
        height={350}
        style={{
          display: "block",
          borderRadius: 18,
          // transparent background so page gradient shows through
          background: "transparent",
          boxShadow: "0 20px 40px rgba(2,6,23,0.55)",
        }}
      />

      {/* 🎮 Game Title Overlay */}
      {showTitle && (
        <div
          className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold text-2xl transition-opacity duration-700"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            borderRadius: 18,
          }}
        >
          SPACE DEFENDER 🚀
        </div>
      )}

      {/* Controls (top-left) */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          padding: "6px 8px",
          background: "rgba(0,0,0,0.32)",
          backdropFilter: "blur(6px)",
          color: "rgba(255,255,255,0.85)",
          borderRadius: 8,
          fontSize: 12,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>⬅️ ➡️ Move</div>
        <div>⬆️ : Shoot</div>
      </div>

      {/* Play / Pause (bottom-left) */}
      <button
        onClick={togglePlay}
        style={{
          position: "absolute",
          left: 10,
          bottom: 12,
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.06)",
          color: "#eaf7ff",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
        }}
      >
        {running ? "⏸ Pause" : "▶ Play"}
      </button>

      {/* Reset (top-right) */}
      <button
        onClick={handleReset}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: "6px 8px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.78)",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
        }}
      >
        ↻
      </button>
    </div>
  );
}
