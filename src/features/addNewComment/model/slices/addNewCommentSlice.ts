import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddNewCommentScheme } from '../types/addNewComment';

const initialState: AddNewCommentScheme = {
	text: '',
};

export const addNewCommentSlice = createSlice({
	name: 'addNewComment',
	initialState,
	reducers: {
		setText(state, action: PayloadAction<string>) {
			state.text = action.payload;
		},
	},
	// extraReducers: builder => {
	// 	builder
	// 		.addCase(loginByUsername.pending, state => {
	// 			state.error = undefined;
	// 			state.isLoading = true;
	// 		})
	// 		.addCase(loginByUsername.fulfilled, state => {
	// 			state.isLoading = false;
	// 		})
	// 		.addCase(loginByUsername.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			state.error = action.payload;
	// 		});
	// },
});

export const { actions: addNewCommentActions } = addNewCommentSlice;
export const { reducer: addNewCommentReducer } = addNewCommentSlice;
