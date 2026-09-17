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

    if (!whoweareScroll || !whoweareHeader) return;

    // Function to recalculate on resize
    const updateScrollCalculation = () => {
      const currentViewportWidth = window.innerWidth;
      const currentTextWidth = whoweareHeader.offsetWidth || 1500;
      const isMobile = currentViewportWidth <= 1000;
      const textEndPosition =
        currentTextWidth + ((isMobile ? 5 : 10) * currentViewportWidth) / 100;
      const scrollDistance = Math.max(
        0,
        textEndPosition - currentViewportWidth
      );
      return { maxTranslateX: scrollDistance, isMobile };
    };

    let { maxTranslateX } = updateScrollCalculation();

    const images = [
      { el: document.querySelector("#whoweare-img-1"), endTranslateX: -800 },
      { el: document.querySelector("#whoweare-img-2"), endTranslateX: -1200 },
      { el: document.querySelector("#whoweare-img-3"), endTranslateX: -600 },
      { el: document.querySelector("#whoweare-img-4"), endTranslateX: -1000 },
      { el: document.querySelector("#whoweare-img-5"), endTranslateX: -900 },
    ];

    const mainTrigger = ScrollTrigger.create({
      trigger: ".whoweare",
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
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
          const adjustedProgress = (progress - 0.3) / 0.7;
          translateX = -Math.min(
            adjustedProgress * maxTranslateX,
            maxTranslateX
          );

          // Update image translations in the same tick
          images.forEach((img) => {
            if (img.el) {
              gsap.set(img.el, {
                x: `${img.endTranslateX * adjustedProgress}px`,
              });
            }
          });
        }

        gsap.set(whoweareScroll, {
          opacity: opacity,
          scale: scale,
          x: translateX,
        });
      },
    });

    // Handle window resize
    const handleResize = () => {
      const newCalc = updateScrollCalculation();
      maxTranslateX = newCalc.maxTranslateX;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mainTrigger && mainTrigger.kill) {
        mainTrigger.kill();
      }
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
