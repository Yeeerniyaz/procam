import { Box, createTheme, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
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
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Header />
      <Box component="main" className="vms-snap-container">
        <Hero />
        <HardwareSection />
        <AdvantagesSection />
        <StepsSection />
        <CallbackForm />
      </Box>
      <WhatsAppFab />
    </MantineProvider>
  );
}
