import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { ScrollSaveScheme } from '../types/ScrollSaveScheme';

export const getScrollSave = (state: StateScheme) => state.scrollSave;

export const getScrollSaveByPath = createSelector(
	getScrollSave,
	(_: StateScheme, path: string) => path,
	(scrollSaveScheme: ScrollSaveScheme, path: string) =>
		scrollSaveScheme.scroll[path] || 0,
);
