import {
	Action,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedSliceReducer } from '@reduxjs/toolkit/dist/combineSlices';
import { AxiosInstance } from 'axios';
import { ArticleDetailsScheme } from 'entities/Article';
import { CounterScheme } from 'entities/Counter';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername/model/types/LoginScheme';
import { AddNewCommentScheme } from 'features/addNewComment';
import { ArticleDetailsCommentScheme } from 'pages/ArticleDetailsPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;

	//Async
	loginForm?: LoginScheme;
	profile?: ProfileScheme;
	articleDetails?: ArticleDetailsScheme;
	articleDetailsComments?: ArticleDetailsCommentScheme;
	addNewComment?: AddNewCommentScheme;
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

export interface ThunkExtraArg {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateScheme;
}
