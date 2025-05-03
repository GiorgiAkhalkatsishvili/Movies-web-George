import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/player']; // All routes starting with /player

  // Check if current route starts with '/player'
  const hideHeader = hideHeaderOnRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeader && <HeaderComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
