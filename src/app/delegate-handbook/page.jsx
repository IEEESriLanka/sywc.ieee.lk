"use client";

import React, { useState, useEffect, useRef } from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import {
  Download,
  ExternalLink,
  Share2,
  CheckCircle2,
  Calendar,
  MapPin,
  Printer,
  Mail,
  Phone,
  FileText,
  Layers,
  ChevronUp,
} from "lucide-react";

// List of all 20 pre-rendered WebP handbook page images
const TOTAL_PAGES = 20;
const HANDBOOK_PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const pageNumber = String(i + 1).padStart(4, "0");
  return `/Delegate%20handbook/Delegate%20Handbook_pages-to-jpg-${pageNumber}.webp`;
});

export default function DelegateHandbookPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("auto"); // "auto", "slides", "pdf"
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const slideRefs = useRef([]);

  const pdfUrl = "/Delegate%20handbook/Delegate%20Handbook.pdf";
  const downloadUrl = "/api/delegate-handbook?download=true";

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Track active slide on scroll
      if (slideRefs.current.length > 0) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        for (let i = slideRefs.current.length - 1; i >= 0; i--) {
          const el = slideRefs.current[i];
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSlide(i + 1);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "IEEE SLSYWC 2026 - Delegate Handbook",
          text: "Official Delegate Handbook for IEEE SLSYWC 2026 Congress at Club Palm Bay, Marawila.",
          url,
        });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
    }
  };

  const openFullscreen = () => {
    window.open(pdfUrl, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine active view: on mobile default to smooth continuous slide scroll, on desktop default to PDF
  const activeView =
    viewMode === "auto" ? (isMobile ? "slides" : "pdf") : viewMode;

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 md:pt-28 pb-12 text-slate-100 selection:bg-[#ffcb40]/30 selection:text-[#ffcb40]">
      {/* Dynamic Animated Background */}
      <AnimatedBackground showNeuralNetwork={true} />

      {/* Main Container with generous side padding */}
      <div className="w-full px-3 sm:px-6 md:px-10 lg:px-14 max-w-7xl mx-auto relative z-10 flex flex-col">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/15 bg-[#0f172a]/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#ffcb40]/10 border border-[#ffcb40]/30 text-[#ffcb40]">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Delegate Handbook{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffcb40] via-[#fbf5b7] to-[#b4860b]">
                  2026
                </span>
              </h1>
            </div>
            <p className="text-xs text-[#b8eaff]/85 mt-1 font-normal pl-0.5">
              IEEE Sri Lanka Section Students | Young Professionals | Women in Engineering Congress
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#b8eaff]/90 mr-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#ffcb40]" />
                <span>Sept 18–20, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#ffcb40]" />
                <span>Club Palm Bay, Marawila</span>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 bg-black/40 border border-white/15 rounded-xl text-xs">
              <button
                onClick={() => setViewMode("slides")}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === "slides"
                    ? "bg-[#ffcb40] text-[#0f172a] font-bold shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
                title="Continuous Touch-Friendly Page View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Pages</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === "pdf"
                    ? "bg-[#ffcb40] text-[#0f172a] font-bold shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
                title="Embedded PDF Document View"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>

            <a
              href={downloadUrl}
              download="IEEE_SLSYWC_2026_Delegate_Handbook.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] hover:opacity-95 text-[#0f172a] text-xs font-bold shadow-lg transition-transform duration-200 hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={openFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-colors shadow-sm"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span className="hidden sm:inline">Open Tab</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-colors shadow-sm"
              title="Print Handbook"
            >
              <Printer className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span>Print</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-colors shadow-sm"
              title="Share Link"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#ffcb40]" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: Continuous High-Res Mobile-Optimized Slide Document (100% Touch Scrollable) --- */}
        {activeView === "slides" && (
          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {/* Mobile Progress & Page Counter */}
            <div className="sticky top-20 z-20 flex items-center justify-between bg-[#080d1a]/90 backdrop-blur-lg border border-[#ffcb40]/30 rounded-xl px-4 py-2 text-xs shadow-xl">
              <span className="text-[#b8eaff] font-medium">
                Page <strong className="text-[#ffcb40] text-sm">{activeSlide}</strong> of {TOTAL_PAGES}
              </span>
              <span className="text-white/60 text-[11px]">
                Swipe & scroll down to read all pages
              </span>
            </div>

            {/* Vertical Feed of all 20 High-Res Handbook Pages */}
            <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
              {HANDBOOK_PAGES.map((pageSrc, index) => (
                <div
                  key={index}
                  ref={(el) => (slideRefs.current[index] = el)}
                  className="w-full bg-[#030712] rounded-xl sm:rounded-2xl border-2 border-white/15 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.85)] relative transition-all duration-200 hover:border-[#ffcb40]/40"
                  style={{ aspectRatio: "3000/1688" }}
                >
                  {/* Page Number Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[#ffcb40] font-mono text-[11px] font-bold border border-white/10 z-10">
                    {index + 1} / {TOTAL_PAGES}
                  </div>

                  <img
                    src={pageSrc}
                    alt={`Delegate Handbook Page ${index + 1}`}
                    className="w-full h-full object-contain select-none block"
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW MODE 2: Native Desktop PDF Viewer Frame --- */}
        {activeView === "pdf" && (
          <div className="w-full bg-[#030712] rounded-2xl border-2 border-[#ffcb40]/25 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,203,64,0.06)] flex flex-col h-[78vh] md:h-[84vh] relative">
            {mounted ? (
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&statusbar=1&view=FitH`}
                className="w-full h-full border-0 rounded-2xl bg-[#030712]"
                title="IEEE SLSYWC 2026 Delegate Handbook"
                loading="eager"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#080d1a] flex-1">
                <FileText className="w-12 h-12 text-[#ffcb40] mb-3 animate-pulse" />
                <p className="text-white text-base font-semibold mb-2">
                  Loading Delegate Handbook...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Compact Footer Strip */}
        <div className="mt-5 bg-[#0f172a]/80 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#b8eaff]/80">
          <div className="flex items-center gap-2">
            <span>Delegate Inquiries:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              href="mailto:ieeeslsywc@gmail.com"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#ffcb40] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span>ieeeslsywc@gmail.com</span>
            </a>
            <a
              href="tel:+94702163398"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#ffcb40] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span>+94 70 216 3398 (Kavin)</span>
            </a>
          </div>

          <div className="text-white/40 text-[11px]">
            IEEE SLSYWC 2026 • Official Publication
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0f172a]/95 text-[#ffcb40] border border-[#ffcb40]/40 shadow-2xl hover:bg-[#ffcb40] hover:text-[#0f172a] transition-all duration-200 hover:scale-110"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
