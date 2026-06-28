import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(sectionIds: string[], options?: { threshold?: number; rootMargin?: string }) {
  const [activeSection, setActiveSection] = useState<string>('');
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: options?.threshold ?? 0.15,
          rootMargin: options?.rootMargin ?? '-80px 0px 0px 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    observersRef.current = observers;

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds, options?.threshold, options?.rootMargin]);

  return activeSection;
}

export function useSectionEntrance() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px 0px 0px' }
    );

    const elements = document.querySelectorAll('.section-entrance');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
