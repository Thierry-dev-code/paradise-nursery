// App.jsx
// This is the main entry point of the app.
// It shows:
// 1. The landing page (with background image, company name, and Get Started button)
// 2. The ProductList page (after clicking Get Started)
// 3. The CartItem page (when viewing the cart)

import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  // "currentPage" controls which page is shown:
  // 'landing'  → the welcome/home page
  // 'products' → the plant browsing page
  // 'cart'     → the shopping cart page
  const [currentPage, setCurrentPage] = useState('landing');

  // Navigate to the product listing page
  const goToProducts = () => setCurrentPage('products');

  // Navigate to the cart page
  const goToCart = () => setCurrentPage('cart');

  // Navigate back to the landing page (Home)
  const goToHome = () => setCurrentPage('landing');

  // ---- LANDING PAGE ----
  if (currentPage === 'landing') {
    return (
      <div className="landing-container">
        <div className="landing-content">
          <h1>🌿 Paradise Nursery</h1>
          <p>Bringing nature into your home, one plant at a time.</p>
          {/* Clicking this button takes the user to the product list */}
          <button className="get-started-btn" onClick={goToProducts}>
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // ---- PRODUCT LIST PAGE ----
  if (currentPage === 'products') {
    return (
      <ProductList
        onGoToCart={goToCart}
        onGoToHome={goToHome}
      />
    );
  }

  // ---- CART PAGE ----
  if (currentPage === 'cart') {
    return (
      <CartItem
        onContinueShopping={goToProducts}
        onGoToHome={goToHome}
        onGoToCart={goToCart}
      />
    );
  }
}

export default App;
