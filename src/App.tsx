import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer/Footer';
import { Routes } from './components/routes/Routes';
import { TopBar } from './components/top-bar/TopBar';
import { AuthProvider } from './context/UserContext';

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
      <AuthProvider>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </Box>
  );
}

export default App;
