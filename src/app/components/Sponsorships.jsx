"use client";
import React from "react";
import Copy from "./Copy/Copy";
import NeuralNetwork from "./NeuralNetwork";

const sponsorships = [
  "BG removed sponsor logos 2 (1).png",
  "BG removed sponsor logos 2 (2).png",
  "BG removed sponsor logos 2 (3).png",
  "BG removed sponsor logos 2 (4).png",
  "BG removed sponsor logos 2 (6).png",
  "BG removed sponsor logos 2.png",
  "CAS-Logo-Color 1.png",
  "EPS logo.png",
  "Standars logo.png",
  "image 3.png",
  "image 31.png",
  "image 33.png",
  "logo-collabratec 1.png"
];

function Sponsorships() {
  const containerRef = React.useRef(null);
  const cardsRef = React.useRef([]);
  const isHoveredRef = React.useRef(false);

  React.useEffect(() => {
    let rotation = 0;
    let animationFrameId;

    const updateOrbit = () => {
      const cards = cardsRef.current;
      const N = sponsorships.length;
      if (!N || !containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      // Dynamic orbital radii depending on container width
      const rx = width > 768 ? Math.min(width * 0.44, 530) : width * 0.35;
      const ry = width > 768 ? 75 : 35;

      cards.forEach((card, index) => {
        if (!card) return;
        const angle = (index * 2 * Math.PI) / N + rotation;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        const z = Math.sin(angle); // range from -1 to 1

        // Map depth (z) to scale, opacity, z-index, and blur filter
        const scale = width > 768 
          ? 0.75 + ((z + 1) / 2) * 0.35 // 0.75 to 1.1 on desktop
          : 0.65 + ((z + 1) / 2) * 0.3;  // 0.65 to 0.95 on mobile
        
        const opacity = 0.25 + ((z + 1) / 2) * 0.75; // 0.25 to 1.0 (reduce background opacity)
        const zIndex = Math.round(50 + z * 50); // 1 to 100
        const blur = (1 - (z + 1) / 2) * 1.5; // Max 1.5px blur for back cards to give strong depth contrast

        card.style.setProperty("--hx", `${x}px`);
        card.style.setProperty("--hy", `${y}px`);
        card.style.setProperty("--scale", scale);
        card.style.setProperty("--opacity", opacity);
        card.style.setProperty("--z-index", zIndex);
        card.style.setProperty("--blur", `${blur}px`);
      });

      // Slowly rotate orbit if not hovered
      if (!isHoveredRef.current) {
        rotation = (rotation + 0.0068) % (2 * Math.PI);
      }

      animationFrameId = requestAnimationFrame(updateOrbit);
    };

    animationFrameId = requestAnimationFrame(updateOrbit);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="sponsorships-section min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="sponsorships-glass-card w-full h-full flex items-center justify-center relative z-10">
        {/* Animated Gradient Background (matching other sections) */}
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
            className="absolute inset-0 w-full h-full sponsorships-gradient-fade"
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
                Sponsorships & Partnerships
              </h2>
              <p className="text-lg text-[#AEEFFF] max-w-3xl mx-auto mb-8">
                We are grateful for the support of our sponsors and partners who
                make this event possible
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
            </Copy>
          </div>

          {/* Interactive 3D Elliptical Orbit space */}
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
              {sponsorships.map((sponsorship, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="orbit-card group rounded-2xl border border-[#ffcb40]/25 hover:border-[#ffcb40]/65 flex items-center justify-center cursor-pointer shadow-lg"
                  onMouseEnter={() => { isHoveredRef.current = true; }}
                  onMouseLeave={() => { isHoveredRef.current = false; }}
                >
                  <img
                    src={`/Sponsorship logos/${sponsorship}`}
                    alt={`Sponsor ${index + 1}`}
                    className="max-h-12 max-w-[120px] md:max-h-16 md:max-w-[150px] w-auto h-auto object-contain transition-all duration-300 group-hover:scale-105"
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
          width: 120px;
          height: 70px;
          background: #ffffff; /* Solid white background for perfect logo contrast */
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
          padding: 10px;
        }

        @media (min-width: 768px) {
          .orbit-card {
            width: 175px; /* Reduced width to prevent overlapping in front */
            height: 105px; /* Reduced height to keep proportions */
            padding: 18px;
          }
        }

        /* Hover Zoom & Highlight */
        .orbit-card:hover {
          transform: translate3d(calc(-50% + var(--hx, 0px)), calc(-50% + var(--hy, 0px) - 15px), 0) scale(1.18) !important;
          z-index: 200 !important;
          opacity: 1 !important;
          filter: blur(0px) !important;
          border-color: #ffcb40;
          box-shadow: 0 15px 40px rgba(255, 203, 64, 0.4);
          background: #ffffff;
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
          border: 1px dashed rgba(255, 203, 64, 0.18);
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

        .sponsorships-glass-card {
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

        .sponsorships-gradient-fade {
          animation: sponsorships-gradient-fade 8s ease-in-out infinite;
        }

        @keyframes sponsorships-gradient-fade {
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

export default Sponsorships;
