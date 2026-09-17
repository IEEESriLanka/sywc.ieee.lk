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
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 25 : 42;
    const connectionDistance = isMobile ? 100 : 130;
    
    // Resize handling with devicePixelRatio support
    const resize_canvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rectW = parent.clientWidth || window.innerWidth;
        const rectH = parent.clientHeight || window.innerHeight;
        
        canvas.width = rectW * dpr;
        canvas.height = rectH * dpr;
        
        canvas.style.width = `${rectW}px`;
        canvas.style.height = `${rectH}px`;
        
        ctx.scale(dpr, dpr);
      }
    };
    
    window.addEventListener("resize", resize_canvas);
    resize_canvas();

    // Mouse tracking
    let mouse = { x: null, y: null };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Particle Class
    class Particle {
      constructor() {
        const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
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

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    }, { threshold: 0 });

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize_canvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
