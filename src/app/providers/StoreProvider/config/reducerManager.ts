import {
	Action,
	Reducer,
	combineReducers,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateScheme, StateSchemeKeys } from './StateScheme';

export function createReducerManager(
	initialReducers: ReducersMapObject<StateScheme>,
) {
	const reducers = { ...initialReducers };
	let combinedReducer = combineReducers(reducers);
	let keysToRemove: Array<StateSchemeKeys> = [];

	return {
		getReducerMap: () => reducers,
		reduce: (state: StateScheme, action: Action) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				for (const key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return combinedReducer(state, action);
		},
		add: (key: StateSchemeKeys, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return;
			}
			reducers[key] = reducer;
			combinedReducer = combineReducers(reducers);
		},
		remove: (key: StateSchemeKeys) => {
			if (!key || !reducers[key]) {
				return;
			}
			delete reducers[key];
			keysToRemove.push(key);
			combinedReducer = combineReducers(reducers);
		},
	};
}
