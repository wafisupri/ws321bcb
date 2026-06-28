import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Card3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    // Entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, rotateY: -10 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );

    // Scroll-driven 3D rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.to(card, {
      rotateY: 180,
      scale: 0.85,
      y: 60,
      duration: 0.4,
      ease: 'none',
    })
      .to(card, {
        rotateY: 200,
        rotateX: 5,
        opacity: 0.3,
        duration: 0.6,
        ease: 'none',
      });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === container)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center py-8"
      style={{ perspective: '2000px' }}
    >
      <div
        ref={cardRef}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          width: 'min(400px, 80vw)',
          aspectRatio: '624 / 964',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <img
            src="/assets/card-front.png"
            alt="BFI Access Card Front"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <img
            src="/assets/card-back.png"
            alt="BFI Access Card Back"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
