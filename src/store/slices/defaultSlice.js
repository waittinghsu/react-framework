import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '@/apiServices/http-request';

// 異步行為：獲取數據
export const fetchData = createAsyncThunk('default/fetchData', async () => {
	const response = await http.get('/api/v1/demo/menu');
	return response.data;
});

// Slice
const defaultSlice = createSlice({
	name: 'default',
	initialState: {
		data: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		addItem: (state, action) => {
			state.data.push(action.payload);
		},
		removeItem: (state, action) => {
			state.data = state.data.filter(item => item.id !== action.payload);
		},
		updateItem: (state, action) => {
			const index = state.data.findIndex(item => item.id === action.payload.id);
			if (index !== -1) {
				state.data[index] = action.payload;
			}
		},
	},
	extraReducers: (builder) => {
		builder
				.addCase(fetchData.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(fetchData.fulfilled, (state, action) => {
					state.status = 'succeeded';
					state.data = action.payload;
				})
				.addCase(fetchData.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.error.message;
				});
	},
});

// 導出同步 action
export const { addItem, removeItem, updateItem } = defaultSlice.actions;

// 導出 reducer
export default defaultSlice.reducer;
