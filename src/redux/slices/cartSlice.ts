import { createSlice } from "@reduxjs/toolkit";

// Define the type for a cart item
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    img: string;  
  }
  
  // Define the initial state type
  interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
  }

  const initialState : CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  }
  

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state , action) =>{
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem){
                action.payload.quantity ? existingItem.quantity += action.payload.quantity : existingItem.quantity += 1;
            }
            else{
                action.payload.quantity ? state.items.push({ ...action.payload , quantity : action.payload.quantity }) :state.items.push({ ...action.payload , quantity : 1 }) ;
            }
            action.payload.quantity ? state.totalQuantity += action.payload.quantity : state.totalQuantity += 1;
            action.payload.quantity ? state.totalPrice += (action.payload.quantity * action.payload.price) : state.totalPrice += action.payload.price;
          
            // state.totalPrice += action.payload. price
            console.log("stateee" , action);
            console.log("state items" , state.items[0]);
            console.log("state total quantity" , state.totalQuantity);
            console.log("state total price" , state.totalPrice);
        },
        removeFromCart: (state , action) =>{
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if(itemIndex > -1){
                const item = state.items[itemIndex];
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.items.splice(itemIndex , 1);
            }
        },
        updateQuantity: (state , action) =>{
            const item = state.items.find(item => item.id === action.payload.id);
            if (item){
                state.totalQuantity += action.payload.quantity - item.quantity;
                state.totalPrice += (action.payload.quantity - item.quantity) * item.price;
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) =>{
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const {addToCart , removeFromCart , updateQuantity , clearCart} = cartSlice.actions
export const selectProduct = (state: any) => state.cart.items;
export default cartSlice.reducer