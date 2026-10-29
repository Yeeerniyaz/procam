import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import CallbackForm from './components/CallbackForm';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] text-[#09090B]">
      <Header />
      <main>
        <Hero />
        <HardwareSection />
        <AdvantagesSection />
        <StepsSection />
        <CallbackForm />
      </main>
      <WhatsAppFab />
    </div>
  );
}
