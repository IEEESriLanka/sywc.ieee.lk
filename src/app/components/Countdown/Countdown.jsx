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
    // Set the target date: July 15th, 2026 at 7:00 PM
    const targetDate = new Date("2026-07-18T21:00:00");

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

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return null;
  }

  return (
    <div className="countdown-container z-20">
      <div className="countdown-content">
        <div className="countdown-header">
          {/* <h2 className="countdown-title">Registration Opens In</h2> */}
          <h2 className="countdown-title">Registration opens soon</h2>
          <p className="countdown-subtitle">
            Get ready to register for IEEE SLSYWC 2026
          </p>
        </div>

        {/* <div className="countdown-timer">
          <div className="countdown-item">
            <div className="countdown-number">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div> */}

        <div className="countdown-info">
          <p className="countdown-date">
            Registration opens on <strong>July 17th, 2026 at 7:00 PM</strong>
          </p>
          <p className="countdown-description">
            Be among the first to secure your spot at the flagship IEEE event in
            Sri Lanka
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
