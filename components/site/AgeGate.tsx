'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('jfk-age-verified');
    if (!verified) setShow(true);
  }, []);

  function confirm() {
    sessionStorage.setItem('jfk-age-verified', '1');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(17, 17, 17, 0.96)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="relative max-w-md w-full text-center px-8 sm:px-10 py-12 rounded-2xl bg-[#242424] border border-[#3A3A3A] shadow-2xl"
        style={{
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 217, 0, 0.1)',
        }}
      >
        {/* Top Gold Accent Line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-[#D4AF37]"
        />

        <div className="flex justify-center mb-7">
          <Image
            src="/assets/logo.png"
            alt="JFK Liquors"
            width={200}
            height={70}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#3A3A3A]" />
          <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">
            Legal Age Verification
          </span>
          <div className="flex-1 h-px bg-[#3A3A3A]" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] uppercase mb-3">
          Are You 21 or Older?
        </h2>
        
        <p className="text-[#C7C7C7] text-sm leading-relaxed mb-8 font-light">
          Welcome to JFK Liquors. You must be of legal drinking age in the United States to browse our selection. Please confirm your age to enter.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={confirm} className="btn-gold flex-1 justify-center !py-3">
            Yes, I Am 21+
          </button>
          <a
            href="https://www.google.com"
            className="btn-ghost flex-1 justify-center !py-3 !border-[#3A3A3A] hover:!border-[#D4AF37]"
          >
            No, Leave
          </a>
        </div>

        <p className="mt-6 text-[11px] text-[#A0A0A0] font-light">
          Must be 21+ with valid ID. Drink responsibly.
        </p>
      </div>
    </div>
  );
}
