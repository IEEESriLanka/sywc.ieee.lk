"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useRegistrationStatus } from "../../hooks/useRegistrationStatus";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import "./Navbar.css";


const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Theme", href: "#theme" },
  { label: "Location", href: "#location" },
  // { label: "Schedule", href: "#schedule" },
  { label: "Organizers", href: "#organizers" },
  { label: "Past Congress", href: "/past-congress" },
  { label: "Register", href: "/register" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { isRegistrationOpen, isRegistrationEnded, timeLeft } =
    useRegistrationStatus();

  // Check if we're on the registration page
  const isRegistrationPage = pathname === "/register";

  const menuToggleBtnRef = useRef(null);
  const navOverlayRef = useRef(null);
  const navItemsRef = useRef(null);

  useEffect(() => {
    const navOverlay = navOverlayRef.current;
    const navItems = navItemsRef.current?.querySelectorAll(".ieee-nav-item");

    if (!navOverlay || !navItems) return;

    if (isMenuOpen) {
      navOverlay.style.pointerEvents = "all";
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
      setScrollY(window.scrollY);

      gsap.to(navOverlay, {
        opacity: 1,
        duration: 0.3,
      });
      gsap.to(
        [
          navItems,
          ".ieee-nav-footer-item-header",
          ".ieee-nav-footer-item-copy",
        ],
        {
          opacity: 1,
          y: "0%",
          duration: 0.75,
          stagger: 0.075,
          ease: "power4.out",
        }
      );
    } else {
      navOverlay.style.pointerEvents = "none";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);

      gsap.to(navOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(
            [
              navItems,
              ".ieee-nav-footer-item-header",
              ".ieee-nav-footer-item-copy",
            ],
            {
              opacity: 0,
              y: "100%",
            }
          );
        },
      });
    }
  }, [isMenuOpen, scrollY]);

  // Smooth scroll and close menu on anchor click
  const handleMenuLinkClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMenuOpen(false); // close overlay first
      
      if (pathname !== "/") {
        // If not on home page, navigate to home with the hash
        router.push("/" + href);
      } else {
        // If on home page, scroll to section
        setTimeout(() => {
          const id = href.slice(1);
          const el = document.getElementById(id);
          console.log("Trying to scroll to:", id, el);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            console.warn("Section not found:", id);
          }
        }, 350); // wait for overlay to close
      }
    } else {
      // For standard navigation (e.g. /, /past-congress), just close the menu
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* nav */}
      <nav className="fixed top-0 left-0 w-screen py-3 md:py-4 px-2 md:px-8 flex justify-between items-center overflow-x-hidden z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="nav-logo-wrapper cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="nav-logo-border-bg"></div>
          <div className="nav-logo-inner">
            <a href="/" className="no-underline flex items-center">
              <img
                src="/main-logo.svg"
                alt="IEEE SLSYWC Logo"
                className="h-8 md:h-[3rem] w-auto"
              />
            </a>
          </div>
        </div>

        {/* Center Register Button - hidden on registration page */}
        {/* {!isRegistrationPage && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            {isRegistrationEnded ? (
              <div
                className="group relative inline-flex items-center justify-center px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-gray-400 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full overflow-hidden transition-all duration-300 cursor-not-allowed"
                style={{ minWidth: "unset" }}
              >
                <span
                  className="relative z-10 flex items-center gap-1 md:gap-2 drop-shadow-lg"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
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
                  Registration Closed
                </span>
              </div>
            ) : isRegistrationOpen ? (
              <a
                href="/register"
                className="group relative inline-flex items-center justify-center px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white bg-gradient-to-r from-[#004CF1] via-[#00ECEC] to-[#00B836] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00B836]/25 ml-10 md:ml-0"
                style={{ minWidth: "unset" }}
              >
                <span
                  className="relative z-10 flex items-center gap-1 md:gap-2 drop-shadow-lg"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Register Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0038B8] via-[#00B8B8] to-[#008A28] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </a>
            ) : (
              <div
                className="group relative inline-flex items-center justify-center ml-16 sm:ml-0  px-2 py-1.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-white bg-gradient-to-r from-[#004CF1] via-[#00ECEC] to-[#00B836] rounded-full overflow-hidden transition-all duration-300"
                style={{ minWidth: "unset" }}
              >
                <span
                  className="relative z-10 flex items-center gap-1 md:gap-2 drop-shadow-lg"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
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
                  <div className="flex flex-col items-center justify-center md:block">
                    <span className=" md:inline">Register in </span>
                    <span>
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                  </div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0038B8] via-[#00B8B8] to-[#008A28] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
            )}
          </div>
        )} */}

        {/* Menu Button - hidden on registration page */}
        {!isRegistrationPage && (
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#ffcb40] transition-all duration-300 shadow-lg hover:shadow-[#ffcb40]/20 z-[60]"
            ref={menuToggleBtnRef}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center overflow-hidden transition-all duration-300 transform group-hover:scale-110">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center group-hover:bg-[#ffcb40] ${
                  isMenuOpen ? "absolute top-1/2 -translate-y-1/2 rotate-45" : "relative"
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-[#ffcb40] ${
                  isMenuOpen ? "opacity-0" : "relative"
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center group-hover:bg-[#ffcb40] ${
                  isMenuOpen ? "absolute top-1/2 -translate-y-1/2 -rotate-45" : "relative"
                }`}
              ></span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#ffcb40] opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md -z-10"></div>
          </button>
        )}

        {/* Back Button - shown only on registration page */}
        {isRegistrationPage && (
          <a
            href="/"
            className="group relative inline-flex items-center justify-center px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-sm font-bold text-[#0f172a] bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,203,64,0.4)] hover:shadow-[0_0_30px_rgba(255,203,64,0.6)]"
            style={{ minWidth: "unset" }}
          >
            <span className="relative z-10 flex items-center gap-1 md:gap-2">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
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
            </span>
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </a>
        )}
      </nav>

      {/* Menu Overlay - hidden on registration page */}
      {!isRegistrationPage && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-[#101828]/90 backdrop-blur-xl border-b border-white/20 transition-all duration-500 z-40 ieee-nav-overlay flex flex-col"
          ref={navOverlayRef}
        >
          {/* Floating Close Button */}
          {isMenuOpen && (
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 shadow-lg backdrop-blur-lg transition-all duration-300 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTimes className="text-3xl text-[#b4860b] group-hover:text-[#0f2b69] drop-shadow-lg transition-all duration-300 animate-pulse" />
            </button>
          )}

          {/* Menu Items */}
          <div
            className="flex-1 flex flex-col items-center justify-start gap-2 pt-32 md:pt-30"
            ref={navItemsRef}
          >
            {menuLinks.map((link, idx) => (
              <div
                key={link.href}
                className={`relative ieee-nav-item opacity-0 translate-y-8 transition-all duration-500 delay-[${
                  idx * 100
                }ms] group`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="text-2xl md:text-4xl font-extrabold font-sans uppercase tracking-widest select-none m-0">
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="block p-2 no-underline text-[#e3e3db] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] transition-all duration-300 cursor-pointer"
                      onClick={(e) => handleMenuLinkClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block p-2 no-underline text-[#e3e3db] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] transition-all duration-300"
                      onClick={(e) => handleMenuLinkClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  )}
                </p>
                {/* Animated underline */}
                <span className="block h-1 w-0 bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </div>
            ))}
          </div>

          {/* Social & Contact Section */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 p-6 border-t border-white/20 ">
            <div className="flex gap-4 items-center">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F] hover:text-[#00ECEC] text-2xl transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077B5] hover:text-[#00ECEC] text-2xl transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DA1F2] hover:text-[#00ECEC] text-2xl transition-colors duration-300"
              >
                <FaTwitter />
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <a
                href="mailto:ieeeslsywc@gmail.com"
                className="text-[#EA4335] hover:text-[#00ECEC] text-2xl transition-colors duration-300 flex items-center gap-2"
              >
                <FaEnvelope />{" "}
                <span className="text-base font-medium text-white">
                  ieeeslsywc@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
