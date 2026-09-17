import { useEffect, useRef } from "react";

const random = (min, max) => Math.random() * (max - min) + min;

function createFirework(width, height) {
  const x = random(width * 0.2, width * 0.8);
  const y = random(height * 0.1, height * 0.5);
  const colors = [
    "#00ff99",
    "#00aaff",
    "#00ffea",
    "#fff700",
    "#ff00c8",
    "#ff5e00",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particles = [];
  const count = Math.floor(random(18, 28));
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = random(2, 4);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      size: random(2, 3.5),
    });
  }
  return particles;
}

const Fireworks = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let isVisible = false;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    function spawnFirework() {
      particlesRef.current.push(...createFirework(width, height));
    }

    let lastSpawn = 0;
    function animate(now) {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.03; // gravity
        p.alpha -= 0.015;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.05);

      if (!lastSpawn || now - lastSpawn > 800) {
        spawnFirework();
        lastSpawn = now;
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animationRef.current = requestAnimationFrame(animate);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animationRef.current);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default Fireworks;
