"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Users,
  Sparkles,
  Trash2,
  Code,
  Laptop,
  Smartphone,
  Plus,
  LayoutTemplate,
  Search,
  Check,
} from "lucide-react";
import AnimatedBackground from "../components/ui/AnimatedBackground";

const LOGO_URL =
  "https://res.cloudinary.com/q1juijf8/image/upload/v1788852242/main-logo_weonid.svg";

const HTML_PRESETS = {
  invitation: {
    label: "Delegate Invitation (Official)",
    subject: "Delegate Selection Invitation: IEEE SLSYWC 2026",
    ctaText: "View Delegate Handbook",
    ctaUrl: "https://slsywc.ieee.lk",
    content: `<p style="margin-bottom: 16px; font-size: 15px; line-height: 1.7; color: #e3e3db;">
  We are pleased to inform you that you have been selected as an official delegate for the <strong style="color: #fcd34d;">15th IEEE Sri Lanka Section Students | Young Professionals | Women in Engineering Congress (SLSYWC &apos;26)</strong>.
</p>

<p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
  The Congress is scheduled to take place from <strong style="color: #fcd34d;">26th to 28th September 2026</strong> at <strong style="color: #fcd34d;">Club Palm Bay, Marawila, Sri Lanka</strong>. Gathering distinguished student leaders, young professionals, and industry experts across the nation, this event offers three days of technical enrichment, leadership development, and strategic networking.
</p>

<div style="background: #060b14; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
  <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #fef9c3; font-weight: 700; border-bottom: 1px solid #1e293b; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
    Congress Program Schedule
  </h3>
  
  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 1 (26th September &bull; 12:00 PM onwards):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      Official Inauguration and the Handewa cultural exchange session. Please bring traditional attire for the evening cultural proceedings.
    </p>
  </div>

  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 2 (27th September):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      IEEE Region 10 Career and Leadership Program (CLAP) followed by the IEEE Sri Lanka Section Annual Awards Ceremony. Please bring formal attire for this gala night.
    </p>
  </div>

  <div>
    <strong style="color: #fcd34d; font-size: 14px;">Day 3 (28th September):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      Technical tracks, collaborative symposiums, and the Official Valedictory Ceremony.
    </p>
  </div>
</div>

<p style="margin-bottom: 16px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  For comprehensive logistics, accommodation details, and required documentation, please consult the Official Delegate Handbook linked below.
</p>

<p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin-bottom: 24px;">
  We look forward to welcoming you to Club Palm Bay, Marawila, for an exceptional Congress experience.
</p>`,
  },
  registration: {
    label: "Registration Confirmation",
    subject: "Registration Confirmed: IEEE SLSYWC 2026",
    ctaText: "Access Delegate Portal",
    ctaUrl: "https://slsywc.ieee.lk/register",
    content: `<p style="margin-bottom: 16px; font-size: 15px; line-height: 1.7; color: #e3e3db;">
  Your registration for <strong style="color: #fcd34d;">IEEE SLSYWC 2026</strong> has been officially confirmed.
</p>

<div style="background: linear-gradient(135deg, rgba(252, 211, 77, 0.08) 0%, rgba(217, 119, 6, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.35); border-radius: 12px; padding: 22px; margin: 24px 0;">
  <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #fef9c3; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
    Delegate Confirmation Summary
  </h3>
  <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; color: #e3e3db;">
    <tr>
      <td width="35%" style="color: #94a3b8;">Delegate Name:</td>
      <td><strong style="color: #fcd34d;">{{name}}</strong></td>
    </tr>
    <tr>
      <td style="color: #94a3b8;">Verification:</td>
      <td><span style="color: #34d399; font-weight: 600;">Confirmed &amp; Active</span></td>
    </tr>
    <tr>
      <td style="color: #94a3b8;">Event Dates:</td>
      <td>September 26 &ndash; 28, 2026</td>
    </tr>
    <tr>
      <td style="color: #94a3b8;">Location:</td>
      <td>Club Palm Bay, Marawila, Sri Lanka</td>
    </tr>
  </table>
</div>

<p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
  Please present this confirmation email or your delegate identification during on-site registration.
</p>`,
  },
  customFull: {
    label: "Full Standalone HTML Template",
    subject: "Official Announcement - IEEE SLSYWC 2026",
    ctaText: "",
    ctaUrl: "",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { background-color: #030710; font-family: sans-serif; color: #e3e3db; padding: 30px; margin: 0; }
    .card { max-width: 600px; margin: 0 auto; background: #101828; padding: 35px; border-radius: 16px; border: 1px solid #1e293b; }
    .logo { text-align: center; margin-bottom: 25px; }
    h1 { color: #fcd34d; font-size: 22px; margin-top: 0; }
    p { line-height: 1.6; font-size: 15px; color: #cbd5e1; }
    .btn { display: inline-block; background: #fcd34d; color: #000; padding: 12px 28px; border-radius: 25px; text-decoration: none; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <img src="${LOGO_URL}" width="180" alt="IEEE Logo"/>
    </div>
    <h1>Dear {{name}},</h1>
    <p>We are delighted to bring you important updates regarding IEEE SLSYWC 2026.</p>
    <a href="https://slsywc.ieee.lk" class="btn">Explore Event</a>
  </div>
</body>
</html>`,
  },
};

export default function AdminMailerPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [parsedRecipients, setParsedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [subject, setSubject] = useState(HTML_PRESETS.invitation.subject);
  const [content, setContent] = useState(HTML_PRESETS.invitation.content);
  const [ctaText, setCtaText] = useState(HTML_PRESETS.invitation.ctaText);
  const [ctaUrl, setCtaUrl] = useState(HTML_PRESETS.invitation.ctaUrl);

  const [previewRecipientIdx, setPreviewRecipientIdx] = useState(0);
  const [previewDevice, setPreviewDevice] = useState("desktop"); // desktop | mobile

  const [isSending, setIsSending] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("compose"); // compose | preview | results
  const [errorMsg, setErrorMsg] = useState("");

  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [showManualAdd, setShowManualAdd] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Parse Excel on client
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setErrorMsg("");
    setFile(selectedFile);
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

        const nameKeys = ["name", "fullname", "full_name", "namewithinitials", "firstname", "recipient", "attendee"];
        const emailKeys = ["email", "emailaddress", "email_address", "mail", "e-mail", "primaryemail"];

        const extracted = rows
          .map((r, i) => {
            const keys = Object.keys(r);
            const findVal = (candidates) => {
              const foundKey = keys.find((k) =>
                candidates.includes(k.trim().toLowerCase().replace(/[^a-z0-9]/g, ""))
              );
              return foundKey ? String(r[foundKey]).trim() : "";
            };

            return {
              name: findVal(nameKeys) || "Valued Delegate",
              email: findVal(emailKeys) || "",
              rowNumber: i + 2,
              ...r,
            };
          })
          .filter((item) => item.email || item.name);

        setParsedRecipients(extracted);
      } catch (err) {
        setErrorMsg("Failed to parse Excel file: " + err.message);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fakeEvent = { target: { files: [droppedFile] } };
      handleFileChange(fakeEvent);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setFileName("");
    setParsedRecipients([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddManualRecipient = (e) => {
    e.preventDefault();
    if (!manualEmail) return;
    const newRec = {
      name: manualName.trim() || "Delegate",
      email: manualEmail.trim(),
      rowNumber: parsedRecipients.length + 1,
    };
    setParsedRecipients((prev) => [newRec, ...prev]);
    setManualName("");
    setManualEmail("");
    setShowManualAdd(false);
  };

  const insertHtmlTag = (openTag, closeTag) => {
    if (!textareaRef.current) return;
    const txt = textareaRef.current;
    const start = txt.selectionStart;
    const end = txt.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${openTag}${selected || "text"}${closeTag}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      txt.focus();
      txt.setSelectionRange(start + openTag.length, start + openTag.length + (selected.length || 4));
    }, 50);
  };

  const applyPreset = (key) => {
    const preset = HTML_PRESETS[key];
    if (preset) {
      setSubject(preset.subject);
      setContent(preset.content);
      setCtaText(preset.ctaText);
      setCtaUrl(preset.ctaUrl);
    }
  };

  const handleSendEmails = async () => {
    if (!file && parsedRecipients.length === 0) {
      setErrorMsg("Please select an Excel file or add at least one recipient first.");
      return;
    }

    if (!subject.trim()) {
      setErrorMsg("Please provide an email subject line.");
      return;
    }

    setIsSending(true);
    setErrorMsg("");
    setResults(null);

    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("subject", subject);
        formData.append("content", content);
        if (ctaUrl) formData.append("ctaUrl", ctaUrl);
        if (ctaText) formData.append("ctaText", ctaText);

        res = await fetch("/api/admin/send-bulk-email", {
          method: "POST",
          body: formData,
        });
      } else {
        // Direct JSON dispatch from manual recipients
        res = await fetch("/api/admin/send-bulk-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipients: parsedRecipients,
            subject,
            content,
            ctaUrl,
            ctaText,
          }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to process bulk email sending.");
      }

      setResults(data);
      setActiveTab("results");
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred while sending emails.");
    } finally {
      setIsSending(false);
    }
  };

  const filteredRecipients = parsedRecipients.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const previewName = parsedRecipients[previewRecipientIdx]?.name || "Kasun Perera";
  const isFullHtml = content.trim().startsWith("<!DOCTYPE") || content.trim().startsWith("<html");
  const processedHtmlContent = content.replace(/\{\{\s*name\s*\}\}/g, previewName);

  return (
    <div className="min-h-screen relative overflow-hidden pt-[12vh] pb-16 bg-[#030710] text-[#e3e3db]">
      {/* Animated Hero Background */}
      <AnimatedBackground showNeuralNetwork={true} />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Top Header Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-4 shadow-sm">
          </div>

          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffcb40] via-[#fbf5b7] to-[#b4860b]">
              Personalized Bulk Mailer
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Upload recipient lists from Excel/CSV and dispatch individual, personalized HTML emails with IEEE SLSYWC 2026 branding.
          </p>
        </div>

        {/* Global Tab Navigation Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0f172a]/90 border border-white/10 backdrop-blur-xl shadow-2xl gap-1">
            <button
              onClick={() => setActiveTab("compose")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "compose"
                  ? "bg-gradient-to-r from-[#ffcb40] to-[#d97706] text-black shadow-lg shadow-amber-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code className="w-4 h-4" />
              Compose & Data
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "preview"
                  ? "bg-gradient-to-r from-[#ffcb40] to-[#d97706] text-black shadow-lg shadow-amber-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Eye className="w-4 h-4" />
              Live HTML Preview
            </button>
            {results && (
              <button
                onClick={() => setActiveTab("results")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "results"
                    ? "bg-gradient-to-r from-[#ffcb40] to-[#d97706] text-black shadow-lg shadow-amber-500/25"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Dispatch Log ({results.sent}/{results.total})
              </button>
            )}
          </div>
        </div>

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="mb-6 max-w-4xl mx-auto p-4 rounded-xl bg-red-950/80 border border-red-500/40 flex items-start gap-3 text-red-200 shadow-xl backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">{errorMsg}</div>
          </div>
        )}

        {/* TAB 1: COMPOSE & DATA */}
        {activeTab === "compose" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Data Source & Recipients (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* File Upload Box */}
              <div className="bg-[#0f172a]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                    1. Recipient Excel File
                  </div>
                  {parsedRecipients.length > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      {parsedRecipients.length} Ready
                    </span>
                  )}
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-400/30 hover:border-amber-400/70 bg-[#060b14]/60 rounded-xl p-6 text-center cursor-pointer transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {fileName ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-white break-all">
                        {fileName}
                      </p>
                      <p className="text-xs text-amber-300 font-medium">
                        ✓ {parsedRecipients.length} recipients parsed
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="font-semibold text-amber-300">Click to choose</span> or drop file
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Auto-detects columns: <span className="text-gray-400">Name, Email</span> (.xlsx, .xls, .csv)
                      </p>
                    </div>
                  )}
                </div>

                {fileName && (
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className="text-gray-400 text-[11px]">Columns automatically mapped</span>
                    <button
                      onClick={handleClearFile}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove File
                    </button>
                  </div>
                )}
              </div>

              {/* Recipient Roster / Manual Adder */}
              <div className="bg-[#0f172a]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    Recipient Roster ({parsedRecipients.length})
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowManualAdd(!showManualAdd)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {showManualAdd ? "Cancel" : "Add Test Email"}
                  </button>
                </div>

                {/* Manual Add Form */}
                {showManualAdd && (
                  <form onSubmit={handleAddManualRecipient} className="p-3.5 rounded-xl bg-[#060b14] border border-amber-400/20 space-y-2.5">
                    <div className="text-xs font-semibold text-amber-300">Add Quick Test Recipient</div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        className="bg-[#0f172a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        className="bg-[#0f172a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors"
                    >
                      Add To Recipient List
                    </button>
                  </form>
                )}

                {/* Search Bar if items exist */}
                {parsedRecipients.length > 5 && (
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search recipient by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#060b14] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                )}

                {/* Recipient List Scroll Area */}
                {parsedRecipients.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No recipients loaded yet. Upload an Excel file or click "Add Test Email" above.
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredRecipients.slice(0, 60).map((r, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#060b14]/80 border border-white/5 hover:border-amber-400/30 transition-colors"
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold text-white text-xs truncate">
                            {r.name || "(Unnamed)"}
                          </p>
                          <p className="text-gray-400 font-mono text-[11px] truncate">
                            {r.email}
                          </p>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-300">
                          #{r.rowNumber || idx + 1}
                        </span>
                      </div>
                    ))}
                    {filteredRecipients.length > 60 && (
                      <p className="text-center text-[11px] text-gray-500 pt-1">
                        + {filteredRecipients.length - 60} more in list
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: HTML Email Content Builder (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0f172a]/80 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
                
                {/* Presets Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-400" />
                    2. HTML Email Content
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-gray-400 mr-1 flex items-center gap-1">
                      <LayoutTemplate className="w-3.5 h-3.5" /> Presets:
                    </span>
                    <button
                      type="button"
                      onClick={() => applyPreset("invitation")}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white/5 hover:bg-amber-400/20 text-gray-300 hover:text-amber-300 rounded-lg border border-white/10 transition-all"
                    >
                      Invitation
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("registration")}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white/5 hover:bg-amber-400/20 text-gray-300 hover:text-amber-300 rounded-lg border border-white/10 transition-all"
                    >
                      Ticket Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("customFull")}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white/5 hover:bg-amber-400/20 text-gray-300 hover:text-amber-300 rounded-lg border border-white/10 transition-all"
                    >
                      Full HTML
                    </button>
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Exclusive Invitation - IEEE SLSYWC 2026"
                    className="w-full bg-[#060b14] border border-white/10 focus:border-amber-400/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                  />
                </div>

                {/* Quick HTML Tags Toolbar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      HTML Content Editor
                    </label>
                    <span className="text-[11px] text-amber-300 font-mono">
                      Dynamic tag: &#123;&#123;name&#125;&#125;
                    </span>
                  </div>

                  <div className="bg-[#060b14] p-1.5 rounded-t-xl border border-white/10 border-b-0 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono px-1">Tags:</span>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("<p>", "</p>")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded font-mono text-[11px]"
                    >
                      &lt;p&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("<strong>", "</strong>")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded font-bold text-[11px]"
                    >
                      &lt;b&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("<em style='color: #fcd34d;'>", "</em>")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded italic text-[11px]"
                    >
                      &lt;i&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("<a href='https://slsywc.ieee.lk' style='color: #fcd34d;'>", "</a>")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-amber-300 rounded text-[11px] underline"
                    >
                      &lt;link&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("<table width='100%' style='background: #060b14; padding: 12px; border-radius: 8px;'><tr><td>", "</td></tr></table>")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded font-mono text-[11px]"
                    >
                      &lt;table&gt;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertHtmlTag("{{", "name}}")}
                      className="ml-auto px-2.5 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-mono font-bold rounded text-[11px]"
                    >
                      + &#123;&#123;name&#125;&#125;
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    rows={9}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter custom HTML markup..."
                    className="w-full bg-[#060b14] border border-white/10 focus:border-amber-400/80 rounded-b-xl px-4 py-3 text-xs sm:text-sm font-mono text-amber-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all leading-relaxed custom-scrollbar"
                  />
                </div>

                {/* Optional CTA Link (when not full HTML) */}
                {!isFullHtml && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">
                        CTA Button Label (Optional)
                      </label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        placeholder="e.g. Confirm Attendance"
                        className="w-full bg-[#060b14] border border-white/10 focus:border-amber-400/70 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">
                        CTA Destination URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={ctaUrl}
                        onChange={(e) => setCtaUrl(e.target.value)}
                        placeholder="https://slsywc.ieee.lk"
                        className="w-full bg-[#060b14] border border-white/10 focus:border-amber-400/70 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Dispatch Trigger Button */}
                <div className="pt-3 border-t border-white/10">
                  <button
                    disabled={isSending || (!file && parsedRecipients.length === 0)}
                    onClick={handleSendEmails}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all ${
                      isSending || (!file && parsedRecipients.length === 0)
                        ? "bg-gray-800/80 text-gray-500 cursor-not-allowed border border-white/5"
                        : "bg-gradient-to-r from-[#ffcb40] via-[#fbf5b7] to-[#d97706] hover:brightness-110 text-black shadow-lg shadow-amber-500/25 active:scale-[0.99]"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Dispatching Individual Emails...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Bulk Emails ({parsedRecipients.length} Recipients)
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    Dispatched individually via secure server-side SMTP. No recipient exposure or CC/BCC.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE HTML PREVIEW */}
        {activeTab === "preview" && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Preview Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f172a]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-400">Previewing As:</span>
                {parsedRecipients.length > 0 ? (
                  <select
                    value={previewRecipientIdx}
                    onChange={(e) => setPreviewRecipientIdx(Number(e.target.value))}
                    className="bg-[#060b14] border border-white/10 text-amber-300 font-bold text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-400"
                  >
                    {parsedRecipients.slice(0, 30).map((r, i) => (
                      <option key={i} value={i}>
                        {r.name} ({r.email})
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 text-xs font-bold">
                    Kasun Perera (Sample)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-[#060b14] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      previewDevice === "desktop"
                        ? "bg-amber-400 text-black font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      previewDevice === "mobile"
                        ? "bg-amber-400 text-black font-bold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Email Frame */}
            <div className="flex justify-center">
              <div
                className={`transition-all duration-300 w-full ${
                  previewDevice === "mobile" ? "max-w-sm" : "max-w-2xl"
                }`}
              >
                {isFullHtml ? (
                  <div
                    className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#030710]"
                    dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                  />
                ) : (
                  <div className="bg-[#101828] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    
                    {/* Header Logo */}
                    <div className="p-8 pb-6 text-center border-b border-slate-800/80 bg-gradient-to-b from-amber-400/10 to-transparent">
                      <img
                        src={LOGO_URL}
                        alt="IEEE SLSYWC 2026"
                        className="h-11 mx-auto object-contain"
                      />
                      <div className="h-0.5 w-16 bg-gradient-to-r from-amber-200 to-amber-500 mx-auto mt-4 rounded-full" />
                    </div>

                    {/* Email Body */}
                    <div className="p-8 sm:p-10 space-y-6">
                      <div className="text-xl sm:text-2xl font-bold text-amber-100">
                        Dear <span className="text-amber-400">{previewName}</span>,
                      </div>

                      {/* Dynamic Injected Content */}
                      <div
                        className="text-gray-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                      />

                      {/* CTA Button */}
                      {ctaUrl && ctaText && (
                        <div className="pt-4 text-center">
                          <a
                            href={ctaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-amber-500/30 hover:scale-105 transition-transform"
                          >
                            {ctaText}
                          </a>
                        </div>
                      )}

                      {/* Sign-off */}
                      <div className="pt-8 border-t border-slate-800/80 text-xs text-gray-400 space-y-1">
                        <p className="font-semibold text-gray-200">Best regards,</p>
                        <p>Organizing Committee</p>
                        <p className="text-amber-400 font-medium">IEEE SLSYWC 2026</p>
                        <p className="text-gray-500">IEEE Sri Lanka Section</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#060b14] p-5 text-center text-[11px] text-gray-500 border-t border-slate-900">
                      <p>&copy; 2026 IEEE SLSYWC. All rights reserved.</p>
                      <p className="mt-1 text-gray-600">Club Palm Bay, Marawila, Sri Lanka</p>
                    </div>

                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DISPATCH LOG / RESULTS */}
        {activeTab === "results" && results && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0f172a]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Recipients
                </p>
                <p className="text-3xl font-extrabold text-white mt-1">
                  {results.total}
                </p>
              </div>
              <div className="bg-[#0f172a]/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Successfully Sent
                </p>
                <p className="text-3xl font-extrabold text-emerald-300 mt-1">
                  {results.sent}
                </p>
              </div>
              <div className="bg-[#0f172a]/90 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Failed Deliveries
                </p>
                <p className="text-3xl font-extrabold text-red-300 mt-1">
                  {results.failed}
                </p>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-[#0f172a]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  Individual Recipient Delivery Report
                </div>
                <button
                  onClick={() => setActiveTab("compose")}
                  className="text-xs font-semibold text-amber-400 hover:underline"
                >
                  Send Another Batch
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#060b14] uppercase text-[10px] text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Recipient Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Delivery Status</th>
                      <th className="py-3 px-4">Message ID / Error Diagnostic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.results?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-semibold text-white">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-400">
                          {item.email}
                        </td>
                        <td className="py-3 px-4">
                          {item.status === "sent" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" /> Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                              <AlertCircle className="w-3 h-3" /> Failed
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-gray-400">
                          {item.messageId || item.error || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
