import { configureStore } from '@reduxjs/toolkit';
import defaultReducer from './slices/defaultSlice';

export const store = configureStore({
	reducer: {
		default: defaultReducer,
	},
});
