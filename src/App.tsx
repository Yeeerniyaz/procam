import { useEffect, useState } from 'react';
import { Box, createTheme, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import RadarPage from './components/RadarPage';
import CallbackForm from './components/CallbackForm';
import WhatsAppFab from './components/WhatsAppFab';

const theme = createTheme({
  primaryColor: 'dark',
  defaultRadius: 'lg',
  fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  headings: {
    fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
    fontWeight: '800',
  },
});

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'radar'>(() =>
    window.location.hash === '#procam-radar' ? 'radar' : 'home'
  );

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#procam-radar') {
        setActivePage('radar');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigatePage = (page: 'home' | 'radar') => {
    setActivePage(page);
    if (page === 'radar') {
      window.history.replaceState(null, '', '#procam-radar');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.replaceState(null, '', '#top');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Header activePage={activePage} onNavigatePage={navigatePage} />
      {activePage === 'radar' ? (
        <RadarPage onBackHome={() => navigatePage('home')} />
      ) : (
        <Box component="main" className="vms-snap-container">
          <Hero />
          <HardwareSection />
          <AdvantagesSection />
          <StepsSection />
          <CallbackForm />
        </Box>
      )}
      <WhatsAppFab />
    </MantineProvider>
  );
}
