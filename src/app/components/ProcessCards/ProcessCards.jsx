"use client";
import "./ProcessCards.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const schedule1 = [
  { time: "12:30 PM - 1:30 PM", event: "Delegate Registration" },
  { time: "1:30 PM - 1:40 PM", event: "Ushering of Guests" },
  {
    time: "1:40 PM - 2:00 PM",
    event: "Commencement of Opening Ceremony with Oil Lamp",
  },
  { time: "2:00 PM - 2:05 PM", event: "Welcome Speech" },
  {
    time: "2:05 PM - 2:20 PM",
    event: "Inaugural Showcase",
  },
  {
    time: "2:20 PM - 2:35 PM",
    event: "Speech by IEEE Sri Lanka Section Chair",
  },
  {
    time: "2:35 PM - 3:05 PM",
    event: "An Overview of Congress Protocols",
  },
  {
    time: "3:05 PM - 3:45 PM",
    event: "Keynote Session by Mr. Eran Wickramaratne",
  },
  { time: "3:45 PM - 4:25 PM", event: "IEEE EPS Keynote" },
  { time: "4:25 PM - 4:55 PM", event: "Membership drive by IAS" },
  { time: "4:55 PM - 5:55 PM", event: "Keynote Session" },
  { time: "5:55 PM - 6:10 PM", event: "Room Allocation" },
  { time: "6:10 PM - 7:10 PM", event: "Getting Ready for Handawa" },
  { time: "7:10 PM - 8:10 PM", event: "IEEE Handawa & Dinner" },
  { time: "8:10 PM - 10:10 PM", event: "IEEE Handawa" },
];

const schedule2 = [
  { time: "7:00 AM - 8:00 AM", event: "Chapter Stalls" },
  { time: "8:00 AM - 9:00 AM", event: "Breakfast + Chapter Stalls" },
  { time: "9:00 AM - 9:20 AM", event: "YP Session" },
  { time: "9:20 AM - 9:30 AM", event: "Opening Plenary" },
  { time: "9:30 AM - 10:15 AM", event: "IEEE Standards Session" },
  { time: "10:15 AM - 10:30 AM", event: "Membership Drive by ComSoc" },
  {
    time: "10:30 AM - 11:30 AM",
    event: "Panel Discussion on IES, EPS and DEIS",
  },
  { time: "11:30 AM - 11:45 AM", event: "Membership Drive by TEMS" },
  { time: "11:45 AM - 12:15 PM", event: "Group Photo" },
  { time: "12:15 PM - 1:15 PM", event: "Lunch" },
  {
    time: "1:15 PM - 2:15 PM",
    event: "Opportunity Pathways with IEEE - Panel Discussion",
  },
  { time: "2:15 PM - 3:05 PM", event: "DEIS Session" },
  {
    time: "3:05 PM - 4:05 PM",
    event:
      "Panel Discussion on Entrepreneurship",
  },
  {
    time: "4:20 PM - 6:05 PM",
    event: "Outbound Training Activities",
  },
  {
    time: "6:05 PM - 7:05 PM",
    event: "Preparation Time for Awards Night",
  },
  { time: "07:05 PM - 8:35 PM", event: "Awards Night" },
  { time: "08:30 PM - 11:20 PM", event: "Dinner and DJ" },
];

const schedule3 = [
  { time: "8:00 AM - 9:00 AM", event: "Breakfast" },
  { time: "9:00 AM - 9:15 AM", event: "Opening Plenary" },
  {
    time: "9:15 AM - 10:30 AM",
    event: "Panel Discussion on MTTS, CASS, AESS",
  },
  { time: "10:30 AM - 10:45 AM", event: "Membership Drive by IES" },
  {
    time: "10:45 AM - 11:00 AM",
    event: "Membership Drive by AESS",
  },
  {
    time: "11:00 AM - 11:15 AM",
    event: "Commencement of Closing Ceremony",
  },
  {
    time: "11:15 AM - 12:10 PM",
    event: "Prize Giving and Final Remarks by Yohan, Uvindu and Kavin",
  },
  { time: "12:10 PM - 12:15 PM", event: "Vote of Thanks" },
  { time: "12:15 PM - 1:15 PM", event: "Lunch" },
];

const processCardsData = [
  {
    index: "01",
    title: "18th Sep 2026",
    image: "/hero/1.jpeg",
    schedule: schedule1,
  },
  {
    index: "02",
    title: "19th Sep 2026",
    image: "/hero/2.jpeg",
    schedule: schedule2,
  },
  {
    index: "03",
    title: "20th Sep 2026",
    image: "/hero/3.jpeg",
    schedule: schedule3,
  },
];

