// CartSlice.jsx
// This file sets up the Redux "slice" for the shopping cart.
// A Redux slice manages one piece of the app's state — in this case, the cart.

import { createSlice } from '@reduxjs/toolkit';

// createSlice creates the actions and reducer automatically.
const CartSlice = createSlice({
  name: 'cart',           // Name of this slice of state
  initialState: {
    items: [],            // The cart starts as an empty array
  },
  reducers: {

    // ACTION 1: addItem
    // Adds a new plant to the cart.
    // If the plant is already in the cart, increase its quantity by 1.
    // If not, add it as a new item with quantity 1.
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ACTION 2: removeItem
    // Completely removes a plant from the cart (used by the Delete button).
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ACTION 3: updateQuantity
    // Changes the quantity of a specific item in the cart.
    // Used by the + and - buttons on the cart page.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Export the actions so components can use them (dispatch them)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer so the Redux store can use it
export default CartSlice.reducer;
