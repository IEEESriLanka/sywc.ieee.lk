"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";
import "./Speakers.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Official speakers lineup (23 speakers)
const speakersData = [
  {
    id: 1,
    name: "Mr. Kavin Gunasekara",
    occupation: "Chair, IEEE SL SYWC '26",
    image: "/speakers_final/Kavin Gunasekara_no_bg.webp",
  },
  {
    id: 2,
    name: "Prof. Tharaka Samarasinghe",
    occupation: "Chair, IEEE Sri Lanka Section",
    image: "/speakers_final/Prof Tharaka Samarasinghe_no_bg.webp",
  },
  {
    id: 3,
    name: "Mr. Eran Wickramaratne",
    occupation: "Member of Parliament, Sri Lanka",
    image: "/speakers_final/Eran Wickramaratne_no_bg.webp",
  },
  {
    id: 4,
    name: "Prof. Rohit Sharma",
    occupation:
      "Professor and Dean of International Relations, Indian Institute of Technology, Ropar",
    image: "/speakers_final/Prof. Rohit Sharma_no_bg.webp",
  },
  {
    id: 5,
    name: "Mr. Dimuthu Anuraj",
    occupation:
      "Lead Ambassador - IEEE Collabratec, Founding Chairman of the 1st IEEE CIS Chapter in Sri Lanka",
    image: "/speakers_final/Mr. Dimuthu Anuraj_no_bg.webp",
  },
  {
    id: 6,
    name: "Dr. Mohammed Muzahir Abbas",
    occupation:
      "Macquarie University, Australia; MTT-S YP Region 10 Coordinator",
    image: "/speakers_final/Dr. Mohammed Muzahir Abbas_no_bg.webp",
  },
  {
    id: 7,
    name: "Mr. Kulunu Chakshana",
    occupation: "Chair, IEEE Young Professionals Sri Lanka",
    image: "/speakers_final/Mr. Kulunu Chakshana_no_bg.webp",
  },
  {
    id: 8,
    name: "Dr. Akila Wijethunge",
    occupation:
      "Chair, IEEE Industrial Electronics Society (IES) Sri Lanka Chapter",
    image: "/speakers_final/Dr. Akila Wijethunge_no_bg.webp",
  },
  {
    id: 9,
    name: "Mr. Vamsi Krishna Addepalli",
    occupation: "IEEE Region 10 Student Representative & Speaker",
    image: "/speakers_final/Mr. Vamsi Krishna Addepalli_no_bg.webp",
  },
  {
    id: 10,
    name: "Mr. Shantanu Suman",
    occupation: "IEEE Leader & Speaker",
    image: "/speakers_final/Mr. Shantanu Suman_no_bg.webp",
  },
  {
    id: 11,
    name: "Ms. Punnam Chandrika",
    occupation: "IEEE Volunteer & Speaker",
    image: "/speakers_final/Chandrika Punnam_no_bg.webp",
  },
  {
    id: 12,
    name: "Dr. Sudeendra Koushik",
    occupation:
      "President, IEEE Technology and Engineering Management Society (TEMS)",
    image: "/speakers_final/Dr. Sudeendra Koushik_no_bg.webp",
  },
  {
    id: 13,
    name: "Ms. Dorothy Stanley",
    occupation:
      "Hewlett Packard Enterprise | IEEE 802.11 Working Group Chair",
    image: "/speakers_final/Ms.Dorothy Stanley_no_bg.webp",
  },
  {
    id: 14,
    name: "Dr. Subodha Charles",
    occupation:
      "Chair, IEEE Ad Hoc Committee on Driving Career Readiness for Students, Chair, IEEE MGA Student Activities Committee, Group Chairman & CEO, Pearl Cluster",
    image: "/speakers_final/Dr Subodha Charles_no_bg.webp",
  },
  {
    id: 15,
    name: "Ms. Warunika Hippola",
    occupation: "Treasurer, IEEE Sri Lanka Section",
    image: "/speakers_final/Ms. Warunika Hippola_no_bg.webp",
  },
  {
    id: 16,
    name: "Mr. Dhammika Marasinghe",
    occupation:
      "Industrial Representative, IEEE MGA Student Activities Committee",
    image: "/speakers_final/Mr. Dhammika Marasinghe_no_bg.webp",
  },
  {
    id: 17,
    name: "Mr. Kavinga Upul Ekanayake",
    occupation: "Vice Chair (Chair-Elect), IEEE Sri Lanka Section",
    image: "/speakers_final/Mr. Kavinga Upul Ekanyake_no_bg.webp",
  },
  {
    id: 18,
    name: "Mr. Abdelrahman Metwally",
    occupation:
      "Chair, Egypt Chapter of the IEEE Aerospace and Electronic Systems Society (AESS) and International Director, Region 8",
    image: "/speakers_final/Mr. Abdelrahman Metwally_no_bg.webp",
  },
  {
    id: 19,
    name: "Mr. Sai Prashanth",
    occupation:
      "Chair, Ad Hoc Committee & Technical Activities Board (TAB) Young Professionals Representative, IEEE Education Society",
    image: "/speakers_final/Mr.Sai Prashanth_no_bg.webp",
  },
  {
    id: 20,
    name: "Ms. Chethana Dilukshi",
    occupation: "Ambassador, IEEE Industrial Electronics Society (IES)",
    image: "/speakers_final/Ms. Chethana Dilukshi_no_bg.webp",
  },
  {
    id: 21,
    name: "Mr. Janitha Dissanayake",
    occupation: "Chair, IEEE IAS SL Chapter",
    image: "/speakers_final/Mr. Janitha Dissanayake_no_bg.webp",
  },
  {
    id: 22,
    name: "Ms. Linaya Gunawardena",
    occupation: "Secretary, IEEE SL SYWC '26",
    image: "/speakers_final/Linaya Gunawardena_no_bg.webp",
  },
  {
    id: 23,
    name: "Mr. Dulith Herath",
    occupation:
      "Founder & Chairman of Kapruka Holdings PLC | Founder of Java Lounge",
    image: "/speakers_final/Mr. Dulith Herath_no_bg.webp",
  },
];

