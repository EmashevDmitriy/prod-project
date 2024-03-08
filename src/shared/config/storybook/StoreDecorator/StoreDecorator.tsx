import { ReducersMapObject } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { DeepPartial } from 'ts-essentials';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateScheme>> = {
	loginForm: loginReducer,
};

/* eslint-disable react/display-name */
export const StoreDecorator =
	(
		state: DeepPartial<StateScheme>,
		asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>,
	) =>
	(Story: StoryFn) => (
		<StoreProvider
			initialState={state}
			asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
		>
			<Story />
		</StoreProvider>
	);
