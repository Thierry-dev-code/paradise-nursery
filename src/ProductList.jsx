// ProductList.jsx
// This page shows all the plants organized by category.
// Features:
// - A navbar with links to Home, Plants, and Cart
// - A cart icon showing the total number of items
// - Plants grouped into 3+ categories, each with 6+ plants
// - "Add to Cart" button per plant that disables after being clicked

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './store/CartSlice';

// =====================
// PLANT DATA
// 3 categories, 6 plants each = 18 plants total
// Each plant has: name, image (public URL), price, description, category
// =====================
const plantData = [
  // ---- CATEGORY 1: Air-Purifying Plants ----
  {
    category: 'Air-Purifying Plants',
    plants: [
      {
        name: 'Spider Plant',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_0001.jpg/640px-Chlorophytum_comosum_0001.jpg',
        price: 12.99,
        description: 'Great for removing toxins from the air.',
      },
      {
        name: 'Peace Lily',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/640px-Spathiphyllum_cochlearispathum_RTBG.jpg',
        price: 15.99,
        description: 'Elegant white flowers, filters air beautifully.',
      },
      {
        name: 'Snake Plant',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_plant_–_Sansevieria_trifasciata.jpg/640px-Snake_plant_–_Sansevieria_trifasciata.jpg',
        price: 18.99,
        description: 'Very low maintenance, purifies air at night.',
      },
      {
        name: 'Boston Fern',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Nephrolepis_exaltata.jpg/640px-Nephrolepis_exaltata.jpg',
        price: 14.99,
        description: 'Removes formaldehyde and adds humidity.',
      },
      {
        name: 'Aloe Vera',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/640px-Aloe_vera_flower_inset.png',
        price: 10.99,
        description: 'Soothing gel and an excellent air cleaner.',
      },
      {
        name: 'Rubber Plant',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ficus_elastica_2.jpg/640px-Ficus_elastica_2.jpg',
        price: 22.99,
        description: 'Bold leaves that absorb airborne chemicals.',
      },
    ],
  },

  // ---- CATEGORY 2: Tropical Plants ----
  {
    category: 'Tropical Plants',
    plants: [
      {
        name: 'Monstera',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Monstera_deliciosa2.jpg/640px-Monstera_deliciosa2.jpg',
        price: 29.99,
        description: 'Iconic split leaves, a tropical statement plant.',
      },
      {
        name: 'Bird of Paradise',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Strelitzia_reginae_.jpg/640px-Strelitzia_reginae_.jpg',
        price: 39.99,
        description: 'Dramatic large leaves, resembles a tropical bird.',
      },
      {
        name: 'Philodendron',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Philodendron_hederaceum.jpg/640px-Philodendron_hederaceum.jpg',
        price: 19.99,
        description: 'Heart-shaped leaves that thrive indoors.',
      },
      {
        name: 'Anthurium',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Anthurium_andraeanum.jpg/640px-Anthurium_andraeanum.jpg',
        price: 24.99,
        description: 'Bright red waxy flowers that last for months.',
      },
      {
        name: 'Calathea',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Calathea_makoyana1MBGC.jpg/640px-Calathea_makoyana1MBGC.jpg',
        price: 21.99,
        description: 'Stunning patterned leaves, loves humidity.',
      },
      {
        name: 'Bromeliad',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Guzmania_lingulata_1.jpg/640px-Guzmania_lingulata_1.jpg',
        price: 17.99,
        description: 'Vibrant color with minimal care requirements.',
      },
    ],
  },

  // ---- CATEGORY 3: Succulents & Cacti ----
  {
    category: 'Succulents & Cacti',
    plants: [
      {
        name: 'Echeveria',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Echeveria_Perle_von_Nürnberg.jpg/640px-Echeveria_Perle_von_Nürnberg.jpg',
        price: 8.99,
        description: 'Rosette-shaped succulent, great for windowsills.',
      },
      {
        name: 'Golden Barrel Cactus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Echinocactus_grusonii_2.jpg/640px-Echinocactus_grusonii_2.jpg',
        price: 13.99,
        description: 'Round and spiky, perfect for dry environments.',
      },
      {
        name: 'Jade Plant',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Crassula_ovata.jpg/640px-Crassula_ovata.jpg',
        price: 11.99,
        description: 'Thought to bring good luck, very easy to grow.',
      },
      {
        name: 'Haworthia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Haworthia_attenuata_var._attenuata.jpg/640px-Haworthia_attenuata_var._attenuata.jpg',
        price: 9.99,
        description: 'Tiny striped succulent, thrives in low light.',
      },
      {
        name: 'Prickly Pear Cactus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Opuntia_humifusa_rab.jpg/640px-Opuntia_humifusa_rab.jpg',
        price: 14.99,
        description: 'Flat paddle-shaped cactus with edible fruit.',
      },
      {
        name: 'Zebra Cactus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Haworthiopsis_attenuata_var._attenuata_clump.jpg/640px-Haworthiopsis_attenuata_var._attenuata_clump.jpg',
        price: 10.99,
        description: 'Striking white-striped leaves in a compact form.',
      },
    ],
  },
];

