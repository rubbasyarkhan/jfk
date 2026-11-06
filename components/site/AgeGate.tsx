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
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.96)', backdropFilter: 'blur(16px)' }}
    >
      <div
        className="relative max-w-md w-full text-center px-8 sm:px-10 py-12 rounded bg-[#161616] border border-white/10 shadow-2xl"
        style={{
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 217, 0, 0.15)',
        }}
      >
        {/* Top Gold Accent Line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-[#F5D900]"
        />

        <div className="flex justify-center mb-7">
          <Image
            src="/assets/logo.png"
            alt="JFK Liquors"
            width={180}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#F5D900] uppercase">
            LEGAL AGE VERIFICATION
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] mb-3">
          Are you 21 or older?
        </h2>
        
        <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8 font-light">
          You must be of legal drinking age in the United States to explore and purchase from JFK Liquors.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={confirm}
            className="btn-gold flex-1 text-xs"
          >
            Yes, I am 21+
          </button>
          
          <a
            href="https://www.google.com"
            className="btn-ghost flex-1 text-xs"
          >
            No, leave
          </a>
        </div>

        <p className="text-[10.5px] font-mono text-[#737373] mt-8 uppercase tracking-widest">
          15655 John F Kennedy Blvd &bull; Houston, TX
        </p>
      </div>
    </div>
  );
}
