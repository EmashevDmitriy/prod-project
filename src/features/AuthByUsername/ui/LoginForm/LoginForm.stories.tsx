import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { LoginForm } from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof LoginForm> = {
	title: 'features/LoginForm',
	component: LoginForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {
	decorators: [
		StoreDecorator({ loginForm: { username: 'user', password: '123123' } }),
	],
};

export const withError: Story = {
	decorators: [
		StoreDecorator({
			loginForm: {
				username: 'user',
				password: '123123',
				error: 'Something went wrong!',
			},
		}),
	],
};

export const Loading: Story = {
	decorators: [StoreDecorator({ loginForm: { isLoading: true } })],
};

export const Dark: Story = {
	decorators: [
		StoreDecorator({ loginForm: { username: 'user', password: '123123' } }),
		ThemeDecorator(Theme.DARK),
	],
};
