import React, { useEffect } from "react";

let externalTrigger = null; // 🔹 Global handle to trigger special effect

export const triggerShootingStars = () => {
  if (externalTrigger) externalTrigger();
};

const StarryBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("starryCanvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 🌌 Gentle twinkling stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    const shootingStars = [];
    let rewardMode = false;
    let rewardTimer = 0;

    // 🌠 Spawn a single shooting star
    const spawnShootingStar = () => {
      if (shootingStars.length >= 5) return;
      const angle = Math.random() * (Math.PI / 6) + Math.PI / 12;
      const startX = Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.4;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle),
        vy: Math.sin(angle),
        length: 250 + Math.random() * 150,
        alpha: 1,
      });
    };

    // 🔹 Expose special trigger to outside world (HeroGameCanvas)
    externalTrigger = () => {
      rewardMode = true;
      rewardTimer = 200; // ~3 seconds
      for (let i = 0; i < 15; i++) spawnShootingStar();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 🎨 Black background
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);

      // 🌟 Stars
      for (let star of stars) {
        star.alpha += star.speed;
        if (star.alpha <= 0 || star.alpha >= 1) star.speed = -star.speed;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha * 0.9})`;
        ctx.fill();
      }

      // 🌠 Shooting stars
      for (let s of shootingStars) {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.length * s.vx,
          s.y - s.length * s.vy
        );
        grad.addColorStop(0, `rgba(173, 216, 255,${s.alpha})`);
        grad.addColorStop(1, "rgba(173, 216, 255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * s.vx, s.y - s.length * s.vy);
        ctx.stroke();

        // faster and longer travel
        s.x += s.vx * 25;
        s.y += s.vy * 25;
        s.alpha -= 0.008;
      }

      while (shootingStars.length && shootingStars[0].alpha <= 0)
        shootingStars.shift();

      // ✨ Reward-mode periodic stars
      if (rewardMode && rewardTimer-- > 0) {
        if (Math.random() < 0.3) spawnShootingStar();
      } else if (rewardTimer <= 0) {
        rewardMode = false;
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      externalTrigger = null;
      // window.removeEventListener("scroll", handleInteraction);
      // window.removeEventListener("mousemove", handleInteraction);
      // window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <canvas
      id="starryCanvas"
      className="fixed top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default StarryBackground;
