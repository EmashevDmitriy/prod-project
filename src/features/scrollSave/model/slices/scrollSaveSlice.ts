import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveScheme } from '../types/ScrollSaveScheme';

const initialState: ScrollSaveScheme = {
	scroll: {},
};

export const scrollSaveSlice = createSlice({
	name: 'scrollSave',
	initialState,
	reducers: {
		setScrollPosition(
			state,
			action: PayloadAction<{ path: string; position: number }>,
		) {
			state.scroll[action.payload.path] = action.payload.position;
		},
	},
});

export const { actions: scrollSaveActions } = scrollSaveSlice;
export const { reducer: scrollSaveReducer } = scrollSaveSlice;
