import { StoryFn } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from 'ts-essentials';

/* eslint-disable react/display-name */
export const StoreDecorator =
	(state: DeepPartial<StateScheme>) => (Story: StoryFn) => (
		<StoreProvider initialState={state}>
			<Story />
		</StoreProvider>
	);
