"use client";

import { useEffect, useRef } from "react";

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    
    // Configuration
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const particleCount = isMobile ? 14 : 35;
    const connectionDistance = isMobile ? 75 : 120;
    
    // Resize handling with clamped devicePixelRatio to prevent canvas memory crash on iOS
    const resize_canvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const isMobileNow = window.innerWidth <= 768;
        const dpr = isMobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
        const rectW = parent.clientWidth || window.innerWidth;
        const rectH = parent.clientHeight || window.innerHeight;
        
        canvas.width = Math.floor(rectW * dpr);
        canvas.height = Math.floor(rectH * dpr);
        
        canvas.style.width = `${rectW}px`;
        canvas.style.height = `${rectH}px`;
        
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    
    let resizeTimer;
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize_canvas, 150);
    };

    window.addEventListener("resize", handleResizeDebounced);
    resize_canvas();

    // Mouse tracking
    let mouse = { x: null, y: null };
    
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Particle Class
    class Particle {
      constructor() {
        const isMobileNow = window.innerWidth <= 768;
        const dpr = isMobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.5 + 1;
        this.color = "#ffcb40";
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    // Animation Control
    let isAnimating = false;

    const animate = () => {
      if (!isAnimating) return;

      const isMobileNow = window.innerWidth <= 768;
      const dpr = isMobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.update(width, height);
        particle.draw();
      });

      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const connect = () => {
      ctx.lineWidth = 0.8;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            let distance = Math.sqrt(distSq);
            let opacityValue = (1 - (distance / connectionDistance)) * 0.3;
            ctx.strokeStyle = `rgba(255, 203, 64, ${opacityValue})`;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Intersection Observer to pause animation when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isAnimating) {
            isAnimating = true;
            animate();
          }
        } else {
          isAnimating = false;
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResizeDebounced);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default NeuralNetwork;
