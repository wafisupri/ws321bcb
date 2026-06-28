import Card3D from '@/components/Card3D';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #005847 0%, #074C31 70%)',
      }}
    >
      {/* Diagonal line pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 40px)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Column - Text */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            {/* Badge */}
            <div
              className="section-entrance inline-block mb-5 px-3.5 py-1.5 rounded"
              style={{
                backgroundColor: 'rgba(251, 176, 52, 0.15)',
                border: '1px solid rgba(251, 176, 52, 0.35)',
              }}
            >
              <span
                className="text-xs font-medium uppercase tracking-[0.1em]"
                style={{ color: '#FBB034' }}
              >
                BFI EMPLOYEE ACCESS
              </span>
            </div>

            {/* Title */}
            <h1
              className="section-entrance section-entrance-delay-1 font-bold text-white leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', maxWidth: '520px' }}
            >
              Your Access, Your Responsibility
            </h1>

            {/* Subtitle */}
            <p
              className="section-entrance section-entrance-delay-2 text-lg leading-relaxed mb-8"
              style={{
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '480px',
              }}
            >
              Streamlined on-boarding and off-boarding processes across all departments. The BFI
              Access Card is your key to a secure and compliant workplace.
            </p>

            {/* CTA Button */}
            <div className="section-entrance section-entrance-delay-3">
              <a
                href="#process-overview"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('process-overview')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-7 py-3 rounded-md text-white text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: '#FBB034', color: '#074C31' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffc55a';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(251,176,52,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBB034';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explore Process
              </a>
            </div>
          </div>

          {/* Right Column - 3D Card */}
          <div className="w-full lg:w-[45%] flex items-center justify-center">
            <Card3D />
          </div>
        </div>
      </div>
    </section>
  );
}
