"use client";

import { useState, useEffect } from "react";
import Copy from "./Copy/Copy";
import NeuralNetwork from "./NeuralNetwork";

const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Event starts: September 26, 2026 at 9:00 AM
    const eventDate = new Date("2026-09-18T09:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEventStarted =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Enhanced Animated Background */}
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



      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <Copy>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white drop-shadow-[0_2px_8px_rgba(255,191,71,0.3)]">
              {isEventStarted
                ? "Event is Live!"
                : "IEEE SLSYWC 2026 Starts In"}
            </h2>
          </Copy>
          <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full shadow-lg mb-8"></div>
          <p className="text-xl text-center text-white/80 mb-12 max-w-2xl">
            {isEventStarted
              ? "The IEEE SLSYWC 2026 is now happening! Join us for an incredible experience."
              : "Get ready for the flagship event of the IEEE Sri Lanka Section. The countdown is on!"}
          </p>
        </div>

        {/* Countdown Timer or Event Live Message */}
        {isEventStarted ? (
          <div className="flex justify-center mb-12">
            <div className="text-center">
              <div className="event-live-card">
                <div className="live-icon">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="live-message">
                  <h3 className="text-2xl font-bold mb-2 gold-text">
                    Event is Live!
                  </h3>
                  <p className="text-[#b8eaff]">September 18, 2026</p>
                  <p className="text-[#b8eaff]/70 mt-2">Colombo</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-16 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mx-auto px-4">
              {/* Days */}
              <div className="countdown-card group">
                <div className="countdown-number gold-text">{timeLeft.days}</div>
                <div className="countdown-unit">Days</div>
                <div className="absolute inset-0 bg-[#ffcb40]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>

              {/* Hours */}
              <div className="countdown-card group">
                <div className="countdown-number gold-text">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="countdown-unit">Hours</div>
                <div className="absolute inset-0 bg-[#ffcb40]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>

              {/* Minutes */}
              <div className="countdown-card group">
                <div className="countdown-number gold-text">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="countdown-unit">Minutes</div>
                <div className="absolute inset-0 bg-[#ffcb40]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>

              {/* Seconds */}
              <div className="countdown-card group">
                <div className="countdown-number gold-text">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="countdown-unit">Seconds</div>
                <div className="absolute inset-0 bg-[#ffcb40]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>
          </div>
        )}

        {/* Event Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl mx-auto px-4">
          <div className="event-info-card group">
            <div className="info-icon group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="info-label">
              Event Dates
            </h3>
            <p className="info-detail gold-text">18, 19, 20 September 2026</p>
          </div>

          <div className="event-info-card group">
            <div className="info-icon group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="info-label">Location</h3>
            <p className="info-detail gold-text"> Club Palm Bay Hotel,<br></br>Marawila, Sri Lanka</p>
          </div>

          <div className="event-info-card group">
            <div className="info-icon group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="info-label">
              Expected Attendance
            </h3>
            <p className="info-detail gold-text">250+ Delegates</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
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
        }

        .countdown-card {
          position: relative;
          background: rgba(3, 7, 16, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 203, 64, 0.1);
          border-radius: 20px;
          padding: 2.5rem 1.5rem;
          text-align: center;
          min-width: 140px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .countdown-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 203, 64, 0.3);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .countdown-number {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .countdown-unit {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .event-info-card {
           background: rgba(3, 7, 16, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: all 0.3s ease;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .event-info-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 203, 64, 0.2);
          background: rgba(3, 7, 16, 0.8);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .info-label {
          font-size: 14px !important;
          font-weight: 600 !important;
          color: rgba(255, 255, 255, 0.4) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.25em !important;
          margin-bottom: 0.5rem !important;
          line-height: 1 !important;
        }

        .info-detail {
          font-size: 1.5rem !important;
          font-weight: 800 !important;
          transition: color 0.3s ease !important;
          line-height: 1.2 !important;
        }

        @media (min-width: 768px) {
          .info-detail {
            font-size: 2rem !important;
          }
        }

        .info-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #ffcb40;
        }

        .event-live-card {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(180, 134, 11, 0.15) 0%,
            rgba(15, 23, 42, 0.6) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 203, 64, 0.3);
          border-radius: 24px;
          padding: 3rem 2rem;
          text-align: center;
          min-width: 300px;
          box-shadow: 0 8px 32px rgba(255, 203, 64, 0.15);
          transition: all 0.3s ease;
        }

        .live-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #ffcb40;
          filter: drop-shadow(0 0 10px rgba(255, 203, 64, 0.4));
        }

        .live-message h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffcb40;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          background: linear-gradient(to right, #ffcb40, #fbf5b7, #ffcb40);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .live-message p {
          font-size: 1rem;
          color: #b8eaff;
          font-weight: 500;
        }

        .register-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          background: linear-gradient(135deg, #b4860b 0%, #ffcb40 50%, #fbf5b7 100%);
          border: 1px solid rgba(255, 203, 64, 0.5);
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow:
            0 10px 30px rgba(255, 203, 64, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .register-button:hover {
          transform: translateY(-2px) scale(1.05);
          border-color: #ffcb40;
          box-shadow:
            0 20px 40px rgba(255, 203, 64, 0.4),
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
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s ease;
        }

        .register-button:hover .button-glow {
          left: 100%;
        }

        .event-live-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          background: linear-gradient(135deg, #b4860b 0%, #ffcb40 50%, #fbf5b7 100%);
          border: 1px solid rgba(255, 203, 64, 0.4);
          border-radius: 50px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 203, 64, 0.2);
          cursor: default;
        }

        @media (max-width: 768px) {
          .countdown-card {
            min-width: unset;
            padding: 1.5rem 0.5rem;
          }

          .countdown-number {
            font-size: 2.5rem;
          }

          .countdown-unit {
            font-size: 0.75rem;
            letter-spacing: 1px;
          }

          .register-button {
            padding: 1rem 2rem;
            font-size: 1.125rem;
          }

          .event-info-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EventCountdown;
