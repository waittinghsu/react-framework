import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/apiServices/http-request';

// 異步行為：獲取數據
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await http.get('/api/v1/userInfo');
    return response.data;
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    doSomething: (state, action) => {
      state.data.name = 'omega';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// 導出同步 action
export const { doSomething } = userSlice.actions;

// 導出 reducer
export default userSlice.reducer;