// =====================
// NAVBAR COMPONENT
// Shown at the top of both ProductList and CartItem pages
// =====================
export function Navbar({ onGoToHome, onGoToCart, onGoToProducts, cartCount }) {
  return (
    <nav className="navbar">
      {/* Brand name / Home link */}
      <span
        className="navbar-brand"
        onClick={onGoToHome}
        style={{ cursor: 'pointer' }}
      >
        🌿 Paradise Nursery
      </span>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li>
          <a onClick={onGoToHome} style={{ cursor: 'pointer' }}>Home</a>
        </li>
        <li>
          <a onClick={onGoToProducts} style={{ cursor: 'pointer' }}>Plants</a>
        </li>
        <li>
          {/* Cart icon with dynamic count badge */}
          <div className="cart-icon-wrapper" onClick={onGoToCart}>
            🛒
            {/* Only show the red badge if there are items in the cart */}
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

// =====================
// MAIN PRODUCT LIST COMPONENT
// =====================
function ProductList({ onGoToCart, onGoToHome }) {
  const dispatch = useDispatch();

  // Get the cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);

  // Track which plants have been added (to disable their buttons)
  // We store plant names in a Set for fast lookup
  const [addedPlants, setAddedPlants] = useState(new Set());

  // Total number of items in the cart (sum of all quantities)
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Called when user clicks "Add to Cart" on a plant card
  const handleAddToCart = (plant) => {
    // Dispatch the addItem action to Redux
    dispatch(addItem(plant));

    // Disable the button by adding the plant name to addedPlants
    setAddedPlants(prev => new Set([...prev, plant.name]));
  };

  return (
    <div className="product-page">
      {/* NAVBAR at the top */}
      <Navbar
        onGoToHome={onGoToHome}
        onGoToCart={onGoToCart}
        onGoToProducts={() => {}} // already on products page
        cartCount={totalCartCount}
      />

      {/* Loop through each category and render its plants */}
      {plantData.map((category) => (
        <div key={category.category} className="category-section">
          <h2 className="category-title">{category.category}</h2>

          <div className="plants-grid">
            {/* Loop through each plant in this category */}
            {category.plants.map((plant) => (
              <div key={plant.name} className="plant-card">
                {/* Plant thumbnail image */}
                <img src={plant.image} alt={plant.name} />

                <div className="plant-card-body">
                  {/* Plant name */}
                  <h3>{plant.name}</h3>

                  {/* Plant description */}
                  <p>{plant.description}</p>

                  {/* Plant price */}
                  <p><strong>${plant.price.toFixed(2)}</strong></p>

                  {/* Add to Cart button — disabled after being clicked */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedPlants.has(plant.name)}
                  >
                    {addedPlants.has(plant.name) ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
