"use client";

import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Set the target date: September 1st, 2026 at 12:00 AM
    const targetDate = new Date("2026-07-01T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return null;
  }

  return (
    <div className="countdown-container z-20">
      <div className="countdown-content">
        {/* Header */}
        <div className="countdown-header">
          <h2 className="countdown-title">Registration Opens Soon</h2>
          <p className="countdown-subtitle">
            Get ready to register for IEEE SLSYWC 2026
          </p>
        </div>

        {/* Event Info */}
        <div className="countdown-info">
          <p className="countdown-date">
            Registration will open on{" "}
            <strong>July 4th, 2026</strong>
          </p>
          <p className="countdown-description">
            Be among the first to secure your spot at the flagship IEEE Sri
            Lanka Section Young Professionals &amp; Women in Engineering Congress.
          </p>

          {/* Info Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {[
              { text: "September 18–20, 2026" },
              { text: "Club Palm Bay, Marawila" },
              { text: "250 Delegates Expected" },
            ].map((pill) => (
              <div
                key={pill.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  background: "rgba(255, 203, 64, 0.06)",
                  border: "1px solid rgba(255, 203, 64, 0.22)",
                  color: "#c8d8f0",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                }}
              >
                <span>{pill.text}</span>
              </div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div style={{ marginTop: "40px" }}>
            <a href="/" className="countdown-back-btn">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
