
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const store = useStore();
  const { isAuthenticated, isAdmin, settings } = store;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar settings={settings} isAuthenticated={isAuthenticated} logout={store.logout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home store={store} />} />
            <Route path="/services" element={<Services store={store} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service/:id" element={<ServiceDetail store={store} />} />
            <Route path="/checkout/:id" element={<Checkout store={store} />} />
            <Route path="/login" element={<Login login={store.login} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />} />
            <Route path="/signup" element={<SignUp signup={store.signup} isAuthenticated={isAuthenticated} />} />
            <Route 
              path="/admin/*" 
              element={isAdmin ? <AdminDashboard store={store} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        <Footer settings={settings} />
      </div>
    </HashRouter>
  );
};

export default App;
