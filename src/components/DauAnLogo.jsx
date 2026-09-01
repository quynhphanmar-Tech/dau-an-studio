import React from 'react';

/**
 * DẤU ẤN STUDIO — BRAND FOUNDATION 1.1 (APPROVED MASTER)
 * Uses official locked SVG assets directly from Dau-An-Studio-Brand-Kit-v1.1-Approved:
 * - logo-mark-primary.svg (Primary Art Mark - locked master artwork)
 * - logo-mark-compact.svg (Compact Digital Mark for header & nav)
 * - logo-lockup-horizontal.svg (Horizontal Lockup with mark + wordmark)
 * - app-icon.svg (Electric Cobalt squircle app icon)
 */

export function FingerprintMark({ className = "w-10 h-12 text-ink", variant = "primary" }) {
  const svgSrc = variant === "compact"
    ? "/brand/dau-an-studio-brand-kit/logo-mark-compact.svg"
    : "/brand/dau-an-studio-brand-kit/logo-mark-primary.svg";

  return (
    <img 
      src={svgSrc} 
      alt="Dấu Ấn Studio Fingerprint Mark" 
      className={`object-contain ${className}`}
    />
  );
}

export function DauAnLogoWordmark({ size = "normal", showTagline = true, className = "" }) {
  // Use horizontal lockup SVG for full brand lockup
  if (!showTagline && size === "normal") {
    return (
      <div className={`flex items-center ${className}`}>
        <img 
          src="/brand/dau-an-studio-brand-kit/logo-lockup-horizontal.svg" 
          alt="Dấu Ấn Studio Logo" 
          className="h-10 sm:h-11 object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Primary Mark from official brand kit */}
      <img 
        src="/brand/dau-an-studio-brand-kit/logo-mark-primary.svg" 
        alt="Dấu Ấn Studio Mark" 
        className={size === "large" ? "w-16 h-18 object-contain" : "w-10 h-12 object-contain"}
      />

      {/* Wordmark Text Stack (Playfair Display for DẤU ẤN, Be Vietnam Pro for STUDIO) */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif font-medium text-ink leading-none tracking-tight text-xl sm:text-2xl">
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
    <img 
      src="/brand/dau-an-studio-brand-kit/app-icon.svg" 
      alt="Dấu Ấn Studio App Icon" 
      className={`object-contain ${className}`}
    />
  );
}
