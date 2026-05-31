"use client";
import { useRef } from "react";
import "./About.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";
import AnimatedBackground from "../ui/AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    // Image Reveal (Mask expansion)
    tl.fromTo(imageRef.current, 
      { clipPath: "inset(0 100% 0 0)", filter: "grayscale(100%)" },
      { clipPath: "inset(0 0% 0 0)", filter: "grayscale(0%)", duration: 1.2, ease: "power4.out" }
    );

    // Text Stagger Reveal
    tl.from(".premium-text-reveal", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.8"); // Overlap with image reveal

    // Line expansion
    tl.from(".deco-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        ease: "circ.out"
    }, "-=1");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about-premium" className="about-premium-section">
      <AnimatedBackground showNeuralNetwork={true} />
      <div className="container mx-auto px-6">
        
        {/* Section Header - Full Width */}
        <div className="mb-8 md:mb-20 premium-text-reveal">
            <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-[#b4860b]"></span>
                <span className="text-[#b4860b] text-sm font-mono tracking-widest uppercase">System Initialization</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                INTRODUCING <br />
                <span className="text-gold-gradient">THE THEME</span>
            </h2>
        </div>

        {/* Main Grid Content */}
        <div className="grid-cols-premium">
            
            {/* LEFT: Image Column */}
            <div className="relative flex justify-center md:justify-start">
                <div ref={imageRef} className="premium-image-container w-full max-w-[300px] md:max-w-[400px] animate-float">
                    <img 
                        src="/theme-img.png" 
                        alt="Theme Portrait" 
                        className="w-full h-auto object-contain" 
                    />
                </div>
            </div>

            {/* RIGHT: Content Column */}
            <div className="flex flex-col justify-center space-y-8 md:space-y-12" ref={textRef}>
                
                {/* Description Block */}
                <div className="prose prose-lg premium-text-reveal">
                     <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                        Witness the <span className="text-[#ffcb40] font-medium">digital evolution</span>. An attempt to empower innovations for a better tomorrow with the 15th installment of the largest technical congress in the country.
                    </p>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-6">
                        The <strong className="text-white font-semibold">SLSYW Congress 2026</strong> utilizes the core processing power of united researchers and industry professionals to unravel the theme:
                    </p>
                </div>

                {/* Theme Highlight */}
                <div className="premium-text-reveal pl-6 border-l-4 border-[#b4860b]">
                    <h3 className="text-3xl md:text-5xl font-bold text-highlight-shimmer py-2">
                        ‘Intelligence for Impact’
                    </h3>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-4 pt-4 premium-text-reveal">
                    {["INNOVATION", "IMPACT", "TECH", "FUTURE", "GLOBAL"].map((tag, i) => (
                        <div key={i} className="premium-tag cursor-default hover:border-[#ffcb40] transition-colors">
                           <span className="text-gold-gradient font-semibold tracking-widest">{tag}</span>
                        </div>
                    ))}
                </div>

            </div>

        </div>

      </div>
    </section>
  );
};

export default About;
