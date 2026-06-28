import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Process Overview', href: '#process-overview' },
  { label: 'RACI Matrix', href: '#process-overview' },
  { label: 'Documents', href: '#process-overview' },
];

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    if (href === '#process-overview') {
      const section = document.getElementById('process-overview');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        const tabMap: Record<string, string> = {
          'Process Overview': 'overview',
          'RACI Matrix': 'raci',
          'Documents': 'documents',
        };
        const tabId = tabMap[label];
        if (tabId) {
          setTimeout(() => {
            const tabBtn = document.querySelector(`[data-tab="${tabId}"]`) as HTMLButtonElement;
            if (tabBtn) tabBtn.click();
          }, 400);
        }
      }
    } else {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-shadow duration-300"
      style={{
        backgroundColor: 'rgba(0, 88, 71, 0.97)',
        backdropFilter: 'blur(8px)',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleClick(e, '#hero', 'Home')} className="flex items-center gap-3">
          <img
            src="/assets/bfi-logo.png"
            alt="Brunei Fertilizer Industries"
            className="h-9 w-auto brightness-0 invert"
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '#hero'
                ? activeSection === 'hero'
                : activeSection === 'process-overview';
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href, link.label)}
                className="text-sm font-medium transition-colors duration-200 relative pb-1"
                style={{
                  color: isActive ? '#FBB034' : 'rgba(255,255,255,0.75)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FBB034]" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
