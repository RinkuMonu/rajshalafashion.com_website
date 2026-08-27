// import { createSlice } from '@reduxjs/toolkit';

// const WishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItemToWishlist: (state, action) => {
//       const item = action.payload;
//       const exists = state.items.find(i => i.id === item.id);
//       if (!exists) {
//         state.items.push(item);
//       }
//     },
//     removeItemFromWishlist: (state, action) => {
//       const id = action.payload;
//       state.items = state.items.filter(item => item.id !== id);
//     },
//     clearWishlist: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } = WishlistSlice.actions;

// export default WishlistSlice.reducer;


//============================================================================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const baseUrl = "http://localhost:5000/api";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;


// Get token from localStorage
const getToken = () => localStorage.getItem('token');

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${baseUrl}/wishlist`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    const data = await res.json();
    return data.wishlist?.items || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});


export const addItemToWishlist = createAsyncThunk(
  'wishlist/addItemToWishlist',
  async (productId, thunkAPI) => {
    const token = getToken();

    console.log("wishlist tokenn : : " , token);
    
    // 🔐 Token check karo
    if (!token) {
      return thunkAPI.rejectWithValue('User not logged in');
    }

    try {
      const res = await fetch(`${baseUrl}/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error('Failed to add item to wishlist');
      const data = await res.json();
      return data.wishlist.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const removeItemFromWishlist = createAsyncThunk('wishlist/removeItemFromWishlist', async (productId, thunkAPI) => {
  try {
    const res = await fetch(`${baseUrl}/wishlist/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error('Failed to remove item');
    const data = await res.json();
    return data.wishlist.items || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const clearWishlist = createAsyncThunk('wishlist/clearWishlist', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${baseUrl}/wishlist/clear`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (!res.ok) throw new Error('Failed to clear wishlist');
    return [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default WishlistSlice.reducer;
