import React from 'react';

/**
 * DẤU ẤN STUDIO — BRAND LOGO & VISUAL MARKS
 * Exact Match to Moodboard Specs (media_1788254706490.jpg)
 * 
 * 1. FingerprintMark: Oval fingerprint line art
 * 2. DauAnLogoWordmark: Full Brand Logo with Playfair Display 'DẤU ẤN' & tracked 'STUDIO'
 * 3. DauAnAppIcon: Blue squircle (#315CFF) icon
 */

export function FingerprintMark({ className = "w-10 h-12 text-ink" }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" className={`stroke-current ${className}`}>
      {/* Smooth Concentric Oval Fingerprint Ridges */}
      <path d="M50 10 C25 10, 10 32, 10 60 C10 90, 25 110, 50 110 C75 110, 90 90, 90 60 C90 32, 75 10, 50 10" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M50 22 C31 22, 18 40, 18 60 C18 84, 31 100, 50 100 C69 100, 82 84, 82 60 C82 40, 69 22, 50 22" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 34 C37 34, 26 48, 26 60 C26 78, 37 90, 50 90 C63 90, 74 78, 74 60 C74 48, 63 34, 50 34" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M50 46 C42 46, 34 53, 34 60 C34 71, 42 80, 50 80 C58 80, 66 71, 66 60 C66 53, 58 46, 50 46" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 58 C47 58, 42 61, 42 65 C42 70, 46 72, 50 72 C54 72, 58 70, 58 65 C58 61, 53 58, 50 58" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="50" cy="65" r="3" fill="currentColor" />
    </svg>
  );
}

export function DauAnLogoWordmark({ size = "normal", showTagline = true, className = "" }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Primary Fingerprint Mark */}
      <FingerprintMark className={size === "large" ? "w-14 h-16 text-ink" : "w-8 h-10 text-ink"} />

      {/* Wordmark Text Stack */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif font-semibold text-ink leading-none tracking-tight text-xl sm:text-2xl">
            DẤU ẤN
          </span>
        </div>
        <span className="font-sans font-bold text-ink text-[10px] sm:text-xs tracking-[0.35em] uppercase leading-tight pt-0.5">
          STUDIO
        </span>
        {showTagline && (
          <span className="text-[10px] text-ink/60 font-sans tracking-tight pt-1">
            Chuyên môn tạo nên dấu ấn.
          </span>
        )}
      </div>
    </div>
  );
}

export function DauAnAppIcon({ className = "w-10 h-10" }) {
  return (
    <div className={`rounded-2xl bg-[#315CFF] flex items-center justify-center p-2 shadow-md ${className}`}>
      <FingerprintMark className="w-full h-full text-white" />
    </div>
  );
}
