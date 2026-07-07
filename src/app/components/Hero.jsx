"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "./Copy/Copy";
import Fireworks from "./Fireworks";
import NeuralNetwork from "./NeuralNetwork";
import AnimatedBackground from "./ui/AnimatedBackground";

const Hero = () => {
  const heroRef = useRef(null);
  const animatedIconsRef = useRef(null);
  const iconElementsRef = useRef([]);
  const textSegmentsRef = useRef([]);
  const placeholdersRef = useRef([]);
  const heroHeaderRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useGSAP(() => {
    setIsClient(true);
  }, []);

  useGSAP(() => {
    if (!isClient) return;

    gsap.registerPlugin(ScrollTrigger);

    const animatedIcons = animatedIconsRef.current;
    const iconElements = iconElementsRef.current;
    const textSegments = textSegmentsRef.current;
    const placeholders = placeholdersRef.current;
    const heroHeader = heroHeaderRef.current;
    const heroSection = heroSectionRef.current;

    if (
      !animatedIcons ||
      !iconElements ||
      !textSegments ||
      !placeholders ||
      !heroHeader ||
      !heroSection
    ) {
      return;
    }

    // Entrance animation for main title
    gsap.fromTo(
      ".main-title",
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    const textAnimationOrder = [];
    textSegments.forEach((segment, index) => {
      textAnimationOrder.push({ segment, originalIndex: index });
    });

    // Shuffle the text animation order
    for (let i = textAnimationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    const isMobile = window.innerWidth <= 1000;
    const headerIconSize = isMobile ? 30 : 60;
    const currentIconSize =
      iconElements[0]?.getBoundingClientRect().width || 60;
    const exactScale = headerIconSize / currentIconSize;

    // Gradient backgrounds for animation
    const gradientStart =
      "linear-gradient(135deg, #030710 0%, #050914 50%, #030710 100%)";
    const gradientEnd =
      "linear-gradient(135deg, #050914 0%, #030710 50%, #050914 100%)";

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Smoothly crossfade the gradients
        const fadeDiv = heroSection.querySelector(".hero-gradient-fade");
        if (fadeDiv) {
          fadeDiv.style.opacity = progress;
        }

        // Animate background gradient
        if (heroSection) {
          // Interpolate between the two gradients based on progress
          // For simplicity, switch at halfway point, or use a crossfade
          if (progress < 0.5) {
            heroSection.style.background = gradientStart;
          } else {
            heroSection.style.background = gradientEnd;
          }
        }

        textSegments.forEach((segment) => {
          if (segment) {
             gsap.set(segment, { opacity: 0 });
          }
        });

        // Always collapse placeholders since we don't want icons in text
        placeholders.forEach((placeholder) => {
             if (placeholder) {
                 placeholder.style.width = "0px";
                 placeholder.style.margin = "0px";
                 placeholder.style.opacity = "0";
             }
        });

        if (progress <= 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15;
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;

            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          gsap.set(animatedIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });

          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1;
            const iconStart = staggerDelay;
            const iconEnd = staggerDelay + 0.5;

            const iconProgress = gsap.utils.mapRange(
              iconStart,
              iconEnd,
              0,
              1,
              moveProgress
            );
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));

            const startOffset = -containerMoveY;
            const individualY = startOffset * (1 - clampedProgress);

            gsap.set(icon, {
              x: 0,
              y: individualY,
            });
          });
        } else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });

          if (scaleProgress >= 0.5) {
            heroSection.style.backgroundColor = "#030710";
          } else {
            heroSection.style.backgroundColor = "#050914";
          }

          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
          const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
          const baseY = -window.innerHeight * 0.3;
          const currentScale = 1 + (exactScale - 1) * scaleProgress;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: currentScale,
            opacity: 1,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress <= 0.75) {
          // Just fade out the icons here, no duplicate icons flying
          const fadeOutProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });

          heroSection.style.backgroundColor = "#030710";

          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = targetCenterX - currentCenterX;
          const deltaY = targetCenterY - currentCenterY;
          const baseY = -window.innerHeight * 0.3;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: exactScale,
            opacity: 1 - fadeOutProgress, // Fade out
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });

        } else {
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          });

          heroSection.style.backgroundColor = "#030710";

          gsap.set(animatedIcons, { opacity: 0 });

          textAnimationOrder.forEach((item, randomIndex) => {
            const segmentStart = 0.75 + randomIndex * 0.03;
            const segmentEnd = segmentStart + 0.015;

            const segmentProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

            gsap.set(item.segment, {
              opacity: clampedProgress,
            });
          });
        }
      },    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <section id="home" className="hero">
        <div className="hero-header">
          <h1 className="!text-6xl md:!text-[10rem] font-extrabold text-center gold-text mb-2 whitespace-nowrap">IEEE Sri Lanka Section Students | Young Professionals | Women in
            Engineering Congress 2026</h1>
          <p>
            SLSYWC '26
          </p>
        </div>
      </section>
    );
  }

  // Detect mobile view
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1000;

  if (isMobile) {
    return (
      <>
        <section
          id="home"
          className="hero min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Enhanced Animated Background (copied from desktop view) */}
          <div className="absolute inset-0 w-full h-full z-0">
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
              className="absolute inset-0 w-full h-full hero-gradient-fade"
              style={{
                background:
                  "radial-gradient(circle at 55% 30%, rgba(255, 191, 71, 0.15), transparent 55%), radial-gradient(circle at 80% 65%, rgba(255, 186, 56, 0.1), transparent 65%), linear-gradient(180deg, rgba(3, 6, 14, 1) 0%, rgba(4, 8, 18, 0.85) 45%, rgba(6, 10, 22, 0.2) 100%)",
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
          <div className="hero-header z-10">
            <h1
              className="!text-3xl md:!text-[3rem] font-extrabold text-center gold-text mb-2 whitespace-nowrap"
            >
              IEEE Sri Lanka Section 
          <br />
          Students
          <br />
           Young Professionals 
           <br />
           Women in Engineering 
          <br />
          Congress 2026
            </h1>
            <p className="text-xl px-8 md:text-2xl font-medium text-white/80 mt-4 text-center">
              SLSYWC '26
            </p>
          </div>
          <div className="flex absolute bottom-5 z-10 px-5 gap-2">
            <div className="animated-icon">
              <div className="">
                <img src="/hero/1.jpeg" className="rounded-[6rem]" alt="" />
              </div>
            </div>
            <div className="animated-icon">
              <div className="">
                <img src="/hero/2.jpeg" className="rounded-[6rem]" alt="" />
              </div>
            </div>
            <div className="animated-icon">
              <div className="">
                <img src="/hero/3.jpeg" className="rounded-[6rem]" alt="" />
              </div>
            </div>
            <div className="animated-icon">
              <div className="">
                <img src="/hero/4.jpeg" className="rounded-[6rem]" alt="" />
              </div>
            </div>
            <div className="animated-icon">
              <div className="">
                <img src="/hero/5.jpeg" className="rounded-[6rem]" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="hero min-h-screen relative flex flex-col items-center justify-center relative overflow-hidden">
          <Fireworks />
          
          <div className="absolute inset-0 w-full h-full z-0">
           
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, #1A2A6C 0%, #0A0F1C 80%), linear-gradient(120deg, #0A0F1C 0%, #232526 100%)",
                transition: "opacity 0.3s linear",
              }}
            ></div>

            
            <div
              className="absolute inset-0 w-full h-full hero-gradient-fade"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, #014034 0%, #0A0F1C 70%), linear-gradient(120deg, #0A0F1C 0%, #00B836 100%)",
                opacity: 0,
                transition: "opacity 0.3s linear",
              }}
            ></div>

            
            <div className="absolute inset-0 grid-pattern"></div>

           
            <div className="absolute inset-0 floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
              <div className="shape shape-6"></div>
            </div>

            
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

          
            <div className="absolute inset-0 glowing-orbs">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="orb orb-3"></div>
            </div>
          </div>
          <Copy>
            <h4 className="text-center w-[80%] text-[2rem] font-extrabold leading-none z-10 text-[#ffcb40] ">
              Welcome to the Flagship Event of IEEE Sri Lanka Section.
            </h4>
          </Copy>
        </section> */}
      </>
    );
  }

  return (
    <section
      id="home"
      ref={heroSectionRef}
      className="hero min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Enhanced Animated Background */}
      <AnimatedBackground />
      <div ref={heroHeaderRef} className="hero-header z-10 flex flex-col items-center !w-full">
        <h1
          className="main-title !text-6xl md:!text-[3rem] font-extrabold text-center gold-text leading-normal pb-2 mb-2 opacity-0 whitespace-nowrap" // Reduced to optimal size
        >
          IEEE Sri Lanka Section 
          <br />
          Students | Young Professionals | Women in Engineering 
          <br />
          Congress 2026
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/80 text-center max-w-4xl px-4">
          SLSYWC '26
        </p>
      </div>
      <div ref={animatedIconsRef} className="animated-icons z-10">
        <div
          ref={(el) => (iconElementsRef.current[0] = el)}
          className="animated-icon"
        >
          <div className="icon-gradient-border">
            <img src="/hero/1.jpeg" className="rounded-[6rem]" alt="" />
          </div>
        </div>
        <div
          ref={(el) => (iconElementsRef.current[1] = el)}
          className="animated-icon"
        >
          <div className="icon-gradient-border">
            <img src="/hero/2.jpeg" className="rounded-[6rem]" alt="" />
          </div>
        </div>
        <div
          ref={(el) => (iconElementsRef.current[2] = el)}
          className="animated-icon"
        >
          <div className="icon-gradient-border">
            <img src="/hero/3.jpeg" className="rounded-[6rem]" alt="" />
          </div>
        </div>
        <div
          ref={(el) => (iconElementsRef.current[3] = el)}
          className="animated-icon"
        >
          <div className="icon-gradient-border">
            <img src="/hero/4.jpeg" className="rounded-[6rem]" alt="" />
          </div>
        </div>
        <div
          ref={(el) => (iconElementsRef.current[4] = el)}
          className="animated-icon"
        >
          <div className="icon-gradient-border">
            <img src="/hero/5.jpeg" className="rounded-[6rem]" alt="" />
          </div>
        </div>
      </div>
      <h1 className="animated-text z-10">
        <div
          ref={(el) => (placeholdersRef.current[0] = el)}
          className="placeholder-icon"
        ></div>
        <span
          ref={(el) => (textSegmentsRef.current[0] = el)}
          className="text-segment gold-text"
        >
          Welcome {" "}
        </span>
        <div
          ref={(el) => (placeholdersRef.current[1] = el)}
          className="placeholder-icon"
        ></div>
        <span
          ref={(el) => (textSegmentsRef.current[1] = el)}
          className="text-segment gold-text"
        >
          to{" "}
        </span>
        <span
          ref={(el) => (textSegmentsRef.current[2] = el)}
          className="text-segment gold-text"
        >
          the Flagship
        </span>
        <div
          ref={(el) => (placeholdersRef.current[2] = el)}
          className="placeholder-icon"
        ></div>
        <span
          ref={(el) => (textSegmentsRef.current[3] = el)}
          className="text-segment gold-text"
        >
          Event of {" "}
        </span>
        <div
          ref={(el) => (placeholdersRef.current[3] = el)}
          className="placeholder-icon"
        ></div>
        <span
          ref={(el) => (textSegmentsRef.current[4] = el)}
          className="text-segment gold-text"
        >
          IEEE {" "}
        </span>
        <div
          ref={(el) => (placeholdersRef.current[4] = el)}
          className="placeholder-icon"
        ></div>
        <span
          ref={(el) => (textSegmentsRef.current[5] = el)}
          className="text-segment gold-text"
        >
          Sri Lanka Section.
        </span>
      </h1>
      {/* Top fader for smooth transition from previous section */}
      {/* <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-20"
        style={{
          background:
            "linear-gradient(to top, #0B1122 0%, rgba(11,17,34,0.0) 100%)",
        }}
      ></div> */}
      <style jsx>{`
        .icon-gradient-border {
          padding: 2px;
          border-radius: 6rem;
          background: conic-gradient(
            from 0deg,
            #b4860b,
            #123a85,
            #00b8b8,
            #b4860b
          );
          animation: border-rotate 3s linear infinite;
          display: inline-block;
        }
        @keyframes border-rotate {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animated-icon img {
          border-radius: 6rem;
          display: block;
          background: #030710;
        }

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
          animation: shine 8s linear infinite;
          filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8));
          line-height: 1.35;
          padding-bottom: 0.15em;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
