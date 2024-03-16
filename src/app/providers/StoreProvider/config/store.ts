import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme, ThunkExtraArg } from './StateScheme';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
	initialState?: StateScheme,
	asyncReducers?: ReducersMapObject<StateScheme>,
	navigate?: (to: To, options?: NavigateOptions) => void,
) {
	const rootReducer: ReducersMapObject<StateScheme> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducer);

	const extraArg: ThunkExtraArg = {
		api: $api,
		navigate,
	};

	const store = configureStore({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		reducer: reducerManager.reduce as ReducersMapObject<StateScheme>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
