"use client";
import { useEffect, useRef } from "react";
import NeuralNetwork from "../NeuralNetwork";

const explosionImageCount = 10;
const explosionImagePaths = Array.from(
  { length: explosionImageCount },
  (_, i) => `/hero/${i + 1}.jpeg`
);

export default function Footer() {
  const explosionRef = useRef(null);
  const hasExploded = useRef(false);
  const animationId = useRef(null);

  useEffect(() => {
    // Preload images
    explosionImagePaths.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const config = {
      gravity: 0.25,
      friction: 0.99,
      imageSize: 150,
      horizontalForce: 20,
      verticalForce: 15,
      rotationSpeed: 10,
      resetDelay: 500,
    };

    function createParticles() {
      if (!explosionRef.current) return;
      explosionRef.current.innerHTML = "";
      explosionImagePaths.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "explosion-particle-img";
        img.style.width = `${config.imageSize}px`;
        img.style.position = "absolute";
        img.style.bottom = "-200px";
        img.style.left = "50%";
        img.style.borderRadius = "1rem";
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.transform = "translateX(-50%)";
        img.style.willChange = "transform";
        img.style.border = "1px solid rgba(0, 236, 236, 0.2)";
        img.style.boxShadow = "0 2px 8px rgba(0, 236, 236, 0.1)";
        explosionRef.current.appendChild(img);
      });
    }

    class Particle {
      constructor(element) {
        this.element = element;
        this.x = 0;
        this.y = 0;
        this.vx = (Math.random() - 0.5) * config.horizontalForce;
        this.vy = -config.verticalForce - Math.random() * 10;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
      }
      update() {
        this.vy += config.gravity;
        this.vx *= config.friction;
        this.vy *= config.friction;
        this.rotationSpeed *= config.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }

    function explode() {
      if (hasExploded.current) return;
      hasExploded.current = true;
      createParticles();
      const particleElements = explosionRef.current.querySelectorAll(
        ".explosion-particle-img"
      );
      const particles = Array.from(particleElements).map(
        (el) => new Particle(el)
      );
      function animate() {
        particles.forEach((p) => p.update());
        animationId.current = requestAnimationFrame(animate);
        if (
          particles.every((p) => p.y > explosionRef.current.offsetHeight / 2)
        ) {
          cancelAnimationFrame(animationId.current);
        }
      }
      animate();
    }

    function checkFooterPosition() {
      const footer = document.getElementById("footer-root");
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top > viewportHeight + 100) {
        hasExploded.current = false;
      }
      if (!hasExploded.current && rect.top <= viewportHeight + 250) {
        explode();
      }
    }

    let checkTimeout;
    function onScroll() {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkFooterPosition, 5);
    }
    function onResize() {
      hasExploded.current = false;
    }
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    createParticles();
    setTimeout(checkFooterPosition, 500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <footer
      id="footer-root"
      className="relative w-screen h-[85svh] text-[#e3e3db] p-8 flex flex-col justify-between items-center overflow-hidden bg-[#030710]"
    >


      <div className="footer-container relative w-full h-full bg-[#050914]/90 p-8 rounded-3xl flex flex-col justify-between overflow-hidden border border-[#123a85]/30 z-10">
        {/* Animated Gradient Background (from Hero/About/Theme/Location/ProcessCards/Sponsors/Glimps/Team/RegisterCTA) */}
        <div className="absolute inset-0 w-full h-full -z-10">
          {/* Base gradient background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, rgba(3, 10, 26, 0.85), transparent 70%), radial-gradient(circle at 72% 60%, rgba(10, 45, 119, 0.45), transparent 80%), linear-gradient(180deg, rgba(3, 6, 14, 1) 0%, rgba(4, 8, 18, 0.85) 45%, rgba(6, 10, 22, 0.2) 100%), linear-gradient(135deg, #030710 0%, #050914 100%)",
              transition: "opacity 0.3s linear",
            }}
          ></div>

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 w-full h-full footer-gradient-fade"
            style={{
              background:
                "radial-gradient(circle at 55% 30%, rgba(255, 191, 71, 0.2), transparent 55%), radial-gradient(circle at 80% 65%, rgba(255, 186, 56, 0.25), transparent 65%), linear-gradient(180deg, rgba(3, 6, 14, 1) 0%, rgba(4, 8, 18, 0.85) 45%, rgba(6, 10, 22, 0.2) 100%)",
              opacity: 0,
              transition: "opacity 0.3s linear",
            }}
          ></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 grid-pattern"></div>

          {/* Neural Network Background */}
          <NeuralNetwork />

          {/* Animated Light Rays */}
          <div className="absolute inset-0 light-rays">
            <div className="ray ray-1"></div>
            <div className="ray ray-2"></div>
            <div className="ray ray-3"></div>
          </div>

          {/* Animated Wave Effect */}
          <div className="absolute inset-0 wave-container">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
        </div>
        {/* Symbols */}
        <div className="footer-symbols footer-symbols-1 absolute left-0 top-0 w-full px-8 flex justify-between z-10">
          <img
            src="/images/global/s6.png"
            alt=""
            className="h-4 w-auto opacity-40"
          />
          <img
            src="/images/global/s6.png"
            alt=""
            className="h-4 w-auto opacity-40"
          />
        </div>
        <div className="footer-symbols footer-symbols-2 absolute left-0 bottom-0 w-full px-8 flex justify-between z-10">
          <img
            src="/images/global/s6.png"
            alt=""
            className="h-4 w-auto opacity-40"
          />
          <img
            src="/images/global/s6.png"
            alt=""
            className="h-4 w-auto opacity-40"
          />
        </div>

        {/* Header */}
        <div className="footer-header relative text-center mt-8 mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight gold-text">
            IEEE SLSYWC
          </h1>
        </div>

        {/* Footer Row */}
        <div className="footer-row flex gap-8 mb-32 max-md:flex-col max-md:mb-8">
          <div className="footer-col flex-1 flex flex-col items-center gap-4">
            <p className="font-semibold text-[#00b8b8]">Quick Jumps</p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a href="#home">Home</a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a href="#about">About</a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a href="#theme">Theme</a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a href="#schedule">Schedule</a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a href="/merch">Store</a>
            </p>
          </div>

          <div className="footer-col flex-1 flex flex-col items-center gap-4">
            <p className="font-semibold text-[#00b8b8]">Social Signals</p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a
                href="https://www.youtube.com/@ieeeslsywc"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a
                href="https://www.instagram.com/ieeeslsywc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a
                href="https://www.linkedin.com/company/sacsrilanka/?originalSubdomain=lk"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-[#9fb7d0]/80 hover:text-[#00b8b8] transition-colors duration-300">
              <a
                href="https://www.facebook.com/IEEESLSYWC/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright-info relative w-full flex justify-center gap-8 items-center text-center max-md:flex-col max-md:gap-2 max-md:text-center mt-4">
          <p className="text-[#7a8fb0]/70 max-md:hidden">//</p>
          <p className="text-[#00b8b8] font-semibold">SLSYWC 2026</p>
          <p className="text-[#7a8fb0]/70 max-md:hidden">//</p>
        </div>

        {/* Explosion */}
        <div
          className="explosion-container absolute bottom-0 left-0 w-full h-[200%] pointer-events-none overflow-hidden"
          ref={explosionRef}
        ></div>
      </div>
      <style jsx>{`
        .gold-text {
          background: linear-gradient(
            to right,
            #bf953f,
            #fcf6ba,
            #b38728,
            #fbf5b7,
            #aa771c
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: shine 5s linear infinite;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </footer>
  );
}
