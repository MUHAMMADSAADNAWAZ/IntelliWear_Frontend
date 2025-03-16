import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
  size: {
    id: number;
    size: string;
    quantity: number;
  };
  checked: boolean;
  cart_item_id: number;
}

// Define the initial state type
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  cartVisibility: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartVisibility: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const cartItems = action?.payload?.map((item: any) => ({
        cart_item_id: item?.cart_item_id,
        id: item?.product_id,
        name: item?.name,
        image: item?.image,
        price: Number(item?.price),
        size: item?.size,
        quantity: item?.quantity,
        checked: true,
      }));

      state.items = cartItems;
      state.totalQuantity = cartItems.reduce(
        (total: number, item: { quantity: number }) => total + item.quantity,
        0
      );
      state.totalPrice = parseFloat(action?.payload?.total_price);
    },

    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size.id === action.payload.size.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
          checked: true,
        });
      }

      state.totalQuantity += action.payload.quantity || 1;
      state.totalPrice +=
        (action.payload.quantity || 1) * Number(action.payload.price);
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.cart_item_id === action.payload.cart_item_id
      );

      if (itemIndex > -1) {
        const item = state.items[itemIndex];

        state.totalQuantity -= item.quantity;
        state.totalPrice = Math.max(
          0,
          state.totalPrice - Number(item.price) * item.quantity
        );
        state.totalPrice = parseFloat(state.totalPrice.toFixed(2));

        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size.id === action.payload.size.id
      );

      if (item) {
        const difference = action.payload.quantity - item.quantity;
        state.totalQuantity += difference;
        state.totalPrice = Math.max(
          0,
          state.totalPrice + difference * Number(item.price)
        );
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    toggleCart: (state) => {
      state.cartVisibility = !state.cartVisibility;
    },

    closeCart: (state) => {
      state.cartVisibility = false;
    },

    updateChecked: (state, action) => {
      const { id, size, checked } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size.id === size.id
      );

      if (item) {
        item.checked = checked;

        state.totalPrice = state.items
          .filter((item) => item.checked)
          .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
  updateChecked,
} = cartSlice.actions;
export const selectProduct = (state: any) => state.cart.items;
export const selectCart = (state: any) => state.cart;
export default cartSlice.reducer;
