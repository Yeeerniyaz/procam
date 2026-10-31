import { useEffect, useState } from 'react';
import { Box, createTheme, MantineProvider } from '@mantine/core';
import Header, { type HeaderPage } from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import ProgramsPage from './components/ProgramsPage';
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
  const [activePage, setActivePage] = useState<HeaderPage>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#procam-radar') return 'radar';
      if (window.location.hash === '#procam-vms') return 'vms';
      if (window.location.hash === '#programs' || window.location.hash === '#apps') return 'programs';
    }
    return 'home';
  });

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#procam-radar') {
        setActivePage('radar');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#procam-vms') {
        setActivePage('vms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#programs' || window.location.hash === '#apps') {
        setActivePage('programs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigatePage = (page: HeaderPage) => {
    setActivePage(page);
    if (page === 'radar') {
      window.history.replaceState(null, '', '#procam-radar');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'vms') {
      window.history.replaceState(null, '', '#procam-vms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'programs') {
      window.history.replaceState(null, '', '#programs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.replaceState(null, '', '#top');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Header activePage={activePage} onNavigatePage={navigatePage} />
      {activePage !== 'home' ? (
        <ProgramsPage
          onBackHome={() => navigatePage('home')}
          initialTab={activePage === 'radar' ? 'radar' : 'vms'}
        />
      ) : (
        <Box component="main" className="vms-snap-container">
          <Hero />
          <HardwareSection />
          <AdvantagesSection />
          <StepsSection />
          <CallbackForm onNavigateRadar={() => navigatePage('programs')} />
        </Box>
      )}
      <WhatsAppFab />
    </MantineProvider>
  );
}
