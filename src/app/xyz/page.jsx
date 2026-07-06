"use client";

import React, { useState } from "react";
import SimpleRegisterForm from "../components/SimpleRegisterForm/SimpleRegisterForm";
import Countdown from "../components/Countdown/Countdown";
import { useRegistrationCountdown } from "../hooks/useRegistrationCountdown";
import {
  Award,
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

function RegPage() {
  const { isRegistrationOpen } = useRegistrationCountdown();

  // Show countdown if registration is not open
  // if (!isRegistrationOpen) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
  //       <Countdown />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-[10vh]">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              IEEE SLSYWC 2026
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-4">
              Welcome to the flagship event of IEEE Sri Lanka Section
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-purple-200">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                September 26/ 27/ 28, 2026
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

          {/* Registration Form */}
          <div className="mb-12">
            <SimpleRegisterForm formMode="register" />
          </div>

          {/* Information Cards */}
          {/* <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Delegate Fees
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">
                    Local Delegates:
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    LKR 15,000
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">
                    Foreign Delegates:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">$80</span>
                </div>
              </div>
            </div>
          </div> */}

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Need Help?
              </h3>
              <p className="text-lg text-gray-600">
                Our support team is here to assist you with any questions about
                registration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#004CF1] to-[#00ECEC] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Email Support
                </h4>
                <a
                  href="mailto:ieeeslsywc@gmail.com"
                  className="text-[#004CF1] hover:text-[#0038B8] font-medium text-lg hover:underline transition-colors"
                >
                  ieeeslsywc@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00B836] to-[#008A28] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Phone Support
                </h4>
                <div className="flex flex-col justify-center items-center">
                  <a
                    href="tel:+94715704449"
                    className="text-[#00B836] hover:text-[#008A28] font-medium text-lg hover:underline transition-colors"
                  >
                    +94 70 216 3398 - Kavin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegPage;
