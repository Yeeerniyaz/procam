import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import CallbackForm from './components/CallbackForm';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HardwareSection />
        <AdvantagesSection />
        <StepsSection />
        <CallbackForm />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
