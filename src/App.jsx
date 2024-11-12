import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EmotionProvider } from "./context/EmotionContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './PrivateRoute';  // Importa o novo arquivo PrivateRoute
import TelaInicial from './components/TelaInicial';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import NotFoundPage from './components/404Page';
import MaesQueInspiram from './components/MaesQueInspiram';
import Sobre from './components/Sobre';
import Contato from './components/Contato';
import Dashboard from './components/Dashboard';
import EmotionalGraphs from './components/EmotionalGraphs';
import AboutAutism from './components/AboutAutism'; 
import Profissionais from './components/Profissionais';
import AjudeNosAMelhorar from './components/AjudeNosAMelhorar';
import './App.css';

const authenticatedRoutes = [
  { path: '/', element: <TelaInicial /> },
  { path: '/sobre', element: <Sobre /> },
  { path: '/contato', element: <Contato /> },
  { path: '/dashboard/*', element: <Dashboard /> },
  { path: '/emotional-graphs', element: <EmotionalGraphs /> },
  { path: '/about-autism', element: <AboutAutism /> },
  { path: '/profissionais', element: <Profissionais /> },
  { path: '/AjudeNosAMelhorar', element: <AjudeNosAMelhorar /> },
  { path: '/maes-que-inspiram', element: <MaesQueInspiram /> },
];

function App() {
  return (
    <EmotionProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            {authenticatedRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<PrivateRoute element={route.element} />} />
            ))}
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </EmotionProvider>
  );
}

export default App;