const ProcessCards = () => {
  useGSAP(() => {
    const cards = gsap.utils.toArray(".process-card");
    if (!cards || cards.length === 0) return;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.88,
          rotation: index % 2 === 0 ? 3.5 : -3.5,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <div
      className="process-cards flex flex-col items-center gap-12 py-16 min-h-screen"
      style={{
        backgroundColor: "#030710",
      }}
    >
      <div className="process-mobile-heading text-center">
        <Copy>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Event Schedule
          </h2>
        </Copy>
        <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
      </div>
      {processCardsData.map((cardData, index) => {
        const isEven = index % 2 === 1;
        return (
          <div
            key={index}
            className="process-card w-full rounded-none md:rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch p-4 md:p-12 relative overflow-hidden min-h-screen md:min-h-0"
          >
            {/* Dark Cyber Background matching the other sections */}
            <div className="absolute inset-0 w-full h-full -z-10">
              {/* Base background gradient */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 40%, #0d162b 0%, #030710 80%), linear-gradient(180deg, #030710 0%, #060b17 100%)",
                }}
              ></div>

              {/* Animated subtle grid pattern */}
              <div className="absolute inset-0 grid-pattern opacity-30"></div>

              {/* Glowing ambient orbs matching the theme */}
              <div className="absolute inset-0 glowing-orbs opacity-40">
                <div
                  className="orb orb-1"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 203, 64, 0.15), transparent 70%)",
                  }}
                ></div>
                <div
                  className="orb orb-2"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0, 236, 236, 0.15), transparent 70%)",
                  }}
                ></div>
                <div
                  className="orb orb-3"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0, 76, 241, 0.15), transparent 70%)",
                  }}
                ></div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ffcb40]/40 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ffcb40]/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ffcb40]/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ffcb40]/40 pointer-events-none z-20" />

            {/* Two-column alternating layout */}
            {isEven ? (
              <>
                {/* Text Left */}
                <div className="flex flex-col justify-start items-center w-full md:w-1/2 p-2 sm:p-4 md:p-8 z-10 h-full overflow-hidden">
                  <div className="w-full text-center mb-2 sm:mb-4 md:mb-6 flex-shrink-0">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 sm:mb-2">
                      {cardData.title}
                    </h2>
                    <span className="text-[11px] sm:text-xs font-bold font-mono text-[#030710] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md inline-block">
                      {`Day ${index + 1}`}
                    </span>
                  </div>
                  <div className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto pr-1 sm:pr-2 schedule-list-scroll">
                    <ul className="divide-y divide-white/[0.08] pb-6">
                      {cardData.schedule.map((item, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[130px_1fr] sm:grid-cols-[155px_1fr] md:grid-cols-[175px_1fr] items-start py-2.5 md:py-3 px-2 sm:px-3 gap-2.5 sm:gap-3 md:gap-4 hover:bg-white/[0.04] rounded-lg transition-colors duration-200"
                        >
                          <span className="text-[11px] sm:text-xs md:text-sm font-mono text-[#ffcb40] font-semibold text-left sm:text-right leading-snug pt-0.5 tracking-tight flex-shrink-0">
                            {item.time}
                          </span>
                          <span className="text-xs sm:text-sm md:text-base text-gray-200 font-normal leading-snug break-words">
                            {item.event}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Image Right */}
                <div className="process-card-img w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 z-10">
                  <img
                    src={cardData.image}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 max-h-[500px]"
                    style={{ minHeight: "300px" }}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Image Left */}
                <div className="process-card-img w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 z-10">
                  <img
                    src={cardData.image}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 max-h-[500px]"
                    style={{ minHeight: "300px" }}
                  />
                </div>
                {/* Text Right */}
                <div className="flex flex-col justify-start items-center w-full md:w-1/2 p-2 sm:p-4 md:p-8 z-10 h-full overflow-hidden">
                  <div className="w-full text-center mb-2 sm:mb-4 md:mb-6 flex-shrink-0">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 sm:mb-2">
                      {cardData.title}
                    </h2>
                    <span className="text-[11px] sm:text-xs font-bold font-mono text-[#030710] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md inline-block">
                      {`Day ${index + 1}`}
                    </span>
                  </div>
                  <div className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto pr-1 sm:pr-2 schedule-list-scroll">
                    <ul className="divide-y divide-white/[0.08] pb-6">
                      {cardData.schedule.map((item, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[130px_1fr] sm:grid-cols-[155px_1fr] md:grid-cols-[175px_1fr] items-start py-2.5 md:py-3 px-2 sm:px-3 gap-2.5 sm:gap-3 md:gap-4 hover:bg-white/[0.04] rounded-lg transition-colors duration-200"
                        >
                          <span className="text-[11px] sm:text-xs md:text-sm font-mono text-[#ffcb40] font-semibold text-left sm:text-right leading-snug pt-0.5 tracking-tight flex-shrink-0">
                            {item.time}
                          </span>
                          <span className="text-xs sm:text-sm md:text-base text-gray-200 font-normal leading-snug break-words">
                            {item.event}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
      <style jsx>{`
        @media (min-width: 1001px) {
          .process-mobile-heading {
            display: none !important;
          }
        }
        @media (max-width: 1000px) {
          .process-mobile-heading {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcessCards;
