import {
	Action,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedSliceReducer } from '@reduxjs/toolkit/dist/combineSlices';
import { CounterScheme } from 'entities/Counter';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername/model/types/LoginScheme';

export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;

	//Async
	loginForm?: LoginScheme;
}

export type StateSchemeKeys = keyof StateScheme;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateScheme>;
	reduce: (
		state: StateScheme,
		action: Action,
	) => CombinedSliceReducer<StateScheme>;
	add: (key: StateSchemeKeys, reducer: Reducer) => void;
	remove: (key: StateSchemeKeys) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
	reducerManager: ReducerManager;
}
