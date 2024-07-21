import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/apiServices/http-request.js';

// 異步行為：獲取數據
export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async () => {
    const response = await http.get('/api/v1/auth');
    return response.data;
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      token: undefined,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    removeToken: (state) => {
      state.data.token = undefined;
    },
    updateToken: (state, action) => {
      state.data.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// 導出同步 action
export const { removeToken, updateToken } = authSlice.actions;

// 導出 reducer
export default authSlice.reducer;
