import { StoryFn } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { addNewCommentReducer } from 'features/addNewComment/model/slices/addNewCommentSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DeepPartial } from 'ts-essentials';

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addNewComment: addNewCommentReducer,
	articleDetailsPage: articleDetailsPageReducer,
	articlesPage: articlesPageReducer,
};

export const StoreDecorator =
	(state: DeepPartial<StateScheme>, asyncReducers?: ReducersList) =>
	(Story: StoryFn) => (
		<StoreProvider
			initialState={state}
			asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
		>
			<Story />
		</StoreProvider>
	);
