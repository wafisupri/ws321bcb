export default function Footer() {
  const quickLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    {
      label: 'Process Overview',
      action: () => {
        document.getElementById('process-overview')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const tab = document.querySelector('[data-tab="overview"]') as HTMLButtonElement;
          if (tab) tab.click();
        }, 400);
      },
    },
    {
      label: 'RACI Summary',
      action: () => {
        document.getElementById('process-overview')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const tab = document.querySelector('[data-tab="raci"]') as HTMLButtonElement;
          if (tab) tab.click();
        }, 400);
      },
    },
    {
      label: 'Documents',
      action: () => {
        document.getElementById('process-overview')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const tab = document.querySelector('[data-tab="documents"]') as HTMLButtonElement;
          if (tab) tab.click();
        }, 400);
      },
    },
  ];

  return (
    <footer className="w-full" style={{ backgroundColor: '#1A2B4C' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Logo & Copyright */}
          <div>
            <img
              src="/assets/bfi-logo.png"
              alt="Brunei Fertilizer Industries"
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Brunei Fertilizer Industries Sdn Bhd
            </p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Sungai Liang Industrial Park, Belait, Brunei Darussalam
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &copy; 2025 Brunei Fertilizer Industries. All rights reserved.
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-sm text-left transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#C8962E' }}>
                  Security Team
                </p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  +673 727 6993
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#C8962E' }}>
                  OSS Section
                </p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  oss@bfi.com.bn
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#C8962E' }}>
                  HSSE Department
                </p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  +673 737 4998 (Safety)
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#C8962E' }}>
                  General
                </p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  info@bfi.com.bn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="w-full py-5 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Prepared by: Security Team | OSS Section | HSSE Department
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Ground Floor, SPARK Centre, Simpang 787, Kg Sungai Liang, Belait KC1135, Brunei
          Darussalam.
        </p>
      </div>
    </footer>
  );
}
