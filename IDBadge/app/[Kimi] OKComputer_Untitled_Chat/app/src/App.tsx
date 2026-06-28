import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import ProcessSection from '@/sections/ProcessSection';
import { useScrollSpy, useSectionEntrance } from '@/hooks/useScrollSpy';

function App() {
  const activeSection = useScrollSpy(['hero', 'process-overview']);
  useSectionEntrance();

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
