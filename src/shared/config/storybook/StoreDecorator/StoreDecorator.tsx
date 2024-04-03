import { StoryFn } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { addNewCommentReducer } from 'features/addNewComment/model/slices/addNewCommentSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DeepPartial } from 'ts-essentials';

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addNewComment: addNewCommentReducer,
	articleDetailsComments: articleDetailsCommentsReducer,
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
