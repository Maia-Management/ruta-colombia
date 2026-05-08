'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  autoPlay?: boolean;
}

export default function PhotoCarousel({
  slides,
  className = 'h-56',
  autoPlay = true,
}: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (idx: number) => setCurrent(((idx % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (!autoPlay || slides.length < 2) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (timerRef.current) clearInterval(timerRef.current);
      go(diff > 0 ? current + 1 : current - 1);
    }
  };

  if (!slides.length) return null;

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            width={1200}
            height={600}
          />
        </div>
      ))}

      {/* Caption overlay */}
      {slides[current]?.caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 pointer-events-none">
          <p className="text-white text-xs font-medium">{slides[current].caption}</p>
        </div>
      )}

      {/* Arrows — only on multi-slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white text-xl leading-none flex items-center justify-center transition-colors z-10"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white text-xl leading-none flex items-center justify-center transition-colors z-10"
            aria-label="Next photo"
          >
            ›
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="p-2 flex items-center justify-center"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
