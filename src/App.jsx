import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Workshops from './pages/Workshops';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Components from './pages/Components';
import Team from './pages/Team';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/components" element={<Components />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

export default App;
