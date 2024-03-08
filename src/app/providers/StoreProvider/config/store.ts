import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme } from './StateScheme';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
	initialState?: StateScheme,
	asyncReducers?: ReducersMapObject<StateScheme>,
) {
	const rootReducer: ReducersMapObject<StateScheme> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore<StateScheme>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initialState,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
