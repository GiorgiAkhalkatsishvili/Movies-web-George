import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import PlayerPage from './pages/PlayerPage';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeaderOnRoutes = ['/player'];
  const hideHeader = hideHeaderOnRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname === '/login') {
        // Only redirect if currently on login page
        navigate('/');
      } else if (!user && location.pathname !== '/login') {
        // Only redirect to login if not already there
        navigate('/login');
      }
    });
  
    return () => unsubscribe();
  }, [navigate, location]);
  

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
