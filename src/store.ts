import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reduxslice/CartSlice';
import wishlistReducer from './reduxslice/WishlistSlice';
import authReducer from "./reduxslice/authSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
     auth: authReducer,
  }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
