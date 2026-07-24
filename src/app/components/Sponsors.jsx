"use client";
import React from "react";
import Copy from "./Copy/Copy";
import NeuralNetwork from "./NeuralNetwork";

const sponsors = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
  "17.png",
  "18.png",
  "19.png",
  "20.png",
  "21.png",
  "22.png",
  "23.png",
  "24.png",
  "26.png",
  "27.png",
  "28.png",
  "29.png",
  "30.png",
  "31.png",
  "32.png",
];

function Sponsors() {
  const containerRef = React.useRef(null);
  const cardsRef = React.useRef([]);
  const isHoveredRef = React.useRef(false);

  React.useEffect(() => {
    let rotation = 0;
    let animationFrameId;

    const updateOrbit = () => {
      const cards = cardsRef.current;
      const N = sponsors.length;
      if (!N || !containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      // Dynamic orbital radii depending on container width
      const rx = width > 768 ? Math.min(width * 0.46, 570) : width * 0.36;
      const ry = width > 768 ? 65 : 25;

      cards.forEach((card, index) => {
        if (!card) return;

        // Distribute the 31 cards: 6 to Top (ringIndex=0), 10 to Middle (ringIndex=1), 15 to Bottom (ringIndex=2)
        let ringIndex = 0;
        let relativeIndex = 0;
        let itemsInRing = 0;

        if (index < 6) {
          ringIndex = 0;
          relativeIndex = index;
          itemsInRing = 6;
        } else if (index < 16) {
          ringIndex = 1;
          relativeIndex = index - 6;
          itemsInRing = 10;
        } else {
          ringIndex = 2;
          relativeIndex = index - 16;
          itemsInRing = 15;
        }

        // Different radii, speed multipliers, vertical center offsets, and scale offsets
        let rxVal = 0;
        let ryVal = 0;
        let yOffset = 0;
        let speedMultiplier = 1.0;
        let scaleOffset = 0;
        
        if (ringIndex === 0) {
          // Inner Ring (Smallest - orbits faster)
          rxVal = rx * 0.45;
          ryVal = ry * 0.45;
          yOffset = width > 768 ? -65 : -28; 
          speedMultiplier = -1.25;
          scaleOffset = -0.16; // Very small cards for inner ring
        } else if (ringIndex === 1) {
          // Middle Ring
          rxVal = rx * 0.78;
          ryVal = ry * 0.78;
          yOffset = 0;
          speedMultiplier = -0.95;
          scaleOffset = -0.06;
        } else {
          // Outer Ring (Largest - orbits slower)
          rxVal = rx * 1.1;
          ryVal = ry * 1.1;
          yOffset = width > 768 ? 65 : 28;
          speedMultiplier = -0.65;
          scaleOffset = 0.05;
        }

        const angle = (relativeIndex * 2 * Math.PI) / itemsInRing + rotation * speedMultiplier;
        
        const x = Math.cos(angle) * rxVal;
        const y = Math.sin(angle) * ryVal + yOffset;
        const z = Math.sin(angle); // depth

        const scale = (width > 768 
          ? 0.65 + ((z + 1) / 2) * 0.3 // 0.65 to 0.95
          : 0.55 + ((z + 1) / 2) * 0.25) + scaleOffset;

        const opacity = 0.2 + ((z + 1) / 2) * 0.8; // 0.2 to 1.0 (reduce background opacity)
        const zIndex = Math.round(50 + z * 50) + ringIndex * 5; // separate z-planes between rings
        const blur = (1 - (z + 1) / 2) * 1.5; // Max 1.5px blur for back cards to give strong depth contrast

        card.style.setProperty("--hx", `${x}px`);
        card.style.setProperty("--hy", `${y}px`);
        card.style.setProperty("--scale", scale);
        card.style.setProperty("--opacity", opacity);
        card.style.setProperty("--z-index", zIndex);
        card.style.setProperty("--blur", `${blur}px`);
      });

      // Rotate in the opposite direction (subtraction instead of addition)
      if (!isHoveredRef.current) {
        rotation = (rotation - 0.0068) % (2 * Math.PI);
      }

      animationFrameId = requestAnimationFrame(updateOrbit);
    };

    animationFrameId = requestAnimationFrame(updateOrbit);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="sponsors-section min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="sponsors-glass-card w-full h-full flex items-center justify-center relative z-10">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, rgba(3, 10, 26, 0.85), transparent 70%), radial-gradient(circle at 72% 60%, rgba(10, 45, 119, 0.45), transparent 80%), linear-gradient(180deg, rgba(3, 6, 14, 1) 0%, rgba(4, 8, 18, 0.85) 45%, rgba(6, 10, 22, 0.2) 100%), linear-gradient(135deg, #030710 0%, #050914 100%)",
              transition: "opacity 0.3s linear",
            }}
          ></div>

          <div
            className="absolute inset-0 w-full h-full sponsors-gradient-fade"
            style={{
              background:
                "radial-gradient(circle at 55% 30%, rgba(255, 191, 71, 0.2), transparent 55%), radial-gradient(circle at 80% 65%, rgba(255, 186, 56, 0.25), transparent 65%), linear-gradient(180deg, rgba(3, 6, 14, 1) 0%, rgba(4, 8, 18, 0.85) 45%, rgba(6, 10, 22, 0.2) 100%)",
              opacity: 0,
              transition: "opacity 0.3s linear",
            }}
          ></div>

          <div className="absolute inset-0 grid-pattern"></div>
          <NeuralNetwork />

          <div className="absolute inset-0 light-rays">
            <div className="ray ray-1"></div>
            <div className="ray ray-2"></div>
            <div className="ray ray-3"></div>
          </div>

          <div className="absolute inset-0 wave-container">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Copy>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Past Sponsors & Partners
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
            </Copy>
          </div>

          {/* Interactive 3D Elliptical Orbit space (Opposite direction & Dark glassmorphic styling) */}
          <div 
            className="orbit-container-wrapper relative w-full flex justify-center items-center select-none"
            ref={containerRef}
          >
            {/* Holographic Glowing Central Star */}
            <div className="orbit-star-core"></div>
            
            {/* Orbit Ring visual line */}
            <div className="orbit-ring-line"></div>

            {/* Orbiting Cards Playground */}
            <div className="orbit-playground relative w-full h-[320px]">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="orbit-card group rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer shadow-lg"
                  onMouseEnter={() => { isHoveredRef.current = true; }}
                  onMouseLeave={() => { isHoveredRef.current = false; }}
                >
                  <img
                    src={`/sponsors/${sponsor}`}
                    alt={`Sponsor ${index + 1}`}
                    className="max-h-10 max-w-[100px] md:max-h-12 md:max-w-[125px] w-auto h-auto object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .orbit-container-wrapper {
          min-height: 380px;
          overflow: visible;
        }

        .orbit-playground {
          perspective: 1000px;
        }

        .orbit-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 85px; /* Reduced size on mobile */
          height: 50px;
          background: rgba(16, 24, 42, 0.7); /* Dark glassmorphic background for past sponsors */
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transform: translate3d(calc(-50% + var(--hx, 0px)), calc(-50% + var(--hy, 0px)), 0) scale(var(--scale, 1));
          opacity: var(--opacity, 1);
          z-index: var(--z-index, 1);
          filter: blur(var(--blur, 0px));
          transition: 
            transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
            opacity 0.3s ease, 
            filter 0.3s ease, 
            border-color 0.3s ease, 
            box-shadow 0.3s ease,
            background-color 0.3s ease;
          will-change: transform, opacity, filter;
          padding: 5px;
        }

        @media (min-width: 768px) {
          .orbit-card {
            width: 120px; /* Reduced width to prevent overlapping of the 32 cards */
            height: 70px; /* Reduced height to keep proportions */
            padding: 8px;
          }
        }

        /* Hover Zoom & Highlight */
        .orbit-card:hover {
          transform: translate3d(calc(-50% + var(--hx, 0px)), calc(-50% + var(--hy, 0px) - 15px), 0) scale(1.18) !important;
          z-index: 200 !important;
          opacity: 1 !important;
          filter: blur(0px) !important;
          border-color: #ffcb40;
          box-shadow: 0 15px 40px rgba(255, 203, 64, 0.35);
          background: rgba(16, 24, 42, 0.95);
        }

        /* Central Star Glow effect */
        .orbit-star-core {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 203, 64, 0.22) 0%, transparent 70%);
          filter: blur(10px);
          pointer-events: none;
          z-index: 10;
        }

        /* Orbit Ring visual trace */
        .orbit-ring-line {
          position: absolute;
          width: 80%;
          height: 120px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
          transform: rotateX(75deg); /* Tilted ring */
        }

        @media (max-width: 768px) {
          .orbit-ring-line {
            width: 76%;
            height: 60px;
          }
        }

        .sponsors-glass-card {
          width: 100vw;
          height: 100%;
          background: rgba(10, 16, 32, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        section {
          min-height: 60vh;
        }

        .sponsors-gradient-fade {
          animation: sponsors-gradient-fade 8s ease-in-out infinite;
        }

        @keyframes sponsors-gradient-fade {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}

export default Sponsors;
