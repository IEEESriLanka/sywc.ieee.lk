"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "./Copy/Copy";

import WhoWeAre from "./WhoWeAre/WhoWeAre";
import ProcessCards from "./ProcessCards/ProcessCards";
import Speakers from "./Speakers/Speakers";

import Location from "./Location";
import { useGSAP } from "@gsap/react";

import About from "./About/About";
import Marquee from "./Marquee/Marquee";
import Fireworks from "./Fireworks";
import AnimatedBackground from "./ui/AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

const Theme = () => {
  const themeRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useGSAP(() => {
    setIsClient(true);
  }, []);

  useGSAP(() => {
    if (!isClient || !themeRef.current) return;

    const missionLinkWrapper = themeRef.current.querySelector(".mission-link");

    // Store ScrollTrigger instances for cleanup
    const scrollTriggers = [];

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      const missionTrigger = ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(".mission-intro-copy"),
        start: "top 75%",
        once: true,
        id: "theme-mission-link",
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          });
        },
      });

      scrollTriggers.push(missionTrigger);
    }

    return () => {
      // Clean up only Theme component's ScrollTriggers
      scrollTriggers.forEach((trigger) => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="theme">
        <section className="theme-hero">
          <img
            className="theme-hero-bg"
            src="/images/studio/hero.jpeg"
            alt=""
          />
          <h1 className="caps">Theme</h1>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="theme min-h-screen w-full" ref={themeRef}>
        {/* Top fader for smooth transition from previous section */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-full h-32 z-20"
          style={{
            background:
              "linear-gradient(to bottom, #030710 0%, rgba(3,7,16,0.0) 100%)",
          }}
        ></div>
        <div className="theme-desktop">
          <WhoWeAre />
        </div>
        {/* <Schedule /> */}

        <section
          className="mission-intro relative overflow-hidden"
          style={{
            backgroundColor: "#030710",
            color: "#aefcff",
          }}
          id="about"
        >
          <AnimatedBackground showNeuralNetwork={true} />
          {/* Animated Gradient Background (from Hero/About) removed as using global AnimatedBackground */}
          {/* Top fader for smooth transition from previous section */}
          <div
            className="pointer-events-none absolute top-0 left-0 w-full h-24 z-20"
            style={{
              background:
                "linear-gradient(to bottom, #030710 0%, rgba(3,7,16,0.0) 100%)",
            }}
          ></div>
          <div className="mission-intro-col-sm flex items-center justify-center ">
            <div className="bg-white/90 p-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] backdrop-blur-sm z-40 animate-pulse-slow">
              <img
                src="/main-logo.svg"
                className="object-contain w-32 h-32 md:w-48 md:h-48"
                alt="IEEE SLSYW Congress Logo"
              />
            </div>
          </div>
          <div className="mission-intro-col-lg">
            {/* Fireworks background for mobile */}
            <div className="about-mobile-fireworks-wrapper">
              <Fireworks />
            </div>
            <div className="mission-intro-copy">
              {/* Mobile About Heading */}
              <div className="about-mobile-heading">
                  <h2 className="text-4xl md:text-6xl text-center font-bold gold-text">
                    Welcome to the Flagship Event of IEEE Sri Lanka Section
                  </h2>

                  <div className="w-24 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] rounded-full mx-auto mt-6"></div>
              </div>
              <Copy>
                <h3 className="mission-intro-desc">
                  The IEEE Sri Lanka Section Students | Young Professionals |
                  Women in Engineering (IEEE SLSYW) Congress is the flagship
                  event organized by the IEEE Sri Lanka Section. This event
                  serves as the largest technical congress bridging the gap
                  between our nation and the global community, whilst honouring
                  the outstanding volunteers and their endeavours for their
                  impactful contributions made for the country.
                </h3>
                <br />
                <h3 className="mission-intro-desc">
                  IEEE SLSYW Congress brings together volunteers from across
                  the country, spanning various entities, to foster bonds and
                  provide networking opportunities with professionals and
                  industry experts worldwide.
                </h3>
              </Copy>

              {/* <div className="mission-link">
                <BtnLink route="#" label="Learn More About Us" dark />
              </div> */}
            </div>
          </div>
        </section>

        <About />
        <div className="theme-desktop">
          <Marquee text={"Location"} />
        </div>
        <Location />
        <div id="schedule">
          <div className="theme-desktop">
            {/* <Marquee text={"Schedule"} /> */}
          </div>
          {/* <ProcessCards /> */}
        </div>

        <div id="speakers">
          {/* <Speakers /> */}
        </div>

        {/* <section className="recognition">
          <div className="recognition-copy">
            <Copy>
              <p className="sm caps">(Recognition)</p>
              <br />
              <h2>
                Our congress has been recognized by IEEE communities and
                engineering platforms for its excellence, innovation, and
                commitment to fostering the next generation of engineering
                leaders and professionals.
              </h2>
            </Copy>
          </div>
        </section> */}
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .theme-desktop {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .theme-desktop {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .about-mobile-heading {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .about-mobile-heading {
            display: block !important;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 20;
            background: rgba(0, 0, 0, 0.01); /* Remove or adjust as needed */
          }
        }
        .about-mobile-fireworks {
          display: none;
        }
        @media (max-width: 900px) {
          .about-mobile-fireworks {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none;
            background: url("/fireworks.gif") center center/cover no-repeat;
            opacity: 0.7;
          }
          .about-mobile-heading {
            position: relative;
            z-index: 10;
          }
        }
        .about-mobile-fireworks-wrapper {
          display: none;
        }
        @media (max-width: 900px) {
          .about-mobile-fireworks-wrapper {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .about-mobile-heading,
          .mission-intro-copy {
            position: relative;
            z-index: 3;
          }
        }
      `}</style>
    </>
  );
};

export default Theme;
