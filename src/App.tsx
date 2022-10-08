import './App.scss';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { TopBar } from './components/top-bar/TopBar';

import { HomePage } from './pages/home/HomePage';
import { JournalsPage } from './pages/journals/JournalsPage';

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

      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<JournalsPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </Box>
  );
}

export default App;
