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
  return (
    <section className="sponsorships-section min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="sponsorships-glass-card w-full h-full flex items-center justify-center relative z-10">
        {/* Animated Gradient Background (matching other sections) */}
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
            className="absolute inset-0 w-full h-full sponsorships-gradient-fade"
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
{/* Sponsorships */}
        <div className="container mx-auto px-4">
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

          {/* Desktop Marquee */}
          <div className="hidden md:block mb-16">
            <div className="relative overflow-hidden">
              <div
                className="flex animate-marquee"
                style={{ width: "max-content" }}
              >
                {sponsorships.map((sponsorship, index) => (
                  <div key={index} className="flex-shrink-0 mx-8 group">
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[120px] min-w-[200px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 1}`}
                        className="max-h-20 max-w-[180px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {sponsorships.map((sponsorship, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 mx-8 group"
                  >
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[120px] min-w-[200px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 1}`}
                        className="max-h-20 max-w-[180px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Marquee */}
          <div className="md:hidden space-y-8">
            <div className="relative overflow-hidden">
              <div
                className="flex animate-marquee-mobile"
                style={{ width: "max-content" }}
              >
                {sponsorships.slice(0, 8).map((sponsorship, index) => (
                  <div key={index} className="flex-shrink-0 mx-4 group">
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[80px] min-w-[120px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 1}`}
                        className="max-h-12 max-w-[100px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {sponsorships.slice(0, 8).map((sponsorship, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 mx-4 group"
                  >
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[80px] min-w-[120px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 1}`}
                        className="max-h-12 max-w-[100px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex animate-marquee-mobile-reverse"
                style={{ width: "max-content" }}
              >
                {sponsorships.slice(8).map((sponsorship, index) => (
                  <div key={index} className="flex-shrink-0 mx-4 group">
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[80px] min-w-[120px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 9}`}
                        className="max-h-12 max-w-[100px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {sponsorships.slice(8).map((sponsorship, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 mx-4 group"
                  >
                    <div className="bg-[#10182a]/80 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#ffcb40]/20 hover:border-[#ffcb40]/40 min-h-[80px] min-w-[120px] flex items-center justify-center">
                      <img
                        src={`/Sponsorship logos/${sponsorship}`}
                        alt={`Sponsorship ${index + 9}`}
                        className="max-h-12 max-w-[100px] w-auto h-auto object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-mobile-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee-mobile {
          animation: marquee-mobile 15s linear infinite;
        }

        .animate-marquee-mobile-reverse {
          animation: marquee-mobile-reverse 15s linear infinite;
        }

        .sponsorships-section {
          /* background removed to allow Neural Network integration */
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

        /* Sponsorships Gradient Fade Animation */
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
