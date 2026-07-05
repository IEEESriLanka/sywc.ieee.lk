"use client";

import { useState, useEffect } from "react";

export const useRegistrationStatus = () => {
  const [registrationStatus, setRegistrationStatus] = useState("closed"); // "closed", "open", "ended"
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Registration is open again
    const registrationOpenDate = new Date("2026-07-01T00:00:00");
    // Registration closes: August 13, 2026 at 11:59 PM
    const registrationCloseDate = new Date("2026-08-13T23:59:59");

    const calculateTimeLeft = () => {
      const now = new Date();

      // Check if registration has ended
      if (now > registrationCloseDate) {
        setRegistrationStatus("ended");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Check if registration is open
      if (now >= registrationOpenDate && now <= registrationCloseDate) {
        setRegistrationStatus("open");
        // Calculate time left until registration closes
        const difference = registrationCloseDate - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        return;
      }

      // Registration is closed (not yet opened)
      setRegistrationStatus("closed");
      // Calculate time left until registration opens
      const difference = registrationOpenDate - now;
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

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTimeLeft = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  return {
    registrationStatus,
    isRegistrationOpen: registrationStatus === "open",
    isRegistrationClosed: registrationStatus === "closed",
    isRegistrationEnded: registrationStatus === "ended",
    timeLeft: formatTimeLeft(),
    rawTimeLeft: timeLeft,
  };
};
