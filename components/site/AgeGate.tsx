'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSiteContent } from '@/lib/useSiteContent';

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const { brand, ageGate } = useSiteContent();

  useEffect(() => {
    const isPreview =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('preview');
    const verified =
      sessionStorage.getItem('jfk-age-verified') || isPreview;
    if (!verified) setShow(true);
  }, []);

  function confirm() {
    sessionStorage.setItem('jfk-age-verified', '1');
    setShow(false);
  }

  if (!show || ageGate.enabled === false) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.96)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="relative max-w-md w-full text-center px-8 sm:px-10 py-12 rounded bg-[#161616] border border-white/10 shadow-2xl"
        style={{
          boxShadow:
            '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 217, 0, 0.15)',
        }}
      >
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-[#F5D900]" />

        <div className="flex justify-center mb-7">
          <Image
            src={
              brand.logoUrl ||
              'https://res.cloudinary.com/ovmougmy/image/upload/v1793981764/jfk-liquors/logo.png'
            }
            alt={brand.storeName || 'JFK Liquors'}
            width={180}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#F5D900] uppercase">
            {ageGate.eyebrow}
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] mb-3">
          {ageGate.heading}
        </h2>

        <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8 font-light">
          {ageGate.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={confirm}
            className="btn-gold flex-1 text-xs"
          >
            {ageGate.confirmText}
          </button>

          <a
            href={ageGate.denyUrl || 'https://www.google.com'}
            className="btn-ghost flex-1 text-xs"
          >
            {ageGate.denyText}
          </a>
        </div>

        <p className="text-[10.5px] font-mono text-[#F5D900] mt-8 uppercase tracking-widest">
          {ageGate.footerText}
        </p>
      </div>
    </div>
  );
}
