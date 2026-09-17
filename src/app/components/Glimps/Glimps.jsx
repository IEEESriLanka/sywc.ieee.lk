"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import GlimpsCSS from "./Glimps.css";
import Copy from "../Copy/Copy";
import NeuralNetwork from "../NeuralNetwork";

const workItems = [
  {
    title: "Innovation for sustainability",
    img: "/2024/theme.png",
  },
  {
    title: "jie jie beach hotel panadura",
    img: "/2024/event/2025-1.jpeg",
  },
  {
    title: "200+ Participants | 15 Expert Speakers",
    img: "/2024/event/2025-2.jpeg",
  },
  { title: "3 Days of Inspiration", img: "/2024/event/2025-3.jpeg" },
];

const allImages = [
  "/2024/event/2025-9.jpeg",
  "/2024/event/2025-2.jpeg",
  "/2024/event/2025-3.jpeg",
  "/2024/event/2025-4.jpeg",
  "/2024/event/2025-5.jpeg",
  "/2024/event/2025-6.jpeg",
  "/2024/event/2025-1.jpeg",
  "/2024/event/2025-7.jpeg",
  "/2024/event/2025-8.jpeg",
  "/2024/event/2025-4.jpeg",
];

const featuredCardPosSmall = [
  { y: 100, x: 1000 },
  { y: 1500, x: 100 },
  { y: 1250, x: 1950 },
  { y: 1500, x: 850 },
  { y: 200, x: 2100 },
  { y: 250, x: 600 },
  { y: 1100, x: 1650 },
  { y: 1000, x: 800 },
  { y: 900, x: 2200 },
  { y: 150, x: 1600 },
];
const featuredCardPosLarge = [
  { y: 800, x: 5000 },
  { y: 2000, x: 3000 },
  { y: 240, x: 4450 },
  { y: 1200, x: 3450 },
  { y: 500, x: 2200 },
  { y: 750, x: 1100 },
  { y: 1850, x: 3350 },
  { y: 2200, x: 1300 },
  { y: 3000, x: 1950 },
  { y: 500, x: 4500 },
];

const Glimps = () => {
  const sectionRef = useRef(null);
  const titlesRef = useRef(null);
  const imagesRef = useRef(null);
  const indicatorRef = useRef(null);

  useGSAP(() => {
    let gsap, ScrollTrigger;
    const init = async () => {
      gsap = (await import("gsap")).default;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      let scrollTriggerInstance = null;

      const initAnimations = () => {
        if (window.innerWidth <= 1000) {
          if (scrollTriggerInstance) {
            scrollTriggerInstance.kill();
            scrollTriggerInstance = null;
          }
          return;
        }
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
        // Indicator
        if (indicatorRef.current) {
          indicatorRef.current.innerHTML = "";
          for (let section = 1; section <= 5; section++) {
            const sectionGroup = document.createElement("div");
            sectionGroup.className = "glimps-indicator-section";
            sectionGroup.style.display = "flex";
            sectionGroup.style.flexDirection = "column";
            sectionGroup.style.alignItems = "center";
            sectionGroup.style.marginBottom = "0.5em";

            const sectionNumber = document.createElement("p");
            sectionNumber.className = "glimps-mn";
            sectionNumber.textContent = `0${section}`;
            sectionGroup.appendChild(sectionNumber);

            for (let i = 0; i < 10; i++) {
              const indicator = document.createElement("div");
              indicator.className = "glimps-indicator";
              sectionGroup.appendChild(indicator);
            }
            indicatorRef.current.appendChild(sectionGroup);
          }
        }
        // Images
        if (imagesRef.current) {
          imagesRef.current.innerHTML = "";
          const featuredCardPos =
            window.innerWidth >= 1600
              ? featuredCardPosLarge
              : featuredCardPosSmall;
          allImages.forEach((imgSrc, idx) => {
            const card = document.createElement("div");
            card.className = `glimps-img-card glimps-img-card-${idx + 1}`;
            card.style.position = "absolute";
            card.style.left = featuredCardPos[idx].x + "px";
            card.style.top = featuredCardPos[idx].y + "px";
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = `featured work image ${idx + 1}`;
            card.appendChild(img);
            imagesRef.current.appendChild(card);
          });
        }
        const glimpsImgCards = imagesRef.current
          ? imagesRef.current.querySelectorAll(".glimps-img-card")
          : [];
        // Set initial z/scale for all cards
        glimpsImgCards.forEach((card, index) => {
          gsap.set(card, { z: -1500, scale: 0 });
        });
        // Titles
        const moveDistance = window.innerWidth * 4;
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 5}px`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const xPosition = -moveDistance * self.progress;
            gsap.set(titlesRef.current, { x: xPosition });
            glimpsImgCards.forEach((card, index) => {
              const staggerOffset = index * 0.075;
              const scaledProgress = (self.progress - staggerOffset) * 2;
              const individualProgress = Math.max(
                0,
                Math.min(1, scaledProgress)
              );
              const newZ = -1500 + (1500 + 1500) * individualProgress;
              const scaleProgress = Math.min(1, individualProgress * 10);
              const scale = Math.max(0, Math.min(1, scaleProgress));
              gsap.set(card, { z: newZ, scale: scale });
            });
            // Animate indicator
            const indicators = indicatorRef.current
              ? indicatorRef.current.querySelectorAll(".glimps-indicator")
              : [];
            const totalIndicators = indicators.length;
            const progressPerIndicator = 1 / totalIndicators;
            indicators.forEach((indicator, index) => {
              const indicatorStart = index * progressPerIndicator;
              const indicatorOpacity = self.progress > indicatorStart ? 1 : 0.2;
              gsap.to(indicator, { opacity: indicatorOpacity, duration: 0.3 });
            });
          },
        });
      };
      initAnimations();
      window.addEventListener("resize", initAnimations);

      return () => {
        window.removeEventListener("resize", initAnimations);
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
      };
    };
    init();
  }, []);

  return (
    <div className="glimps-featured-work" ref={sectionRef}>
      {/* Animated Gradient Background (from Hero/About/Theme/Location/ProcessCards/Sponsors) */}
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
          className="absolute inset-0 w-full h-full glimps-gradient-fade"
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
      <div className="glimps-featured-images" ref={imagesRef}></div>
      <div className="glimps-featured-titles" ref={titlesRef}>
        <div className="glimps-featured-title-wrapper">
          <Copy>
            <h2 className="text-4xl md:text-7xl font-bold text-white">
              Glimpse from 2025
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
          </Copy>
        </div>
        {workItems.map((item, idx) => (
          <div className="glimps-featured-title-wrapper" key={item.title}>
            <div className="glimps-featured-title-img">
              <img src={item.img} alt="" />
            </div>
            <h1 className="glimps-featured-title">{item.title}</h1>
          </div>
        ))}
      </div>
      {/* <div className="glimps-featured-work-indicator" ref={indicatorRef}></div> */}
      {/* <div className="glimps-featured-work-footer">
        <p className="glimps-mn">Visual Vault [ 10 ]</p>
        <p className="glimps-mn">///////////////////</p>
        <p className="glimps-mn">
          <a href="/work">Browse Full Bizarre</a>
        </p>
      </div> */}
    </div>
  );
};

export default Glimps;
