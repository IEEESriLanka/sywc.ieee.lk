"use client";

import React, { useState, useEffect } from "react";
import { Target, Globe, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useRegistrationStatus } from "../../hooks/useRegistrationStatus";
import Copy from "../Copy/Copy";
import Fireworks from "../Fireworks";
import NeuralNetwork from "../NeuralNetwork";

const RegisterCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isRegistrationOpen, isRegistrationEnded, timeLeft } =
    useRegistrationStatus();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Leadership Development",
      description: "Enhance your leadership skills with expert guidance",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Networking",
      description: "Connect with industry leaders worldwide",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Discover cutting-edge technologies and trends",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const stats = [
    { number: "500+", label: "Expected Delegates" },
    { number: "50+", label: "Expert Speakers" },
    { number: "3", label: "Intensive Days" },
  ];

  return (
    <div
      id="register"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Fireworks Background */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
        <Fireworks />
      </div>
      {/* Animated Gradient Background (from Hero/About/Theme/Location/ProcessCards/Sponsors/Glimps/Team) */}
      <div className="absolute inset-0 w-full h-full z-10">
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
          className="absolute inset-0 w-full h-full registercta-gradient-fade"
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

      {/* Top fader for smooth transition */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-10 z-20"
        style={{
          background:
            "linear-gradient(to bottom, #0A1B2E 0%, #0E214A 60%, rgba(11,17,34,0.0) 100%)",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Title */}
          <Copy>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Ready to Join the
              <span className="block bg-gradient-to-r from-[#ffcb40] via-[#d4ec00] to-[#123a85] bg-clip-text text-transparent animate-gradient-move">
                Flagship Event of IEEE Sri Lanka Section
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mb-8"></div>

            {/* Subtitle */}
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Don't miss your chance to be part of IEEE SLSYWC 2026 - where
              innovation meets leadership and connections last a lifetime.
            </p>
          </Copy>
          {/* Features Grid with Connecting Animation */}
          {/* Features Grid with Connecting Animation */}
          <div className="relative mb-16">
             {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-[#004CF1] via-[#00ECEC] to-[#00B836]"
              ></motion.div>
            </div>

             {/* Connecting Line (Mobile) */}
             <div className="absolute left-1/2 top-0 w-1 h-full bg-white/5 -translate-x-1/2 md:hidden rounded-full overflow-hidden">
              <motion.div
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                className="w-full bg-gradient-to-b from-[#004CF1] via-[#00ECEC] to-[#00B836]"
              ></motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.6 }} // Slower stagger
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-[#030712] p-8 rounded-2xl border border-white/10 hover:border-[#00ECEC]/50 transition-colors duration-500 relative z-20 h-full flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} p-[2px] mb-6 shadow-[0_0_20px_rgba(0,236,236,0.3)] group-hover:shadow-[0_0_40px_rgba(0,236,236,0.6)] transition-shadow duration-500`}>
                      <div className="w-full h-full bg-[#0a0f1c] rounded-full flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ECEC] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12 flex flex-col items-center gap-6">
            {isRegistrationEnded ? (
              <div className="group relative inline-flex items-center gap-3 bg-gray-800 text-gray-400 font-bold px-12 py-6 rounded-full text-lg border border-gray-700 cursor-not-allowed">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Registration Closed</span>
              </div>
            ) : isRegistrationOpen ? (
              <a href="/register" className="register-button">
                <span className="button-text">Register Now</span>
                <div className="button-glow"></div>
              </a>
            ) : (
              <div className="relative group p-[2px] rounded-full bg-gradient-to-r from-[#ffcb40] via-[#b4860b] to-[#ffcb40] bg-[length:200%_auto] animate-gradient-move">
                <div className="bg-[#030712] rounded-full px-10 py-5 flex items-center gap-3 relative overflow-hidden group-hover:bg-[#0a0f1c] transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-[#ffcb40] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white font-semibold tracking-wide">
                      {/* Registration Opens in <span className="text-[#ffcb40] font-bold">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span> */}
                      Registration opens soon
                    </span>
                </div>
              </div>
            )}

            <a
              href="/past-congress"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#ffcb40]/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#ffcb40] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,203,64,0.3)] shadow-[0_0_10px_rgba(255,203,64,0.1)]"
            >
              <span className="text-[#ffcb40] font-medium tracking-wider uppercase text-sm group-hover:text-[#ffdb70] transition-colors border-b border-[#ffcb40]/30 pb-0.5">See Past Congresses</span>
              <svg
                className="w-5 h-5 text-white/70 group-hover:text-[#ffcb40] transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 3.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          background: linear-gradient(135deg, #b4860b 0%, #ffcb40 50%, #fbf5b7 100%);
          border: none;
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(255, 203, 64, 0.3);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .register-button:hover {
          transform: translateY(-2px);
          color: #0f172a;
          box-shadow: 0 0 25px rgba(255, 203, 64, 0.6),
            0 0 50px rgba(255, 203, 64, 0.3);
        }

        .register-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #b4860b,
            #ffcb40,
            #fbf5b7,
            #ffcb40,
            #b4860b
          );
          background-size: 200% auto;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
          animation: shine 3s linear infinite;
        }

        .register-button:hover::before {
          opacity: 1;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .button-text {
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.5s;
          z-index: 1;
        }

        .register-button:hover .button-glow {
          left: 150%;
          transition: 0.7s ease-in-out;
        }
      `}</style>

      {/* Floating Action Elements */}
      {/* <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div> */}
    </div>
  );
};

export default RegisterCTA;
