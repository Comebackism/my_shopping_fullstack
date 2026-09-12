import React from 'react';

export default function WorawatLogo({ size = 'md', variant = 'dark', className = '' }) {
  const sizeMap = {
    sm: { img: 'h-8 w-8', text: 'text-sm', sub: 'text-[9px]' },
    md: { img: 'h-10 w-10', text: 'text-base', sub: 'text-[10px]' },
    lg: { img: 'h-14 w-14', text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'h-20 w-20', text: 'text-3xl', sub: 'text-sm' }
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon (Geometric W with orange accent) */}
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1 shadow-xs transition duration-300 hover:scale-105 hover:border-orange-500/40 hover:shadow-md ${current.img}`}>
        <img
          src="/images/logo.jpg"
          alt="WORAWAT Brand Logo"
          className="h-full w-full object-contain"
          onError={(e) => {
            // Fallback SVG if image not found
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-wider ${variant === 'light' ? 'text-white' : 'text-slate-950'} ${current.text}`}>
            WORAWAT
          </span>
          <span className="rounded px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase bg-orange-50 text-orange-600 border border-orange-200">
            STUDIO
          </span>
        </div>
        <span className={`font-medium tracking-widest uppercase text-slate-400 ${current.sub}`}>
          STREETWEAR ARCHIVE
        </span>
      </div>
    </div>
  );
}
