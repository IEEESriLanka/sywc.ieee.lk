"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import {
  Download,
  Maximize2,
  Minimize2,
  Share2,
  CheckCircle2,
  Calendar,
  MapPin,
  Printer,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  BookMarked,
  Hand,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function DelegateHandbookPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState("Your delegate handbook is printing...");
  const [inputPage, setInputPage] = useState("1");
  const [renderError, setRenderError] = useState(null);
  const [pagesImages, setPagesImages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [singlePageDimensions, setSinglePageDimensions] = useState({ width: 540, height: 760 });

  const bookContainerRef = useRef(null);
  const pageFlipInstanceRef = useRef(null);
  const stageWrapperRef = useRef(null);
  const audioContextRef = useRef(null);

  const pdfUrl = "/Delegate%20handbook/Delegate%20Handbook.pdf";
  const downloadUrl = "/api/delegate-handbook?download=true";

  // Synthesize realistic paper flip sound using Web Audio API
  const playPageFlipSound = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current || audioContextRef.current.state === "closed") {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const duration = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = lastOut * 0.92 + white * 0.08;
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * Math.exp(-progress * 2.5);
        data[i] = lastOut * envelope * 2.4;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + duration);
      filter.Q.value = 1.3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.65, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }, [isMuted]);

  // 1. Load PDF and render all pages to Ultra-HD Lossless PNG images (3x scale)
  useEffect(() => {
    let isMounted = true;

    const renderPdfPages = async () => {
      try {
        setLoadingProgress("Binding your official delegate handbook...");

        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.async = true;
            script.onload = () => {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
              resolve();
            };
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        setLoadingProgress("Reading your delegate book pages...");
        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;
        const total = pdf.numPages;
        setNumPages(total);

        const renderedImages = [];
        const scale = 3.0; // Ultra-HD 3x Retina sharpness

        for (let i = 1; i <= total; i++) {
          if (!isMounted) return;
          setLoadingProgress(`Your delegate book is printing page ${i} of ${total}...`);

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: false });
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          const dataUrl = canvas.toDataURL("image/png");
          renderedImages.push({
            pageNum: i,
            dataUrl: dataUrl,
            width: viewport.width / scale,
            height: viewport.height / scale,
          });
        }

        if (isMounted) {
          setPagesImages(renderedImages);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error rendering handbook PDF:", err);
        if (isMounted) {
          setRenderError("Could not load the handbook PDF. You can download it directly below.");
          setIsLoading(false);
        }
      }
    };

    renderPdfPages();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // 2. Initialize StPageFlip in STRICT 1-PAGE ONLY (NO 2-PAGE SPREAD)
  useEffect(() => {
    if (pagesImages.length === 0 || !bookContainerRef.current) return;

    let isMounted = true;
    let pageFlip = null;

    const initPageFlip = async () => {
      try {
        const { PageFlip } = await import("page-flip");
        if (!isMounted || !bookContainerRef.current) return;

        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch {}
          pageFlipInstanceRef.current = null;
        }

        bookContainerRef.current.innerHTML = "";

        const sample = pagesImages[0];
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const ratio = sample && sample.width ? sample.height / sample.width : 1.414;

        // Calculate exact single page dimensions for screen
        let pageWidth = 540;
        let pageHeight = 760;

        if (screenWidth < 768) {
          pageWidth = Math.min(screenWidth - 36, 420);
          pageHeight = Math.min(Math.floor(pageWidth * ratio), screenHeight * 0.65);
        } else {
          pageHeight = Math.min(screenHeight * 0.73, 800);
          pageWidth = Math.floor(pageHeight / ratio);
        }

        setSinglePageDimensions({ width: pageWidth, height: pageHeight });

        // Using size: "fixed" and usePortrait: true strictly forces 1 single page!
        pageFlip = new PageFlip(bookContainerRef.current, {
          width: pageWidth,
          height: pageHeight,
          size: "fixed", // STRICT FIXED SIZE prevents doubling into 2-page spread
          minWidth: 280,
          maxWidth: 700,
          minHeight: 380,
          maxHeight: 1100,
          maxShadowOpacity: 0.5,
          showCover: false, // Prevents 2-page cover spread logic
          mobileScrollSupport: false,
          useMouseEvents: true,
          clickEventForward: true,
          usePortrait: true, // Guarantees 1 single page orientation
          startPage: 0,
          drawShadow: true,
          flippingTime: 650,
          showPageCorners: true,
          swipeDistance: 20,
        });

        const imageUrls = pagesImages.map((p) => p.dataUrl);
        pageFlip.loadFromImages(imageUrls);

        pageFlip.on("flip", (e) => {
          if (!isMounted) return;
          const current = e.data + 1;
          setActivePage(current);
          setInputPage(current.toString());
          playPageFlipSound();
        });

        pageFlip.on("changeState", (e) => {
          if (e.data === "flipping") {
            playPageFlipSound();
          }
        });

        pageFlipInstanceRef.current = pageFlip;
      } catch (err) {
        console.error("Error initializing PageFlip:", err);
      }
    };

    const timer = setTimeout(() => {
      initPageFlip();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch {}
        pageFlipInstanceRef.current = null;
      }
    };
  }, [pagesImages, playPageFlipSound]);

  // Turn page actions
  const nextPage = () => {
    if (pageFlipInstanceRef.current) {
      playPageFlipSound();
      pageFlipInstanceRef.current.flipNext("top");
    }
  };

  const prevPage = () => {
    if (pageFlipInstanceRef.current) {
      playPageFlipSound();
      pageFlipInstanceRef.current.flipPrev("top");
    }
  };

  const firstPage = () => {
    if (pageFlipInstanceRef.current) {
      playPageFlipSound();
      pageFlipInstanceRef.current.flip(0);
    }
  };

  const lastPage = () => {
    if (pageFlipInstanceRef.current && numPages > 0) {
      playPageFlipSound();
      pageFlipInstanceRef.current.flip(numPages - 1);
    }
  };

  const turnToPage = (targetNum) => {
    if (pageFlipInstanceRef.current && targetNum >= 1 && targetNum <= numPages) {
      playPageFlipSound();
      pageFlipInstanceRef.current.flip(targetNum - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.tagName === "INPUT") return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage, 10);
      if (!isNaN(page) && page >= 1 && page <= numPages) {
        turnToPage(page);
      } else {
        setInputPage(activePage.toString());
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (stageWrapperRef.current?.requestFullscreen) {
        stageWrapperRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

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

  return (
    <div className="min-h-screen relative overflow-hidden pt-[7.5vh] md:pt-[8.5vh] pb-4 text-slate-100 selection:bg-[#ffcb40]/30 selection:text-[#ffcb40]">
      {/* Dynamic Animated Background */}
      <AnimatedBackground showNeuralNetwork={true} />

      <div className="container mx-auto px-3 md:px-6 relative z-10 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-2 pb-2 border-b border-white/10">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Delegate Handbook{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffcb40] via-[#fbf5b7] to-[#b4860b]">
                2026
              </span>
            </h1>

            <p className="text-xs md:text-sm text-[#b8eaff]/80 mt-0.5 max-w-xl font-normal">
              IEEE Sri Lanka Section Students | Young Professionals | Women in Engineering Congress
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#b8eaff]/90">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a]/90 border border-white/10 backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span>Sept 18–20, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a]/90 border border-white/10 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span>Club Palm Bay, Marawila</span>
            </div>
          </div>
        </div>

        {/* Floating Top Action Bar */}
        <div className="bg-[#0f172a]/85 border border-[#ffcb40]/25 rounded-xl p-2 md:p-2.5 backdrop-blur-xl mb-2 flex flex-wrap items-center justify-between gap-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {/* Navigation controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={firstPage}
              disabled={activePage <= 1 || isLoading}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-[#ffcb40] transition-colors"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={prevPage}
              disabled={activePage <= 1 || isLoading}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-colors"
              title="Turn Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page indicator input */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-black/40 border border-white/10 rounded-lg text-xs">
              <span className="text-white/50 text-[11px]">Page</span>
              <input
                type="text"
                value={inputPage}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputKeyDown}
                disabled={isLoading}
                className="w-8 text-center bg-white/10 border border-white/20 rounded text-white font-mono text-xs focus:outline-none focus:border-[#ffcb40] py-0.5"
              />
              <span className="text-white/50 text-[11px]">
                of {numPages || "–"}
              </span>
            </div>

            <button
              onClick={nextPage}
              disabled={activePage >= numPages || isLoading}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition-colors"
              title="Turn Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={lastPage}
              disabled={activePage >= numPages || isLoading}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-[#ffcb40] transition-colors"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className={`p-1.5 rounded-lg border transition-colors ml-1 ${
                isMuted
                  ? "bg-white/5 text-white/40 border-white/10"
                  : "bg-[#ffcb40]/10 text-[#ffcb40] border-[#ffcb40]/30"
              }`}
              title={isMuted ? "Unmute Page Flip Sound" : "Mute Page Flip Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="hidden lg:flex items-center gap-1.5 ml-1 px-2.5 py-1 rounded-md bg-[#ffcb40]/10 text-[#ffcb40] text-[11px]">
              <Hand className="w-3.5 h-3.5 animate-pulse" />
              <span>Drag corner or swipe to turn</span>
            </div>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2">
            <a
              href={downloadUrl}
              download="IEEE_SLSYWC_2026_Delegate_Handbook.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#b4860b] via-[#ffcb40] to-[#fbf5b7] hover:opacity-95 text-[#0f172a] text-xs font-bold shadow-md transition-transform duration-200 hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
              title="Print Handbook"
            >
              <Printer className="w-3.5 h-3.5 text-[#ffcb40]" />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
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

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
              title="Fullscreen Mode"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-[#ffcb40]" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-[#ffcb40]" />
              )}
              <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Expand"}</span>
            </button>
          </div>
        </div>

        {/* 100% Guaranteed SINGLE PAGE ONLY Stage */}
        <div
          ref={stageWrapperRef}
          className={`relative w-full flex flex-col items-center justify-center transition-all duration-300 ${
            isFullscreen
              ? "fixed inset-0 z-50 bg-[#030710] p-4 flex flex-col justify-between"
              : "my-1 min-h-[60vh] md:min-h-[76vh]"
          }`}
        >
          {/* Creative Printing State */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080d1a]/85 backdrop-blur-md rounded-2xl z-30">
              <Loader2 className="w-10 h-10 text-[#ffcb40] animate-spin mb-4" />
              <p className="text-sm md:text-base text-[#ffcb40] font-semibold tracking-wide">
                {loadingProgress}
              </p>  
            </div>
          )}

          {/* Error State */}
          {renderError && (
            <div className="text-center p-8 max-w-md bg-white/5 border border-red-500/30 rounded-2xl backdrop-blur-md z-30 my-auto">
              <p className="text-sm text-red-300 mb-4">{renderError}</p>
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffcb40] text-[#0f172a] text-xs font-bold"
              >
                <Download className="w-4 h-4" /> Download PDF Directly
              </a>
            </div>
          )}

          {/* Single Page Centered Wrapper */}
          <div
            style={{
              width: `${singlePageDimensions.width}px`,
              maxWidth: "100%",
            }}
            className="relative mx-auto flex items-center justify-center py-1 select-none overflow-visible"
          >
            {/* Ambient Shadow Pedestal */}
            <div className="absolute inset-x-4 -bottom-4 h-12 bg-black/90 blur-3xl rounded-full pointer-events-none -z-10"></div>

            {/* DOM Mount strictly sized for 1 page */}
            <div
              ref={bookContainerRef}
              style={{
                width: `${singlePageDimensions.width}px`,
                height: `${singlePageDimensions.height}px`,
                maxWidth: "100%",
                touchAction: "none",
              }}
              className="flip-book-mount relative mx-auto flex items-center justify-center select-none shadow-[0_25px_60px_rgba(0,0,0,0.85)] rounded-md overflow-hidden"
            />

            {/* Floating Side Turn Arrow Buttons */}
            <button
              onClick={prevPage}
              disabled={activePage <= 1 || isLoading}
              className="absolute -left-3 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#080d1a]/95 hover:bg-[#ffcb40] text-white hover:text-[#0f172a] border border-[#ffcb40]/40 flex items-center justify-center transition-all duration-200 disabled:opacity-0 shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:scale-110 z-20"
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={nextPage}
              disabled={activePage >= numPages || isLoading}
              className="absolute -right-3 md:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#080d1a]/95 hover:bg-[#ffcb40] text-white hover:text-[#0f172a] border border-[#ffcb40]/40 flex items-center justify-center transition-all duration-200 disabled:opacity-0 shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:scale-110 z-20"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Floating Bottom Page Scrubber */}
        <div className="bg-[#0f172a]/85 border border-[#ffcb40]/25 rounded-xl p-2 md:p-2.5 backdrop-blur-xl mb-2 flex items-center justify-between gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-1.5 text-xs text-[#b8eaff]/70">
            <BookMarked className="w-4 h-4 text-[#ffcb40]" />
            <span className="hidden sm:inline">Flip Navigation</span>
          </div>

          {/* Slider */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <span className="text-[11px] font-mono text-white/50">1</span>
            <input
              type="range"
              min={1}
              max={numPages || 1}
              value={activePage}
              onChange={(e) => turnToPage(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ffcb40]"
            />
            <span className="text-[11px] font-mono text-white/50">{numPages || "–"}</span>
          </div>

          <div className="text-xs font-mono text-[#ffcb40] font-semibold">
            {activePage} / {numPages || "–"}
          </div>
        </div>

        {/* Compact Helpdesk Support Strip */}
        <div className="bg-[#0f172a]/70 border border-white/10 rounded-xl p-2.5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs text-[#b8eaff]/80">
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

          <div className="text-white/40 text-[11px] text-center md:text-right">
            IEEE SLSYWC 2026 • Official Guide
          </div>
        </div>
      </div>
    </div>
  );
}
