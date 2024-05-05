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
import { ScrollSaveScheme } from 'features/scrollSave';
import { ArticleDetailsPageScheme } from 'pages/ArticleDetailsPage';
import { ArticlesPageScheme } from 'pages/ArticlesPage';

export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;
	scrollSave: ScrollSaveScheme;

	//Async
	loginForm?: LoginScheme;
	profile?: ProfileScheme;
	articleDetails?: ArticleDetailsScheme;
	addNewComment?: AddNewCommentScheme;
	articlesPage?: ArticlesPageScheme;
	articleDetailsPage?: ArticleDetailsPageScheme;
}

export type StateSchemeKeys = keyof StateScheme;
export type MountedReducers = OptionalRecord<StateSchemeKeys, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateScheme>;
	reduce: (
		state: StateScheme,
		action: Action,
	) => CombinedSliceReducer<StateScheme>;
	add: (key: StateSchemeKeys, reducer: Reducer) => void;
	remove: (key: StateSchemeKeys) => void;

	//true - mounted
	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateScheme;
}
