"use client";
import "./WhoWeAre.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBackground from "../ui/AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  useGSAP(() => {
    const whoweareScroll = document.querySelector(".whoweare-scroll");
    const whoweareHeader = document.querySelector(".whoweare-header h1");

    // Function to recalculate on resize
    const updateScrollCalculation = () => {
      const currentViewportWidth = window.innerWidth;
      const currentTextWidth = whoweareHeader.offsetWidth;

      // Check if we're on mobile
      const isMobile = currentViewportWidth <= 1000;

      // Calculate the full scroll distance needed
      // We want to scroll until the end of the text is visible
      const textEndPosition =
        currentTextWidth + ((isMobile ? 5 : 10) * currentViewportWidth) / 100; // margin-left
      const scrollDistance = Math.max(
        0,
        textEndPosition - currentViewportWidth
      );

      return { maxTranslateX: scrollDistance, isMobile };
    };

    let { maxTranslateX, isMobile } = updateScrollCalculation();

    const images = [
      { id: "#whoweare-img-1", endTranslateX: -800 },
      { id: "#whoweare-img-2", endTranslateX: -1200 },
      { id: "#whoweare-img-3", endTranslateX: -600 },
      { id: "#whoweare-img-4", endTranslateX: -1000 },
      { id: "#whoweare-img-5", endTranslateX: -900 },
    ];

    ScrollTrigger.create({
      trigger: ".whoweare",
      start: "top top",
      end: `+=${window.innerHeight * 6}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;

        let opacity, scale, translateX;

        if (progress <= 0.3) {
          const fadeProgress = progress / 0.3;
          opacity = fadeProgress;
          scale = 0.85 + 0.15 * fadeProgress;
          translateX = 0;
        } else {
          opacity = 1;
          scale = 1;
          const adjustedProgress = (progress - 0.3) / (1 - 0.3);

          // Recalculate for current viewport size
          const currentCalc = updateScrollCalculation();
          const currentMaxTranslateX = currentCalc.maxTranslateX;

          translateX = -Math.min(
            adjustedProgress * currentMaxTranslateX,
            currentMaxTranslateX
          );
        }

        gsap.set(whoweareScroll, {
          opacity: opacity,
          scale: scale,
          x: translateX,
        });
      },
    });

    images.forEach((img) => {
      ScrollTrigger.create({
        trigger: ".whoweare",
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.3) {
            const adjustedProgress = (progress - 0.3) / (1 - 0.3);
            gsap.set(img.id, {
              x: `${img.endTranslateX * adjustedProgress}px`,
            });
          }
        },
      });
    });

    // Handle window resize
    const handleResize = () => {
      const newCalc = updateScrollCalculation();
      maxTranslateX = newCalc.maxTranslateX;
      isMobile = newCalc.isMobile;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="about" className="whoweare z-20">
      <AnimatedBackground showNeuralNetwork={true} />
      <div className="whoweare-container">
        <div className="whoweare-scroll">
          <div className="whoweare-header">
            <h1 className="gold-text">
              Who we are
            </h1>
          </div>

          <div className="whoweare-img" id="whoweare-img-1">
            <img src="/2024/event/2025-1.jpeg" alt="" />
          </div>
          <div className="whoweare-img" id="whoweare-img-2">
            <img src="/2024/event/2025-2.jpeg" alt="" />
          </div>
          <div className="whoweare-img" id="whoweare-img-3">
            <img src="/2024/event/2025-3.jpeg" alt="" />
          </div>
          <div className="whoweare-img" id="whoweare-img-4">
            <img src="/2024/event/2025-4.jpeg" alt="" />
          </div>
          <div className="whoweare-img" id="whoweare-img-5">
            <img src="/2024/event/2025-5.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
