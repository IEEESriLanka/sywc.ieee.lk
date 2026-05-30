"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "./Copy/Copy";
import AnimatedBackground from "./ui/AnimatedBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Location({
  logoImage = "/hotel/hotel.jpg",
  images = [
    "/hotel/hotel1.jpg",
    "/hotel/hotel2.jpg",
    "/hotel/hotel3.jpg",
    "/hotel/hotel4.jpg",
  ],
  title = ["Club Palm Bay Hotel", "Marawila"],
  buttonText = "See Hotel",
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Bulletproof GSAP Pinning for Desktop!
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const infoBlock = document.querySelector('.loc-info-block');
        const rightCol = document.querySelector('.loc-right-col');
        
        if (infoBlock && rightCol) {
          ScrollTrigger.create({
            trigger: infoBlock,
            start: "center center",
            endTrigger: rightCol,
            end: () => "bottom " + (window.innerHeight / 2 + infoBlock.offsetHeight / 2),
            pin: true,
            pinSpacing: false,
          });
        }
      });

      // 1. Reveal the sticky info block smoothly
      gsap.fromTo('.loc-info-block', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.loc-info-block',
            start: "top 85%",
          }
        }
      );

      // 2. Premium Image Parallax & Reveal
      const imageCards = gsap.utils.toArray('.loc-img-card');
      
      imageCards.forEach((card, index) => {
        // Fade & slide up the container itself
        gsap.fromTo(card, 
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom center",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Subtly move the image inside the container for a parallax window effect
        const img = card.querySelector('img');
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div id="location" ref={containerRef} className="relative w-full text-white py-24 md:py-32 overflow-hidden">
      {/* Background that fits the theme */}
      <AnimatedBackground className="absolute inset-0 z-0 pointer-events-none" showNeuralNetwork={false} />
      
      {/* Top gradient fader blending from the section above */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-32 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(3,7,16,1) 0%, rgba(3,7,16,0.0) 100%)",
        }}
      ></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 lg:gap-24 items-start pb-24">
        
        {/* Sticky Left Column: Clear, Highly Visible Information */}
        <div className="loc-info-block w-full md:w-5/12 lg:w-1/3 flex flex-col items-center md:items-start text-center md:text-left z-30">
            <Copy>
              <h2 className="text-5xl lg:text-7xl font-bold leading-tight gold-text tracking-tight mb-2">
                Location
              </h2>
            </Copy>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00ecec] to-[#004cf1] rounded-full mt-2 mb-10 md:mx-0 mx-auto"></div>

            {/* Floating Glass Logo Wrapper */}
            <div className="relative w-[180px] h-[180px] rounded-full p-2 mb-10 group cursor-pointer perspective-1000">
              <div className="absolute inset-0 rounded-full border border-[#00ecec]/50 bg-[#030710]/40 backdrop-blur-xl group-hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(0,236,236,0.2)] group-hover:shadow-[0_0_40px_rgba(0,236,236,0.4)]"></div>
              <img src={logoImage} className="relative z-10 w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:rotate-3" alt="Hotel Logo" />
            </div>
            
            <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">{title[0]}</h3>
            <p className="text-xl text-[#b8eaff]/80 tracking-wide font-light mb-10 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00ecec]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {title[1]}, Sri Lanka
            </p>

            <a
              href="https://theclubpalmbay.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#00ecec] to-[#004cf1] text-white font-semibold text-lg shadow-[0_0_20px_rgba(0,236,236,0.3)] hover:shadow-[0_0_40px_rgba(0,236,236,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              {buttonText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
        </div>

        {/* Parallax Scrolling Gallery Right Column */}
        <div className="loc-right-col w-full md:w-7/12 lg:w-2/3 flex flex-col gap-16 md:gap-24 z-20 md:mt-24">
          {images.map((img, i) => (
            <div key={i} className="loc-img-card relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 group cursor-pointer">
              
              {/* Taller image to allow for the parallax movement */}
              <img 
                src={img} 
                className="w-full h-[130%] object-cover absolute top-[-15%] transition-transform duration-700 group-hover:scale-105" 
                alt={`Hotel View ${i+1}`}
              />
              
              {/* Overlay styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030710] via-[#030710]/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[2rem] transition-colors duration-500"></div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

