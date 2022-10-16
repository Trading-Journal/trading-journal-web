import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer/Footer';
import { Routes } from './components/routes/Routes';
import { TopBar } from './components/top-bar/TopBar';
import { AuthProvider } from './context/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <TopBar />
            <Routes />
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
      <Footer />
    </Box>
  );
}

export default App;
