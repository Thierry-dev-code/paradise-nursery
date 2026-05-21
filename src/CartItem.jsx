// CartItem.jsx
// This is the Shopping Cart page.
// Features:
// - Shows all items added to the cart
// - Displays each item's thumbnail, name, unit price, quantity, and total cost
// - Increase / Decrease quantity buttons (+ and -)
// - Delete button to remove an item from the cart
// - Shows the overall cart total at the bottom
// - A "Checkout" button that shows "Coming Soon"
// - A "Continue Shopping" button that goes back to ProductList

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './store/CartSlice';
import { Navbar } from './ProductList';

function CartItem({ onContinueShopping, onGoToHome, onGoToCart }) {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);

  // Total number of items (for the navbar badge)
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate the grand total cost of all items combined
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Called when user clicks the "+" button
  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Called when user clicks the "-" button
  // If quantity would go below 1, remove the item from the cart instead
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Remove item if quantity reaches 0
      dispatch(removeItem(item.name));
    }
  };

  // Called when user clicks the "Delete" button
  const handleDelete = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // Called when user clicks "Checkout"
  const handleCheckout = () => {
    alert('🌿 Checkout coming soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div className="product-page">
      {/* NAVBAR at the top */}
      <Navbar
        onGoToHome={onGoToHome}
        onGoToCart={onGoToCart}
        onGoToProducts={onContinueShopping}
        cartCount={totalCartCount}
      />

      <div className="cart-page">
        <h2>🛒 Your Shopping Cart</h2>

        {/* If cart is empty, show a message */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <br />
            <button className="continue-btn" onClick={onContinueShopping}>
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            {/* Loop through each item in the cart */}
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">

                {/* Plant thumbnail */}
                <img src={item.image} alt={item.name} />

                {/* Plant name and unit price */}
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: <strong>${item.price.toFixed(2)}</strong></p>
                  {/* Total cost for this plant = price × quantity */}
                  <p>
                    Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>

                {/* Quantity controls: decrease, display count, increase */}
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                </div>

                {/* Delete button — removes item completely */}
                <button className="delete-btn" onClick={() => handleDelete(item.name)}>
                  🗑 Delete
                </button>
              </div>
            ))}

            {/* CART SUMMARY — shows grand total and action buttons */}
            <div className="cart-summary">
              <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>

              <div className="cart-actions">
                {/* Continue Shopping → goes back to ProductList */}
                <button className="continue-btn" onClick={onContinueShopping}>
                  ← Continue Shopping
                </button>

                {/* Checkout → shows "Coming Soon" message */}
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