// Official Emcees & Moderators lineup
const emceesModeratorsData = [
  {
    id: "em-1",
    name: "Mr. Manodya Nabadawewa",
    image: "/speakers_final/Mr. Manodya Nabadawewa_no_bg.webp",
  },
  {
    id: "em-2",
    name: "Ms. Amirah Rasmin",
    image: "/speakers_final/Ms. Amirah Rasmin_no_bg.webp",
  },
  {
    id: "em-3",
    name: "Ms. Thulanya Dewasurendra",
    image: "/speakers_final/Ms. Thulanya Dewasurendra_no_bg.webp",
  },
];

// Helper to chunk speakers into batches of 4
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const speakerBatches = chunkArray(speakersData, 4);
const TOTAL_CARDS_COUNT = speakerBatches.length + 1; // Speaker batches + 1 Emcees & Moderators

const SpeakerItem = ({ person, badgeRole }) => {
  return (
    <div className="speaker-mini-card group flex flex-col rounded-2xl bg-gradient-to-b from-[#0a1224] to-[#040814] border border-white/[0.1] hover:border-[#ffcb40]/60 hover:shadow-[0_0_30px_rgba(255,203,64,0.18)] transition-all duration-300 overflow-hidden relative w-full">
      {/* Corner Cyber Reticles with Gold/Cyan Highlights */}
      <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-l-2 border-[#ffcb40]/50 group-hover:border-[#ffcb40] transition-colors duration-300 z-20 pointer-events-none" />
      <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-r-2 border-[#ffcb40]/50 group-hover:border-[#ffcb40] transition-colors duration-300 z-20 pointer-events-none" />
      <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-l-2 border-[#00ecec]/40 group-hover:border-[#00ecec] transition-colors duration-300 z-20 pointer-events-none" />
      <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-r-2 border-[#00ecec]/40 group-hover:border-[#00ecec] transition-colors duration-300 z-20 pointer-events-none" />

      {/* Top Gold Laser Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffcb40] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20 pointer-events-none" />

      {/* Role Badge if provided (Emcees / Moderators) */}
      {badgeRole && (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-30 pointer-events-none">
          <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-[#030710]/95 text-[#ffcb40] border border-[#ffcb40]/60 shadow-lg">
            {badgeRole}
          </span>
        </div>
      )}

      {/* Studio Portrait Header with Animated Golden Glow Aura */}
      <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/4] overflow-hidden bg-gradient-to-b from-[#0e1a33]/90 via-[#0a1224] to-[#040814] flex items-end justify-center px-2 pt-2 pb-0">
        {/* Animated Golden Spotlight Halo behind Cutouts */}
        <div className="gold-speaker-glow" />

        {person.image ? (
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300 ease-out drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] relative z-10"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#122040] to-[#070d1b] border border-[#ffcb40]/30 group-hover:border-[#ffcb40] flex items-center justify-center text-[#ffcb40] font-mono text-sm sm:text-lg font-bold tracking-wider shadow-inner relative z-10 mb-3 sm:mb-4">
            {person.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 3)
              .map((n) => n[0])
              .join("")}
          </div>
        )}

        {/* Bottom smooth gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#040814] to-transparent pointer-events-none z-10" />
      </div>

      {/* Compact Info Content Area */}
      <div className="px-2.5 sm:px-3.5 pt-1.5 sm:pt-2 pb-2.5 sm:pb-3.5 flex flex-col text-left relative z-10 bg-[#040814]">
        <h4 className="text-xs sm:text-sm md:text-[15px] font-bold text-white group-hover:text-[#ffcb40] transition-colors duration-200 leading-tight tracking-tight line-clamp-1 sm:line-clamp-none">
          {person.name}
        </h4>

        {/* Golden accent bar divider */}
        <div className="w-5 sm:w-7 h-[1.5px] bg-gradient-to-r from-[#ffcb40] via-[#fcf6ba] to-transparent my-1 sm:my-1.5 opacity-70 group-hover:w-12 group-hover:opacity-100 transition-all duration-300 rounded-full" />

        {/* Position / Title */}
        {person.occupation ? (
          <div className="min-h-[1.8rem] sm:min-h-[2.2rem] flex items-start">
            <p className="text-[10px] sm:text-[11.5px] md:text-xs text-gray-300 group-hover:text-amber-100/90 font-normal leading-tight sm:leading-snug line-clamp-2 transition-colors duration-200">
              {person.occupation}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Speakers = () => {
  useGSAP(() => {
    const cards = gsap.utils.toArray(".speaker-stacked-card");
    if (!cards || cards.length === 0) return;

    cards.forEach((card, index) => {
      // Pin card at top
      if (index < cards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `speaker-stack-pin-${index}`,
          anticipatePin: 1,
        });

        // High-performance GSAP scrub tween
        gsap.to(card, {
          scale: 0.84,
          rotation: index % 2 === 0 ? 3 : -3,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: 0.4,
          },
        });
      }
    });
  }, []);

  return (
    <div
      className="speakers-stacked-container flex flex-col items-center gap-12 py-16 min-h-screen relative w-full overflow-hidden"
      style={{
        backgroundColor: "#030710",
      }}
    >
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, #ffcb40, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, #00ecec, transparent 70%)" }}
        />
      </div>

      {/* Mobile Top Heading */}
      <div className="speakers-mobile-heading text-center z-10 pt-20">
        <Copy>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Meet Our <span className="gold-text">Speakers</span>
          </h2>
        </Copy>
        <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
      </div>

      {/* Speaker Batches Cards */}
      {speakerBatches.map((batch, batchIndex) => {
        return (
          <div
            key={`speaker-batch-${batchIndex}`}
            className="speaker-stacked-card w-full rounded-none md:rounded-2xl flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 px-3 sm:px-6 md:px-12 relative overflow-hidden min-h-screen md:min-h-0"
          >
            {/* Optimized Solid Card Background */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-[#070d1be8] border border-white/[0.08]" />

            {/* Corner Cyber Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ffcb40]/40 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ffcb40]/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00ecec]/40 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00ecec]/40 pointer-events-none z-20" />

            {/* Card Header (safe below navbar) */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3 z-10 pb-2 sm:pb-2.5 border-b border-white/[0.08]">
              <div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Meet Our <span className="gold-text">Speakers</span>
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 font-light mt-0.5">
                  Distinguished leaders, academic pioneers &amp; international delegates
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] sm:text-xs font-bold font-mono text-[#030710] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-widest shadow-md">
                  {`Lineup ${String(batchIndex + 1).padStart(2, "0")} / ${String(
                    TOTAL_CARDS_COUNT
                  ).padStart(2, "0")}`}
                </span>
              </div>
            </div>

            {/* Speaker Cards Grid (2x2 on mobile, 4-col on desktop) */}
            <div
              className={`w-full flex-1 grid gap-2.5 sm:gap-4 md:gap-5 z-10 my-auto items-center ${
                batch.length === 3
                  ? "grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto"
                  : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {batch.map((person, pIndex) => (
                <div
                  key={person.id}
                  className={
                    batch.length === 3 && pIndex === 2
                      ? "col-span-2 sm:col-span-1 max-w-[200px] sm:max-w-none mx-auto w-full"
                      : "w-full"
                  }
                >
                  <SpeakerItem person={person} />
                </div>
              ))}
            </div>

            {/* Bottom Progress Bar Indicator */}
            <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono text-gray-400 pt-2 sm:pt-2.5 mt-1 sm:mt-2 border-t border-white/[0.06] z-10">
              <span className="text-gray-400">IEEE SLSYWC 2026</span>
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_CARDS_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === batchIndex
                        ? "w-6 bg-[#ffcb40]"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">SCROLL TO EXPLORE</span>
            </div>
          </div>
        );
      })}

      {/* Distinguished Bottom Card: Emcees & Moderators */}
      <div className="speaker-stacked-card w-full rounded-none md:rounded-2xl flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 px-3 sm:px-6 md:px-12 relative overflow-hidden min-h-screen md:min-h-0">
        {/* Solid Card Background */}
        <div className="absolute inset-0 w-full h-full -z-10 bg-[#070d1be8] border border-white/[0.08]" />

        {/* Corner Cyber Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ffcb40]/40 pointer-events-none z-20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ffcb40]/40 pointer-events-none z-20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00ecec]/40 pointer-events-none z-20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00ecec]/40 pointer-events-none z-20" />

        {/* Card Header */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3 z-10 pb-2 sm:pb-2.5 border-b border-white/[0.08]">
          <div>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Meet Our <span className="gold-text">Emcees &amp; Moderators</span>
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 font-light mt-0.5">
              The voices facilitating our stage ceremonies, sessions &amp; discussions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-bold font-mono text-[#030710] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-widest shadow-md">
              {`Lineup ${String(TOTAL_CARDS_COUNT).padStart(2, "0")} / ${String(
                TOTAL_CARDS_COUNT
              ).padStart(2, "0")}`}
            </span>
          </div>
        </div>

        {/* 3 Emcees & Moderators Grid */}
        <div className="w-full max-w-5xl mx-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 z-10 my-auto items-center">
          {emceesModeratorsData.map((person, pIndex) => (
            <div
              key={person.id}
              className={
                pIndex === 2
                  ? "col-span-2 sm:col-span-1 max-w-[200px] sm:max-w-none mx-auto w-full"
                  : "w-full"
              }
            >
              <SpeakerItem person={person} badgeRole={person.role} />
            </div>
          ))}
        </div>

        {/* Bottom Progress Bar Indicator */}
        <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono text-gray-400 pt-2 sm:pt-2.5 mt-1 sm:mt-2 border-t border-white/[0.06] z-10">
          <span className="text-gray-400">IEEE SLSYWC 2026</span>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_CARDS_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === TOTAL_CARDS_COUNT - 1
                    ? "w-6 bg-[#ffcb40]"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400">HOST &amp; MODERATION</span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1001px) {
          .speakers-mobile-heading {
            display: none !important;
          }
        }
        @media (max-width: 1000px) {
          .speakers-mobile-heading {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Speakers;
