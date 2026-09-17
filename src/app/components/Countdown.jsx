"use client";

import { useState, useEffect } from "react";
import Copy from "./Copy/Copy";
import { useRegistrationStatus } from "../hooks/useRegistrationStatus";

const Countdown = () => {
  const { isRegistrationEnded, timeLeft } = useRegistrationStatus();

  return (
    <div
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #1a2a6c 0%, #0a0f1c 80%), linear-gradient(120deg, #0a0f1c 0%, #004cf1 100%)",
      }}
    >
      {/* Animated Gradient Background (from Team component) */}
      <div className="absolute inset-0 w-full h-full z-10">
        {/* Base gradient background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #1A2A6C 0%, #0A0F1C 80%), linear-gradient(120deg, #0A0F1C 0%, #232526 100%)",
            transition: "opacity 0.3s linear",
          }}
        ></div>

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 w-full h-full team-gradient-fade"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, #014034 0%, #0A0F1C 70%), linear-gradient(120deg, #0A0F1C 0%, #00B836 100%)",
            opacity: 0,
            transition: "opacity 0.3s linear",
          }}
        ></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 grid-pattern"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
        </div>

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

        {/* Glowing Orbs */}
        <div className="absolute inset-0 glowing-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#004CF1]/20 via-[#00ECEC]/15 to-[#00B836]/10 blur-xl opacity-60"
          style={{ backgroundSize: "200% 200%" }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <Copy>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,236,236,0.3)]">
              Registration Closes In
            </h2>
          </Copy>
          <div className="w-24 h-1 bg-gradient-to-r from-[#004CF1] to-[#00ECEC] rounded-full shadow-lg mb-8"></div>
          <p className="text-xl text-center text-white/80 mb-12 max-w-2xl">
            Don't miss out on the flagship event of the IEEE Sri Lanka Section.
            Secure your spot before registration closes!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Days */}
            <div className="countdown-card">
              <div className="countdown-number">{timeLeft.days}</div>
              <div className="countdown-unit">Days</div>
            </div>

            {/* Hours */}
            <div className="countdown-card">
              <div className="countdown-number">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="countdown-unit">Hours</div>
            </div>

            {/* Minutes */}
            <div className="countdown-card">
              <div className="countdown-number">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="countdown-unit">Minutes</div>
            </div>

            {/* Seconds */}
            <div className="countdown-card">
              <div className="countdown-number">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="countdown-unit">Seconds</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          {isRegistrationEnded ? (
            <a href="/handbook" className="register-button">
              <span className="button-text">Delegate Handbook</span>
              <div className="button-glow"></div>
            </a>
          ) : (
            <a href="/register" className="register-button">
              <span className="button-text">Register Now</span>
              <div className="button-glow"></div>
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .countdown-card {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(0, 76, 241, 0.1) 0%,
            rgba(0, 236, 236, 0.1) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 236, 236, 0.2);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          min-width: 140px;
          box-shadow: 0 8px 32px rgba(0, 76, 241, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .countdown-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 236, 236, 0.5),
            transparent
          );
        }

        .countdown-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(0, 236, 236, 0.5);
          box-shadow: 0 20px 40px rgba(0, 76, 241, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .countdown-number {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 236, 236, 0.5);
          font-family: "DM Mono", "Courier New", monospace;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .countdown-unit {
          font-size: 0.875rem;
          font-weight: 600;
          color: #00ecec;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.9;
        }

        .register-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #004cf1 0%, #00ecec 100%);
          border: 2px solid rgba(0, 236, 236, 0.3);
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 76, 241, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .register-button:hover {
          transform: translateY(-2px) scale(1.05);
          border-color: rgba(0, 236, 236, 0.8);
          box-shadow: 0 20px 40px rgba(0, 76, 241, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .button-text {
          position: relative;
          z-index: 2;
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .register-button:hover .button-glow {
          left: 100%;
        }

        .register-button-closed {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #9ca3af;
          background: linear-gradient(135deg, #374151 0%, #6b7280 100%);
          border: 2px solid rgba(156, 163, 175, 0.3);
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(55, 65, 81, 0.3);
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .countdown-card {
            min-width: 120px;
            padding: 1.5rem 1rem;
          }

          .countdown-number {
            font-size: 2rem;
          }

          .countdown-unit {
            font-size: 0.75rem;
            letter-spacing: 1px;
          }

          .register-button {
            padding: 1rem 2rem;
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Countdown;
