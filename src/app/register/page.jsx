"use client";

import React, { useState } from "react";
import SimpleRegisterForm from "../components/SimpleRegisterForm/SimpleRegisterForm";
import Countdown from "../components/Countdown/Countdown";
import { useRegistrationStatus } from "../hooks/useRegistrationStatus";
import {
  Award,
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";
import AnimatedBackground from "../components/ui/AnimatedBackground";

function RegPage() {
  const { isRegistrationOpen, isRegistrationEnded } = useRegistrationStatus();

  return (
    <div className="min-h-screen relative overflow-hidden pt-[10vh]">
      {/* Animated Background (from Hero/About) */}
      {/* Animated Background from Hero */}
      <AnimatedBackground showNeuralNetwork={true} />
      {/* Main Content: Countdown or Registration UI */}
      {isRegistrationEnded ? (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-500 rounded-full shadow-lg mb-4">
                  <svg
                    className="w-10 h-10 text-white"
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
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
                  Registration Closed
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Registration for IEEE SLSYWC 2026 has ended
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Thank you for your interest. Registration closed on August 13,
                2026 at 11:59 PM.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-300">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  September 18/ 19/ 20, 2026
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Club Palm Bay, Marawila
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  250 Delegates Expected
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="mt-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
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
      ) : isRegistrationOpen ? (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              {/* Registration Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#ffcb40]/5 border border-[#ffcb40]/20 text-[#fbf5b7] text-xs font-bold uppercase tracking-widest mt-6 mb-8 backdrop-blur-sm shadow-[0_2px_10px_rgba(255,203,64,0.05)]">
                <Award className="w-4 h-4 text-[#ffcb40]" />
                <span>Official Registration Portal</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffcb40] via-[#fbf5b7] to-[#b4860b] animate-gradient-move">
                  IEEE SLSYWC 2026
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#b8eaff] mb-8 max-w-2xl mx-auto leading-relaxed">
                Secure your seat at the flagship event of the IEEE Sri Lanka Section. 
                Please fill in the fields below with your correct details to submit your official registration.
              </p>

              {/* Event Info Details Pills */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base text-[#b8eaff]/90">
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-md shadow-sm">
                  <Calendar className="w-4 h-4 text-[#ffcb40] flex-shrink-0" />
                  <span>September 18, 19 & 20, 2026</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-md shadow-sm">
                  <MapPin className="w-4 h-4 text-[#ffcb40] flex-shrink-0" />
                  <span>Club Palm Bay, Marawila</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#0f172a]/80 border border-white/10 backdrop-blur-md shadow-sm">
                  <Users className="w-4 h-4 text-[#ffcb40] flex-shrink-0" />
                  <span>250 Delegates Expected</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="mb-12">
              <SimpleRegisterForm />
            </div>

            {/* Contact Information */}
            <div className="bg-[#0f172a]/95 border border-[#ffcb40]/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-8 backdrop-blur-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#ffcb40] mb-2 tracking-wide uppercase">
                  Registration Help Desk
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ffcb40] to-transparent mx-auto mb-4"></div>
                <p className="text-base text-[#b8eaff]/80 max-w-xl mx-auto leading-relaxed">
                  For any inquiries, custom requests, or technical assistance regarding your delegate registration, please reach out to our team.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Email Support Card */}
                <div className="bg-white/5 border border-white/10 hover:border-[#ffcb40]/30 transition-all duration-300 rounded-xl p-6 flex flex-col items-center group">
                  <div className="w-12 h-12 bg-[#ffcb40]/10 border border-[#ffcb40]/30 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 text-[#ffcb40]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Email Inquiries
                  </h4>
                  <a
                    href="mailto:ieeeslsywc@gmail.com"
                    className="text-[#ffcb40] hover:text-[#fbf5b7] font-medium text-base hover:underline transition-colors mt-1"
                  >
                    ieeeslsywc@gmail.com
                  </a>
                </div>

                {/* Phone Support Card */}
                <div className="bg-white/5 border border-white/10 hover:border-[#ffcb40]/30 transition-all duration-300 rounded-xl p-6 flex flex-col items-center group">
                  <div className="w-12 h-12 bg-[#ffcb40]/10 border border-[#ffcb40]/30 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 text-[#ffcb40]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Hotline Support
                  </h4>
                  <a
                    href="tel:+94702163398"
                    className="text-[#ffcb40] hover:text-[#fbf5b7] font-medium text-base hover:underline transition-colors mt-1"
                  >
                    +94 70 216 3398 (Kavin)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <Countdown />
        </div>
      )}
      <style jsx>{`
        @keyframes gradient-move {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default RegPage;
