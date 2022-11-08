import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import ConfirmationModalContextProvider from './components/dialog/ConfirmationDialog';
import { Footer } from './components/footer/Footer';
import { Routes } from './components/routes/Routes';
import { TopBar } from './components/top-bar/TopBar';
import { AuthProvider } from './context/UserContext';
import { UnauthorizedError } from './model/UnauthorizedError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof UnauthorizedError) {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/login';
      }
    },
  }),
});

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
          <ConfirmationModalContextProvider>
            <BrowserRouter>
              <TopBar />
              <Routes />
            </BrowserRouter>
          </ConfirmationModalContextProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
      <Footer />
    </Box>
  );
}

export default App;
