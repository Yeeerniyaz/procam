import { Box, createTheme, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import CallbackForm from './components/CallbackForm';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

const theme = createTheme({
  primaryColor: 'dark',
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Header />
      <Box component="main">
        <Hero />
        <HardwareSection />
        <AdvantagesSection />
        <StepsSection />
        <CallbackForm />
      </Box>
      <Footer />
      <WhatsAppFab />
    </MantineProvider>
  );
}
