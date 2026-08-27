// import { createSlice } from '@reduxjs/toolkit';

// const CartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.items.find(i => i.id === item.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...item, quantity: 1 });
//       }
//     },
//     removeItemFromCart: (state, action) => {
//       const id = action.payload;
//       state.items = state.items.filter(item => item.id !== id);
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(i => i.id === id);

//       if (item) {
//         item.quantity = quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = CartSlice.actions;

// export default CartSlice.reducer;

// ===================================================================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCartAPI,
  getCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
} from '../api/cartAPI';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await getCartAPI();
  return res.data.cart.items;
});

export const addItemToCart = createAsyncThunk('cart/add', async (product) => {
  await addToCartAPI({ productId: product.id, quantity: product.quantity });
  return product;
});

export const updateQuantity = createAsyncThunk(
  'cart/update',
  async ({ id, quantity }) => {
    await updateCartItemAPI({ productId: id, quantity });
    return { id, quantity };
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/remove',
  async (id) => {
    await removeCartItemAPI({ productId: id });
    return id;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.map(item => ({
          id: item.product._id,
          name: item.product.productName,
          image: item.product.images?.[0],
          price: item.product.actualPrice || item.product.price,
          quantity: item.quantity,
        }));
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          state.items.push(item);
        }
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find((i) => i.id === id);
        if (item) item.quantity = quantity;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   addToCartAPI,
//   getCartAPI,
//   updateCartItemAPI,
//   removeCartItemAPI,
// } from '../api/cartAPI';

// // Local storage helpers
// const saveCartToLocal = (items) => {
//   localStorage.setItem('cart', JSON.stringify(items));
// };

// const loadCartFromLocal = () => {
//   try {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : [];
//   } catch {
//     return [];
//   }
// };

// export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState }) => {
//   const { cart } = getState();
  
//   if (cart.isLoggedIn) {
//     const res = await getCartAPI();
//     return res.data.cart.items;
//   }
//   return loadCartFromLocal();
// });

// export const addItemToCart = createAsyncThunk('cart/add', async (product, { getState }) => {
//   const { cart } = getState();
  
//   if (cart.isLoggedIn) {
//     await addToCartAPI({ productId: product.id, quantity: product.quantity || 1 });
//   }
  
//   return {
//     id: product.id,
//     name: product.name,
//     image: product.image,
//     price: product.price,
//     quantity: product.quantity || 1
//   };
// });

// export const updateQuantity = createAsyncThunk(
//   'cart/update',
//   async ({ id, quantity }, { getState }) => {
//     const { cart } = getState();
    
//     if (cart.isLoggedIn) {
//       await updateCartItemAPI({ productId: id, quantity });
//     }
    
//     return { id, quantity };
//   }
// );

// export const removeItemFromCart = createAsyncThunk(
//   'cart/remove',
//   async (id, { getState }) => {
//     const { cart } = getState();
    
//     if (cart.isLoggedIn) {
//       await removeCartItemAPI({ productId: id });
//     }
    
//     return id;
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: loadCartFromLocal(),
//     status: 'idle',
//     isLoggedIn: false
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.items = [];
//       if (!state.isLoggedIn) {
//         saveCartToLocal([]);
//       }
//     },
//     setLoginStatus: (state, action) => {
//       state.isLoggedIn = action.payload;
//     },
//     syncLocalCart: (state) => {
//       if (!state.isLoggedIn) {
//         state.items = loadCartFromLocal();
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.map(item => ({
//           id: item.product?._id || item.id,
//           name: item.product?.productName || item.name,
//           image: item.product?.images?.[0] || item.image,
//           price: item.product?.actualPrice || item.product?.price || item.price,
//           quantity: item.quantity,
//         }));
//         state.status = 'succeeded';
//       })
//       .addCase(fetchCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCart.rejected, (state) => {
//         state.status = 'failed';
//         if (!state.isLoggedIn) {
//           state.items = loadCartFromLocal();
//         }
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         const item = action.payload;
//         const existing = state.items.find((i) => i.id === item.id);
//         if (existing) {
//           existing.quantity += item.quantity;
//         } else {
//           state.items.push(item);
//         }
//         if (!state.isLoggedIn) {
//           saveCartToLocal(state.items);
//         }
//       })
//       .addCase(updateQuantity.fulfilled, (state, action) => {
//         const { id, quantity } = action.payload;
//         const item = state.items.find((i) => i.id === id);
//         if (item) {
//           item.quantity = quantity;
//           if (!state.isLoggedIn) {
//             saveCartToLocal(state.items);
//           }
//         }
//       })
//       .addCase(removeItemFromCart.fulfilled, (state, action) => {
//         state.items = state.items.filter((i) => i.id !== action.payload);
//         if (!state.isLoggedIn) {
//           saveCartToLocal(state.items);
//         }
//       });
//   },
// });

// export const { clearCart, setLoginStatus, syncLocalCart } = cartSlice.actions;
// export default cartSlice.reducer;