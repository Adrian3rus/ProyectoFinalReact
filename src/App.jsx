import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import CrudProductos from './Components/CrudProductos';
import Carrito from './Components/Carrito';
import { CartProvider } from './Components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="main-content body-offset">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crud" element={<CrudProductos />} />
              <Route path="/carrito" element={<Carrito />} />
              {/* Agregá más rutas si querés */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
